// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetUserPassword } from "../api/authService";
import InputField from "../components/InputField";
import { FiLock, FiArrowRight } from "react-icons/fi";

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
    <div className="ui-page-shell text-center">
      {/* Subtle Glow */}
      <div className="ui-page-glow-orange"></div>
      
      <div className="w-full max-w-[420px] relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <form
          onSubmit={handleSubmit}
          className="ui-card relative"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="w-14 h-14 bg-primaryOrange/10 border border-primaryOrange/20 rounded-2xl mx-auto mb-5 flex items-center justify-center shadow-sm">
              <FiLock className="text-primaryOrange text-2xl" />
            </div>
            <h2 className="ui-title mb-1">
              New Password
            </h2>
            <p className="ui-subtitle">
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
            className="ui-btn-primary w-full mt-8"
          >
            {loading ? "Resetting..." : "Reset Password"}
            {!loading && <FiArrowRight className="text-base" />}
          </button>
        </form>
      </div>
    </div>
  );
}
