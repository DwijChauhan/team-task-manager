"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function CreateButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-DEFAULT font-body-sm text-body-sm hover:brightness-110 transition-all shadow-sm"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        Create
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-outline-variant rounded-md shadow-lg py-1 z-50 animate-[slideIn_0.1s_ease-out]">
          <Link
            href="/projects"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">folder</span>
            New Project
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">task</span>
            New Task
          </Link>
          <div className="h-px bg-outline-variant/50 my-1"></div>
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">person_add</span>
            Invite Member
          </Link>
        </div>
      )}
    </div>
  );
}
