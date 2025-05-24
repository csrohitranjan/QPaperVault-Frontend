// src/components/MyUploadTable.jsx
import React, { useEffect, useState } from "react";
import { getUserUploadedQuestionPapers } from "../services/authService";

export default function MyUploadsTable() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUploads() {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const response = await getUserUploadedQuestionPapers(token);
        setUploads(response.data.uploadedPapers || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your uploads.");
      } finally {
        setLoading(false);
      }
    }
    fetchUploads();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading uploads...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full overflow-x-auto overflow-y-auto max-h-[80vh]">
      <table className="min-w-full table-auto divide-y divide-gray-200 shadow-md rounded-lg">
        <thead className="bg-indigo-700 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Paper Code
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Programme
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Year</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Month</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Remark
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold">
              View
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {uploads.map((upload) => (
            <tr
              key={upload._id}
              className="hover:bg-indigo-50 transition duration-200"
            >
              <td className="px-6 py-2">{upload.paperCode}</td>
              <td className="px-6 py-2">{upload.programme}</td>
              <td className="px-6 py-2">{upload.year}</td>
              <td className="px-6 py-2">{upload.month}</td>
              <td
                className={`px-6 py-2 capitalize ${
                  upload.status === "approved"
                    ? "text-green-600 font-semibold"
                    : upload.status === "reject"
                    ? "text-red-600 font-semibold"
                    : ""
                }`}
              >
                {upload.status}
              </td>
              <td className="px-6 py-2">{upload.remark || "-"}</td>
              <td className="px-6 py-2 text-center">
                <a
                  href={upload.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Question Paper"
                  className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
                >
                  <svg
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
