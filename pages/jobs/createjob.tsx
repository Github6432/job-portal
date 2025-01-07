import React, { useState } from 'react';

// interface ApplicationFee {
//     category: string;
//     fee?: number;
// }

// interface ImportantDate {
//     label: string;
//     date: string | Date;
// }


interface JobData {
    title: string;
    organization: string;
    department: string;
    jobType: string;
    category: string;
    vacancies: number;
    salary: string;
    location: string;
    postName: string;
    shortInfo: string;
    // applicationFee: ApplicationFee[];
    // importantDates: ImportantDate[];
    status: string;
    applicationProcess: string;
    additionalInfo?: string;
    officialNotificationUrl?: string;  //PENDING => CHANHE TO PDF AND SAVE TO OWN DATA BASE 
    // shortNotification?: string;
}

const CreateJobForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [jobData, setJobData] = useState<JobData>({
        title: '',
        organization: '',
        department: '',
        jobType: '',
        category: '',
        vacancies: 0,
        salary: '',
        location: '',
        postName: '',
        shortInfo: '',
        // applicationFee: [{ category: '' }],
        // importantDates: [{ label: '', date: '' }],
        status: '', // Added field
        applicationProcess: '', // Added field
    });

    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('JJJJJDATA',jobData)
        try {
            const response = await fetch('/api/jobs/createjob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobData),
            });
            const result = await response.json();

            if (result.success) {
                setMessage('Job created successfully!');
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error creating job:', error);
            setMessage('Failed to create job.');
        }
        setIsSubmitting(false)
    };

    return (
        <form onSubmit={handleSubmit} className="w-full p-1 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Create Job</h1>
            <div className='flex flex-col sm:flex-row border-red-500 border'>
                {/* CREATE JOB POST */}
                <div className='md:w-7/12 text-sm border border-blue-700 m-1 p-1 flex justify-center'>
                    <div>
                        <p className='w-fit mx-auto font-semibold uppercase'>create job</p>
                        <div className='w-full flex gap-2 mb-2'>
                            <div>
                                <label htmlFor="title" className="text-sm font-medium ml-1 ">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Job Title"
                                    value={jobData.title}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="organization" className="text-sm font-medium ml-1 ">Organization</label>
                                <input
                                    type="text"
                                    name="organization"
                                    placeholder="Organization"
                                    value={jobData.organization}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="department" className="text-sm font-medium ml-1 ">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    placeholder="Department"
                                    value={jobData.department}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-full flex gap-2 mb-2'>
                            <div className=''>
                                <label htmlFor="jobType" className="text-sm font-medium ml-1 ">Job Type</label>
                                <select
                                    name="jobType"
                                    value={jobData.jobType}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                >
                                    <option className='dark:text-gray-500' >Select Job Type</option>
                                    <option className='dark:text-gray-500' value="government">Government</option>
                                    <option className='dark:text-gray-500' value="private">Private</option>
                                    <option className='dark:text-gray-500' value="contractual">Contractual</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="category" className="text-sm font-medium ml-1 ">Job Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Job Category"
                                    value={jobData.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="vacancies" className="text-sm font-medium ml-1 ">Total Vacancies</label>
                                <input
                                    type="number"
                                    name="vacancies"
                                    placeholder="Total Vacancies"
                                    value={jobData.vacancies}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-full flex gap-2 mb-2'>
                            <div>
                                <label htmlFor="salary" className="text-sm font-medium ml-1 ">Salary</label>
                                <input
                                    type="number"
                                    name="salary"
                                    placeholder="Salary"
                                    value={jobData.salary}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                    required
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="location" className="text-sm font-medium ml-1 ">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={jobData.location}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-full flex gap-2 mb-2'>
                            <div className='w-full'>
                                <label htmlFor="postName" className="text-sm font-medium ml-1 ">Name of the post</label>
                                <textarea
                                    name="postName"
                                    placeholder="Enter Name of the post"
                                    value={jobData.postName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <div className='w-full flex gap-2 mb-2'>
                            <div className='w-full'>
                                <label htmlFor="shortInfo" className="text-sm font-medium ml-1 ">Short information of the post</label>
                                <textarea
                                    name="shortInfo"
                                    placeholder="Enter short information of the post"
                                    value={jobData.shortInfo}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 px-4 rounded ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'} text-white hover:bg-blue-600 transition`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Post Now'}
                        </button>
                    </div>
                </div>
                {/* SHOWING JOB DETAILS */}
                <div className='md:w-5/12 flex justify-center border text-sm border-blue-700 m-1 p-1'>
                    <div>
                        <p className='w-fit mx-auto font-semibold uppercase'>show job details</p>
                        <div className='flex mb-2'>
                            <p className='w-4/12 text-red-500'>Name of the post :</p>
                            <p className='w-8/12'> {jobData.postName}</p>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <p><span className='w-full text-red-500'>Post Date :</span>15/12/2024</p>
                            <p><span className='w-full text-red-500'>Update Date :</span>Job creating form</p>
                        </div>
                        <div className='flex mb-2'>
                            <p className='w-4/12 text-red-500'>Short Information :</p>
                            <p className='w-8/12'> <span className='text-blue-500'>{jobData.organization}</span> {jobData.shortInfo}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                        {/* Message */}
                        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                    </div>
        </form>
    );
};

export default CreateJobForm;
