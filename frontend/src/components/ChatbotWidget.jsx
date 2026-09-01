import { useState } from "react";
import { MessageCircle, Send, X, Bot, Loader2 } from "lucide-react";
import { api } from "../services/api";

const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "Hi! I can help you review subscriptions, spot waste, and answer questions about your spending.",
  },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await api.askChatbot(trimmed);
      const botReply =
        response?.data?.answer ||
        "I’m not sure about that right now. Please try asking again.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botReply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: error.message || "Something went wrong while contacting the assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="mb-3 w-[340px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-violet-500/30 bg-slate-950/95 shadow-2xl shadow-violet-900/30 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 bg-gradient-to-r from-violet-600/20 via-indigo-500/10 to-slate-900 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Subscription AI</p>
                <p className="text-[10px] text-slate-400">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Close chatbot"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex h-[360px] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-950/60 p-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.sender === "user"
                        ? "bg-violet-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-800 px-3 py-2 text-sm text-slate-200">
                    <Loader2 className="h-4 w-4 animate-spin text-violet-400" />
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 bg-slate-950/90 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder="Ask about your subscriptions..."
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition focus:border-violet-500"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-violet-900/40 transition hover:scale-105"
        aria-label="Toggle chatbot"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
