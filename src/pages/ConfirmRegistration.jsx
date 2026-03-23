// src/pages/ConfirmRegistration.jsx
import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { confirmRegistration } from "../api/authService";

export default function ConfirmRegistration() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    message: "",
  });

  const handleConfirmActivation = async () => {
    if (!token) return;

    setStatus({ loading: true, success: null, message: "" });

    try {
      const { data } = await confirmRegistration(token);
      setStatus({
        loading: false,
        success: data.success,
        message:
          data.message ||
          (data.success
            ? "Your account has been successfully activated!"
            : "Activation failed. Please contact support."),
      });
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong during activation. Please try again later.",
      });
    }
  };

  if (status.loading) {
    return (
      <CenteredCard>
        <Spinner />
        <p className="mt-6 text-lg text-zinc-300 font-semibold tracking-wide">
          Activating your account...
        </p>
      </CenteredCard>
    );
  }

  if (status.success !== null) {
    return (
      <CenteredCard glowColor={status.success ? "emerald" : "red"}>
        {status.success ? (
          <>
            <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle />
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              Account Activated
            </h1>
            <p className="mt-3 text-textMuted font-medium max-w-sm mx-auto leading-relaxed">
              {status.message}
            </p>
            <Link
              to="/login"
              className="mt-8 inline-block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all text-center"
            >
              Proceed to Login
            </Link>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
              <XCircle />
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              Activation Failed
            </h1>
            <p className="mt-3 text-textMuted font-medium max-w-sm mx-auto leading-relaxed">
              {status.message}
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(239,68,68,0.3)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.4)] hover:-translate-y-0.5 transition-all text-center"
            >
              Contact Support
            </Link>
          </>
        )}
      </CenteredCard>
    );
  }

  // Initial confirmation screen
  return (
    <CenteredCard glowColor="primary">
      <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-primaryOrange/10 border border-primaryOrange/20 shadow-[0_0_20px_rgba(254,82,56,0.2)]">
        <svg className="w-10 h-10 text-primaryOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h1 className="text-3xl font-extrabold text-white">
        Confirm Account
      </h1>
      <p className="mt-3 text-textMuted font-medium max-w-sm mx-auto leading-relaxed">
        You are one step away! Click the button below to activate your account and join QPaperVault.
      </p>
      <button
        onClick={handleConfirmActivation}
        className="mt-8 w-full bg-primaryOrange hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(254,82,56,0.3)] hover:shadow-[0_6px_20px_rgba(254,82,56,0.4)] hover:-translate-y-0.5 transition-all"
      >
        Activate My Account
      </button>
    </CenteredCard>
  );
}

const CenteredCard = ({ children, glowColor = "primary" }) => {
  const glowMap = {
    primary: "bg-primaryOrange/5",
    emerald: "bg-emerald-500/10",
    red: "bg-red-500/10",
  };

  const ringMap = {
    primary: "bg-primaryOrange/10",
    emerald: "bg-emerald-500/10",
    red: "bg-red-500/10",
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 font-sans overflow-hidden py-24 bg-themeBg text-white">
      {/* Dynamic Glow Background */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${glowMap[glowColor] || glowMap.primary} rounded-full blur-[120px] pointer-events-none -z-10 transition-colors duration-1000`}></div>
      
      <div className="bg-cardBg border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-3xl p-8 sm:p-12 w-full max-w-md relative z-10 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 ${ringMap[glowColor] || ringMap.primary} opacity-50 rounded-full blur-2xl pointer-events-none -z-10 transition-colors duration-1000`}></div>
        {children}
      </div>
    </div>
  );
};

const Spinner = () => (
  <svg
    className="animate-spin h-14 w-14 text-primaryOrange mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const CheckCircle = () => (
  <svg
    className="h-10 w-10 text-emerald-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4M12 22a10 10 0 110-20 10 10 0 010 20z"
    />
  </svg>
);

const XCircle = () => (
  <svg
    className="h-10 w-10 text-red-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
  </svg>
);
