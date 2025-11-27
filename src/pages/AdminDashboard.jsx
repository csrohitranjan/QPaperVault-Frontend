// src/pages/AdminDashboard.jsx
import React, { useState, useRef, useEffect } from "react";
import { getUser, logoutUser } from "../utils/auth";
import Modal from "../components/Modal";
import UploadPaperForm from "../components/UploadPaperForm";
import { FileText, LogOut, Menu, User, Inbox, Home } from "lucide-react";
import UploadRequestsTable from "../components/UploadRequestsTable";
import MyUploadsTable from "../components/MyUploadsTable";
import UserProfile from "../components/UserProfile";

export default function AdminDashboard() {
  const user = getUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen font-sans bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Sidebar */}
      <aside
        className={`flex flex-col ${sidebarOpen ? "w-72" : "w-20"
          } bg-gradient-to-b from-indigo-700 via-indigo-800 to-indigo-900 text-indigo-100 transition-width duration-300 shadow-lg`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-indigo-600">
          {sidebarOpen && (
            <h1 className="text-2xl font-extrabold tracking-wide select-none">
              Admin Dashboard
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
            className="p-2 rounded-md hover:bg-indigo-600 transition"
          >
            <Menu size={24} />
          </button>
        </div>

        <nav className="flex flex-col mt-8 space-y-2 px-2">
          <SidebarItem
            icon={<Home size={20} />}
            label="Dashboard"
            active={activeSection === "dashboard"}
            onClick={() => setActiveSection("dashboard")}
            open={sidebarOpen}
          />
          <SidebarItem
            icon={<Inbox size={20} />}
            label="Upload Requests"
            active={activeSection === "requests"}
            onClick={() => setActiveSection("requests")}
            open={sidebarOpen}
          />
          <SidebarItem
            icon={<FileText size={20} />}
            label="My Uploads"
            active={activeSection === "uploads"}
            onClick={() => setActiveSection("uploads")}
            open={sidebarOpen}
          />
        </nav>

        <div className="mt-auto px-6 py-6 border-t border-indigo-600">
          {sidebarOpen && (
            <p className="text-xs opacity-70 select-none">
              &copy; 2025 QPaperVault
            </p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-700 px-6 py-3 shadow-md select-none">
          <h2 className="text-white text-lg font-semibold tracking-wide">
            {activeSection === "dashboard"
              ? "Dashboard"
              : activeSection === "uploads"
                ? "My Uploads"
                : activeSection === "requests"
                  ? "Upload Requests"
                  : activeSection === "profile"
                    ? "Profile"
                    : ""}
          </h2>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="User menu"
              className="flex items-center space-x-3 rounded-full bg-gradient-to-tr from-purple-700 to-pink-700 px-3 py-1 shadow-sm hover:shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <div className="relative rounded-full bg-white p-[2px]">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.fullName || "Admin"
                  )}&background=4f46e5&color=fff&size=128`}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight text-white max-w-[140px] truncate">
                <span className="font-semibold text-white truncate">
                  {user?.fullName}
                </span>
                <span className="text-xs opacity-80 truncate">
                  {user?.email}
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-white transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                  }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-purple-300 shadow-md origin-top-right z-50">
                <button
                  className="flex items-center w-full px-5 py-3 text-purple-700 hover:bg-purple-100 transition font-semibold rounded-t-xl"
                  onClick={() => {
                    setDropdownOpen(false);
                    setActiveSection("profile");
                  }}
                >
                  <User size={18} className="mr-3 text-purple-600" /> Profile
                </button>
                <button
                  className="flex items-center w-full px-5 py-3 text-purple-700 hover:bg-purple-100 transition font-semibold rounded-b-xl"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-3 text-purple-600" /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          {activeSection === "dashboard" && (
            <section className="w-full py-6">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Welcome to the Dashboard
              </h1>
              <p className="text-gray-600">
                Use the sidebar to navigate between Upload Requests and your
                Uploads.
              </p>
            </section>
          )}
          {activeSection === "requests" && (
            <section className="w-full py-6">
              <div className="max-w-full overflow-x-auto">
                <UploadRequestsTable />
              </div>
            </section>
          )}
          {activeSection === "uploads" && (
            <section className="w-full py-6 relative">
              <div className="max-w-full overflow-x-auto">
                <MyUploadsTable />
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-5 py-3 rounded-full shadow-lg flex items-center space-x-2 text-base transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
                aria-label="Upload Previous Year Question Paper"
                title="Upload Previous Year Question Paper"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v-8m0 0l-3 3m3-3l3 3"
                  />
                </svg>
                <span>Upload</span>
              </button>
            </section>
          )}
          {activeSection === "profile" && <UserProfile user={user} />}
        </main>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <UploadPaperForm onClose={() => setModalOpen(false)} />
      </Modal>

      <style>
        {`
          .transition-width {
            transition-property: width;
          }
        `}
      </style>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, open }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 py-3 px-5 rounded-lg transition-colors w-full text-left ${active
          ? "bg-indigo-600 shadow-md text-white font-semibold"
          : "hover:bg-indigo-600 hover:text-white text-indigo-300"
        }`}
      aria-current={active ? "page" : undefined}
    >
      {icon}
      {open && <span className="truncate">{label}</span>}
    </button>
  );
}
