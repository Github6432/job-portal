import type { NextApiRequest, NextApiResponse } from 'next';
import connectdb from '../../../config/db';
import User from '../../../models/userSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectdb();

  // Handle PUT request (Admin Update User by ID)
  if (req.method === 'PUT') {
    // Ensure the user ID to update is passed as a query parameter
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    // Find the user to update by their ID
    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // The fields to be updated (these will be in the request body)
    const { name, email, role, phoneNumber, dob, address, profileImage } = req.body;

    try {
      // Perform the update
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, role, phoneNumber, dob, address, profileImage },
        { new: true } // This option returns the updated document
      );

      if (!updatedUser) {
        return res.status(400).json({ success: false, message: 'User update failed' });
      }

      return res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
