// src/components/Navbar.jsx
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, isLoggedIn, logoutUser } from "../utils/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "PYQs", path: "/pyqs" },
    { label: "Notes", path: "/notes" },
    { label: "Contact", path: "/contact" },
  ];

  const getDashboardPath = () => {
    switch (user?.role) {
      case "student":
        return "/student-dashboard";
      case "educator":
        return "/educator-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/";
    }
  };

  const syncAuthState = useCallback(() => {
    const loggedIn = isLoggedIn();
    setAuthenticated(loggedIn);
    setUser(loggedIn ? getUser() : null);
  }, []);

  // Listen to auth changes
  useEffect(() => {
    syncAuthState();
    window.addEventListener("authChange", syncAuthState);
    return () => window.removeEventListener("authChange", syncAuthState);
  }, [syncAuthState]);

  // Auto-close menus when navigating
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close user dropdown if clicked outside
  useEffect(() => {
    if (!userMenuOpen) return;

    const close = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [userMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const closeMenuAndNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logoutUser();
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  const dashboard = () => {
    setUserMenuOpen(false);
    navigate(getDashboardPath());
  };

  // Safe user name
  const displayNameRaw =
    user?.fullName || user?.email;
  const displayName = displayNameRaw || "User";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-950 via-[#1f1f47] to-gray-950 shadow-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => closeMenuAndNavigate("/")}
          className="flex items-center gap-2 focus:outline-none"
        >
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent tracking-tight">
            QPaperVault
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-all ${isActive(link.path)
                ? "text-white"
                : "text-gray-300 hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center space-x-4">
          {!authenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-200 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="text-sm font-semibold text-white px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-md hover:shadow-lg transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative" ref={userMenuRef}>
              <button
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 text-sm font-medium text-gray-100 hover:text-white focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold">
                  {userInitial}
                </div>

                <span className="max-w-[160px] truncate">{displayName}</span>

                <svg
                  className={`w-4 h-4 text-gray-300 transition-transform ${userMenuOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-44 rounded-lg bg-gray-950/95 border border-white/10 shadow-2xl py-1.5 backdrop-blur-xl"
                >
                  <button
                    role="menuitem"
                    onClick={dashboard}
                    className="w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-white/10 transition"
                  >
                    Dashboard
                  </button>

                  <button
                    role="menuitem"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-red-500/15 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <>
                <path strokeWidth="2" d="M4 6h16" />
                <path strokeWidth="2" d="M4 12h16" />
                <path strokeWidth="2" d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 w-72 h-full bg-gradient-to-b from-[#1f1f47] to-gray-950 z-50 shadow-2xl p-6 flex flex-col space-y-4 text-white rounded-l-2xl">

            {/* User Section */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col">
                <span className="text-sm text-white/60">
                  {authenticated ? "Logged in as" : "Welcome to"}
                </span>
                <span className="text-lg font-semibold">
                  {authenticated ? displayName : "QPaperVault"}
                </span>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close Menu"
                className="text-white/70 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor">
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Nav Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => closeMenuAndNavigate(link.path)}
                  className={`w-full text-left text-[15px] font-medium px-3 py-2 rounded-md transition ${isActive(link.path)
                    ? "bg-white/10 text-white"
                    : "text-white/90 hover:bg-white/5"
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <hr className="border-white/10 my-3" />

            {/* Mobile Auth Buttons */}
            {!authenticated ? (
              <>
                <button
                  onClick={() => closeMenuAndNavigate("/login")}
                  className="w-full text-center border border-white/30 text-white rounded-full py-2 bg-white/5 hover:bg-white/10 font-medium"
                >
                  Login
                </button>

                <button
                  onClick={() => closeMenuAndNavigate("/signup")}
                  className="w-full text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full py-2 font-semibold shadow-lg hover:shadow-xl"
                >
                  Signup
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={dashboard}
                  className="w-full text-center bg-white/10 hover:bg-white/20 rounded-full py-2 font-medium"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-center border border-red-400/60 text-red-200 rounded-full py-2 bg-red-500/10 hover:bg-red-500/20 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
