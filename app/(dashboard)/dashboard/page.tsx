"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const activeProjects = 0;
  const completedProjects = 0;
  const openTasks = 0;
  const overdueTasks = 0;
  const overallProgress = 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-h1 text-[40px] text-on-surface mb-2 uppercase tracking-wide">
          Hemantkumar
        </h1>
        <p className="text-on-surface-variant text-[15px]">
          Here is what's happening with your projects today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Active Projects (col-span-2) */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <h3 className="text-[12px] text-on-surface-variant font-medium uppercase tracking-[0.1em]">
              Active Projects
            </h3>
            <span className="material-symbols-outlined text-primary text-[20px]">layers</span>
          </div>
          <div className="text-[40px] font-h1 text-on-surface leading-none mt-2 mb-6">
            {activeProjects}
          </div>
          <div className="mt-auto">
            <div className="flex justify-between text-[12px] text-on-surface-variant mb-2">
              <span>Overall Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <div className="w-full bg-surface h-1 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-500" 
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Completed Projects */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[160px]">
          <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">check_circle</span>
          </div>
          <h3 className="text-[12px] text-on-surface-variant font-medium uppercase tracking-[0.1em] mb-2">
            Completed
          </h3>
          <div className="text-[32px] font-h1 text-on-surface leading-none mb-2">
            {completedProjects}
          </div>
          <div className="text-[13px] text-primary">
            Keep it up!
          </div>
        </div>

        {/* Open Tasks */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[160px]">
          <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">assignment</span>
          </div>
          <h3 className="text-[12px] text-on-surface-variant font-medium uppercase tracking-[0.1em] mb-2">
            Open Tasks
          </h3>
          <div className="text-[32px] font-h1 text-on-surface leading-none mb-2">
            {openTasks}
          </div>
          <div className="text-[13px] text-on-surface-variant">
            On track
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-error-container border border-error-container rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[160px]">
          <div className="mb-4">
            <span className="material-symbols-outlined text-error text-[24px]">warning</span>
          </div>
          <h3 className="text-[12px] text-error font-medium uppercase tracking-[0.1em] mb-2">
            Overdue
          </h3>
          <div className="text-[32px] font-h1 text-error leading-none mb-2">
            {overdueTasks}
          </div>
          <div className="text-[13px] text-error">
            All caught up
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col min-h-[300px]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant">
            <h2 className="font-h2 text-[20px] text-on-surface">Recent Activity</h2>
            <button className="text-[13px] text-on-surface-variant hover:text-on-surface transition-colors">
              View All
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center text-[14px] text-on-surface-variant">
            No recent tasks found.
          </div>
        </div>

        {/* Task Distribution */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col min-h-[300px]">
          <div className="text-center mb-6">
            <h2 className="font-h2 text-[20px] text-on-surface">Task Distribution</h2>
          </div>
          <div className="flex-1 flex items-center justify-center text-[14px] text-on-surface-variant">
            No tasks available.
          </div>
        </div>

      </div>
    </div>
  );
}
