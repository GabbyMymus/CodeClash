"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Copy, Check } from "lucide-react"

export default function CodeEditor({ onSubmit, isLoading }) {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("python")
  const [copied, setCopied] = useState(false)

  const languages = ["python", "javascript", "cpp", "java", "c"]

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = () => {
    onSubmit({ code, language })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-gray-700">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleCopy}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Write your code here..."
          className="w-full h-80 p-4 font-mono text-sm bg-gray-900 text-white focus:outline-none resize-none"
          spellCheck="false"
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={isLoading || !code.trim()}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          {isLoading ? "Submitting..." : "Submit Code"}
        </motion.button>
      </div>
    </motion.div>
  )
}
