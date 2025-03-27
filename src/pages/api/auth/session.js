import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import cookie from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { token } = cookie.parse(req.headers.cookie || '');
  debugger;
  console.log('token');
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
