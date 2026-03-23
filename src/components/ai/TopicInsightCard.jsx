import React, { useState } from "react";
import { ChevronDown, ChevronUp, Zap, Target, BarChart3, Clock, LayoutGrid, CheckCircle2 } from "lucide-react";

export default function TopicInsightCard({ topic, index }) {
  const [open, setOpen] = useState(false);

  const getTrendStyle = (trend) => {
    if (trend === "Rising") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (trend === "Falling") return "bg-red-500/10 text-red-400 border-red-500/20";
    return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
  };

  const getDifficultyStyle = (difficulty) => {
    if (difficulty === "Hard") return "bg-red-500/10 text-red-400 border-red-500/20";
    if (difficulty === "Moderate") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  };

  const getPriorityLabel = (priority) => {
    if (priority === 1) return "Must Study";
    if (priority === 2) return "Important";
    if (priority === 3) return "Medium";
    return "Rare";
  };

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/[0.05] hover:border-indigo-500/30 group">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-black text-xs border border-indigo-500/20 group-hover:scale-110 transition-transform">
            {index + 1}
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
              {topic.topicName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
               <div className="w-6 h-[1px] bg-zinc-700" />
               <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{topic.weightage} WEIGHTAGE</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${getTrendStyle(topic.trend)}`}>
            {topic.trend}
          </div>
          <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${getDifficultyStyle(topic.difficulty)}`}>
            {topic.difficulty}
          </div>
          <div className="px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border border-white/10 bg-white/5 text-zinc-400">
            {getPriorityLabel(topic.priority)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 opacity-40">
           <div className="flex items-center gap-1.5">
              <Target size={10} />
              <span className="text-[9px] font-black uppercase tracking-widest">{topic.occurrenceCount} Units Found</span>
           </div>
        </div>
        
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:text-white transition-colors group/btn"
        >
          {open ? "Retract Details" : "Expand Analysis"}
          {open ? <ChevronUp size={12} className="group-hover/btn:-translate-y-0.5 transition-transform" /> : <ChevronDown size={12} className="group-hover/btn:translate-y-0.5 transition-transform" />}
        </button>
      </div>

      {/* Expanded Content */}
      {open && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-top-2 duration-300">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
              <LayoutGrid size={12} className="text-indigo-400" />
              Core Concepts Matrix
            </h4>
            <div className="space-y-2.5">
              {topic.keyConcepts?.map((concept, i) => (
                <div key={i} className="flex gap-3 group/concept">
                  <div className="w-1 h-3 bg-zinc-800 rounded-full mt-1.5 transition-colors group-hover/concept:bg-indigo-500" />
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed group-hover/concept:text-white transition-colors">{concept}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
              <Clock size={12} className="text-indigo-400" />
              Historical Instances
            </h4>
            <div className="space-y-3">
              {topic.sampleQuestions?.map((q, i) => (
                <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-all group/q">
                   <div className="flex gap-3">
                      <span className="text-[9px] font-black text-indigo-500/40 group-hover/q:text-indigo-400 transition-colors">#{i+1}</span>
                      <p className="text-[11px] font-normal text-zinc-300 leading-relaxed italic">{q}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}