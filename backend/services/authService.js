import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export async function getUserById(id) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new Error("User not found")
  delete user.password
  return user
}

export async function signupService(email, password) {
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) throw new Error("Email already registered")

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hashedPassword }
  })

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  delete user.password
  return { token, user }
}

export async function loginService(email, password) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error("User not found")

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error("Invalid password")

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  delete user.password
  return { token, user }
}

export async function getLeaderboard(limit = 100) {
  const users = await prisma.user.findMany({
    take: limit,
    orderBy: { elo: "desc" },
    select: { id: true, email: true, elo: true, createdAt: true }
  })
  return users
}

export async function updateUserProfile(id, { email, elo }) {
  if (email) {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser && existingUser.id !== id) throw new Error("Email already in use")
  }
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { ...(email && { email }), ...(elo !== undefined && { elo }) }
  })
  delete updatedUser.password
  return updatedUser
}

export async function deleteUserAccount(id) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new Error("User not found")
  return await prisma.user.delete({ where: { id } })
}
