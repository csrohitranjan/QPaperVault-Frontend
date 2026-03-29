// src/pages/Signup.jsx
import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { requestRegistration } from "../api/authService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUser, isLoggedIn } from "../utils/auth";
import { FiUserPlus, FiArrowRight, FiShield } from "react-icons/fi";

const getDashboardPath = (user) => {
  if (user?.role === "admin") return "/admin-dashboard";
  if (user?.role === "educator") return "/educator-dashboard";
  return "/student-dashboard";
};

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    enrollmentNumber: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const fromProtected = location.state?.from?.pathname;

  useEffect(() => {
    if (!isLoggedIn()) return;

    const existingUser = getUser();
    const target = fromProtected || getDashboardPath(existingUser);
    navigate(target, { replace: true });
  }, [navigate, fromProtected]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.enrollmentNumber) {
      setError("All fields are required.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setIsLoading(true);
    try {
      await requestRegistration(formData);
      setIsSuccess(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="ui-page-shell">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] pointer-events-none -z-10"></div>
        <div className="max-w-md w-full ui-card text-center animate-in fade-in zoom-in-95 duration-700">
          <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
            <FiShield size={32} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Verify Email</h2>
          <p className="text-textMuted font-bold text-sm mb-6 opacity-80">
            Activation link sent to:
          </p>
          <div className="bg-themeBg border border-white/5 rounded-xl p-3 mb-6">
            <p className="text-emerald-400 font-black text-base break-words">
              {formData.email}
            </p>
          </div>
          <p className="text-[10px] text-textMuted font-bold uppercase tracking-widest opacity-60">
            Check spam if not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ui-page-shell text-center">
      {/* Subtle Glow */}
      <div className="ui-page-glow-orange"></div>
      
      <div className="w-full max-w-[420px] lg:max-w-2xl relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <form
          onSubmit={handleSignup}
          className="ui-card"
        >
          {/* Header */}
          <div className="mb-8 lg:flex lg:items-center lg:text-left lg:gap-6">
            <div className="w-14 h-14 bg-primaryOrange/10 border border-primaryOrange/20 rounded-2xl mx-auto lg:mx-0 mb-4 lg:mb-0 flex items-center justify-center shadow-sm">
              <FiUserPlus className="text-primaryOrange text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight mb-0.5">
                Join <span className="text-primaryOrange">Vault</span>
              </h2>
              <p className="ui-subtitle">
                Create your student account
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 text-left">
            <InputField
              label="Full Name"
              name="fullName"
              placeholder="Rohit Ranjan"
              value={formData.fullName}
              onChange={handleChange}
              dark
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="rohit@example.com"
              value={formData.email}
              onChange={handleChange}
              dark
            />
            <InputField
              label="Enrollment"
              name="enrollmentNumber"
              placeholder="12345678"
              value={formData.enrollmentNumber}
              onChange={handleChange}
              dark
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              dark
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-xl p-2.5 mt-5">
              {error}
            </div>
          )}

          <div className="mt-8 lg:mt-10 lg:flex lg:items-center lg:gap-6">
            <button
              type="submit"
              disabled={isLoading}
              className="ui-btn-primary w-full lg:w-3/5"
            >
              {isLoading ? "Processing..." : "Create Account"}
              {!isLoading && <FiArrowRight className="text-base" />}
            </button>
            <p className="mt-5 lg:mt-0 text-center lg:text-left text-[12px] font-bold text-textMuted">
              Already a member?{" "}
              <Link to="/login" className="text-white underline decoration-primaryOrange/30 underline-offset-4 hover:text-primaryOrange transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
