import { brands } from "@/data/brands";

export function BrandsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">برندهای محبوب</h2>
        <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">همکاری با معتبرترین برندهای جهانی قطعات خودرو</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
        {brands.map((b) => (
          <div
            key={b.slug}
            className="flex flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-6 text-center transition-colors hover:border-[var(--color-border-strong)]"
          >
            <span className="text-base font-extrabold tracking-tight text-[var(--color-text)]">{b.name}</span>
            <span className="text-[11px] text-[var(--color-text-faint)]">{b.country}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
