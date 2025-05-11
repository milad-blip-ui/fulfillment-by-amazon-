import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaLightbulb, FaCogs, FaBoxes, FaTachometerAlt, FaWarehouse, FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#1e293b] text-white shadow-lg"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 w-64 h-screen bg-[#0f172a] text-white flex flex-col shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "left-0" : "-left-64"
        }`}
      >
        <div className="px-6 py-6 border-b border-[#1e293b]">
          <span className="text-2xl font-bold text-white">FBA Dashboard</span>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1e293b] transition ${
                isActive ? "bg-[#1e40af] text-white font-medium" : "text-[#e2e8f0]"
              }`
            }
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaTachometerAlt className="text-lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/product-ideas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1e293b] transition ${
                isActive ? "bg-[#1e40af] text-white font-medium" : "text-[#e2e8f0]"
              }`
            }
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaLightbulb className="text-lg" />
            <span>Product Ideas</span>
          </NavLink>

          <NavLink
            to="/in-process"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1e293b] transition ${
                isActive ? "bg-[#1e40af] text-white font-medium" : "text-[#e2e8f0]"
              }`
            }
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaCogs className="text-lg" />
            <span>In Process</span>
          </NavLink>

          <NavLink
            to="/amazon-listing"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1e293b] transition ${
                isActive ? "bg-[#1e40af] text-white font-medium" : "text-[#e2e8f0]"
              }`
            }
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaBoxes className="text-lg" />
            <span>Amazon Listing</span>
          </NavLink>

          <NavLink
            to="/amazon-status"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1e293b] transition ${
                isActive ? "bg-[#1e40af] text-white font-medium" : "text-[#e2e8f0]"
              }`
            }
            onClick={() => isMobile && setIsOpen(false)}
          >
            <FaWarehouse className="text-lg" />
            <span>Amazon Status</span>
          </NavLink>
        </nav>

        <div className="mt-auto p-4 border-t border-[#1e293b] text-sm text-[#94a3b8]">
          <p>Need help?</p>
          <a href="#" className="text-[#60a5fa] hover:text-[#93c5fd] underline">
            Documentation
          </a>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}