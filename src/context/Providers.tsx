"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "./ToastContext";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
