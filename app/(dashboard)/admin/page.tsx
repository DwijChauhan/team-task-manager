"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

// Mock Data Types
type MemberStatus = "Active" | "Pending";
type MemberRole = "Admin" | "Member" | "Viewer";

type Member = {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  joinedDate: string;
  avatar?: string;
  initials?: string;
  colorClass?: string;
};

const initialMembers: Member[] = [
  {
    id: "m1",
    name: "Dwij Chauhan",
    email: "dwij.chauhan@taskflow.inc",
    role: "Admin",
    status: "Active",
    joinedDate: "Joined Mar 2023",
    initials: "DC",
    colorClass: "bg-primary-fixed text-on-primary-fixed",
  },
  {
    id: "m2",
    name: "Rahul Desai",
    email: "r.desai@taskflow.inc",
    role: "Member",
    status: "Active",
    joinedDate: "Joined Apr 2023",
    avatar: "https://ui-avatars.com/api/?name=Rahul+Desai&background=random",
  },
  {
    id: "m3",
    name: "Anjali Gupta",
    email: "anjali.g@taskflow.inc",
    role: "Member",
    status: "Active",
    joinedDate: "Joined Aug 2023",
    initials: "AG",
    colorClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  {
    id: "m4",
    name: "Invited User",
    email: "rohan.mehta@taskflow.inc",
    role: "Viewer",
    status: "Pending",
    joinedDate: "Invited 2 days ago",
    initials: "?",
    colorClass: "bg-surface-variant text-on-surface-variant border border-outline-variant border-dashed",
  },
];

export default function AdminPage() {
  const [members, setMembers] = useLocalStorage<Member[]>("taskflow_members", initialMembers);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [roleFilter, setRoleFilter] = useState<string>("All Roles");
  const [statusFilter, setStatusFilter] = useState<string>("All Statuses");

  const [toastMessage, setToastMessage] = useState<{ title: string; message: string } | null>(null);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<MemberRole>("Member");

  const filteredMembers = members.filter((member) => {
    if (roleFilter !== "All Roles" && member.role !== roleFilter) return false;
    if (statusFilter !== "All Statuses" && member.status !== statusFilter) return false;
    return true;
  });

  const handleRemove = (id: string, name: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    showToast("Member Removed", `${name} has been removed from the organization.`);
  };

  const handleEditRole = (id: string, name: string) => {
    // Basic cyclic toggle for demo
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextRole = m.role === "Admin" ? "Member" : m.role === "Member" ? "Viewer" : "Admin";
          return { ...m, role: nextRole };
        }
        return m;
      })
    );
    showToast("Role Updated", `${name}'s role was successfully changed.`);
  };

  const handleResend = (name: string) => {
    showToast("Invite Sent", `A new invitation was sent to ${name}.`);
  };

  const showToast = (title: string, message: string) => {
    setToastMessage({ title, message });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.includes("@")) return;
    
    const newMember: Member = {
      id: `m${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
      joinedDate: "Invited just now",
      initials: "?",
      colorClass: "bg-surface-variant text-on-surface-variant border border-outline-variant border-dashed",
    };
    
    setMembers((prev) => [...prev, newMember]);
    setIsInviteModalOpen(false);
    setInviteEmail("");
    showToast("Invite Sent", `An invitation was sent to ${inviteEmail}.`);
  };

  if (!mounted) {
    return <div className="flex-1 p-container-padding flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <main className="flex-1 p-container-padding max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-h1 text-h1 text-on-background mb-1">Team Management</h2>
            <p className="font-body-base text-body-base text-on-surface-variant">
              Manage your organization's members, roles, and access levels.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant text-on-surface rounded-md hover:bg-surface-container-low transition-colors font-body-sm text-body-sm font-medium shadow-sm">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export
            </button>
            <button 
              onClick={() => setIsInviteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-md hover:bg-primary/90 transition-colors font-body-sm text-body-sm font-medium shadow-sm">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Invite Member
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex justify-between items-center mb-4 bg-surface rounded-lg p-4 border border-outline-variant shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                Role:
              </span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-surface border border-outline-variant text-on-surface text-sm rounded-md focus:ring-primary focus:border-primary block w-32 p-1.5 font-body-sm cursor-pointer shadow-sm"
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Member</option>
                <option>Viewer</option>
              </select>
            </div>
            <div className="h-4 w-px bg-outline-variant"></div>
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-surface border border-outline-variant text-on-surface text-sm rounded-md focus:ring-primary focus:border-primary block w-32 p-1.5 font-body-sm cursor-pointer shadow-sm"
              >
                <option>All Statuses</option>
                <option>Active</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
          <div className="text-on-surface-variant font-body-sm text-body-sm">
            Showing {filteredMembers.length} of {members.length} members
          </div>
        </div>

        {/* Data Table Card */}
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider cursor-pointer hover:text-on-surface transition-colors group w-1/3">
                  <div className="flex items-center gap-1">
                    Name <span className="material-symbols-outlined text-[16px] text-outline opacity-50 group-hover:opacity-100 transition-opacity">arrow_downward</span>
                  </div>
                </th>
                <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider w-1/3">
                  Email
                </th>
                <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider w-1/6">
                  Role
                </th>
                <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">
                    No members match your filters.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className={`hover:bg-surface-container-lowest transition-colors group ${member.status === 'Pending' ? 'opacity-75' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {member.avatar ? (
                          <img alt={member.name} className="w-8 h-8 rounded-full object-cover shadow-sm" src={member.avatar} />
                        ) : (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-h3 text-h3 ${member.colorClass}`}>
                            {member.initials}
                          </div>
                        )}
                        <div>
                          <div className={`font-h3 text-h3 text-on-surface ${member.status === 'Pending' ? 'italic' : ''}`}>
                            {member.name}
                          </div>
                          <div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            {member.joinedDate}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-base text-body-base text-on-surface-variant">
                      {member.email}
                    </td>
                    <td className="px-6 py-4">
                      {member.status === "Pending" ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-surface-variant text-on-surface-variant border border-outline-variant border-dashed">
                          <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Pending
                        </span>
                      ) : (
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          member.role === 'Admin' ? 'bg-primary-container text-on-primary-container border border-primary-container/20' : 'bg-surface-container-highest text-on-surface border border-outline-variant'
                        }`}>
                          {member.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {member.status === "Pending" ? (
                          <>
                            <button onClick={() => handleResend(member.email)} className="px-3 py-1 text-xs font-medium text-on-surface border border-outline-variant rounded-md hover:bg-surface-container transition-colors">
                              Resend
                            </button>
                            <button onClick={() => handleRemove(member.id, member.name)} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-md transition-colors tooltip" title="Cancel Invite">
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEditRole(member.id, member.name)} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors tooltip" title="Toggle Role">
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button onClick={() => handleRemove(member.id, member.name)} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/50 rounded-md transition-colors tooltip" title="Remove Member">
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-outline-variant bg-surface flex items-center justify-between">
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-on-surface-variant disabled:opacity-50 hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span> Previous
            </button>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-primary-container text-on-primary-container font-medium text-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-surface-container transition-colors font-medium text-sm">2</button>
              <span className="w-8 h-8 flex items-center justify-center text-on-surface-variant text-sm">...</span>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-on-surface hover:text-primary transition-colors">
              Next <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </main>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-[slideIn_0.2s_ease-out]">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="font-h3 text-h3 text-on-surface">Invite Member</h3>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleInviteSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@taskflow.in"
                  className="w-full px-3 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Role</label>
                <select 
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as MemberRole)}
                  className="w-full px-3 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsInviteModalOpen(false)} className="px-4 py-2 border border-outline-variant rounded-md text-on-surface hover:bg-surface-container transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded-md hover:bg-primary/90 transition-colors">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-surface border border-[#3e4c67]/20 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] max-w-sm animate-[slideIn_0.3s_ease-out]">
          <div className="w-8 h-8 rounded-full bg-[#e7eefe] text-[#27354f] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
          </div>
          <div className="flex-1">
            <h4 className="font-h3 text-sm text-on-surface mb-0.5">{toastMessage.title}</h4>
            <p className="font-body-sm text-xs text-on-surface-variant">
              {toastMessage.message}
            </p>
          </div>
          <button onClick={() => setToastMessage(null)} className="p-1 text-outline hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </>
  );
}
