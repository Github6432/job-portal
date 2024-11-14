import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectdb from '../../../config/db';
import User, { IUser } from '../../../models/userSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectdb();

    if (req.method === 'POST') {
        // Extract users from the request body
        const { phoneNumber }: { phoneNumber: Number } = req.body;
        try {
            // Step 1: Check for existing users
            const existingUser = await User.findOne({ phoneNumber });

            if (existingUser) {
                return res.status(400).json({ vsuccess: false, message: `User with phone number ${phoneNumber} is already registered.`, });
            }
        } catch (error) {
            console.error('Error creating users:', error);
            res.status(500).json({ success: false, message: 'Exist User vailidation failed', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
