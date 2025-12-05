import express from "express"
import { friendController } from "../controllers/friendController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

// All routes require authentication
router.use(auth)

// GET /api/friends - Get all accepted friends
router.get("/", friendController.getFriends)

// GET /api/friends/requests - Get pending friend requests
router.get("/requests", friendController.getPendingRequests)

// GET /api/friends/users - Get all users (for searching/adding)
router.get("/users", friendController.getAllUsers)

// POST /api/friends/request - Send a friend request
router.post("/request", friendController.sendFriendRequest)

// POST /api/friends/accept/:requestId - Accept a friend request
router.post("/accept/:requestId", friendController.acceptFriendRequest)

// DELETE /api/friends/decline/:requestId - Decline a friend request
router.delete("/decline/:requestId", friendController.declineFriendRequest)

// DELETE /api/friends/:friendshipId - Remove a friend
router.delete("/:friendshipId", friendController.removeFriend)

export default router
