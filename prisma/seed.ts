import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    id: 1,
    first_name: 'Himself65',
    username: 'himself65'
  },
  {
    id: 2,
    first_name: '屑之魔女',
    username: 'kokodayouxie'
  }
]

async function main () {
  console.log('Start seeding ...')
  for (const data of userData) {
    const user = await prisma.user.create({
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
