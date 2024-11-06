import mongoose, { Document, Schema } from 'mongoose';

// User के लिए TypeScript का इंटरफेस
interface IUser extends Document {
    userId: string;
    name: string;
    email: string;
    password: string;
    phoneNumber?: Number;
    role: 'user' | 'admin' | 'employee' | 'sr_employee' | 'supervisor' | 'hr' | 'tl' | 'manager' | 'share_holder' | 'owner';
    permissions?: string[];
    profileImage?: string;
    dob?: Date;
    address?: {
        village?: string;
        city?: string;
        state?: string;
        country?: string;
        pincode?: Number;
        landmark?: string;
    };
    isVerified: boolean;
    status: 'active' | 'suspended' | 'deleted';
    createdAt: Date;
    updatedAt: Date;
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
    userId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String, required: true },
    phoneNumber: { type: Number, unique: true, required: true },
    role: {
        type: String,
        enum: ['user', 'admin', 'employee', 'sr_employee', 'supervisor', 'hr', 'tl', 'manager', 'share_holder', 'owner'],
        default: 'user'
    },
    permissions: [{ type: String }],
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
        enum: ['active', 'suspended', 'deleted'],
        default: 'active'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    notificationsEnabled: { type: Boolean, default: true },
    notificationPreferences: [{ type: String }],
    lastLogin: { type: Date },
    loginHistory: [
        {
            timestamp: { type: Date },
            ipAddress: { type: String }
        }
    ],
});

// Model बनाएं और एक्सपोर्ट करें
export default mongoose.model<IUser>('User', UserSchema);