import express from "express"
import { signIn, login, google } from "../controllers/auth.js"

const router = express.Router()

//api auth

router.post("/sign-in", signIn)
router.post("/login", login)
router.post("/google", google)

export default router
