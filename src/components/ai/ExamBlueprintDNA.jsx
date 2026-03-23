import React, { useState } from "react";
import { getTopicWeightage } from "../../api/aiService";
import TopicWeightageChart from "./TopicWeightageChart";
import TopicInsightCard from "./TopicInsightCard";
import { Fingerprint, Dna, Zap, TrendingUp, AlertCircle, BarChart3, Download, Loader2, Hash, Sparkles, ChevronRight, LayoutGrid } from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExamBlueprintDNA() {
  const [paperCode, setPaperCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const analyzeBlueprint = async () => {
    if (!paperCode.trim()) {
      setError("Target Paper Code Required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);
      const result = await getTopicWeightage(paperCode);
      setData(result);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to initiate blueprint synthesis.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!data) return;
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(18);
    doc.text("Exam Blueprint DNA Report", 14, y);
    y += 12;
    doc.setFontSize(12);
    doc.text(`Paper Name: ${data.paperName}`, 14, y);
    y += 7;
    doc.text(`Paper Code: ${data.paperCode}`, 14, y);
    y += 7;
    doc.text(`Papers Analyzed: ${data.totalPapersAnalyzed}`, 14, y);
    y += 7;
    doc.text(`Topics Found: ${data.topics.length}`, 14, y);
    y += 12;

    const sortedTopics = [...data.topics].sort((a, b) => parseFloat(b.weightage) - parseFloat(a.weightage));
    const tableData = sortedTopics.map((topic, index) => [index + 1, topic.topicName, topic.weightage, topic.trend, topic.priority, topic.difficulty]);
    autoTable(doc, {
      startY: y,
      head: [["No", "Topic", "Weightage", "Trend", "Priority", "Difficulty"]],
      body: tableData
    });

    y = doc.lastAutoTable.finalY + 15;
    sortedTopics.forEach((topic, index) => {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${topic.topicName}`, 14, y);
      y += 8;
      doc.setFontSize(12);
      doc.text("Key Concepts:", 14, y);
      y += 6;
      doc.setFontSize(10);
      if (topic.keyConcepts && topic.keyConcepts.length) {
        topic.keyConcepts.forEach(concept => {
          if (y > 280) { doc.addPage(); y = 20; }
          doc.text(`• ${concept}`, 18, y);
          y += 5;
        });
      } else {
        doc.text("No key concepts available.", 18, y);
        y += 5;
      }
      y += 4;
      doc.setFontSize(12);
      doc.text("Sample Questions:", 14, y);
      y += 6;
      doc.setFontSize(10);
      if (topic.sampleQuestions && topic.sampleQuestions.length) {
        topic.sampleQuestions.forEach((q, i) => {
          if (y > 280) { doc.addPage(); y = 20; }
          const splitQuestion = doc.splitTextToSize(`${i + 1}. ${q}`, 180);
          doc.text(splitQuestion, 18, y);
          y += splitQuestion.length * 5;
        });
      } else {
        doc.text("No sample questions available.", 18, y);
        y += 5;
      }
      y += 10;
    });
    doc.save(`ExamBlueprint_${data.paperCode}.pdf`);
  };

  return (
    <div className={`h-full flex flex-col animate-fade-in relative ${!data && !loading ? "overflow-hidden" : "p-6"}`}>
      
      {/* Background DNA - Grid & Glow */}
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
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Blueprint DNA Engine</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-1">
            Exam Blueprint DNA <span className="text-indigo-400">🧬</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-md">
            Understand topic weightage, trends and strategic exam priorities.
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
            onClick={analyzeBlueprint}
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
                Analyze Blueprint
              </>
            )}
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            )}
          </button>

          <button
            onClick={downloadReport}
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
                 <Fingerprint size={56} className="text-zinc-800 group-hover:text-indigo-400 transition-colors duration-700" strokeWidth={0.5} />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-white tracking-widest uppercase">Blueprint Dormant</h3>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] max-w-sm mx-auto leading-relaxed">
                Strategic Exam Mapping Logic Offline. Target a paper code to initiate full DNA synthesis.
              </p>
            </div>
            {/* Watermark */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-10 pointer-events-none">
                <div className="h-[1px] w-12 bg-zinc-500"></div>
                <span className="text-[9px] uppercase tracking-[0.6em] text-zinc-500 whitespace-nowrap">Strategic Blueprint DNA v3.2.0</span>
                <div className="h-[1px] w-12 bg-zinc-500"></div>
            </div>
          </div>
        )}

        {/* Intaking Data State */}
        {loading && (
          <div className="h-full flex-1 flex flex-col items-center justify-center text-center -mt-20">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-indigo-500/30 blur-[80px] rounded-full animate-pulse"></div>
              <Dna size={80} className="text-indigo-500/40 animate-pulse" strokeWidth={0.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white tracking-widest uppercase animate-pulse">Mapping DNA...</h3>
              <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.5em]">Deconstructing Historical Topic Matrix</p>
            </div>
          </div>
        )}

        {/* Analysis Results Stage */}
        {data && (
          <div className="space-y-8 pb-10 max-w-7xl mx-auto px-4 lg:px-6 animate-in slide-in-from-bottom-5 duration-700">
            {/* Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Target Paper", value: data.paperName, icon: Sparkles },
                { label: "Paper Code", value: data.paperCode, icon: Hash },
                { label: "Repository Archive", value: `${data.totalPapersAnalyzed} Units`, icon: LayoutGrid },
                { label: "Identified Topics", value: `${data.topics.length} Clusters`, icon: Dna }
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

            {/* Strategic Analysis Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <AIInsights topics={data.topics} />
                <TopicWeightageChart topics={data.topics} />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <StudyOrder topics={data.topics} />
                <PriorityTopics topics={data.topics} />
                <DifficultyDistribution topics={data.topics} />
              </div>
            </div>

            {/* Topic Streams */}
            <div className="space-y-4">
               <div className="flex items-center gap-3 mb-6 px-2">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Topic Deep-Dive Streams</h4>
               </div>
               <div className="grid grid-cols-1 gap-4">
                {data.topics
                  .sort((a, b) => parseFloat(b.weightage) - parseFloat(a.weightage))
                  .map((topic, index) => (
                    <TopicInsightCard key={index} topic={topic} index={index} />
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- AI Insights ---------- */
function AIInsights({ topics }) {
  const mostImportant = [...topics].sort((a, b) => parseFloat(b.weightage) - parseFloat(a.weightage))[0];
  const rising = topics.find(t => t.trend === "Rising");
  const hard = topics.find(t => t.difficulty === "Hard");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <InsightCard title="Critical Topic" value={mostImportant?.topicName} icon={AlertCircle} color="indigo" />
      <InsightCard title="Rising Cluster" value={rising?.topicName} icon={TrendingUp} color="green" />
      <InsightCard title="Peak Difficulty" value={hard?.topicName} icon={Zap} color="red" />
    </div>
  );
}

function InsightCard({ title, value, color, icon: Icon }) {
  const styles = {
    indigo: "border-indigo-500/20 text-indigo-400 bg-indigo-500/5",
    green: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
    red: "border-red-500/20 text-red-400 bg-red-500/5"
  };

  return (
    <div className={`border rounded-2xl p-5 transition-all hover:bg-white/[0.02] ${styles[color]}`}>
      <div className="flex items-center gap-2 mb-3 opacity-60">
        <Icon size={12} />
        <div className="text-[9px] font-black uppercase tracking-[0.2em]">{title}</div>
      </div>
      <div className="text-xs font-black uppercase tracking-widest leading-relaxed line-clamp-2">{value || "DEPLOY ANALYTICS"}</div>
    </div>
  );
}

/* ---------- Study Order ---------- */
function StudyOrder({ topics }) {
  const sorted = [...topics].sort((a, b) => {
    const priorityScore = a.priority - b.priority;
    const trendScore = (b.trend === "Rising" ? 1 : 0) - (a.trend === "Rising" ? 1 : 0);
    const weightScore = parseFloat(b.weightage) - parseFloat(a.weightage);
    return priorityScore || trendScore || weightScore;
  });

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/[0.05] group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
         <LayoutGrid size={40} />
      </div>
      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
        <div className="w-1 h-3 bg-indigo-500 rounded-full" />
        AI Sequence Strategy
      </h3>
      <div className="space-y-3">
        {sorted.map((topic, i) => (
          <div key={i} className="flex items-center gap-4 group/item">
            <span className="text-[10px] font-black text-indigo-400 group-hover/item:scale-125 transition-transform w-4">0{i + 1}</span>
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest group-hover/item:text-white transition-colors truncate">{topic.topicName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Priority Topics ---------- */
function PriorityTopics({ topics }) {
  const mustStudy = topics.filter(t => t.priority === 1);
  if (!mustStudy.length) return null;

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/[0.05]">
      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
        <div className="w-1 h-3 bg-indigo-500 rounded-full" />
        High Priority Matrix
      </h3>
      <div className="flex flex-wrap gap-2">
        {mustStudy.map((t, i) => (
          <div key={i} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Zap size={10} fill="currentColor" />
            {t.topicName}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Difficulty Distribution ---------- */
function DifficultyDistribution({ topics }) {
  const easy = topics.filter(t => t.difficulty === "Easy").length;
  const moderate = topics.filter(t => t.difficulty === "Moderate").length;
  const hard = topics.filter(t => t.difficulty === "Hard").length;

  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/[0.05]">
      <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-5 flex items-center gap-2">
         <div className="w-1 h-3 bg-indigo-500 rounded-full" />
         Complexity Variance
      </h3>
      <div className="space-y-3 px-2">
        <DistItem label="Easy Load" count={easy} color="bg-emerald-500" />
        <DistItem label="Moderate Load" count={moderate} color="bg-amber-500" />
        <DistItem label="Peak Load" count={hard} color="bg-red-500" />
      </div>
    </div>
  );
}

function DistItem({ label, count, color }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{label}</span>
      </div>
      <span className="text-[10px] font-black text-white">{count}</span>
    </div>
  );
}