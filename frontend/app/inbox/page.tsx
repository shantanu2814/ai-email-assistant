"use client";

import { useState } from "react";
import EmailCard, { Email } from "@/components/EmailCard";
import { SlidersHorizontal, CheckCheck } from "lucide-react";

const MOCK_EMAILS: Email[] = [
  {
    id: "1",
    sender: { name: "Sarah Jenkins", email: "sarah@acmecorp.com" },
    subject: "Q3 Product Roadmap Review & Next Steps",
    preview:
      "Hi team, I've updated the roadmap draft based on yesterday's strategy sync. Please review the key milestones before our Thursday call...",
    date: "10:42 AM",
    isUnread: true,
    isStarred: true,
    hasAttachment: true,
    aiCategory: "Action Required",
  },
  {
    id: "2",
    sender: { name: "Stripe Billing", email: "invoices@stripe.com" },
    subject: "Your monthly invoice for OpenAI API usage (#INV-9021)",
    preview:
      "Your receipt for May 2026 is ready. Total charged: $42.18 to card ending in 4021. You can download the full PDF breakdown in your dashboard.",
    date: "Yesterday",
    isUnread: false,
    isStarred: false,
    hasAttachment: true,
    aiCategory: "Invoice",
  },
  {
    id: "3",
    sender: { name: "David Chen", email: "david@techventures.io" },
    subject: "Quick intro call next week?",
    preview:
      "Loved seeing the recent demo of MailAI! Would love to spend 15 minutes catching up and discussing potential synergies with our portfolio...",
    date: "May 18",
    isUnread: true,
    isStarred: false,
    aiCategory: "Meeting",
  },
];

export default function InboxPage() {
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
  const [selectedEmailId, setSelectedEmailId] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "starred">("all");

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, isStarred: !email.isStarred } : email
      )
    );
  };

  const filteredEmails = emails.filter((email) => {
    if (activeTab === "unread") return email.isUnread;
    if (activeTab === "starred") return email.isStarred;
    return true;
  });

  return (
    <div className="flex-1 bg-[#0F172A] p-4 border-r border-slate-800 flex flex-col h-full select-none overflow-hidden">
      {/* Inbox Header Controls */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          Inbox
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-normal">
            {emails.length}
          </span>
        </h2>

        <div className="flex items-center gap-1 bg-[#1E293B] p-1 rounded-lg border border-slate-700/60">
          {(["all", "unread", "starred"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Email List Feed */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {filteredEmails.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No emails found in this view.
          </div>
        ) : (
          filteredEmails.map((email) => (
            <EmailCard
              key={email.id}
              email={email}
              isSelected={selectedEmailId === email.id}
              onSelect={(id) => setSelectedEmailId(id)}
              onToggleStar={toggleStar}
            />
          ))
        )}
      </div>
    </div>
  );
}
