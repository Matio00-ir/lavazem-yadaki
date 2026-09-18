import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { toFaDigits } from "@/lib/format";

const stats = [
  { value: "۳۰,۰۰۰+", label: "قطعه اورجینال" },
  { value: "۱۲۰+", label: "برند معتبر" },
  { value: "۴۸ ساعت", label: "ارسال سریع" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)]">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(179,18,31,0.35), transparent 45%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.08), transparent 50%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "42px 42px" }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="animate-fade-up text-white">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
            بیش از ۳۰,۰۰۰ قطعه اورجینال، آماده ارسال
          </span>
          <h1 className="text-3xl font-extrabold leading-[1.3] tracking-tight sm:text-4xl lg:text-5xl">
            قطعه درست، <span className="text-[var(--color-primary)]">برای خودروی درست.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70 sm:text-base">
            خرید مطمئن لوازم یدکی خودرو با ضمانت اصالت، تطابق دقیق با مدل خودروی شما و ارسال سریع به سراسر کشور.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/products">
              <Button size="lg">مشاهده قطعات</Button>
            </Link>
            <Link href="/vehicle">
              <Button variant="outline" size="lg" className="border-white/25 text-white hover:border-white hover:bg-white/10 hover:text-white">
                انتخاب بر اساس خودرو
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="tnum text-xl font-extrabold text-white sm:text-2xl">{toFaDigits(s.value)}</div>
                <div className="mt-1 text-[11px] text-white/55 sm:text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-up relative hidden lg:block" style={{ animationDelay: "120ms" }}>
          <div className="relative mx-auto flex aspect-[4/3] max-w-lg items-center justify-center rounded-[var(--radius-xl)] bg-gradient-to-br from-white/[0.07] to-transparent p-10 ring-1 ring-white/10">
            <svg viewBox="0 0 400 260" className="h-full w-full text-white/90" fill="none">
              <ellipse cx="200" cy="225" rx="150" ry="10" fill="#000" opacity="0.25" />
              <path
                d="M55 175c0-14 10-24 24-27l28-6 20-38c6-11 17-18 30-18h70c14 0 27 8 33 20l17 33 26 6c14 3 24 13 24 27v22a10 10 0 0 1-10 10h-14a30 30 0 0 1-58 0h-88a30 30 0 0 1-58 0H65a10 10 0 0 1-10-10v-19Z"
                fill="rgba(255,255,255,0.06)"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path d="M137 106h130l14 32H120l17-32Z" fill="rgba(179,18,31,0.35)" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="135" cy="190" r="26" fill="rgba(20,23,28,0.9)" stroke="currentColor" strokeWidth="3" />
              <circle cx="135" cy="190" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="295" cy="190" r="26" fill="rgba(20,23,28,0.9)" stroke="currentColor" strokeWidth="3" />
              <circle cx="295" cy="190" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              <rect x="150" y="66" width="42" height="20" rx="3" fill="rgba(255,255,255,0.12)" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="animate-fade-up absolute -bottom-4 right-6 flex items-center gap-3 rounded-[var(--radius-md)] bg-white px-4 py-3 shadow-[var(--shadow-pop)]" style={{ animationDelay: "260ms" }}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-success-light)] text-[var(--color-success)]">
              <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="currentColor">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.3 9.5a1 1 0 1 1 1.4-1.4l3.6 3.6 6.7-6.7a1 1 0 0 1 1.4.3Z" clipRule="evenodd" />
              </svg>
            </span>
            <div>
              <div className="text-xs font-bold text-[var(--color-text)]">ضمانت اصالت کالا</div>
              <div className="text-[11px] text-[var(--color-text-faint)]">۱۰۰٪ اورجینال یا بازگشت پول</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
