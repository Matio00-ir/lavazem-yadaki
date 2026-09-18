import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-[0_8px_20px_-8px_rgba(179,18,31,0.55)]",
  secondary:
    "bg-[var(--color-bg-muted)] text-[var(--color-text)] hover:bg-[var(--color-border-strong)]",
  outline:
    "border border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] bg-transparent",
  ghost: "text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]",
  dark: "bg-[var(--color-ink)] text-white hover:bg-[var(--color-ink-soft)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-xs rounded-[var(--radius-sm)]",
  md: "h-11 px-5 text-sm rounded-[var(--radius-md)]",
  lg: "h-[3.25rem] px-7 text-base rounded-[var(--radius-md)]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
