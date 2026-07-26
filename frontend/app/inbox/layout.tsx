import type { Metadata } from "next";
import "./globals.css"; // 👈 Crucial: Imports Tailwind CSS across your app

export const metadata: Metadata = {
  title: "MailAI — AI Email Assistant",
  description: "Smart email management powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0F172A] text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}