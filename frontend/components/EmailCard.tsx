"use client";

import { Star, Paperclip, Sparkles } from "lucide-react";

export interface Email {
  id: string;
  sender: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  subject: string;
  preview: string;
  date: string;
  isUnread: boolean;
  isStarred: boolean;
  hasAttachment?: boolean;
  aiCategory?: "Action Required" | "Meeting" | "Invoice" | "Newsletter" | "Personal";
}

interface EmailCardProps {
  email: Email;
  isSelected?: boolean;
  onSelect: (id: string) => void;
  onToggleStar: (id: string, e: React.MouseEvent) => void;
}

const categoryColors: Record<string, string> = {
  "Action Required": "bg-red-500/10 text-red-400 border-red-500/20",
  Meeting: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Invoice: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Newsletter: "bg-slate-700/50 text-slate-300 border-slate-600/30",
  Personal: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function EmailCard({
  email,
  isSelected,
  onSelect,
  onToggleStar,
}: EmailCardProps) {
  return (
    <div
      onClick={() => onSelect(email.id)}
      className={`group relative p-4 rounded-xl border transition-all cursor-pointer select-none ${
        isSelected
          ? "bg-[#1E293B] border-blue-500/50 shadow-md shadow-blue-500/5"
          : email.isUnread
          ? "bg-[#1E293B]/80 border-slate-700/60 hover:border-slate-600"
          : "bg-[#0F172A]/40 border-slate-800/80 hover:bg-[#1E293B]/40 hover:border-slate-700/50"
      }`}
    >
      {/* Unread Left Border Accent */}
      {email.isUnread && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
      )}

      <div className="flex items-start justify-between gap-3 mb-1.5">
        {/* Sender Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-semibold text-slate-200 flex-shrink-0">
            {email.sender.name.charAt(0)}
          </div>
          <span
            className={`text-sm truncate ${
              email.isUnread ? "font-semibold text-slate-100" : "font-medium text-slate-300"
            }`}
          >
            {email.sender.name}
          </span>
        </div>

        {/* Date & Star Toggle */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-slate-400">{email.date}</span>
          <button
            onClick={(e) => onToggleStar(email.id, e)}
            className="text-slate-500 hover:text-amber-400 transition-colors p-0.5"
            title={email.isStarred ? "Unstar" : "Star"}
          >
            <Star
              className={`w-4 h-4 ${
                email.isStarred ? "fill-amber-400 text-amber-400" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Subject Line */}
      <h4
        className={`text-sm mb-1 truncate ${
          email.isUnread ? "font-semibold text-slate-100" : "text-slate-200"
        }`}
      >
        {email.subject}
      </h4>

      {/* Preview Body */}
      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
        {email.preview}
      </p>

      {/* Badges Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {email.aiCategory && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                categoryColors[email.aiCategory] || "bg-slate-800 text-slate-400"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              {email.aiCategory}
            </span>
          )}
        </div>

        {email.hasAttachment && (
          <span className="text-slate-400 flex items-center gap-1 text-[11px]" title="Has Attachment">
            <Paperclip className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </div>
  );
}
