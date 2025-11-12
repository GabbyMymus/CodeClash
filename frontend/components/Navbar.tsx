"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full h-16 flex justify-between items-center px-6 border-b">
      <h1 className="text-xl font-bold">CodeClash</h1>

      <div className="flex gap-4">
        <Link href="/login">
          <button className="px-4 py-2 border rounded">Login</button>
        </Link>

        <Link href="/signup">
          <button className="px-4 py-2 bg-black text-white rounded">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  )
}
