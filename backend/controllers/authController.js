import { signupService, loginService, getUserById, getLeaderboard as getLeaderboardService, updateUserProfile, deleteUserAccount } from "../services/authService.js"

export async function signup(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" })

    const result = await signupService(email, password)
    return res.json(result)
  } catch (err) {
    console.error("Signup error:", err.message)
    return res.status(400).json({ error: err.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" })

    const result = await loginService(email, password)
    return res.json(result)
  } catch (err) {
    console.error("Login error:", err.message)
    return res.status(400).json({ error: err.message })
  }
}

export async function getProfile(req, res) {
  try {
    const userId = req.user.id
    const user = await getUserById(userId)
    return res.json(user)
  } catch (err) {
    console.error("Get profile error:", err.message)
    return res.status(400).json({ error: err.message })
  }
}

export async function getLeaderboard(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 100
    const users = await getLeaderboardService(limit)
    return res.json(users)
  } catch (err) {
    console.error("Get leaderboard error:", err.message)
    return res.status(500).json({ error: err.message })
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user.id
    const { email, elo } = req.body
    if (!email && elo === undefined) {
      return res.status(400).json({ error: "At least one field (email or elo) required" })
    }
    const updatedUser = await updateUserProfile(userId, { email, elo })
    return res.json(updatedUser)
  } catch (err) {
    console.error("Update profile error:", err.message)
    return res.status(400).json({ error: err.message })
  }
}

export async function deleteProfile(req, res) {
  try {
    const userId = req.user.id
    await deleteUserAccount(userId)
    return res.json({ message: "Account deleted successfully" })
  } catch (err) {
    console.error("Delete profile error:", err.message)
    return res.status(400).json({ error: err.message })
  }
}
