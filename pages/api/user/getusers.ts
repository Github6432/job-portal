import type { NextApiRequest, NextApiResponse } from 'next';
import connectdb from '../../../config/db';
import User from '../../../models/userSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectdb();
  if (req.method === 'GET') {
    try {
      // Fetch all users from the database
      const users = await User.find({});
      return res.status(200).json({ success: true, users });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
