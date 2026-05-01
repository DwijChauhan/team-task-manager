import Link from "next/link";
import React from "react";
import CreateButton from "../../components/CreateButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-on-background font-body-base text-body-base min-h-screen antialiased flex">
      {/* SideNavBar */}
      <nav className="fixed inset-y-0 left-0 flex flex-col z-50 h-screen w-60 border-r border-outline-variant bg-surface-container-lowest">
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-DEFAULT bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[20px]">
                task_alt
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-on-surface">TaskFlow</h1>
              <p className="text-[11px] text-on-surface-variant">Productivity Suite</p>
            </div>
          </div>
        </div>
        {/* Main Tabs */}
        <div className="flex-1 py-4 flex flex-col gap-1 px-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-DEFAULT border-l-4 border-on-surface bg-surface-container text-on-surface font-semibold scale-100 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-3 px-3 py-2 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-highest transition-colors duration-200 border-l-4 border-transparent scale-100 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">folder</span>
            <span>Projects</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-highest transition-colors duration-200 border-l-4 border-transparent scale-100 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">assignment</span>
            <span>Tasks</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-highest transition-colors duration-200 border-l-4 border-transparent scale-100 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            <span>Team</span>
          </Link>
        </div>
        {/* Footer Tabs */}
        <div className="pb-4 px-3 flex flex-col gap-1 border-t border-outline-variant pt-4">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-highest transition-colors duration-200 border-l-4 border-transparent scale-100 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Settings</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-DEFAULT text-on-surface-variant hover:bg-surface-container-highest transition-colors duration-200 border-l-4 border-transparent scale-100 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>Help</span>
          </Link>
          <button className="mt-2 flex items-center justify-center w-full py-2 text-on-surface-variant hover:bg-surface-container-highest transition-colors duration-200 rounded-DEFAULT border border-outline-variant">
            <span className="material-symbols-outlined text-[18px] mr-2">
              keyboard_double_arrow_left
            </span>
            <span className="font-body-sm text-body-sm">Collapse Sidebar</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[240px] min-h-screen">
        {/* TopNavBar */}
        <header className="flex items-center justify-between h-16 px-8 sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-md w-full border-b border-outline-variant shadow-sm">
          {/* Search Bar (Left) */}
          <div className="flex-1 flex items-center">
            <div className="relative w-64 focus-within:ring-2 focus-within:ring-outline rounded-DEFAULT">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-body-sm text-on-surface focus:outline-none focus:border-primary placeholder-on-surface-variant transition-colors"
                placeholder="Search..."
                type="text"
              />
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-on-surface transition-opacity p-2">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <Link href="/settings" className="text-on-surface-variant hover:text-on-surface transition-opacity p-2">
              <span className="material-symbols-outlined text-[20px]">settings</span>
            </Link>
            <CreateButton />
            <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant ml-2">
              <img
                alt="User profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS15ClPCyIoC38qxVoG3pwTQ6Bc0iPvpG9LjflH2_gSDrG9XZ5SIrGS41pKAcRSN_HSMSgYKDHHF21whbsz9p5G1MJKzZOtyljJqW_VS19N35OydC6ev7bSiSWrKwTKCN4WQtR9K5LBXNllUC0StzGxqMegamKobY5q0MhWY1YbRj0IkwXrAez5bVEY8LDnty9F9zdvmVp2edbFMsgHJc10j9LOVbTLfs7co-7qwyNn07HlbLl8fSg993wNOAmLJWMTC2oy0rST8U5"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Canvas (Children) */}
        <main className="flex-1 p-container-padding overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
