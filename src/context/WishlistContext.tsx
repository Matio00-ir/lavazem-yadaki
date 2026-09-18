"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useToast } from "./ToastContext";

interface WishlistContextValue {
  ids: string[];
  isWishlisted: (productId: string) => boolean;
  toggle: (productId: string, productName?: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "autoparts_wishlist_v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      if (raw) setIds(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids, hydrated]);

  const isWishlisted = (productId: string) => ids.includes(productId);

  const toggle = (productId: string, productName?: string) => {
    setIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`${productName ?? "محصول"} از علاقه‌مندی‌ها حذف شد`, "info");
        return prev.filter((id) => id !== productId);
      }
      showToast(`${productName ?? "محصول"} به علاقه‌مندی‌ها افزوده شد`, "success");
      return [...prev, productId];
    });
  };

  return (
    <WishlistContext.Provider value={{ ids, isWishlisted, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
