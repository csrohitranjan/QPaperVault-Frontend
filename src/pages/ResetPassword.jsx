// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetUserPassword } from "../services/authService";

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
      toast.error("Reset token is missing from URL");
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
        toast.success(res.data?.message);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-[#0e0e2e] to-gray-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 shadow-xl rounded-xl p-8 w-full max-w-md backdrop-blur-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          Reset Password
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 ${
            loading
              ? "bg-pink-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          } text-white font-semibold py-2 px-4 rounded transition`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}
