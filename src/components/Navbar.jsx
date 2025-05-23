import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isSignup = location.pathname === "/signup";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-opacity-90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide"
        >
          QPaperVault
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium text-white">
          <Link
            to="/login"
            className={`px-5 py-2 rounded-md transition ${
              isLogin
                ? "bg-white text-blue-700 font-semibold shadow-md"
                : "hover:bg-white hover:text-blue-700"
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`px-5 py-2 rounded-md transition ${
              isSignup
                ? "bg-white text-blue-700 font-semibold shadow-md"
                : "hover:bg-white hover:text-blue-700"
            }`}
          >
            Signup
          </Link>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-white z-50 p-6 flex flex-col space-y-6 shadow-xl">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className={`px-5 py-3 rounded-md font-semibold text-center transition ${
                isLogin
                  ? "bg-blue-700 text-white"
                  : "text-blue-700 hover:bg-blue-700 hover:text-white"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className={`px-5 py-3 rounded-md font-semibold text-center transition ${
                isSignup
                  ? "bg-blue-700 text-white"
                  : "text-blue-700 hover:bg-blue-700 hover:text-white"
              }`}
            >
              Signup
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
