import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const CreateUser: React.FC = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        lastName: '',
        middleName: '',
        email: '',
        password: '',
        re_password: '',
        phoneNumber: '',
        role: '',
        permissions: [],
        profileImage: '',
        dob: '',
        address: {
            village: '',
            city: '',
            state: '',
            country: '',
            pincode: '',
            landmark: '',
        },
        notificationsEnabled: false,
        notificationPreferences: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, address: { ...prevData.address, [name]: value, }, }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/auth/create-user', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user: formData }),
            });
            const resData = await response.json();
            if (response.ok) {
                console.log(resData);
                alert("Registration mesage is pendig")
                setTimeout(() => {
                    router.push('/user/login');
                }, 2000);
            } else {
                console.error('Error:', resData);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    return (
        <div className="w-fit md:w-7/12  mx-auto p-4 my-16 rounded-lg shadow-lg shadow-gray-700">
            <div className='flex justify-between mx-2'>
                <h2 className="text-xl font-semibold mb-1">New User: Sign UP</h2>
                <p className="text-xl mx-10">
                    <Link href="/user/login" legacyBehavior>
                        <a className="text-blue-400 font-bold hover:text-blue-500 hover:underline">Login</a>
                    </Link>
                </p>
            </div>
            <hr className='mb-8 border border-black dark:border-white' />
            <form onSubmit={handleSubmit} className=" text-xs space-y-4">
                {/* Name */}
                <div className='flex space-x-2'>
                    <div className='space-y-1'>
                        <label htmlFor="name" className="text-sm font-medium ml-1 ">Name</label>
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
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor="middlename" className="text-sm font- ml-1 medium">Middle Name</label>
                        <input
                            type="text"
                            name="middleName"
                            placeholder="Middle Name"
                            value={formData.middleName}
                            minLength={3}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                        />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor="lastname" className="text-sm font-me ml-1 dium">Last Name</label>
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
                </div>
                <div className="flex space-x-4">
                    {/* Email */}
                    <div className='w-full space-y-1'>
                        <label htmlFor="email" className="text-sm font-medium ml-1 ">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            pattern="\S+@\S+\.\S+"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                        />
                    </div>
                    {/* Phone Number */}
                    <div className='w-full space-y-1'>
                        <label htmlFor="phone" className="text-sm font-medium ml-1 ">Phone</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber || ''}
                            pattern="\d{10}"
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                            autoComplete="new-password"
                        />
                    </div>
                </div>
                <div className="flex space-x-2">
                    {/* Password */}
                    <div className='w-full space-y-1'>
                        <label htmlFor="password" className="text-sm font-medium ml-1 ">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            minLength={6}
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                            autoComplete="new-password"
                        />
                    </div>
                    {/* Re-Password */}
                    <div className='w-full space-y-1'>
                        <label htmlFor="re-password" className="text-sm font-medium ml-1 ">Confirm Password</label>
                        <input
                            type="password"
                            name="re_password"
                            placeholder="Confirm Password"
                            value={formData.re_password}
                            minLength={6}
                            required
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                            autoComplete="new-password"
                        />
                    </div>
                </div>

                {/* Role */}
                <div className='space-y-1'>
                    <label htmlFor="role" className="text-sm font-medium ml-1 ">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                    >
                        <option className='dark:text-gray-500' value="user">User</option>
                        <option className='dark:text-gray-500' value="admin">Admin</option>
                    </select>
                </div>
                <div className='space-y-1'>
                    <label htmlFor="dob" className="text-sm font-medium ml-1 ">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        required
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                    />
                </div>
                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            checked={isChecked}
                            readOnly
                            onClick={() => setIsChecked(prev => !prev)}
                            className="form-radio text-blue-500"
                        />
                        <span>Do you want to add your address?</span>
                    </label>
                </div>
                {/* Conditionally render address fields based on isChecked */}
                {isChecked && (
                    // <div className="space-y-4 mt-4">
                    <>
                        <div className='flex space-x-2'>
                            <div className="space-y-1">
                                <label htmlFor="country" className="text-sm font-medium ml-1">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.address.country}
                                    placeholder='Country'
                                    onChange={handleAddressChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="state" className="text-sm font-medium ml-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.address.state}
                                    placeholder='State'
                                    onChange={handleAddressChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="city" className="text-sm font-medium ml-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.address.city}
                                    placeholder='City'
                                    onChange={handleAddressChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                />
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <div className=" w-full space-y-1">
                                <label htmlFor="village" className="text-sm font-medium ml-1">Village / Town</label>
                                <input
                                    type="text"
                                    name="village"
                                    value={formData.address.village}
                                    placeholder='Village'
                                    onChange={handleAddressChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                />
                            </div>
                            <div className="w-full space-y-1">
                                <label htmlFor="pincode" className="text-sm font-medium ml-1">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.address.pincode}
                                    placeholder='Pincode'
                                    onChange={handleAddressChange}
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                />
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <div className="w-full space-y-1">
                                <label htmlFor="landmark" className="text-sm font-medium ml-1">Landmark</label>
                                <input
                                    name="landmark"
                                    value={formData.address.landmark}
                                    onChange={handleAddressChange}
                                    placeholder='Landmark.....'
                                    className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                                />
                            </div>
                        </div>
                    </>
                    // Repeat the same for city, state, country, pincode, and landmark
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'} text-white hover:bg-blue-600 transition`}
                >
                    {isSubmitting ? 'Submitting...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
