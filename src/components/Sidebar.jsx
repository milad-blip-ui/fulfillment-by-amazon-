import { NavLink } from "react-router-dom";
import { FaLightbulb, FaCogs, FaBoxes, FaTachometerAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-600 to-indigo-800 text-white flex flex-col shadow-xl">
      <div className="px-6 py-6 text-3xl font-bold tracking-tight">
        <span className="text-white">Corporate UI</span>
      </div>

      <nav className="flex flex-col gap-4 px-4 mt-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-700 transition ${
              isActive ? "bg-indigo-500" : ""
            }`
          }
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/product-ideas"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-700 transition ${
              isActive ? "bg-indigo-500" : ""
            }`
          }
        >
          <FaLightbulb />
          Product Ideas
        </NavLink>

        <NavLink
          to="/in-process"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-700 transition ${
              isActive ? "bg-indigo-500" : ""
            }`
          }
        >
          <FaCogs />
          In Process
        </NavLink>

        <NavLink
          to="/amazon-listing"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-700 transition ${
              isActive ? "bg-indigo-500" : ""
            }`
          }
        >
          <FaBoxes />
          Amazon Listing
        </NavLink>

        {/* Add more links as needed */}
      </nav>

      <div className="mt-auto p-4 text-sm text-gray-300">
        <p>Need help?</p>
        <a href="#" className="underline text-indigo-400 hover:text-indigo-200">
          Documentation
        </a>
      </div>
    </div>
  );
}
