"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

interface ToastItem {
  id: number;
  message: string;
  tone: "success" | "info" | "danger";
}

interface ToastContextValue {
  showToast: (message: string, tone?: ToastItem["tone"]) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((message: string, tone: ToastItem["tone"] = "success") => {
    idRef.current += 1;
    const id = idRef.current;
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-fade-up pointer-events-auto flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium shadow-[var(--shadow-pop)] ${
              t.tone === "success"
                ? "bg-[var(--color-ink)] text-white"
                : t.tone === "danger"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-ink)] text-white"
            }`}
          >
            {t.tone === "success" && (
              <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[var(--color-success)]" fill="currentColor">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.3 9.5a1 1 0 1 1 1.4-1.4l3.6 3.6 6.7-6.7a1 1 0 0 1 1.4.3Z" clipRule="evenodd" />
              </svg>
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
