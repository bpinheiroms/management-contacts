import nextConnect from 'next-connect';
const jwt = require('jsonwebtoken');
import { getTokenCookie } from '../utils';

async function authorize(req: any, res: any, next: any) {
  try {
    const token = getTokenCookie(req);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized' });
  }
}

const middleware = nextConnect();

middleware.use(authorize);

export default middleware;
