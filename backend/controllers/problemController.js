import { getAllProblems, getProblemById, createProblem, updateProblem, deleteProblem } from "../services/problemService.js"

export async function getProblems(req, res) {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const { difficulty, category, search } = req.query
    
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: "Page and limit must be positive integers" })
    }

    const result = await getAllProblems(page, limit, { difficulty, category, search })
    return res.json(result)
  } catch (err) {
    console.error("Get problems error:", err.message)
    return res.status(500).json({ error: err.message })
  }
}

export async function getProblem(req, res) {
  try {
    const { id } = req.params
    const problem = await getProblemById(id)
    
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" })
    }

    return res.json(problem)
  } catch (err) {
    console.error("Get problem error:", err.message)
    return res.status(500).json({ error: err.message })
  }
}

export async function createNewProblem(req, res) {
  try {
    const { title, difficulty, category, description, constraints, examples } = req.body
    
    if (!title || !difficulty || !category || !description) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const problem = await createProblem({
      title,
      difficulty,
      category,
      description,
      constraints,
      examples,
      accepted: 0
    })

    return res.status(201).json(problem)
  } catch (err) {
    console.error("Create problem error:", err.message)
    return res.status(400).json({ error: err.message })
  }
}

export async function updateExistingProblem(req, res) {
  try {
    const { id } = req.params
    const updated = await updateProblem(id, req.body)
    return res.json(updated)
  } catch (err) {
    console.error("Update problem error:", err.message)
    return res.status(400).json({ error: err.message })
  }
}

export async function deleteExistingProblem(req, res) {
  try {
    const { id } = req.params
    await deleteProblem(id)
    return res.json({ message: "Problem deleted" })
  } catch (err) {
    console.error("Delete problem error:", err.message)
    return res.status(400).json({ error: err.message })
  }
}
