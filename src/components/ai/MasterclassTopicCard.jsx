import React from "react";
import { BookOpen, Target, Sparkles, MessageSquare, AlertCircle, Link2, Clock, Globe, ChevronRight } from "lucide-react";

export default function MasterclassTopicCard({ topic }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">

      {/* Header Metadata */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Importance", value: topic.importance, color: "emerald" },
          { label: "Weightage", value: topic.weightage, color: "blue" },
          { label: "Difficulty", value: topic.difficulty, color: "amber" },
          { label: "Study Priority", value: topic.studyPriority, color: "indigo" }
        ].map((meta, i) => (
          <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm group hover:border-${meta.color}-500/30 transition-all`}>
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">{meta.label}</span>
            <span className={`text-[10px] font-black uppercase tracking-tight text-${meta.color}-400`}>{meta.value}</span>
          </div>
        ))}
      </div>

      {/* Main Grid Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Column: Key Concepts & Definitions */}
        <div className="space-y-8">
          {/* Key Concepts */}
          {topic.keyConcepts?.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={12} className="text-emerald-400" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Theoretical Foundations</h3>
              </div>
              <div className="space-y-3">
                {topic.keyConcepts.map((concept, index) => (
                  <div key={index} className="bg-white/[0.02] hover:bg-white/[0.04] p-5 rounded-2xl border border-white/5 transition-all group/it">
                    <p className="text-[13px] font-bold text-white mb-2 uppercase tracking-wide group-hover/it:text-emerald-400 transition-colors">
                      {concept.concept}
                    </p>
                    <p className="text-[12px] font-normal text-zinc-400 leading-relaxed italic border-l border-emerald-500/10 pl-4 py-1">
                      {concept.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Definitions */}
          {topic.definitions?.length > 0 && (
            <section className="space-y-4 bg-white/[0.02] p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={12} className="text-blue-400" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Lexical Archive</h3>
              </div>
              <ul className="space-y-3">
                {topic.definitions.map((def, i) => (
                  <li key={i} className="flex gap-4 group/li">
                    <div className="w-1 h-3 bg-blue-500/20 rounded-full mt-1 group-hover/li:bg-blue-500/50 transition-colors" />
                    <span className="text-[11px] font-normal text-zinc-400 group-hover/li:text-zinc-200 transition-colors leading-relaxed">
                      {def}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column: Model Answers & Tips */}
        <div className="space-y-8">
          {/* Model Answers */}
          {topic.modelAnswers?.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Target size={12} className="text-amber-400" />
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">High-Mark Vectors</h3>
              </div>
              <div className="space-y-4">
                {topic.modelAnswers.map((m, i) => (
                  <div key={i} className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 flex flex-col gap-4 relative overflow-hidden group/ans">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <MessageSquare size={30} />
                    </div>
                    <div>
                      <h4 className="text-[12px] font-black text-white uppercase tracking-tight mb-2 italic">
                        {m.question}
                      </h4>
                      <p className="text-[11.5px] font-normal text-zinc-400 leading-relaxed">
                        {m.answer}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        FREQ: {m.frequency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Exam Tips & Related */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topic.examTips?.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe size={12} className="text-emerald-400" />
                  <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Strategic Edge</h4>
                </div>
                <ul className="space-y-3">
                  {topic.examTips.map((tip, i) => (
                    <li key={i} className="flex gap-2 text-[10px] font-normal text-zinc-500 italic lowercase-first">
                      <ChevronRight size={10} className="shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {topic.relatedTopics?.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Link2 size={12} className="text-zinc-600" />
                  <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Related Vectors</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topic.relatedTopics.map((rt, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white hover:border-white/10 transition-all cursor-default">
                      {rt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Common Mistakes */}
          {topic.commonMistakes?.length > 0 && (
            <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle size={12} className="text-red-500" />
                <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Omission Risks</h4>
              </div>
              <ul className="space-y-2">
                {topic.commonMistakes.map((mistake, i) => (
                  <li key={i} className="text-[10px] font-normal text-red-400/80 leading-relaxed list-disc list-inside lowercase-first">
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
