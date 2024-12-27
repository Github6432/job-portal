import AdminLayout from '@/components/admin/AdminLayout';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
    </AdminLayout>
  );
};

export default Dashboard;
