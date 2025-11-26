"use client"


export default function HomePage() {
  return (
    <>

      <main className="flex flex-col items-center mt-24 text-center">
        <h1 className="text-5xl font-bold">Welcome to CodeClash</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-xl">
          Challenge your friends in real-time coding duels. 
          Solve problems, earn ELO, and climb the leaderboard.
        </p>
        <div className="flex gap-4 mt-8">
          <a href="/login">
            <button className="px-6 py-3 border rounded-md text-lg font-medium hover:bg-gray-100">
              Log In
            </button>
          </a>
          <a href="/signup">
            <button className="px-6 py-3 bg-black text-white rounded-md text-lg font-medium hover:bg-gray-900">
              Sign Up
            </button>
          </a>
        </div>
      </main>
    </>
  )
}
