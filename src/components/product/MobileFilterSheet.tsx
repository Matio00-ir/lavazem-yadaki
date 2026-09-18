"use client";

import { Button } from "@/components/ui/Button";
import { ProductFiltersPanel, type FilterState } from "./ProductFiltersPanel";
import { toFaDigits } from "@/lib/format";

export function MobileFilterSheet({
  open,
  onClose,
  state,
  onChange,
  onReset,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  state: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  resultCount: number;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={onClose} />
      <div className="animate-fade-up absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-[var(--radius-xl)] bg-white">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <h3 className="text-sm font-extrabold text-[var(--color-text)]">فیلترها</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)]">
            <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <path d="M5 5l10 10M15 5 5 15" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <ProductFiltersPanel state={state} onChange={onChange} onReset={onReset} />
        </div>
        <div className="border-t border-[var(--color-border)] p-4" style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}>
          <Button fullWidth size="md" onClick={onClose}>
            نمایش {toFaDigits(resultCount)} نتیجه
          </Button>
        </div>
      </div>
    </div>
  );
}
