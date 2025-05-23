import React, { useEffect, useState } from "react";
import {
  getPendingQuestionPapers,
  approveQuestionPaper,
  rejectQuestionPaper,
} from "../services/authService";
import Modal from "./Modal";
import { toast } from "react-toastify";

export default function UploadRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [remark, setRemark] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("approve"); // 'approve' or 'reject'

  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const response = await getPendingQuestionPapers(token);
        setRequests(response.data.pendingPapers || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load upload requests.");
        toast.error("Failed to load upload requests.");
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  const openModal = (id, type) => {
    setSelectedId(id);
    setRemark("");
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      let response;
      if (actionType === "approve") {
        response = await approveQuestionPaper(selectedId, remark, token);
      } else {
        response = await rejectQuestionPaper(selectedId, remark, token);
      }
      toast.success(
        response?.data?.message || `Question paper ${actionType}d successfully.`
      );
      setRequests((prev) => prev.filter((req) => req._id !== selectedId));
      setIsModalOpen(false);
    } catch (error) {
      console.error(`${actionType} failed`, error);
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        `Failed to ${actionType} the question paper.`;
      toast.error(errMsg);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
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
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Department
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Year
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Month
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Uploaded By
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {requests.map((req) => (
              <tr
                key={req._id}
                className="hover:bg-indigo-50 transition duration-200"
              >
                <td className="px-6 py-2">{req.paperCode}</td>
                <td className="px-6 py-2">{req.programme}</td>
                <td className="px-6 py-2">{req.department}</td>
                <td className="px-6 py-2">{req.year}</td>
                <td className="px-6 py-2">{req.month}</td>
                <td className="px-6 py-2">
                  {req.uploadedBy?.enrollmentNumber || "N/A"}
                </td>
                <td className="px-6 py-3 text-center flex justify-center items-center space-x-3">
                  <a
                    href={req.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Question Paper"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
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
                  </a>
                  <button
                    onClick={() => openModal(req._id, "approve")}
                    title="Approve Request"
                    aria-label="Approve question paper"
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => openModal(req._id, "reject")}
                    title="Reject Request"
                    aria-label="Reject question paper"
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-medium mb-4 text-center capitalize">
          {actionType} Remark
        </h3>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-6 resize-none"
          rows="3"
          placeholder="Enter your remark..."
        />
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={remark.trim() === ""}
            className={`px-6 py-2 rounded text-white ${
              remark.trim() === ""
                ? "bg-gray-400 cursor-not-allowed"
                : actionType === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
}
