import React from "react";
import { getUser } from "../utils/auth";

export default function AdminDashboard() {
  const user = getUser();
  console.log("Admin Dashboard Loaded", user);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Admin Dashboard</h1>
      <p className="text-lg text-gray-800">Welcome, {user?.fullName}!</p>
    </div>
  );
}
