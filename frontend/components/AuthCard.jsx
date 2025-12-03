"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { fetchApi } from "@/lib/api"

export default function AuthCard({ mode = "login" }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [show, setShow] = useState(false)

  const submit = async () => {
    setError("")
    if (!email || !password) {
      setError("Please fill out all fields")
      return
    }
    setLoading(true)
    try {
      const endpoint = mode === "login" ? "/login" : "/signup"
      const data = await fetchApi(endpoint, "POST", { email, password })
      localStorage.setItem("token", data.token)
      router.push("/")
    } catch (err) {
      setError(err?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {mode === "login"
          ? "Sign in to continue to CodeClash"
          : "Join CodeClash and start battling with friends"}
      </p>

      <div className="flex flex-col gap-3">
        <label className="text-xs text-gray-500">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@domain.com"
          className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-500">Password</label>
            <button
              onClick={() => setShow((s) => !s)}
              className="text-xs text-gray-400"
              type="button"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter a strong password"
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black mt-1"
          />
        </div>

        {error && <div className="text-xs text-red-600">{error}</div>}

        <button
          onClick={submit}
          disabled={loading}
          className="mt-2 w-full py-3 rounded-lg bg-black text-white font-medium disabled:opacity-60"
        >
          {loading
            ? mode === "login"
              ? "Signing in..."
              : "Creating..."
            : mode === "login"
            ? "Sign in"
            : "Create account"}
        </button>

        <div className="flex items-center gap-2 mt-2">
          <div className="h-px bg-gray-200 flex-1" />
          <div className="text-xs text-gray-400">or</div>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <button className="py-2 rounded-lg border flex items-center justify-center text-sm font-medium">
            Continue with GitHub
          </button>
          <button className="py-2 rounded-lg border flex items-center justify-center text-sm font-medium">
            Continue with Google
          </button>
        </div>

        <div className="text-xs text-gray-500 mt-4 text-center">
          {mode === "login" ? (
            <>
              New to CodeClash? <Link href="/signup" className="text-black font-medium">Create account</Link>
            </>
          ) : (
            <>
              Already have an account? <Link href="/login" className="text-black font-medium">Sign in</Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
