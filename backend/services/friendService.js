import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const friendService = {
  // Get all friends (accepted) for a user
  async getFriends(userId) {
    const friends = await prisma.friend.findMany({
      where: {
        OR: [
          { userId: userId, status: "accepted" },
          { friendId: userId, status: "accepted" }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            elo: true,
            createdAt: true
          }
        },
        friend: {
          select: {
            id: true,
            email: true,
            elo: true,
            createdAt: true
          }
        }
      }
    })

    // Format the response to return the friend (not the current user)
    return friends.map(f => {
      const friendData = f.userId === userId ? f.friend : f.user
      return {
        id: f.id,
        friendshipId: f.id,
        userId: friendData.id,
        email: friendData.email,
        elo: friendData.elo,
        createdAt: f.createdAt
      }
    })
  },

  // Get pending friend requests received by the user
  async getPendingRequests(userId) {
    const requests = await prisma.friend.findMany({
      where: {
        friendId: userId,
        status: "pending"
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            elo: true,
            createdAt: true
          }
        }
      }
    })

    return requests.map(r => ({
      id: r.id,
      requestId: r.id,
      userId: r.user.id,
      email: r.user.email,
      elo: r.user.elo,
      createdAt: r.createdAt
    }))
  },

  // Get all users (for searching/adding friends)
  async getAllUsers(currentUserId, searchTerm = "") {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: currentUserId } },
          searchTerm ? {
            email: {
              contains: searchTerm,
              mode: "insensitive"
            }
          } : {}
        ]
      },
      select: {
        id: true,
        email: true,
        elo: true,
        createdAt: true
      },
      take: 20
    })

    // Get current friendship statuses
    const friendships = await prisma.friend.findMany({
      where: {
        OR: [
          { userId: currentUserId },
          { friendId: currentUserId }
        ]
      }
    })

    // Create a map of userId to friendship status
    const friendshipMap = {}
    friendships.forEach(f => {
      if (f.userId === currentUserId) {
        friendshipMap[f.friendId] = f.status
      } else {
        friendshipMap[f.userId] = f.status
      }
    })

    // Add friendship status to each user
    return users.map(user => ({
      ...user,
      friendshipStatus: friendshipMap[user.id] || "none"
    }))
  },

  // Send a friend request
  async sendFriendRequest(userId, friendId) {
    // Check if friendship already exists
    const existing = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId: userId, friendId: friendId },
          { userId: friendId, friendId: userId }
        ]
      }
    })

    if (existing) {
      throw new Error("Friend request already exists")
    }

    // Check if user is trying to add themselves
    if (userId === friendId) {
      throw new Error("Cannot add yourself as a friend")
    }

    const friend = await prisma.friend.create({
      data: {
        userId: userId,
        friendId: friendId,
        status: "pending"
      }
    })

    return friend
  },

  // Accept a friend request
  async acceptFriendRequest(requestId, userId) {
    const request = await prisma.friend.findUnique({
      where: { id: requestId }
    })

    if (!request) {
      throw new Error("Friend request not found")
    }

    if (request.friendId !== userId) {
      throw new Error("Not authorized to accept this request")
    }

    const updated = await prisma.friend.update({
      where: { id: requestId },
      data: { status: "accepted" }
    })

    return updated
  },

  // Decline a friend request
  async declineFriendRequest(requestId, userId) {
    const request = await prisma.friend.findUnique({
      where: { id: requestId }
    })

    if (!request) {
      throw new Error("Friend request not found")
    }

    if (request.friendId !== userId) {
      throw new Error("Not authorized to decline this request")
    }

    await prisma.friend.delete({
      where: { id: requestId }
    })

    return { message: "Friend request declined" }
  },

  // Remove a friend
  async removeFriend(friendshipId, userId) {
    const friendship = await prisma.friend.findUnique({
      where: { id: friendshipId }
    })

    if (!friendship) {
      throw new Error("Friendship not found")
    }

    // Check if user is part of this friendship
    if (friendship.userId !== userId && friendship.friendId !== userId) {
      throw new Error("Not authorized to remove this friend")
    }

    await prisma.friend.delete({
      where: { id: friendshipId }
    })

    return { message: "Friend removed successfully" }
  }
}
