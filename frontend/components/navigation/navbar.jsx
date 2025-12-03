"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 border-b bg-white/60 backdrop-blur-sm">
      
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold">
          CC
        </div>
        <span className="text-lg font-semibold">CodeClash</span>
      </Link>

      <div className="flex gap-3">
        <Link href="/login">
          <button className="px-4 py-2 rounded-md border">Login</button>
        </Link>

        <Link href="/signup">
          <button className="px-4 py-2 rounded-md bg-black text-white">
            Sign Up
          </button>
        </Link>
      </div>

    </nav>
  )
}
