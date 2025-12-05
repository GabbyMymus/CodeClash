import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function getAllProblems(page = 1, limit = 10, { difficulty, category, search } = {}) {
  const skip = (page - 1) * limit
  const where = {}
  if (difficulty) where.difficulty = difficulty
  if (category) where.category = category
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } }
    ]
  }
  const [problems, total] = await Promise.all([
    prisma.problem.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: "asc" }
    }),
    prisma.problem.count({ where })
  ])
  return {
    problems,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit)
  }
}

export async function getProblemById(id) {
  return await prisma.problem.findUnique({ where: { id: parseInt(id) } })
}

export async function createProblem(data) {
  return await prisma.problem.create({ data })
}

export async function updateProblem(id, data) {
  return await prisma.problem.update({
    where: { id: parseInt(id) },
    data
  })
}

export async function deleteProblem(id) {
  return await prisma.problem.delete({ where: { id: parseInt(id) } })
}