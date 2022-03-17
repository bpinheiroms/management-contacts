import nextConnect from 'next-connect';

import authorize from './middleware/authorize';
import { NextApiResponse } from 'next';
import { prisma } from './database/prismaClient';
const handler = nextConnect();

handler.use(authorize);

handler.put(async (req: any, res: NextApiResponse) => {
  const { email, name, id } = req.body;

  try {
    const contact = await prisma.contacts.findUnique({
      where: {
        id: id,
      },
    });

    if (!contact) {
      return res.status(400).json({ message: 'Sorry, it is not possible!' });
    }

    const updateContact = await prisma.contacts.update({
      where: {
        id: id,
      },
      data: {
        email,
        name,
      },
    });

    res.json(updateContact);
  } catch (err) {
    res.status(400).json({ message: 'Error updating contact!' });
  }
});

export default handler;
