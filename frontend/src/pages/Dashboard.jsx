import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import Navbar from "../components/Navbar";
import ServiceLogo from "../components/ServiceLogo";
import AddSubscriptionModal from "../components/AddSubscriptionModal";
import { CATEGORIES, POPULAR_SERVICES } from "../constants/services";
import { 
  Plus, 
  DollarSign, 
  Layers, 
  Calendar, 
  TrendingUp, 
  Search, 
  Filter, 
  Sparkles,
  CreditCard,
  CheckCircle2,
  Clock,
  Trash2,
  AlertTriangle
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchSubscriptions = async () => {
    if (!user?._id) return;
    try {
      setLoading(true);
      const res = await api.getUserSubscriptions(user._id);
      if (res?.data) {
        setSubscriptions(res.data);
      }
    } catch (err) {
      console.error("Failed to load subscriptions:", err);
      setError(err.message || "Could not fetch subscriptions from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user?._id]);

  const handleSubscriptionAdded = (newSub) => {
    setSubscriptions((prev) => [newSub, ...prev]);
  };

  const handleDeleteSubscription = async (id) => {
    if (!confirm("Are you sure you want to delete this subscription?")) return;
    try {
      await api.deleteSubscription(id);
      setSubscriptions((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete subscription");
    }
  };

  // Calculate monthly total equivalent
  const totalMonthlySpend = subscriptions.reduce((acc, sub) => {
    const price = Number(sub.price) || 0;
    if (sub.frequency === "daily") return acc + price * 30;
    if (sub.frequency === "weekly") return acc + price * 4.33;
    if (sub.frequency === "yearly") return acc + price / 12;
    return acc + price; // monthly default
  }, 0);

  // Active count
  const activeCount = subscriptions.filter((s) => s.status !== "canceled" && s.status !== "expired").length;

  // Filter subscriptions
  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.paymentMethod?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || sub.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col">
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Stats Row */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, <span className="text-gradient">{user?.name || "Friend"}</span> 👋
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Here's a breakdown of your recurring subscriptions and spending.
              </p>
            </div>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Subscription</span>
            </button>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Monthly Total */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Est. Monthly Spend
                </span>
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-black text-white">
                  ${totalMonthlySpend.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 ml-1">/ month</span>
              </div>
              <div className="mt-2 text-xs text-violet-400 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>${(totalMonthlySpend * 12).toFixed(2)} / yr estimated</span>
              </div>
            </div>

            {/* Active Count */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Active Services
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-black text-white">{activeCount}</span>
                <span className="text-xs text-slate-400 ml-1.5">active subs</span>
              </div>
              <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <span>{subscriptions.length} total recorded</span>
              </div>
            </div>

            {/* Top Category */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Categories
                </span>
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-white capitalize">
                  {subscriptions.length > 0 ? subscriptions[0].category : "None"}
                </span>
              </div>
              <div className="mt-2 text-xs text-indigo-400 flex items-center gap-1 font-medium">
                <span>Across 5 categories</span>
              </div>
            </div>

            {/* Next Renewal */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Upcoming Renewal
                </span>
                <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-lg font-bold text-white truncate block">
                  {subscriptions.length > 0
                    ? new Date(subscriptions[0].renewalDate || subscriptions[0].startDate).toLocaleDateString()
                    : "No renewals"}
                </span>
              </div>
              <div className="mt-2 text-xs text-pink-400 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Auto-renew active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search subscriptions or payment method..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 text-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === "all"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
              }`}
            >
              All ({subscriptions.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = subscriptions.filter((s) => s.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                      : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>{cat.label}</span>
                  {count > 0 && <span className="opacity-75">({count})</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subscriptions Grid / Empty State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-4" />
            <p className="text-sm text-slate-400">Loading your subscriptions from database...</p>
          </div>
        ) : filteredSubscriptions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSubscriptions.map((sub) => {
              const renewal = sub.renewalDate ? new Date(sub.renewalDate) : null;
              return (
                <div
                  key={sub._id}
                  className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800/90 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3.5">
                        <ServiceLogo name={sub.name} size="md" />
                        <div>
                          <h3 className="font-bold text-base text-white tracking-tight">
                            {sub.name}
                          </h3>
                          <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>{sub.paymentMethod || "Credit Card"}</span>
                          </span>
                        </div>
                      </div>

                      {/* Price Badge */}
                      <div className="text-right">
                        <div className="text-lg font-black text-white">
                          ${Number(sub.price).toFixed(2)}
                        </div>
                        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                          /{sub.frequency || "mo"}
                        </span>
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 capitalize">
                        {sub.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {sub.status || "active"}
                      </span>
                    </div>
                  </div>

                  {/* Footer renewal info & actions */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Renews:</span>
                      <strong className="font-semibold text-slate-300 ml-1">
                        {renewal ? renewal.toLocaleDateString() : "Auto"}
                      </strong>
                    </span>
                    <button
                      onClick={() => handleDeleteSubscription(sub._id)}
                      title="Delete subscription"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state with popular recommendations */
          <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-slate-800 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600/20 to-pink-600/20 border border-violet-500/30 flex items-center justify-center mx-auto text-violet-400 shadow-xl">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-2">No Subscriptions Found</h3>
              <p className="text-sm text-slate-400">
                You haven't tracked any subscriptions yet. Click the button below or choose from popular services to get started!
              </p>
            </div>

            {/* Popular quick click options */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 block mb-3">
                Quick Add Popular Services
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                {POPULAR_SERVICES.slice(0, 6).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition duration-150"
                  >
                    <ServiceLogo name={service.name} iconId={service.icon} size="sm" className="w-5 h-5" />
                    <span>{service.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-violet-600/30 inline-flex items-center gap-2 transition hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Subscription</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Add Subscription Modal */}
      <AddSubscriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubscriptionAdded={handleSubscriptionAdded}
      />
    </div>
  );
}
