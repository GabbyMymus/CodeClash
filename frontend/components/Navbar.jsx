"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, LogOut, User, Trophy, Zap, Users } from "lucide-react"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedToken = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")
    setToken(savedToken)
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (err) {
        console.error("Failed to parse user data:", err)
      }
    }
  }, [])

  const isAuthenticated = !!token

  // Extract username from email (part before @)
  const username = user?.email ? user.email.split("@")[0] : "User"
  const elo = user?.elo || 1200

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    router.push("/login")
    setIsOpen(false)
  }

  const navLinks = [
    { href: "/", label: "Home", icon: Zap },
    { href: "/problems", label: "Problems", icon: Zap },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/friends", label: "Friends", icon: Users },
  ]

  const isActive = (href) => pathname === href

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            ⚡ CodeClash
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {isAuthenticated ? (
            <>
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${
                        isActive(link.href)
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </motion.button>
                  </Link>
                )
              })}
            </>
          ) : null}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && mounted ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
                <span className="text-sm font-medium text-gray-700">{username}</span>
                <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">ELO {elo}</span>
              </div>
              <Link href="/profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profile
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Login
                </motion.button>
              </Link>
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium"
                >
                  Sign Up
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          {isAuthenticated && (
            <Link href="/profile">
              <User className="w-5 h-5 text-gray-700" />
            </Link>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t bg-white"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                      {link.label}
                    </motion.button>
                  </Link>
                ))}
                <motion.button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                    Login
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <button className="w-full text-left px-4 py-2 rounded-lg bg-black text-white">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
