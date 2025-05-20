// src/pages/Signup.jsx
import React, { useState } from "react";
import InputField from "../components/InputField";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await registerUser(formData);
      console.log("Signup Success", res.data);
      setError("");
      // Redirect to login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create Your Account</h2>
        <form onSubmit={handleSignup}>
          <InputField label="Full Name" type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />
          <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}
