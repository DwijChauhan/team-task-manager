import React, { useState, useEffect } from "react";

type CreateTaskPanelProps = {
  isAdmin: boolean;
  onClose: () => void;
  onSubmit: (task: any) => Promise<void>;
};

export default function CreateTaskPanel({ isAdmin, onClose, onSubmit }: CreateTaskPanelProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("Unassigned");
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);

  // Esc to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    await onSubmit({ title, description, priority, assignee, notifyWhatsApp });
    setLoading(false);
    onClose();
  };

  const priorities = [
    { name: "Low", color: "var(--color-green-text)" },
    { name: "Medium", color: "var(--color-amber-text)" },
    { name: "High", color: "var(--color-red-text)" },
    { name: "Urgent", color: "var(--color-red-text)" }
  ];

  const members = [
    { name: "Unassigned", initials: "?", color: "var(--color-surface)", text: "var(--color-text-primary)" },
    { name: "Rahul Desai", initials: "RD", color: "var(--color-saffron-orange)", text: "#FFF" },
    { name: "Priya Singh", initials: "PS", color: "var(--color-electric-teal)", text: "#FFF" }
  ];

  return (
    <aside className="w-full lg:w-[380px] flex-shrink-0 bg-surface-container-lowest border-l border-outline-variant flex flex-col h-full z-40 absolute right-0 lg:static top-0 shadow-2xl">
      <div className="px-5 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
        <h2 className="text-[16px] font-h2 font-medium text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-[var(--color-electric-teal)]">add_task</span>
          {isAdmin ? "New Task" : "Task Details"}
        </h2>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-surface hover:text-on-surface transition-colors focus-ring-teal"
          title="Close (Esc)"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {isAdmin ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-on-surface-variant mb-1 uppercase tracking-wide">Task Title</label>
              <input
                autoFocus
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Finalize Q3 Marketing Budget"
                className="w-full h-10 px-3 border border-outline-variant rounded-md bg-surface text-[14px] text-on-surface placeholder:text-on-surface-variant focus-ring-teal transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-on-surface-variant mb-1 uppercase tracking-wide">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add context or acceptance criteria..."
                rows={3}
                className="w-full p-3 border border-outline-variant rounded-md bg-surface text-[14px] text-on-surface placeholder:text-on-surface-variant focus-ring-teal transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-on-surface-variant mb-1 uppercase tracking-wide">Priority</label>
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full h-10 pl-8 pr-8 border border-outline-variant rounded-md bg-surface text-[13px] font-medium text-on-surface focus-ring-teal appearance-none transition-all"
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
                <label className="block text-[12px] font-medium text-on-surface-variant mb-1 uppercase tracking-wide">Assignee</label>
                <div className="relative">
                  <select
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full h-10 pl-10 pr-8 border border-outline-variant rounded-md bg-surface text-[13px] font-medium text-on-surface focus-ring-teal appearance-none transition-all truncate"
                  >
                    {members.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                  </select>
                  <div 
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold pointer-events-none border border-outline-variant"
                    style={{ backgroundColor: members.find(m => m.name === assignee)?.color, color: members.find(m => m.name === assignee)?.text }}
                  >
                    {members.find(m => m.name === assignee)?.initials}
                  </div>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Integration Toggle */}
            <div className="mt-6 p-4 border border-outline-variant rounded-md bg-surface flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#25D366] text-[18px]">chat</span>
                </div>
                <div>
                  <h4 className="text-[13px] font-medium text-on-surface">Notify via WhatsApp</h4>
                  <p className="text-[11px] text-on-surface-variant">Send an instant alert to the assignee.</p>
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifyWhatsApp}
                  onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                />
                <div className="w-9 h-5 bg-outline-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-electric-teal)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-electric-teal)]"></div>
              </label>
            </div>

            <div className="pt-4 mt-6 border-t border-outline-variant">
              <button
                type="submit"
                disabled={loading || !title}
                className="w-full h-11 bg-[var(--color-electric-teal)] text-white font-medium text-[14px] rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 focus-ring-teal"
              >
                {loading ? <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> : "Create Task"}
              </button>
            </div>
            
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4 opacity-50">lock</span>
            <h3 className="text-[18px] font-h3 text-on-surface mb-2">Access Restricted</h3>
            <p className="text-[14px] text-on-surface-variant max-w-[250px]">
              You don't have permission to view or create tasks in this project. Please contact your workspace administrator.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
