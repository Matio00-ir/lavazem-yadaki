import type { CSSProperties } from "react";
import { PartIcon } from "./PartIcon";
import type { PartIcon as PartIconKey } from "@/data/types";

interface ProductImageProps {
  icon: PartIconKey;
  accent: string;
  className?: string;
  iconClassName?: string;
  iconStyle?: CSSProperties;
}

export function ProductImage({ icon, accent, className, iconClassName, iconStyle }: ProductImageProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[var(--radius-lg)] bg-[radial-gradient(circle_at_50%_38%,#fbfbfc_0%,#eef0f2_72%,#e6e8eb_100%)] ${className ?? ""}`}
    >
      <div
        className="absolute h-[62%] w-[62%] rounded-full opacity-[0.10]"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #000 0px, transparent 1px, transparent 4px)",
        }}
      />
      <PartIcon
        icon={icon}
        className={`relative h-[46%] w-[46%] drop-shadow-sm ${iconClassName ?? ""}`}
        style={{ color: accent, ...iconStyle }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] ring-1 ring-inset ring-black/[0.04]" />
    </div>
  );
}
