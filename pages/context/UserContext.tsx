import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define User Type
interface User {
  id: string;
  name: string;
  email: string;
}

// Define Context Type
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, initialUser }: { children: ReactNode; initialUser: User | null }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use User Context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
