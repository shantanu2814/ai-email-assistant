"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Inbox, 
  Send, 
  FileText, 
  Star, 
  Bot, 
  Settings, 
  LayoutDashboard, 
  SquarePen 
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inbox", href: "/inbox", icon: Inbox, badge: 12 },
  { label: "Sent", href: "/sent", icon: Send },
  { label: "Drafts", href: "/drafts", icon: FileText, badge: 2 },
  { label: "Starred", href: "/starred", icon: Star },
  { label: "AI Assistant", href: "/ai-assistant", icon: Bot },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ onOpenCompose }: { onOpenCompose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#0F172A] border-r border-slate-800 text-[#F8FAFC] flex flex-col justify-between p-4 select-none">
      {/* Top Branding & Navigation */}
      <div className="space-y-6">
        {/* App Logo */}
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">MailAI</h1>
            <span className="text-xs text-slate-400">Smart Assistant</span>
          </div>
        </div>

        {/* Compose Button */}
        <button
          onClick={onOpenCompose}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-98"
        >
          <SquarePen className="w-4 h-4" />
          <span>Compose</span>
        </button>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#1E293B] text-blue-400"
                    : "text-slate-400 hover:bg-[#1E293B]/60 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="border-t border-slate-800 pt-4 flex items-center gap-3 px-2">
        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-semibold text-slate-200 border border-slate-700">
          JD
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-200 truncate">John Doe</p>
          <p className="text-xs text-slate-400 truncate">john@example.com</p>
        </div>
      </div>
    </aside>
  );
}
