// src/pages/Note.jsx
import React from "react";
import { FiClock } from "react-icons/fi";

export default function Notes() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-[#121236] to-gray-900 text-white px-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gray-800 p-6 rounded-full shadow-lg">
            <FiClock size={40} className="text-pink-500" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent mb-4">
          Notes Coming Soon
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          We're working hard to bring you high-quality notes. Stay tuned and
          check back soon!
        </p>
      </div>
    </div>
  );
}
