import type { CSSProperties } from "react";
import type { PartIcon as PartIconKey } from "@/data/types";

interface PartIconProps {
  icon: PartIconKey;
  className?: string;
  style?: CSSProperties;
}

/**
 * Consistent line-art glyphs for part categories — used inside the
 * ProductImage tile so every product photo shares the same visual system
 * (no photography sourcing needed for the demo).
 */
export function PartIcon({ icon, className, style }: PartIconProps) {
  const common = {
    className,
    style,
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };
  const stroke = { stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (icon) {
    case "oil-filter":
      return (
        <svg {...common}>
          <path d="M22 14h20l4 8v24a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V22l4-8Z" {...stroke} />
          <path d="M18 24h28" {...stroke} />
          <path d="M26 32h12M26 38h12M26 44h12" {...stroke} />
        </svg>
      );
    case "air-filter":
    case "cabin-filter":
      return (
        <svg {...common}>
          <rect x="12" y="16" width="40" height="32" rx="4" {...stroke} />
          <path d="M20 16v32M28 16v32M36 16v32M44 16v32" {...stroke} />
        </svg>
      );
    case "brake-pad":
      return (
        <svg {...common}>
          <rect x="14" y="18" width="36" height="14" rx="4" {...stroke} />
          <circle cx="23" cy="25" r="1.8" fill="currentColor" />
          <circle cx="41" cy="25" r="1.8" fill="currentColor" />
          <rect x="16" y="34" width="32" height="13" rx="2.5" {...stroke} />
          <path d="M21 40h22" {...stroke} strokeWidth={1.4} />
        </svg>
      );
    case "brake-disc":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="18" {...stroke} />
          <circle cx="32" cy="32" r="5" {...stroke} />
          <line x1="42" y1="32" x2="48" y2="32" {...stroke} />
          <line x1="39.1" y1="39.1" x2="43.3" y2="43.3" {...stroke} />
          <line x1="32" y1="42" x2="32" y2="48" {...stroke} />
          <line x1="24.9" y1="39.1" x2="20.7" y2="43.3" {...stroke} />
          <line x1="22" y1="32" x2="16" y2="32" {...stroke} />
          <line x1="24.9" y1="24.9" x2="20.7" y2="20.7" {...stroke} />
          <line x1="32" y1="22" x2="32" y2="16" {...stroke} />
          <line x1="39.1" y1="24.9" x2="43.3" y2="20.7" {...stroke} />
        </svg>
      );
    case "spark-plug":
      return (
        <svg {...common}>
          <rect x="25" y="7" width="14" height="11" rx="1.5" {...stroke} />
          <path d="M22.5 18h19l-3.5 17h-12l-3.5-17Z" {...stroke} strokeLinejoin="round" />
          <rect x="28.5" y="35" width="7" height="13" rx="1.2" {...stroke} />
          <path d="M32 48v8M32 56h5" {...stroke} />
        </svg>
      );
    case "belt":
      return (
        <svg {...common}>
          <circle cx="22" cy="32" r="10" {...stroke} />
          <circle cx="42" cy="32" r="6" {...stroke} />
          <path d="M22 22a14 14 0 0 1 20 4M22 42a14 14 0 0 0 20-4" {...stroke} />
        </svg>
      );
    case "bearing":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="18" {...stroke} />
          <circle cx="32" cy="32" r="8" {...stroke} />
          <circle cx="32" cy="14" r="2" fill="currentColor" />
          <circle cx="32" cy="50" r="2" fill="currentColor" />
          <circle cx="14" cy="32" r="2" fill="currentColor" />
          <circle cx="50" cy="32" r="2" fill="currentColor" />
          <circle cx="19" cy="19" r="2" fill="currentColor" />
          <circle cx="45" cy="45" r="2" fill="currentColor" />
          <circle cx="19" cy="45" r="2" fill="currentColor" />
          <circle cx="45" cy="19" r="2" fill="currentColor" />
        </svg>
      );
    case "suspension":
      return (
        <svg {...common}>
          <path d="M32 8v10" {...stroke} />
          <path d="M24 18h16l-3 8H27l-3-8Z" {...stroke} />
          <path d="M27 26v6M37 26v6" {...stroke} />
          <path d="M22 32h20l-4 22h-12l-4-22Z" {...stroke} />
          <path d="M26 40h12" {...stroke} />
        </svg>
      );
    case "engine":
      return (
        <svg {...common}>
          <rect x="14" y="24" width="26" height="20" rx="3" {...stroke} />
          <path d="M40 30h8v8h-8z" {...stroke} />
          <path d="M20 24v-6h8v6M32 24v-6h4v6" {...stroke} />
          <path d="M20 44v6M28 44v6M36 44v6" {...stroke} />
        </svg>
      );
    case "sensor":
      return (
        <svg {...common}>
          <circle cx="32" cy="26" r="10" {...stroke} />
          <path d="M32 36v18" {...stroke} />
          <path d="M24 54h16" {...stroke} />
          <path d="M32 20v4M28 24l2 2M38 24l-2 2" {...stroke} />
        </svg>
      );
    case "electrical":
      return (
        <svg {...common}>
          <path d="M34 8 18 34h12l-4 22 20-28H34l4-20Z" {...stroke} strokeLinejoin="round" />
        </svg>
      );
    case "oil":
      return (
        <svg {...common}>
          <path d="M32 10c8 10 14 18 14 27a14 14 0 1 1-28 0c0-9 6-17 14-27Z" {...stroke} />
          <path d="M26 40a6 6 0 0 0 6 6" {...stroke} />
        </svg>
      );
    case "radiator":
      return (
        <svg {...common}>
          <rect x="14" y="14" width="36" height="36" rx="3" {...stroke} />
          <path d="M22 14v36M30 14v36M38 14v36" {...stroke} />
        </svg>
      );
    case "battery":
      return (
        <svg {...common}>
          <rect x="12" y="22" width="40" height="26" rx="3" {...stroke} />
          <path d="M24 22v-6h6v6M34 22v-6h6v6" {...stroke} />
          <path d="M22 35h8M30 30v10" {...stroke} />
          <path d="M38 35h6" {...stroke} />
        </svg>
      );
    case "wiper":
      return (
        <svg {...common}>
          <circle cx="18" cy="46" r="4" {...stroke} />
          <path d="M20 44 44 16" {...stroke} />
          <path d="M38 20l8-4-2 9" {...stroke} strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="18" {...stroke} />
        </svg>
      );
  }
}
