import React, { useEffect, useState } from 'react';
import DynamicTable from '../../components/DynamicTable';
// import DynamicTable from '../components/DynamicTable';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs/job');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sarkari Jobs</h1>
      {jobs.map((job) => (
        <div key={job._id} className="">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <DynamicTable fields={job.fields} data={job.data} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
