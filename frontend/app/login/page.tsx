"use client"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
    alert("Logged in!")
  }

  return (
    <div className="flex flex-col items-center mt-24">
      <h1 className="text-3xl font-bold">Log In</h1>

      <input
        className="border p-2 mt-4"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 mt-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 rounded mt-4"
      >
        Log In
      </button>
    </div>
  )
}
