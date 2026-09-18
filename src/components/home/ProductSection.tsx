import Link from "next/link";
import type { Product } from "@/data/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductSection({
  title,
  subtitle,
  products,
  viewAllHref,
  tone = "light",
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref: string;
  tone?: "light" | "subtle";
}) {
  return (
    <section className={`mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 ${tone === "subtle" ? "rounded-[var(--radius-xl)] bg-[var(--color-bg-subtle)]" : ""}`}>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{subtitle}</p>}
        </div>
        <Link href={viewAllHref} className="hidden shrink-0 text-sm font-semibold text-[var(--color-primary)] hover:underline sm:block">
          مشاهده همه ←
        </Link>
      </div>

      <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {products.map((p) => (
          <div key={p.id} className="w-[220px] shrink-0 sm:w-auto">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <Link href={viewAllHref} className="mt-5 block text-center text-sm font-semibold text-[var(--color-primary)] hover:underline sm:hidden">
        مشاهده همه ←
      </Link>
    </section>
  );
}
