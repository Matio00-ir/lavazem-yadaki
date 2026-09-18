"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { formatPrice, toFaDigits } from "@/lib/format";

const steps = ["اطلاعات ارسال", "روش پرداخت", "تایید نهایی"];

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal >= 3000000 || subtotal === 0 ? 0 : 250000;
  const total = subtotal + shipping;

  if (lines.length === 0 && !placed) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center">
        <p className="text-sm font-semibold text-[var(--color-text)]">سبد خرید شما خالی است</p>
        <Link href="/products"><Button size="md">مشاهده محصولات</Button></Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-success-light)] text-[var(--color-success)]">
          <svg viewBox="0 0 20 20" className="h-8 w-8" fill="currentColor">
            <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.3 9.5a1 1 0 1 1 1.4-1.4l3.6 3.6 6.7-6.7a1 1 0 0 1 1.4.3Z" clipRule="evenodd" />
          </svg>
        </span>
        <h1 className="text-xl font-extrabold text-[var(--color-text)]">سفارش شما با موفقیت ثبت شد</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          این یک نسخه دموی نمایشی از فرآیند خرید است. سفارش واقعی ثبت نشده است.
        </p>
        <Link href="/"><Button size="md" className="mt-2">بازگشت به صفحه اصلی</Button></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:py-10">
      <h1 className="mb-6 text-2xl font-extrabold text-[var(--color-text)]">تکمیل خرید</h1>

      <div className="mb-8 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i <= step ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-bg-muted)] text-[var(--color-text-faint)]"}`}>
              {toFaDigits(i + 1)}
            </div>
            <span className={`hidden text-xs font-semibold sm:block ${i <= step ? "text-[var(--color-text)]" : "text-[var(--color-text-faint)]"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 ${i < step ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"}`} />}
          </div>
        ))}
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] p-5 sm:p-7">
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold text-[var(--color-text)]">اطلاعات گیرنده</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input placeholder="نام و نام خانوادگی" className="h-11 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-3.5 text-sm outline-none focus:border-[var(--color-primary)]" />
              <input placeholder="شماره موبایل" dir="ltr" className="h-11 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-3.5 text-sm outline-none focus:border-[var(--color-primary)]" />
              <input placeholder="شهر" className="h-11 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-3.5 text-sm outline-none focus:border-[var(--color-primary)]" />
              <input placeholder="کد پستی" dir="ltr" className="h-11 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-3.5 text-sm outline-none focus:border-[var(--color-primary)]" />
              <textarea placeholder="آدرس کامل" className="h-24 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--color-primary)] sm:col-span-2" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-[var(--color-text)]">روش پرداخت</h2>
            <label className="flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-primary)] bg-[var(--color-primary-tint)] p-4">
              <input type="radio" defaultChecked name="pay" className="h-4 w-4 accent-[var(--color-primary)]" />
              <div>
                <div className="text-sm font-bold text-[var(--color-text)]">پرداخت آنلاین (درگاه بانکی)</div>
                <div className="text-xs text-[var(--color-text-muted)]">پرداخت امن از طریق درگاه بانک</div>
              </div>
            </label>
            <label className="flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] p-4">
              <input type="radio" name="pay" className="h-4 w-4 accent-[var(--color-primary)]" />
              <div>
                <div className="text-sm font-bold text-[var(--color-text)]">پرداخت در محل</div>
                <div className="text-xs text-[var(--color-text-muted)]">پرداخت نقدی هنگام تحویل کالا</div>
              </div>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-bold text-[var(--color-text)]">بررسی نهایی سفارش</h2>
            {lines.map((l) => {
              const p = products.find((pr) => pr.id === l.productId);
              if (!p) return null;
              return (
                <div key={l.productId} className="flex justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">{p.name} × {toFaDigits(l.qty)}</span>
                  <span className="tnum font-semibold text-[var(--color-text)]">{formatPrice(p.price * l.qty)}</span>
                </div>
              );
            })}
            <div className="mt-2 flex justify-between border-t border-[var(--color-border)] pt-3 text-base font-extrabold">
              <span>مبلغ قابل پرداخت</span>
              <span className="tnum">{formatPrice(total)}</span>
            </div>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between gap-3">
          <Button variant="ghost" size="md" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            مرحله قبل
          </Button>
          {step < steps.length - 1 ? (
            <Button size="md" onClick={() => setStep((s) => s + 1)}>مرحله بعد</Button>
          ) : (
            <Button
              size="md"
              onClick={() => {
                clear();
                setPlaced(true);
                router.refresh();
              }}
            >
              ثبت نهایی سفارش
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
