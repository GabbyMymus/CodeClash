import express from "express"
import { getProblems, getProblem, createNewProblem, updateExistingProblem, deleteExistingProblem } from "../controllers/problemController.js"
import { adminAuth } from "../middleware/adminAuth.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getProblems)
router.get("/:id", getProblem)
router.post("/", auth, adminAuth, createNewProblem)
router.put("/:id", auth, adminAuth, updateExistingProblem)
router.delete("/:id", auth, adminAuth, deleteExistingProblem)

export default router

