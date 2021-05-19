import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // fixme: need authentication
    const allUsers = await prisma.user.findMany()
    res.json(allUsers)
  }
}
