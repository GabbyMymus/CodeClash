"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import { User, LogOut, Edit2, Trash2, Save, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { updateUserProfile, deleteUserAccount } from "@/lib/api"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editEmail, setEditEmail] = useState("")
  const [editElo, setEditElo] = useState("")
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setEditEmail(parsedUser.email)
        setEditElo(parsedUser.elo || 1200)
      } catch (err) {
        console.error("Failed to parse user data:", err)
      }
    }
  }, [])

  if (!mounted) return null

  const username = user?.email ? user.email.split("@")[0] : "User"
  const elo = user?.elo || 1200
  const email = user?.email || "user@example.com"

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const handleEditStart = () => {
    setIsEditing(true)
    setEditError("")
  }

  const handleEditCancel = () => {
    setIsEditing(false)
    setEditEmail(email)
    setEditElo(elo)
    setEditError("")
  }

  const handleEditSave = async () => {
    setEditLoading(true)
    setEditError("")
    try {
      const updates = {}
      if (editEmail !== email) updates.email = editEmail
      if (editElo !== elo) updates.elo = parseInt(editElo)

      if (Object.keys(updates).length === 0) {
        setEditError("No changes made")
        setEditLoading(false)
        return
      }

      const updatedUser = await updateUserProfile(updates)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
      setIsEditing(false)
      setEditError("")
    } catch (err) {
      setEditError(err.message || "Failed to update profile")
    } finally {
      setEditLoading(false)
    }
  }

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true)
    try {
      await deleteUserAccount()
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/login")
    } catch (err) {
      setEditError(err.message || "Failed to delete account")
      setDeleteLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 p-12 shadow-lg"
        >
          <div className="flex items-center gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center flex-shrink-0">
              <User className="w-16 h-16 text-white" />
            </div>

            {/* User Info */}
            <div className="flex-1">
              {!isEditing ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-5xl font-bold text-gray-900">{username}</h1>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={handleEditStart}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit profile"
                    >
                      <Edit2 className="w-6 h-6 text-gray-600" />
                    </motion.button>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <p className="text-lg text-gray-900 font-medium">{email}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">ELO Rating</p>
                      <p className="text-3xl font-bold text-blue-600">{elo}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="px-6 py-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowDeleteConfirm(true)}
                      className="px-6 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-semibold flex items-center gap-2 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete Account
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
                  
                  {editError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {editError}
                    </div>
                  )}

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ELO Rating</label>
                      <input
                        type="number"
                        value={editElo}
                        onChange={(e) => setEditElo(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEditSave}
                      disabled={editLoading}
                      className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <Save className="w-5 h-5" />
                      {editLoading ? "Saving..." : "Save"}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEditCancel}
                      disabled={editLoading}
                      className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 text-sm mb-2">Rank</p>
            <p className="text-2xl font-bold text-gray-900">#157</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 text-sm mb-2">Total Wins</p>
            <p className="text-2xl font-bold text-green-600">287</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 text-sm mb-2">Win Rate</p>
            <p className="text-2xl font-bold text-blue-600">62%</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 text-sm mb-2">Matches</p>
            <p className="text-2xl font-bold text-purple-600">463</p>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Account?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to permanently delete your account? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
                className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 font-semibold transition-colors disabled:opacity-50"
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleteLoading}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
