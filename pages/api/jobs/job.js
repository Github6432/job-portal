// import connectDB from '../../lib/db';
// import Job from '../../lib/models/Job';

import Job from "../../../models/jobSchema";
import db from "../../../config/db";

export default async function handler(req, res) {
  await db();

  if (req.method === 'GET') {
    // Get all jobs
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  } else if (req.method === 'POST') {
    // Add a new job
    try {
      console.log(req.body)
      const { title, fields, data } = req.body;
      const newJob = new Job({ title, fields, data });
      await newJob.save();
      res.status(201).json({ message: 'Job added successfully' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to add job' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
