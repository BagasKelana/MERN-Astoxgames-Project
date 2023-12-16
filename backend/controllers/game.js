import Game from "../models/Game.js"
import axios from "axios"
import { createError } from "../utils/error.js"

export const addGame = async (req, res, next) => {
	try {
		const games = await axios.get(
			"https://api.rawg.io/api/games?key=4b050de6f4d64506bfd540375f1eec7e&page=2&page_size=100"
		)
		const dataGames = await games.data.results
		const system_requirements = dataGames.map((n) => {
			return n.platforms.filter(
				(data) =>
					data.platform.name === "PC" && data.requirements_en !== null
			)
		})
		for (let i = 0; i < dataGames.length; i++) {
			const newGame = new Game({
				about_game: "",
				name: dataGames[i].name,
				released: dataGames[i].released,
				background_image: dataGames[i].background_image,
				rating: dataGames[i].rating,
				rating_top: dataGames[i].rating_top,
				ratings: dataGames[i].ratings,
				ratings_count: dataGames[i].ratings_count,
				reviews_text_count: dataGames[i].reviews_text_count,
				added: dataGames[i].added,
				added_by_status: dataGames[i].added_by_status,
				metacritic: dataGames[i].metacritic,
				playtime: dataGames[i].playtime,
				suggestions_count: dataGames[i].suggestions_count,
				updated: dataGames[i].updated,
				reviews_count: dataGames[i].reviews_count,
				system_requirements: system_requirements[i][0] || null,
				parent_platforms: dataGames[i].parent_platforms,
				genres: dataGames[i].genres,
				tags: dataGames[i].tags,
				esrb_rating: dataGames[i].esrb_rating,
			})
			await newGame.save()
		}
		res.status(200).send("game success add to database")
	} catch (err) {
		next(err)
	}
}

export const getGames = async (req, res, next) => {
	try {
		const games = await Game.find().limit(12).skip().lean()
		res.status(200).json(games)
	} catch (err) {
		next(err)
	}
}

export const getGame = async (req, res, next) => {
	try {
		const { id } = req.params
		const game = await Game.findOne({ _id: id }).lean()
		res.status(200).json(game)
	} catch (err) {
		next(err)
	}
}

export const sortGames = async (req, res, next) => {
	try {
		const key = req.path.slice(1)
		const { platform, limit = 10, skip = 0 } = req.query || ""
		const value = key === "name" ? 1 : -1

		const games = await Game.find({
			parent_platforms: {
				$elemMatch: {
					"platform.name": { $regex: new RegExp(platform, "i") },
				},
			},
		})
			.sort({ [key]: value })
			.limit(+limit)
			.skip(+skip)
			.lean()
		res.status(200).json(games)
	} catch (err) {
		next(err)
	}
}

export const updateGames = async (req, res, next) => {
	try {
		const { background_image } = req.body
		const { name } = req.params
		console.log(name)
		const games = await Game.findOneAndUpdate(
			{ name: name },
			{
				$set: {
					background_image: background_image,
				},
			},
			{ new: true }
		).lean()
		res.status(200).json(games)
	} catch (err) {
		next(err)
	}
}

export const updateManyGames = async (req, res, next) => {
	try {
		const games = await axios.get(
			"https://api.rawg.io/api/games?key=4b050de6f4d64506bfd540375f1eec7e&page=1&page_size=100"
		)

		const dataGames = await games.data.results
		console.log(dataGames.length)
		const dataBos = await Game.find().limit(dataGames.length).lean()

		for (let i = 0; i < dataGames.length; i++) {
			await Game.findOneAndUpdate(
				{ name: dataBos[i].name },
				{
					$set: {
						short_screenshots: dataGames[i].short_screenshots,
					},
				},
				{ new: true }
			).lean()
		}

		res.status(200).send()
	} catch (err) {
		next(err)
	}
}

export const searchGames = async (req, res, next) => {
	try {
		const limit = parseInt(req.query.limit) || 12
		const startIndex = parseInt(req.query.startIndex) || 0

		const searchTerm = req.query.term || ""
		console.log(searchTerm)

		const regexSearchTerm = searchTerm
			? searchTerm
					.split("")
					.map((char) => `${char}.*`)
					.join("")
			: ""

		console.log(regexSearchTerm)

		const queryParams = {
			name: {
				$regex: regexSearchTerm,
				$options: "i",
			},
		}

		const platform = req.query.platform || ""
		const genre = req.query.genre || ""

		if (platform) {
			queryParams.parent_platforms = {
				$elemMatch: {
					"platform.slug": platform,
				},
			}
		}

		if (genre) {
			queryParams.genres = {
				$elemMatch: {
					slug: genre,
				},
			}
		}

		const categories = req.query.categories || ""
		const sort = categories === "name" ? 1 : -1

		if (categories) {
			const count = await Game.countDocuments(queryParams)
			const Games = await Game.find(queryParams)
				.limit(limit)
				.skip(startIndex)
				.sort({ [categories]: sort })

			const excludedGames = await Game.find({
				_id: { $nin: Games.map((game) => game._id) },
			}).limit(limit - Games.length)

			console.log(count)

			return res.status(200).json([...Games, ...excludedGames])
		}
		const Games = await Game.find(queryParams).limit(limit).skip(startIndex)
		const excludedGames = await Game.find({
			_id: { $nin: Games.map((game) => game._id) },
		}).limit(limit - +Games.length)

		return res.status(200).json([...Games, ...excludedGames])

		// if (Games.length < 10) {
		// 	const Games2 = await Game.find(queryParams)
		// 		.sort({ [categories]: sort })
		// 		.limit(limit - Games.length)
		// 		.skip(startIndex)
		// }
	} catch (error) {
		console.error(error)
		next(error)
	}
}
