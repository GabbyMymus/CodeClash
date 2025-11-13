"use client"
import { useState } from "react"
import { fetchApi } from "@/lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      const data = await fetchApi("/login", "POST", { email, password })
      localStorage.setItem("token", data.token)
      alert("Logged in successfully!")
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center mt-24">
      <h1 className="text-3xl font-bold">Log In</h1>
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
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 rounded mt-4 w-64"
      >
        Log In
      </button>
    </div>
  )
}
