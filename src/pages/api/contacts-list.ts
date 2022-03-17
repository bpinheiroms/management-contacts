import nextConnect from 'next-connect';

import authorize from './middleware/authorize';
import { NextApiResponse } from 'next';
import { prisma } from './database/prismaClient';
const handler = nextConnect();

handler.use(authorize);

handler.get(async (req: any, res: NextApiResponse) => {
  try {
    const contacts = await prisma.contacts.findMany({
      where: {
        userId: req.sub,
      },
    });

    res.json(contacts);
  } catch (err) {
    res.status(401).json({ message: 'Not authorized' });
  }
});

export default handler;
