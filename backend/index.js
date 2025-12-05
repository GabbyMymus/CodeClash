import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import problemRoutes from "./routes/problemRoutes.js"
import friendRoutes from "./routes/friendRoutes.js"


dotenv.config()

const app = express()

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
}))

app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/problems", problemRoutes)
app.use("/api/friends", friendRoutes)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log("server status OK"))
