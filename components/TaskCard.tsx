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
  const priorityColor = task.priority === 'High' ? '#E24B4A' : task.priority === 'Medium' ? '#BA7517' : '#378ADD';
  const isOverdue = task.dueDate === 'Today' || task.dueDate.includes('Overdue');

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={`bg-white border-[0.5px] border-[#0000001f] rounded-[12px] p-4 cursor-pointer transition-colors group relative hover:border-[#00000040] ${
        isSelected ? "ring-1 ring-[#1A1A1A]" : ""
      }`}
    >
      <div 
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-md" 
        style={{ backgroundColor: priorityColor }}
      ></div>

      {isAdmin && (
        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-[#9A9A9A] hover:text-[#E24B4A] transition-all bg-transparent border-none">
          <i className="ti-trash text-[14px] material-symbols-outlined">delete</i>
        </button>
      )}

      <h4 className="text-[14px] font-medium text-[#1A1A1A] mb-1.5 pl-2 pr-4 leading-tight">
        {task.title}
      </h4>
      
      <p className={`text-[12px] pl-2 mb-4 line-clamp-2 ${task.description ? 'text-[#6B6B6B]' : 'text-[#9A9A9A] italic'}`}>
        {task.description || "No description"}
      </p>

      <div className="flex items-center flex-wrap gap-2 mt-auto pl-2">
        <div className="px-2 py-0.5 rounded-[4px] border border-[#0000001f] text-[#6B6B6B] text-[11px] font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: priorityColor }}></span>
          {task.priority}
        </div>
        
        <div className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-[4px] border border-[#0000001f] ${isOverdue ? 'text-[#E24B4A] bg-[#FCEBEB] border-[#F7C1C1]' : 'text-[#6B6B6B]'}`}>
          <i className="ti-clock material-symbols-outlined text-[12px]">{isOverdue ? 'schedule' : 'calendar_today'}</i>
          {task.dueDate}
        </div>

        {task.assignee.avatar ? (
          <img alt="Assignee" className="w-5 h-5 rounded-full border border-[#0000001f] ml-auto" src={task.assignee.avatar} />
        ) : (
          <div className="w-5 h-5 rounded-full bg-[#EFEDE8] text-[#1A1A1A] flex items-center justify-center text-[9px] font-medium ml-auto border border-[#0000001f]">
            {task.assignee.initials || task.assignee.name.substring(0,2).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}
