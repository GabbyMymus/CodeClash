"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { authApi } from "@/lib/api"
import { Mail, Lock, Github, Chrome, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export default function AuthCard({ mode = "login" }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)

  const isValidEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  const isValidPassword = password.length >= 6

  const submit = async () => {
    setError("")
    if (!email || !password) {
      setError("Please fill out all fields")
      return
    }
    if (!isValidEmail) {
      setError("Please enter a valid email")
      return
    }
    if (!isValidPassword) {
      setError("Password must be at least 6 characters")
      return
    }
    setLoading(true)
    try {
      const endpoint = mode === "login" ? "/login" : "/signup"
      const data = await authApi(endpoint, "POST", { email, password })
      setSuccess(true)
      localStorage.setItem("token", data.token)
      // Store user data (email and elo)
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }
      setTimeout(() => router.push("/"), 800)
    } catch (err) {
      setError(err?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      submit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl backdrop-blur-sm border border-gray-100 p-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2"
          >
            {mode === "login" ? "Welcome back" : "Join the battle"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="text-sm text-gray-600"
          >
            {mode === "login"
              ? "Sign in to continue to CodeClash"
              : "Create your account and start competing"}
          </motion.p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <label className="block text-xs font-semibold text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                type="email"
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all duration-200"
              />
              {email && isValidEmail && (
                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
              )}
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-gray-700">Password</label>
              <button
                onClick={() => setShow((s) => !s)}
                className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                type="button"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                type={show ? "text" : "password"}
                placeholder={mode === "login" ? "Enter your password" : "Create a strong password"}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all duration-200"
              />
              {password && isValidPassword && (
                <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
              )}
            </div>
            {mode === "signup" && password && !isValidPassword && (
              <p className="text-xs text-gray-500 mt-1">At least 6 characters required</p>
            )}
          </motion.div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-gap-2"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-600 ml-2">{error}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={submit}
          disabled={loading || success}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg"
        >
          {success ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Success!
            </>
          ) : loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {mode === "login" ? "Signing in..." : "Creating..."}
            </>
          ) : (
            mode === "login" ? "Sign in" : "Create account"
          )}
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gradient-to-r from-gray-200 to-transparent flex-1" />
          <span className="text-xs text-gray-500 font-medium">or continue with</span>
          <div className="h-px bg-gradient-to-l from-gray-200 to-transparent flex-1" />
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
            type="button"
          >
            <Github className="w-4 h-4" />
            GitHub
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
            type="button"
          >
            <Chrome className="w-4 h-4" />
            Google
          </motion.button>
        </div>

        {/* Footer Link */}
        <p className="text-xs text-gray-600 text-center">
          {mode === "login" ? (
            <>
              New to CodeClash?{" "}
              <Link href="/signup" className="font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                Create account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </motion.div>
  )
}
