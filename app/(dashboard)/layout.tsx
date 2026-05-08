import Link from "next/link";
import React from "react";
import CreateButton from "../../components/CreateButton";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value || "Admin";

  const RoleBadge = () => {
    if (role === 'Admin') {
      return <span className="bg-[#1A1A1A] text-white px-2 py-0.5 rounded-[20px] text-[12px] font-medium">Admin</span>;
    }
    return <span className="border-[0.5px] border-[#9A9A9A] text-[#6B6B6B] px-2 py-0.5 rounded-[20px] text-[12px] font-medium">Member</span>;
  };

  return (
    <div className="bg-background text-on-background font-body-base text-body-base min-h-screen antialiased flex">
      {/* SideNavBar */}
      <nav className="fixed inset-y-0 left-0 flex flex-col z-50 h-screen w-60 border-r border-outline-variant bg-surface-container-lowest">
        
        {/* User Block Header */}
        <div className="p-4 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[14px] font-medium shrink-0">
              DC
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-on-surface truncate">Dwij Chauhan</span>
                <RoleBadge />
              </div>
              <div className="text-[12px] text-on-surface-variant truncate">dwij@taskflow.inc</div>
            </div>
          </div>
        </div>

        {/* Main Links */}
        <div className="py-4 px-3 flex flex-col gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#EFEDE8] text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            <span className="text-[14px] font-medium">Dashboard</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#EFEDE8] text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">group</span>
            <span className="text-[14px] font-medium">Team</span>
          </Link>
        </div>

        {/* Projects Section */}
        <div className="flex-1 py-2 flex flex-col gap-1 px-3 overflow-y-auto">
          <div className="px-3 pb-2 pt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-on-surface-variant">
            Projects
          </div>
          
          <Link
            href="/projects/q3-festive"
            className="flex flex-col justify-center px-3 py-2 rounded-r-md border-l-[2px] border-[#1A1A1A] bg-[#EFEDE8] text-on-surface transition-colors"
          >
            <span className="text-[14px] font-medium">Diwali Festival Sale</span>
            <span className="text-[12px] text-on-surface-variant mt-0.5">Admin · 1/6 done</span>
          </Link>
          
          <Link
            href="/projects/payments"
            className="flex flex-col justify-center px-3 py-2 rounded-md border-l-[2px] border-transparent hover:bg-[#EFEDE8] text-on-surface-variant transition-colors"
          >
            <span className="text-[14px] font-medium text-on-surface">Payments API</span>
            <span className="text-[12px] text-on-surface-variant mt-0.5">Member · 0/2 done</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-outline-variant mt-auto">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-left text-[#E24B4A] hover:bg-[#FCEBEB] rounded-md transition-colors">
            <i className="ti-logout material-symbols-outlined text-[18px]">logout</i>
            <span className="text-[14px] font-medium">Log out</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[240px] min-h-screen">
        {/* TopNavBar */}
        <header className="flex items-center justify-between h-16 px-8 sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-md w-full border-b border-outline-variant shadow-sm">
          {/* Search Bar (Left) */}
          <div className="flex-1 flex items-center">
            <div className="relative w-64 focus-within:ring-2 focus-within:ring-outline rounded-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 h-[36px] bg-surface-container-lowest border border-outline-variant rounded-md text-[14px] text-on-surface focus:outline-none focus:border-primary placeholder:text-on-surface-variant transition-colors"
                placeholder="Search..."
                type="text"
              />
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <CreateButton />
            
            <div className="h-6 w-px bg-outline-variant mx-2"></div>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-medium text-on-surface">Dwij Chauhan</span>
                  <RoleBadge />
                </div>
              </div>
              <div className="w-[36px] h-[36px] rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[14px] font-medium">
                DC
              </div>
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
