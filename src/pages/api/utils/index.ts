const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import { serialize, parse } from 'cookie';

const TOKEN_NAME = 'token';
const MAX_AGE = 60 * 10 * 1000; // 1 week
const expiresIn = '1h';

const createToken = (user: any) => {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn },
  );
};

const hashPassword = (password: any) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err: any, salt: any) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err: any, hash: any) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (passwordAttempt: any, hashedPassword: any) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const setTokenCookie = (res: any, token: any) => {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(new Date().valueOf() + MAX_AGE),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', [cookie]);
};

const parseCookies = (req: any) => {
  if (req.cookies) return req.cookies;

  const cookie = req.headers?.cookie;
  return parse(cookie || '');
};

const getTokenCookie = (req: any) => {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
};

export {
  createToken,
  hashPassword,
  verifyPassword,
  setTokenCookie,
  getTokenCookie,
};
