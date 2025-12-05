"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"
import { Loader2, AlertCircle, Trash2, Edit2, Plus } from "lucide-react"
import { getProblems, createProblem, updateProblem, deleteProblem } from "@/lib/api"

export default function AdminProblemsPage() {
  const router = useRouter()
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const LIMIT = 10

  const [formData, setFormData] = useState({
    title: "",
    difficulty: "easy",
    category: "Arrays",
    description: "",
    constraints: "",
    examples: "",
  })

  useEffect(() => {
    fetchProblems()
  }, [currentPage])

  const fetchProblems = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await getProblems(currentPage, LIMIT)
      setProblems(data.problems || [])
      setTotalPages(data.pages || 1)
    } catch (err) {
      setError(err.message || "Failed to load problems")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      if (editingId) {
        await updateProblem(editingId, formData)
        setSuccess("Problem updated successfully!")
      } else {
        await createProblem(formData)
        setSuccess("Problem created successfully!")
      }
      
      setFormData({
        title: "",
        difficulty: "easy",
        category: "Arrays",
        description: "",
        constraints: "",
        examples: "",
      })
      setEditingId(null)
      setShowForm(false)
      setCurrentPage(1)
      fetchProblems()
    } catch (err) {
      setError(err.message || "Failed to save problem")
    }
  }

  const handleEdit = (problem) => {
    setFormData({
      title: problem.title,
      difficulty: problem.difficulty,
      category: problem.category,
      description: problem.description,
      constraints: problem.constraints,
      examples: problem.examples,
    })
    setEditingId(problem.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this problem?")) return

    try {
      await deleteProblem(id)
      setSuccess("Problem deleted successfully!")
      fetchProblems()
    } catch (err) {
      setError(err.message || "Failed to delete problem")
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      title: "",
      difficulty: "easy",
      category: "Arrays",
      description: "",
      constraints: "",
      examples: "",
    })
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin - Manage Problems</h1>
              <p className="text-lg text-gray-600">Create, edit, and delete coding problems</p>
            </div>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Problem
              </button>
            )}
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

        {/* Success State */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200"
          >
            <p className="text-sm text-green-600">{success}</p>
          </motion.div>
        )}

        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-xl bg-white border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? "Edit Problem" : "Create New Problem"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                    placeholder="Problem title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                  >
                    <option value="Arrays">Arrays</option>
                    <option value="Strings">Strings</option>
                    <option value="Linked Lists">Linked Lists</option>
                    <option value="Stacks">Stacks</option>
                    <option value="Dynamic Programming">Dynamic Programming</option>
                    <option value="Graph">Graph</option>
                    <option value="Design">Design</option>
                    <option value="Math">Math</option>
                    <option value="Backtracking">Backtracking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                  placeholder="Problem description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Constraints</label>
                <textarea
                  name="constraints"
                  value={formData.constraints}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                  placeholder="Problem constraints"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Examples</label>
                <textarea
                  name="examples"
                  value={formData.examples}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                  placeholder="Problem examples"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                >
                  {editingId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
        ) : (
          <>
            {/* Problems Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-gray-200 overflow-hidden bg-white"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Difficulty</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Accepted</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {problems.length > 0 ? (
                      problems.map((problem) => (
                        <tr key={problem.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-900">{problem.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{problem.category}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{problem.accepted}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEdit(problem)}
                                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                onClick={() => handleDelete(problem.id)}
                                className="p-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <p className="text-gray-600">No problems found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
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
