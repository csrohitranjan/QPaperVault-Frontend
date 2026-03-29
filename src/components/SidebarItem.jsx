// src/components/SidebarItem.jsx
import React from "react";

export default function SidebarItem({ icon, label, active, onClick, open, isBottom, sectionId }) {
  const getDNAColor = (id) => {
    switch (id) {
      case "dashboard":
        return {
          activeWrap: "bg-orange-500/12 border-orange-400/25 shadow-[0_12px_32px_-20px_rgba(249,115,22,0.7)]",
          activeText: "text-orange-300",
          activeIcon: "text-orange-300",
          indicator: "bg-orange-400",
          hoverGlow: "from-orange-500/0 via-orange-500/[0.04] to-transparent",
        };
      case "uploads":
      case "patternFinder":
        return {
          activeWrap: "bg-blue-500/12 border-blue-400/25 shadow-[0_12px_32px_-20px_rgba(59,130,246,0.7)]",
          activeText: "text-blue-300",
          activeIcon: "text-blue-300",
          indicator: "bg-blue-400",
          hoverGlow: "from-blue-500/0 via-blue-500/[0.04] to-transparent",
        };
      case "blueprint":
      case "profile":
      case "requests":
        return {
          activeWrap: "bg-indigo-500/12 border-indigo-400/25 shadow-[0_12px_32px_-20px_rgba(99,102,241,0.75)]",
          activeText: "text-indigo-300",
          activeIcon: "text-indigo-300",
          indicator: "bg-indigo-400",
          hoverGlow: "from-indigo-500/0 via-indigo-500/[0.04] to-transparent",
        };
      case "mockTest":
        return {
          activeWrap: "bg-amber-500/12 border-amber-400/25 shadow-[0_12px_32px_-20px_rgba(245,158,11,0.7)]",
          activeText: "text-amber-300",
          activeIcon: "text-amber-300",
          indicator: "bg-amber-400",
          hoverGlow: "from-amber-500/0 via-amber-500/[0.04] to-transparent",
        };
      case "emergency":
        return {
          activeWrap: "bg-red-500/12 border-red-400/25 shadow-[0_12px_32px_-20px_rgba(239,68,68,0.7)]",
          activeText: "text-red-300",
          activeIcon: "text-red-300",
          indicator: "bg-red-400",
          hoverGlow: "from-red-500/0 via-red-500/[0.04] to-transparent",
        };
      case "masterclass":
        return {
          activeWrap: "bg-emerald-500/12 border-emerald-400/25 shadow-[0_12px_32px_-20px_rgba(16,185,129,0.7)]",
          activeText: "text-emerald-300",
          activeIcon: "text-emerald-300",
          indicator: "bg-emerald-400",
          hoverGlow: "from-emerald-500/0 via-emerald-500/[0.04] to-transparent",
        };
      default:
        return {
          activeWrap: "bg-orange-500/12 border-orange-400/25 shadow-[0_12px_32px_-20px_rgba(249,115,22,0.7)]",
          activeText: "text-orange-300",
          activeIcon: "text-orange-300",
          indicator: "bg-orange-400",
          hoverGlow: "from-orange-500/0 via-orange-500/[0.04] to-transparent",
        };
    }
  };

  const dna = getDNAColor(sectionId);

  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`relative flex items-center ${open ? "gap-3.5" : "justify-center"} min-h-[46px] py-2.5 px-3.5 rounded-2xl border transition-all duration-300 group w-full text-left overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#23283a] ${
        active
          ? `${dna.activeWrap} ${dna.activeText}`
          : isBottom
        ? "border-transparent hover:bg-white/[0.04] text-gray-400 hover:text-white"
        : "border-transparent hover:bg-white/[0.04] text-zinc-400 hover:text-white"
      }`}
    >
      {/* Active Indicator */}
      {active && (
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 ${dna.indicator} rounded-full animate-pulse`} />
      )}

      <div className={`shrink-0 transition-all duration-500 ${active ? `${dna.activeIcon} scale-110` : "text-zinc-500 group-hover:text-white group-hover:scale-105"}`}>
        {icon}
      </div>
      {open && (
        <span className={`truncate whitespace-nowrap text-[11px] uppercase tracking-[0.16em] transition-colors ${active ? `${dna.activeText} font-black` : "font-bold"}`}>
          {label}
        </span>
      )}

      {/* Hover Effect */}
      {!active && (
        <div className={`absolute inset-0 bg-gradient-to-r ${dna.hoverGlow} -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />
      )}
    </button>
  );
}
