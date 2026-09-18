"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { vehicleBrands } from "@/data/vehicles";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { toFaDigits } from "@/lib/format";

export function VehiclePageClient() {
  const params = useSearchParams();
  const [brandId, setBrandId] = useState(params.get("brand") ?? "");
  const [modelId, setModelId] = useState(params.get("model") ?? "");
  const [yearId, setYearId] = useState(params.get("year") ?? "");
  const [engineId, setEngineId] = useState(params.get("engine") ?? "");
  const [submitted, setSubmitted] = useState(Boolean(params.get("brand") && params.get("model")));

  const brand = vehicleBrands.find((b) => b.id === brandId);
  const model = brand?.models.find((m) => m.id === modelId);
  const year = model?.years.find((y) => y.id === yearId);

  const results =
    submitted && model
      ? products.filter((p) =>
          p.compatibility.some((c) => c.includes(model.name) || model.name.includes(c)),
        )
      : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
      <div className="mb-8 rounded-[var(--radius-xl)] bg-[var(--color-ink)] px-5 py-8 sm:px-10">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h1 className="text-2xl font-extrabold sm:text-3xl">خودرویتان را انتخاب کنید</h1>
          <p className="mt-2 text-sm text-white/60">قطعات دقیقاً سازگار با خودروی شما را پیدا کنید</p>
        </div>

        <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          <select
            value={brandId}
            onChange={(e) => {
              setBrandId(e.target.value);
              setModelId("");
              setYearId("");
              setEngineId("");
              setSubmitted(false);
            }}
            className="h-12 rounded-[var(--radius-sm)] border border-white/15 bg-white/10 px-3 text-sm text-white outline-none focus:border-[var(--color-primary)] [&>option]:text-black"
          >
            <option value="">برند</option>
            {vehicleBrands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
          <select
            value={modelId}
            onChange={(e) => {
              setModelId(e.target.value);
              setYearId("");
              setEngineId("");
              setSubmitted(false);
            }}
            disabled={!brand}
            className="h-12 rounded-[var(--radius-sm)] border border-white/15 bg-white/10 px-3 text-sm text-white outline-none focus:border-[var(--color-primary)] disabled:opacity-40 [&>option]:text-black"
          >
            <option value="">مدل</option>
            {brand?.models.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <select
            value={yearId}
            onChange={(e) => {
              setYearId(e.target.value);
              setEngineId("");
            }}
            disabled={!model}
            className="h-12 rounded-[var(--radius-sm)] border border-white/15 bg-white/10 px-3 text-sm text-white outline-none focus:border-[var(--color-primary)] disabled:opacity-40 [&>option]:text-black"
          >
            <option value="">سال تولید</option>
            {model?.years.map((y) => (
              <option key={y.id} value={y.id}>{y.label}</option>
            ))}
          </select>
          <select
            value={engineId}
            onChange={(e) => setEngineId(e.target.value)}
            disabled={!year}
            className="h-12 rounded-[var(--radius-sm)] border border-white/15 bg-white/10 px-3 text-sm text-white outline-none focus:border-[var(--color-primary)] disabled:opacity-40 [&>option]:text-black"
          >
            <option value="">نوع موتور</option>
            {year?.engines.map((e) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-center">
          <Button size="lg" disabled={!brandId || !modelId} onClick={() => setSubmitted(true)}>
            مشاهده قطعات سازگار
          </Button>
        </div>
      </div>

      {submitted && model && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-[var(--color-text)]">
              قطعات سازگار با {brand?.name} {model.name}
            </h2>
            <span className="tnum text-sm text-[var(--color-text-muted)]">{toFaDigits(results.length)} محصول</span>
          </div>
          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] py-16 text-center">
              <p className="text-sm font-semibold text-[var(--color-text)]">در حال حاضر قطعه‌ای برای این خودرو ثبت نشده است</p>
              <p className="text-xs text-[var(--color-text-muted)]">می‌توانید با کارشناسان ما تماس بگیرید یا محصولات مشابه را مرور کنید</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
