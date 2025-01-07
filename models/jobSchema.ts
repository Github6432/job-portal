// models/jobSchema.ts

import mongoose, { Document, Schema } from 'mongoose';

// Job के लिए TypeScript का इंटरफेस
export interface IJob extends Document {
    title: string;
    organization: string;
    department: string;
    jobType: 'government' | 'private' | 'contractual';
    category: string; // e.g., 'UPSC', 'SSC', 'Banking', 'Teaching', etc.
    vacancies: number;
    salary?: string; // e.g., '₹50,000 - ₹1,00,000 per month'
    location: string; // e.g., 'Delhi', 'Uttar Pradesh', etc.
    postName: string
    shortInfo: string
    applicationFee: Array<{
        category: string; // e.g., 'General', 'SC/ST', 'OBC'
        fee: string | number; // Fee for that category
    }>;
    importantDates: Array<{
        label: string; // e.g., 'Start Date', 'End Date', 'Exam Date'
        date: Date | string; // Date for that label
    }>;
    eligibilityCriteria: Array<{
        title: string;
        field: string; // e.g., 'Education', 'Age Limit', 'Experience'
        value: string | { min?: number; max?: number }; // e.g., 'Graduation', { min: 18, max: 35 }
    }>;
    applyLink: Array<{
        linkTitle: string;
        linkName: string; // e.g., 'Education', 'Age Limit', 'Experience'
        linkValue: string; // e.g., 'Graduation', { min: 18, max: 35 }
    }>;
    status: 'open' | 'closed' | 'ongoing';
    // applicationProcess: string; // e.g., 'Online', 'Offline'   PENDING
    additionalInfo?: string;
    officialNotificationUrl?: string;
    // shortNotification?: string;
}

// Job के लिए Mongoose स्कीमा
const JobSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        organization: { type: String, required: true },
        department: { type: String, required: true },
        jobType: { type: String, enum: ['government', 'private', 'contractual'], required: true, },
        category: { type: String, required: true },
        vacancies: { type: Number, required: true, min: 0 },
        postName: { type: String, required: true },
        shortInfo: { type: String, required: true },
        salary: { type: String },
        location: { type: String },
        applicationFee: [
            {
                category: { type: String, }, // e.g., 'General', 'SC/ST'
                fee: { type: Number, }, // Fee amount
            },
        ],
        importantDates: [
            {
                label: { type: String, }, // e.g., 'Start Date', 'End Date'
                date: { type: Date, }, // Date for the event
            },
        ],
        eligibilityCriteria: [
            {
                title: { type: String },
                field: { type: String }, // e.g., 'Education', 'Age Limit'
                value: { type: mongoose.Schema.Types.Mixed }, // Can be string or object
            },
        ],
        // applicationProcess: { type: String, enum: ['online', 'offline'] },   PENDING
        applyLink: [
            {
                linkTitle: { type: String },
                linkName: { String }, // e.g., 'Education', 'Age Limit'
                link: { String },
            },
        ],
        additionalInfo: { type: String, },
    },
    { timestamps: true }
);

// Model बनाएं और एक्सपोर्ट करें
const Job = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
export default Job;
