import Link from "next/link";
import { categories } from "@/data/categories";
import { PartIcon } from "@/components/ui/PartIcon";
import { toFaDigits } from "@/lib/format";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">دسته‌بندی محصولات</h2>
          <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">مرور سریع بر اساس نوع قطعه</p>
        </div>
        <Link href="/products" className="hidden shrink-0 text-sm font-semibold text-[var(--color-primary)] hover:underline sm:block">
          مشاهده همه ←
        </Link>
      </div>

      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-5">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            style={{ animationDelay: `${i * 40}ms` }}
            className="animate-fade-up group flex w-[150px] shrink-0 flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-card-hover)] sm:w-auto"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-primary-light)]">
              <PartIcon icon={c.icon} className="h-8 w-8" />
            </span>
            <div>
              <div className="text-[13px] font-bold text-[var(--color-text)]">{c.shortName}</div>
              <div className="tnum mt-0.5 text-[11px] text-[var(--color-text-faint)]">{toFaDigits(c.productCount)} کالا</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
