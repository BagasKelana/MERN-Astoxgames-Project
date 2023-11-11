import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js"
import gamesRoutes from "./routes/games.js"
import usersRoutes from "./routes/users.js"
import compression from "compression"
import multer from "multer"
import fs from "fs"
import path from "path"
import { createError } from "./utils/error.js"

const app = express()
dotenv.config()

app.use(compression())

app.use(express.static("public"))

const PORT = process.env.PORT || 3000

//mongodb conection

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log("mongodb connection success")
	} catch (err) {
		console.log(err)
	}
}

mongoose.connection.on("disconnected", () => {
	console.log("mongodb disconnected")
})

// middleware
const corsOptions = {
	origin: process.env.CLIENT_URL,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({ limit: "10mb" }))
app.use(express.static("public"))

//api routes
app.use("/auth", authRoutes)
app.use("/user", usersRoutes)
app.use("/games", gamesRoutes)

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		console.log(file)
		cb(null, "public/images")
	},
	filename: function (req, file, cb) {
		console.log(file, req.body)
		cb(null, Date.now() + "-" + file.originalname)
	},
})

const upload = multer({ storage: storage }) 

app.post("/upload", upload.array("images", 12), function (req, res, next) {
	try {
		if (!req.files) return next(createError(500, "multer salah bos"))

		const responseSuccess = []
		const responseFail = []

		const response = {
			message: "Image upload Success!",
			responseSuccess,
			responseFail,
		}
		const allowedImageTypes = [
			"image/jpeg",
			"image/png",
			"image/gif",
			"image/webp",
		]

		for (let i = 0; i < req.files.length; i++) {
			if (allowedImageTypes.includes(req.files[i].mimetype)) {
				responseFail.push(path.relative("public", req.files[i].path))
			} else {
				responseSuccess.push(path.relative("public", req.files[i].path))
			}
		}
		console.log(responseSuccess)
		console.log(responseFail)
		return res.send(response)
	} catch (err) {
		next(err)
	}
})

//middleware Error
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500
	const errorMessage = err.message || "Something went wrong!"
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	})
})

app.listen(PORT, (req, res) => {
	connect()
	console.log(`server running on port ${PORT}`)
})
