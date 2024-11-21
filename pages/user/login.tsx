import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Link from 'next/link';

const Login: React.FC = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formData }),
            });
            const resData = await response.json();
            const { success, message } = resData;
            if (success) {
                toast.success(message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
                setTimeout(() => {
                    router.push('/');
                }, 1800);
            } else {
                toast.error(message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            }
        } catch (error) {
            console.log('Request failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>
            <div className="w-fit md:w-3/12 mx-auto py-6 my-40  rounded-lg shadow-lg shadow-gray-700">
                <ToastContainer
                    position="top-center"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Slide}
                />
                <h2 className="text-xl text-center font-semibold mb-1">User Login</h2>
                <hr className='mb-4 border border-black dark:border-white' />
                <form onSubmit={handleSubmit} className="w-fit mx-auto text-xs space-y-4">
                    {/* Phone Number */}
                    <div className=' flex  flex-col w-fit space-y-1'>
                        <label htmlFor="phoneNumber" className="text-sm font-medium ml-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter Mobile Number"
                            value={formData.phoneNumber}
                            pattern="\d{10}"
                            required
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-400 rounded bg-transparent"
                        />
                    </div>

                    {/* Password */}
                    <div className='flex flex-col w-fit space-y-1'>
                        <label htmlFor="password" className="text-sm font-medium ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            minLength={6}
                            required
                            onChange={handleChange}
                            className="px-3 py-2 border border-gray-400 rounded bg-transparent"
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-2 px-4 rounded ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'} text-white hover:bg-blue-600 transition`}
                    >
                        {isSubmitting ? 'Loginging...' : 'Login'}
                    </button>
                </form>
                <div className="flex justify-between items-center text-sm mt-4">
                    <Link href="/user/register" legacyBehavior>
                        <a className="text-blue-400 font-bold hover:text-blue-500 mx-5 hover:underline">Register</a>
                    </Link>
                    <Link href="/forgot-password" legacyBehavior>
                        <a className="text-blue-400 font-bold hover:text-blue-500 mx-5 hover:underline">Forgot Password?</a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
