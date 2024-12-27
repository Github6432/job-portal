import type { NextApiRequest, NextApiResponse } from 'next';
import connectdb from '../../../config/db';
import User from '../../../models/userSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectdb();

  // Handle DELETE request (Admin Delete User by ID)
  if (req.method === 'DELETE') {
    // Ensure the user ID to delete is passed as a query parameter
    const userId = req.body;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    try {
      // Find and delete the user by their ID
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({ success: true, message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
