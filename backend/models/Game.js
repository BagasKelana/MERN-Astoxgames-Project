import mongoose from "mongoose"

const gameSchema = new mongoose.Schema({
	about_game: String,
	slug: String,
	card_image: String,
	name: {
		type: String,
		index: "text",
	},
	released: Date,
	tba: Boolean,
	background_image: String,
	rating: Number,
	rating_top: Number,
	ratings: [
		{
			id: Number,
			title: String,
			count: Number,
			percent: Number,
		},
	],
	ratings_count: Number,
	reviews_text_count: Number,
	added: Number,
	added_by_status: {
		yet: Number,
		owned: Number,
		beaten: Number,
		toplay: Number,
		dropped: Number,
		playing: Number,
	},
	metacritic: Number,
	playtime: Number,
	suggestions_count: Number,
	updated: Date,
	reviews_count: Number,
	saturated_color: String,
	dominant_color: String,
	platforms: {
		type: ["Mixed"],
	},
	system_requirements: {
		type: ["Mixed"],
	},
	parent_platforms: [
		{
			platform: {
				id: Number,
				name: String,
				slug: String,
			},
		},
	],
	genres: [
		{
			id: Number,
			name: String,
			slug: String,
			games_count: Number,
			image_background: String,
		},
	],
	stores: [
		{
			id: Number,
			store: {
				id: Number,
				name: String,
				slug: String,
				domain: String,
				games_count: Number,
				image_background: String,
			},
		},
	],
	tags: [
		{
			id: Number,
			name: String,
			slug: String,
			language: String,
			games_count: Number,
			image_background: String,
		},
	],
	esrb_rating: {
		id: Number,
		name: String,
		slug: String,
	},
	short_screenshots: {
		type: ["Mixed"],
	},
})

export default mongoose.model("Game", gameSchema)
