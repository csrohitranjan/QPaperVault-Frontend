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
    <div className="h-[calc(100vh-4rem)] relative font-sans flex items-center justify-center px-4 overflow-hidden bg-themeBg text-white">
      {/* Glow Effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primaryOrange/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left Section - Profile (Zoomed) */}
        <div className="text-center lg:text-left space-y-4 px-4 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primaryOrange/40 rounded-full blur-lg opacity-50"></div>
            <img
              src="https://avatars.githubusercontent.com/u/110171594?v=4"
              alt="Rohit रंजन"
              className="relative w-36 h-36 mx-auto lg:mx-0 rounded-full border-4 border-cardBg shadow-2xl object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-2">
              Rohit <span className="text-primaryOrange">Ranjan</span>
            </h2>
            <p className="text-base text-textMuted font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
              Have feedback, finding bugs, or want to collaborate? Reach out—I'd love to hear from you.
            </p>

            <div className="flex flex-col gap-3 mt-5">
              <div className="flex items-center justify-center lg:justify-start gap-4 text-white">
                <div className="w-9 h-9 rounded-xl bg-cardBg flex items-center justify-center border border-white/5 shrink-0">
                  <FiPhone size={15} className="text-primaryOrange" />
                </div>
                <span className="font-semibold text-base transition-all">+91 8877660555</span>
              </div>

              <a
                href="https://www.linkedin.com/in/csrohitranjan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center lg:justify-start gap-4 text-white hover:text-primaryOrange group transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-cardBg flex items-center justify-center border border-white/5 shrink-0 group-hover:border-primaryOrange/30 transition-all">
                  <FaLinkedin size={15} className="text-blue-500" />
                </div>
                <span className="font-semibold text-base transition-colors">Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="bg-cardBg rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/5 relative overflow-hidden animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primaryOrange/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h2 className="text-2xl font-extrabold mb-6 text-white relative z-10">
            Drop a Message
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primaryOrange transition-colors text-sm" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-themeBg text-white placeholder-textMuted border border-white/5 focus:border-primaryOrange/50 focus:bg-themeBg transition-all outline-none font-medium text-sm"
              />
            </div>

            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-primaryOrange transition-colors text-sm" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-themeBg text-white placeholder-textMuted border border-white/5 focus:border-primaryOrange/50 focus:bg-themeBg transition-all outline-none font-medium text-sm"
              />
            </div>

            <div className="relative group">
              <FiMessageSquare className="absolute left-4 top-4 text-textMuted group-focus-within:text-primaryOrange transition-colors text-sm" />
              <textarea
                name="message"
                placeholder="How can I help you?"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-themeBg text-white placeholder-textMuted border border-white/5 focus:border-primaryOrange/50 focus:bg-themeBg transition-all outline-none resize-none font-medium text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primaryOrange text-white font-black rounded-xl shadow-[0_4px_14px_0_rgba(254,82,56,0.3)] hover:shadow-[0_6px_20px_rgba(254,82,56,0.5)] transition-all hover:-translate-y-0.5 active:scale-95 mt-1 text-sm uppercase tracking-widest"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
