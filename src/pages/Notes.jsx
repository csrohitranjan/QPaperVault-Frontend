// src/pages/Notes.jsx
import React from "react";
import { FiClock } from "react-icons/fi";

export default function Notes() {
  return (
    <div className="h-[calc(100vh-4rem)] relative flex items-start justify-center px-4 pt-[22vh] overflow-hidden font-sans bg-themeBg">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primaryOrange/5 rounded-full blur-[110px] pointer-events-none -z-10"></div>
      
      <div className="text-center animate-in fade-in zoom-in-95 duration-700 scale-110">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primaryOrange/20 blur-xl rounded-full animate-pulse"></div>
            <div className="bg-cardBg border border-white/5 p-4.5 rounded-2xl relative z-10 shadow-2xl">
              <FiClock size={44} className="text-primaryOrange" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
          Notes <span className="text-primaryOrange">Coming Soon</span>
        </h1>
        
        <p className="text-textMuted text-base md:text-lg font-medium max-w-md mx-auto leading-relaxed">
          We're meticulously curating high-quality study materials to elevate your learning. Stay tuned!
        </p>
      </div>
    </div>
  );
}
