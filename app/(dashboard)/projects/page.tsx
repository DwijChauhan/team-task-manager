"use client";

import Link from "next/link";
import { useState } from "react";

// Mock Data
type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  colorClass: string;
  progress: number;
  dueDate: string;
  status: "Active" | "Archived";
  delayed?: boolean;
  members: { avatar: string }[];
  additionalMembers: number;
};

const initialProjects: Project[] = [
  {
    id: "1",
    title: "Diwali Festival Sale Campaign",
    description: "Complete marketing campaign for the Diwali sale focusing on massive discounts, special regional offers, and improved conversion funnels.",
    category: "Q3 Planning",
    icon: "web",
    colorClass: "bg-primary",
    progress: 65,
    dueDate: "Oct 15",
    status: "Active",
    members: [
      { avatar: "https://ui-avatars.com/api/?name=Anjali+Gupta&background=random" },
      { avatar: "https://ui-avatars.com/api/?name=Amit+Patel&background=random" },
      { avatar: "https://ui-avatars.com/api/?name=Vikram+Singh&background=random" },
    ],
    additionalMembers: 2,
  },
  {
    id: "2",
    title: "UPI Integration & Onboarding",
    description: "Transitioning our payment systems to support UPI Autopay and QR code onboarding for local merchants.",
    category: "Infrastructure",
    icon: "api",
    colorClass: "bg-tertiary",
    progress: 32,
    dueDate: "Delayed",
    status: "Active",
    delayed: true,
    members: [
      { avatar: "https://ui-avatars.com/api/?name=Rahul+Desai&background=random" },
      { avatar: "https://ui-avatars.com/api/?name=Neha+Joshi&background=random" },
    ],
    additionalMembers: 0,
  },
  {
    id: "3",
    title: "Expansion to Tier 2 Cities",
    description: "Aggressive marketing and logistical push to expand our delivery network to 50 new Tier 2 cities in India.",
    category: "Marketing",
    icon: "campaign",
    colorClass: "bg-secondary",
    progress: 89,
    dueDate: "Nov 02",
    status: "Active",
    members: [
      { avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=random" },
      { avatar: "https://ui-avatars.com/api/?name=Rohan+Mehta&background=random" },
      { avatar: "https://ui-avatars.com/api/?name=Manish+Kumar&background=random" },
    ],
    additionalMembers: 5,
  },
  {
    id: "4",
    title: "Kisan App V1 (Android)",
    description: "Initial launch of the Android native application designed specifically for farmers to track crop prices.",
    category: "Mobile",
    icon: "smartphone",
    colorClass: "bg-outline",
    progress: 100,
    dueDate: "Jul 10",
    status: "Archived",
    members: [
      { avatar: "https://ui-avatars.com/api/?name=Sneha+Reddy&background=random" },
    ],
    additionalMembers: 1,
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"Active" | "Archived">("Active");

  const filteredProjects = initialProjects.filter((p) => p.status === filter);

  return (
    <div className="flex-1 overflow-y-auto p-container-padding">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
          <div>
            <h2 className="font-h1 text-h1 text-on-surface">Projects</h2>
            <p className="font-body-base text-body-base text-on-surface-variant mt-1">
              Manage and track all ongoing initiatives across the organization.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setFilter("Active")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:z-10 focus:ring-2 focus:ring-primary transition-colors ${
                  filter === "Active"
                    ? "bg-surface-variant text-on-surface border border-outline-variant"
                    : "bg-surface text-on-surface-variant border border-outline-variant hover:bg-surface-variant/50 hover:text-on-surface"
                }`}
                type="button"
              >
                Active
              </button>
              <button
                onClick={() => setFilter("Archived")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:z-10 focus:ring-2 focus:ring-primary transition-colors ${
                  filter === "Archived"
                    ? "bg-surface-variant text-on-surface border-t border-b border-r border-outline-variant"
                    : "bg-surface text-on-surface-variant border-t border-b border-r border-outline-variant hover:bg-surface-variant/50 hover:text-on-surface"
                }`}
                type="button"
              >
                Archived
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full py-12 text-center text-on-surface-variant">
              No {filter.toLowerCase()} projects found.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group cursor-pointer relative overflow-hidden"
              >
                <div className={`h-2 w-full absolute top-0 left-0 ${project.colorClass}`}></div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-surface-container-highest p-2 rounded-lg text-on-surface">
                      <span className="material-symbols-outlined">{project.icon}</span>
                    </div>
                    <span className="bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps px-2 py-1 rounded-full border border-outline-variant/50">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-h3 text-h3 text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 line-clamp-2 flex-1">
                    {project.description}
                  </p>
                  <div className="mt-auto space-y-4">
                    <div>
                      <div className="flex justify-between font-label-caps text-label-caps mb-1.5">
                        <span className="text-on-surface-variant">Progress</span>
                        <span className="text-on-surface font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5">
                        <div
                          className={`${project.colorClass} h-1.5 rounded-full`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-outline-variant/30">
                      <div className="flex -space-x-2 overflow-hidden">
                        {project.members.map((member, i) => (
                          <img
                            key={i}
                            alt="User profile"
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-surface border border-outline-variant"
                            src={member.avatar}
                          />
                        ))}
                        {project.additionalMembers > 0 && (
                          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-surface bg-surface-container-high text-on-surface-variant font-label-caps text-[10px]">
                            +{project.additionalMembers}
                          </div>
                        )}
                      </div>
                      <span
                        className={`font-body-sm text-body-sm flex items-center gap-1 font-medium ${
                          project.delayed ? "text-error" : "text-on-surface-variant"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {project.delayed ? "warning" : "calendar_today"}
                        </span>
                        {project.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
