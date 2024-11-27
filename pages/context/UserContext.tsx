import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define User Type
interface User {
  id: string;
  name: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  dob: string;
  isVerified: boolean;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  loginHistory: any[]; // Adjust this type if you know its structure
  permissions: any[];  // Adjust this type if you know its structure
  notificationPreferences: any[];
  notificationsEnabled: boolean;
}


interface UserResponse {
  success: boolean;
  user: User | null;
}


// Define Context Type
interface UserContextType {
  userData: UserResponse | null;
  setUserData: (userData: UserResponse | null) => void;
}


// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, initialUser }: { children: ReactNode; initialUser: UserResponse | null }) => {
  const [userData, setUserData] = useState<UserResponse | null>(initialUser);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use User Context
export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
