// src/pages/ConfirmRegistration.jsx
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { confirmRegistration } from "../services/authService";

export default function ConfirmRegistration() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState({
    loading: true,
    success: false,
    message: "",
  });

  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token || hasVerified.current) return;

    hasVerified.current = true;

    const verifyAccount = async () => {
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

    verifyAccount();
  }, [token]);

  if (status.loading) {
    return (
      <CenteredCard>
        <Spinner />
        <p className="mt-4 text-lg text-gray-600 font-semibold tracking-wide">
          Activating your account...
        </p>
      </CenteredCard>
    );
  }

  return (
    <CenteredCard>
      {status.success ? (
        <>
          <CheckCircle />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Account Activated
          </h1>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            {status.message}
          </p>
          <Link
            to="/login"
            className="mt-8 inline-block bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 transition"
          >
            Proceed to Login
          </Link>
        </>
      ) : (
        <>
          <XCircle />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Activation Failed
          </h1>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            {status.message}
          </p>
          <Link
            to="/support"
            className="mt-8 inline-block bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-red-600 hover:to-red-800 transition"
          >
            Contact Support
          </Link>
        </>
      )}
    </CenteredCard>
  );
}

const CenteredCard = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 flex items-center justify-center px-6">
    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center">
      {children}
    </div>
  </div>
);

const Spinner = () => (
  <svg
    className="animate-spin h-16 w-16 text-indigo-600 mx-auto"
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
    className="mx-auto h-20 w-20 text-green-500"
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
    className="mx-auto h-20 w-20 text-red-500"
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
