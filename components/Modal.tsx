import React from 'react';

// Define a type for the user object
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user: User;
  onSubmit: (updatedUser: User) => Promise<void>;  // Allowing async function
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, user, onSubmit }) => {
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [role, setRole] = React.useState(user.role);

  // Sync state with updated props
  React.useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser: User = {
      _id: user._id,  // Include the _id if you need it for the update
      name,
      email,
      role,
      createdAt: user.createdAt,  // Preserve createdAt if needed
    };

    await onSubmit(updatedUser);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block">Role</label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
