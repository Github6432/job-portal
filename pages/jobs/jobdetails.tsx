import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface ApplicationFee {
    category: string;
    fee: number;
}

interface ImportantDate {
    label: string;
    date: string;
}

interface JobDetails {
    title: string;
    organization: string;
    department: string;
    jobType: string;
    category: string;
    vacancies: number;
    salary?: string;
    location: string;
    applicationFee: ApplicationFee[];
    importantDates: ImportantDate[];
    applicationProcess: string;
    applyLink?: string;
    status: string;
    additionalInfo?: string;
}

const JobDetailsPage = () => {
    const [job, setJob] = useState<JobDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    // const { id } = router.query;  // Get job ID from URL
    const id = '677944d767e58b53ae06f5fb'

    useEffect(() => {
        if (!id) return;

        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`/api/jobs/update`, {
                    method: 'POST', // or 'PUT' based on your API method
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }), // Send the ID in the body
                });
                const result = await response.json();
                
                if (result.success) {
                    setJob(result.data);
                } else {
                    setError(result.message);
                }
                console.log('RESPOSE',job)
            } catch (error) {
                setError('Failed to load job details');
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (loading) return <p>Loading job details...</p>;
    if (error) return <p>{error}</p>;
    console.log(job)

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">{job?.title}</h1>

            {/* Job Organization */}
            <p className="mb-4 text-lg font-semibold">Organization: {job?.organization}</p>

            {/* Department */}
            <p className="mb-4 text-lg font-semibold">Department: {job?.department}</p>

            {/* Job Type */}
            <p className="mb-4 text-lg font-semibold">Job Type: {job?.jobType}</p>

            {/* Category */}
            <p className="mb-4 text-lg font-semibold">Category: {job?.category}</p>

            {/* Location */}
            <p className="mb-4 text-lg font-semibold">Location: {job?.location}</p>

            {/* Salary */}
            {job?.salary && <p className="mb-4 text-lg font-semibold">Salary: {job.salary}</p>}

            {/* Vacancies */}
            <p className="mb-4 text-lg font-semibold">Vacancies: {job?.vacancies}</p>

            {/* Application Fee */}
            <h3 className="text-xl font-semibold mt-6 mb-2">Application Fee</h3>
            <ul className="mb-4">
                {job?.applicationFee.map((fee, index) => (
                    <li key={index} className="mb-2">
                        {fee.category}: ₹{fee.fee}
                    </li>
                ))}
            </ul>

            {/* Important Dates */}
            <h3 className="text-xl font-semibold mt-6 mb-2">Important Dates</h3>
            <ul className="mb-4">
                {job?.importantDates.map((date, index) => (
                    <li key={index} className="mb-2">
                        {date.label}: {new Date(date.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>

            {/* Application Process */}
            <h3 className="text-xl font-semibold mt-6 mb-2">Application Process</h3>
            <p className="mb-4">{job?.applicationProcess}</p>

            {/* Apply Link */}
            {job?.applyLink && (
                <a href={job.applyLink} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                    Apply Here
                </a>
            )}

            {/* Additional Info */}
            {job?.additionalInfo && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
                    <p>{job?.additionalInfo}</p>
                </div>
            )}
        </div>
    );
};

export default JobDetailsPage;
