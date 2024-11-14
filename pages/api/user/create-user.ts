import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectdb from '../../../config/db';
import User, { IUser } from '../../../models/userSchema';

type Data = {
    success: boolean;
    user?: IUser;
    users?: IUser[];
    message?: string;
    error?: unknown;
};

const batchSize = 100; // Define the batch size for inserting users

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await connectdb();

    if (req.method === 'POST') {
        // Extract users from the request body
        const { users }: { users: IUser[] } = req.body;
        try {
            const customSalt: string = process.env.MY_SECRET_PHRASE || '';
            // Step 1: Hash all user passwords concurrently
            const hashedUsers = await Promise.all(
                users.map(async (user) => {
                    const saltedPassword = customSalt + user.password;
                    const hashedPassword = await bcrypt.hash(saltedPassword, 8); // 8 salt rounds for speed
                    return { ...user, password: hashedPassword, createdAt: new Date(), updatedAt: new Date() };
                })
            );

            // Step 2: Insert users in batches to avoid large database writes
            for (let i = 0; i < hashedUsers.length; i += batchSize) {
                const batch = hashedUsers.slice(i, i + batchSize);
                await User.insertMany(batch);
            }

            res.status(201).json({ success: true, message: 'User accounts created successfully' });
        } catch (error) {
            console.error('Error creating users:', error);
            res.status(500).json({ success: false, message: 'User account creation failed', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
