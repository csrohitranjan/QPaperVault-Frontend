// src/pages/Contact.jsx
import React, { useState } from "react";
import { FiMail, FiUser, FiMessageSquare, FiPhone } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! I’ll get back to you soon.");
    setFormData({ fullName: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-[#0f0f1f] to-gray-900 text-white px-4 pt-20 pb-12 sm:pt-28 flex items-center justify-center">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Section - Profile */}
        <div className="text-center lg:text-left space-y-6 px-4">
          <img
            src="https://avatars.githubusercontent.com/u/110171594?v=4"
            alt="Rohit Ranjan"
            className="w-48 h-48 mx-auto lg:mx-0 rounded-full border-4 border-indigo-500 shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-pink-500 text-transparent bg-clip-text">
              Rohit Ranjan
            </h2>
            <p className="text-lg text-gray-400 mt-3">
              Have feedback or facing an issue? I’d love to hear from you.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 mt-4 text-gray-300 text-lg">
              <FiPhone />
              <span className="font-semibold tracking-wide">
                +91 8877660555
              </span>
            </div>

            <a
              href="https://www.linkedin.com/in/csrohitranjan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center lg:justify-start gap-2 mt-3 text-blue-400 hover:text-blue-500 transition text-lg"
            >
              <FaLinkedin className="text-2xl" />
              <span className="font-medium">Connect on LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-white/10">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 to-pink-500 text-transparent bg-clip-text">
            Contact Me
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="fullName"
                placeholder="Your Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
              <textarea
                name="message"
                placeholder="Write your message here..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
