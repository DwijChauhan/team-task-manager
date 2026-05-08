import React from "react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center">
      <i className="ti-lock material-symbols-outlined text-[32px] text-[#9A9A9A] mb-2">lock</i>
      <p className="text-[15px] text-[#6B6B6B]">You don't have permission to view this.</p>
      <p className="text-[13px] text-[#9A9A9A] mt-1">Contact your project admin.</p>
    </div>
  );
}
