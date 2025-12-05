"use client"

import { motion } from "framer-motion"
import AuthCard from "@/components/AuthCard"
import Navbar from "@/components/navigation/navbar"
import { CheckCircle2, Lock, Users, Zap, Mail } from "lucide-react"

export default function SignupPage() {
  const tips = [
    {
      icon: CheckCircle2,
      title: "Email verified",
      desc: "For account security"
    },
    {
      icon: Lock,
      title: "Strong password",
      desc: "Minimum 6 characters"
    },
    {
      icon: Users,
      title: "Social login",
      desc: "GitHub or Google"
    }
  ]

  const steps = [
    { number: 1, text: "Create your account" },
    { number: 2, text: "Choose your username" },
    { number: 3, text: "Start competing" }
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
            {/* Left Side - Onboarding Info */}
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
                  Join the Arena
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-xl text-gray-600 leading-relaxed"
                >
                  Create your CodeClash account today and join thousands of developers competing in real-time coding battles.
                </motion.p>
              </div>

              {/* Steps */}
              <motion.div
                variants={containerVariants}
                className="space-y-3"
              >
                {steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold text-sm">
                      {step.number}
                    </div>
                    <span className="text-gray-700 font-medium">{step.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Tips Grid */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
              >
                {tips.map((tip, idx) => {
                  const Icon = tip.icon
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="group p-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300 hover:bg-white transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 text-gray-900 mb-2 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-gray-900 text-sm">{tip.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{tip.desc}</p>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Benefits */}
              <motion.div
                variants={itemVariants}
                className="pt-6 border-t border-gray-200"
              >
                <p className="text-sm font-semibold text-gray-900 mb-3">What you get:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-900" />
                    Access to unlimited coding battles
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-900" />
                    Real-time ELO ranking system
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-900" />
                    Global leaderboard rankings
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Right Side - Auth Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AuthCard mode="signup" />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
