"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/data/products";
import { useToast } from "./ToastContext";

interface CartLine {
  productId: string;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  totalCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "autoparts_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = (productId: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...prev, { productId, qty }];
    });
    const product = products.find((p) => p.id === productId);
    showToast(`${product?.name ?? "محصول"} به سبد خرید افزوده شد`, "success");
  };

  const removeItem = (productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    setLines((prev) => prev.map((l) => (l.productId === productId ? { ...l, qty } : l)));
  };

  const clear = () => setLines([]);

  const totalCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const product = products.find((p) => p.id === l.productId);
        return sum + (product ? product.price * l.qty : 0);
      }, 0),
    [lines],
  );

  return (
    <CartContext.Provider
      value={{ lines, addItem, removeItem, updateQty, clear, totalCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
