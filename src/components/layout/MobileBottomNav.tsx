"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toFaDigits } from "@/lib/format";

const items = [
  {
    href: "/",
    label: "خانه",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6}>
        <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/products",
    label: "محصولات",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6}>
        <rect x="4" y="4" width="7" height="7" rx="1.4" />
        <rect x="13" y="4" width="7" height="7" rx="1.4" />
        <rect x="4" y="13" width="7" height="7" rx="1.4" />
        <rect x="13" y="13" width="7" height="7" rx="1.4" />
      </svg>
    ),
  },
  {
    href: "/vehicle",
    label: "خودرو من",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6}>
        <path d="M5 12.5 6.4 8a2 2 0 0 1 1.9-1.4h7.4A2 2 0 0 1 17.6 8l1.4 4.5M4 15.5h16" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="15.5" r="1.6" />
        <circle cx="16" cy="15.5" r="1.6" />
      </svg>
    ),
  },
  {
    href: "/wishlist",
    label: "علاقه‌مندی",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6}>
        <path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8 2 4.7 5.2 4.1c2-.4 3.8.6 4.8 2.2 1-1.6 2.8-2.6 4.8-2.2 3.2.6 4.6 3.9 3 7.3-2.3 4.5-9.8 9.1-9.8 9.1Z" />
      </svg>
    ),
  },
  {
    href: "/cart",
    label: "سبد خرید",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="h-5.5 w-5.5" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6}>
        <path d="M4 4h1.6l.9 3.2M6.5 7.2h13a1 1 0 0 1 1 1.25l-1.3 5.6a1.5 1.5 0 0 1-1.46 1.15H8.4a1.5 1.5 0 0 1-1.46-1.15L4.8 5.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1.3" />
        <circle cx="17" cy="20" r="1.3" />
      </svg>
    ),
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { totalCount } = useCart();
  const { ids } = useWishlist();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-white/95 backdrop-blur-sm lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const count = item.href === "/cart" ? totalCount : item.href === "/wishlist" ? ids.length : 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${active ? "text-[var(--color-primary)]" : "text-[var(--color-text-faint)]"}`}
            >
              {item.icon(active)}
              {item.label}
              {count > 0 && (
                <span className="tnum absolute right-1/2 top-1 -mr-4 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[9px] font-bold text-white">
                  {toFaDigits(count)}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
