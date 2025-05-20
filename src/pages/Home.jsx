// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      {/* Navbar only */}
      <header className="w-full shadow-sm bg-white">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">QPaperVault</h1>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 text-base font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-4 py-2 rounded-md transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
