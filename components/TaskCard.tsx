import React from "react";

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
    initials?: string;
  };
  comments: number;
  attachments: number;
  tags: string[];
};

export default function TaskCard({ 
  task, 
  isSelected, 
  onDragStart, 
  onClick,
  isAdmin
}: { 
  task: Task, 
  isSelected: boolean, 
  onDragStart: React.DragEventHandler, 
  onClick: () => void,
  isAdmin: boolean
}) {
  const priorityColor = task.priority === 'High' ? 'var(--color-red-text)' : task.priority === 'Medium' ? 'var(--color-amber-text)' : '#6CA0DC';
  const isOverdue = task.dueDate === 'Today' || task.dueDate.includes('Overdue');

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={`bg-surface-container-lowest border border-outline-variant rounded-xl p-4 cursor-pointer transition-colors group relative hover:border-outline ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
    >
      <div 
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-md" 
        style={{ backgroundColor: priorityColor }}
      ></div>

      {isAdmin && (
        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-all bg-transparent border-none">
          <span className="material-symbols-outlined text-[16px]">delete</span>
        </button>
      )}

      <h4 className="font-body-base text-[14px] font-medium text-on-surface mb-1.5 pl-2 pr-4 leading-tight">
        {task.title}
      </h4>
      
      <p className={`font-body-sm text-[12px] pl-2 mb-4 line-clamp-2 ${task.description ? 'text-surface-tint' : 'text-on-surface-variant italic'}`}>
        {task.description || "No description"}
      </p>

      <div className="flex items-center flex-wrap gap-2 mt-auto pl-2">
        <div className="px-2 py-0.5 rounded-[4px] border border-outline-variant text-on-surface-variant text-[11px] font-medium flex items-center gap-1 bg-surface">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: priorityColor }}></span>
          {task.priority}
        </div>
        
        <div className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-[4px] border border-outline-variant bg-surface ${isOverdue ? 'text-error bg-error-container border-red-border' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined text-[12px]">{isOverdue ? 'schedule' : 'calendar_today'}</span>
          {task.dueDate}
        </div>

        {task.assignee.avatar ? (
          <img alt="Assignee" className="w-6 h-6 rounded-full border border-outline-variant ml-auto object-cover" src={task.assignee.avatar} />
        ) : (
          <div className="w-6 h-6 rounded-full bg-surface-variant text-on-surface flex items-center justify-center text-[10px] font-medium ml-auto border border-outline-variant">
            {task.assignee.initials || task.assignee.name.substring(0,2).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}
