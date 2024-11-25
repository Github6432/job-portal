import type { NextApiRequest, NextApiResponse } from 'next';
import connectdb from '../../../config/db';
import User from '../../../models/userSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectdb();
  if (req.method === 'POST') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'User ID is missing' });
    }

    try {
      // Step 1: Check for existing users
      const user = await User.findOne({ _id:id });

      if (!user) {
        return res.status(400).json({ success: false, message: 'Unauthorized Access' });
      }

      // Return user data (example)
      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.error('Error getting user:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error When Get User', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
