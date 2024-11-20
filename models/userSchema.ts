// models/userSchema.ts

import mongoose, { Document, Schema } from 'mongoose';

// User के लिए TypeScript का इंटरफेस
export interface IUser extends Document { // Use `export` here
    name: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: number;
    role: 'user' | 'admin' | 'employee' | 'sr_employee' | 'supervisor' | 'hr' | 'tl' | 'manager' | 'share_holder' | 'owner';
    permissions?: string;
    profileImage?: string;
    dob?: Date;
    address?: {
        village?: string;
        city?: string;
        state?: string;
        country?: string;
        pincode?: number;
        landmark?: string;
    };
    isVerified: boolean;
    status: 'active' | 'suspended' | 'deleted' | 'inactive';
    notificationsEnabled: boolean;
    notificationPreferences?: string[];
    lastLogin?: Date;
    loginHistory?: Array<{
        timestamp: Date;
        ipAddress: string;
    }>;
}

// User के लिए Mongoose स्कीमा
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, unique: true, required: true },
    role: {
        type: String,
        enum: ['user', 'admin', 'employee', 'sr_employee', 'supervisor', 'hr', 'tl', 'manager', 'share_holder', 'owner'],
        default: 'user',
    },
    permissions: [{ type: String, enum: ['user', 'admin', 'employee'] }],
    profileImage: { type: String },
    dob: { type: Date },
    address: {
        village: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: Number },
        landmark: { type: String }
    },
    isVerified: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['active', 'suspended', 'deleted', 'inactive'],  // Added "inactive" here
        default: 'active'
    },
    notificationsEnabled: { type: Boolean, default: false },
    notificationPreferences: [{ type: String }],
    lastLogin: { type: Date },
    loginHistory: [
        {
            timestamp: { type: Date },
            ipAddress: { type: String }
        }
    ],
}, { timestamps: true, });

// Model बनाएं और एक्सपोर्ट करें
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
