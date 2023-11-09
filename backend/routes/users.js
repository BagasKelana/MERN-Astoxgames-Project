import express from "express"
import {
	getUsers,
	getUser,
	deleteUser,
	updateUser,
} from "../controllers/user.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

//api auth

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
// 	res.send("hallo user, you are authenticated")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
// 	res.send("hallo user, you are login and you can delete your account")
// })

// router.get("/checkAdmin/:id", verifyAdmin, getUsers)

router.get("/:id", verifyUser, getUser)

router.get("/", verifyAdmin, getUsers)

router.put("/:id", verifyUser, updateUser)

router.delete("/:id", verifyAdmin, deleteUser)

export default router
