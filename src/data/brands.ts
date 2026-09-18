import type { Brand } from "./types";

export const brands: Brand[] = [
  { id: "b-bosch", slug: "bosch", name: "Bosch", country: "آلمان", tagline: "پیشرو در تکنولوژی خودرو" },
  { id: "b-mann", slug: "mann", name: "MANN-FILTER", country: "آلمان", tagline: "تخصص در فیلتراسیون" },
  { id: "b-valeo", slug: "valeo", name: "Valeo", country: "فرانسه", tagline: "قطعات برقی و کلاچ" },
  { id: "b-skf", slug: "skf", name: "SKF", country: "سوئد", tagline: "بلبرینگ و یاتاقان" },
  { id: "b-sachs", slug: "sachs", name: "Sachs", country: "آلمان", tagline: "کمک‌فنر و کلاچ" },
  { id: "b-ngk", slug: "ngk", name: "NGK", country: "ژاپن", tagline: "شمع و سیستم احتراق" },
  { id: "b-mahle", slug: "mahle", name: "Mahle", country: "آلمان", tagline: "قطعات موتور" },
  { id: "b-brembo", slug: "brembo", name: "Brembo", country: "ایتالیا", tagline: "سیستم ترمز حرفه‌ای" },
  { id: "b-gates", slug: "gates", name: "Gates", country: "آمریکا", tagline: "تسمه و سیستم انتقال قدرت" },
  { id: "b-denso", slug: "denso", name: "Denso", country: "ژاپن", tagline: "قطعات برقی و حرارتی" },
];

export const getBrandBySlug = (slug: string) => brands.find((b) => b.slug === slug);
