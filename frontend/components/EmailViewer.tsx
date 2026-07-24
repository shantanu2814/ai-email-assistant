"use client";

import { 
  Reply, 
  ReplyAll, 
  Forward, 
  Trash2, 
  Archive, 
  Star, 
  Paperclip, 
  Download, 
  MoreVertical,
  CornerUpLeft,
  Clock
} from "lucide-react";

export interface Attachment {
  name: string;
  size: string;
  type: string;
}

export interface DetailedEmail {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  to: string;
  date: string;
  isStarred: boolean;
  body: string;
  attachments?: Attachment[];
}

interface EmailViewerProps {
  email?: DetailedEmail | null;
  onQuickReply?: () => void;
}

// Fallback sample email if none selected
const SAMPLE_EMAIL: DetailedEmail = {
  id: "1",
  subject: "Q3 Product Roadmap Review & Next Steps",
  sender: {
    name: "Sarah Jenkins",
    email: "sarah@acmecorp.com",
  },
  to: "me (john@example.com)",
  date: "May 22, 2026 at 10:42 AM",
  isStarred: true,
  body: `Hi John,

I've updated the Q3 roadmap draft based on yesterday's strategy sync. We've shifted our primary focus toward accelerating the AI Copilot integration for enterprise accounts, as requested by the executive team.

Key changes in this draft:
1. Advanced Context Parsing: Expanded AI context window for long email threads.
2. Custom Prompt Shortcuts: User-defined quick reply templates.
3. Automated Action Item Extraction: Real-time task syncing with Jira & Linear.

Please review the attached PDF spec before our Thursday call. Let me know if you have any questions or if we need to adjust the timelines!

Best regards,
Sarah Jenkins
Head of Product | Acme Corp`,
  attachments: [
    { name: "Q3_Roadmap_Draft_v2.pdf", size: "2.4 MB", type: "pdf" },
    { name: "Sync_Notes_May2026.docx", size: "840 KB", type: "doc" },
  ],
};

export default function EmailViewer({ email = SAMPLE_EMAIL, onQuickReply }: EmailViewerProps) {
  const currentEmail = email || SAMPLE_EMAIL;

  return (
    <div className="flex-1 bg-[#0F172A] flex flex-col h-full text-[#F8FAFC] border-r border-slate-800 select-none overflow-hidden">
      {/* Top Action Toolbar */}
      <div className="h-14 px-6 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <button 
            title="Archive" 
            className="p-2 hover:bg-[#1E293B] rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Archive className="w-4 h-4" />
          </button>
          <button 
            title="Delete" 
            className="p-2 hover:bg-[#1E293B] rounded-lg text-slate-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-800 mx-1" />
          <button 
            title="Star email" 
            className="p-2 hover:bg-[#1E293B] rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
          >
            <Star className={`w-4 h-4 ${currentEmail.isStarred ? "fill-amber-400 text-amber-400" : ""}`} />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={onQuickReply}
            title="Reply" 
            className="p-2 hover:bg-[#1E293B] rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Reply className="w-4 h-4" />
          </button>
          <button 
            title="Reply All" 
            className="p-2 hover:bg-[#1E293B] rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ReplyAll className="w-4 h-4" />
          </button>
          <button 
            title="Forward" 
            className="p-2 hover:bg-[#1E293B] rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Forward className="w-4 h-4" />
          </button>
          <button 
            title="More options" 
            className="p-2 hover:bg-[#1E293B] rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Email Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {/* Email Subject */}
        <div>
          <h1 className="text-xl font-bold text-slate-100 leading-snug">
            {currentEmail.subject}
          </h1>
        </div>

        {/* Sender Info Card */}
        <div className="flex items-start justify-between bg-[#1E293B]/60 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center text-sm">
              {currentEmail.sender.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200 text-sm">
                  {currentEmail.sender.name}
                </span>
                <span className="text-xs text-slate-400">
                  &lt;{currentEmail.sender.email}&gt;
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                To: <span className="text-slate-300">{currentEmail.to}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{currentEmail.date}</span>
          </div>
        </div>

        {/* Email Body Text */}
        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-normal space-y-4 pt-2">
          {currentEmail.body}
        </div>

        {/* Attachments Section */}
        {currentEmail.attachments && currentEmail.attachments.length > 0 && (
          <div className="border-t border-slate-800 pt-5 mt-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-3">
              <Paperclip className="w-3.5 h-3.5" />
              <span>{currentEmail.attachments.length} Attachments</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentEmail.attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-[#1E293B] border border-slate-700/60 rounded-xl hover:border-slate-600 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold uppercase">
                      {file.type}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-200 truncate">
                        {file.name}
                      </p>
                      <p className="text-[11px] text-slate-400">{file.size}</p>
                    </div>
                  </div>

                  <button 
                    title="Download attachment" 
                    className="p-1.5 text-slate-400 hover:text-blue-400 rounded-lg group-hover:bg-slate-700/50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Reply Bar Bottom Action */}
        <div className="pt-4 border-t border-slate-800/80">
          <button
            onClick={onQuickReply}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1E293B] border border-slate-700 hover:border-blue-500/60 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-all"
          >
            <CornerUpLeft className="w-4 h-4 text-blue-400" />
            <span>Click here to Reply...</span>
          </button>
        </div>
      </div>
    </div>
  );
}
