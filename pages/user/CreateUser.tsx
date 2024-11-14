import React, { useState } from 'react';

const CreateUser: React.FC = () => {
    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        lastName: '',
        middleName: '',
        email: '',
        password: '',
        re_password: '',
        phoneNumber: undefined,
        role: '',
        permissions: [],
        profileImage: '',
        dob: undefined,
        address: {
            village: '',
            city: '',
            state: '',
            country: '',
            pincode: undefined,
            landmark: '',
        },
        isVerified: false,
        status: '',
        notificationsEnabled: false,
        notificationPreferences: undefined,
        lastLogin: undefined,
        loginHistory: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Process form submission here (e.g., send formData to API)
        console.log(formData);
    };

    return (
        <div className="w-fit mx-auto p-4 my-16 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">New User: Sign UP</h2>
            <form onSubmit={handleSubmit} className=" text-xs space-y-4">
                {/* Name */}
                <div className='flex space-x-2'>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        minLength={3}
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                    />
                    <input
                        type="text"
                        name="middleName"
                        placeholder="Middle Name"
                        value={formData.middleName}
                        minLength={3}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        minLength={3}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                    />
                </div>
                <div className="flex space-x-2">
                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        pattern="\S+@\S+\.\S+"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                    />
                    {/* Phone Number */}
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        pattern="\d{10}"
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                    />
                </div>
                <div className="flex space-x-2">
                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        minLength={6}
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                    />
                    {/* Re-Password */}
                    <input
                        type="password"
                        name="re_password"
                        placeholder="Confirm Password"
                        value={formData.password}
                        minLength={6}
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                    />
                </div>

                {/* Role */}
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                >
                    <option className='dark:text-gray-500' value="user">User</option>
                    <option className='dark:text-gray-500' value="admin">Admin</option>
                </select>

                <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    Resiter
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
