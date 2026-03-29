// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "../api/authService";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import { FiMail, FiArrowLeft, FiSend } from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await requestPasswordReset(email);
      toast.success(res.data?.message || "Reset link sent!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
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
              <FiMail className="text-primaryOrange text-2xl" />
            </div>
            <h2 className="ui-title mb-1">
              Reset Password
            </h2>
            <p className="ui-subtitle">
              Enter your email to receive a link
            </p>
          </div>

          <div className="text-left space-y-5">
            <InputField
              label="Email Address"
              type="email"
              name="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dark
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ui-btn-primary w-full mt-8"
          >
            {loading ? "Sending..." : "Send Reset Link"}
            {!loading && <FiSend className="text-base" />}
          </button>

          <p className="mt-8 text-[12px] font-bold text-textMuted text-center">
            <Link to="/login" className="flex items-center justify-center gap-1.5 text-white hover:text-primaryOrange transition-colors group">
              <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
