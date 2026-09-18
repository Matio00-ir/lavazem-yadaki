const points = [
  {
    title: "ضمانت اصالت کالا",
    desc: "تمام محصولات دارای هولوگرام و مهر اصالت از نمایندگی رسمی برند",
    icon: (
      <path d="M12 3l7 3v6c0 5-3.5 7.8-7 9-3.5-1.2-7-4-7-9V6l7-3Z" strokeWidth={1.8} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "تضمین تطابق قطعه",
    desc: "بررسی دقیق تطابق قطعه با مدل و سال خودروی شما پیش از ارسال",
    icon: (
      <path d="M4 12.5 9 17l11-11" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "ارسال سریع",
    desc: "ارسال به سراسر کشور، تحویل اکسپرس در تهران کمتر از ۲۴ ساعت",
    icon: (
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7v-6ZM6 19.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM17 19.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" strokeWidth={1.6} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "مشاوره تخصصی",
    desc: "پشتیبانی توسط تیم فنی مجرب پیش و پس از خرید قطعه",
    icon: (
      <path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.4-3.9A8 8 0 0 1 4 12Z" strokeWidth={1.7} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "امکان مرجوعی",
    desc: "۷ روز فرصت بازگشت کالا در صورت عدم تطابق یا نارضایتی",
    icon: (
      <path d="M4 8h11a5 5 0 1 1-4.5 7.5M4 8l3-3M4 8l3 3" strokeWidth={1.7} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "پشتیبانی کامل",
    desc: "همراهی تیم پشتیبانی از لحظه سفارش تا نصب قطعه",
    icon: (
      <path d="M6 10a6 6 0 1 1 12 0v5.5a2.5 2.5 0 0 1-2.5 2.5H14M6 10v6M18 10v6M4 15h2v3H4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1ZM18 15h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2v-3Z" strokeWidth={1.6} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export function TrustSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-[var(--color-text)] sm:text-3xl">چرا از یدک‌مارت خرید کنید؟</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">اعتماد شما، اولویت ماست</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((p) => (
          <div
            key={p.title}
            className="flex gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-shadow hover:shadow-[var(--shadow-card)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-primary-light)] text-[var(--color-primary)]">
              <svg viewBox="0 0 24 24" className="h-5.5 w-5.5">{p.icon}</svg>
            </span>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text)]">{p.title}</h3>
              <p className="mt-1 text-xs leading-6 text-[var(--color-text-muted)]">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
