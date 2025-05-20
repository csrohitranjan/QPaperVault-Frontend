import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    // className="bg-white shadow-md"
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          QPaperVault
        </Link>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
