import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value || "Admin";

  return (
    <div className="bg-background text-on-background font-body-base text-body-base min-h-screen antialiased flex">
      {/* SideNavBar */}
      <nav className="fixed inset-y-0 left-0 flex flex-col z-50 h-screen w-[260px] border-r border-outline-variant bg-surface-container-lowest">
        
        {/* Logo Block Header */}
        <div className="p-6 pb-8">
          <div className="flex flex-col">
            <span className="font-h1 text-[24px] font-bold text-primary mb-1">Sahara</span>
            <span className="text-[12px] text-on-surface-variant">Premium Management</span>
          </div>
        </div>

        {/* Main Links */}
        <div className="py-2 flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-4 px-6 py-3 border-l-2 border-primary bg-primary-container text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">grid_view</span>
            <span className="text-[14px] font-medium tracking-wide">DASHBOARD</span>
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-4 px-6 py-3 border-l-2 border-transparent hover:bg-surface text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">layers</span>
            <span className="text-[14px] font-medium tracking-wide">PROJECTS</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-4 px-6 py-3 border-l-2 border-transparent hover:bg-surface text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            <span className="text-[14px] font-medium tracking-wide">TEAM</span>
          </Link>
          <Link
            href="/activity"
            className="flex items-center gap-4 px-6 py-3 border-l-2 border-transparent hover:bg-surface text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">history</span>
            <span className="text-[14px] font-medium tracking-wide">ACTIVITY</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-4 px-6 py-3 border-l-2 border-transparent hover:bg-surface text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="text-[14px] font-medium tracking-wide">SETTINGS</span>
          </Link>
        </div>

        <div className="mt-8 py-2 flex flex-col gap-1">
          <button className="flex items-center gap-4 px-6 py-3 border-l-2 border-transparent hover:bg-surface text-on-surface-variant hover:text-on-surface transition-colors w-full text-left">
            <span className="material-symbols-outlined text-[20px]">light_mode</span>
            <span className="text-[14px] font-medium tracking-wide">LIGHT MODE</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 mt-auto">
          <button className="flex items-center gap-3 w-full text-left text-on-surface-variant hover:text-on-surface transition-colors">
            <i className="ti-logout material-symbols-outlined text-[20px]">logout</i>
            <span className="text-[14px] font-medium tracking-wide">LOG OUT</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[260px] min-h-screen">
        {/* TopNavBar */}
        <header className="flex items-center justify-end h-20 px-10 sticky top-0 z-40 bg-background w-full">
          {/* Actions */}
          <div className="flex items-center gap-6 text-on-surface-variant">
            <button className="hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>
            <button className="hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
            </button>
            
            <div className="w-[36px] h-[36px] rounded-full bg-[#F0A07B] text-[#1A1513] flex items-center justify-center text-[16px] font-medium ml-2 cursor-pointer">
              C
            </div>
          </div>
        </header>

        {/* Dashboard Canvas (Children) */}
        <main className="flex-1 px-10 pb-10 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
