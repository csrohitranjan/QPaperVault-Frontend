// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { requestPasswordReset } from "../services/authService";
import { toast } from "react-toastify";

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
      toast.success(res.data?.message);
      setEmail("");
    } catch (err) {
      console.error("Forgot password error:", err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-[#0e0e2e] to-gray-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 shadow-xl rounded-xl p-8 w-full max-w-md backdrop-blur-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          Forgot Password
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            loading
              ? "bg-pink-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-sm mt-4 text-center text-gray-400">
          Remember your password?{" "}
          <a href="/login" className="text-pink-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
