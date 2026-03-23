import React from "react";
import { Zap, Target, Image, AlertTriangle, ChevronRight, Clock, ShieldCheck } from "lucide-react";

export default function EmergencyTopicCard({ topic }) {
    const getUrgencyBorder = (score) => {
        if (score >= 90) return "border-red-500/30 group-hover:border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.1)]";
        if (score >= 80) return "border-amber-500/30 group-hover:border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.1)]";
        if (score >= 60) return "border-orange-500/30 group-hover:border-orange-500/60 shadow-[0_0_25px_rgba(251,146,60,0.1)]";
        return "border-emerald-500/30 group-hover:border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.1)]";
    };

    const getUrgencyText = (score) => {
        if (score >= 90) return "text-red-400";
        if (score >= 80) return "text-amber-400";
        if (score >= 60) return "text-orange-400";
        return "text-emerald-400";
    };

    return (
        <div className={`bg-white/[0.03] border rounded-[2rem] p-8 space-y-8 transition-all duration-500 group relative overflow-hidden ${getUrgencyBorder(topic.urgencyScore)}`}>
            {/* Background Decorative Element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/[0.01] rounded-full blur-3xl pointer-events-none group-hover:bg-white/[0.03] transition-all duration-700"></div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-6 rounded-full bg-current ${getUrgencyText(topic.urgencyScore)}`} />
                        <h2 className="text-xl font-black text-white uppercase tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                            {topic.topicName}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-5">
                       <div className="flex items-center gap-1.5">
                          <Clock size={10} />
                          <span>E.T.A {topic.estimatedStudyTime}</span>
                       </div>
                       <div className="w-1 h-1 rounded-full bg-zinc-800" />
                       <div className="flex items-center gap-1.5">
                          <ShieldCheck size={10} />
                          <span>STRATEGY: {topic.strategy}</span>
                       </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-sm">
                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Urgency Index</div>
                    <div className={`text-xl font-black ${getUrgencyText(topic.urgencyScore)}`}>{topic.urgencyScore}%</div>
                </div>
            </div>

            {/* Fast Answers Protocol */}
            {topic.fastAnswers?.length > 0 && (
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap size={12} className="text-amber-400" />
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                            Fast-Strike Answers
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {topic.fastAnswers.map((fa, i) => (
                            <div key={i} className="bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl p-5 border border-white/5 transition-all group/item">
                                <div className="flex gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-zinc-500 group-hover/item:text-white transition-colors">
                                        {i + 1}
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[13px] font-bold text-zinc-100 uppercase tracking-wide italic">
                                            {fa.question}
                                        </p>
                                        <p className="text-[12px] font-normal text-zinc-400 leading-relaxed pl-1">
                                            {fa.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Critical Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 border-t border-white/5 pt-8">
                {/* Critical Concepts */}
                {topic.criticalConcepts?.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Target size={12} className="text-red-400" />
                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Mission Concepts</h4>
                        </div>
                        <ul className="space-y-3">
                            {topic.criticalConcepts.map((c, i) => (
                                <li key={i} className="flex gap-3 text-[11px] font-normal text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                    <span className="text-zinc-700">•</span>
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Critical Diagrams */}
                {topic.criticalDiagrams?.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image size={12} className="text-blue-400" />
                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Architectural Visuals</h4>
                        </div>
                        <ul className="space-y-3">
                            {topic.criticalDiagrams.map((d, i) => (
                                <li key={i} className="flex gap-3 text-[11px] font-normal text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                    <span className="text-zinc-700">•</span>
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Skip Advice - Minimalist industrial style */}
            {topic.skipAdvice && (
                <div className="relative z-10 flex items-center gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10 italic">
                    <AlertTriangle size={14} className="text-red-500 shrink-0" />
                    <p className="text-[11px] font-normal text-red-400/80 leading-relaxed">
                        <span className="font-black uppercase tracking-widest text-[9px] mr-2">Omission Protocol:</span>
                        {topic.skipAdvice}
                    </p>
                </div>
            )}
        </div>
    );
}