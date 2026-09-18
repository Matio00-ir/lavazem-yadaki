"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { getBrandBySlug } from "@/data/brands";
import { ProductImage } from "@/components/ui/ProductImage";
import { Button } from "@/components/ui/Button";
import { formatPrice, toFaDigits } from "@/lib/format";

const FREE_SHIPPING_THRESHOLD = 3000000;
const SHIPPING_COST = 250000;

export default function CartPage() {
  const { lines, updateQty, removeItem, subtotal, totalCount } = useCart();
  const router = useRouter();

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-faint)]">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="M4 4h1.6l.9 3.2M6.5 7.2h13a1 1 0 0 1 1 1.25l-1.3 5.6a1.5 1.5 0 0 1-1.46 1.15H8.4a1.5 1.5 0 0 1-1.46-1.15L4.8 5.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="20" r="1.3" />
            <circle cx="17" cy="20" r="1.3" />
          </svg>
        </span>
        <h1 className="text-xl font-extrabold text-[var(--color-text)]">سبد خرید شما خالی است</h1>
        <p className="text-sm text-[var(--color-text-muted)]">محصولات مورد نظر خود را از فروشگاه اضافه کنید</p>
        <Link href="/products">
          <Button size="md" className="mt-2">مشاهده محصولات</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
      <h1 className="mb-6 text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">
        سبد خرید <span className="tnum text-base font-medium text-[var(--color-text-faint)]">({toFaDigits(totalCount)} کالا)</span>
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-4">
          {lines.map((line) => {
            const product = products.find((p) => p.id === line.productId);
            if (!product) return null;
            const brand = getBrandBySlug(product.brandSlug);
            return (
              <div
                key={line.productId}
                className="flex gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-3.5 sm:p-4"
              >
                <Link href={`/products/${product.slug}`} className="shrink-0">
                  <ProductImage icon={product.icon} accent={product.accent} className="h-24 w-24 sm:h-28 sm:w-28" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-[var(--color-primary)]">{brand?.name}</span>
                      <Link href={`/products/${product.slug}`} className="mt-0.5 block text-sm font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] sm:text-base">
                        {product.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(line.productId)}
                      aria-label="حذف از سبد"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--color-text-faint)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
                    >
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round">
                        <path d="M5 5l10 10M15 5 5 15" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex h-9 items-center rounded-[var(--radius-sm)] border border-[var(--color-border-strong)]">
                      <button
                        onClick={() => updateQty(line.productId, line.qty - 1)}
                        className="flex h-full w-8 items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                      >
                        −
                      </button>
                      <span className="tnum w-7 text-center text-sm font-bold">{toFaDigits(line.qty)}</span>
                      <button
                        onClick={() => updateQty(line.productId, line.qty + 1)}
                        className="flex h-full w-8 items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                      >
                        +
                      </button>
                    </div>
                    <span className="tnum text-sm font-extrabold text-[var(--color-text)] sm:text-base">
                      {formatPrice(product.price * line.qty)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-[var(--radius-lg)] border border-[var(--color-border)] p-5">
          <h2 className="mb-4 text-base font-extrabold text-[var(--color-text)]">خلاصه سفارش</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>جمع کالاها</span>
              <span className="tnum">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>هزینه ارسال</span>
              <span className="tnum">{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="rounded-[var(--radius-sm)] bg-[var(--color-warning-light)] px-3 py-2 text-[11px] text-[var(--color-warning)]">
                با خرید بیش از {formatPrice(FREE_SHIPPING_THRESHOLD)}، ارسال رایگان می‌شود
              </p>
            )}
            <div className="flex justify-between border-t border-[var(--color-border)] pt-3 text-base font-extrabold text-[var(--color-text)]">
              <span>مبلغ قابل پرداخت</span>
              <span className="tnum">{formatPrice(total)}</span>
            </div>
          </div>
          <Button fullWidth size="md" className="mt-5" onClick={() => router.push("/checkout")}>
            ادامه فرآیند خرید
          </Button>
          <Link href="/products" className="mt-3 block text-center text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
            ادامه خرید
          </Link>
        </div>
      </div>
    </div>
  );
}
