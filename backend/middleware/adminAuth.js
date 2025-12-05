import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function adminAuth(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" })
    }

    next()
  } catch (err) {
    console.error("Admin auth error:", err.message)
    return res.status(500).json({ error: err.message })
  }
}
