// src/pages/ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-extrabold text-blue-600 mb-4">404</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Oops! Page not found.
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Go to Homepage
        </Link>
      </div>
      <div className="mt-10 text-sm text-gray-500">
        If you think this is a mistake, please{" "}
        <a href="mailto:support@example.com" className="underline">
          contact support
        </a>
        .
      </div>
    </div>
  );
}
