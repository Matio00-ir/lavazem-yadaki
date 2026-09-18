"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { vehicleBrands } from "@/data/vehicles";

type Tab = "name" | "vehicle" | "code";

const tabs: { id: Tab; label: string }[] = [
  { id: "name", label: "جستجو بر اساس نام قطعه" },
  { id: "vehicle", label: "جستجو بر اساس خودرو" },
  { id: "code", label: "جستجو با کد فنی" },
];

export function PartFinder() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("name");
  const [nameQuery, setNameQuery] = useState("");
  const [codeQuery, setCodeQuery] = useState("");
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");

  const models = vehicleBrands.find((b) => b.id === brandId)?.models ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">دنبال چه قطعه‌ای هستید؟</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">با نام قطعه، مدل خودرو یا کد فنی، سریع پیدایش کنید</p>
      </div>

      <div className="mx-auto max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow-card)] sm:p-3">
        <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-[var(--color-border)] px-1 pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-[var(--radius-sm)] px-4 py-2.5 text-xs font-bold transition-colors sm:text-sm ${
                tab === t.id
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-5">
          {tab === "name" && (
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                router.push(nameQuery.trim() ? `/products?q=${encodeURIComponent(nameQuery.trim())}` : "/products");
              }}
            >
              <input
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                placeholder="مثلاً: فیلتر روغن، لنت ترمز، شمع..."
                className="h-12 flex-1 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary-light)]"
              />
              <Button type="submit" size="md" className="sm:w-40">جستجو</Button>
            </form>
          )}

          {tab === "vehicle" && (
            <form
              className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]"
              onSubmit={(e) => {
                e.preventDefault();
                const params = new URLSearchParams();
                if (brandId) params.set("brand", brandId);
                if (modelId) params.set("model", modelId);
                router.push(`/vehicle?${params.toString()}`);
              }}
            >
              <select
                value={brandId}
                onChange={(e) => {
                  setBrandId(e.target.value);
                  setModelId("");
                }}
                className="h-12 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] px-3 text-sm outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">برند خودرو</option>
                {vehicleBrands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <select
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                disabled={!brandId}
                className="h-12 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] px-3 text-sm outline-none focus:border-[var(--color-primary)] disabled:opacity-50"
              >
                <option value="">مدل خودرو</option>
                {models.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              <Button type="submit" size="md" className="sm:w-40">مشاهده قطعات</Button>
            </form>
          )}

          {tab === "code" && (
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                router.push(codeQuery.trim() ? `/products?q=${encodeURIComponent(codeQuery.trim())}` : "/products");
              }}
            >
              <input
                value={codeQuery}
                dir="ltr"
                onChange={(e) => setCodeQuery(e.target.value)}
                placeholder="مثلاً: F026407123 / OEM Part Number"
                className="tnum h-12 flex-1 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] px-4 text-left text-sm outline-none focus:border-[var(--color-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--color-primary-light)]"
              />
              <Button type="submit" size="md" className="sm:w-40">جستجو با کد</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
