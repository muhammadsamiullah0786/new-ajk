import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@ajkinsurance.com'
  const password = process.env.ADMIN_PASSWORD ?? 'ChangeMe123!'

  const existing = await prisma.adminUser.findUnique({ where: { email } })
  if (existing) {
    console.log(`Admin already exists: ${email}`)
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const admin = await prisma.adminUser.create({ data: { email, passwordHash } })
  console.log(`Created admin: ${admin.email}`)
  console.log(`Password: ${password}`)
  console.log('IMPORTANT: Change your password after first login.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
