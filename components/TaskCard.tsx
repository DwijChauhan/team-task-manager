import React from "react";
import { formatDateIN } from "../utils/formatters";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "Low" | "Medium" | "High" | "Urgent";
  dueDate: string;
  assignee: {
    name: string;
    avatar: string;
    initials?: string;
  };
  comments: number;
  attachments: number;
  tags: string[];
  subtasks?: { completed: number; total: number };
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
  const getPriorityColors = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-error-container text-error border-red-border';
      case 'High': return 'bg-surface-bright text-error border-error-container';
      case 'Medium': return 'bg-surface-bright text-amber-text border-amber-border';
      case 'Low': return 'bg-surface-bright text-green-text border-green-border';
      default: return 'bg-surface-bright text-on-surface-variant border-outline-variant';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'var(--color-red-text)';
      case 'High': return 'var(--color-red-text)';
      case 'Medium': return 'var(--color-amber-text)';
      case 'Low': return 'var(--color-green-text)';
      default: return 'var(--color-text-muted)';
    }
  };

  const isOverdue = task.dueDate === 'Today' || task.dueDate.includes('Overdue');
  const formattedDate = formatDateIN(task.dueDate);

  // Default subtasks if none provided
  const subtasks = task.subtasks || { completed: Math.floor(Math.random() * 3), total: 3 };
  const subtaskProgress = (subtasks.completed / subtasks.total) * 100;

  return (
    <div
      draggable
      tabIndex={0}
      onDragStart={onDragStart}
      onClick={onClick}
      className={`bg-surface-container-lowest border rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all duration-200 group relative hover:border-outline hover:shadow-md focus-ring-teal min-h-[140px] flex flex-col ${
        isSelected ? "border-[var(--color-electric-teal)] ring-1 ring-[var(--color-electric-teal)]" : "border-outline-variant"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        {/* Priority Badge */}
        <div className={`px-2 py-1 rounded-[4px] border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${getPriorityColors(task.priority)}`}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getPriorityDot(task.priority) }}></span>
          {task.priority}
        </div>

        {isAdmin && (
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error hover:bg-error-container transition-all focus-ring-teal"
            aria-label="Delete Task"
            onClick={(e) => { e.stopPropagation(); /* delete logic */ }}
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        )}
      </div>

      <h4 className="font-h3 text-[14px] font-medium text-on-surface mb-1.5 leading-snug break-words">
        {task.title}
      </h4>
      
      {task.description && (
        <p className="font-body-sm text-[12px] mb-3 line-clamp-2 text-on-surface-variant">
          {task.description}
        </p>
      )}

      <div className="mt-auto">
        {/* Subtask Progress */}
        {subtasks.total > 0 && (
          <div className="mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">check_box</span>
            <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--color-electric-teal)] transition-all" 
                style={{ width: `${subtaskProgress}%` }}
              ></div>
            </div>
            <span className="text-[11px] font-medium text-on-surface-variant">{subtasks.completed}/{subtasks.total}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-surface-bright">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1 text-[11px] font-medium ${isOverdue ? 'text-error' : 'text-on-surface-variant'}`}>
              <span className="material-symbols-outlined text-[14px]">{isOverdue ? 'schedule' : 'calendar_today'}</span>
              {formattedDate}
            </div>
            
            <div className="flex items-center gap-2 text-on-surface-variant">
              {(task.attachments > 0 || Math.random() > 0.5) && (
                <div className="flex items-center gap-0.5 text-[11px] font-medium" title="Attachments">
                  <span className="material-symbols-outlined text-[14px]">attach_file</span>
                  {task.attachments || 2}
                </div>
              )}
              {task.comments > 0 && (
                <div className="flex items-center gap-0.5 text-[11px] font-medium" title="Comments">
                  <span className="material-symbols-outlined text-[14px]">chat_bubble_outline</span>
                  {task.comments}
                </div>
              )}
            </div>
          </div>

          {task.assignee.avatar ? (
            <img alt="Assignee" className="w-7 h-7 rounded-full border border-surface-bright object-cover" src={task.assignee.avatar} />
          ) : (
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border border-surface-bright text-white"
              style={{ backgroundColor: 'var(--color-saffron-orange)' }}
            >
              {task.assignee.initials || task.assignee.name.substring(0,2).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
