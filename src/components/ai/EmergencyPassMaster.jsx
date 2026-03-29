import React, { useState } from "react";
import EmergencyTopicCard from "./EmergencyTopicCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download, ShieldAlert, AlertTriangle, Zap, Loader2, Hash, Sparkles, LayoutGrid, Play, BookOpen, Image, Target, FileText } from "lucide-react";
import { getRevisionRanking } from "../../api/aiService";

export default function EmergencyPassMaster() {
    const [paperCode, setPaperCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const generatePlan = async () => {
        if (!paperCode.trim()) {
            setError("Target Paper Code Required.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setData(null);
            const result = await getRevisionRanking(paperCode);
            setData(result);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to initiate emergency protocol.");
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        if (!data) return;
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Emergency Pass Master Revision Guide", 14, 20);
        doc.setFontSize(11);
        doc.text(`Paper: ${data.paperName}`, 14, 30);
        doc.text(`Code: ${data.paperCode}`, 14, 36);

        let startY = 45;
        data.urgencyRankings.forEach((topic) => {
            const rows = topic.fastAnswers.map((fa) => [topic.topicName, topic.strategy, fa.question, fa.answer]);
            autoTable(doc, {
                startY,
                head: [["Topic", "Strategy", "Fast Question", "Quick Answer"]],
                body: rows,
                styles: { fontSize: 9 },
                headStyles: { fillColor: [239, 68, 68] }
            });
            startY = doc.lastAutoTable.finalY + 6;

            if (topic.criticalConcepts?.length) {
                autoTable(doc, {
                    startY,
                    head: [["Critical Concepts"]],
                    body: topic.criticalConcepts.map((c) => [c]),
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [100, 100, 100] }
                });
                startY = doc.lastAutoTable.finalY + 4;
            }

            if (topic.criticalDiagrams?.length) {
                autoTable(doc, {
                    startY,
                    head: [["Critical Diagrams"]],
                    body: topic.criticalDiagrams.map((d) => [d]),
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [120, 120, 120] }
                });
                startY = doc.lastAutoTable.finalY + 4;
            }

            if (topic.skipAdvice) {
                autoTable(doc, {
                    startY,
                    head: [["Skip Advice"]],
                    body: [[topic.skipAdvice]],
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [150, 150, 150] }
                });
                startY = doc.lastAutoTable.finalY + 6;
            }
        });

        doc.save(`${data.paperCode}-Emergency-Pass-Master.pdf`);
    };

    return (
        <div className={`flex-1 flex flex-col min-h-0 animate-fade-in relative overflow-hidden ${!data && !loading ? "" : "p-3 sm:p-4 lg:p-6"}`}>
            
            {/* Background DNA - Grid & Glow */}
            {(!data || loading) && (
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-500/[0.03] blur-[150px] rounded-full"></div>
                </div>
            )}

            {/* Persistent Industrial Header */}
            <div className={`relative z-20 max-w-7xl w-full mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 ${!data && !loading ? "px-4 pt-14 pb-6 sm:p-8 lg:p-10" : ""}`}>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-1 bg-red-500 rounded-full" />
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-red-500/70">Emergency Protocol Engine</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-1">
                        Emergency Pass Master
                    </h1>
                    <p className="text-zinc-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-widest max-w-md leading-relaxed">
                        AI-powered mission-critical revision system to maximize pass probability.
                    </p>
                </div>

                <div className="w-full lg:w-auto lg:min-w-[30rem]">
                    <div className="flex w-full flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center lg:justify-end gap-2.5 sm:gap-3">
                        <div className="relative group w-full sm:min-w-[210px] sm:w-auto">
                            <Hash size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="TARGET PAPER CODE"
                                value={paperCode}
                                onChange={(e) => setPaperCode(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-[9px] sm:text-[10px] font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 focus-visible:ring-2 focus-visible:ring-red-400/45 transition-all uppercase tracking-[0.15em] sm:tracking-widest"
                            />
                        </div>

                        <button
                            onClick={generatePlan}
                            disabled={loading}
                            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-black text-white transition-all flex items-center justify-center gap-2.5 uppercase tracking-[0.15em] sm:tracking-widest text-[9px] sm:text-[10px] relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10] ${
                                loading 
                                    ? "bg-zinc-800 cursor-not-allowed opacity-50" 
                                    : "bg-gradient-to-br from-red-600 to-red-800 shadow-[0_10px_30px_rgba(239,68,68,0.3)] hover:scale-[1.02] hover:shadow-red-500/50 active:scale-95"
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={12} className="animate-spin" />
                                    Deploying...
                                </>
                            ) : (
                                <>
                                    <Play size={12} className="group-hover:animate-ping text-white" />
                                    Initiate Protocol
                                </>
                            )}
                            {!loading && (
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            )}
                        </button>

                        <button
                            onClick={downloadPDF}
                            disabled={!data}
                            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 font-black shadow-lg disabled:opacity-45 disabled:text-zinc-500 disabled:border-white/10 transition-all active:scale-95 uppercase tracking-[0.15em] sm:tracking-widest text-[9px] sm:text-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b10]"
                        >
                            <Download size={12} />
                            Download Report
                        </button>
                    </div>

                    {!data && !loading && (
                        <p className="mt-2 px-1 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-500 lg:text-right">
                            Run protocol first to unlock report download.
                        </p>
                    )}
                </div>
            </div>

            {/* Main Protocol Stage */}
            <div className="flex-1 relative z-10 overflow-y-auto styled-scrollbar px-1">
                {error && (
                    <div className="max-w-xl mx-auto mt-4 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-bold uppercase tracking-widest text-center animate-shake">
                        {error}
                    </div>
                )}

                {/* Protocol Dormant State */}
                {!data && !loading && (
                    <div className="h-full flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-10 md:-mt-8">
                        <div className="relative mb-6 sm:mb-8">
                            <div className="absolute inset-0 bg-red-500/20 blur-[60px] rounded-full animate-pulse"></div>
                            <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-[#0f111a] rounded-[2.25rem] sm:rounded-[3rem] flex items-center justify-center border border-white/10 shadow-3xl group transition-transform duration-700 hover:scale-110">
                                <ShieldAlert size={48} className="text-zinc-800 group-hover:text-red-500 transition-colors duration-700 sm:w-14 sm:h-14" strokeWidth={0.5} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-[0.12em] sm:tracking-widest uppercase">Protocol Dormant</h3>
                            <p className="text-zinc-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
                                AI Revision Mapping System Offline. Initiate emergency protocol to deploy strategic pass vectors.
                            </p>
                        </div>
                        {/* Watermark */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-4 opacity-10 pointer-events-none">
                            <div className="h-[1px] w-12 bg-red-500/50"></div>
                            <span className="text-[9px] uppercase tracking-[0.6em] text-red-500/50 whitespace-nowrap">Emergency Command v7.1.0</span>
                            <div className="h-[1px] w-12 bg-red-500/50"></div>
                        </div>
                    </div>
                )}

                {/* Processing State */}
                {loading && (
                    <div className="h-full flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-10">
                        <div className="relative mb-8 sm:mb-10">
                            <div className="absolute inset-0 bg-red-500/30 blur-[80px] rounded-full animate-pulse"></div>
                            <Zap size={64} className="text-red-500/40 animate-pulse sm:w-20 sm:h-20" strokeWidth={0.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg sm:text-xl font-black text-white tracking-[0.12em] sm:tracking-widest uppercase animate-pulse">Arming Strategy...</h3>
                            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.5em]">mapping minimum viable pass requirements</p>
                        </div>
                    </div>
                )}

                {/* Protocol Results Stage */}
                {data && (
                    <div className="space-y-10 pb-10 max-w-7xl mx-auto px-4 lg:px-6 animate-in slide-in-from-bottom-5 duration-700">
                        {/* Summary Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 p-4 sm:p-6 bg-white/[0.03] border border-white/5 rounded-3xl backdrop-blur-md">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                <div className="space-y-1">
                                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Operation Unit</div>
                                    <div className="text-sm font-black text-white uppercase tracking-tight">{data.paperName}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Vector Code</div>
                                    <div className="text-sm font-black text-red-500 uppercase tracking-tight">{data.paperCode}</div>
                                </div>
                            </div>
                            <div className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em]">
                                PASS ENFORCEMENT ACTIVE
                            </div>
                        </div>

                        {/* Analysis Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8 space-y-8">
                                <div className="flex items-center gap-3 px-2">
                                   <div className="w-1.5 h-6 bg-red-500 rounded-full" />
                                   <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Critical Rank Streams</h4>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {data.urgencyRankings.map((topic, index) => (
                                        <EmergencyTopicCard key={index} topic={topic} />
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-8">
                                {/* Mandatory Definitions */}
                                <DataBlock 
                                    title="Mandatory Definitions" 
                                    icon={BookOpen} 
                                    items={data.mandatoryDefinitions} 
                                    color="red"
                                />

                                {/* Mandatory Diagrams */}
                                <DataBlock 
                                    title="Mandatory Diagrams" 
                                    icon={Image} 
                                    items={data.mandatoryDiagrams} 
                                    color="amber"
                                />

                                {/* Pass Guarantee */}
                                <DataBlock 
                                    title="Pass Guarantee" 
                                    icon={Target} 
                                    items={data.passGuaranteeQuestions} 
                                    color="emerald"
                                    numbered
                                />

                                {/* Cheat Sheet */}
                                <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 transition-all hover:bg-white/[0.05] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <FileText size={40} />
                                    </div>
                                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                        <div className="w-1 h-3 bg-red-500 rounded-full" />
                                        Protocol Cheat Sheet
                                    </h3>
                                    <p className="text-[11px] font-normal text-zinc-400 leading-relaxed whitespace-pre-wrap italic">
                                        {data.cheatSheet}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DataBlock({ title, icon: Icon, items, color, numbered = false }) {
    if (!items || !items.length) return null;

    const colors = {
        red: "text-red-400 bg-red-500/10 border-red-500/20",
        amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    };

    return (
        <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 transition-all hover:bg-white/[0.05]">
            <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${colors[color]}`}>
                    <Icon size={14} />
                </div>
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                    {title}
                </h3>
            </div>
            <ul className={`space-y-4 ${numbered ? "list-none" : "list-none"}`}>
                {items.map((item, i) => (
                    <li key={i} className="flex gap-4 group/li">
                        {numbered ? (
                            <span className="text-[10px] font-black text-zinc-600 group-hover/li:text-white transition-colors">0{i+1}</span>
                        ) : (
                            <div className="w-1 h-1 rounded-full bg-zinc-700 mt-2 shrink-0 group-hover/li:bg-red-500 transition-colors" />
                        )}
                        <span className="text-[11px] font-normal text-zinc-400 group-hover/li:text-zinc-200 transition-colors leading-relaxed lowercase-first">
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}