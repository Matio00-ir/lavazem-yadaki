"use client";

import { useState } from "react";
import Link from "next/link";
import { vehicleBrands } from "@/data/vehicles";
import { Button } from "@/components/ui/Button";

export function VehicleSelector() {
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [yearId, setYearId] = useState("");
  const [engineId, setEngineId] = useState("");

  const brand = vehicleBrands.find((b) => b.id === brandId);
  const model = brand?.models.find((m) => m.id === modelId);
  const year = model?.years.find((y) => y.id === yearId);

  const paramsObj = new URLSearchParams();
  if (brandId) paramsObj.set("brand", brandId);
  if (modelId) paramsObj.set("model", modelId);
  if (yearId) paramsObj.set("year", yearId);
  if (engineId) paramsObj.set("engine", engineId);
  const params = paramsObj.toString();

  const canSubmit = Boolean(brandId && modelId);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-ink)] px-5 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="text-2xl font-extrabold sm:text-3xl">خودرویتان را انتخاب کنید</h2>
          <p className="mt-2 text-sm text-white/60">
            برند، مدل، سال و نوع موتور را مشخص کنید تا فقط قطعات سازگار با خودروی شما را ببینید
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          <select
            value={brandId}
            onChange={(e) => {
              setBrandId(e.target.value);
              setModelId("");
              setYearId("");
              setEngineId("");
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
          {canSubmit ? (
            <Link href={`/vehicle?${params}`}>
              <Button size="lg">مشاهده قطعات سازگار</Button>
            </Link>
          ) : (
            <Button size="lg" disabled>مشاهده قطعات سازگار</Button>
          )}
        </div>
      </div>
    </section>
  );
}
