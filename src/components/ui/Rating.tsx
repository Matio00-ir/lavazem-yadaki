import { toFaDigits } from "@/lib/format";

export function Rating({
  value,
  count,
  size = "sm",
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
}) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-1">
      <svg viewBox="0 0 20 20" className={starSize} fill="var(--color-star)">
        <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
      </svg>
      <span className="text-xs font-semibold text-[var(--color-text)] tnum">{toFaDigits(value.toFixed(1))}</span>
      {typeof count === "number" && (
        <span className="text-xs text-[var(--color-text-faint)] tnum">({toFaDigits(count)})</span>
      )}
    </div>
  );
}
