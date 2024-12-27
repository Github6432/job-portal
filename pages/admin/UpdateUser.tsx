import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import React Icons
import Modal from '@/components/Modal'; // Import the Modal component

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
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // For storing the user to be edited
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling the modal visibility

  useEffect(() => {
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
        setError('An error occurred while fetching users.');
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

  const handleEdit = (user: User) => {
    setSelectedUser(user); // Set the selected user for editing
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = (userId: string) => {
    console.log('Delete user', userId);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`/api/user/update/${selectedUser?._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        // Update the user list with the updated user
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === selectedUser?._id ? { ...user, ...updatedUser } : user))
        );
        setIsModalOpen(false); // Close the modal
      } else {
        alert('Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
    }
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
            <thead>
              <tr>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">#</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Name</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Email</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Role</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Created At</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-500">
                  <td className="px-2 py-1 border-b border-gray-600 text-sm">{index + 1}</td>
                  <td className="px-2 py-1 border-b border-gray-600 text-sm">{user.name}</td>
                  <td className="px-2 py-1 border-b border-gray-600 text-sm">{user.email}</td>
                  <td className="px-2 py-1 border-b border-gray-600 text-sm capitalize">{user.role || 'User'}</td>
                  <td className="px-2 py-1 border-b border-gray-600 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-2 py-1 border-b border-gray-600 text-sm flex space-x-2">
                    <button onClick={() => handleEdit(user)} className="text-blue-500 px-2 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(user._id)} className="text-red-500 px-2 hover:text-red-900">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for editing user */}
      {selectedUser && (
        <Modal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          user={selectedUser}
          onSubmit={handleUpdateUser}
        />
      )}
    </AdminLayout>
  );
};

export default Users;
