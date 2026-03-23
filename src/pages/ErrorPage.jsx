// src/pages/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="h-[calc(100vh-4rem)] relative flex items-center justify-center px-4 font-sans overflow-hidden bg-themeBg text-white">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primaryOrange/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="text-center animate-in fade-in zoom-in-95 duration-700">
        <div className="text-8xl md:text-9xl font-black text-primaryOrange mb-4 tracking-tighter">404</div>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
          Oops! Page not found.
        </h1>
        <p className="text-textMuted text-base font-medium mb-8 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3.5 bg-primaryOrange text-white rounded-xl font-black shadow-[0_4px_14px_rgba(254,82,56,0.3)] hover:shadow-[0_6px_20px_rgba(254,82,56,0.5)] hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest"
        >
          Go to Homepage
        </Link>
        <p className="mt-8 text-[12px] font-bold text-textMuted">
          If you think this is a mistake,{" "}
          <a href="mailto:rohit.backend@gmail.com" className="text-white hover:text-primaryOrange transition-colors underline decoration-primaryOrange/30 underline-offset-4">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
}
