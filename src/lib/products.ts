export type Badge = "New" | "Limited" | "Last Piece" | "Bestseller";
export type FabricType = "Stitched" | "Unstitched";
export type Collection = "Bridal" | "Festive / Pret" | "Men's";

export interface SizeChartRow {
  size: string;
  chest?: string;
  waist?: string;
  hips?: string;
  length?: string;
  shoulder?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  urduName?: string;
  category: Collection;
  fabricType: FabricType;
  price: number;
  badge?: Badge;
  images: string[];
  description: string;
  details: string[];
  leadTime: string;
  sizes: string[];
  sizeChart: SizeChartRow[];
  inStock: boolean;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCollection(collection: Collection): Product[] {
  return PRODUCTS.filter((p) => p.category === collection);
}

export function getProductsByFabricType(type: FabricType): Product[] {
  return PRODUCTS.filter((p) => p.fabricType === type);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function formatPrice(price: number): string {
  return "PKR " + price.toLocaleString("en-PK");
}
