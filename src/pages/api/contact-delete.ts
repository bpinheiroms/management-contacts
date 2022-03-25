import nextConnect from 'next-connect';
import authorize from './middleware/authorize';
import { NextApiResponse } from 'next';
import { prisma } from './database/prismaClient';
const handler = nextConnect();

handler.use(authorize);

handler.delete(async (req: any, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const contact = await prisma.contacts.findUnique({
      where: {
        id: id,
      },
    });

    if (!contact) {
      return res.status(400).json({ message: 'Sorry, it is not possible!' });
    }

    const updateContact = await prisma.contacts.delete({
      where: {
        id: id,
      },
    });

    res.json(updateContact);
  } catch (err) {
    res.status(400).json({ message: 'Error deleting contact!' });
  }
});

export default handler;
