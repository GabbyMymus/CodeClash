import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@ok.com" }
    })

    if (existingAdmin) {
      console.log("✓ Admin user already exists")
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("root123456", 10)
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@ok.com",
        password: hashedPassword,
        isAdmin: true,
        elo: 9999
      }
    })

    console.log("✓ Admin user created successfully")
    console.log("  Email: admin")
    console.log("  Password: root123456")
  } catch (error) {
    console.error("Error creating admin user:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
