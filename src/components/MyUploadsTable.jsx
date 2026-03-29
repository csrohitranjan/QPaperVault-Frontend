// src/components/MyUploadTable.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getUserUploadedQuestionPapers } from "../api/authService";
import { Eye, Ghost, Loader2, Search, SlidersHorizontal, ArrowUpDown, AlertTriangle } from "lucide-react";

export default function MyUploadsTable() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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

  const normalizeStatus = (status) => {
    const value = String(status || "").toLowerCase();
    if (value === "reject") return "rejected";
    return value;
  };

  useEffect(() => {
    async function fetchUploads() {
      try {
        setLoading(true);
        const response = await getUserUploadedQuestionPapers();
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

  const filteredUploads = useMemo(() => {
    let result = [...uploads];

    const query = searchTerm.trim().toLowerCase();
    if (query) {
      result = result.filter((upload) => {
        const searchable = [
          upload.paperCode,
          upload.programme,
          upload.year,
          upload.month,
          upload.status,
          upload.remark,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchable.includes(query);
      });
    }

    if (statusFilter !== "all") {
      result = result.filter((upload) => normalizeStatus(upload.status) === statusFilter);
    }

    const getYear = (upload) => Number(upload.year) || 0;
    const getMonthScore = (upload) => {
      const token = String(upload.month || "")
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
  }, [uploads, searchTerm, statusFilter, sortBy]);

  if (loading) {
    return (
      <div className="w-full h-full flex-1 flex flex-col border-t border-white/5">
        <div className="px-4 sm:px-6 py-4 border-b border-white/5 bg-[#10121a]/95 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-indigo-300">
              <Loader2 size={14} className="animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-[0.18em]">Synchronizing Repository</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden px-3 sm:px-6 py-4">
          <div className="rounded-2xl border border-white/5 overflow-hidden">
            <div className="grid grid-cols-7 gap-0 bg-[#12141c]/90 border-b border-white/5">
              {['Code', 'Prog', 'Year', 'Month', 'Status', 'Remark', 'View'].map((head) => (
                <div key={head} className="px-3 py-3 text-[10px] font-black tracking-[0.15em] uppercase text-indigo-300/80 text-center">
                  {head}
                </div>
              ))}
            </div>
            <div className="divide-y divide-white/[0.05]">
              {Array.from({ length: 7 }).map((_, idx) => (
                <div key={idx} className="grid grid-cols-7 gap-0 animate-pulse">
                  {Array.from({ length: 7 }).map((__, cell) => (
                    <div key={cell} className="px-3 py-4 flex justify-center">
                      <div className="h-2.5 w-16 rounded bg-white/[0.08]"></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (uploads.length === 0) return (
    <div className="flex-1 h-full min-h-[60vh] sm:min-h-[500px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-1000 relative overflow-hidden bg-[#0a0b10] px-4">
      {/* Background DNA - Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex-col items-center flex">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full animate-pulse"></div>
          <div className="relative w-24 h-24 bg-[#0f111a] rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-3xl group transition-transform duration-500 hover:scale-110">
             <Ghost size={40} className="text-zinc-700 group-hover:text-indigo-400 transition-colors duration-500" strokeWidth={1} />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-[0.12em] sm:tracking-widest uppercase">Repository Dormant</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
            The contribution stream is currently empty. Ignite the vault by uploading your first industrial document.
          </p>
        </div>
      </div>

      {/* Repository Bottom Watermark */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-20 group pointer-events-none">
        <div className="h-[1px] w-8 bg-zinc-500"></div>
        <span className="text-[8px] uppercase tracking-[0.5em] text-zinc-500 whitespace-nowrap">Repository Index v1.0.4</span>
        <div className="h-[1px] w-8 bg-zinc-500"></div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex-1 flex flex-col border-t border-white/5">
      <div className="px-3 sm:px-5 lg:px-6 py-3 sm:py-4 border-b border-white/5 bg-[#10121a]/95 backdrop-blur-md">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
          <div className="flex items-center gap-2.5 text-indigo-300">
            <SlidersHorizontal size={14} className="opacity-80" />
            <span className="text-[10px] font-black uppercase tracking-[0.18em]">Repository Controls</span>
            <span className="text-[10px] text-zinc-500 font-bold tracking-[0.12em] uppercase">{filteredUploads.length} / {uploads.length} visible</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full xl:w-auto xl:min-w-[48rem]">
            <label className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search code, prog, month..."
                className="w-full pl-8 pr-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-bold text-zinc-200 placeholder-zinc-600 uppercase tracking-[0.1em] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
              />
            </label>

            <label className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <SlidersHorizontal size={12} />
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-bold text-zinc-200 uppercase tracking-[0.1em] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 appearance-none"
                style={{ colorScheme: "dark" }}
              >
                <option value="all" style={{ backgroundColor: "#12141c", color: "#e5e7eb" }}>All Status</option>
                <option value="approved" style={{ backgroundColor: "#12141c", color: "#e5e7eb" }}>Approved</option>
                <option value="rejected" style={{ backgroundColor: "#12141c", color: "#e5e7eb" }}>Rejected</option>
                <option value="pending" style={{ backgroundColor: "#12141c", color: "#e5e7eb" }}>Pending</option>
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

        {error && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500/25 bg-red-500/10 text-red-300 text-[10px] font-black uppercase tracking-[0.12em]">
            <AlertTriangle size={12} />
            {error}
          </div>
        )}
      </div>

      <div className="w-full h-full flex-1 overflow-x-auto overflow-y-auto styled-scrollbar relative pb-24 sm:pb-28">
        <table className="min-w-full table-auto divide-y divide-white/[0.08] bg-transparent shadow-2xl">
          <thead className="text-indigo-300 uppercase sticky top-0 z-20 backdrop-blur-md">
            <tr className="shadow-lg text-center">
              <th className="px-3 sm:px-6 py-3 text-[10px] font-black tracking-[0.12em] sm:tracking-[0.2em] bg-[#12141c]/98 border-b border-white/10 whitespace-nowrap">Code</th>
              <th className="px-3 sm:px-6 py-3 text-[10px] font-black tracking-[0.12em] sm:tracking-[0.2em] bg-[#12141c]/98 border-b border-white/10 whitespace-nowrap">Prog</th>
              <th className="px-3 sm:px-6 py-3 text-[10px] font-black tracking-[0.12em] sm:tracking-[0.2em] bg-[#12141c]/98 border-b border-white/10 whitespace-nowrap">Year</th>
              <th className="px-3 sm:px-6 py-3 text-[10px] font-black tracking-[0.12em] sm:tracking-[0.2em] bg-[#12141c]/98 border-b border-white/10 whitespace-nowrap">Month</th>
              <th className="px-3 sm:px-6 py-3 text-[10px] font-black tracking-[0.12em] sm:tracking-[0.2em] bg-[#12141c]/98 border-b border-white/10 whitespace-nowrap">Status</th>
              <th className="px-3 sm:px-6 py-3 text-[10px] font-black tracking-[0.12em] sm:tracking-[0.2em] bg-[#12141c]/98 border-b border-white/10 whitespace-nowrap">Remark</th>
              <th className="px-3 sm:px-6 py-3 text-center text-[10px] font-black tracking-[0.12em] sm:tracking-[0.2em] bg-[#12141c]/98 border-b border-white/10 whitespace-nowrap">View</th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-white/[0.06]">
            {filteredUploads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center">
                  <div className="inline-flex flex-col items-center gap-3">
                    <Ghost size={26} className="text-zinc-600" />
                    <p className="text-zinc-400 text-[11px] font-black uppercase tracking-[0.14em]">
                      No uploads match current filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
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
              filteredUploads.map((upload) => {
                const status = normalizeStatus(upload.status);
                return (
                  <tr
                    key={upload._id}
                    className="hover:bg-indigo-500/[0.05] transition-all duration-300 group text-center"
                  >
                    <td className="px-3 sm:px-6 py-2 text-xs sm:text-sm text-zinc-100 group-hover:text-indigo-300 transition-colors uppercase tracking-[0.08em] sm:tracking-widest text-center font-medium whitespace-nowrap">{upload.paperCode}</td>
                    <td className="px-3 sm:px-6 py-2 text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors text-center font-medium whitespace-nowrap">{upload.programme}</td>
                    <td className="px-3 sm:px-6 py-2 text-xs text-zinc-200 group-hover:text-indigo-200 transition-colors text-center font-medium whitespace-nowrap">{upload.year}</td>
                    <td className="px-3 sm:px-6 py-2 text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors text-center uppercase font-medium whitespace-nowrap">{upload.month}</td>
                    <td className="px-3 sm:px-6 py-2 text-center font-medium whitespace-nowrap">
                      <div className="flex justify-center">
                        <span className={`px-2 py-1 text-[10px] uppercase tracking-[0.08em] sm:tracking-wider rounded border font-semibold ${status === "approved"
                          ? "bg-emerald-500/12 text-emerald-300 border-emerald-500/30"
                          : status === "rejected"
                            ? "bg-red-500/12 text-red-300 border-red-500/30"
                            : "bg-amber-500/12 text-amber-300 border-amber-500/30"
                          }`}>
                          {status}
                        </span>
                      </div>
                    </td>

                    <td className="px-3 sm:px-6 py-2 text-[11px] text-zinc-400 group-hover:text-zinc-200 max-w-[150px] sm:max-w-[180px] truncate italic text-center font-medium" title={upload.remark}>{upload.remark || "No active remarks"}</td>
                    <td className="px-3 sm:px-6 py-2 text-center whitespace-nowrap">
                      <div className="flex justify-center">
                        <a
                          href={upload.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-indigo-500/22 rounded-xl transition-all text-[10px] border border-white/10 hover:border-indigo-400/40 uppercase tracking-[0.08em] sm:tracking-widest font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10]"
                        >
                          <Eye size={12} className="shrink-0" />
                          View
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
