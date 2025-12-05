"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import { Users, Plus, Trash2, Search, UserPlus } from "lucide-react"
import { 
  getFriends, 
  getPendingRequests, 
  getAllUsers, 
  sendFriendRequest, 
  acceptFriendRequest, 
  declineFriendRequest,
  removeFriend 
} from "@/lib/api"

export default function FriendsPage() {
  const [tab, setTab] = useState("friends")
  const [searchTerm, setSearchTerm] = useState("")
  const [friends, setFriends] = useState([])
  const [requests, setRequests] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [friendsData, requestsData] = await Promise.all([
        getFriends(),
        getPendingRequests()
      ])
      setFriends(friendsData)
      setRequests(requestsData)
    } catch (err) {
      console.error("Error loading data:", err)
      setError("Failed to load friends data")
    } finally {
      setLoading(false)
    }
  }

  const loadUsers = async (search = "") => {
    try {
      const usersData = await getAllUsers(search)
      setUsers(usersData)
    } catch (err) {
      console.error("Error loading users:", err)
      setError("Failed to load users")
    }
  }

  useEffect(() => {
    if (tab === "add") {
      loadUsers(searchTerm)
    }
  }, [tab])

  const handleSearch = async (e) => {
    const term = e.target.value
    setSearchTerm(term)
    if (tab === "add") {
      await loadUsers(term)
    }
  }

  const handleSendRequest = async (friendId) => {
    try {
      await sendFriendRequest(friendId)
      setSuccessMessage("Friend request sent!")
      setTimeout(() => setSuccessMessage(""), 3000)
      loadUsers(searchTerm)
    } catch (err) {
      setError(err.message || "Failed to send friend request")
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptFriendRequest(requestId)
      setSuccessMessage("Friend request accepted!")
      setTimeout(() => setSuccessMessage(""), 3000)
      loadData()
    } catch (err) {
      setError(err.message || "Failed to accept friend request")
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleDeclineRequest = async (requestId) => {
    try {
      await declineFriendRequest(requestId)
      setSuccessMessage("Friend request declined")
      setTimeout(() => setSuccessMessage(""), 3000)
      loadData()
    } catch (err) {
      setError(err.message || "Failed to decline friend request")
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleRemoveFriend = async (friendshipId) => {
    if (!confirm("Are you sure you want to remove this friend?")) return
    
    try {
      await removeFriend(friendshipId)
      setSuccessMessage("Friend removed")
      setTimeout(() => setSuccessMessage(""), 3000)
      loadData()
    } catch (err) {
      setError(err.message || "Failed to remove friend")
      setTimeout(() => setError(""), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-600 text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-gray-900" />
            <h1 className="text-4xl font-bold text-gray-900">Friends</h1>
          </div>
          <p className="text-lg text-gray-600">Connect with other coders</p>
        </motion.div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8 border-b"
        >
          {["friends", "requests", "add"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
                tab === t
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              {t === "add" ? "Add Friends" : t.charAt(0).toUpperCase() + t.slice(1)}
              {t === "requests" && requests.length > 0 && (
                <span className="ml-2 px-2 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                  {requests.length}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Friends Tab */}
        {tab === "friends" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {friends.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No friends yet</p>
                <p className="text-gray-500 mt-2">Add friends to connect with other coders</p>
                <button
                  onClick={() => setTab("add")}
                  className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  Add Friends
                </button>
              </div>
            ) : (
              friends.map((friend) => (
                <motion.div
                  key={friend.id}
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-semibold text-lg">
                        {friend.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{friend.email}</h3>
                        <p className="text-sm text-gray-600">
                          ELO: {friend.elo}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleRemoveFriend(friend.friendshipId)}
                        className="p-2 rounded-lg border border-red-200 hover:bg-red-50"
                        title="Remove Friend"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Requests Tab */}
        {tab === "requests" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No pending requests</p>
              </div>
            ) : (
              requests.map((req) => (
                <motion.div
                  key={req.id}
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-white border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-semibold text-lg">
                        {req.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{req.email}</h3>
                        <p className="text-sm text-gray-600">ELO: {req.elo}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleAcceptRequest(req.requestId)}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                      >
                        Accept
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleDeclineRequest(req.requestId)}
                        className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                      >
                        Decline
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Add Friends Tab */}
        {tab === "add" && (
          <div>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users by email..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {users.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No users found</p>
                  <p className="text-gray-500 mt-2">Try searching for a user by email</p>
                </div>
              ) : (
                users.map((user) => (
                  <motion.div
                    key={user.id}
                    variants={itemVariants}
                    className="p-6 rounded-xl bg-white border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-semibold text-lg">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{user.email}</h3>
                          <p className="text-sm text-gray-600">ELO: {user.elo}</p>
                        </div>
                      </div>

                      <div>
                        {user.friendshipStatus === "none" && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleSendRequest(user.id)}
                            className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 flex items-center gap-2"
                          >
                            <UserPlus className="w-4 h-4" />
                            Add Friend
                          </motion.button>
                        )}
                        {user.friendshipStatus === "pending" && (
                          <span className="px-4 py-2 text-gray-500 text-sm">Request Sent</span>
                        )}
                        {user.friendshipStatus === "accepted" && (
                          <span className="px-4 py-2 text-green-600 text-sm font-semibold">Friends</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
