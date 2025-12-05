import { friendService } from "../services/friendService.js"

export const friendController = {
  // GET /api/friends - Get all accepted friends
  async getFriends(req, res) {
    try {
      const userId = req.user.id
      const friends = await friendService.getFriends(userId)
      res.json(friends)
    } catch (error) {
      console.error("Error getting friends:", error)
      res.status(500).json({ error: error.message })
    }
  },

  // GET /api/friends/requests - Get pending friend requests
  async getPendingRequests(req, res) {
    try {
      const userId = req.user.id
      const requests = await friendService.getPendingRequests(userId)
      res.json(requests)
    } catch (error) {
      console.error("Error getting pending requests:", error)
      res.status(500).json({ error: error.message })
    }
  },

  // GET /api/friends/users - Get all users (for searching/adding)
  async getAllUsers(req, res) {
    try {
      const userId = req.user.id
      const searchTerm = req.query.search || ""
      const users = await friendService.getAllUsers(userId, searchTerm)
      res.json(users)
    } catch (error) {
      console.error("Error getting users:", error)
      res.status(500).json({ error: error.message })
    }
  },

  // POST /api/friends/request - Send a friend request
  async sendFriendRequest(req, res) {
    try {
      const userId = req.user.id
      const { friendId } = req.body

      if (!friendId) {
        return res.status(400).json({ error: "Friend ID is required" })
      }

      const friend = await friendService.sendFriendRequest(userId, friendId)
      res.status(201).json(friend)
    } catch (error) {
      console.error("Error sending friend request:", error)
      res.status(400).json({ error: error.message })
    }
  },

  // POST /api/friends/accept/:requestId - Accept a friend request
  async acceptFriendRequest(req, res) {
    try {
      const userId = req.user.id
      const { requestId } = req.params

      const updated = await friendService.acceptFriendRequest(requestId, userId)
      res.json(updated)
    } catch (error) {
      console.error("Error accepting friend request:", error)
      res.status(400).json({ error: error.message })
    }
  },

  // DELETE /api/friends/decline/:requestId - Decline a friend request
  async declineFriendRequest(req, res) {
    try {
      const userId = req.user.id
      const { requestId } = req.params

      const result = await friendService.declineFriendRequest(requestId, userId)
      res.json(result)
    } catch (error) {
      console.error("Error declining friend request:", error)
      res.status(400).json({ error: error.message })
    }
  },

  // DELETE /api/friends/:friendshipId - Remove a friend
  async removeFriend(req, res) {
    try {
      const userId = req.user.id
      const { friendshipId } = req.params

      const result = await friendService.removeFriend(friendshipId, userId)
      res.json(result)
    } catch (error) {
      console.error("Error removing friend:", error)
      res.status(400).json({ error: error.message })
    }
  }
}
