"use client";

import { useState } from "react";
import {
  X,
  Sparkles,
  Paperclip,
  Send,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  Trash2,
  Wand2,
} from "lucide-react";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTo?: string;
  initialSubject?: string;
}

export default function ComposeModal({
  isOpen,
  onClose,
  initialTo = "",
  initialSubject = "",
}: ComposeModalProps) {
  const [to, setTo] = useState(initialTo);
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState("");
  
  // AI Assist Modal state
  const [showAiPrompt, setShowAiPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleAiGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setBody((prev) => {
        const generatedText = `Hi there,\n\nFollowing up on our earlier discussion regarding "${aiPrompt}". I wanted to outline our recommended action items and next steps for the coming sprint.\n\nPlease let me know your thoughts or if you'd like to jump on a quick sync.\n\nBest regards,\nJohn`;
        return prev ? `${prev}\n\n${generatedText}` : generatedText;
      });
      setIsGenerating(false);
      setShowAiPrompt(false);
      setAiPrompt("");
    }, 800);
  };

  const handleSend = () => {
    if (!to.trim()) {
      alert("Please enter a recipient email address.");
      return;
    }
    // Handle email sending logic
    alert(`Email sent to ${to}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="w-full sm:max-w-2xl bg-[#0F172A] border border-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] text-[#F8FAFC]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-[#1E293B]/60 rounded-t-2xl">
          <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
            <span>New Message</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs Section */}
        <div className="p-4 space-y-3 border-b border-slate-800/80 text-xs">
          {/* Recipient Input */}
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
            <span className="text-slate-400 w-12 font-medium">To:</span>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none"
            />
            {!showCcBcc && (
              <button
                type="button"
                onClick={() => setShowCcBcc(true)}
                className="text-slate-400 hover:text-blue-400 text-[11px] font-medium"
              >
                Cc / Bcc
              </button>
            )}
          </div>

          {/* Optional CC/BCC Fields */}
          {showCcBcc && (
            <>
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-slate-400 w-12 font-medium">Cc:</span>
                <input
                  type="email"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="cc@example.com"
                  className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-slate-400 w-12 font-medium">Bcc:</span>
                <input
                  type="email"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  placeholder="bcc@example.com"
                  className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Subject Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-slate-400 w-12 font-medium">Subject:</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject..."
              className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-sm font-medium"
            />
          </div>
        </div>

        {/* AI Assist Input Drawer Overlay */}
        {showAiPrompt && (
          <form
            onSubmit={handleAiGenerate}
            className="p-3 bg-blue-950/40 border-b border-blue-500/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Prompt AI to draft email (e.g. 'Polite follow-up on project timeline')"
              className="flex-1 bg-slate-900/80 text-xs text-slate-200 placeholder-slate-400 px-3 py-1.5 rounded-lg border border-blue-500/30 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
            >
              {isGenerating ? "Drafting..." : "Generate"}
            </button>
            <button
              type="button"
              onClick={() => setShowAiPrompt(false)}
              className="p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Email Body TextArea */}
        <div className="flex-1 p-4 min-h-[220px]">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your email here..."
            className="w-full h-full bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Rich Text Toolbar & Actions Footer */}
        <div className="p-3 border-t border-slate-800 bg-[#1E293B]/40 flex items-center justify-between rounded-b-2xl">
          {/* Formatting Options */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowAiPrompt(!showAiPrompt)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-medium transition-colors mr-2"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>AI Assist</span>
            </button>

            <div className="hidden sm:flex items-center gap-0.5 border-l border-slate-800 pl-2">
              <button title="Bold" className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200">
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button title="Italic" className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200">
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button title="Underline" className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200">
                <Underline className="w-3.5 h-3.5" />
              </button>
              <button title="List" className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200">
                <List className="w-3.5 h-3.5" />
              </button>
              <button title="Attach File" className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200">
                <Paperclip className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Send & Trash Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
              title="Discard draft"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleSend}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
