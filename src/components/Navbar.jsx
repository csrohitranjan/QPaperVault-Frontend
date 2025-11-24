// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "PYQs", path: "/pyqs" },
    { label: "Notes", path: "/notes" },
    // { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-[#1f1f47] to-gray-900 shadow-md">
      <div className="w-full px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent tracking-tight"
        >
          QPaperVault
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-gray-300 text-[15px] font-medium transition-all px-3 py-1 rounded-md ${isActive(link.path)
                ? "text-white bg-white/10"
                : "hover:text-white hover:bg-white/5"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Login & Signup Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Login: glassy outline */}
          <Link
            to="/login"
            className="px-4 py-2 rounded-full font-medium text-white border border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition duration-200 ease-in-out hover:scale-105 shadow-sm"
          >
            Login
          </Link>

          {/* Signup: vibrant gradient */}
          <Link
            to="/signup"
            className="px-5 py-2 rounded-full font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
          >
            Signup
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 w-72 h-full bg-gradient-to-b from-[#1f1f47] to-gray-900 z-50 shadow-2xl p-6 flex flex-col space-y-4 text-white rounded-l-xl">
            <div className="text-xl font-bold mb-3">Menu</div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-[16px] font-medium px-3 py-2 rounded-md transition ${isActive(link.path) ? "bg-white/10" : "hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10 my-2" />
            {/* Mobile Login */}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center border border-white/30 text-white rounded-full py-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition font-medium hover:scale-105"
            >
              Login
            </Link>
            {/* Mobile Signup */}
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full py-2 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Signup
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
