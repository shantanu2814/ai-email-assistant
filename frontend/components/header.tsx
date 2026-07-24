"use client";

import { Search, SlidersHorizontal, Bell, Sparkles, Filter } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#0F172A] px-6 flex items-center justify-between text-[#F8FAFC] select-none sticky top-0 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search emails, contacts, or AI insights... (Ctrl+K)"
          className="w-full bg-[#1E293B] text-sm text-slate-200 placeholder-slate-400 pl-10 pr-10 py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
        <button 
          title="Search filters"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Right Side Quick Actions */}
      <div className="flex items-center gap-3">
        {/* AI Assistant Status Indicator */}
        <div className="hidden md:flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>AI Copilot Active</span>
        </div>

        {/* Quick Filter Toggle */}
        <button 
          title="Filter view"
          className="p-2 bg-[#1E293B] border border-slate-700/60 hover:bg-slate-700/50 rounded-lg text-slate-300 transition-colors"
        >
          <Filter className="w-4 h-4" />
        </button>

        {/* Notifications Button */}
        <button 
          title="Notifications"
          className="relative p-2 bg-[#1E293B] border border-slate-700/60 hover:bg-slate-700/50 rounded-lg text-slate-300 transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-[#0F172A]" />
        </button>
      </div>
    </header>
  );
}
