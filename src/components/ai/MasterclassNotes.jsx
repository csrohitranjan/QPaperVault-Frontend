import React, { useState } from "react";
import { Download, BookOpen, Sparkles, Zap, Loader2, Hash, LayoutGrid, Play, ChevronDown, ChevronUp, GraduationCap, Target, History } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import MasterclassTopicCard from "./MasterclassTopicCard";
import { getStudyNotes } from "../../api/aiService";

export default function MasterclassNotes() {
    const [paperCode, setPaperCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [openTopic, setOpenTopic] = useState(null);

    const generateNotes = async () => {
        if (!paperCode.trim()) {
            setError("Target Paper Code Required.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setData(null);
            const result = await getStudyNotes(paperCode);
            setData(result);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to generate masterclass notes.");
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        if (!data) return;
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("AI Masterclass Study Notes", 14, 20);
        doc.setFontSize(11);
        doc.text(`Paper: ${data.paperName}`, 14, 30);
        doc.text(`Code: ${data.paperCode}`, 14, 36);

        let startY = 46;
        data.studyNotes.forEach((topic) => {
            doc.setFontSize(14);
            doc.text(topic.topicName, 14, startY);
            startY += 6;
            if (topic.keyConcepts?.length) {
                autoTable(doc, {
                    startY,
                    head: [["Concept", "Explanation"]],
                    body: topic.keyConcepts.map(c => [c.concept, c.explanation]),
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [16, 185, 129] }
                });
                startY = doc.lastAutoTable.finalY + 4;
            }
        });
        doc.save(`${data.paperCode}-Masterclass-Notes.pdf`);
    };

    const toggleTopic = (index) => {
        setOpenTopic(openTopic === index ? null : index);
    };

    return (
        <div className={`h-full flex flex-col animate-fade-in relative ${!data && !loading ? "overflow-hidden" : "p-6"}`}>
            
            {/* Background DNA - Grid & Glow */}
            {(!data || loading) && (
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/[0.03] blur-[150px] rounded-full"></div>
                </div>
            )}

            {/* Persistent Industrial Header */}
            <div className={`relative z-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 ${!data && !loading ? "p-10" : ""}`}>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-1 bg-emerald-500 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/70">Knowledge Synthesis Archive</span>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">
                        AI Masterclass <span className="text-emerald-500">📚</span>
                    </h1>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-md">
                        Deep synthesis of historical paper vectors into high-fidelity study modules.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative group min-w-[200px]">
                        <Hash size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="TARGET PAPER CODE"
                            value={paperCode}
                            onChange={(e) => setPaperCode(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all uppercase tracking-widest"
                        />
                    </div>

                    <button
                        onClick={generateNotes}
                        disabled={loading}
                        className={`px-6 py-2.5 rounded-xl font-black text-white transition-all flex items-center justify-center gap-2.5 uppercase tracking-widest text-[10px] relative overflow-hidden group ${
                            loading 
                                ? "bg-zinc-800 cursor-not-allowed opacity-50" 
                                : "bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-[1.02] hover:shadow-emerald-500/50 active:scale-95"
                        }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={12} className="animate-spin" />
                                Synthesizing...
                            </>
                        ) : (
                            <>
                                <Play size={12} className="group-hover:animate-ping text-white" />
                                Initiate Synthesis
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

            {/* Main Synthesis Stage */}
            <div className="flex-1 relative z-10 overflow-y-auto styled-scrollbar px-1">
                {error && (
                    <div className="max-w-xl mx-auto mt-4 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-bold uppercase tracking-widest text-center animate-shake">
                        {error}
                    </div>
                )}

                {/* Scholarship Dormant State */}
                {!data && !loading && (
                    <div className="h-full flex-1 flex flex-col items-center justify-center text-center -mt-20">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full animate-pulse"></div>
                            <div className="relative w-32 h-32 bg-[#0f111a] rounded-[3rem] flex items-center justify-center border border-white/10 shadow-3xl group transition-transform duration-700 hover:scale-110">
                                <BookOpen size={56} className="text-zinc-800 group-hover:text-emerald-500 transition-colors duration-700" strokeWidth={0.5} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-3xl font-black text-white tracking-widest uppercase text-shadow-glow">Scholarship Dormant</h3>
                            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
                                AI Knowledge Synthesis Units Offline. Target an archive code to deploy full masterclass modules.
                            </p>
                        </div>
                        {/* Watermark */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-10 pointer-events-none">
                            <div className="h-[1px] w-12 bg-emerald-500/50"></div>
                            <span className="text-[9px] uppercase tracking-[0.6em] text-emerald-500/50 whitespace-nowrap">Scholarly Synthesis v9.0.2</span>
                            <div className="h-[1px] w-12 bg-emerald-500/50"></div>
                        </div>
                    </div>
                )}

                {/* Processing State */}
                {loading && (
                    <div className="h-full flex-1 flex flex-col items-center justify-center text-center -mt-20">
                        <div className="relative mb-10">
                            <div className="absolute inset-0 bg-emerald-500/30 blur-[80px] rounded-full animate-pulse"></div>
                            <Zap size={80} className="text-emerald-500/40 animate-pulse" strokeWidth={0.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-white tracking-widest uppercase animate-pulse">Cataloging Knowledge...</h3>
                            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.5em]">distilling complex theorems into fast-review vectors</p>
                        </div>
                    </div>
                )}

                {/* Synthesis Results Stage */}
                {data && (
                    <div className="space-y-10 pb-10 max-w-7xl mx-auto px-4 lg:px-6 animate-in slide-in-from-bottom-5 duration-700">
                        {/* Summary Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Research Unit", value: data.paperName, icon: GraduationCap },
                                { label: "Catalog Code", value: data.paperCode, icon: Hash },
                                { label: "Knowledge Nodes", value: data.totalTopics, icon: LayoutGrid },
                                { label: "Archival Depth", value: `${data.totalPapersAnalyzed} Papers`, icon: History }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 transition-all hover:bg-white/[0.05] hover:border-white/10 group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <stat.icon size={12} className="text-emerald-400" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</span>
                                    </div>
                                    <div className="text-sm font-black text-white tracking-tight truncate group-hover:text-emerald-400 transition-colors uppercase">
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Synthesis Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8 space-y-6">
                                <div className="flex items-center gap-3 px-2">
                                   <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                   <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Knowledge Stream Accordion</h4>
                                </div>
                                <div className="space-y-4">
                                    {data.studyNotes.map((topic, index) => (
                                        <div key={index} className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden transition-all hover:border-emerald-500/30">
                                            <button
                                                onClick={() => toggleTopic(index)}
                                                className={`w-full flex justify-between items-center px-8 py-6 transition-all ${openTopic === index ? "bg-emerald-500/5" : "hover:bg-white/[0.02]"}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border font-black text-[10px] ${openTopic === index ? "bg-emerald-500 text-white border-emerald-500" : "bg-white/5 text-zinc-500 border-white/5"}`}>
                                                        {index + 1}
                                                    </div>
                                                    <span className={`text-sm font-black uppercase tracking-widest ${openTopic === index ? "text-emerald-400" : "text-white group-hover:text-emerald-400"}`}>
                                                        {topic.topicName}
                                                    </span>
                                                </div>
                                                <div className={`transition-transform duration-500 ${openTopic === index ? "rotate-180" : ""}`}>
                                                    <ChevronDown size={18} className={openTopic === index ? "text-emerald-400" : "text-zinc-600"} />
                                                </div>
                                            </button>
                                            {openTopic === index && (
                                                <div className="p-8 border-t border-white/5 animate-in slide-in-from-top-2 duration-500">
                                                    <MasterclassTopicCard topic={topic} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-8">
                                {/* Predicted Questions */}
                                {data.predictedQuestions && (
                                    <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 transition-all hover:bg-white/[0.05] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Target size={40} />
                                        </div>
                                        <h2 className="text-[11px] font-black text-white uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                                            <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                                            Predicted Analysis
                                        </h2>
                                        <ul className="space-y-6">
                                            {data.predictedQuestions.map((q, i) => (
                                                <li key={i} className="group/q space-y-2">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover/q:scale-150 transition-transform" />
                                                        <span className="text-[12px] font-bold text-zinc-200 leading-relaxed italic group-hover/q:text-white transition-colors">
                                                            {q.question}
                                                        </span>
                                                    </div>
                                                    <div className="pl-4 flex items-center gap-2">
                                                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                                            {q.confidence}
                                                        </span>
                                                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest truncate max-w-[150px]">
                                                            {q.reasoning}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Quick Revision Summary */}
                                {data.quickRevisionSummary && (
                                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700"></div>
                                        <h2 className="text-[11px] font-black text-emerald-500 mb-6 uppercase tracking-[0.4em] flex items-center gap-3">
                                            <div className="w-1.5 h-4 bg-emerald-500 rounded-full animate-pulse" />
                                            Mission Debrief
                                        </h2>
                                        <p className="text-[12px] text-zinc-300 leading-relaxed whitespace-pre-line font-normal italic">
                                            {data.quickRevisionSummary}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}