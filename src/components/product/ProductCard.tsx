"use client";

import Link from "next/link";
import type { Product } from "@/data/types";
import { getBrandBySlug } from "@/data/brands";
import { ProductImage } from "@/components/ui/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { PriceTag } from "@/components/ui/PriceTag";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const availabilityLabel: Record<Product["availability"], { label: string; tone: "success" | "warning" | "danger" }> = {
  in_stock: { label: "موجود در انبار", tone: "success" },
  low_stock: { label: "موجودی محدود", tone: "warning" },
  out_of_stock: { label: "ناموجود", tone: "danger" },
};

export function ProductCard({ product }: { product: Product }) {
  const brand = getBrandBySlug(product.brandSlug);
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const availability = availabilityLabel[product.availability];

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card-hover)]">
      <Link href={`/products/${product.slug}`} className="relative block">
        <ProductImage icon={product.icon} accent={product.accent} className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="absolute inset-x-2 top-2 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            {product.oldPrice && product.oldPrice > product.price && (
              <Badge tone="danger">تخفیف ویژه</Badge>
            )}
            {product.isOriginal && <Badge tone="primary">اورجینال</Badge>}
          </div>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id, product.name);
          }}
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4 w-4 transition-colors ${wishlisted ? "fill-[var(--color-primary)] text-[var(--color-primary)]" : "fill-none text-[var(--color-text-muted)]"}`}
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8 2 4.7 5.2 4.1c2-.4 3.8.6 4.8 2.2 1-1.6 2.8-2.6 4.8-2.2 3.2.6 4.6 3.9 3 7.3-2.3 4.5-9.8 9.1-9.8 9.1Z" />
          </svg>
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--color-text-faint)]">
          <span>{brand?.name}</span>
          <span className="tnum">{product.partNumber}</span>
        </div>

        <Link href={`/products/${product.slug}`} className="line-clamp-2 min-h-[2.6em] text-sm font-bold text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]">
          {product.name}
        </Link>

        <p className="line-clamp-1 text-xs text-[var(--color-text-muted)]">
          مناسب: {product.compatibility.join(" / ")}
        </p>

        <div className="flex items-center justify-between">
          <Rating value={product.rating} count={product.reviewCount} />
          <span className={`text-[11px] font-semibold ${availability.tone === "success" ? "text-[var(--color-success)]" : availability.tone === "warning" ? "text-[var(--color-warning)]" : "text-[var(--color-primary)]"}`}>
            {availability.label}
          </span>
        </div>

        <div className="mt-auto pt-2">
          <PriceTag price={product.price} oldPrice={product.oldPrice} />
        </div>

        <button
          type="button"
          disabled={product.availability === "out_of_stock"}
          onClick={() => addItem(product.id)}
          className="mt-2 flex h-10 w-full items-center justify-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-ink)] text-xs font-bold text-white transition-colors hover:bg-[var(--color-primary)] disabled:cursor-not-allowed disabled:bg-[var(--color-bg-muted)] disabled:text-[var(--color-text-faint)]"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
            <path d="M3 3h1.6l.5 2M6 15h9.2a1 1 0 0 0 1-.8l1.3-6.4a1 1 0 0 0-1-1.2H5.2M6 15l-.9-4.4M6 15l-1 3h11" strokeWidth={1.4} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="19" r="1.2" />
            <circle cx="15" cy="19" r="1.2" />
          </svg>
          {product.availability === "out_of_stock" ? "ناموجود" : "افزودن به سبد"}
        </button>
      </div>
    </div>
  );
}
