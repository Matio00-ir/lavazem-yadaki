"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-faint)]">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8 2 4.7 5.2 4.1c2-.4 3.8.6 4.8 2.2 1-1.6 2.8-2.6 4.8-2.2 3.2.6 4.6 3.9 3 7.3-2.3 4.5-9.8 9.1-9.8 9.1Z" />
          </svg>
        </span>
        <h1 className="text-xl font-extrabold text-[var(--color-text)]">لیست علاقه‌مندی‌های شما خالی است</h1>
        <p className="text-sm text-[var(--color-text-muted)]">محصولات مورد علاقه خود را نشانه‌گذاری کنید تا بعداً پیدایشان کنید</p>
        <Link href="/products">
          <Button size="md" className="mt-2">مشاهده محصولات</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
      <h1 className="mb-6 text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">علاقه‌مندی‌های من</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
