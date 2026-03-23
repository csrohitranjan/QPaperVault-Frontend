import React, { useState } from "react";
import PatternResultCard from "./PatternResultCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getRepeatedQuestions } from "../../api/aiService";
import { Brain, Search, Hash, Zap, Loader2, Sparkles, Download, ArrowRight } from "lucide-react";

export default function SmartPatternFinder() {
  const [paperCode, setPaperCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const analyzePaper = async () => {
    if (!paperCode.trim()) {
      setError("Target Paper Code Required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const data = await getRepeatedQuestions(paperCode);
      setData(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to deploy pattern synthesis. Verify connectivity."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!data) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Smart Pattern Finder Report", 14, 20);
    doc.setFontSize(11);
    doc.text(`Paper: ${data.paperName}`, 14, 30);
    doc.text(`Code: ${data.paperCode}`, 14, 36);
    doc.text(`Papers Analyzed: ${data.totalPapersAnalyzed}`, 14, 42);
    doc.text(`Repeated Questions: ${data.repeatedQuestions.length}`, 14, 48);

    const rows = data.repeatedQuestions.map((q, index) => [
      index + 1,
      q.question,
      q.frequency,
      q.appearedIn.map(a => `${a.year} ${a.month}`).join(", ")
    ]);

    autoTable(doc, {
      startY: 55,
      head: [["#", "Question", "Frequency", "Appeared In"]],
      body: rows,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [79, 70, 229] }
    });

    doc.save(`${data.paperCode}-analysis.pdf`);
  };

  return (
    <div className={`flex-1 flex flex-col min-h-0 animate-fade-in relative overflow-hidden ${!data && !loading ? "" : "p-4 lg:p-6"}`}>
      
      {/* Background DNA - Grid & Glow (Only visible when dormant/loading) */}
      {(!data || loading) && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/[0.03] blur-[150px] rounded-full"></div>
        </div>
      )}

      {/* Persistent Industrial Header */}
      <div className={`relative z-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 ${!data && !loading ? "p-10" : ""}`}>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-1 bg-indigo-500 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Analysis Engine</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">
            Smart Pattern Finder <span className="text-indigo-400">⚡</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-md">
            Deploy deep semantic synthesis to uncover repeated exam trends.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group min-w-[200px]">
            <Hash size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="TARGET PAPER CODE"
              value={paperCode}
              onChange={(e) => setPaperCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all uppercase tracking-widest"
            />
          </div>

          <button
            onClick={analyzePaper}
            disabled={loading}
            className={`px-6 py-2.5 rounded-xl font-black text-white transition-all flex items-center justify-center gap-2.5 uppercase tracking-widest text-[10px] relative overflow-hidden group ${
              loading 
                ? "bg-zinc-800 cursor-not-allowed opacity-50" 
                : "bg-gradient-to-br from-indigo-600 to-indigo-800 shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:scale-[1.02] hover:shadow-indigo-500/50 active:scale-95"
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                Intaking...
              </>
            ) : (
              <>
                <Zap size={12} className="group-hover:animate-bounce" />
                Analyze with AI
              </>
            )}
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            )}
          </button>

          <button
            onClick={downloadPDF}
            disabled={!data}
            className="flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 font-black shadow-lg disabled:opacity-20 transition-all active:scale-95 uppercase tracking-widest text-[10px]"
          >
            <Download size={12} />
            Download Report
          </button>
        </div>
      </div>

      {/* Main Analysis Stage */}
      <div className="flex-1 relative z-10 overflow-y-auto styled-scrollbar">
        {/* Error State */}
        {error && (
          <div className="max-w-xl mx-auto mt-4 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-bold uppercase tracking-widest text-center animate-shake">
            {error}
          </div>
        )}

        {/* Synthesis Dormant State */}
        {!data && !loading && (
          <div className="h-full flex-1 flex flex-col items-center justify-center text-center -mt-20">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full animate-pulse"></div>
              <div className="relative w-32 h-32 bg-[#0f111a] rounded-[3rem] flex items-center justify-center border border-white/10 shadow-3xl group transition-transform duration-700 hover:scale-110">
                 <Brain size={56} className="text-zinc-800 group-hover:text-indigo-400 transition-colors duration-700" strokeWidth={0.5} />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-white tracking-widest uppercase">Synthesis Dormant</h3>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
                Visual Pattern Logic Offline. Target a paper code above to initiate deep historical synthesis.
              </p>
            </div>
            {/* Watermark */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-10 pointer-events-none">
                <div className="h-[1px] w-12 bg-zinc-500"></div>
                <span className="text-[9px] uppercase tracking-[0.6em] text-zinc-500 whitespace-nowrap">Pattern Synthesis Engine v2.1.0</span>
                <div className="h-[1px] w-12 bg-zinc-500"></div>
            </div>
          </div>
        )}

        {/* Intaking Data State */}
        {loading && (
          <div className="h-full flex-1 flex flex-col items-center justify-center text-center -mt-20">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-indigo-500/30 blur-[80px] rounded-full animate-pulse"></div>
              <Loader2 size={80} className="text-indigo-500/40 animate-spin" strokeWidth={0.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white tracking-widest uppercase animate-pulse">Deploying Logic...</h3>
              <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.5em]">Cross-Referencing Repository Archives</p>
            </div>
          </div>
        )}

        {/* Analysis Results Stage */}
        {data && (
          <div className="space-y-8 pb-10 max-w-7xl mx-auto px-4 lg:px-6 animate-in slide-in-from-bottom-5 duration-700">
            {/* Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Analyzed Subject", value: data.paperName, icon: Sparkles },
                { label: "Target Code", value: data.paperCode, icon: Hash },
                { label: "Repository Volume", value: `${data.totalPapersAnalyzed} Units`, icon: Search },
                { label: "Pattern Clusters", value: `${data.repeatedQuestions.length} Groups`, icon: Zap }
              ].map((stat, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 transition-all hover:bg-white/[0.05] hover:border-white/10 group">
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon size={12} className="text-indigo-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</span>
                  </div>
                  <div className="text-sm font-black text-white tracking-tight truncate group-hover:text-indigo-400 transition-colors uppercase">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Question Streams */}
            <div className="space-y-4">
               <div className="flex items-center gap-3 mb-6 px-2">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Semantic Pattern Streams</h4>
               </div>

              <div className="grid grid-cols-1 gap-4">
                {data.repeatedQuestions
                  .sort((a, b) => b.frequency - a.frequency)
                  .map((q, index) => (
                    <PatternResultCard
                      key={index}
                      index={index}
                      questionData={q}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}