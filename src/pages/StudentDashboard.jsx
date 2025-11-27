// src/pages/StudentDashboard.jsx
import React, { useState, useRef, useEffect } from "react";
import { getUser, logoutUser } from "../utils/auth";
import Modal from "../components/Modal";
import UploadPaperForm from "../components/UploadPaperForm";
import { FileText, LogOut, Menu, Plus, User, Home } from "lucide-react";
import MyUploadsTable from "../components/MyUploadsTable";
import UserProfile from "../components/UserProfile";

export default function StudentDashboard() {
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
    <div className="flex h-screen font-sans bg-white text-gray-900">
      {/* Sidebar */}
      <aside
        className={`flex flex-col ${sidebarOpen ? "w-64" : "w-20"
          } bg-indigo-900 text-white transition-all duration-300 shadow-xl`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-indigo-700">
          {sidebarOpen && (
            <h1 className="text-xl font-bold tracking-wide">
              Student Dashboard
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
            className="p-2 hover:bg-indigo-800 rounded-md"
          >
            <Menu size={22} />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-1 px-3">
          <SidebarItem
            icon={<Home size={20} />}
            label="Dashboard"
            active={activeSection === "dashboard"}
            onClick={() => setActiveSection("dashboard")}
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

        <div className="mt-auto px-6 py-4 border-t border-indigo-700 text-sm opacity-70">
          {sidebarOpen && <p>&copy; 2025 QPaperVault</p>}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-indigo-700 px-6 py-4 shadow-md">
          <h2 className="text-white text-xl font-semibold tracking-wide">
            {activeSection === "dashboard"
              ? "Dashboard"
              : activeSection === "uploads"
                ? "My Uploads"
                : activeSection === "profile"
                  ? "Profile"
                  : ""}
          </h2>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 bg-indigo-600 px-4 py-2 rounded-full shadow hover:bg-indigo-500 transition-all"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.fullName || "User"
                )}&background=4f46e5&color=fff&size=128`}
                alt="Avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
              {sidebarOpen && (
                <div className="text-left text-white text-sm">
                  <div className="font-medium truncate">{user?.fullName}</div>
                  <div className="text-xs opacity-80 truncate">
                    {user?.email}
                  </div>
                </div>
              )}
              <svg
                className={`w-4 h-4 text-white transition-transform ${dropdownOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-indigo-200 rounded-xl shadow-lg z-50">
                <button
                  className="w-full text-left px-5 py-3 text-indigo-700 hover:bg-indigo-50 rounded-t-xl font-medium"
                  onClick={() => {
                    setDropdownOpen(false);
                    setActiveSection("profile");
                  }}
                >
                  <User size={16} className="inline mr-2 text-indigo-500" />
                  Profile
                </button>
                <button
                  className="w-full text-left px-5 py-3 text-indigo-700 hover:bg-indigo-50 rounded-b-xl font-medium"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="inline mr-2 text-indigo-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          {activeSection === "dashboard" && (
            <section>
              <h1 className="text-2xl font-bold mb-3">Welcome to Dashboard</h1>
              <p className="text-gray-600">
                Use the menu to navigate through uploads and profile.
              </p>
            </section>
          )}

          {activeSection === "uploads" && (
            <section className="relative">
              <div className="overflow-x-auto">
                <MyUploadsTable />
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Plus size={18} />
                Upload
              </button>
            </section>
          )}

          {activeSection === "profile" && <UserProfile user={user} />}
        </main>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <UploadPaperForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, open }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 py-3 px-5 rounded-lg w-full transition-colors ${active
        ? "bg-indigo-700 text-white font-semibold"
        : "hover:bg-indigo-800 hover:text-white text-indigo-300"
        }`}
    >
      {icon}
      {open && <span className="truncate">{label}</span>}
    </button>
  );
}
