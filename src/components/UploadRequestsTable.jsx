// src/components/UploadRequestsTable.jsx
import React, { useEffect, useState } from "react";
import {
  getPendingQuestionPapers,
  approveQuestionPaper,
  rejectQuestionPaper,
} from "../api/authService";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { Eye, Check, X, ShieldCheck, Loader2 } from "lucide-react";

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
        // Using internal API interceptors for auth, match user structure
        const response = await getPendingQuestionPapers();
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
    try {
      let response;
      if (actionType === "approve") {
        response = await approveQuestionPaper(selectedId, remark);
      } else {
        response = await rejectQuestionPaper(selectedId, remark);
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

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center animate-pulse min-h-[400px]">
      <div className="p-4 bg-primaryOrange/10 rounded-2xl border border-primaryOrange/20 mb-4">
        <Loader2 size={32} className="text-primaryOrange/40 animate-spin" strokeWidth={1} />
      </div>
      <p className="text-zinc-500 font-bold text-[10px] tracking-[0.3em] uppercase">Synchronizing Queue...</p>
    </div>
  );

  if (requests.length === 0) return (
    <div className="flex-1 h-full min-h-[500px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-1000 relative overflow-hidden bg-[#0a0b10]">
      {/* Background DNA - Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex-col items-center flex">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full animate-pulse"></div>
          <div className="relative w-24 h-24 bg-[#0f111a] rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-3xl group transition-transform duration-500 hover:scale-110">
             <ShieldCheck size={40} className="text-emerald-500/40 group-hover:text-emerald-400 transition-colors duration-500" strokeWidth={1} />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white tracking-widest uppercase">System Nominal</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
            The moderation queue is clear. No pending data intake requests found.
          </p>
        </div>
      </div>

      {/* Moderation Bottom Watermark */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-20 group pointer-events-none">
        <div className="h-[1px] w-8 bg-zinc-500"></div>
        <span className="text-[8px] uppercase tracking-[0.5em] text-zinc-500 whitespace-nowrap">Moderation Queue Index v1.0.4</span>
        <div className="h-[1px] w-8 bg-zinc-500"></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full h-full flex-1 overflow-x-auto overflow-y-auto styled-scrollbar border-t border-white/5 relative">
        <table className="min-w-full table-auto divide-y divide-white/5 bg-transparent shadow-2xl">
          <thead className="text-indigo-400 uppercase sticky top-0 z-20 backdrop-blur-md">
            <tr className="shadow-lg text-center">
              <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/95 border-b border-white/5">
                Paper Code
              </th>
              <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/95 border-b border-white/5">
                Programme
              </th>
              <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/95 border-b border-white/5">
                Department
              </th>
              <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/95 border-b border-white/5">
                Year
              </th>
              <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/95 border-b border-white/5">
                Month
              </th>
              <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/95 border-b border-white/5">
                Uploaded By
              </th>
              <th className="px-6 py-4 text-center text-[10px] font-black tracking-[0.2em] bg-[#12141c]/95 border-b border-white/5">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-white/[0.03]">
            {requests.map((req) => (
              <tr
                key={req._id}
                className="hover:bg-indigo-500/[0.04] transition-all duration-300 group text-center"
              >
                <td className="px-6 py-2 text-sm text-zinc-200 group-hover:text-indigo-400 transition-colors uppercase tracking-widest text-center font-normal">{req.paperCode}</td>
                <td className="px-6 py-2 text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors text-center font-normal">{req.programme}</td>
                <td className="px-6 py-2 text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors text-center font-normal">{req.department}</td>
                <td className="px-6 py-2 text-xs text-zinc-300 group-hover:text-indigo-300 transition-colors text-center font-normal">{req.year}</td>
                <td className="px-6 py-2 text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors text-center font-normal">{req.month}</td>
                <td className="px-6 py-2 text-center font-normal">
                   <div className="flex justify-center">
                    <span className="bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-md text-[10px] border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-all font-normal">
                      {req.uploadedBy?.enrollmentNumber || "SYSTEM"}
                    </span>
                   </div>
                </td>

                <td className="px-6 py-2 text-center font-normal">
                  <div className="flex justify-center items-center space-x-3">
                    <a
                      href={req.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-indigo-500/20 rounded-xl transition-all border border-white/5 hover:border-indigo-500/30"
                    >
                      <Eye size={16} />
                    </a>
                    <button
                      onClick={() => openModal(req._id, "approve")}
                      className="p-2.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl transition-all border border-emerald-500/20"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => openModal(req._id, "reject")}
                      className="p-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-xl font-black mb-6 text-center capitalize text-white tracking-tight">
          {actionType} Remark
        </h3>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="w-full bg-[#12141c] border border-white/10 text-white rounded-2xl p-4 mb-6 resize-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium placeholder-zinc-600 shadow-inner"
          rows="4"
          placeholder="Enter reason for this action..."
        />
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-3 rounded-xl border border-white/5 text-zinc-400 hover:text-white hover:bg-white/5 font-bold transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={remark.trim() === ""}
            className={`px-8 py-3 rounded-xl font-black text-white transition-all shadow-2xl text-sm ${remark.trim() === ""
              ? "bg-white/5 text-zinc-600 cursor-not-allowed"
              : actionType === "approve"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-500/20"
                : "bg-gradient-to-r from-red-600 to-rose-600 hover:shadow-red-500/20"
              }`}
          >
            {actionType === "approve" ? "Confirm Approval" : "Reject Paper"}
          </button>
        </div>
      </Modal>
    </>
  );
}

