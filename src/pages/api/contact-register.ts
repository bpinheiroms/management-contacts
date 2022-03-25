import nextConnect from 'next-connect';

import authorize from './middleware/authorize';
import { NextApiResponse } from 'next';
import { prisma } from './database/prismaClient';
const handler = nextConnect();

handler.use(authorize);

handler.post(async (req: any, res: NextApiResponse) => {
  const { email, name } = req.body;

  try {
    const contactCreated = await prisma.contacts.create({
      data: {
        email,
        name,
        user: {
          connect: {
            id: req.user.sub,
          },
        },
      },
    });

    res.json(contactCreated);
  } catch (err) {
    res.status(400).json({ message: 'Error creating contact!' });
  }
});

export default handler;
