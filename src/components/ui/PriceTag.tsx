import { discountPercent, formatPrice, toFaDigits } from "@/lib/format";

export function PriceTag({
  price,
  oldPrice,
  size = "md",
}: {
  price: number;
  oldPrice?: number;
  size?: "sm" | "md" | "lg";
}) {
  const pct = discountPercent(price, oldPrice);
  const priceClass = size === "lg" ? "text-2xl" : size === "md" ? "text-base" : "text-sm";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`tnum font-extrabold text-[var(--color-text)] ${priceClass}`}>
        {formatPrice(price)}
      </span>
      {oldPrice && oldPrice > price && (
        <>
          <span className="tnum text-xs text-[var(--color-text-faint)] line-through">
            {formatPrice(oldPrice)}
          </span>
          <span className="tnum rounded-full bg-[var(--color-primary-light)] px-2 py-0.5 text-[11px] font-bold text-[var(--color-primary)]">
            {toFaDigits(pct)}٪ تخفیف
          </span>
        </>
      )}
    </div>
  );
}
