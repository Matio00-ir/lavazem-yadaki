"use client";

import { useState } from "react";
import type { Product } from "@/data/types";
import { Rating } from "@/components/ui/Rating";

type TabId = "specs" | "compat" | "desc" | "reviews";

const tabs: { id: TabId; label: string }[] = [
  { id: "specs", label: "مشخصات" },
  { id: "compat", label: "سازگاری" },
  { id: "desc", label: "توضیحات" },
  { id: "reviews", label: "نظرات" },
];

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<TabId>("desc");

  return (
    <div className="mt-12">
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-[var(--color-border)]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              tab === t.id
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {t.label}
            {t.id === "reviews" && ` (${product.reviews.length})`}
          </button>
        ))}
      </div>

      <div className="py-7">
        {tab === "specs" && (
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {product.specs.map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-[var(--radius-sm)] bg-[var(--color-bg-subtle)] px-4 py-3 text-sm">
                <dt className="text-[var(--color-text-muted)]">{s.label}</dt>
                <dd className="font-semibold text-[var(--color-text)]">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {tab === "compat" && (
          <div className="flex flex-wrap gap-2">
            {product.compatibility.map((c) => (
              <span key={c} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 text-sm font-medium text-[var(--color-text)]">
                {c}
              </span>
            ))}
          </div>
        )}

        {tab === "desc" && <p className="max-w-3xl text-sm leading-8 text-[var(--color-text-muted)]">{product.description}</p>}

        {tab === "reviews" && (
          <div className="flex flex-col gap-5">
            {product.reviews.length === 0 && (
              <p className="text-sm text-[var(--color-text-muted)]">هنوز نظری برای این محصول ثبت نشده است.</p>
            )}
            {product.reviews.map((r) => (
              <div key={r.id} className="border-b border-[var(--color-border)] pb-5 last:border-0">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--color-text)]">{r.author}</span>
                  <span className="text-xs text-[var(--color-text-faint)]">{r.date}</span>
                </div>
                <Rating value={r.rating} />
                <p className="mt-2 text-sm font-semibold text-[var(--color-text)]">{r.title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">{r.body}</p>
                {r.verified && <span className="mt-2 inline-block text-xs font-semibold text-[var(--color-success)]">خریدار تایید شده ✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
