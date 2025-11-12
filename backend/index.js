// backend/index.js
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

dotenv.config()

const app = express()
const prisma = new PrismaClient()

// cors (needs adjustment before prod)
const allowedOrigin = process.env.CORS_ORIGIN || "*"
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}))
app.use(express.json())

// signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: "Email and password required" })

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) return res.status(400).json({ error: "Email already registered" })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    ) 

    delete user.password
    res.json({ token, user })
  } catch (err) {
    console.error("Signup error:", err)
    res.status(500).json({ error: "Server error" })
  }
})

// login 
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: "Email and password required" })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ error: "User not found" })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ error: "Invalid password" })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    delete user.password
    res.json({ token, user })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ error: "Server error" })
  }
})



// start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`server status OK`))
