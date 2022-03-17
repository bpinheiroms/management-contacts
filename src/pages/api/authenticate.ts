import nextConnect from 'next-connect';
import { createToken, setTokenCookie, verifyPassword } from './utils';
import { NextApiResponse } from 'next';
import jwtDecode from 'jwt-decode';
import { prisma } from './database/prismaClient';

const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(403).json({
        message: 'Wrong email or password.',
      });
    }

    const passwordValid = await verifyPassword(password, user.password);

    if (!passwordValid) {
      return res.status(403).json({
        message: 'Wrong email or password.',
      });
    }

    const { name, id, role } = user;
    let userInfo: any = { name, id, role };

    const token = createToken(userInfo);

    userInfo = { ...userInfo, token };

    const decoded = jwtDecode(token) as any;

    const { exp } = decoded;

    setTokenCookie(res, token);

    res.json({
      message: 'Authentication successful!',
      userInfo,
      expiresAt: exp,
    });
  } catch (err) {
    return res.status(400).json({ message: 'Something went wrong.' });
  }
});

export default handler;
