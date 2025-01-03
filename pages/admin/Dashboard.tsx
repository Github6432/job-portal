import AdminLayout from '@/components/admin/AdminLayout';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div>
        <h1>Admin Dashboard</h1>
        <hr className='border-red-400' />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
