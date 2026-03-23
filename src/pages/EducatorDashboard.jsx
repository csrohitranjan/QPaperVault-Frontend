// src/pages/EducatorDashboard.jsx
import React, { useState } from "react";
import { getUser, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import UploadPaperForm from "../components/UploadPaperForm";
import { Home } from "lucide-react";

export default function EducatorDashboard() {
  const user = getUser();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  const handleUploadClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="bg-themeBg text-white relative overflow-hidden font-sans min-h-[calc(100vh-4rem)]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-primaryOrange/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      


      <main className="p-5 pt-8 md:p-10 max-w-5xl mx-auto animate-fade-in relative z-10 w-full">
        <h2 className="text-2xl font-black tracking-tight text-white mb-6 flex items-center gap-3">
          <div className="w-1.5 h-6 bg-primaryOrange rounded-full"></div>
          Educator Portal
        </h2>
        {/* Profile Header */}
        <div className="bg-cardBg border border-white/5 p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primaryOrange/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Profile Image */}
          <div className="flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-primaryOrange/20 rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300"></div>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.fullName || "Educator"
              )}&background=10b981&color=fff&size=150`}
              alt="Profile"
              className="relative w-28 h-28 rounded-full border-4 border-cardBg shadow-2xl object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-grow text-center md:text-left z-10">
            <h1 className="text-3xl font-black text-white mb-2">
              Welcome back, {user?.fullName} <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className="text-textMuted text-sm mb-4">
              Thank you for contributing to the collective knowledge vault.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
              <span className="bg-themeBg border border-white/5 text-zinc-300 px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-primaryOrange"></span> {user?.email}
              </span>
              {user?.role && (
                <span className="bg-primaryOrange/10 border border-primaryOrange/20 text-primaryOrange px-3 py-1.5 rounded-xl text-sm font-bold capitalize">
                  {user?.role}
                </span>
              )}
              <span className="text-xs text-textMuted flex items-center ml-2">
                Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-6 pl-2 border-l-4 border-primaryOrange">Quick Actions</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upload Papers */}
            <div
              onClick={handleUploadClick}
              className="bg-cardBg border border-white/5 p-8 rounded-3xl hover:bg-white/5 hover:border-primaryOrange/50 transition duration-300 cursor-pointer group shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="w-12 h-12 bg-primaryOrange/10 text-primaryOrange rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v-8m0 0l-3 3m3-3l3 3" />
                 </svg>
              </div>
              <h2 className="text-lg font-black text-white mb-2">
                Upload Papers
              </h2>
              <p className="text-sm text-textMuted leading-relaxed">
                Upload previous year question papers from your department. Papers are automatically approved.
              </p>
            </div>

            {/* My Uploads */}
            <div className="bg-cardBg border border-white/5 p-8 rounded-3xl hover:bg-white/5 hover:border-primaryOrange/50 transition duration-300 cursor-pointer group shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-12 bg-primaryOrange/10 text-primaryOrange rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                 </svg>
              </div>
              <h2 className="text-lg font-black text-white mb-2">
                My Uploads
              </h2>
              <p className="text-sm text-textMuted leading-relaxed">
                View and manage all the educational content you have contributed to the archive.
              </p>
            </div>

            {/* Account Settings */}
            <div className="bg-cardBg border border-white/5 p-8 rounded-3xl hover:bg-white/5 hover:border-primaryOrange/50 transition duration-300 cursor-pointer group shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-12 bg-primaryOrange/10 text-primaryOrange rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
              </div>
              <h2 className="text-lg font-black text-white mb-2">
                Account Settings
              </h2>
              <p className="text-sm text-textMuted leading-relaxed">
                Edit your personal profile information or change your security credentials.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Paper Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <UploadPaperForm onClose={() => setModalOpen(false)} />
      </Modal>

    </div>
  );
}
