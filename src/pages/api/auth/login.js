import { compare } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../../../utils/auth';
import cookie from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && await compare(password, user.password)) {
      const token = generateToken(user);
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60, // 1 hour
        sameSite: 'strict',
        path: '/',
      }));
      res.status(200).json({ id: user.id, email: user.email });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

