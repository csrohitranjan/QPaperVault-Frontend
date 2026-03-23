// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { resetUserPassword } from "../api/authService";
import InputField from "../components/InputField";
import { FiLock, FiCheck, FiArrowRight } from "react-icons/fi";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      toast.error("Reset token is missing");
      navigate("/login");
      return;
    }
    setToken(tokenFromUrl);
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await resetUserPassword({
        token,
        newPassword,
        confirmPassword,
      });

      if (res.data.status === 200) {
        toast.success(res.data?.message || "Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] relative flex items-center justify-center px-4 font-sans overflow-hidden bg-themeBg text-white text-center">
      {/* Subtle Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primaryOrange/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="w-full max-w-[400px] relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <form
          onSubmit={handleSubmit}
          className="bg-cardBg border border-white/5 shadow-2xl rounded-[2rem] p-8 sm:p-10 relative"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="w-14 h-14 bg-primaryOrange/10 border border-primaryOrange/20 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-sm">
              <FiLock className="text-primaryOrange text-2xl" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-1">
              New Password
            </h2>
            <p className="text-textMuted text-[10px] font-bold tracking-widest uppercase opacity-60">
              Create a secure new password
            </p>
          </div>

          <div className="text-left space-y-4">
            <InputField
              label="New Password"
              type="password"
              name="newPassword"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              dark
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              dark
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 mt-8 py-3.5 bg-primaryOrange text-white rounded-xl font-black shadow-[0_4px_15px_rgba(254,82,56,0.2)] hover:shadow-[0_8px_25px_rgba(254,82,56,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 text-sm uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
            {!loading && <FiArrowRight className="text-base" />}
          </button>
        </form>
      </div>
    </div>
  );
}
