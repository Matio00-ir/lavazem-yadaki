"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFiltersPanel, PRICE_CEILING, type FilterState } from "@/components/product/ProductFiltersPanel";
import { MobileFilterSheet } from "@/components/product/MobileFilterSheet";
import { SortDropdown } from "@/components/product/SortDropdown";
import { filterAndSortProducts, type SortOption } from "@/lib/filterProducts";
import { toFaDigits } from "@/lib/format";
import { getCategoryBySlug } from "@/data/categories";

export function ProductsPageClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialSort = (searchParams.get("sort") as SortOption | null) ?? "relevant";
  const q = searchParams.get("q") ?? "";

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    brandSlugs: [],
    maxPrice: PRICE_CEILING,
    availability: [],
  });
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const results = useMemo(
    () =>
      filterAndSortProducts({
        q,
        category: filters.category ?? undefined,
        brands: filters.brandSlugs,
        maxPrice: filters.maxPrice,
        availability: filters.availability,
        sort,
      }),
    [q, filters, sort],
  );

  const activeCategory = filters.category ? getCategoryBySlug(filters.category) : null;
  const resetFilters = () =>
    setFilters({ category: null, brandSlugs: [], maxPrice: PRICE_CEILING, availability: [] });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
      <nav className="mb-3 text-xs text-[var(--color-text-faint)]">
        <span>خانه</span> <span className="mx-1">/</span> <span className="text-[var(--color-text)]">لوازم یدکی خودرو</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">
            {q ? `نتایج جستجو برای «${q}»` : activeCategory ? activeCategory.name : "لوازم یدکی خودرو"}
          </h1>
          <p className="tnum mt-1.5 text-sm text-[var(--color-text-muted)]">{toFaDigits(results.length)} محصول</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex h-10 items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-3.5 text-xs font-semibold text-[var(--color-text)] lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round">
              <path d="M3 5h14M6 10h8M8 15h4" />
            </svg>
            فیلترها
          </button>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-5">
            <ProductFiltersPanel state={filters} onChange={setFilters} onReset={resetFilters} />
          </div>
        </aside>

        <div>
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] py-20 text-center">
              <p className="text-sm font-semibold text-[var(--color-text)]">محصولی با این فیلترها پیدا نشد</p>
              <button onClick={resetFilters} className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
                حذف فیلترها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileFilterSheet
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        state={filters}
        onChange={setFilters}
        onReset={resetFilters}
        resultCount={results.length}
      />
    </div>
  );
}
