import React from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, Sparkles, User, CreditCard } from "lucide-react";

export default function Navbar({ onOpenAddModal }) {
  const { user, logoutUser } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-pink-500 p-0.5 shadow-lg shadow-violet-600/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-violet-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-violet-400 via-indigo-200 to-pink-300 bg-clip-text text-transparent">
              SubFlow
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
              Pro Tracker
            </span>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-violet-200" />
            <span className="hidden sm:inline">Add Subscription</span>
            <span className="sm:hidden">Add</span>
          </button>

          {/* User profile dropdown/badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-violet-300">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4 text-slate-400" />}
            </div>
            <span className="hidden md:inline text-sm font-medium text-slate-300 max-w-[120px] truncate">
              {user?.name || "User"}
            </span>

            <button
              onClick={logoutUser}
              title="Log out"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
