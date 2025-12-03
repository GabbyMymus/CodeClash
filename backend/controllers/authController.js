import { signupService, loginService } from "../services/authService.js"

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
