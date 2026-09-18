import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "یدک‌مارت | فروشگاه اینترنتی لوازم یدکی خودرو",
    template: "%s | یدک‌مارت",
  },
  description:
    "خرید مطمئن لوازم یدکی خودرو با ضمانت اصالت کالا، تطابق دقیق قطعه با خودروی شما و ارسال سریع به سراسر کشور.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <Providers>
          <Header />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
