"use client"

import AuthCard from "@/components/AuthCard"
import Navbar from "@/components/navigation/navbar"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="hidden md:flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Join CodeClash</h1>
            <p className="text-gray-600 max-w-md">
              Create an account to start competing with other coders. Track progress, favourite problems and climb leaderboards.
            </p>

            <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
              <h3 className="font-medium text-gray-900">Starter tips</h3>
              <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                <li>Verify your email for account recovery</li>
                <li>Choose a strong password</li>
                <li>Link a social account to speed signup</li>
              </ul>
            </div>
          </div>

          <div>
            <AuthCard mode="signup" />
          </div>

        </div>
      </main>
    </div>
  )
}
