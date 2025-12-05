"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import { Trophy, Medal, Zap } from "lucide-react"
import { getLeaderboard } from "@/lib/api"

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("all")
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    setLoading(true)
    setError("")
    try {
      const users = await getLeaderboard(100)
      setLeaderboard(users)
    } catch (err) {
      setError(err.message || "Failed to load leaderboard")
      setLeaderboard([])
    } finally {
      setLoading(false)
    }
  }

  const getRankMedal = (rank) => {
    if (rank === 1) return <Medal className="w-5 h-5 text-yellow-500" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />
    return <span className="text-sm font-semibold text-gray-600">#{rank}</span>
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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">Global Leaderboard</h1>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-lg text-gray-600">Compete and climb to the top</p>
        </motion.div>

        {/* Timeframe Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-3 mb-8"
        >
          {["week", "month", "all"].map((tf) => (
            <motion.button
              key={tf}
              whileHover={{ scale: 1.05 }}
              onClick={() => setTimeframe(tf)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                timeframe === tf
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Leaderboard Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg"
        >
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 p-6 bg-gray-50 border-b font-semibold text-gray-700">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-3">Player</div>
            <div className="col-span-2 text-center">ELO</div>
          </div>

          {/* Table Rows */}
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : (
            leaderboard.map((user, idx) => (
              <motion.div
                key={user.id}
                variants={itemVariants}
                className={`grid grid-cols-6 gap-4 p-6 border-b hover:bg-gray-50 transition-colors ${
                  idx === 0 ? "bg-yellow-50" : ""
                }`}
              >
                <div className="col-span-1 flex items-center justify-center">
                  {getRankMedal(idx + 1)}
                </div>
                <div className="col-span-3 flex items-center">
                  <span className="font-semibold text-gray-900">{user.email.split("@")[0]}</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="px-3 py-1 rounded-lg bg-gray-100 font-semibold">{user.elo}</span>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

       
      </div>
    </div>
  )
}
