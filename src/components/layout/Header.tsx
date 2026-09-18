"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toFaDigits } from "@/lib/format";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-ink)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--color-primary)]" fill="currentColor">
          <path d="M5 12.5 6.4 8a2 2 0 0 1 1.9-1.4h7.4A2 2 0 0 1 17.6 8l1.4 4.5M4 15.5h16M6.5 15.5v2.2a1 1 0 0 1-1 1H4.3a1 1 0 0 1-1-1v-3.7M17.5 15.5v2.2a1 1 0 0 0 1 1h1.2a1 1 0 0 0 1-1v-3.7" stroke="currentColor" strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="15.5" r="1.6" />
          <circle cx="16" cy="15.5" r="1.6" />
        </svg>
      </span>
      <span className="flex flex-col leading-4">
        <span className="text-[15px] font-extrabold tracking-tight text-[var(--color-text)]">یدک‌مارت</span>
        <span className="text-[10px] font-medium text-[var(--color-text-faint)]">فروشگاه لوازم یدکی</span>
      </span>
    </Link>
  );
}

function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(value.trim() ? `/products?q=${encodeURIComponent(value.trim())}` : "/products");
  };

  return (
    <form onSubmit={submit} className={`relative w-full ${compact ? "" : "max-w-2xl"}`}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="نام قطعه، کد فنی یا مدل خودرو را جستجو کنید..."
        className="h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] pr-11 pl-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] outline-none transition-colors focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary-light)]"
      />
      <button
        type="submit"
        aria-label="جستجو"
        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-primary)]"
      >
        <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="9" cy="9" r="6.5" />
          <path d="M18 18l-4-4" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}

function IconButton({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-muted)]"
    >
      {children}
      {!!count && count > 0 && (
        <span className="tnum absolute -top-1 -right-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] font-bold text-white">
          {toFaDigits(count)}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const { totalCount } = useCart();
  const { ids } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm">
      {/* Desktop */}
      <div className="mx-auto hidden max-w-7xl items-center gap-6 px-6 py-3 lg:flex">
        <Logo />

        <nav className="flex items-center gap-1">
          <div className="group relative">
            <button className="flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-muted)]">
              دسته‌بندی‌ها
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M5.5 7.5 10 12l4.5-4.5" stroke="currentColor" strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="invisible absolute right-0 top-full z-40 grid w-[560px] grid-cols-2 gap-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-3 opacity-0 shadow-[var(--shadow-pop)] transition-all duration-150 group-hover:visible group-hover:opacity-100">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/products?category=${c.slug}`}
                  className="flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-2.5 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-primary)]"
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="tnum text-xs text-[var(--color-text-faint)]">{toFaDigits(c.productCount)}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/vehicle" className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-muted)]">
            انتخاب بر اساس خودرو
          </Link>
          <Link href="/products?sort=bestseller" className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-muted)]">
            پرفروش‌ها
          </Link>
        </nav>

        <div className="flex-1">
          <SearchBar />
        </div>

        <div className="flex items-center gap-1">
          <Link href="/account" className="hidden items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-muted)] xl:flex">
            <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <circle cx="10" cy="6.5" r="3.2" />
              <path d="M3.5 17c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" strokeLinecap="round" />
            </svg>
            ورود / ثبت‌نام
          </Link>
          <IconButton href="/wishlist" label="علاقه‌مندی‌ها" count={ids.length}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7}>
              <path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8 2 4.7 5.2 4.1c2-.4 3.8.6 4.8 2.2 1-1.6 2.8-2.6 4.8-2.2 3.2.6 4.6 3.9 3 7.3-2.3 4.5-9.8 9.1-9.8 9.1Z" />
            </svg>
          </IconButton>
          <IconButton href="/cart" label="سبد خرید" count={totalCount}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7}>
              <path d="M4 4h1.6l.9 3.2M6.5 7.2h13a1 1 0 0 1 1 1.25l-1.3 5.6a1.5 1.5 0 0 1-1.46 1.15H8.4a1.5 1.5 0 0 1-1.46-1.15L4.8 5.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.3" />
              <circle cx="17" cy="20" r="1.3" />
            </svg>
          </IconButton>
        </div>
      </div>
      <div className="hidden border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)] lg:block">
        <div className="mx-auto max-w-7xl px-6 py-1.5 text-center text-xs text-[var(--color-text-muted)]">
          قطعه موردنظر را پیدا نمی‌کنید؟{" "}
          <Link href="/products" className="font-semibold text-[var(--color-primary)] hover:underline">
            با متخصصان ما تماس بگیرید
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-2.5 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-2">
          <button
            aria-label="منو"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round">
              <path d="M3 5.5h14M3 10h14M3 14.5h14" />
            </svg>
          </button>
          <Logo />
          <IconButton href="/cart" label="سبد خرید" count={totalCount}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7}>
              <path d="M4 4h1.6l.9 3.2M6.5 7.2h13a1 1 0 0 1 1 1.25l-1.3 5.6a1.5 1.5 0 0 1-1.46 1.15H8.4a1.5 1.5 0 0 1-1.46-1.15L4.8 5.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.3" />
              <circle cx="17" cy="20" r="1.3" />
            </svg>
          </IconButton>
        </div>
        <SearchBar compact />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="animate-fade-up absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button
                aria-label="بستن"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)]"
              >
                <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                  <path d="M5 5l10 10M15 5 5 15" />
                </svg>
              </button>
            </div>
            <Link href="/account" onClick={() => setMobileOpen(false)} className="mb-3 flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-bg-subtle)] px-3 py-2.5 text-sm font-semibold text-[var(--color-text)]">
              <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <circle cx="10" cy="6.5" r="3.2" />
                <path d="M3.5 17c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" strokeLinecap="round" />
              </svg>
              ورود / ثبت‌نام
            </Link>
            <Link href="/vehicle" onClick={() => setMobileOpen(false)} className="mb-1 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]">
              انتخاب بر اساس خودرو
            </Link>
            <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="mb-1 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]">
              علاقه‌مندی‌ها
            </Link>
            <p className="mb-2 mt-3 px-3 text-xs font-bold text-[var(--color-text-faint)]">دسته‌بندی‌ها</p>
            <div className="flex-1 overflow-y-auto">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/products?category=${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-2.5 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]"
                >
                  {c.name}
                  <span className="tnum text-xs text-[var(--color-text-faint)]">{toFaDigits(c.productCount)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
