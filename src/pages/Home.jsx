import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  FileSearch,
  FileStack,
  Fingerprint,
  LockKeyhole,
  LayoutGrid,
  LineChart,
  Radar,
  Shield,
  Sparkles,
  Stars,
  TimerReset,
  UserRound,
  WandSparkles,
} from "lucide-react";

const featureCards = [
  {
    title: "Verified PYQ Vault",
    copy: "Browse approved question papers by paper code, month, year, and program.",
    icon: FileStack,
    accent: "text-primaryOrange",
    border: "hover:border-primaryOrange/40",
  },
  {
    title: "Smart Pattern Finder",
    copy: "Detects repeated and semantically similar questions across years.",
    icon: FileSearch,
    accent: "text-sky-400",
    border: "hover:border-sky-400/40",
  },
  {
    title: "Exam Blueprint DNA",
    copy: "Builds topic weightage, trend, difficulty, and study priority maps.",
    icon: Fingerprint,
    accent: "text-indigo-400",
    border: "hover:border-indigo-400/40",
  },
  {
    title: "Predictive AI Mock Test",
    copy: "Generates a realistic, section-wise mock paper from exam DNA.",
    icon: Cpu,
    accent: "text-orange-400",
    border: "hover:border-orange-400/40",
  },
  {
    title: "Emergency Pass Master",
    copy: "Ranks urgent topics and gives fast-answer strategy when time is low.",
    icon: Radar,
    accent: "text-red-400",
    border: "hover:border-red-400/40",
  },
  {
    title: "AI Masterclass Notes",
    copy: "Delivers high-density notes, model answers, and predicted questions.",
    icon: WandSparkles,
    accent: "text-emerald-400",
    border: "hover:border-emerald-400/40",
  },
];

const proofStats = [
  { label: "Approved Papers", value: "1,200+" },
  { label: "AI Reports", value: "850+" },
  { label: "Subjects", value: "40+" },
  { label: "Student Sessions", value: "15k+" },
];

const howItWorks = [
  {
    title: "Sign up and verify",
    description: "Create your account and get instant access to your dashboard.",
    icon: UserRound,
  },
  {
    title: "Choose subject code",
    description: "Open the PYQ vault and select the exact paper code you want to prepare.",
    icon: FileStack,
  },
  {
    title: "Run AI preparation",
    description: "Get pattern analysis, blueprint, mock tests, ranking, and revision notes.",
    icon: Stars,
  },
];

const premiumReasons = [
  {
    title: "Focus on high-yield prep",
    copy: "Stop random preparation. Focus on recurring topics and likely exam patterns.",
    icon: LineChart,
  },
  {
    title: "Save hours every week",
    copy: "Get ready-made analysis, mock papers, and notes instead of manual sorting.",
    icon: TimerReset,
  },
  {
    title: "Trusted paper quality",
    copy: "Use moderated, approved papers from a reliable academic workflow.",
    icon: Shield,
  },
  {
    title: "Secure by default",
    copy: "Protected access and secure paper delivery for dependable exam prep.",
    icon: LockKeyhole,
  },
];

