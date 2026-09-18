"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ui/ProductImage";
import type { PartIcon } from "@/data/types";

const angles = [0, -8, 6, -14];

export function ProductGallery({ icon, accent }: { icon: PartIcon; accent: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="group relative overflow-hidden rounded-[var(--radius-lg)]">
        <ProductImage
          icon={icon}
          accent={accent}
          className="aspect-square w-full"
          iconClassName="transition-transform duration-500 group-hover:scale-110"
          iconStyle={{ transform: `rotate(${angles[active]}deg)` }}
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          برای بزرگ‌نمایی نگه دارید
        </span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {angles.map((angle, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`overflow-hidden rounded-[var(--radius-sm)] border-2 transition-colors ${
              active === i ? "border-[var(--color-primary)]" : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
            }`}
          >
            <ProductImage
              icon={icon}
              accent={accent}
              className="aspect-square w-full"
              iconStyle={{ transform: `rotate(${angle}deg)` }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
