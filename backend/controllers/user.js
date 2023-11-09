import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

export const getUsers = async (req, res, next) => {
	try {
		const user = await User.find().exec()
		res.send(user)
	} catch (err) {
		next(err)
	}
}
export const getUser = async (req, res, next) => {
	try {
		const user = await User.find({ _id: req.params.id }).exec()
		res.send(user)
	} catch (err) {
		next(err)
	}
}

export const deleteUser = async (req, res, next) => {
	try {
		const user = await User.findOneAndDelete({ _id: req.params.id }).exec()
		res.send(user)
	} catch (err) {
		next(err)
	}
}

export const updateUser = async (req, res, next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: req.body },
			{ new: true }
		)
		res.status(200).json(updatedUser)
	} catch (err) {
		next(err)
	}
}
