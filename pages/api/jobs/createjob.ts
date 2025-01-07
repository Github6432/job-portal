import connectdb from '@/config/db';
import Job from '@/models/jobSchema';
import { NextApiRequest, NextApiResponse } from 'next';
// GET and POST handlers
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectdb();
    const { method } = req;
    switch (method) {
        case 'GET': {
            try {
                const jobs = await Job.find({});
                if(!jobs){
                    return res.status(400).json({ success: false, message: 'No Jobs Found' });
                }
                return res.status(200).json({ success: true, message: 'All job listed',data: jobs });
            } catch (error) {
                return res.status(400).json({ success: false, message: 'Internal server error when finding all jobs', error });
            }
        }
        
        case 'POST': {
            try {
                const newJob = new Job(req.body);
                const savedJob = await newJob.save();
                return res.status(201).json({ success: true, message: 'New job poseted successfully', data: savedJob });
            } catch (error) {
                console.log(error)
                return res.status(400).json({ success: false, message:'Internal server error when creating job', error });
            }
        }

        default:
            return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};

export default handler;

