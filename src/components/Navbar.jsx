// src/components/Navbar.jsx
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, isLoggedIn, logoutUser } from "../utils/auth";
import { FiArrowRight } from "react-icons/fi";
import { LayoutDashboard, LogOut, User } from "lucide-react";

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
        return "/student-dashboard";
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

  // Close user dropdown on Escape
  useEffect(() => {
    if (!userMenuOpen) return;

    const onEscape = (e) => {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
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

  const dashboard = (section = "dashboard", extraState = {}) => {
    setUserMenuOpen(false);
    setMenuOpen(false);
    const path = getDashboardPath();
    // Force navigation even if already on the same path
    if (location.pathname === path) {
      navigate(path, { state: { section, ...extraState }, replace: true });
      // Dispatch event so dashboard can react to section change
      window.dispatchEvent(new CustomEvent("dashboardNavigate", { detail: { section } }));
    } else {
      navigate(path, { state: { section, ...extraState } });
    }
  };

  // Safe user name
  const displayNameRaw =
    user?.fullName || user?.email;
  const displayName = displayNameRaw || "User";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-themeBg border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => closeMenuAndNavigate("/")}
          className="flex items-center gap-2 focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-primaryOrange flex items-center justify-center shadow-[0_8px_30px_rgba(254,82,56,0.3)] transition-all group-hover:scale-105 group-active:scale-95">
             <span className="text-white font-black text-xl leading-none">Q</span>
          </div>
          <div className="flex flex-col items-start leading-none gap-0.5">
            <span className="text-lg font-black text-white tracking-tighter">
              PaperVault
            </span>
            <span className="text-[9px] font-bold text-primaryOrange uppercase tracking-[0.2em] opacity-80">
              Exam Excellence
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm tracking-widest font-bold uppercase transition-all duration-200 py-2 ${isActive(link.path)
                ? "text-white"
                : "text-textMuted hover:text-white"
                }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primaryOrange shadow-[0_0_10px_rgba(254,82,56,0.8)]" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center space-x-6">
          {!authenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-textMuted hover:text-white transition-colors"
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className="text-sm font-bold text-white px-6 py-2.5 rounded-xl bg-primaryOrange hover:bg-orange-600 shadow-[0_4px_14px_0_rgba(254,82,56,0.2)] hover:shadow-[0_6px_20px_rgba(254,82,56,0.3)] hover:-translate-y-0.5 transition-all"
              >
                Get Started
              </Link>
            </>
          ) : (
             <div className="relative" ref={userMenuRef}>
              <button
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-2xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primaryOrange/60 group ${
                  userMenuOpen
                    ? "bg-white/[0.06] border-white/15 shadow-[0_8px_25px_rgba(0,0,0,0.35)]"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                }`}
              >
                {/* Clean Avatar Circle */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primaryOrange to-orange-500 flex items-center justify-center text-[13px] font-black text-white shadow-sm ring-1 ring-white/10 group-hover:ring-primaryOrange/40 transition-all">
                  {userInitial}
                </div>

                <div className="hidden lg:flex flex-col items-start leading-none">
                  <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors max-w-[8rem] truncate">
                    {displayName.split(' ')[0]}
                  </span>
                </div>

                <svg
                  className={`w-3.5 h-3.5 text-textMuted group-hover:text-white transition-all duration-300 ${userMenuOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-3 w-64 rounded-[1.65rem] bg-[#111218]/95 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.7)] overflow-hidden origin-top-right animate-in fade-in zoom-in-95 duration-200 z-[60] backdrop-blur-3xl"
                >
                  <div className="px-5 py-4 border-b border-white/10 bg-white/[0.03]">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500 mb-1">Signed In As</p>
                    <p className="text-sm font-bold text-white mb-0.5 truncate">{displayName}</p>
                    <p className="text-[11px] text-textMuted font-medium truncate opacity-70">{user?.email}</p>
                  </div>

                  <div className="px-3 pt-3 pb-3">
                    <p className="px-2 pb-2 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">Quick Actions</p>

                    <button
                      role="menuitem"
                      onClick={() => dashboard()}
                      className="w-full text-left px-3.5 py-2.5 text-xs font-bold text-textMuted hover:text-white hover:bg-primaryOrange/90 rounded-xl transition-all flex items-center gap-2.5 group border border-transparent hover:border-primaryOrange/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryOrange/70"
                    >
                      <LayoutDashboard size={15} className="opacity-70 group-hover:opacity-100" />
                      Open Dashboard
                    </button>

                    <button
                      role="menuitem"
                      onClick={() => dashboard("profile")}
                      className="w-full text-left px-3.5 py-2.5 text-xs font-bold text-textMuted hover:text-white hover:bg-white/[0.05] rounded-xl transition-all flex items-center gap-2.5 group mt-1 border border-transparent hover:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      <User size={15} className="opacity-70 group-hover:opacity-100" />
                      Profile
                    </button>

                    <button
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full text-left px-3.5 py-2.5 text-xs font-bold text-red-400 hover:text-white hover:bg-red-500/80 rounded-xl transition-all flex items-center gap-2.5 group mt-1 border border-transparent hover:border-red-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
                    >
                      <LogOut size={15} className="opacity-70 group-hover:opacity-100" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="md:hidden text-textMuted hover:text-white focus:outline-none"
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 w-[min(20rem,calc(100vw-1rem))] h-full bg-themeBg z-50 shadow-[-20px_0_60px_rgba(0,0,0,0.8)] border-l border-white/5 p-6 sm:p-8 flex flex-col h-full text-white animate-slide-in-right">

            {/* User Section */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-primaryOrange uppercase tracking-[0.25em] mb-1">
                  {authenticated ? "Member Access" : "Hello there!"}
                </span>
                <span className="text-xl font-black text-white truncate">
                  {authenticated ? displayName : "QPaperVault"}
                </span>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close Menu"
                className="w-12 h-12 rounded-2xl bg-cardBg hover:bg-primaryOrange flex items-center justify-center text-textMuted hover:text-white transition-all border border-white/5 shadow-lg group"
              >
                <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Nav Links */}
            <div className="space-y-3 mt-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => closeMenuAndNavigate(link.path)}
                  className={`w-full text-left text-sm font-black uppercase tracking-widest px-6 py-4 rounded-2xl transition-all ${isActive(link.path)
                    ? "bg-primaryOrange text-white shadow-[0_8px_30px_rgba(254,82,56,0.2)]"
                    : "text-textMuted hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <hr className="border-white/5 my-8" />

            {/* Mobile Auth Buttons */}
            {!authenticated ? (
              <div className="space-y-4 mt-auto mb-4">
                <button
                  onClick={() => closeMenuAndNavigate("/login")}
                  className="w-full text-center border border-white/10 text-white rounded-xl py-3.5 bg-cardBg hover:bg-white/5 font-semibold transition-colors"
                >
                  Sign in
                </button>

                <button
                  onClick={() => closeMenuAndNavigate("/signup")}
                  className="w-full text-center bg-primaryOrange text-white rounded-xl py-3.5 font-bold shadow-[0_4px_14px_0_rgba(254,82,56,0.2)] hover:shadow-[0_6px_20px_rgba(254,82,56,0.3)] transition-all"
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div className="space-y-4 mt-auto mb-4">
                <button
                  onClick={() => dashboard()}
                  className="w-full text-center bg-cardBg text-white hover:bg-white/5 rounded-xl py-3.5 font-semibold transition-colors border border-white/5"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => { dashboard("profile"); setMenuOpen(false); }}
                  className="w-full text-center bg-cardBg text-white hover:bg-white/5 rounded-xl py-3.5 font-semibold transition-colors border border-white/5"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-center border border-red-500/20 text-red-500 rounded-xl py-3.5 bg-red-500/10 hover:bg-red-500/20 font-semibold transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
