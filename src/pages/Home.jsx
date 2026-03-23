import React from "react";
import { Link } from "react-router-dom";
import { FiBookOpen, FiFileText, FiUsers } from "react-icons/fi";

export default function Home() {
  return (
    <div className="relative overflow-hidden font-sans bg-themeBg h-[calc(100vh-4rem)] flex flex-col justify-center">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-primaryOrange/10 rounded-full pointer-events-none -z-10 blur-[130px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cardBg border border-white/5 text-[11px] font-bold text-white mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            v2.0 is live
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white leading-tight">
            Unlock the ultimate <br className="hidden md:block"/>
            <span className="text-primaryOrange">
              Knowledge Repository
            </span>
          </h1>
          <p className="text-textMuted max-w-xl mx-auto text-base mb-8 leading-relaxed font-medium">
            Your single destination for authentic Previous Year Question Papers, curated Notes, and advanced Study Resources.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <Link
              to="/pyqs"
              className="bg-cardBg border border-white/5 hover:bg-white/5 text-white px-10 py-3.5 rounded-xl font-black transition-all hover:-translate-y-0.5 active:scale-95 text-[13px] uppercase tracking-widest shadow-xl"
            >
              Browse
            </Link>
            <Link
              to="/signup"
              className="bg-primaryOrange text-white px-10 py-3.5 rounded-xl font-black shadow-[0_4px_14px_0_rgba(254,82,56,0.3)] hover:shadow-[0_6px_20px_rgba(254,82,56,0.5)] transition-all hover:-translate-y-0.5 active:scale-95 text-[13px] uppercase tracking-widest"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Section (Refined Zoom) */}
        <section className="grid gap-6 md:grid-cols-3 text-left mt-12">
          <div className="group bg-cardBg border border-white/5 rounded-3xl p-8 hover:bg-[#2a2d3b] transition-all duration-300 shadow-xl flex flex-col items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primaryOrange/10 flex items-center justify-center border border-primaryOrange/20 group-hover:scale-110 transition-transform">
              <FiFileText className="text-2xl text-primaryOrange" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2">
                Previous Papers
              </h3>
              <p className="text-textMuted text-sm leading-relaxed font-medium line-clamp-2">
                Access university question papers, intelligently organized by year, code, and course.
              </p>
            </div>
          </div>
          
          <div className="group bg-cardBg border border-white/5 rounded-3xl p-8 hover:bg-[#2a2d3b] transition-all duration-300 shadow-xl flex flex-col items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primaryOrange/10 flex items-center justify-center border border-primaryOrange/20 group-hover:scale-110 transition-transform">
              <FiBookOpen className="text-2xl text-primaryOrange" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2">
                Study Notes
              </h3>
              <p className="text-textMuted text-sm leading-relaxed font-medium line-clamp-2">
                Discover high-quality, curated study materials contributed by top educators and alumni.
              </p>
            </div>
          </div>
          
          <div className="group bg-cardBg border border-white/5 rounded-3xl p-8 hover:bg-[#2a2d3b] transition-all duration-300 shadow-xl flex flex-col items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primaryOrange/10 flex items-center justify-center border border-primaryOrange/20 group-hover:scale-110 transition-transform">
              <FiUsers className="text-2xl text-primaryOrange" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2">
                Community
              </h3>
              <p className="text-textMuted text-sm leading-relaxed font-medium line-clamp-2">
                Join a network of learners to ask questions, solve problems, and collaborate.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
