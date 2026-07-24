"use client";

import { useState, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, X, Clock, Sparkles, Filter } from "lucide-react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const RECENT_SEARCHES = [
  "from:Sarah roadmap",
  "invoice May 2026",
  "has:attachment",
  "ai copilot updates",
];

const SEARCH_FILTERS = [
  { label: "Unread", query: "is:unread" },
  { label: "Starred", query: "is:starred" },
  { label: "Has Attachment", query: "has:attachment" },
  { label: "AI Action Items", query: "label:action-required" },
];

export default function SearchBar({
  onSearch,
  placeholder = "Search emails, contacts, or AI insights... (Ctrl+K)",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard Shortcut (Ctrl+K or Cmd+K) listener to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && isFocused) {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused]);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (onSearch) onSearch(text);
  };

  const handleClear = () => {
    setQuery("");
    setActiveFilter(null);
    if (onSearch) onSearch("");
    inputRef.current?.focus();
  };

  const handleSelectFilter = (filterQuery: string) => {
    const newQuery = query ? `${query} ${filterQuery}` : filterQuery;
    setQuery(newQuery);
    setActiveFilter(filterQuery);
    if (onSearch) onSearch(newQuery);
  };

  return (
    <div className="relative flex-1 max-w-xl select-none">
      {/* Search Input Container */}
      <div
        className={`relative flex items-center bg-[#1E293B] rounded-xl border transition-all ${
          isFocused
            ? "border-blue-500 ring-1 ring-blue-500 shadow-lg shadow-blue-500/10"
            : "border-slate-700/60 hover:border-slate-600"
        }`}
      >
        <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // delay to allow clicks in dropdown
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-xs sm:text-sm text-slate-200 placeholder-slate-400 pl-10 pr-16 py-2 rounded-xl focus:outline-none"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 text-slate-400 hover:text-slate-200 rounded transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            className="text-slate-400 hover:text-slate-200 p-1"
            title="Search filters"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Autocomplete & Filter Dropdown Overlay */}
      {isFocused && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-[#1E293B] border border-slate-700/80 rounded-xl shadow-2xl z-50 p-3 space-y-3">
          {/* Quick Filter Tags */}
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter by
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SEARCH_FILTERS.map((f) => (
                <button
                  key={f.query}
                  type="button"
                  onClick={() => handleSelectFilter(f.query)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                    activeFilter === f.query
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-[#0F172A] text-slate-300 border-slate-700/60 hover:border-slate-500"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          {!query && (
            <div className="border-t border-slate-800 pt-2.5">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Recent Searches
              </p>
              <div className="space-y-1">
                {RECENT_SEARCHES.map((recent, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQueryChange(recent)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 flex items-center justify-between transition-colors group"
                  >
                    <span>{recent}</span>
                    <Sparkles className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
