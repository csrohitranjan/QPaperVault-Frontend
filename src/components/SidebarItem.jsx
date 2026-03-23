// src/components/SidebarItem.jsx
import React from "react";

export default function SidebarItem({ icon, label, active, onClick, open, isBottom, sectionId }) {
  const getDNAColor = (id) => {
    switch (id) {
      case "dashboard": return "orange";
      case "uploads": return "blue";
      case "requests": return "indigo";
      case "patternFinder": return "blue";
      case "blueprint": return "indigo";
      case "mockTest": return "orange";
      case "emergency": return "red";
      case "masterclass": return "emerald";
      case "profile": return "indigo";
      default: return "orange";
    }
  };

  const color = getDNAColor(sectionId);

  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`relative flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300 group w-full text-left overflow-hidden ${
        active
          ? `bg-${color}-500/10 border border-white/5 text-${color}-400 font-bold shadow-[0_0_20px_rgba(var(--${color}-rgb),0.1)]`
          : isBottom
            ? "hover:bg-white/5 text-gray-500 hover:text-white"
            : "hover:bg-white/5 text-zinc-500 hover:text-white"
      }`}
    >
      {/* Active Indicator */}
      {active && (
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-${color}-500 rounded-full animate-pulse`} />
      )}

      <div className={`shrink-0 transition-all duration-500 ${active ? `text-${color}-400 scale-110` : "text-zinc-600 group-hover:text-white group-hover:scale-110"}`}>
        {icon}
      </div>
      {open && (
        <span className={`truncate whitespace-nowrap text-[11px] uppercase tracking-[0.15em] transition-colors ${active ? `text-${color}-400 font-black` : "font-bold"}`}>
          {label}
        </span>
      )}

      {/* Hover Effect */}
      {!active && (
        <div className={`absolute inset-0 bg-gradient-to-r from-${color}-500/0 via-${color}-500/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />
      )}
    </button>
  );
}
