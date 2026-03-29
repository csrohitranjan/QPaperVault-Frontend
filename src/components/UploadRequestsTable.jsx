// src/components/UploadRequestsTable.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  getPendingQuestionPapers,
  approveQuestionPaper,
  rejectQuestionPaper,
} from "../api/authService";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { Eye, Check, X, ShieldCheck, Loader2, Search, SlidersHorizontal, ArrowUpDown, Sparkles } from "lucide-react";

export default function UploadRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [remark, setRemark] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("approve"); // 'approve' or 'reject'
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [programmeFilter, setProgrammeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const monthRank = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5,
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12,
  };

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

  const filteredRequests = useMemo(() => {
    let result = [...requests];

    const query = searchTerm.trim().toLowerCase();
    if (query) {
      result = result.filter((req) => {
        const searchable = [
          req.paperCode,
          req.programme,
          req.department,
          req.year,
          req.month,
          req.uploadedBy?.enrollmentNumber,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchable.includes(query);
      });
    }

    if (programmeFilter !== "all") {
      result = result.filter((req) => String(req.programme || "").toLowerCase() === programmeFilter);
    }

    const getYear = (req) => Number(req.year) || 0;
    const getMonthScore = (req) => {
      const token = String(req.month || "")
        .toUpperCase()
        .split("-")[0]
        .trim();
      return monthRank[token] || 0;
    };

    result.sort((a, b) => {
      if (sortBy === "latest") {
        return getYear(b) - getYear(a) || getMonthScore(b) - getMonthScore(a);
      }
      if (sortBy === "oldest") {
        return getYear(a) - getYear(b) || getMonthScore(a) - getMonthScore(b);
      }
      if (sortBy === "code-asc") {
        return String(a.paperCode || "").localeCompare(String(b.paperCode || ""));
      }
      if (sortBy === "code-desc") {
        return String(b.paperCode || "").localeCompare(String(a.paperCode || ""));
      }
      return 0;
    });

    return result;
  }, [requests, searchTerm, programmeFilter, sortBy]);

  const programmeOptions = useMemo(() => {
    const options = Array.from(new Set(requests.map((req) => String(req.programme || "").toLowerCase()).filter(Boolean)));
    return options;
  }, [requests]);

  const openModal = (id, type) => {
    setSelectedId(id);
    setRemark("");
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const trimmedRemark = remark.trim();
    const isRejectAction = actionType === "reject";

    if (isRejectAction && !trimmedRemark) {
      toast.error("Please enter a rejection reason.");
      return;
    }

    try {
      setActionLoading(true);
      let response;
      if (actionType === "approve") {
        response = await approveQuestionPaper(selectedId, trimmedRemark);
      } else {
        response = await rejectQuestionPaper(selectedId, trimmedRemark);
      }
      toast.success(
        response?.data?.message || `Question paper ${actionType}d successfully.`
      );
      setRequests((prev) => prev.filter((req) => req._id !== selectedId));
      setIsModalOpen(false);
      setRemark("");
    } catch (error) {
      console.error(`${actionType} failed`, error);
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        `Failed to ${actionType} the question paper.`;
      toast.error(errMsg);
    } finally {
      setActionLoading(false);
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
      <div className="w-full h-full flex-1 flex flex-col border-t border-white/5">
        <div className="px-4 sm:px-6 py-4 border-b border-white/5 bg-[#10121a]/95 backdrop-blur-md space-y-4">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
            <div className="flex items-center gap-2.5 text-indigo-300">
              <SlidersHorizontal size={14} className="opacity-80" />
              <span className="text-[10px] font-black uppercase tracking-[0.18em]">Queue Controls</span>
              <span className="text-[10px] text-zinc-500 font-bold tracking-[0.12em] uppercase">{filteredRequests.length} / {requests.length} visible</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full xl:w-auto xl:min-w-[40rem]">
              <label className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search code, programme, dept..."
                  className="w-full pl-8 pr-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-bold text-zinc-200 placeholder-zinc-600 uppercase tracking-[0.1em] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
                />
              </label>

              <label className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <SlidersHorizontal size={12} />
                </span>
                <select
                  value={programmeFilter}
                  onChange={(e) => setProgrammeFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-bold text-zinc-200 uppercase tracking-[0.1em] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 appearance-none"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="all" style={{ backgroundColor: "#12141c", color: "#e5e7eb" }}>All Programmes</option>
                  {programmeOptions.map((prog) => (
                    <option key={prog} value={prog} style={{ backgroundColor: "#12141c", color: "#e5e7eb" }}>{prog.toUpperCase()}</option>
                  ))}
                </select>
              </label>

              <label className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <ArrowUpDown size={12} />
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-bold text-zinc-200 uppercase tracking-[0.1em] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 appearance-none"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="latest" style={{ backgroundColor: "#12141c", color: "#e5e7eb" }}>Sort: Latest</option>
                  <option value="oldest" style={{ backgroundColor: "#12141c", color: "#e5e7eb" }}>Sort: Oldest</option>
                  <option value="code-asc" style={{ backgroundColor: "#12141c", color: "#e5e7eb" }}>Code: A-Z</option>
                  <option value="code-desc" style={{ backgroundColor: "#12141c", color: "#e5e7eb" }}>Code: Z-A</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex-1 overflow-x-auto overflow-y-auto styled-scrollbar relative">
          <table className="min-w-full table-auto divide-y divide-white/[0.08] bg-transparent shadow-2xl">
            <thead className="text-indigo-300 uppercase sticky top-0 z-20 backdrop-blur-md">
              <tr className="shadow-lg text-center">
                <th className="px-6 py-3 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/98 border-b border-white/10">Paper Code</th>
                <th className="px-6 py-3 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/98 border-b border-white/10">Programme</th>
                <th className="px-6 py-3 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/98 border-b border-white/10">Department</th>
                <th className="px-6 py-3 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/98 border-b border-white/10">Year</th>
                <th className="px-6 py-3 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/98 border-b border-white/10">Month</th>
                <th className="px-6 py-3 text-[10px] font-black tracking-[0.2em] text-center bg-[#12141c]/98 border-b border-white/10">Uploaded By</th>
                <th className="px-6 py-3 text-center text-[10px] font-black tracking-[0.2em] bg-[#12141c]/98 border-b border-white/10">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-white/[0.06]">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="inline-flex flex-col items-center gap-3">
                      <Sparkles size={20} className="text-zinc-600" />
                      <p className="text-zinc-400 text-[11px] font-black uppercase tracking-[0.14em]">
                        No requests match current filters.
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setProgrammeFilter("all");
                          setSortBy("latest");
                        }}
                        className="px-3 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.06] text-[10px] font-black uppercase tracking-[0.12em] transition-colors"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-indigo-500/[0.05] transition-all duration-300 group text-center"
                  >
                    <td className="px-6 py-2 text-sm text-zinc-100 group-hover:text-indigo-300 transition-colors uppercase tracking-widest text-center font-medium whitespace-nowrap">{req.paperCode}</td>
                    <td className="px-6 py-2 text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors text-center font-medium whitespace-nowrap">{req.programme}</td>
                    <td className="px-6 py-2 text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors text-center font-medium whitespace-nowrap">{req.department}</td>
                    <td className="px-6 py-2 text-xs text-zinc-200 group-hover:text-indigo-200 transition-colors text-center font-medium whitespace-nowrap">{req.year}</td>
                    <td className="px-6 py-2 text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors text-center font-medium whitespace-nowrap">{req.month}</td>
                    <td className="px-6 py-2 text-center font-medium">
                      <div className="flex justify-center">
                        <span className="bg-indigo-500/10 text-indigo-300 px-2.5 py-1 rounded-md text-[10px] border border-indigo-500/25 group-hover:bg-indigo-500/18 transition-all font-semibold whitespace-nowrap">
                          {req.uploadedBy?.enrollmentNumber || "SYSTEM"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-2 text-center font-medium">
                      <div className="flex justify-center items-center space-x-3">
                        <a
                          href={req.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View paper"
                          className="p-2.5 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-indigo-500/20 rounded-xl transition-all border border-white/10 hover:border-indigo-400/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10]"
                        >
                          <Eye size={16} />
                        </a>
                        <button
                          onClick={() => openModal(req._id, "approve")}
                          title="Approve paper"
                          className="p-2.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl transition-all border border-emerald-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10]"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => openModal(req._id, "reject")}
                          title="Reject paper"
                          className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10]"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {filteredRequests.length > 0 && filteredRequests.length <= 2 && (
            <div className="mx-4 sm:mx-6 mt-10 mb-8 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2.5 text-zinc-300">
                <Sparkles size={14} className="text-emerald-400" />
                <p className="text-[10px] font-black uppercase tracking-[0.16em]">Queue Nearly Clear</p>
              </div>
              <p className="mt-2 text-[11px] text-zinc-400 leading-relaxed">
                Only a few submissions remain. Review these requests to keep moderation throughput high.
              </p>
            </div>
          )}
        </div>
      </div>


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-xl font-black mb-2 text-center capitalize text-white tracking-tight">
          {actionType === "approve" ? "Approve Submission" : "Reject Submission"}
        </h3>
        <p className="text-center text-[10px] uppercase tracking-[0.14em] font-bold text-zinc-500 mb-5">
          {actionType === "approve"
            ? "Add an optional note for this approval"
            : "Rejection reason is required"}
        </p>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="w-full bg-[#12141c] border border-white/10 text-white rounded-2xl p-4 mb-6 resize-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium placeholder-zinc-600 shadow-inner"
          rows="4"
          placeholder={actionType === "approve" ? "Optional note for approval..." : "Enter reason for rejection..."}
        />
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            disabled={actionLoading}
            className="px-6 py-3 rounded-xl border border-white/5 text-zinc-400 hover:text-white hover:bg-white/5 font-bold transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={actionLoading || (actionType === "reject" && remark.trim() === "")}
            className={`px-8 py-3 rounded-xl font-black text-white transition-all shadow-2xl text-sm ${actionLoading || (actionType === "reject" && remark.trim() === "")
              ? "bg-white/5 text-zinc-600 cursor-not-allowed"
              : actionType === "approve"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-500/20"
                : "bg-gradient-to-r from-red-600 to-rose-600 hover:shadow-red-500/20"
              }`}
          >
            {actionLoading
              ? "Processing..."
              : actionType === "approve"
                ? "Confirm Approval"
                : "Reject Paper"}
          </button>
        </div>
      </Modal>
    </>
  );
}

