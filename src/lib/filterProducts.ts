import { products } from "@/data/products";
import { getBrandBySlug } from "@/data/brands";
import type { Availability, Product } from "@/data/types";

export type SortOption =
  | "relevant"
  | "newest"
  | "cheapest"
  | "expensive"
  | "bestseller"
  | "discount";

export interface ProductFilters {
  q?: string;
  category?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  availability?: Availability[];
  sort?: SortOption;
}

export function filterAndSortProducts(filters: ProductFilters): Product[] {
  let result = [...products];

  if (filters.q) {
    const q = filters.q.trim().toLowerCase();
    result = result.filter((p) => {
      const brand = getBrandBySlug(p.brandSlug);
      return (
        p.name.toLowerCase().includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        brand?.name.toLowerCase().includes(q) ||
        p.compatibility.some((c) => c.toLowerCase().includes(q))
      );
    });
  }

  if (filters.category) {
    result = result.filter((p) => p.categorySlug === filters.category);
  }

  if (filters.brands && filters.brands.length > 0) {
    result = result.filter((p) => filters.brands!.includes(p.brandSlug));
  }

  if (typeof filters.minPrice === "number") {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (typeof filters.maxPrice === "number") {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.availability && filters.availability.length > 0) {
    result = result.filter((p) => filters.availability!.includes(p.availability));
  }

  switch (filters.sort) {
    case "cheapest":
      result.sort((a, b) => a.price - b.price);
      break;
    case "expensive":
      result.sort((a, b) => b.price - a.price);
      break;
    case "bestseller":
      result.sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || b.reviewCount - a.reviewCount);
      break;
    case "discount":
      result.sort((a, b) => {
        const da = a.oldPrice ? a.oldPrice - a.price : 0;
        const db = b.oldPrice ? b.oldPrice - b.price : 0;
        return db - da;
      });
      break;
    case "newest":
      result.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
      break;
    default:
      result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}
