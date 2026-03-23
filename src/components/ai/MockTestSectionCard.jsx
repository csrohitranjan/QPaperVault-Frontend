import React from "react";
import { Terminal, Hash, Sparkles, History, LayoutGrid } from "lucide-react";

export default function MockTestSectionCard({ section }) {
    return (
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl shadow-xl overflow-hidden group hover:border-orange-500/30 transition-all">
            {/* Section Header */}
            <div className="bg-white/5 border-b border-white/5 px-6 py-5">
                <div className="flex items-center gap-3 mb-1">
                    <Terminal size={14} className="text-orange-400" />
                    <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] group-hover:text-orange-400 transition-colors">
                        {section.sectionName}
                    </h2>
                </div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                    {section.sectionDescription}
                </p>
            </div>

            {/* Question List */}
            <div className="divide-y divide-white/5">
                {section.questions.map((q) => (
                    <div key={q.questionNumber} className="px-6 py-6 hover:bg-white/[0.02] transition-colors relative overflow-hidden group/q">
                        {/* Industrial Indicator */}
                        <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-zinc-800 group-hover/q:bg-orange-500 transition-colors" />

                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[11px] font-black text-orange-400 border border-white/5">
                                        Q{q.questionNumber < 10 ? `0${q.questionNumber}` : q.questionNumber}
                                    </div>
                                    <p className="text-[13px] font-normal text-zinc-200 leading-relaxed italic">
                                        {q.questionText}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 pl-11 opacity-40">
                                    <div className="flex items-center gap-1.5">
                                        <History size={10} />
                                        <span className="text-[9px] font-black uppercase tracking-widest">{q.topic}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Sparkles size={10} />
                                        <span className="text-[9px] font-black uppercase tracking-widest">{q.marks} VALUATION UNITS</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-shrink-0 flex items-center gap-3">
                                {q.isRepeated && (
                                    <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(251,146,60,0.1)]">
                                        <History size={10} className="animate-spin-slow" />
                                        Recurrent Pattern Verified
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}