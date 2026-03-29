// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getUser, isLoggedIn, setAuthData } from "../utils/auth";
import { loginUser } from "../api/authService";
import { toast } from "react-toastify";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";

const getDashboardPath = (user) => {
  if (user?.role === "admin") return "/admin-dashboard";
  if (user?.role === "educator") return "/educator-dashboard";
  return "/student-dashboard";
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fromProtected = location.state?.from?.pathname;

  useEffect(() => {
    if (!isLoggedIn()) return;

    const existingUser = getUser();
    const target = fromProtected || getDashboardPath(existingUser);
    navigate(target, { replace: true });
  }, [navigate, fromProtected]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await loginUser({ email: email.trim(), password });
      if (res.data.success) {
        const { accessToken, user } = res.data;
        setAuthData(accessToken, user);
        if (fromProtected) return navigate(fromProtected, { replace: true });

        return navigate(getDashboardPath(user));
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Login failed.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ui-page-shell text-center">
      {/* Subtle Ambient Glows */}
      <div className="ui-page-glow-orange"></div>
      
      <div className="w-full max-w-[420px] relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <form
          onSubmit={handleLogin}
          className="ui-card relative"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="w-14 h-14 bg-primaryOrange/10 border border-primaryOrange/20 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-sm">
              <FiLock className="text-primaryOrange text-2xl" />
            </div>
            <h2 className="ui-title mb-1">
              Welcome <span className="text-primaryOrange">Back</span>
            </h2>
            <p className="ui-subtitle">
              Personalized Knowledge Vault
            </p>
          </div>

          <div className="space-y-5 text-left">
            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label className="ui-label">Email</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primaryOrange/60 transition-colors" />
                <input
                  type="email"
                  className="ui-input-dark pl-11"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="ui-label ml-0">Password</label>
                <Link to="/forgot-password" size="10" className="text-[9px] font-black uppercase text-primaryOrange hover:underline tracking-widest">Forgot?</Link>
              </div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primaryOrange/60 transition-colors" />
                <input
                  type="password"
                  className="ui-input-dark pl-11 tracking-[0.2em]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="ui-btn-primary w-full mt-8"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
            {!isLoading && <FiArrowRight className="text-base" />}
          </button>

          <p className="mt-6 text-[12px] font-bold text-textMuted text-center">
            New here?{" "}
            <Link to="/signup" className="text-white hover:text-primaryOrange transition-colors underline decoration-primaryOrange/30 underline-offset-4">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
