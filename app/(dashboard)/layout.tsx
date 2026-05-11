"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { href: "/dashboard", icon: "grid_view", label: "Dashboard" },
    { href: "/projects", icon: "layers", label: "Projects" },
    { href: "/admin", icon: "group", label: "Team" },
    { href: "/activity", icon: "history", label: "Activity" },
  ];

  return (
    <div className="bg-background text-on-background font-body-base text-[14px] min-h-screen antialiased flex overflow-hidden">
      
      {/* COLUMN 1: Slim Sidebar (Global Nav) */}
      <nav className="flex-shrink-0 w-[64px] h-screen bg-surface-container-lowest border-r border-outline-variant flex flex-col items-center py-6 z-50">
        <div className="w-10 h-10 bg-[var(--color-electric-teal)] text-white flex items-center justify-center rounded-lg font-bold text-[20px] mb-8 cursor-pointer shadow-sm focus-ring-teal" tabIndex={0}>
          TF
        </div>

        <div className="flex flex-col gap-4 flex-1 w-full items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all focus-ring-teal ${
                pathname?.startsWith(item.href)
                  ? "bg-primary-container text-[var(--color-electric-teal)]"
                  : "text-on-surface-variant hover:bg-surface hover:text-on-surface"
              }`}
              title={item.label}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            </Link>
          ))}
        </div>

        {/* Live Indicator & Settings */}
        <div className="flex flex-col items-center gap-4 mt-auto w-full">
          <Link
            href="/settings"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface hover:text-on-surface transition-all focus-ring-teal"
            title="Settings"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </Link>
          
          <div className="relative flex items-center justify-center w-10 h-10 cursor-help" title="System Live">
            <span className="absolute w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75"></span>
            <span className="relative w-2.5 h-2.5 bg-green-500 rounded-full"></span>
          </div>
        </div>
      </nav>

      {/* COLUMN 2: Contextual Middle Pane */}
      <aside className="flex-shrink-0 w-[240px] h-screen bg-surface-container-low border-r border-outline-variant flex flex-col z-40 overflow-y-auto">
        <div className="p-4 px-5 border-b border-outline-variant">
          <h2 className="font-h2 text-[16px] font-medium text-on-surface">
            {pathname?.includes('/projects') ? 'Projects' : 'Workspace'}
          </h2>
        </div>
        
        <div className="p-3">
          {/* Pinned Projects Section */}
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2 px-2">Pinned Projects</h3>
            <div className="flex flex-col gap-1">
              <Link href="/projects/frontend-revamp" className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors focus-ring-teal">
                <span className="w-2 h-2 rounded-full bg-[var(--color-electric-teal)]"></span>
                <span className="text-[13px] truncate">Frontend Revamp</span>
              </Link>
              <Link href="/projects/mobile-app" className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface-bright text-on-surface-variant hover:text-on-surface transition-colors focus-ring-teal">
                <span className="w-2 h-2 rounded-full bg-[var(--color-saffron-orange)]"></span>
                <span className="text-[13px] truncate">Mobile App V2</span>
              </Link>
            </div>
          </div>

          {/* Contextual List */}
          <div>
            <h3 className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider mb-2 px-2">Recent</h3>
            <div className="flex flex-col gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-surface-bright text-on-surface-variant cursor-pointer transition-colors focus-ring-teal" tabIndex={0}>
                  <span className="material-symbols-outlined text-[16px]">folder</span>
                  <span className="text-[13px] truncate">Project Alpha {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* COLUMN 3: Main Canvas */}
      <main className="flex-1 flex flex-col h-screen min-w-0 bg-background relative">
        {/* Global Header */}
        <header className="h-[64px] flex-shrink-0 px-6 border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between sticky top-0 z-30">
          
          {/* Command Palette Trigger */}
          <button 
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-3 px-3 py-1.5 bg-surface rounded-md border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-outline transition-all focus-ring-teal w-[280px]"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span className="text-[13px] flex-1 text-left">Search projects, tasks...</span>
            <span className="text-[10px] bg-surface-bright px-1.5 py-0.5 rounded border border-outline-variant font-medium">Ctrl K</span>
          </button>

          {/* Right Header Content */}
          <div className="flex items-center gap-6">
            
            {/* Sprint Progress */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-medium text-on-surface-variant uppercase tracking-wide">Sprint 42</span>
                <span className="text-[12px] font-bold text-[var(--color-electric-teal)]">68%</span>
              </div>
              <div className="relative w-8 h-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-surface stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-[var(--color-electric-teal)] stroke-current" strokeWidth="3" strokeDasharray="68, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
            </div>

            <div className="w-[1px] h-6 bg-outline-variant hidden md:block"></div>

            {/* Team Presence (Avatar Stack) */}
            <div className="flex items-center -space-x-2">
              {[
                { name: 'Rahul', color: 'bg-[#FF9933]' },
                { name: 'Priya', color: 'bg-[#008080]' },
                { name: 'Amit', color: 'bg-[#E53E3E]' }
              ].map((user, i) => (
                <div key={i} className="relative w-8 h-8 rounded-full border-2 border-surface-container-lowest flex items-center justify-center text-white text-[10px] font-bold z-10" style={{ backgroundColor: user.color.replace('bg-[', '').replace(']', '') }}>
                  {user.name.charAt(0)}
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-surface-container-lowest rounded-full"></span>
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface flex items-center justify-center text-on-surface-variant text-[10px] font-bold z-0">
                +4
              </div>
            </div>

          </div>
        </header>

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>

        {/* Support FAB */}
        <button className="fixed bottom-6 right-6 w-12 h-12 bg-[var(--color-electric-teal)] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform focus-ring-teal z-40" title="Help & Support">
          <span className="material-symbols-outlined">help</span>
        </button>
      </main>

      {/* Command Palette Modal */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[10vh]">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-2xl border border-outline-variant overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center px-4 border-b border-outline-variant">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
              <input 
                type="text" 
                autoFocus
                placeholder="Search for projects, tasks, or members..." 
                className="flex-1 h-14 bg-transparent border-none outline-none px-4 text-[15px] text-on-surface placeholder:text-on-surface-variant"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setIsCommandPaletteOpen(false)} className="text-[12px] bg-surface px-2 py-1 rounded text-on-surface-variant border border-outline-variant hover:text-on-surface">ESC</button>
            </div>
            
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {searchQuery ? (
                <div className="p-4 text-center text-on-surface-variant text-[14px]">No results found for "{searchQuery}"</div>
              ) : (
                <>
                  <div className="px-3 py-2 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">Quick Actions</div>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface rounded-lg text-left transition-colors focus-ring-teal group">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-[var(--color-electric-teal)]">add_task</span>
                    <span className="text-[14px] text-on-surface">Create New Task</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface rounded-lg text-left transition-colors focus-ring-teal group">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-[var(--color-saffron-orange)]">chat</span>
                    <span className="text-[14px] text-on-surface">Message Team via WhatsApp</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
