export type PartIcon =
  | "oil-filter"
  | "air-filter"
  | "cabin-filter"
  | "brake-pad"
  | "brake-disc"
  | "spark-plug"
  | "belt"
  | "bearing"
  | "suspension"
  | "engine"
  | "sensor"
  | "electrical"
  | "oil"
  | "radiator"
  | "battery"
  | "wiper";

export type Availability = "in_stock" | "low_stock" | "out_of_stock";

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  icon: PartIcon;
  productCount: number;
  description: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  country: string;
  tagline: string;
}

export interface VehicleEngine {
  id: string;
  name: string;
}

export interface VehicleYearRange {
  id: string;
  label: string;
  engines: VehicleEngine[];
}

export interface VehicleModel {
  id: string;
  name: string;
  years: VehicleYearRange[];
}

export interface VehicleBrand {
  id: string;
  name: string;
  models: VehicleModel[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandSlug: string;
  categorySlug: string;
  partNumber: string;
  icon: PartIcon;
  accent: string;
  compatibility: string[];
  rating: number;
  reviewCount: number;
  availability: Availability;
  isOriginal: boolean;
  price: number;
  oldPrice?: number;
  bestseller?: boolean;
  featured?: boolean;
  newArrival?: boolean;
  description: string;
  specs: ProductSpec[];
  reviews: Review[];
  warrantyMonths: number;
}
