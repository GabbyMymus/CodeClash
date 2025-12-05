"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { Search, Filter, Loader2, AlertCircle } from "lucide-react"
import { getProblems } from "@/lib/api"

export default function ProblemsPage() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [difficulty, setDifficulty] = useState("all")
  const [category, setCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const LIMIT = 10

  useEffect(() => {
    fetchProblems()
  }, [currentPage, difficulty, category, searchTerm])

  const fetchProblems = async () => {
    setLoading(true)
    setError("")
    try {
      const filters = {}
      if (difficulty !== "all") filters.difficulty = difficulty
      if (category !== "all") filters.category = category
      if (searchTerm) filters.search = searchTerm

      const data = await getProblems(currentPage, LIMIT, filters)
      setProblems(data.problems || [])
      setTotalPages(data.pages || 1)
    } catch (err) {
      setError(err.message || "Failed to load problems")
      setProblems([])
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyColor = (diff) => {
    if (diff === "easy") return "text-green-600 bg-green-50"
    if (diff === "medium") return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
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

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-end"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-3 rounded-lg border border-gray-200 bg-white"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-3 rounded-lg border border-gray-200 bg-white"
            >
              <option value="all">All Categories</option>
              <option value="Array">Array</option>
              <option value="String">String</option>
              <option value="Math">Math</option>
              <option value="Dynamic Programming">Dynamic Programming</option>
              <option value="Graph">Graph</option>
            </select>
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
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
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
