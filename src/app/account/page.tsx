import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "ورود / ثبت‌نام",
};

export default function AccountPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 sm:py-24">
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]">
        <svg viewBox="0 0 20 20" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6}>
          <circle cx="10" cy="6.5" r="3.2" />
          <path d="M3.5 17c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" strokeLinecap="round" />
        </svg>
      </span>
      <h1 className="text-xl font-extrabold text-[var(--color-text)]">ورود به حساب کاربری</h1>
      <p className="mt-2 text-center text-sm text-[var(--color-text-muted)]">
        برای مشاهده سفارش‌ها و مدیریت حساب کاربری وارد شوید
      </p>

      <div className="mt-8 flex w-full flex-col gap-3">
        <input placeholder="شماره موبایل" dir="ltr" className="h-12 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-4 text-sm outline-none focus:border-[var(--color-primary)]" />
        <Button size="md" fullWidth>ارسال کد تایید</Button>
      </div>
      <p className="mt-6 text-center text-xs leading-6 text-[var(--color-text-faint)]">
        این صفحه یک نمونه دموی نمایشی است و ورود واقعی انجام نمی‌شود.
      </p>
    </div>
  );
}
