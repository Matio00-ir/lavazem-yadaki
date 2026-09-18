import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { getBrandBySlug } from "@/data/brands";
import { getCategoryBySlug } from "@/data/categories";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductCard } from "@/components/product/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const brand = getBrandBySlug(product.brandSlug);
  const category = getCategoryBySlug(product.categorySlug);
  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.partNumber,
    brand: { "@type": "Brand", name: brand?.name },
    aggregateRating: product.reviewCount > 0
      ? { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount }
      : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "IRR",
      price: product.price * 10,
      availability:
        product.availability === "in_stock"
          ? "https://schema.org/InStock"
          : product.availability === "low_stock"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="mb-5 flex items-center gap-1 text-xs text-[var(--color-text-faint)]">
        <Link href="/" className="hover:text-[var(--color-text)]">خانه</Link>
        <span>/</span>
        <Link href={`/products?category=${category?.slug}`} className="hover:text-[var(--color-text)]">{category?.name}</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{brand?.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <ProductBuyBox product={product} />
        </div>
        <div className="order-1 lg:order-2">
          <ProductGallery icon={product.icon} accent={product.accent} />
        </div>
      </div>

      <ProductTabs product={product} />

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-xl font-extrabold text-[var(--color-text)] sm:text-2xl">محصولات مرتبط</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
