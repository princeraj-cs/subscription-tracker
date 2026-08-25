import React, { useState } from "react";
import { X, Sparkles, AlertCircle, Check } from "lucide-react";
import { POPULAR_SERVICES, CATEGORIES, CURRENCIES, FREQUENCIES } from "../constants/services";
import ServiceLogo from "./ServiceLogo";
import { api } from "../services/api";

export default function AddSubscriptionModal({ isOpen, onClose, onSubscriptionAdded }) {
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    currency: "USD",
    frequency: "monthly",
    category: "entertainment",
    paymentMethod: "Credit Card",
    startDate: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSelectService = (service) => {
    setSelectedService(service.id);
    setFormData((prev) => ({
      ...prev,
      name: service.name,
      price: service.defaultPrice,
      currency: service.currency || "USD",
      frequency: service.frequency || "monthly",
      category: service.category || "entertainment",
      paymentMethod: service.paymentMethod || "Credit Card",
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.name.trim()) throw new Error("Subscription name is required");
      if (!formData.price || Number(formData.price) <= 0) throw new Error("Valid price is required");
      if (!formData.startDate) throw new Error("Start date is required");

      const payload = {
        name: formData.name.trim(),
        price: Number(formData.price),
        currency: formData.currency,
        frequency: formData.frequency,
        category: formData.category,
        paymentMethod: formData.paymentMethod.trim() || "Credit Card",
        startDate: new Date(formData.startDate).toISOString(),
      };

      const res = await api.createSubscription(payload);
      if (res?.data) {
        onSubscriptionAdded(res.data);
        onClose();
        // Reset form
        setSelectedService(null);
        setFormData({
          name: "",
          price: "",
          currency: "USD",
          frequency: "monthly",
          category: "entertainment",
          paymentMethod: "Credit Card",
          startDate: new Date().toISOString().split("T")[0],
        });
      }
    } catch (err) {
      setError(err.message || "Failed to create subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-100">Add New Subscription</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Quick Select Popular Services */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Popular Services (Click to Auto-fill)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {POPULAR_SERVICES.slice(0, 12).map((service) => {
                const isSelected = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleSelectService(service)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border text-center transition-all duration-200 ${
                      isSelected
                        ? "bg-violet-600/20 border-violet-500 shadow-md shadow-violet-500/20 ring-1 ring-violet-400"
                        : "bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600"
                    }`}
                  >
                    <ServiceLogo name={service.name} iconId={service.icon} size="sm" />
                    <span className="text-[11px] font-medium text-slate-300 truncate w-full">
                      {service.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Details */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Subscription Name *
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0">
                    <ServiceLogo name={formData.name} size="sm" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Netflix, Spotify, Gym"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setSelectedService(null);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm"
                  />
                </div>
              </div>

              {/* Price & Currency */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Price & Currency *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="14.99"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm"
                  />
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-violet-500"
                  >
                    {CURRENCIES.map((curr) => (
                      <option key={curr} value={curr}>
                        {curr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Billing Frequency *
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-violet-500"
                >
                  {FREQUENCIES.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-violet-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Payment Method *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Credit Card, PayPal, Apple Pay"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 text-sm"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-violet-600/30 flex items-center gap-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>Save Subscription</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
