"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import CodeEditor from "@/components/CodeEditor"
import { ChevronLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { getProblemById } from "@/lib/api"

export default function ProblemPage({ params }) {
  const [isLoading, setIsLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState("")
  const [result, setResult] = useState(null)
  const [tab, setTab] = useState("description")
  const [problem, setProblem] = useState(null)

  // Unwrap params (Next.js 16 may provide params as a Promise)
  const resolvedParams = React.use(params)

  useEffect(() => {
    fetchProblem()
  }, [resolvedParams.id])

  const fetchProblem = async () => {
    setPageLoading(true)
    setError("")
    try {
      const data = await getProblemById(resolvedParams.id)
      setProblem(data)
    } catch (err) {
      setError(err.message || "Failed to load problem")
      // Fallback to mock data for demo
      setProblem({
        id: resolvedParams.id,
        title: "Problem Not Found",
        difficulty: "Easy",
        category: "Demo",
        description: "This problem could not be loaded from the server.",
        constraints: ["This is a demo mode"],
        examples: ""
      })
    } finally {
      setPageLoading(false)
    }
  }

  const handleSubmit = async ({ code, language }) => {
    setIsLoading(true)
    try {
      // Simulate API call to judge0
      await new Promise(resolve => setTimeout(resolve, 2000))
      setResult({
        status: "Accepted",
        message: "All test cases passed!",
        runtime: "52ms",
        memory: "13.8MB"
      })
    } catch (error) {
      setResult({
        status: "Runtime Error",
        message: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link href="/problems" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ChevronLeft className="w-5 h-5" />
          Back to Problems
        </Link>

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
        {pageLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          </div>
        ) : problem ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Problem Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-8 h-fit"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{problem.title}</h1>

              <div className="flex gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-sm font-medium text-green-600 bg-green-50 capitalize">
                  {problem.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-sm text-gray-600 bg-gray-100">
                  {problem.category}
                </span>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 border-b mb-6">
                {["description", "constraints"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`pb-2 font-medium border-b-2 transition-colors ${
                      tab === t
                        ? "text-gray-900 border-gray-900"
                        : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {tab === "description" && (
                <div className="text-gray-700 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {problem.description}
                </div>
              )}

              {tab === "constraints" && (
                <div className="space-y-2">
                  {Array.isArray(problem.constraints) 
                    ? problem.constraints.map((constraint, idx) => (
                        <p key={idx} className="text-gray-700 font-mono text-sm">
                          • {constraint}
                        </p>
                      ))
                    : typeof problem.constraints === "string"
                      ? problem.constraints.split("\n").map((line, idx) => (
                          <p key={idx} className="text-gray-700 font-mono text-sm">
                            • {line}
                          </p>
                        ))
                      : null
                  }
                </div>
              )}
            </motion.div>

            {/* Right - Code Editor */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-4"
            >
              <CodeEditor onSubmit={handleSubmit} isLoading={isLoading} />

              {/* Result */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-xl border-2 ${
                    result.status === "Accepted"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.status === "Accepted" ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h3 className={`font-semibold text-lg ${result.status === "Accepted" ? "text-green-900" : "text-red-900"}`}>
                        {result.status}
                      </h3>
                      <p className={`text-sm mt-1 ${result.status === "Accepted" ? "text-green-800" : "text-red-800"}`}>
                        {result.message}
                      </p>
                      {result.runtime && (
                        <div className="mt-3 space-y-1 text-sm text-gray-700">
                          <p>Runtime: {result.runtime}</p>
                          <p>Memory: {result.memory}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
