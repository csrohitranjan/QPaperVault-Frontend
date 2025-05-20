import React from "react";
import { getUser } from "../utils/auth";

export default function StudentDashboard() {
  const user = getUser();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Student Dashboard</h1>
      <p className="text-lg text-gray-800">Welcome, {user?.fullName || "Student"}!</p>
      <p className="text-gray-600">Email: {user?.email}</p>
    </div>
  );
}
