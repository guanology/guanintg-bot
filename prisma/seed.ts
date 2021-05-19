import { PrismaClient } from '@prisma/client'

import { userData } from './data'

const prisma = new PrismaClient()

async function main () {
  console.log('Start seeding ...')
  for (const data of userData) {
    const user = await prisma.telegramUsers.create({
      data
    })
    console.log(`Created user with id: ${user.first_name}`)
  }
  console.log('Seeding finished.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
