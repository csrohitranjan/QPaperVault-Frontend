// src/pages/StudentDashboard.jsx
import React, { useState, useRef, useEffect } from "react";
import { getUser, logoutUser } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import UploadPaperForm from "../components/UploadPaperForm";
import SidebarItem from "../components/SidebarItem";
import { FileText, LogOut, Menu, User, LayoutDashboard, Brain, Plus, UploadCloud, ChevronRight, X } from "lucide-react";
import MyUploadsTable from "../components/MyUploadsTable";
import UserProfile from "../components/UserProfile";
import SmartPatternFinder from "../components/ai/SmartPatternFinder"
import ExamBlueprintDNA from "../components/ai/ExamBlueprintDNA";
import PredictiveMockTest from "../components/ai/PredictiveMockTest";
import EmergencyPassMaster from "../components/ai/EmergencyPassMaster";
import MasterclassNotes from "../components/ai/MasterclassNotes";

export default function StudentDashboard() {
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section);
    }
  }, [location.state]);

  // Listen for navbar dashboard navigation when already on this page
  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.section) setActiveSection(e.detail.section);
    };
    window.addEventListener("dashboardNavigate", handler);
    return () => window.removeEventListener("dashboardNavigate", handler);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "dashboard": return "Overview";
      case "uploads": return "My Uploads";
      case "profile": return "Account Settings";
      case "patternFinder": return "Smart Pattern Finder";
      case "blueprint": return "Exam Blueprint DNA";
      case "mockTest": return "Predictive Mock Test";
      case "emergency": return "Emergency Pass Master";
      case "masterclass": return "AI Masterclass Notes";
      default: return "";
    }
  };

  return (
    <div className="flex font-sans bg-themeBg text-white h-[calc(100vh-4rem)] overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-[4.5rem] left-3 z-20 md:hidden p-2 bg-cardBg border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-colors"
        aria-label="Open Sidebar"
      >
        <Menu size={18} />
      </button>

      {/* Sidebar */}
      <aside
        className={`flex flex-col ${sidebarOpen ? "w-64" : "w-16"} bg-cardBg border-r border-white/5 transition-all duration-300 z-40 md:z-20 md:sticky md:top-16 md:self-start h-[calc(100vh-4rem)] shadow-2xl fixed top-16 left-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
          {sidebarOpen && (
            <h1 className="text-lg font-black tracking-tight text-white whitespace-nowrap overflow-hidden uppercase opacity-90">
              Student <span className="text-primaryOrange">Panel</span>
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
            className="p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-colors shrink-0"
          >
            <span className="hidden md:block"><Menu size={18} /></span>
            <span className="md:hidden"><X size={18} /></span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5 styled-scrollbar">
          <div className="px-5 mb-3 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            {sidebarOpen && "Navigation"}
          </div>
          <nav className="flex flex-col gap-1 px-3 mb-8">
            <SidebarItem
              icon={<LayoutDashboard size={16} />}
              label="Overview"
              active={activeSection === "dashboard"}
              onClick={() => setActiveSection("dashboard")}
              open={sidebarOpen}
              sectionId="dashboard"
            />
            <SidebarItem
              icon={<FileText size={16} />}
              label="My Uploads"
              active={activeSection === "uploads"}
              onClick={() => setActiveSection("uploads")}
              open={sidebarOpen}
              sectionId="uploads"
            />
          </nav>

          <div className="px-5 mb-3 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            {sidebarOpen && "AI Intelligence"}
          </div>
          <nav className="flex flex-col gap-1 px-3">
            {[
              ["patternFinder", "Pattern Finder"],
              ["blueprint", "Blueprint DNA"],
              ["mockTest", "Predictive Mock"],
              ["emergency", "Pass Master"],
              ["masterclass", "Masterclass"],
            ].map(([id, label]) => (
              <SidebarItem
                key={id}
                icon={<Brain size={16} />}
                label={label}
                active={activeSection === id}
                onClick={() => setActiveSection(id)}
                open={sidebarOpen}
                sectionId={id}
              />
            ))}
          </nav>

        </div>

        <div className="mt-auto py-6 px-6 border-t border-white/5 bg-transparent">
          {sidebarOpen && (
            <div className="flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-700">
               <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.3em]">
                 QPAPERVAULT © 2026
               </span>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-[#0a0b10]">
        {/* Main Area */}
        <main className={`flex-1 ${activeSection === "dashboard" || activeSection === "profile" ? "p-5 lg:p-8" : "p-0"} overflow-hidden relative flex flex-col`}>
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 bg-primaryOrange/[0.03] blur-[150px] rounded-full pointer-events-none -z-10"></div>

          <div className={`${activeSection === "dashboard" || activeSection === "profile" ? "max-w-6xl w-full" : "max-w-full w-full"} mx-auto h-full flex flex-col`}>
            {activeSection === "dashboard" && (
              <section className="animate-fade-in relative h-full flex flex-col">
                {/* Background DNA - Prismatic Grid & Glow */}
                <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    {/* Prismatic Multi-Glow */}
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/[0.03] blur-[120px] rounded-full animate-pulse-slow"></div>
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/[0.03] blur-[120px] rounded-full animate-pulse-slow delay-700"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/[0.03] blur-[120px] rounded-full animate-pulse-slow delay-1000"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/[0.03] blur-[120px] rounded-full animate-pulse-slow delay-1500"></div>
                </div>

                {/* Compact Header */}
                <div className="mb-10 relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-1 bg-gradient-to-r from-blue-500 via-orange-500 to-emerald-500 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Command Console v9.4.1</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black mb-3 text-white tracking-tighter uppercase">
                    Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-orange-400 to-emerald-400">Commander</span>
                  </h1>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.25em] max-w-xl leading-relaxed">
                    deploy advanced AI primitives and curated repositories to dominate your academic sessions.
                  </p>
                </div>

                {/* Industrial Stats Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 relative z-10">
                  {[
                    { label: "Archival Depth", value: "1,240+", color: "blue", icon: FileText },
                    { label: "Synthesis Credits", value: "850", color: "orange", icon: Brain },
                    { label: "Active Vectors", value: "12", color: "emerald", icon: Plus },
                    { label: "Global Standing", value: "#42", color: "red", icon: LayoutDashboard },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl backdrop-blur-md group hover:bg-white/[0.05] transition-all relative overflow-hidden">
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-${stat.color}-500 group-hover:h-full transition-all duration-500`} />
                      <div className="flex items-center gap-3 mb-2">
                        <stat.icon size={11} className={`text-${stat.color}-400/70`} strokeWidth={3} />
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                      </div>
                      <p className="text-xl font-black text-white tracking-tight group-hover:scale-105 transition-transform origin-left">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Command Module Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 h-full max-h-[400px]">
                   <div 
                      onClick={() => setActiveSection("uploads")}
                      className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-500 cursor-pointer group relative overflow-hidden flex flex-col justify-end"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                         <FileText size={100} strokeWidth={0.5} />
                      </div>
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0 border border-blue-500/20 mb-6">
                           <FileText size={20} />
                        </div>
                        <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">Repository Management</h3>
                        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">Access and audit your personal contributions across all academic sectors.</p>
                      </div>
                      <div className="mt-8 flex items-center gap-2 text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                        Enter Module <ChevronRight size={10} />
                      </div>
                   </div>
                   
                   <div 
                      onClick={() => setActiveSection("patternFinder")}
                      className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-500 cursor-pointer group relative overflow-hidden flex flex-col justify-end"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Brain size={100} strokeWidth={0.5} />
                      </div>
                      <div className="relative">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shrink-0 border border-emerald-500/20 mb-6">
                           <Brain size={20} />
                        </div>
                        <h3 className="text-xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">AI Synthesis Units</h3>
                        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">Deploy pattern matching, blueprint synthesis, and mission-critical Pass Master protocols.</p>
                      </div>
                      <div className="mt-8 flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
                        Deploy AI <ChevronRight size={10} />
                      </div>
                   </div>
                </div>

                {/* Console Status Watermark */}
                <div className="mt-auto pt-10 flex items-center justify-center pointer-events-none opacity-10">
                   <div className="flex items-center gap-6">
                      <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-white/50"></div>
                      <span className="text-[9px] font-black uppercase tracking-[0.8em] text-white whitespace-nowrap">Unified Command Interface v9.4.1</span>
                      <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-white/50"></div>
                   </div>
                </div>
              </section>
            )}

            {activeSection === "uploads" && (
              <section className="animate-fade-in relative h-full flex flex-col bg-cardBg/20 border-l border-white/5">
                <MyUploadsTable />

                <button
                  onClick={() => setModalOpen(true)}
                  className="fixed bottom-8 right-8 bg-gradient-to-br from-primaryOrange to-[#ff7b5f] text-white font-black px-5 py-3 rounded-xl border border-white/10 backdrop-blur-md shadow-[0_10px_40px_rgba(254,82,56,0.4)] flex items-center gap-2.5 transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-primaryOrange/50 group z-40"
                >
                  <UploadCloud size={16} className="stroke-[3] group-hover:animate-bounce" />
                  <span className="uppercase tracking-widest text-[9px]">Upload Paper</span>
                </button>
              </section>
            )}

            {activeSection === "profile" && (
              <div className="animate-fade-in">
                <UserProfile user={user} />
              </div>
            )}
            
            {/* AI Sections - Now also Edge-to-Edge with Vertical Offset */}
            <div className={`flex-1 flex flex-col ${activeSection !== 'dashboard' && activeSection !== 'profile' && activeSection !== 'uploads' ? 'bg-cardBg/10 border-l border-white/5' : ''}`}>
              {activeSection === "patternFinder" && <div className="animate-fade-in h-full"><SmartPatternFinder /></div>}
              {activeSection === "blueprint" && <div className="animate-fade-in h-full"><ExamBlueprintDNA /></div>}
              {activeSection === "mockTest" && <div className="animate-fade-in h-full"><PredictiveMockTest /></div>}
              {activeSection === "emergency" && <div className="animate-fade-in h-full"><EmergencyPassMaster /></div>}
              {activeSection === "masterclass" && <div className="animate-fade-in h-full"><MasterclassNotes /></div>}
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <UploadPaperForm onClose={() => setModalOpen(false)} />
      </Modal>

    </div>
  );
}
