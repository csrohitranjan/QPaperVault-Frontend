import React, { useState } from "react";
import MockTestSectionCard from "./MockTestSectionCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { generateMockTest } from "../../api/aiService";
import { Download, Cpu, Zap, Loader2, Hash, Sparkles, LayoutGrid, Play, ClipboardCheck, History } from "lucide-react";

export default function PredictiveMockTest() {
    const [paperCode, setPaperCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const generateTest = async () => {
        if (!paperCode.trim()) {
            setError("Target Paper Code Required.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setData(null);
            const result = await generateMockTest(paperCode);
            setData(result);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to initiate AI simulation.");
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        if (!data) return;
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Predictive AI Mock Test", 14, 20);
        doc.setFontSize(11);
        doc.text(`Paper: ${data.paperName}`, 14, 30);
        doc.text(`Code: ${data.paperCode}`, 14, 36);
        doc.text(`Total Marks: ${data.totalMarks}`, 14, 42);

        let startY = 50;
        data.testStructure.forEach((section) => {
            doc.setFontSize(13);
            doc.text(section.sectionName, 14, startY);
            startY += 6;
            doc.setFontSize(10);
            doc.text(section.sectionDescription, 14, startY);
            startY += 6;
            const rows = section.questions.map((q) => [q.questionNumber, q.questionText, q.marks, q.topic]);
            autoTable(doc, {
                startY,
                head: [["#", "Question", "Marks", "Topic"]],
                body: rows,
                styles: { fontSize: 9 },
                headStyles: { fillColor: [254, 82, 56] }
            });
            startY = doc.lastAutoTable.finalY + 10;
        });
        doc.save(`${data.paperCode}-mock-test.pdf`);
    };

    return (
        <div className={`flex-1 flex flex-col min-h-0 animate-fade-in relative overflow-hidden ${!data && !loading ? "" : "p-3 sm:p-4 lg:p-6"}`}>
            
            {/* Background DNA - Grid & Glow */}
            {(!data || loading) && (
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/[0.03] blur-[150px] rounded-full"></div>
                </div>
            )}

            {/* Persistent Industrial Header */}
            <div className={`relative z-20 max-w-7xl w-full mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 ${!data && !loading ? "px-4 pt-14 pb-6 sm:p-8 lg:p-10" : ""}`}>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-1 bg-orange-500 rounded-full" />
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-orange-400">Mock Simulation Engine</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-1">
                        Predictive AI Mock
                    </h1>
                    <p className="text-zinc-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-widest max-w-md leading-relaxed">
                        Generate a full high-fidelity AI predicted mock exam based on historical patterns.
                    </p>
                </div>

                <div className="w-full lg:w-auto lg:min-w-[30rem]">
                    <div className="flex w-full flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center lg:justify-end gap-2.5 sm:gap-3">
                        <div className="relative group w-full sm:min-w-[210px] sm:w-auto">
                            <Hash size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="TARGET PAPER CODE"
                                value={paperCode}
                                onChange={(e) => setPaperCode(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-[9px] sm:text-[10px] font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 focus-visible:ring-2 focus-visible:ring-orange-400/45 transition-all uppercase tracking-[0.15em] sm:tracking-widest"
                            />
                        </div>

                        <button
                            onClick={generateTest}
                            disabled={loading}
                            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-black text-white transition-all flex items-center justify-center gap-2.5 uppercase tracking-[0.15em] sm:tracking-widest text-[9px] sm:text-[10px] relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10] ${
                                loading 
                                    ? "bg-zinc-800 cursor-not-allowed opacity-50" 
                                    : "bg-gradient-to-br from-orange-500 to-orange-700 shadow-[0_10px_30px_rgba(254,82,56,0.3)] hover:scale-[1.02] hover:shadow-orange-500/50 active:scale-95"
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={12} className="animate-spin" />
                                    Simulating...
                                </>
                            ) : (
                                <>
                                    <Play size={12} className="group-hover:animate-ping" />
                                    Initiate Simulation
                                </>
                            )}
                            {!loading && (
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            )}
                        </button>

                        <button
                            onClick={downloadPDF}
                            disabled={!data}
                            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 font-black shadow-lg disabled:opacity-45 disabled:text-zinc-500 disabled:border-white/10 transition-all active:scale-95 uppercase tracking-[0.15em] sm:tracking-widest text-[9px] sm:text-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10]"
                        >
                            <Download size={12} />
                            Download Report
                        </button>
                    </div>

                    {!data && !loading && (
                        <p className="mt-2 px-1 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-500 lg:text-right">
                            Run simulation first to unlock report download.
                        </p>
                    )}
                </div>
            </div>

            {/* Main Simulation Stage */}
            <div className="flex-1 relative z-10 overflow-y-auto styled-scrollbar">
                {error && (
                    <div className="max-w-xl mx-auto mt-4 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-bold uppercase tracking-widest text-center animate-shake">
                        {error}
                    </div>
                )}

                {/* Simulation Dormant State */}
                {!data && !loading && (
                    <div className="h-full flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-10 md:-mt-8">
                        <div className="relative mb-6 sm:mb-8">
                            <div className="absolute inset-0 bg-orange-500/20 blur-[60px] rounded-full animate-pulse"></div>
                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-[#0f111a] rounded-[2.25rem] sm:rounded-[3rem] flex items-center justify-center border border-white/10 shadow-3xl group transition-transform duration-700 hover:scale-110">
                                <Cpu size={48} className="text-zinc-800 group-hover:text-orange-400 transition-colors duration-700 sm:w-14 sm:h-14" strokeWidth={0.5} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-[0.12em] sm:tracking-widest uppercase">Simulation Dormant</h3>
                            <p className="text-zinc-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
                                AI Exam Predictive Models Offline. Target a paper code to initiate full mock simulation.
                            </p>
                        </div>
                        {/* Watermark */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-4 opacity-10 pointer-events-none">
                            <div className="h-[1px] w-12 bg-zinc-500"></div>
                            <span className="text-[9px] uppercase tracking-[0.6em] text-zinc-500 whitespace-nowrap">Predictive Simulation Engine v4.0.1</span>
                            <div className="h-[1px] w-12 bg-zinc-500"></div>
                        </div>
                    </div>
                )}

                {/* Processing State */}
                {loading && (
                    <div className="h-full flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-10">
                        <div className="relative mb-8 sm:mb-10">
                            <div className="absolute inset-0 bg-orange-500/30 blur-[80px] rounded-full animate-pulse"></div>
                            <Zap size={64} className="text-orange-500/40 animate-pulse sm:w-20 sm:h-20" strokeWidth={0.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg sm:text-xl font-black text-white tracking-[0.12em] sm:tracking-widest uppercase animate-pulse">Calculating Odds...</h3>
                            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.5em]">synthesizing historical question probability</p>
                        </div>
                    </div>
                )}

                {/* Simulation Results Stage */}
                {data && (
                    <div className="space-y-8 pb-10 max-w-7xl mx-auto px-4 lg:px-6 animate-in slide-in-from-bottom-5 duration-700">
                        {/* Summary Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { label: "Mock Unit", value: data.paperName, icon: Sparkles },
                                { label: "Design Code", value: data.paperCode, icon: Hash },
                                { label: "Total Valuation", value: `${data.totalMarks} Marks`, icon: ClipboardCheck }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 transition-all hover:bg-white/[0.05] hover:border-white/10 group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <stat.icon size={12} className="text-orange-400" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</span>
                                    </div>
                                    <div className="text-sm font-black text-white tracking-tight truncate group-hover:text-orange-400 transition-colors uppercase">
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sections Stream */}
                        <div className="space-y-6">
                           <div className="flex items-center gap-3 mb-6 px-2">
                              <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Exam Section Architecture</h4>
                           </div>
                           <div className="grid grid-cols-1 gap-6">
                            {data.testStructure.map((section, index) => (
                                <MockTestSectionCard key={index} section={section} />
                            ))}
                           </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}