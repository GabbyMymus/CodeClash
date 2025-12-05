import express from "express"
import { getProblems, getProblem, createNewProblem, updateExistingProblem, deleteExistingProblem } from "../controllers/problemController.js"

const router = express.Router()

router.get("/", getProblems)
router.get("/:id", getProblem)
router.post("/", createNewProblem)
router.put("/:id", updateExistingProblem)
router.delete("/:id", deleteExistingProblem)

export default router

