import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-2/12 border border-red-300 flex flex-col">
      <h2 className="text-lg font-bold p-4">Admin Panel</h2>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/admin/Dashboard">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/admin/Users">Users</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link href="/admin/Jobs">Jobs</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
