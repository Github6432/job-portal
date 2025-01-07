import { NextApiRequest, NextApiResponse } from 'next';
import connectdb from '@/config/db';
import Job from '@/models/jobSchema';

// GET, PUT, DELETE handlers
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectdb()

    const { method } = req;
    const { id } = req.body;

    switch (method) {
        case 'POST': {
            try {
                const job = await Job.findById(id);
                if (!job) {
                    return res.status(404).json({ success: false, message: 'Job not found' });
                }
                return res.status(200).json({ success: true, message: 'Job details listed successfully', data: job });
            } catch (error) {
                return res.status(400).json({ success: false, message: 'Internal server error when fetching job', error });
            }
        }

        case 'PUT': {
            try {
                const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
                if (!updatedJob) {
                    return res.status(404).json({ success: false, message: 'Job not found for updating' });
                }
                return res.status(200).json({ success: true, message: 'Updated job details', data: updatedJob });
            } catch (error) {
                return res.status(400).json({ success: false, message: 'Internal server errror when update job', error });
            }
        }

        case 'DELETE': {
            try {
                const deletedJob = await Job.findByIdAndDelete(id);
                if (!deletedJob) {
                    return res.status(404).json({ success: false, message: 'Job not found' });
                }
                return res.status(200).json({ success: true, data: deletedJob });
            } catch (error) {
                return res.status(400).json({ success: false, message:'Internal server error when deleting job', error });
            }
        }

        default:
            return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};

export default handler;
