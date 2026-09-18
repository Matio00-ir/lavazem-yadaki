"use client";

import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { formatToman } from "@/lib/format";
import type { Availability } from "@/data/types";

export interface FilterState {
  category: string | null;
  brandSlugs: string[];
  maxPrice: number;
  availability: Availability[];
}

export const PRICE_CEILING = 13000000;

const availabilityOptions: { id: Availability; label: string }[] = [
  { id: "in_stock", label: "موجود در انبار" },
  { id: "low_stock", label: "موجودی محدود" },
  { id: "out_of_stock", label: "ناموجود" },
];

export function ProductFiltersPanel({
  state,
  onChange,
  onReset,
}: {
  state: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-[var(--color-text)]">فیلترها</h3>
        <button onClick={onReset} className="text-xs font-semibold text-[var(--color-primary)] hover:underline">
          حذف همه
        </button>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-bold text-[var(--color-text-muted)]">نوع قطعه</h4>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2.5 text-sm">
            <input
              type="radio"
              checked={state.category === null}
              onChange={() => onChange({ ...state, category: null })}
              className="h-4 w-4 accent-[var(--color-primary)]"
            />
            همه دسته‌ها
          </label>
          {categories.map((c) => (
            <label key={c.slug} className="flex items-center justify-between gap-2.5 text-sm">
              <span className="flex items-center gap-2.5">
                <input
                  type="radio"
                  checked={state.category === c.slug}
                  onChange={() => onChange({ ...state, category: c.slug })}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                {c.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-bold text-[var(--color-text-muted)]">برند</h4>
        <div className="flex flex-col gap-2.5">
          {brands.map((b) => {
            const checked = state.brandSlugs.includes(b.slug);
            return (
              <label key={b.slug} className="flex items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...state,
                      brandSlugs: checked
                        ? state.brandSlugs.filter((s) => s !== b.slug)
                        : [...state.brandSlugs, b.slug],
                    })
                  }
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                {b.name}
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-bold text-[var(--color-text-muted)]">محدوده قیمت</h4>
        <input
          type="range"
          min={100000}
          max={PRICE_CEILING}
          step={100000}
          value={state.maxPrice}
          onChange={(e) => onChange({ ...state, maxPrice: Number(e.target.value) })}
          className="w-full accent-[var(--color-primary)]"
        />
        <div className="tnum mt-1.5 flex justify-between text-xs text-[var(--color-text-faint)]">
          <span>تا {formatToman(state.maxPrice)} تومان</span>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-bold text-[var(--color-text-muted)]">وضعیت موجودی</h4>
        <div className="flex flex-col gap-2.5">
          {availabilityOptions.map((opt) => {
            const checked = state.availability.includes(opt.id);
            return (
              <label key={opt.id} className="flex items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onChange({
                      ...state,
                      availability: checked
                        ? state.availability.filter((a) => a !== opt.id)
                        : [...state.availability, opt.id],
                    })
                  }
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
