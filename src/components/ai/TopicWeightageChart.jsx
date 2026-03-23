import React from "react";
import { BarChart3 } from "lucide-react";

export default function TopicWeightageChart({ topics }) {
  const sortedTopics = [...topics].sort(
    (a, b) => parseFloat(b.weightage) - parseFloat(a.weightage)
  );

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/[0.05]">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 size={16} className="text-indigo-400" />
        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
          Weightage Distribution Matrix
        </h3>
      </div>

      <div className="space-y-6">
        {sortedTopics.map((topic, index) => {
          const percentage = parseFloat(topic.weightage);

          return (
            <div key={index} className="group">
              {/* Topic name + percentage */}
              <div className="flex justify-between items-end mb-2">
                <span className="text-[11px] font-bold text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest truncate max-w-[80%]">
                  {topic.topicName}
                </span>

                <span className="text-[10px] font-black text-indigo-400 tracking-tighter">
                  {topic.weightage}
                </span>
              </div>

              {/* Industrial Progress bar */}
              <div className="w-full bg-white/5 rounded-full h-[3px] overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}