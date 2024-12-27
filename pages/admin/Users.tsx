import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import React Icons

// Define the user type
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]); // Specify type for users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error is either a string or null

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user/getusers');
        const data = await response.json();

        if (data.success) {
          setUsers(data.users); // TypeScript knows the type of users
        } else {
          setError(data.message || 'Failed to fetch users.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurgray while fetching users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="text-gray-500">Error: {error}</p>;
  }

  const handleEdit = (userId: string) => {
    // Handle Edit functionality (grayirect or open modal)
    console.log('Edit user', userId);
  };

  const handleDelete = (userId: string) => {
    // Handle Delete functionality (Call API or show confirmation)
    console.log('Delete user', userId);
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold">Users</h1>
      <p>Manage all users here.</p>
      <hr className="border-gray-400" />
      {/* all users */}
      <div className="p-6">
        <h1 className="text-sm font-bold mb-4">All Users</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full shadow-lg border border-gray-500 rounded-lg">
            <thead className="">
              <tr>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">#</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Name</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Email</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Role</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Created At</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Actions</th> {/* Added actions column */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-400 border-b border-gray-600">
                  <td className="px-2 py-1   text-sm">{index + 1}</td>
                  <td className="px-2 py-1 text-sm">{user.name}</td>
                  <td className="px-2 py-1 text-sm">{user.email}</td>
                  <td className="px-2 py-1 text-sm capitalize">{user.role || 'User'}</td>
                  <td className="px-2 py-1 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-2 py-1 text-sm flex space-x-2"> {/* Added action buttons */}
                    <button onClick={() => handleEdit(user._id)} className="text-blue-500 px-2 py-1 hover:text-blue-700">< FaEdit /></button>
                    <button onClick={() => handleDelete(user._id)} className="text-red-500 px-2 py-1 hover:text-red-900">< FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Users;
