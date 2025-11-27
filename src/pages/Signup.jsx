import React, { useState } from "react";
import InputField from "../components/InputField";
import { requestRegistration } from "../services/authService";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.enrollmentNumber
    ) {
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
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-[#0e0e2e] to-gray-900 text-white px-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-xl p-8 text-center shadow-lg backdrop-blur-md">
          <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-green-800/30">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">
            Registration Successful
          </h2>
          <p className="text-gray-300 mb-4">
            Please check your inbox to activate your account:
          </p>
          <p className="text-white font-medium mb-6 break-words">
            {formData.email}
          </p>
          <p className="text-sm text-gray-400">
            Check spam if you don’t see the email. After activation, you can log
            in and access the platform.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-[#0e0e2e] to-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 shadow-lg rounded-xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          Create Your Account
        </h2>
        <form onSubmit={handleSignup}>
          <fieldset disabled={isLoading} className="space-y-4">
            <InputField
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              dark
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              dark
            />
            <InputField
              label="Enrollment Number"
              type="text"
              name="enrollmentNumber"
              value={formData.enrollmentNumber}
              onChange={handleChange}
              dark
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              dark
            />

            {error && (
              <p className="text-red-400 text-sm mt-1 -mb-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading
                  ? "bg-pink-400/50 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
                } text-white font-semibold py-2 px-4 rounded-lg transition flex justify-center items-center`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
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
                  Creating...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </fieldset>
        </form>

        <p className="text-sm mt-4 text-center text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-pink-400 hover:underline transition">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
