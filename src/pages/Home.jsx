import React from "react";
import { Link } from "react-router-dom";
import { FiBookOpen, FiFileText, FiUsers } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-[#0e0e2e] to-gray-900 text-white">
      {/* <div className="max-w-7xl mx-auto px-6 py-24"> */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 sm:pt-40">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            Welcome to QPaperVault
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-8">
            Your one-stop solution for Previous Year Question Papers, Notes, and
            Study Resources. Simplify your academic journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/pyqs"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md font-semibold transition"
            >
              Browse PYQs
            </Link>
            <Link
              to="/signup"
              className="border border-gray-600 hover:border-pink-500 hover:text-pink-400 px-6 py-3 rounded-md font-semibold transition text-white"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid gap-8 md:grid-cols-3 text-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:shadow-xl transition">
            <FiFileText className="mx-auto text-3xl text-pink-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Previous Papers
            </h3>
            <p className="text-gray-400 text-sm">
              Access a wide range of university question papers categorized by
              year, code, and course.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:shadow-xl transition">
            <FiBookOpen className="mx-auto text-3xl text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Study Notes</h3>
            <p className="text-gray-400 text-sm">
              Get curated notes and learning materials from top students and
              educators.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:shadow-xl transition">
            <FiUsers className="mx-auto text-3xl text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Community</h3>
            <p className="text-gray-400 text-sm">
              Join a community of learners, ask questions, and collaborate on
              academic topics.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
