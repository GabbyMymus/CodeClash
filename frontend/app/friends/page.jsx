"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import { Users, Plus, Trash2, Sword, MessageSquare } from "lucide-react"

export default function FriendsPage() {
  const [tab, setTab] = useState("friends")
  const [searchTerm, setSearchTerm] = useState("")

  const friends = [
    { id: 1, name: "Alex", elo: 2800, status: "online", lastSeen: "now" },
    { id: 2, name: "Jordan", elo: 2650, status: "offline", lastSeen: "2h ago" },
    { id: 3, name: "Morgan", elo: 2500, status: "online", lastSeen: "now" },
  ]

  const requests = [
    { id: 1, name: "Sam", elo: 2400 },
    { id: 2, name: "Casey", elo: 2100 },
  ]

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
            <h1 className="text-4xl font-bold text-gray-900">Friends & Challenges</h1>
          </div>
          <p className="text-lg text-gray-600">Connect with friends and challenge them to duels</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8 border-b"
        >
          {["friends", "requests", "challenges"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-4 px-4 font-semibold border-b-2 transition-colors ${
                tab === t
                  ? "text-gray-900 border-gray-900"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
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
            {friends.map((friend) => (
              <motion.div
                key={friend.id}
                variants={itemVariants}
                className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                      <p className="text-sm text-gray-600">
                        ELO: {friend.elo} • {friend.status === "online" ? "🟢 Online" : "🔘 Offline"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                      title="Challenge"
                    >
                      <Sword className="w-5 h-5 text-gray-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                      title="Message"
                    >
                      <MessageSquare className="w-5 h-5 text-gray-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="p-2 rounded-lg border border-red-200 hover:bg-red-50"
                      title="Remove"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
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
            {requests.map((req) => (
              <motion.div
                key={req.id}
                variants={itemVariants}
                className="p-6 rounded-xl bg-white border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{req.name}</h3>
                      <p className="text-sm text-gray-600">ELO: {req.elo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                    >
                      Accept
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                      Decline
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Challenges Tab */}
        {tab === "challenges" && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No active challenges</p>
            <p className="text-gray-500 mt-2">Challenge a friend to start a duel</p>
          </div>
        )}
      </div>
    </div>
  )
}
