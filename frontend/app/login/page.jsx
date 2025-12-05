"use client"

import { motion } from "framer-motion"
import AuthCard from "@/components/AuthCard"
import Navbar from "@/components/navigation/navbar"
import { Zap, Sparkles, Trophy } from "lucide-react"

export default function LoginPage() {
  const features = [
    {
      icon: Zap,
      title: "Real-time duels",
      description: "Face off in head-to-head coding battles with instant feedback"
    },
    {
      icon: Trophy,
      title: "Climb the ranks",
      description: "Earn ELO points and compete on global leaderboards"
    },
    {
      icon: Sparkles,
      title: "Stay sharp",
      description: "Challenge yourself with diverse problem sets daily"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-black/5 to-transparent rounded-full blur-3xl" />
      </div>

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Value Proposition */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-8"
            >
              <div>
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                >
                  Code. Compete. Conquer.
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-xl text-gray-600 leading-relaxed"
                >
                  Welcome back to CodeClash. Test your coding skills in real-time competitive duels, climb the global leaderboard, and prove your mastery.
                </motion.p>
              </div>

              {/* Features Grid */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {features.map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="group p-4 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300 hover:bg-white transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                          <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="flex gap-6 pt-4"
              >
                <div>
                  <p className="text-3xl font-bold text-gray-900">10K+</p>
                  <p className="text-sm text-gray-600">Active coders</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">50K+</p>
                  <p className="text-sm text-gray-600">Duels daily</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-600">Available</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Auth Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AuthCard mode="login" />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
