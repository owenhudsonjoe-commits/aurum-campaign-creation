const simran1 = "/simran-1.png";
const simran2 = "/simran-2.png";
const simran3 = "/simran-3.png";
const simran4 = "/simran-4.png";
const simran5 = "/simran-5.png";
const simran6 = "/simran-6.png";
const simranSizeChart = "/simran-size-chart.png";

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
  armHole?: string;
  legOpening?: string;
  trouserLength?: string;
  shirtLength?: string;
  thigh?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  urduName?: string;
  category: Collection;
  fabricType: FabricType;
  price: number;
  discountedPrice?: number;
  discountPercent?: number;
  badge?: Badge;
  images: string[];
  description: string;
  details: string[];
  leadTime: string;
  estimatedDelivery?: string;
  sizes: string[];
  sizeChart: SizeChartRow[];
  sizeChartImage?: string;
  reviewCount?: number;
  soldCount?: number;
  soldTimeframe?: string;
  returnPolicy?: string;
  inStock: boolean;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "f-003",
    slug: "casper-3pc-cotton",
    name: "Casper 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 7200,
    discountedPrice: 3312,
    discountPercent: 54,
    badge: "Bestseller",
    images: [
      "/casper-1.png",
      "/casper-2.png",
      "/casper-3.png",
      "/casper-4.png",
      "/casper-5.png",
      "/casper-6.png",
    ],
    description:
      "The Casper 3 Piece is a study in understated elegance — ivory premium cotton with a heavily embellished gold tilla yoke that catches the light beautifully. The wide-leg sharara is adorned with scattered floral gold threadwork, while a soft mint-tinted organza dupatta with tassel ends completes this timeless ensemble. A perfect festive choice for the woman who speaks through grace.",
    details: [
      "Fabric: Premium Cotton",
      "Embroidery: Gold tilla and zari yoke, scattered floral threadwork on sharara",
      "Buttons: Pearl button placket",
      "Set: 3-piece stitched (kameez, sharara, dupatta)",
      "Colour: Ivory / Off-White with gold embellishment",
      "Occasion: Festive, Eid, walima, family functions",
      "Care: Dry clean only — do not tumble dry",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: "/casper-size-chart.png",
    reviewCount: 7,
    soldCount: 38,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-002",
    slug: "rupenzal-2pc-printed",
    name: "Rupenzal 2 Pc (Printed)",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 8000,
    discountedPrice: 3840,
    discountPercent: 52,
    badge: "Bestseller",
    images: [
      "/rupenzal-1.png",
      "/rupenzal-2.png",
      "/rupenzal-3.png",
      "/rupenzal-4.png",
      "/rupenzal-5.png",
      "/rupenzal-6.png",
      "/rupenzal-7.png",
    ],
    description:
      "The Rupenzal 2 Piece is a vision of floral romance — crafted in premium Grip Silk with an all-over blue floral print on a crisp white base. The flowing silhouette features intricate embroidered borders at the hem and sleeves, with a delicate dotted net dupatta to complete the look. Perfect for festive evenings, garden parties, and beachside celebrations.",
    details: [
      "Fabric: Premium Grip Silk",
      "Print: All-over blue floral digital print",
      "Embroidery: Embroidered hem and sleeve borders",
      "Set: 2-piece stitched (maxi kameez + dupatta)",
      "Colour: White / Steel Blue",
      "Occasion: Festive, Eid, mehndi, outdoor celebrations",
      "Care: Dry clean only — handle with care",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: "/rupenzal-size-chart.png",
    reviewCount: 7,
    soldCount: 32,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-001",
    slug: "simran-3pc-organza",
    name: "Simran 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 9500,
    discountedPrice: 3230,
    discountPercent: 66,
    badge: "Bestseller",
    images: [simran1, simran2, simran3, simran4, simran5, simran6],
    description:
      "The Simran 3 Piece is a celebration of effortless elegance — crafted in sheer periwinkle organza adorned with intricate white thread embroidery running through the kameez, sleeves, and hemline. A floral lace border grounds the silhouette with refinement, while the soft dupatta adds a graceful finishing touch. Ready-to-wear and perfectly suited for festive gatherings, Eid, and family celebrations.",
    details: [
      "Fabric: Premium Organza",
      "Embroidery: White thread embroidery on kameez, sleeves, and hemline",
      "Border: Floral lace hem detail",
      "Set: 3-piece stitched (kameez, trouser, dupatta)",
      "Colour: Periwinkle / Sky Blue",
      "Occasion: Festive, Eid, mehndi, family gatherings",
      "Care: Dry clean only — do not wring or bleach",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      {
        size: "S",
        chest: '18–19"',
        shoulder: '14"',
        hips: '18"',
        armHole: '9"',
        legOpening: '8"',
        trouserLength: '37"',
        shirtLength: '37"',
        thigh: '12"',
      },
      {
        size: "M",
        chest: '21"',
        shoulder: '15"',
        hips: '21"',
        armHole: '9.5"',
        legOpening: '9"',
        trouserLength: '37"',
        shirtLength: '37"',
        thigh: '12"',
      },
      {
        size: "L",
        chest: '23"',
        shoulder: '16"',
        hips: '23"',
        armHole: '10"',
        legOpening: '9.5"',
        trouserLength: '38"',
        shirtLength: '38"',
        thigh: '13"',
      },
    ],
    sizeChartImage: simranSizeChart,
    reviewCount: 7,
    soldCount: 35,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
];

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
  return "RS " + price.toLocaleString("en-PK");
}
