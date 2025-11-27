// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { setAuthData } from "../utils/auth";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // If user was sent here from a ProtectedRoute, original route is stored here
  const fromProtected = location.state?.from?.pathname;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await loginUser({ email: email.trim(), password });

      if (res.data.success) {
        const { accessToken, user } = res.data;

        console.log("Login Success", user);
        setAuthData(accessToken, user);

        // If came from a protected route (e.g. /pyqs) → go back there
        if (fromProtected) {
          return navigate(fromProtected, { replace: true });
        }

        // Else go back one step in history (if there is one)
        if (window.history.length > 1) {
          return navigate(-1);
        }

        // Fallback → go home
        return navigate("/");
      }
    } catch (err) {
      console.error("Login Error", err);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-[#0e0e2e] to-gray-900 text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white/5 border border-white/10 shadow-xl rounded-xl p-8 w-full max-w-md backdrop-blur-sm"
      >
        <fieldset disabled={isLoading}>
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            Login to QPaperVault
          </h2>

          {/* Email field */}
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

          {/* Password field */}
          <div className="mb-2">
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          {/* Forgot password link */}
          <div className="mb-6 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-pink-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 ${isLoading
              ? "bg-pink-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
              } text-white font-semibold py-2 px-4 rounded transition`}
          >
            {isLoading ? (
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Don't have an account? Signup link */}
          <p className="mt-4 text-sm text-center text-gray-300">
            {/* This text helps new users quickly navigate to the signup page */}
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-pink-400 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
}
