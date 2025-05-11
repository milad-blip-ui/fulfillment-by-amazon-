// src/components/Topbar.jsx
import { FaBell, FaCog } from 'react-icons/fa';

export default function Topbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow rounded-lg mb-4">
      <div className="text-lg font-semibold">Dashboard / Tables</div>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search" className="border p-2 rounded-lg" />
        <FaCog className="text-gray-600" />
        <FaBell className="text-gray-600" />
        <img
          src="https://i.pravatar.cc/30"
          className="rounded-full w-8 h-8"
          alt="user"
        />
      </div>
    </div>
  );
}
