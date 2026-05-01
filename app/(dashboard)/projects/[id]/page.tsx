"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import Link from "next/link";

// Mock Data
type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  assignee: {
    name: string;
    avatar: string;
  };
  comments: number;
  attachments: number;
  tags: string[];
};

const initialTasks: Task[] = [
  {
    id: "t1",
    title: "Revamp Festive Banners",
    description: "Design new festive banners for the upcoming Diwali sale on the homepage.",
    status: "todo",
    priority: "High",
    dueDate: "Oct 12",
    assignee: { name: "Anjali Gupta", avatar: "https://ui-avatars.com/api/?name=Anjali+Gupta&background=random" },
    comments: 0,
    attachments: 0,
    tags: ["Design", "UI/UX"],
  },
  {
    id: "t2",
    title: "Integrate Razorpay Webhooks",
    description: "Add webhook listener to handle Razorpay payment success and failure events.",
    status: "todo",
    priority: "Low",
    dueDate: "Oct 15",
    assignee: { name: "Unassigned", avatar: "" },
    comments: 0,
    attachments: 0,
    tags: ["Backend", "Docs"],
  },
  {
    id: "t3",
    title: "Analyze Amazon/Flipkart Offers",
    description: "Analyze the current festive offers on Amazon and Flipkart for market positioning.",
    status: "todo",
    priority: "Medium",
    dueDate: "Oct 18",
    assignee: { name: "Rahul Desai", avatar: "https://ui-avatars.com/api/?name=Rahul+Desai&background=random" },
    comments: 5,
    attachments: 2,
    tags: ["Research", "Marketing"],
  },
  {
    id: "t4",
    title: "Build Hindi Language Toggle",
    description: "Implement a toggle in the top bar to switch the website language to Hindi.",
    status: "in-progress",
    priority: "High",
    dueDate: "Today",
    assignee: { name: "Vikram Singh", avatar: "https://ui-avatars.com/api/?name=Vikram+Singh&background=random" },
    comments: 2,
    attachments: 0,
    tags: ["Frontend", "UI/UX"],
  },
  {
    id: "t5",
    title: "Migrate Data to Mumbai Region",
    description: "Write AWS script to migrate user data from us-east-1 to ap-south-1 (Mumbai).",
    status: "in-progress",
    priority: "Medium",
    dueDate: "Oct 10",
    assignee: { name: "Rahul Desai", avatar: "https://ui-avatars.com/api/?name=Rahul+Desai&background=random" },
    comments: 0,
    attachments: 0,
    tags: ["Database", "Backend"],
  },
  {
    id: "t6",
    title: "Draft Landing Page Layouts",
    description: "Draft wireframes for the new Diwali festive landing page.",
    status: "done",
    priority: "Medium",
    dueDate: "Oct 1",
    assignee: { name: "Anjali Gupta", avatar: "https://ui-avatars.com/api/?name=Anjali+Gupta&background=random" },
    comments: 3,
    attachments: 1,
    tags: ["Design", "Planning"],
  },
];

