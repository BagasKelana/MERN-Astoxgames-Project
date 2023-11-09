import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token
	if (!token) return next(createError(401, "You are not authentication!"))

	jwt.verify(token, process.env.JWT_SECREATS_KEY, (err, user) => {
		if (err) return next(createError(403, "Token is not valid!"))
		req.user = user
		next()
	})
}

export const verifyUser = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next()
		} else {
			return next(createError(403, "You are not authorized!"))
		}
	})
}

export const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next()
		} else {
			return next(createError(403, "You are not admin!"))
		}
	})
}
