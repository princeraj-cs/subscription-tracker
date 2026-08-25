import React from "react";

export default function ServiceLogo({ name, iconId, size = "md", className = "" }) {
  const normalized = (iconId || name || "").toLowerCase().trim();

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-16 h-16 text-lg",
  }[size] || "w-11 h-11 text-sm";

  // SVG Logos
  if (normalized.includes("netflix")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-black flex items-center justify-center p-2 shadow-lg border border-red-500/20 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M5 2h3.5v20H5V2z" fill="#E50914" />
          <path d="M15.5 2H19v20h-3.5V2z" fill="#E50914" />
          <path d="M5 2l10.5 20H19L8.5 2H5z" fill="#B81D24" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("youtube")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-red-600/10 flex items-center justify-center p-2 shadow-lg border border-red-500/30 ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-red-600">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </div>
    );
  }

  if (normalized.includes("spotify")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-black flex items-center justify-center p-2 shadow-lg border border-emerald-500/30 ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#1DB954]">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306a.753.753 0 0 1-1.037.25c-2.836-1.733-6.406-2.125-10.612-1.164a.753.753 0 1 1-.334-1.468c4.604-1.05 8.563-.61 11.733 1.345.362.222.476.7.25 1.037zm1.465-3.259a.94.94 0 0 1-1.294.31c-3.246-1.996-8.196-2.573-12.036-1.407a.94.94 0 1 1-.55-1.8c4.388-1.332 9.843-.69 13.57 1.603.42.258.553.813.31 1.294zm.126-3.395C15.19 8.31 8.766 8.096 5.102 9.21a1.13 1.13 0 1 1-.659-2.162c4.225-1.285 11.317-1.037 15.787 1.616a1.13 1.13 0 0 1-1.149 1.988z"/>
        </svg>
      </div>
    );
  }

  if (normalized.includes("disney")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-[#091533] flex items-center justify-center p-2 shadow-lg border border-blue-400/30 ${className}`}>
        <span className="font-extrabold text-blue-300 tracking-tighter text-sm">D+</span>
      </div>
    );
  }

  if (normalized.includes("apple")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-zinc-900 flex items-center justify-center p-2 shadow-lg border border-zinc-700 ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-zinc-100">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.62-2.66 1.37-.56.65-.99 1.7-.85 2.72 1.04.08 2.01-.52 2.59-1.22z"/>
        </svg>
      </div>
    );
  }

  if (normalized.includes("amazon") || normalized.includes("prime")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-[#001E2B] flex items-center justify-center p-2 shadow-lg border border-sky-500/30 ${className}`}>
        <span className="font-extrabold text-[#00A8E1] tracking-tighter text-xs">prime</span>
      </div>
    );
  }

  if (normalized.includes("chatgpt") || normalized.includes("openai")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-[#0e3b33] flex items-center justify-center p-2 shadow-lg border border-teal-500/30 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-[#10A37F]">
          <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
          <path d="M12 8v8M8 12h8" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }

  if (normalized.includes("github")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-zinc-900 flex items-center justify-center p-2 shadow-lg border border-zinc-700 ${className}`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("google")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-white flex items-center justify-center p-2 shadow-lg border border-slate-200 ${className}`}>
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
        </svg>
      </div>
    );
  }

  if (normalized.includes("notion")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-white flex items-center justify-center p-2 shadow-lg border border-slate-300 ${className}`}>
        <span className="font-serif font-black text-black text-base">N</span>
      </div>
    );
  }

  if (normalized.includes("figma")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-zinc-900 flex items-center justify-center p-2 shadow-lg border border-purple-500/30 ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M8 2h4v4H8a2 2 0 0 1-2-2 2 2 0 0 1 2-2z" fill="#F24E1E"/>
          <path d="M12 2h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-4V2z" fill="#FF7262"/>
          <path d="M12 6h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-4V6z" fill="#1ABCFE"/>
          <path d="M8 6h4v4H8a2 2 0 0 1-2-2 2 2 0 0 1 2-2z" fill="#A259FF"/>
          <path d="M8 10h4v4H8a2 2 0 0 1-2-2 2 2 0 0 1 2-2z" fill="#0ACF83"/>
          <path d="M8 14h4v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2z" fill="#0ACF83"/>
        </svg>
      </div>
    );
  }

  if (normalized.includes("discord")) {
    return (
      <div className={`${sizeClasses} rounded-xl bg-[#5865F2]/20 flex items-center justify-center p-2 shadow-lg border border-[#5865F2]/40 ${className}`}>
        <span className="font-extrabold text-[#5865F2] text-xs">DISC</span>
      </div>
    );
  }

  // Fallback initial badge
  const initial = (name || "S").charAt(0).toUpperCase();
  return (
    <div className={`${sizeClasses} rounded-xl bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/30 flex items-center justify-center font-bold text-violet-300 shadow-md ${className}`}>
      {initial}
    </div>
  );
}