export default function ProjectKanbanPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("taskflow_kanban_tasks", initialTasks);
  const [activeTab, setActiveTab] = useState("Tasks");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Drag and Drop Logic
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("taskId", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // allow drop
  };

  const handleDrop = (e: React.DragEvent, targetStatus: "todo" | "in-progress" | "done") => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
    );
  };

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  if (!mounted) {
    return <div className="flex-1 overflow-x-hidden flex bg-background min-h-[calc(100vh-64px)] items-center justify-center">Loading board...</div>;
  }

  return (
    <div className="flex-1 overflow-x-hidden flex bg-background min-h-[calc(100vh-64px)]">
      {/* Left Side: Main Project View */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-outline-variant/30">
        {/* Project Header */}
        <div className="px-container-padding py-8 border-b border-outline-variant/30 bg-surface">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2 text-outline text-body-sm">
                  <span className="material-symbols-outlined text-[16px]">folder</span>
                  <span>Projects / Q3 Festive Season</span>
                </div>
                <h1 className="font-h1 text-h1 text-on-surface mb-2">Diwali Festival Sale Campaign</h1>
                <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl">
                  Complete marketing campaign for the Diwali sale focusing on massive discounts, special regional offers, and improved conversion funnels.
                </p>
              </div>
              <div className="flex -space-x-2">
                <img alt="User profile" className="w-8 h-8 rounded-full border-2 border-surface" src="https://ui-avatars.com/api/?name=Vikram+Singh&background=random" />
                <img alt="User profile" className="w-8 h-8 rounded-full border-2 border-surface" src="https://ui-avatars.com/api/?name=Anjali+Gupta&background=random" />
                <img alt="User profile" className="w-8 h-8 rounded-full border-2 border-surface" src="https://ui-avatars.com/api/?name=Rahul+Desai&background=random" />
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center font-label-caps text-label-caps text-on-surface-variant">
                  +3
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex gap-6 mt-6">
              {["Tasks", "Members", "Files", "Settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-body-sm text-body-sm font-medium pb-2 px-1 transition-colors ${
                    activeTab === tab
                      ? "text-primary border-b-2 border-primary"
                      : "text-outline hover:text-on-surface"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Board Area */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-container-padding bg-surface-container-low">
          {activeTab === "Tasks" ? (
            <div className="flex gap-6 h-full items-start min-w-[900px]">
              {/* Todo Column */}
              <div
                className="w-80 flex-shrink-0 flex flex-col h-full"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "todo")}
              >
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="font-h3 text-h3 text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-outline"></span> Todo
                    <span className="font-body-sm text-body-sm text-outline ml-1 font-normal">
                      {tasks.filter((t) => t.status === "todo").length}
                    </span>
                  </h3>
                </div>
                <div className="flex flex-col gap-3 overflow-y-auto pb-4 pr-1 min-h-[100px]">
                  {tasks
                    .filter((t) => t.status === "todo")
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isSelected={selectedTaskId === task.id}
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onClick={() => setSelectedTaskId(task.id)}
                      />
                    ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div
                className="w-80 flex-shrink-0 flex flex-col h-full"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "in-progress")}
              >
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="font-h3 text-h3 text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed-dim"></span> In Progress
                    <span className="font-body-sm text-body-sm text-outline ml-1 font-normal">
                      {tasks.filter((t) => t.status === "in-progress").length}
                    </span>
                  </h3>
                </div>
                <div className="flex flex-col gap-3 overflow-y-auto pb-4 pr-1 min-h-[100px]">
                  {tasks
                    .filter((t) => t.status === "in-progress")
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isSelected={selectedTaskId === task.id}
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onClick={() => setSelectedTaskId(task.id)}
                      />
                    ))}
                </div>
              </div>

              {/* Done Column */}
              <div
                className="w-80 flex-shrink-0 flex flex-col h-full opacity-70"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "done")}
              >
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="font-h3 text-h3 text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-outline-variant"></span> Done
                    <span className="font-body-sm text-body-sm text-outline ml-1 font-normal">
                      {tasks.filter((t) => t.status === "done").length}
                    </span>
                  </h3>
                </div>
                <div className="flex flex-col gap-3 overflow-y-auto pb-4 pr-1 min-h-[100px]">
                  {tasks
                    .filter((t) => t.status === "done")
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        isSelected={selectedTaskId === task.id}
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onClick={() => setSelectedTaskId(task.id)}
                      />
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-on-surface-variant">
              Content for {activeTab} goes here.
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Task Detail Drawer */}
      {selectedTask && (
        <aside className="w-full lg:w-[400px] flex-shrink-0 bg-surface border-l border-outline-variant/30 flex flex-col h-full z-10 ambient-shadow-level-2 transform transition-transform animate-in slide-in-from-right absolute right-0 lg:static top-0 bottom-0 shadow-xl lg:shadow-none">
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface-bright">
            <div className="flex items-center gap-2 text-outline">
              <button className="hover:bg-surface-container rounded p-1 transition-colors">
                <span className="material-symbols-outlined text-[20px]">mark_as_unread</span>
              </button>
              <button className="hover:bg-surface-container rounded p-1 transition-colors">
                <span className="material-symbols-outlined text-[20px]">link</span>
              </button>
              <button className="hover:bg-surface-container rounded p-1 transition-colors">
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </div>
            <button
              onClick={() => setSelectedTaskId(null)}
              className="text-outline hover:text-on-surface hover:bg-surface-container rounded p-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <h2 className="font-h2 text-h2 text-on-surface mb-4">{selectedTask.title}</h2>
              <div className="flex items-center gap-3 mb-6">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded border border-outline-variant bg-surface-container-low text-on-surface font-body-sm text-body-sm">
                  <span className={`w-2 h-2 rounded-full ${
                    selectedTask.status === 'todo' ? 'bg-outline' :
                    selectedTask.status === 'in-progress' ? 'bg-primary-fixed-dim' : 'bg-outline-variant'
                  }`}></span>
                  <span className="capitalize">{selectedTask.status.replace('-', ' ')}</span>
                </button>
                <div className={`px-2 py-1 rounded font-label-caps text-label-caps ${
                  selectedTask.priority === 'High' ? 'bg-error-container text-on-error-container' :
                  selectedTask.priority === 'Medium' ? 'bg-tertiary-container/30 text-on-tertiary-container' :
                  'bg-surface-variant text-on-surface-variant'
                }`}>
                  {selectedTask.priority}
                </div>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-y-4 gap-x-4 mb-8 font-body-sm text-body-sm">
                <div className="text-outline flex items-center">Assignee</div>
                <div className="flex items-center gap-2">
                  {selectedTask.assignee.avatar ? (
                    <img alt="User" className="w-6 h-6 rounded-full" src={selectedTask.assignee.avatar} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-dashed border-outline flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-outline">person</span>
                    </div>
                  )}
                  <span className="text-on-surface font-medium">{selectedTask.assignee.name}</span>
                </div>
                <div className="text-outline flex items-center">Due Date</div>
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-outline">calendar_today</span>
                  <span className={selectedTask.dueDate === 'Today' ? 'text-error font-medium' : ''}>{selectedTask.dueDate}</span>
                </div>
                <div className="text-outline flex items-center">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded border border-outline-variant text-outline font-label-caps text-[11px]">
                      {tag}
                    </span>
                  ))}
                  <button className="px-2 py-0.5 rounded border border-dashed border-outline-variant text-outline font-label-caps text-[11px] hover:bg-surface-container">
                    +
                  </button>
                </div>
              </div>
              <hr className="border-outline-variant/30 mb-6" />
              <div className="mb-8">
                <h3 className="font-h3 text-[14px] text-on-surface mb-2 font-semibold">Description</h3>
                <p className="font-body-base text-body-base text-on-surface-variant">{selectedTask.description}</p>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