const pillars = [
  "Browse verified and approved previous year papers in one place",
  "Analyze repeated question trends before your exam",
  "Generate predictive mock tests for realistic practice",
  "Follow urgent topic ranking and revise with focused notes",
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-themeBg min-h-[calc(100vh-4rem)] text-white">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:38px_38px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primaryOrange/14 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/3 -right-24 w-[26rem] h-[26rem] rounded-full bg-sky-500/8 blur-[140px] animate-pulse-slow" />
        <div className="absolute -bottom-20 left-1/3 w-[28rem] h-[28rem] rounded-full bg-emerald-500/8 blur-[160px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(254,82,56,0.12),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.1),transparent_28%),radial-gradient(circle_at_60%_90%,rgba(16,185,129,0.1),transparent_32%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 space-y-10 sm:space-y-12 lg:space-y-16">
        <section className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-center animate-fade-in">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cardBg/70 border border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em] text-zinc-300 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
              <Sparkles size={12} className="text-primaryOrange" />
              Premium PYQ and AI Study Platform
            </div>

            <h1 className="text-[clamp(2rem,9vw,4.2rem)] leading-[0.95] font-bold tracking-tight [font-family:'Playfair_Display',serif] max-w-3xl">
              QPaperVault helps you
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primaryOrange via-orange-200 to-sky-300 mt-2">
                prepare smarter, faster.
              </span>
            </h1>

            <p className="text-zinc-300 max-w-2xl text-sm sm:text-base leading-relaxed font-medium">
              It is a one-stop place for previous year papers and AI-powered exam preparation.
              Find trusted PYQs, discover important patterns, generate mock tests, and revise with targeted notes.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2">
              <Link
                to="/pyqs"
                className="group inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-gradient-to-r from-primaryOrange to-[#ff7a62] px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:-translate-y-0.5 active:scale-95 transition-all shadow-[0_12px_34px_rgba(254,82,56,0.4)]"
              >
                Explore PYQ Vault
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-cardBg/90 border border-white/15 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                Start Building Strategy
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              {[
                ["What is this?", "A verified PYQ vault with AI exam tools."],
                ["Why use this?", "To focus only on high-impact exam preparation."],
                ["What do you get?", "Papers, analysis, mocks, ranking, and notes."],
              ].map((item) => (
                <div
                  key={item[0]}
                  className="rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-4 hover:border-primaryOrange/30 transition-colors"
                >
                  <p className="text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.2em] font-black text-primaryOrange mb-1 break-words">
                    {item[0]}
                  </p>
                  <p className="text-xs font-medium text-zinc-300">{item[1]}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {proofStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                  <p className="text-lg sm:text-xl font-black text-white tracking-tight">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.18em] text-zinc-400 font-bold mt-1 break-words">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] bg-gradient-to-b from-cardBg/85 to-cardBg/55 border border-white/10 p-6 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primaryOrange/60 to-transparent" />
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] sm:tracking-[0.25em] text-zinc-400">
                  Live Preview
                </p>
                <span className="px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-black uppercase tracking-[0.15em]">
                  Active
                </span>
              </div>

              <div className="space-y-3">
                {[
                  ["Pattern Finder", "Repeated question probability mapped", FileSearch, "text-sky-300"],
                  ["Blueprint DNA", "Topic weightage and priority generated", Fingerprint, "text-indigo-300"],
                  ["Mock Test", "Section-wise paper auto-generated", Cpu, "text-orange-300"],
                  ["Pass Master", "Urgency ranking with fast answers", Radar, "text-red-300"],
                  ["Masterclass Notes", "Focused notes and likely questions", WandSparkles, "text-emerald-300"],
                ].map(([title, desc, Icon, tone]) => (
                  <div key={title} className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5 hover:border-white/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-black/20 border border-white/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className={tone} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[11px] font-black tracking-[0.08em] sm:tracking-[0.12em] uppercase text-zinc-100 mb-1 break-words">{title}</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-12 gap-6 animate-fade-in">
          <div className="lg:col-span-8 rounded-[2rem] bg-gradient-to-b from-cardBg/85 to-cardBg/55 border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <Shield size={18} className="text-primaryOrange" />
              <h3 className="text-base sm:text-lg font-black uppercase tracking-[0.1em] sm:tracking-[0.18em]">Why Students Choose QPaperVault</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {premiumReasons.map((item) => (
                <div key={item.title} className="rounded-xl bg-white/[0.03] border border-white/10 p-4 hover:border-white/20 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <item.icon size={14} className="text-primaryOrange mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-black text-primaryOrange mb-2 break-words">
                        {item.title}
                      </p>
                      <p className="text-xs text-zinc-300 leading-relaxed">{item.copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 rounded-[2rem] bg-gradient-to-b from-primaryOrange/16 to-primaryOrange/6 border border-primaryOrange/35 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-primaryOrange/20 blur-2xl" />
            <div className="flex items-center gap-3 mb-5">
              <LayoutGrid size={18} className="text-primaryOrange" />
              <h3 className="text-base sm:text-lg font-black uppercase tracking-[0.1em] sm:tracking-[0.18em]">How To Access</h3>
            </div>
            <div className="space-y-3">
              {howItWorks.map((step, idx) => (
                <div key={step.title} className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-md bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[10px] font-black text-zinc-200">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-[11px] font-black tracking-[0.08em] sm:tracking-[0.12em] uppercase text-zinc-100 mb-1 break-words">{step.title}</p>
                    <p className="text-xs text-zinc-200 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-5 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 rounded-full bg-primaryOrange" />
            <h2 className="text-base sm:text-xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em]">Features Available</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((module) => (
              <div
                key={module.title}
                className={`rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_26px_rgba(0,0,0,0.25)] ${module.border}`}
              >
                <div className="w-10 h-10 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center mb-3">
                  <module.icon size={19} className={`${module.accent}`} />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.08em] sm:tracking-wide mb-2 break-words">{module.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{module.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-12 gap-6 animate-fade-in">
          <div className="lg:col-span-7 rounded-[2rem] bg-gradient-to-b from-cardBg/85 to-cardBg/55 border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <FileStack size={18} className="text-primaryOrange" />
              <h3 className="text-base sm:text-lg font-black uppercase tracking-[0.1em] sm:tracking-[0.18em]">What You Can Do Today</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {pillars.map((point) => (
                <div key={point} className="rounded-xl bg-white/[0.03] border border-white/10 p-4 flex gap-3 hover:border-white/20 transition-colors">
                  <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-zinc-200 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-[2rem] bg-gradient-to-br from-primaryOrange/16 to-primaryOrange/6 border border-primaryOrange/35 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-primaryOrange/20 blur-2xl" />
            <div className="flex items-center gap-3 mb-5">
              <LayoutGrid size={18} className="text-primaryOrange" />
              <h3 className="text-base sm:text-lg font-black uppercase tracking-[0.1em] sm:tracking-[0.18em]">Access QPaperVault</h3>
            </div>
            <p className="text-sm text-zinc-200 leading-relaxed mb-6">
              Create your account, open your dashboard, and start learning from real previous year paper intelligence.
            </p>
            <p className="text-[11px] text-zinc-300 mb-4 uppercase tracking-[0.16em] font-semibold">
              Setup takes under 2 minutes
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl px-5 py-3 bg-primaryOrange text-white text-[11px] font-black uppercase tracking-[0.12em] sm:tracking-[0.2em] hover:brightness-110 hover:-translate-y-0.5 transition"
              >
                Open Dashboard
              </Link>
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl px-5 py-3 bg-white/10 border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.12em] sm:tracking-[0.2em] hover:bg-white/15 hover:-translate-y-0.5 transition"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-8 animate-fade-in">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#0f1119] to-[#151827] border border-white/10 px-5 sm:px-6 py-7 sm:py-8 text-center shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.22em] font-black text-primaryOrange mb-3">
              <BookOpen size={14} />
              QPaperVault Learning Experience
            </div>
            <p className="text-sm text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Everything here is designed to make exam prep easier to understand, easier to plan, and easier to execute.
              Start with PYQs, finish with a clear strategy.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
