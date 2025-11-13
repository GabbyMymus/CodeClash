"use client"
import { useState } from "react"
import { fetchApi } from "@/lib/api"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    try {
      const data = await fetchApi("/signup", "POST", { email, password })
      localStorage.setItem("token", data.token)
      alert("Account created successfully!")
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center mt-24">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <input
        className="border p-2 mt-4 w-64"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mt-2 w-64"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignup}
        className="bg-black text-white px-4 py-2 rounded mt-4 w-64"
      >
        Create Account
      </button>
    </div>
  )
}