// Subcomponent for Task Cards
function TaskCard({ task, isSelected, onDragStart, onClick }: { task: Task, isSelected: boolean, onDragStart: React.DragEventHandler, onClick: () => void }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={`bg-surface border-2 rounded-lg p-4 cursor-pointer transition-colors group relative ${
        isSelected ? "border-primary ambient-shadow-level-3" : "border-outline-variant ambient-shadow-level-2 hover:border-primary/50"
      }`}
    >
      {isSelected && <div className="absolute -left-[2px] top-4 bottom-4 w-1 bg-primary rounded-r"></div>}
      <div className="flex justify-between items-start mb-2 pl-2">
        <div className={`px-2 py-0.5 rounded font-label-caps text-label-caps ${
          task.priority === 'High' ? 'bg-error-container text-on-error-container' :
          task.priority === 'Medium' ? 'bg-tertiary-container/30 text-on-tertiary-container' :
          'bg-surface-variant text-on-surface-variant'
        }`}>
          {task.priority}
        </div>
      </div>
      <h4 className="font-body-base text-body-base font-semibold text-on-surface mb-2 leading-tight pl-2">
        {task.title}
      </h4>
      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4 pl-2">
        {task.description}
      </p>
      <div className="flex items-center justify-between mt-auto pl-2">
        <div className={`flex items-center gap-1 font-body-sm text-[12px] font-medium ${task.dueDate === 'Today' ? 'text-error' : 'text-outline'}`}>
          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
          {task.dueDate}
        </div>
        {task.assignee.avatar ? (
          <img alt="Assignee" className="w-6 h-6 rounded-full ring-2 ring-surface" src={task.assignee.avatar} />
        ) : (
          <div className="w-6 h-6 rounded-full border border-dashed border-outline flex items-center justify-center">
            <span className="material-symbols-outlined text-[14px] text-outline">person</span>
          </div>
        )}
      </div>
    </div>
  );
}
