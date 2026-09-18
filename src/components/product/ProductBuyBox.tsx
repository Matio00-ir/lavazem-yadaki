"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/data/types";
import { getBrandBySlug } from "@/data/brands";
import { Rating } from "@/components/ui/Rating";
import { PriceTag } from "@/components/ui/PriceTag";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toFaDigits } from "@/lib/format";

const availabilityLabel: Record<Product["availability"], { label: string; tone: "success" | "warning" | "danger" }> = {
  in_stock: { label: "موجود در انبار", tone: "success" },
  low_stock: { label: "موجودی محدود", tone: "warning" },
  out_of_stock: { label: "ناموجود", tone: "danger" },
};

export function ProductBuyBox({ product }: { product: Product }) {
  const brand = getBrandBySlug(product.brandSlug);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const router = useRouter();
  const availability = availabilityLabel[product.availability];
  const outOfStock = product.availability === "out_of_stock";

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[var(--color-primary)]">{brand?.name}</span>
        <button
          onClick={() => toggle(product.id, product.name)}
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] transition-colors hover:border-[var(--color-primary)]"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-4.5 w-4.5 ${isWishlisted(product.id) ? "fill-[var(--color-primary)] text-[var(--color-primary)]" : "fill-none text-[var(--color-text-muted)]"}`}
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8 2 4.7 5.2 4.1c2-.4 3.8.6 4.8 2.2 1-1.6 2.8-2.6 4.8-2.2 3.2.6 4.6 3.9 3 7.3-2.3 4.5-9.8 9.1-9.8 9.1Z" />
          </svg>
        </button>
      </div>

      <h1 className="mt-2 text-xl font-extrabold leading-relaxed text-[var(--color-text)] sm:text-2xl">{product.name}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Rating value={product.rating} count={product.reviewCount} size="md" />
        <span className="tnum text-xs text-[var(--color-text-faint)]">کد فنی: {product.partNumber}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.isOriginal && <Badge tone="primary">اورجینال</Badge>}
        <Badge tone={availability.tone}>{availability.label}</Badge>
      </div>

      <div className="mt-5 rounded-[var(--radius-md)] bg-[var(--color-bg-subtle)] p-4">
        <PriceTag price={product.price} oldPrice={product.oldPrice} size="lg" />
      </div>

      <div className="mt-3 text-xs text-[var(--color-text-muted)]">
        مناسب: <span className="font-semibold text-[var(--color-text)]">{product.compatibility.join(" / ")}</span>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-11 items-center rounded-[var(--radius-sm)] border border-[var(--color-border-strong)]">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-full w-10 items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
          >
            −
          </button>
          <span className="tnum w-8 text-center text-sm font-bold">{toFaDigits(qty)}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-full w-10 items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
          >
            +
          </button>
        </div>
        <Button
          variant="secondary"
          size="md"
          fullWidth
          disabled={outOfStock}
          onClick={() => addItem(product.id, qty)}
        >
          افزودن به سبد
        </Button>
      </div>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        className="mt-3"
        disabled={outOfStock}
        onClick={() => {
          addItem(product.id, qty);
          router.push("/cart");
        }}
      >
        {outOfStock ? "ناموجود" : "خرید سریع"}
      </Button>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3.5 py-3 text-xs text-[var(--color-text-muted)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[var(--color-success)]" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <path d="M12 3l7 3v6c0 5-3.5 7.8-7 9-3.5-1.2-7-4-7-9V6l7-3Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ضمانت اصالت کالا
        </div>
        <div className="flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3.5 py-3 text-xs text-[var(--color-text-muted)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[var(--color-success)]" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7v-6Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ارسال سریع
        </div>
        <div className="flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3.5 py-3 text-xs text-[var(--color-text-muted)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[var(--color-success)]" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <path d="M4 8h11a5 5 0 1 1-4.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ۷ روز ضمانت بازگشت
        </div>
        <div className="flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3.5 py-3 text-xs text-[var(--color-text-muted)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[var(--color-success)]" fill="none" stroke="currentColor" strokeWidth={1.7}>
            <path d="M4 12.5 9 17l11-11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {product.warrantyMonths > 0 ? `${toFaDigits(product.warrantyMonths)} ماه ضمانت` : "کیفیت تضمینی"}
        </div>
      </div>
    </div>
  );
}
