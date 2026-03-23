// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmRegistration from "./pages/ConfirmRegistration";

import Contact from "./pages/Contact";
import Notes from "./pages/Notes";

// Lazy-loaded Heavy Routes
const StudentDashboard = React.lazy(() => import("./pages/StudentDashboard"));
const EducatorDashboard = React.lazy(() => import("./pages/EducatorDashboard"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const QuestionPaperList = React.lazy(() => import("./components/QuestionPaperList"));

import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <React.Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center bg-themeBg">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-white/5 border-t-primaryOrange animate-spin"></div>
            <p className="text-primaryOrange font-bold tracking-widest uppercase text-xs animate-pulse">Loading Environment...</p>
          </div>
        </div>
      }>
        <Routes>
          {/* All layout pages (with Navbar/Footer inside MainLayout) */}
          <Route element={<MainLayout />}>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Public pages */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/notes" element={<Notes />} />

            {/* PROTECTED: PYQs (requires login) */}
            <Route
              path="/pyqs"
              element={
                <ProtectedRoute allowedRoles={["student", "educator", "admin"]}>
                  <QuestionPaperList />
                </ProtectedRoute>
              }
            />
            {/* Dashboards (protected + role-based) */}
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/educator-dashboard"
              element={
                <ProtectedRoute allowedRoles={["educator"]}>
                  <EducatorDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Email verification / confirm */}
          <Route
            path="/confirm-registration"
            element={<ConfirmRegistration />}
          />

          {/* 404 */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </React.Suspense>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
