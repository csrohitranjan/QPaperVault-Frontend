import React, { useState } from "react";
import { uploadQuestionPaper } from "../api/authService";
import { toast } from "react-toastify";
import { UploadCloud, FileText, Hash, Building2, GraduationCap, Calendar, Clock, Loader2 } from "lucide-react";

export default function UploadPaperForm({ onClose }) {
  const [formData, setFormData] = useState({
    paperName: "",
    paperCode: "",
    department: "",
    programme: "",
    month: "",
    year: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a PDF file.");
      return;
    }
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("paperName", formData.paperName);
      data.append("paperCode", formData.paperCode.replace(/\s+/g, "").toUpperCase());
      data.append("department", formData.department.replace(/\s+/g, "").toUpperCase());
      data.append("programme", formData.programme.replace(/\s+/g, "").toUpperCase());
      data.append("month", formData.month);
      data.append("year", formData.year);
      data.append("questionPaper", file);

      const response = await uploadQuestionPaper(data);

      if (response.status === 200) {
        toast.success(response.data.message);
        setFormData({
          paperName: "",
          paperCode: "",
          department: "",
          programme: "",
          month: "",
          year: "",
        });
        setFile(null);

        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      const message = err.response?.data?.message || "Upload failed. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-black text-white uppercase tracking-tighter">
          Upload Question Paper
        </h2>
        <p className="text-zinc-500 text-[9px] uppercase tracking-widest font-normal">
          Industrial Repository Intake System
        </p>
      </div>

      <div className="space-y-3">
        {/* Paper Name */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 block ml-1 font-bold">Paper Name</label>
          <div className="relative group">
            <FileText size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              name="paperName"
              value={formData.paperName}
              onChange={handleChange}
              placeholder="e.g. Advanced Algorithms"
              required
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all font-normal"
            />
          </div>
        </div>

        {/* Paper Code & Department */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 block ml-1 font-bold">Paper Code</label>
            <div className="relative group">
              <Hash size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                name="paperCode"
                value={formData.paperCode}
                onChange={handleChange}
                placeholder="CSE101"
                required
                className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all font-normal"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 block ml-1 font-bold">Department</label>
            <div className="relative group">
              <Building2 size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="SET/AIIT"
                required
                className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all font-normal"
              />
            </div>
          </div>
        </div>

        {/* Programme */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 block ml-1 font-bold">Programme</label>
          <div className="relative group">
            <GraduationCap size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              name="programme"
              value={formData.programme}
              onChange={handleChange}
              placeholder="B.Tech / M.Tech / MCA"
              required
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all font-normal"
            />
          </div>
        </div>

        {/* Month & Year */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 block ml-1 font-bold">Session Month</label>
            <div className="relative group">
              <Calendar size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                name="month"
                value={formData.month}
                onChange={handleChange}
                placeholder="APR-MAY"
                required
                className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all font-normal"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 block ml-1 font-bold">Academic Year</label>
            <div className="relative group">
              <Clock size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                name="year"
                type="number"
                min="1900"
                max="2100"
                value={formData.year}
                onChange={handleChange}
                placeholder="2025"
                required
                className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all font-normal"
              />
            </div>
          </div>
        </div>

        {/* Custom File Upload */}
        <div className="space-y-1">
           <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 block ml-1 font-bold">Document Intake (PDF)</label>
           <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
                id="file-upload"
                className="hidden"
              />
              <label 
                htmlFor="file-upload"
                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl p-4 bg-white/[0.02] hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all cursor-pointer group"
              >
                <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:bg-indigo-500/20 transition-all mb-2 text-center">
                  <UploadCloud size={18} />
                </div>
                <p className="text-[10px] text-zinc-400 group-hover:text-white transition-colors">
                  {file ? file.name : "Select or drag PDF"}
                </p>
              </label>
           </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-black transition-all flex items-center justify-center gap-2.5 uppercase tracking-widest text-[10px] relative overflow-hidden group ${
            loading 
              ? "bg-zinc-800 cursor-not-allowed" 
              : "bg-gradient-to-br from-primaryOrange to-[#ff7b5f] shadow-[0_10px_30px_rgba(254,82,56,0.3)] hover:scale-[1.02] hover:shadow-primaryOrange/50 active:scale-95"
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Intaking...
            </>
          ) : (
            <>
              <UploadCloud size={14} className="group-hover:animate-bounce" />
              Upload Paper
            </>
          )}
          
          {/* Subtle reflection effect */}
          {!loading && (
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          )}
        </button>
      </div>
    </form>
  );
}
