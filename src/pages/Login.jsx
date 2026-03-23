// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { setAuthData } from "../utils/auth";
import { loginUser } from "../api/authService";
import { toast } from "react-toastify";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fromProtected = location.state?.from?.pathname;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await loginUser({ email: email.trim(), password });
      if (res.data.success) {
        const { accessToken, user } = res.data;
        setAuthData(accessToken, user);
        if (fromProtected) return navigate(fromProtected, { replace: true });
        
        // Redirect based on role instead of going back in history or to home
        if (user?.role === "admin") return navigate("/admin-dashboard");
        if (user?.role === "educator") return navigate("/educator-dashboard");
        return navigate("/student-dashboard");
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Login failed.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] relative flex items-center justify-center px-4 font-sans overflow-hidden bg-themeBg text-white text-center">
      {/* Subtle Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primaryOrange/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="w-full max-w-[400px] relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <form
          onSubmit={handleLogin}
          className="bg-cardBg border border-white/5 shadow-2xl rounded-[2rem] p-8 sm:p-10 relative"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="w-14 h-14 bg-primaryOrange/10 border border-primaryOrange/20 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-sm">
              <FiLock className="text-primaryOrange text-2xl" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-1">
              Welcome <span className="text-primaryOrange">Back</span>
            </h2>
            <p className="text-textMuted text-[10px] font-bold tracking-widest uppercase opacity-60">
              Personalized Knowledge Vault
            </p>
          </div>

          <div className="space-y-5 text-left">
            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-textMuted uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primaryOrange/60 transition-colors" />
                <input
                  type="email"
                  className="w-full bg-themeBg border border-white/5 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/10 focus:outline-none focus:border-primaryOrange/30 focus:bg-[#1a1c26] transition-all font-medium text-sm"
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
                <label className="text-[10px] font-bold text-textMuted uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" size="10" className="text-[9px] font-black uppercase text-primaryOrange hover:underline tracking-widest">Forgot?</Link>
              </div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primaryOrange/60 transition-colors" />
                <input
                  type="password"
                  className="w-full bg-themeBg border border-white/5 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/10 focus:outline-none focus:border-primaryOrange/30 focus:bg-[#1a1c26] transition-all font-medium text-sm tracking-[0.2em]"
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
            className="w-full flex items-center justify-center gap-2 mt-8 py-3.5 bg-primaryOrange text-white rounded-xl font-black shadow-[0_4px_15px_rgba(254,82,56,0.2)] hover:shadow-[0_8px_25px_rgba(254,82,56,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 text-sm uppercase tracking-widest disabled:opacity-50"
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
