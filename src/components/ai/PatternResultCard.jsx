import React from "react";
import { Zap, Activity, Clock } from "lucide-react";

export default function PatternResultCard({ questionData, index }) {
  const getBadgeColor = (freq) => {
    if (freq >= 7) return "bg-red-500/10 text-red-400 border-red-500/20";
    if (freq >= 5) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
  };

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-indigo-500/30 shadow-xl transition-all group">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-black text-xs border border-indigo-500/20 group-hover:scale-110 transition-transform">
            {index + 1}
          </div>
          
          <div className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${getBadgeColor(questionData.frequency)}`}>
            Occurred {questionData.frequency} Units
          </div>
        </div>

        <div className="flex items-center gap-2">
           <Clock size={10} className="text-zinc-500" />
           <div className="flex flex-wrap gap-2">
            {questionData.appearedIn?.map((item, i) => (
              <span
                key={i}
                className="bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[9px] font-bold text-zinc-400 uppercase tracking-tighter"
              >
                {item.year} {item.month}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex gap-4">
        <div className="shrink-0 pt-1">
           <div className="w-1 h-full bg-gradient-to-b from-indigo-500/40 to-transparent rounded-full" />
        </div>
        <p className="text-zinc-200 text-sm font-normal leading-relaxed group-hover:text-white transition-colors">
          {questionData.question}
        </p>
      </div>
    </div>
  );
}