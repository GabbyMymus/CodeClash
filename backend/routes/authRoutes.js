import express from "express"
import { signup, login, getProfile, getLeaderboard, updateProfile, deleteProfile } from "../controllers/authController.js"
import { verifyUser } from "../middleware/auth.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/profile", verifyUser, getProfile)
router.put("/profile", verifyUser, updateProfile)
router.delete("/profile", verifyUser, deleteProfile)
router.get("/leaderboard", getLeaderboard)

export default router
