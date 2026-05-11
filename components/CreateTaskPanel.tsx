import React, { useState } from "react";

type CreateTaskPanelProps = {
  isAdmin: boolean;
  onClose: () => void;
  onSubmit: (task: any) => Promise<void>;
};

export default function CreateTaskPanel({ isAdmin, onClose, onSubmit }: CreateTaskPanelProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("Unassigned");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    await onSubmit({ title, priority, assignee });
    setLoading(false);
    onClose();
  };

  const priorities = [
    { name: "Low", color: "#82D97A" },
    { name: "Medium", color: "var(--color-amber-text)" },
    { name: "High", color: "var(--color-red-text)" }
  ];

  const members = [
    { name: "Unassigned", initials: "?", color: "var(--color-surface)", text: "var(--color-text-primary)" },
    { name: "Dwij Chauhan", initials: "DC", color: "var(--color-primary)", text: "var(--color-on-primary)" },
    { name: "Rahul Desai", initials: "RD", color: "var(--color-primary)", text: "var(--color-on-primary)" }
  ];

  return (
    <aside className="w-full lg:w-[400px] flex-shrink-0 bg-surface-container-lowest border-l border-outline-variant flex flex-col h-full z-10 absolute right-0 lg:static top-0 bottom-0 shadow-sm">
      <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface">
        <h2 className="text-[15px] font-h3 text-on-surface">
          {isAdmin ? "+ Create task" : "Task Details"}
        </h2>
        <button
          onClick={onClose}
          className="text-on-surface-variant hover:text-on-surface transition-colors bg-transparent border-none"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {isAdmin ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] text-on-surface-variant mb-1.5">Task Title</label>
              <input
                autoFocus
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Review API documentation"
                className="w-full h-[36px] px-3 border border-outline-variant rounded-md bg-surface-container-lowest text-[14px] text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] text-on-surface-variant mb-1.5">Priority</label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full h-[36px] pl-8 pr-3 border border-outline-variant rounded-md bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary appearance-none transition-colors"
                >
                  {priorities.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
                <div 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full pointer-events-none"
                  style={{ backgroundColor: priorities.find(p => p.name === priority)?.color }}
                ></div>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
              </div>
            </div>

            <div>
              <label className="block text-[13px] text-on-surface-variant mb-1.5">Assignee</label>
              <div className="relative">
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full h-[36px] pl-10 pr-3 border border-outline-variant rounded-md bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary appearance-none transition-colors"
                >
                  {members.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                </select>
                <div 
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium pointer-events-none"
                  style={{ backgroundColor: members.find(m => m.name === assignee)?.color, color: members.find(m => m.name === assignee)?.text }}
                >
                  {members.find(m => m.name === assignee)?.initials}
                </div>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !title}
              className="w-full h-[40px] mt-2 bg-primary text-on-primary font-medium text-[14px] rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> : "Add task"}
            </button>
            
            <hr className="my-6 border-outline-variant" />
            
            <div>
              <h3 className="text-[13px] font-medium text-on-surface mb-2">Add Member</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="flex-1 h-[36px] px-3 border border-outline-variant rounded-md bg-surface-container-lowest text-[14px] text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                />
                <button type="button" className="h-[36px] px-4 bg-surface text-on-surface text-[14px] font-medium rounded-md hover:bg-surface-variant transition-colors border border-outline-variant">
                  Add
                </button>
              </div>
            </div>

          </form>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant mb-2">lock</span>
            <p className="text-[15px] text-on-surface-variant">You don't have permission to view this.</p>
            <p className="text-[13px] text-on-surface-variant mt-1">Contact your project admin.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
