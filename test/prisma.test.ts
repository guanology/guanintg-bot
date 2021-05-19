import prisma from '../lib/prisma'
import { userData } from '../prisma/data'

describe('Database Test', () => {
  it('exist TelegramUsers', async () => {
    const himself65 = await prisma.telegramUsers.findUnique({
      where: {
        id: 1
      }
    })
    expect(himself65.username)
      .toStrictEqual(
        userData.filter(user => user.username === himself65.username)[0].username
      )
  })
})
