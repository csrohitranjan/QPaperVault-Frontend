import React from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 font-sans animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#0f111a]/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 max-w-md w-full relative overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10 p-1 hover:bg-white/5 rounded-lg"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
        
        <div className="p-6">
          {children}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
      </div>

    </div>
  );
}
