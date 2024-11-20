import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
            if (response.ok) {
                console.log('Login successful:', resData);
                router.push('/'); // Redirect on success
            } else {
                console.error('Error:', resData);
                alert('Login failed');
            }
        } catch (error) {
            console.error('Request failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="w-fit md:w-4/12 mx-auto p-4 my-40 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Login</h2>
            <form onSubmit={handleSubmit} className=" text-xs space-y-4">
                {/* Phone Number */}
                <div className='w-full space-y-1'>
                    <label htmlFor="phoneNumber" className="text-sm font-medium ml-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter Mobile Number"
                        value={formData.phoneNumber}
                        pattern="\d{10}"
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
                    />
                </div>

                {/* Password */}
                <div className='w-full space-y-1'>
                    <label htmlFor="password" className="text-sm font-medium ml-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        minLength={6}
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded bg-transparent"
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
        </div>
    );
};

export default Login;
