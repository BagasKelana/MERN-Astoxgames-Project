import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.js"
import gamesRoutes from "./routes/games.js"
import usersRoutes from "./routes/users.js"
import compression from "compression"

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
	origin: "http://localhost:5173",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json({ limit: "10mb" }))

//api routes
app.use(express.static("public"))
app.use("/auth", authRoutes)
app.use("/user", usersRoutes)
app.use("/games", gamesRoutes)

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
