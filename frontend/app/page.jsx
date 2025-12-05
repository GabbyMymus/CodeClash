"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { Sword, Trophy, Code2 } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: Sword,
      title: "Real-Time 1v1 Duels",
      description: "Coming soon"
    },
    {
      icon: Trophy,
      title: "ELO Rating System",
      description: "Coming soon"
    },
    {
      icon: Code2,
      title: "Multi-Language Support",
      description: "Coming soon"
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-black/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-black/5 to-transparent rounded-full blur-3xl" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            Code. Compete. Conquer.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            The ultimate real-time competitive coding platform. Challenge other developers in live 1v1 duels, climb the global leaderboard with our ELO rating system, and prove your coding mastery.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center"
          >
            <Link href="/problems">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold text-lg"
              >
                Start Competing
              </motion.button>
            </Link>
            <Link href="/leaderboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl border border-gray-200 text-gray-900 font-semibold text-lg hover:bg-gray-50"
              >
                View Leaderboard
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          >
            Why Choose CodeClash?
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group p-8 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
                >
                  <Icon className="w-8 h-8 text-gray-900 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto text-center p-12 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Compete?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Join thousands of developers competing in real-time coding duels. Start your journey to the top of the leaderboard today.
          </p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold text-lg"
            >
              Get Started Now
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
