import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsPageClient } from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "لوازم یدکی خودرو",
  description: "مرور و خرید لوازم یدکی اورجینال خودرو با فیلتر بر اساس برند، قیمت و مدل خودرو.",
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageClient />
    </Suspense>
  );
}
