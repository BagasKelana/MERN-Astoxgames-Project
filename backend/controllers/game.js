import Game from "../models/Game.js"
import axios from "axios"
import { createError } from "../utils/error.js"

export const addGame = async (req, res, next) => {
	try {
		const page = req.query.page
		console.log(page)
		const games = await axios.get(
			`https://api.rawg.io/api/games?key=4b050de6f4d64506bfd540375f1eec7e&page=${page}&page_size=100`
		)
		const dataGames = await games.data.results

		for (let i = 0; i < dataGames.length; i++) {
			const newGame = new Game({
				card_image: "",
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
				platforms: dataGames[i].platforms,
				parent_platforms: dataGames[i].parent_platforms,
				genres: dataGames[i].genres,
				tags: dataGames[i].tags,
				esrb_rating: dataGames[i].esrb_rating,
				short_screenshots: dataGames[i].short_screenshots,
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
		const limit = req.query.limit || 12
		const games = await Game.find().skip().limit(limit).lean()
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
			"https://api.rawg.io/api/games?key=4b050de6f4d64506bfd540375f1eec7e&page=6&page_size=100"
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
		const skip = parseInt(req.query.skip) || 0

		const searchTerm = req.query.term || ""
		console.log(searchTerm)

		const regexSearchTerm = searchTerm
			? searchTerm
					.split("")
					.map((char) => `${char}.*`)
					.join("")
			: ""

		console.log(regexSearchTerm)

		const queryParams = {}

		if (regexSearchTerm) {
			queryParams.name = {
				$regex: regexSearchTerm,
				$options: "i",
			}
		}

		const randomFilter = {}

		const platform = req.query.platform || ""
		const genre = req.query.genre || ""

		if (platform) {
			queryParams.parent_platforms = {
				$elemMatch: {
					"platform.slug": platform,
				},
			}
			randomFilter.parent_platforms = {
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
			randomFilter.genres = {
				$elemMatch: {
					slug: genre,
				},
			}
		}

		const categories = req.query.categories || ""
		const sort = categories === "name" ? 1 : -1

		if (!queryParams?.name) {
			if (categories && categories !== "relevance") {
				const count = await Game.countDocuments(queryParams)
				const Games = await Game.find(queryParams)
					.limit(limit)
					.skip(skip)
					.sort({ [categories]: sort })
					.lean()
				return res.status(200).json({ games: [...Games], count })
			}
			const Games = await Game.find(queryParams)
				.limit(limit)
				.skip(skip)
				.lean()
			const count = await Game.countDocuments(queryParams)
			return res.status(200).json({ games: [...Games], count })
		}

		if (categories && categories !== "relevance") {
			const count = await Game.countDocuments(queryParams)
			const Games = await Game.find(queryParams)
				.limit(limit)
				.skip(skip)
				.sort({ [categories]: sort })
				.lean()

			console.log(count)

			return res.status(200).json({ games: [...Games], count })
		}
		const Games = await Game.find(queryParams).limit(limit).skip(skip)
		const count = await Game.countDocuments(queryParams)
		return res.status(200).json({ games: [...Games], count })
	} catch (error) {
		console.error(error)
		next(error)
	}
}

export const getGamesId = async (req, res, next) => {
	try {
		const Games = await Game.aggregate([
			{
				$match: { card_image: "" },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					background_image: 1,
					card_image: 1,
				},
			},
		])

		return res.status(200).json([...Games])
	} catch (error) {
		console.error(error)
		next(error)
	}
}

export const getGameLike = async (req, res, next) => {
	try {
		const id = req.query.id

		const game = await Game.findOne({ _id: id })

		if (!game) {
			return res.status(404).json({ message: "Game not found" })
		}
		const genreSlugs = game.genres.map((genre) => genre.slug)
		const platformsSlugs = game.parent_platforms.map(
			(plat) => plat.platform.slug
		)
		const tagsSlugs = game.tags.map((tag) => tag.slug)

		const regexSearchTerm = game.name
			.replace(/[^\w\s]|\d/g, "") //menghilangkan simbol dan angka dari game.name
			.split(" ")
			.map((word, index) => {
				return index === 0
					? `^${word.split("").join(".*")}`
					: `${word.split("").join(".*")}`
			})
			.filter((word) => word !== "")
			.join(".*|")
		console.log(regexSearchTerm)

		const gameLike = await Game.aggregate([
			{
				$match: {
					_id: { $ne: game._id },
					$or: [
						{
							name: {
								$regex: regexSearchTerm,
								$options: "i",
							},
						},
						{
							"parent_platforms.platform.slug": {
								$in: platformsSlugs,
							},
						},
						{ "genres.slug": { $in: genreSlugs } },
						{ "tags.slug": { $in: tagsSlugs } },
					],
				},
			},
			{
				$addFields: {
					score: {
						$add: [
							{
								$size: {
									$setIntersection: [
										"$parent_platforms.platform.slug",
										platformsSlugs,
									],
								},
							},
							{
								$multiply: [
									10,
									{
										$size: {
											$setIntersection: [
												"$genres.slug",
												genreSlugs,
											],
										},
									},
								],
							},
							{
								$multiply: [
									5,
									{
										$size: {
											$setIntersection: [
												//cocokan tags game dengan data games, jika cocok ambil
												"$tags.slug",
												tagsSlugs,
											],
										},
									},
								],
							},
							{
								$cond: {
									//menambahkan skor jika ada regex yang cocok
									if: {
										$regexMatch: {
											input: "$name",
											regex: regexSearchTerm,
											options: "i",
										},
									},
									then: 20,
									else: 0,
								},
							},

							{ $divide: ["$added", 500] },
						],
					},
				},
			},
			{
				$sort: { score: -1 },
			},
			{ $limit: 10 },
			{
				$project: {
					input: "$name",
					_id: 1,
					name: 1,
					background_image: 1,
					card_image: 1,
					parent_platforms: 1,
					added: 1,
					released: 1,
					rating: 1,
					genres: 1,
					score: "$score",
				},
			},
		])

		return res.status(200).json([...gameLike])
	} catch (error) {
		console.error(error)
		next(error)
	}
}
