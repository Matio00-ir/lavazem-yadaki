import Link from "next/link";
import { categories } from "@/data/categories";

const trustPoints = [
  "ضمانت اصالت کالا",
  "ارسال به سراسر کشور",
  "پرداخت امن و اقساطی",
  "۷ روز ضمانت بازگشت",
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-ink)] pb-24 text-[#c9ccd2] lg:pb-0">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 lg:px-6">
          {trustPoints.map((t) => (
            <div key={t} className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[var(--color-primary)]">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                  <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.3 9.5a1 1 0 1 1 1.4-1.4l3.6 3.6 6.7-6.7a1 1 0 0 1 1.4.3Z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-xs font-medium text-white/90">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-white/10">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-[var(--color-primary)]" fill="currentColor">
                  <path d="M5 12.5 6.4 8a2 2 0 0 1 1.9-1.4h7.4A2 2 0 0 1 17.6 8l1.4 4.5M4 15.5h16M6.5 15.5v2.2a1 1 0 0 1-1 1H4.3a1 1 0 0 1-1-1v-3.7M17.5 15.5v2.2a1 1 0 0 0 1 1h1.2a1 1 0 0 0 1-1v-3.7" stroke="currentColor" strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-base font-extrabold text-white">یدک‌مارت</span>
            </div>
            <p className="text-xs leading-6 text-white/60">
              خرید مطمئن لوازم یدکی خودرو با ضمانت اصالت، مشاوره تخصصی و ارسال سریع به سراسر کشور.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">دسته‌بندی‌ها</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/products?category=${c.slug}`} className="text-white/60 transition-colors hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">خدمات مشتریان</h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li><Link href="/products" className="text-white/60 transition-colors hover:text-white">پیگیری سفارش</Link></li>
              <li><Link href="/products" className="text-white/60 transition-colors hover:text-white">شرایط مرجوعی</Link></li>
              <li><Link href="/products" className="text-white/60 transition-colors hover:text-white">ضمانت اصالت</Link></li>
              <li><Link href="/products" className="text-white/60 transition-colors hover:text-white">تماس با ما</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">تماس با ما</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-white/60">
              <li className="tnum" dir="ltr">021-91234567</li>
              <li>پشتیبانی: شنبه تا پنجشنبه ۹ تا ۱۸</li>
              <li>تهران، خیابان جمهوری، پلاک ۱۲۰</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-white/45 sm:flex-row">
          <span>© تمامی حقوق این وب‌سایت متعلق به یدک‌مارت است.</span>
          <span>این یک نمونه دموی طراحی است.</span>
        </div>
      </div>
    </footer>
  );
}
