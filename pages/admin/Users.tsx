import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import React Icons

// Define the user type
interface User {
  middleName: string;
  lastName: string;
  phoneNumber: number;
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]); // Specify type for users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error is either a string or null
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State for selected user

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/getusers");
        const data = await response.json();

        if (data.success) {
          setUsers(data.users); // TypeScript knows the type of users
        } else {
          setError(data.message || "Failed to fetch users.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching users.");
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
    const user = users.find((user) => user._id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true); // Open modal
    }
  };

  const handleDelete = async (userId: string) => {
    if (!userId) {
      console.error("User ID is required for deletion.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) {
      return; // Exit if the user cancels the delete action
    }

    try {
      const response = await fetch(`/api/user/deleteuser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userId),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User deleted successfully:", data.user);
        // Update the local state to remove the deleted user
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } else {
        console.error("Failed to delete user:", data.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting the user:", error);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const saveChanges = async () => {
    if (!selectedUser || !selectedUser._id) {
      console.error("No user selected for updating.");
      return;
    }

    try {
      const response = await fetch(`/api/user/updateuser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User updated successfully:", data.user);
        // Update the local state with the modified user data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === data.user._id ? data.user : user
          )
        );
        closeModal();
      } else {
        console.error("Failed to update user:", data.message);
      }
    } catch (error) {
      console.error("An error occurred while updating the user:", error);
    }
  };


  return (
    <AdminLayout>
      <h1 className="text-xl font-bold">Users</h1>
      <p>Manage all users here.</p>
      <hr className="border-gray-400" />

      <div className="p-6">
        <h1 className="text-sm font-bold mb-4">All Users</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full shadow-lg border border-gray-500 rounded-lg">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">#</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Name</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Email</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Phone No.</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Role</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Created At</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Status</th>
                <th className="px-2 py-1 text-left border-b border-gray-800 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-400 text-sm border-b border-gray-600">
                  <td className="px-2 py-1 ">{index + 1}</td>
                  <td className="px-2 py-1 ">{user.name} {user.middleName} {user.lastName}</td>
                  <td className="px-2 py-1 ">{user.email}</td>
                  <td className="px-2 py-1 ">{user.phoneNumber}</td>
                  <td className="px-2 py-1  capitalize">{user.role || "User"}</td>
                  <td className="px-2 py-1 ">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-2 py-1 ">{user.status}</td>
                  <td className="px-2 py-1  flex space-x-2">
                    <button onClick={() => handleEdit(user._id)} className="text-blue-500 px-1 py-1 hover:text-blue-700"><FaEdit /></button>
                    <button onClick={() => handleDelete(user._id)} className="text-red-500 px-1 py-1 hover:text-red-900"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="border border-red-500 p-6 rounded shadow-lg bg-white dark:bg-black w-1/2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Edit User</h2>
              <p className="text-sm uppercase"><span className="font-semibold">ID:</span> {selectedUser._id}</p>
            </div>
            <hr className="border border-red-500" />
            <div className="mt-4 flex justify-between text-sm">
              <div>
                <label className="block text-sm font-bold">Name</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="border border-gray-500 p-2 w-full rounded bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold">Middle Name</label>
                <input
                  type="text"
                  value={selectedUser.middleName}
                  onChange={(e) => setSelectedUser({ ...selectedUser, middleName: e.target.value })}
                  className="border border-gray-500 p-2 w-full rounded bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold">Last Name</label>
                <input
                  type="text"
                  value={selectedUser.lastName}
                  onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                  className="border border-gray-500 p-2 w-full rounded bg-transparent"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <div>
                <label className="block text-sm font-bold">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="border border-gray-500 p-2 w-full rounded bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold">Phone Number</label>
                <input
                  type="tel"
                  value={selectedUser.phoneNumber}
                  onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: Number(e.target.value) || 0, })}
                  className="border border-gray-500 p-2 w-full rounded bg-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold">Status</label>
                <select
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                  className="border border-gray-500 p-2 w-full rounded bg-transparent"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="deleted">Deleted</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <label className="block text-sm font-bold">Role</label>
              <select
                value={selectedUser.role}
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                className="border border-gray-500 p-2 w-full rounded bg-transparent"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <button onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded" >Cancel</button>
              <button onClick={saveChanges} className="bg-blue-500 text-white px-4 py-2 rounded" >Save</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Users;
