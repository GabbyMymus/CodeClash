"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, LogIn, Settings } from "lucide-react"
import { getUserProfile } from "@/lib/api"

export default function Navbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
    
    if (token) {
      // Check if user is admin
      getUserProfile()
        .then(user => {
          setIsAdmin(user.isAdmin || false)
        })
        .catch(err => {
          console.error("Failed to get user profile:", err)
          setIsAdmin(false)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setIsAdmin(false)
    router.push("/login")
  }

  if (loading) return null

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
          CodeClash
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <Link href="/problems" className="text-gray-600 hover:text-black transition">
            Problems
          </Link>
          <Link href="/leaderboard" className="text-gray-600 hover:text-black transition">
            Leaderboard
          </Link>

          {/* Admin Link */}
          {isAdmin && (
            <Link href="/admin/problems" className="text-gray-600 hover:text-black transition flex items-center gap-2">
              <Settings size={18} />
              Admin
            </Link>
          )}

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition flex items-center gap-2"
            >
              <LogIn size={18} />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}