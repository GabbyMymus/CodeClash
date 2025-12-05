"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { Loader2, AlertCircle } from "lucide-react"
import { getProblems } from "@/lib/api"

export default function ProblemsPage() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [difficulty, setDifficulty] = useState("")
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  const LIMIT = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [difficulty, category, search])

  useEffect(() => {
    fetchProblems()
  }, [currentPage, difficulty, category, search])

  const fetchProblems = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await getProblems(currentPage, LIMIT, { difficulty, category, search })
      setProblems(data.problems || [])
      setTotalPages(data.pages || 1)
    } catch (err) {
      setError(err.message || "Failed to load problems")
      setProblems([])
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "hard":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Coding Problems</h1>
          <p className="text-lg text-gray-600">Solve problems and compete with other coders</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-xl bg-white border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black placeholder-gray-600"
            />
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
            >
              <option value="" className="text-black">All Difficulties</option>
              <option value="easy" className="text-black">Easy</option>
              <option value="medium" className="text-black">Medium</option>
              <option value="hard" className="text-black">Hard</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
            >
              <option value="" className="text-black">All Categories</option>
              <option value="Arrays" className="text-black">Arrays</option>
              <option value="Strings" className="text-black">Strings</option>
              <option value="Linked Lists" className="text-black">Linked Lists</option>
              <option value="Stacks" className="text-black">Stacks</option>
              <option value="Dynamic Programming" className="text-black">Dynamic Programming</option>
              <option value="Graph" className="text-black">Graph</option>
              <option value="Design" className="text-black">Design</option>
              <option value="Math" className="text-black">Math</option>
              <option value="Backtracking" className="text-black">Backtracking</option>
            </select>
            <button
              onClick={() => {
                setSearch("")
                setDifficulty("")
                setCategory("")
              }}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
        ) : (
          <>
            {/* Problems List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {problems.length > 0 ? (
                problems.map((problem) => (
                  <motion.div
                    key={problem.id}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                  >
                    <Link href={`/problems/${problem.id}`}>
                      <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all cursor-pointer group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors">
                              {problem.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{problem.category}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm text-gray-600 bg-gray-100">
                              {problem.accepted} solved
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No problems found</p>
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === idx + 1
                          ? "bg-gray-900 text-white"
                          : "border border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
