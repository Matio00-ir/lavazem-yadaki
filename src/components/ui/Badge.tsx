import type { ReactNode } from "react";

type BadgeTone = "success" | "warning" | "danger" | "neutral" | "primary";

const toneClasses: Record<BadgeTone, string> = {
  success: "bg-[var(--color-success-light)] text-[var(--color-success)]",
  warning: "bg-[var(--color-warning-light)] text-[var(--color-warning)]",
  danger: "bg-[var(--color-primary-light)] text-[var(--color-primary)]",
  neutral: "bg-[var(--color-bg-muted)] text-[var(--color-text-muted)]",
  primary: "bg-[var(--color-ink)] text-white",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClasses[tone]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
