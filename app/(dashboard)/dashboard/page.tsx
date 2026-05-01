"use client";

import Link from "next/link";
import { useState } from "react";

// Mock data structures
type Task = {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  isCompleted: boolean;
  isOverdue: boolean;
  category: string;
  assigneeInitials: string;
};

type Activity = {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  comment?: string;
  isPrimary: boolean;
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "GST Filing Review",
    project: "Finance Q3",
    dueDate: "Due Tomorrow",
    isCompleted: false,
    isOverdue: false,
    category: "FINANCE",
    assigneeInitials: "PS",
  },
  {
    id: "2",
    title: "UPI Payment Gateway Integration",
    project: "Payments API",
    dueDate: "Due Today",
    isCompleted: false,
    isOverdue: false,
    category: "DEV",
    assigneeInitials: "RD",
  },
  {
    id: "3",
    title: "Pitch Deck for Reliance",
    project: "Enterprise Sales",
    dueDate: "Overdue by 2 days",
    isCompleted: false,
    isOverdue: true,
    category: "SALES",
    assigneeInitials: "AG",
  },
];

const initialActivities: Activity[] = [
  {
    id: "1",
    user: "Sneha Reddy",
    action: "completed",
    target: "Diwali Sale Banner Design",
    time: "2 hours ago",
    isPrimary: true,
  },
  {
    id: "2",
    user: "Rahul Desai",
    action: "commented on",
    target: "Aadhaar Auth Integration",
    time: "4 hours ago",
    comment: "I think we need to handle UPI callback failures better before pushing to prod.",
    isPrimary: false,
  },
  {
    id: "3",
    user: "You",
    action: "created a new project",
    target: "Flipkart Seller App",
    time: "Yesterday",
    isPrimary: false,
  },
];

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const activities = initialActivities;

  const toggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const totalTasks = 124; // Baseline mock metric
  const completedTasks = 82 + tasks.filter(t => t.isCompleted).length;
  const inProgressTasks = 35 - tasks.filter(t => t.isCompleted).length;
  const overdueTasks = 7 - tasks.filter(t => t.isCompleted && t.isOverdue).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-h1 text-h1 text-on-surface">Dashboard Overview</h1>
        <p className="text-on-surface-variant mt-1">
          Here is what's happening with your projects today.
        </p>
      </div>

      {/* Summary Cards (Bento style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Total Tasks */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              Total Tasks
            </h3>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              inventory_2
            </span>
          </div>
          <div className="text-3xl font-bold text-on-surface mb-2">{totalTasks}</div>
          <div className="flex items-center text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px] text-primary mr-1">
              trending_up
            </span>
            <span>+12% from last week</span>
          </div>
        </div>
        {/* Completed */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              Completed
            </h3>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              check_circle
            </span>
          </div>
          <div className="text-3xl font-bold text-on-surface mb-2">{completedTasks}</div>
          <div className="flex items-center text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px] text-primary mr-1">
              trending_up
            </span>
            <span>+5% from last week</span>
          </div>
        </div>
        {/* In Progress */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-primary/30 transition-colors relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              In Progress
            </h3>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              pending
            </span>
          </div>
          <div className="text-3xl font-bold text-on-surface mb-2">{inProgressTasks}</div>
          <div className="flex items-center text-xs text-on-surface-variant">
            <span className="text-on-surface-variant">Active focus</span>
          </div>
        </div>
        {/* Overdue */}
        <div className="bg-surface-container-lowest border border-error-container rounded-lg p-6 flex flex-col shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-error/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-body-sm text-body-sm text-error font-medium">Overdue</h3>
            <span className="material-symbols-outlined text-error text-[20px]">
              warning
            </span>
          </div>
          <div className="text-3xl font-bold text-error mb-2">{overdueTasks}</div>
          <div className="flex items-center text-xs text-error">
            <span className="material-symbols-outlined text-[14px] mr-1">
              trending_down
            </span>
            <span>Requires attention</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mt-8">
        {/* My Tasks Overview */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col h-[500px]">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t-lg">
            <h2 className="font-h3 text-h3 text-on-surface">My Tasks</h2>
            <button className="text-primary hover:bg-surface-container px-3 py-1.5 rounded text-sm transition-colors">
              View All
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-between p-3 rounded-DEFAULT transition-colors group border border-transparent cursor-pointer
                  ${
                    task.isCompleted
                      ? "opacity-50 hover:bg-surface-container-highest hover:border-outline-variant"
                      : task.isOverdue
                      ? "hover:bg-error-container/30 hover:border-error-container"
                      : "hover:bg-surface-container-highest hover:border-outline-variant"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    className={`w-4 h-4 rounded cursor-pointer ${
                      task.isOverdue && !task.isCompleted
                        ? "border-error text-error focus:ring-error"
                        : "border-outline-variant text-primary focus:ring-primary"
                    }`}
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => {}} // Handle change on parent div
                  />
                  <div>
                    <p
                      className={`font-medium text-on-surface ${
                        task.isCompleted ? "line-through text-on-surface-variant" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        task.isOverdue && !task.isCompleted
                          ? "text-error"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {task.project} • {task.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded text-[11px] font-semibold tracking-wide ${
                      task.isOverdue && !task.isCompleted
                        ? "bg-error-container text-on-error-container"
                        : "bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    {task.category}
                  </span>
                  {!task.isOverdue && (
                    <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold">
                      {task.assigneeInitials}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col h-[500px]">
          <div className="p-6 border-b border-outline-variant bg-surface-container-lowest rounded-t-lg">
            <h2 className="font-h3 text-h3 text-on-surface">Recent Activity</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="relative border-l border-outline-variant ml-3 space-y-8">
              {activities.map((activity) => (
                <div key={activity.id} className="relative pl-6">
                  <div
                    className={`absolute -left-1.5 top-1 w-3 h-3 rounded-full ring-4 ring-surface-container-lowest ${
                      activity.isPrimary ? "bg-primary" : "bg-surface-variant"
                    }`}
                  ></div>
                  <p className="text-sm text-on-surface">
                    <strong>{activity.user}</strong> {activity.action}{" "}
                    <Link className="text-primary hover:underline" href="#">
                      {activity.target}
                    </Link>
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">{activity.time}</p>
                  {activity.comment && (
                    <div className="mt-2 p-3 bg-surface-container-highest rounded border border-outline-variant text-sm text-on-surface-variant italic">
                      "{activity.comment}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
