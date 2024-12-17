import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface User {
  success: boolean;
  user: {
    name: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    dob: string;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    role: string;
    isVerified: boolean;
    loginHistory: Array<{
      timestamp: Date;
      ipAddress: string;
    }>;
    notificationsEnabled: boolean;
    notificationPreferences: Array<object>;
    // Add other properties as necessary
  };
}

const Profile = () => {
  const router = useRouter();
  const userData = useAppSelector((state: RootState) => state.user.userData) as User | null;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if userData exists and is valid before redirecting to login page
    if (userData === null) {
      setLoading(true);
    } else if (!userData.success) {
      router.push('/user/login');
    } else {
      setLoading(false);
    }
  }, [userData, router]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto border border-gray-500 rounded-lg shadow-xl p-6">
        <h1 className="text-4xl font-semibold text-center text-blue-600 mb-8">User Profile</h1>

        {userData && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-semibold text-white">
                {userData.user.name[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">
                  {userData.user.name} {userData.user.middleName} {userData.user.lastName}
                </h2>
                <p className="text-sm">{userData.user.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <strong className="text-gray-500">Email:</strong>
                <p className="">{userData.user.email}</p>
              </div>
              <div>
                <strong className="text-gray-500">Phone Number:</strong>
                <p className="">{userData.user.phoneNumber}</p>
              </div>
              <div>
                <strong className="text-gray-500">Date of Birth:</strong>
                <p className="">{new Date(userData.user.dob).toLocaleDateString()}</p>
              </div>
              <div>
                <strong className="text-gray-500">Status:</strong>
                <p className="">{userData.user.status}</p>
              </div>
            </div>

            <div>
              <strong className="text-gray-500">Last Login:</strong>
              <p className="">{new Date(userData.user.lastLogin).toLocaleString()}</p>
            </div>

            <div>
              <strong className="text-gray-500">Login History:</strong>
              <ul className="space-y-2">
                {userData.user.loginHistory.map((entry, index) => (
                  <li key={index} className="">
                    <span className="font-semibold">{new Date(entry.timestamp).toLocaleString()}</span> - IP: {entry.ipAddress}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <button
                onClick={() => router.push('/user/update')}
                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
