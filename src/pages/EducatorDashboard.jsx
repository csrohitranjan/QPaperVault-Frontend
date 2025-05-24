// src/pages/EducatorDashboard.jsx
import React, { useState } from "react";
import { getUser, logoutUser } from "../utils/auth";
import Modal from "../components/Modal";
import UploadPaperForm from "../components/UploadPaperForm";

export default function StudentDashboard() {
  const user = getUser();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  const handleUploadClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-white p-6 pt-24">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 relative">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.fullName || "Student"
            )}&background=3b82f6&color=fff&size=100`}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-grow">
          <h1 className="text-xl font-semibold text-gray-800 mb-1">
            Welcome, {user?.fullName} 👋
          </h1>
          <p className="text-gray-700 text-sm mb-1">
            <span className="font-medium text-gray-900">Email:</span>{" "}
            {user?.email}
          </p>
          {user?.role && (
            <p className="text-gray-700 text-sm mb-1 capitalize">
              <span className="font-medium text-gray-900">Role:</span>{" "}
              {user?.role}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Member since: {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded-lg shadow-md transition"
          aria-label="Logout"
          title="Logout"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Actions */}
      <div className="max-w-4xl mx-auto mt-10 grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        {/* Upload Papers */}
        <div
          onClick={handleUploadClick}
          className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-xl shadow-sm transition-all duration-200 transform hover:scale-105 hover:shadow-lg cursor-pointer hover:bg-blue-200 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <h2 className="text-base font-semibold text-gray-800 mb-2">
            Upload Papers
          </h2>
          <p className="text-xs text-gray-600">
            Upload previous year question papers from your department.
          </p>
        </div>

        {/* My Uploads */}
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-xl shadow-sm transition-all duration-200 transform hover:scale-105 hover:shadow-lg cursor-pointer hover:bg-green-200 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500">
          <h2 className="text-base font-semibold text-gray-800 mb-2">
            My Uploads
          </h2>
          <p className="text-xs text-gray-600">
            View all your uploaded question papers.
          </p>
        </div>

        {/* Account Settings */}
        <div className="bg-indigo-100 border-l-4 border-indigo-500 p-4 rounded-xl shadow-sm transition-all duration-200 transform hover:scale-105 hover:shadow-lg cursor-pointer hover:bg-indigo-200 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <h2 className="text-base font-semibold text-gray-800 mb-2">
            Account Settings
          </h2>
          <p className="text-xs text-gray-600">
            Edit your profile or change your password.
          </p>
        </div>
      </div>

      {/* Upload Paper Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <UploadPaperForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
