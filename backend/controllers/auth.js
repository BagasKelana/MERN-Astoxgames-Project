import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

export const signIn = async (req, res, next) => {
	try {
		//hashing password user
		const user = await User.findOne({ email: req.body.email }).exec()

		if (user) {
			return next(createError(403, "email sudah terdaftar"))
		}

		const salt = bcrypt.genSaltSync(10)

		const hashPassword = bcrypt.hashSync(req.body.password, salt)

		const newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashPassword,
		})

		await newUser.save()

		res.status(200).send("User has been authenticated")
	} catch (err) {
		return next(err)
	}
}

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email }).exec()
		if (!user) return next(createError(404, "User not found!"))

		const compareUserPassword = bcrypt.compareSync(
			req.body.password,
			user.password
		)

		if (!compareUserPassword) {
			return next(createError(400, "Wrong Password!"))
		}

		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT_SECREATS_KEY
		)

		const { password, isAdmin, ...detail } = user._doc

		res.cookie("access_token", token, { httpOnly: true })
			.status(200)
			.json(detail)
	} catch (err) {
		return next(err)
	}
}

export const google = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email }).exec()
		if (user) {
			const token = jwt.sign(
				{ id: user._id, isAdmin: user.isAdmin },
				process.env.JWT_SECREATS_KEY
			)

			const { password, isAdmin, ...detail } = user._doc
			res.cookie("access_token", token, { httpOnly: true })
				.status(200)
				.json(detail)
		} else {
			const generatedPassword =
				Math.random().toString(36).slice(-8) +
				Math.random().toString(36).slice(-8)

			const salt = bcrypt.genSaltSync(10)
			const hashPassword = bcrypt.hashSync(generatedPassword, salt)

			const newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hashPassword,
				photo: req.body.photo,
			})
			await newUser.save()

			const user = await User.findOne({ email: req.body.email }).exec()

			const token = jwt.sign(
				{ id: user._id, isAdmin: user.isAdmin },
				process.env.JWT_SECREATS_KEY
			)

			const { password, isAdmin, ...detail } = user._doc
			res.cookie("access_token", token, { httpOnly: true })
				.status(200)
				.json(detail)
		}
	} catch (err) {
		return next(err)
	}
}
