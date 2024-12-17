import { NextApiRequest, NextApiResponse } from 'next';

const logoutHandler = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            // Clear the 'token' cookie
            res.setHeader(
                'Set-Cookie',
                `token=; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC`
            );

            // Respond to the client
            return res.status(200).json({ message: 'Logout successful' });
        } else {
            // Handle invalid methods
            return res.setHeader('Allow', ['POST']).status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Logout failed', error });
    }
};

export default logoutHandler;
