"use client";

import type { SortOption } from "@/lib/filterProducts";

const options: { id: SortOption; label: string }[] = [
  { id: "relevant", label: "مرتبط‌ترین" },
  { id: "newest", label: "جدیدترین" },
  { id: "cheapest", label: "ارزان‌ترین" },
  { id: "expensive", label: "گران‌ترین" },
  { id: "bestseller", label: "پرفروش‌ترین" },
];

export function SortDropdown({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="h-10 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 text-xs font-semibold text-[var(--color-text)] outline-none focus:border-[var(--color-primary)] sm:text-sm"
    >
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          مرتب‌سازی: {o.label}
        </option>
      ))}
    </select>
  );
}
