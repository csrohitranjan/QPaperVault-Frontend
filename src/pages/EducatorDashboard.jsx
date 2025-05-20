import React from "react";
import { getUser } from "../utils/auth";

export default function EducatorDashboard() {
  const user = getUser();
  console.log("Educator Dashboard Loaded", user);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Educator Dashboard</h1>
      <p className="text-lg text-gray-800">Welcome, {user?.fullName}!</p>
    </div>
  );
}
