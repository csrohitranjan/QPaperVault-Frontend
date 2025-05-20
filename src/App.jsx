// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard"; // ✅ Import
import EducatorDashboard from "./pages/EducatorDashboard"; // ✅ Import
import AdminDashboard from "./pages/AdminDashboard"; // ✅ Import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/educator-dashboard" element={<EducatorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* ✅ Route added */}
      </Routes>
    </Router>
  );
}

export default App;
