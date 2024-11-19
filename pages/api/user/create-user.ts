import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectdb from '../../../config/db';
import User, { IUser } from '../../../models/userSchema';

type Data = {
    success: boolean;
    user?: IUser;
    message?: string;
    error?: unknown;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await connectdb(); // Establish database connection
    console.log('ok1')

    if (req.method === 'POST') {
        console.log('ok2')
        const { user }: { user: Partial<IUser> } = req.body;
        try {
            // Step 2: Check if the user already exists
            const existingUser = await User.findOne({ $or: [{ email: user.email }, { phoneNumber: user.phoneNumber }] });
            if (existingUser) {
                return res.status(409).json({ success: false, message: 'User with this email or phone number already exists' });
            }

            // Step 3: Hash Password
            const customSalt: string = process.env.MY_SECRET_PHRASE || "";
            console.log('custum salt', customSalt)
            // Step 1: Hash all user passwords concurrently
            const saltedPassword = customSalt + user.password;
            const hashedPassword = await bcrypt.hash(saltedPassword, 8); // 8 salt rounds for speed

            // Step 4: Create New User Object
            const newUser = new User({ ...user, password: hashedPassword, });

            // Step 5: Save User to Database
            const savedUser = await newUser.save();

            // Step 6: Respond to Client
            res.status(201).json({ success: true, user: savedUser, message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(500).json({ success: false, message: 'Internal server error', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
