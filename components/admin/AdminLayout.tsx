import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex border border-red-400 my-10">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 p-2">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
