import type { NextApiRequest, NextApiResponse } from 'next';
import connectdb from '../../../config/db';
import User from '../../../models/userSchema';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectdb();
  if (req.method === 'POST') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];

    try {
      // Step 1: Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (!decoded || typeof decoded !== 'object' || !decoded.id) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }
      // Step 2: Find the user
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(400).json({ success: false, message: 'Unauthorized Access' });
      }

      // Return user data (example)
      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.error('Error getting user:', error);
      if ((error as any).name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token has expired' });
      }
      return res.status(500).json({ success: false, message: 'Internal Server Error When Get User', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
