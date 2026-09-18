import { Hero } from "@/components/home/Hero";
import { PartFinder } from "@/components/home/PartFinder";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { VehicleSelector } from "@/components/home/VehicleSelector";
import { BrandsStrip } from "@/components/home/BrandsStrip";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getBestsellers, getFeatured, getNewArrivals } from "@/data/products";

export default function Home() {
  return (
    <>
      <Hero />
      <PartFinder />
      <CategoryGrid />
      <ProductSection
        title="محصولات پرفروش"
        subtitle="پرطرفدارترین قطعات میان مشتریان یدک‌مارت"
        products={getBestsellers()}
        viewAllHref="/products?sort=bestseller"
      />
      <ProductSection
        title="پیشنهادهای ویژه"
        subtitle="تخفیف‌های محدود، تا پایان موجودی"
        products={getFeatured()}
        viewAllHref="/products?sort=discount"
        tone="subtle"
      />
      <VehicleSelector />
      <ProductSection
        title="تازه‌های فروشگاه"
        subtitle="جدیدترین قطعات اضافه‌شده به یدک‌مارت"
        products={getNewArrivals()}
        viewAllHref="/products?sort=newest"
      />
      <BrandsStrip />
      <TrustSection />
      <FinalCTA />
    </>
  );
}
