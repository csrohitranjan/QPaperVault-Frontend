// src/components/MyUploadTable.jsx
import React, { useEffect, useState } from "react";
import { getUserUploadedQuestionPapers } from "../api/authService";
import { Eye, Ghost, Loader2 } from "lucide-react";

export default function MyUploadsTable() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center animate-pulse min-h-[400px]">
      <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 mb-4">
        <Loader2 size={32} className="text-indigo-500/40 animate-spin" />
      </div>
      <p className="text-zinc-500 font-black text-[10px] tracking-[0.3em] uppercase">Synchronizing Repository...</p>
    </div>
  );

  if (uploads.length === 0) return (
    <div className="flex-1 h-full min-h-[500px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-1000 relative overflow-hidden bg-[#0a0b10]">
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
          <h3 className="text-2xl font-black text-white tracking-widest uppercase">Repository Dormant</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
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
    <div className="w-full h-full flex-1 overflow-x-auto overflow-y-auto styled-scrollbar border-t border-white/5 relative">
      <table className="min-w-full table-auto divide-y divide-white/5 bg-transparent shadow-2xl">
        <thead className="text-indigo-400 uppercase sticky top-0 z-20 backdrop-blur-md">
          <tr className="shadow-lg text-center">
            <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] bg-[#12141c]/95 border-b border-white/5">
              Code
            </th>
            <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] bg-[#12141c]/95 border-b border-white/5">
              Prog
            </th>
            <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] bg-[#12141c]/95 border-b border-white/5">Year</th>
            <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] bg-[#12141c]/95 border-b border-white/5">Month</th>
            <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] bg-[#12141c]/95 border-b border-white/5">
              Status
            </th>
            <th className="px-6 py-4 text-[10px] font-black tracking-[0.2em] bg-[#12141c]/95 border-b border-white/5">
              Remark
            </th>
            <th className="px-6 py-4 text-center text-[10px] font-black tracking-[0.2em] bg-[#12141c]/95 border-b border-white/5">
              VIEW
            </th>
          </tr>
        </thead>
        <tbody className="bg-transparent divide-y divide-white/[0.03]">
          {uploads.map((upload) => (
            <tr
              key={upload._id}
              className="hover:bg-indigo-500/[0.04] transition-all duration-300 group text-center"
            >
              <td className="px-6 py-2 text-sm text-zinc-200 group-hover:text-indigo-400 transition-colors uppercase tracking-widest text-center font-normal">{upload.paperCode}</td>
              <td className="px-6 py-2 text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors text-center font-normal">{upload.programme}</td>
              <td className="px-6 py-2 text-xs text-zinc-300 group-hover:text-indigo-300 transition-colors text-center font-normal">{upload.year}</td>
              <td className="px-6 py-2 text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors text-center uppercase font-normal">{upload.month}</td>
              <td className="px-6 py-2 text-center font-normal">
                <div className="flex justify-center">
                  <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded border font-normal ${upload.status === "approved"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : upload.status === "reject"
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                    {upload.status}
                  </span>
                </div>
              </td>
 
              <td className="px-6 py-2 text-[11px] text-zinc-500 max-w-[180px] truncate italic text-center font-normal" title={upload.remark}>{upload.remark || "No active remarks"}</td>
              <td className="px-6 py-2 text-center">
                <div className="flex justify-center">
                  <a
                    href={upload.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-indigo-500/20 rounded-xl transition-all text-[10px] border border-white/5 hover:border-indigo-500/30 uppercase tracking-widest font-normal"
                  >
                    <Eye size={12} className="shrink-0" />
                    View
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


  );
}
