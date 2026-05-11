"use client";

import { useState, useEffect } from "react";
import { formatINR, formatDateIN } from "../../../utils/formatters";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching data from Railway backend
    const timer = setTimeout(() => {
      setData({
        budget: 15400000,
        activeProjects: 4,
        openTasks: 12,
        activity: [
          { id: 1, user: "Priya", action: "moved task to Done", task: "API Integration", time: "10 mins ago", color: "bg-[#008080]" },
          { id: 2, user: "Rahul", action: "created new project", task: "Mobile App V2", time: "2 hours ago", color: "bg-[#FF9933]" },
          { id: 3, user: "Amit", action: "commented on", task: "Auth UI", time: "Yesterday", color: "bg-[#E53E3E]" },
        ],
        heatmap: [
          { day: "Mon", intensity: 3 },
          { day: "Tue", intensity: 5 },
          { day: "Wed", intensity: 8 },
          { day: "Thu", intensity: 2 },
          { day: "Fri", intensity: 6 },
          { day: "Sat", intensity: 0 },
          { day: "Sun", intensity: 0 },
        ]
      });
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="h-24 bg-surface-container-low rounded-xl animate-pulse flex-1 border border-outline-variant"></div>
          <div className="h-24 bg-surface-container-low rounded-xl animate-pulse flex-1 border border-outline-variant"></div>
          <div className="h-24 bg-surface-container-low rounded-xl animate-pulse flex-1 border border-outline-variant"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-surface-container-low rounded-xl animate-pulse border border-outline-variant"></div>
          <div className="h-80 bg-surface-container-low rounded-xl animate-pulse border border-outline-variant"></div>
        </div>
      </div>
    );
  }

  // Simulate empty state if no active projects
  if (data?.activeProjects === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
        <div className="w-48 h-48 mb-6 relative">
          {/* Abstract Empty State Illustration */}
          <div className="absolute inset-0 bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-full flex items-center justify-center">
             <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50">task</span>
          </div>
        </div>
        <h2 className="text-[24px] font-h2 text-on-surface mb-2">No active tasks</h2>
        <p className="text-on-surface-variant text-[14px] max-w-md text-center mb-8">
          Your workspace is clean. Create a new task or project to get started with your team.
        </p>
        <button className="px-6 py-3 bg-[var(--color-electric-teal)] text-white font-medium rounded-md hover:opacity-90 transition-opacity focus-ring-teal flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Start a Task
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-center">
          <div className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide mb-1">Total Budget</div>
          <div className="text-[28px] font-bold text-on-surface leading-none">{formatINR(data.budget)}</div>
        </div>
        
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-center">
          <div className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide mb-1">Active Projects</div>
          <div className="text-[28px] font-bold text-on-surface leading-none flex items-end gap-2">
            {data.activeProjects}
            <span className="text-[12px] text-[var(--color-electric-teal)] font-medium bg-primary-container px-2 py-0.5 rounded-full mb-1">+2 this week</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-center">
          <div className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide mb-1">Open Tasks</div>
          <div className="text-[28px] font-bold text-on-surface leading-none">{data.openTasks}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart / Heatmap */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-h2 text-[16px] font-medium text-on-surface">Task Health Heatmap</h2>
            <div className="text-[12px] text-on-surface-variant flex items-center gap-2">
              Less <div className="w-16 h-2 bg-gradient-to-r from-surface to-[var(--color-electric-teal)] rounded-full"></div> More
            </div>
          </div>
          
          <div className="flex-1 flex items-end gap-2 h-48 mt-auto">
            {data.heatmap.map((day: any) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div 
                  className="w-full rounded-t-sm transition-all duration-300 group-hover:brightness-125 focus-ring-teal" 
                  tabIndex={0}
                  style={{ 
                    height: `${Math.max(10, day.intensity * 10)}%`, 
                    backgroundColor: day.intensity > 0 ? `color-mix(in srgb, var(--color-electric-teal) ${day.intensity * 10}%, var(--color-surface))` : 'var(--color-surface)'
                  }}
                  title={`${day.intensity} tasks`}
                ></div>
                <span className="text-[11px] font-medium text-on-surface-variant">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-outline-variant pb-3">
            <h2 className="font-h2 text-[16px] font-medium text-on-surface">Activity Feed</h2>
            <button className="text-[12px] font-medium text-[var(--color-electric-teal)] hover:underline focus-ring-teal rounded">View All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto relative">
            <div className="absolute left-3.5 top-2 bottom-2 w-px bg-outline-variant -z-10"></div>
            <div className="space-y-6">
              {data.activity.map((item: any) => (
                <div key={item.id} className="flex gap-4 relative">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-surface-container-lowest flex-shrink-0 z-10 ${item.color.replace('bg-[', '').replace(']', '')}`} style={{ backgroundColor: item.color.replace('bg-[', '').replace(']', '') }}>
                    {item.user.charAt(0)}
                  </div>
                  <div className="flex flex-col pt-1">
                    <p className="text-[13px] text-on-surface leading-snug">
                      <span className="font-semibold">{item.user}</span> <span className="text-on-surface-variant">{item.action}</span> <span className="font-medium">{item.task}</span>
                    </p>
                    <span className="text-[11px] text-on-surface-variant mt-0.5">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
