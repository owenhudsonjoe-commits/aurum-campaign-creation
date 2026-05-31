import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import bridal from "@/assets/pk-bridal.jpg";
import pret from "@/assets/pk-pret.jpg";
import men from "@/assets/pk-men.jpg";

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

export const PRODUCTS: Product[] = [
  {
    id: "b-001",
    slug: "noor-e-jahan-bridal-lehenga",
    name: "Noor-e-Jahan Bridal Lehenga",
    urduName: "نور جہاں",
    category: "Bridal",
    fabricType: "Stitched",
    price: 485000,
    badge: "Bestseller",
    images: [product1, bridal],
    description:
      "A masterpiece of hand-embroidered zardozi on silk organza — the Noor-e-Jahan lehenga takes 300+ hours to complete, woven with 22-carat gold tilla and Swarovski accents.",
    details: [
      "Fabric: Pure silk organza with raw silk underlining",
      "Embroidery: Zardozi, dabka, and 22-carat gold tilla",
      "Set: Lehenga, blouse, and dupatta",
      "Customisable: Colour, embroidery density, silhouette",
      "Comes in our signature emerald trunk with rose-silk lining",
    ],
    leadTime: "12–14 weeks",
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    sizeChart: [
      { size: "XS", chest: "32″", waist: "26″", hips: "34″" },
      { size: "S", chest: "34″", waist: "28″", hips: "36″" },
      { size: "M", chest: "36″", waist: "30″", hips: "38″" },
      { size: "L", chest: "38″", waist: "32″", hips: "40″" },
      { size: "XL", chest: "40″", waist: "34″", hips: "42″" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "b-002",
    slug: "gulbahar-anarkali-set",
    name: "Gulbahar Anarkali Set",
    urduName: "گل بہار",
    category: "Bridal",
    fabricType: "Stitched",
    price: 320000,
    badge: "New",
    images: [product2, bridal],
    description:
      "Flowing anarkali in antique-ivory silk with hand-applied gulbahar motifs — delicate petals traced in silver dabka and natural pearls.",
    details: [
      "Fabric: Pure raw silk",
      "Embroidery: Silver dabka, kamdani, and freshwater pearls",
      "Set: Anarkali, palazzo, and dupatta",
      "Occasion: Walima, engagement, mehndi",
    ],
    leadTime: "10–12 weeks",
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    sizeChart: [
      { size: "XS", chest: "32″", waist: "26″", hips: "34″" },
      { size: "S", chest: "34″", waist: "28″", hips: "36″" },
      { size: "M", chest: "36″", waist: "30″", hips: "38″" },
      { size: "L", chest: "38″", waist: "32″", hips: "40″" },
      { size: "XL", chest: "40″", waist: "34″", hips: "42″" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "b-003",
    slug: "shahnaz-bridal-tissue",
    name: "Shahnaz Bridal Tissue",
    urduName: "شہناز",
    category: "Bridal",
    fabricType: "Unstitched",
    price: 195000,
    badge: "Limited",
    images: [product3, bridal],
    description:
      "Three-piece unstitched bridal tissue with zardozi border panels — to be tailored to your exact measurements by your chosen couturier.",
    details: [
      "Fabric: Tissue silk with organza dupatta",
      "Embroidery: Zardozi border, scattered motifs",
      "Set: 3-piece unstitched (shirt, trouser, dupatta)",
      "Limited run of 50 pieces per season",
    ],
    leadTime: "3–5 weeks",
    sizes: ["2.5m shirt", "2.5m trouser", "2.5m dupatta"],
    sizeChart: [],
    inStock: true,
  },
  {
    id: "f-001",
    slug: "eid-ul-raha-gharara",
    name: "Eid-ul-Raha Gharara",
    urduName: "عید الرحا",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 128000,
    badge: "Bestseller",
    images: [product2, pret],
    description:
      "A celebration gharara in dusty rose organza with delicate kamdani jaal — ready to wear and ready to shine.",
    details: [
      "Fabric: Organza with raw silk lining",
      "Embroidery: All-over kamdani jaal",
      "Set: Kameez and flared gharara",
      "Occasion: Eid, mehndi, sangeet",
    ],
    leadTime: "6–8 weeks",
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeChart: [
      { size: "XS", chest: "32″", waist: "26″", hips: "34″" },
      { size: "S", chest: "34″", waist: "28″", hips: "36″" },
      { size: "M", chest: "36″", waist: "30″", hips: "38″" },
      { size: "L", chest: "38″", waist: "32″", hips: "40″" },
      { size: "XL", chest: "40″", waist: "34″", hips: "42″" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "f-002",
    slug: "jasmine-lawn-suit",
    name: "Jasmine Festive Lawn",
    urduName: "یاسمین",
    category: "Festive / Pret",
    fabricType: "Unstitched",
    price: 42000,
    badge: "New",
    images: [product4, pret],
    description:
      "Luxury festive lawn with intricate block-print borders and a hand-embroidered neckline — the perfect summer Eid ensemble.",
    details: [
      "Fabric: Premium Swiss lawn (shirt), cambric (trouser), chiffon (dupatta)",
      "Embroidery: Neckline hand embroidery, border print",
      "Set: 3-piece unstitched",
    ],
    leadTime: "2–3 weeks",
    sizes: ["3m shirt", "2.5m trouser", "2.5m dupatta"],
    sizeChart: [],
    inStock: true,
  },
  {
    id: "f-003",
    slug: "raat-ki-rani-sharara",
    name: "Raat-ki-Rani Sharara",
    urduName: "رات کی رانی",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 98000,
    badge: "Last Piece",
    images: [product1, pret],
    description:
      "Midnight navy sharara with silver sitara embroidery — hand-finished in our atelier for a woman who owns the room.",
    details: [
      "Fabric: Raw silk with silk satin lining",
      "Embroidery: Silver sitara, dabka accents",
      "Set: Short kameez and wide-leg sharara",
      "Occasion: Formal dinners, festive occasions",
    ],
    leadTime: "6–8 weeks",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: "34″", waist: "28″", hips: "36″" },
      { size: "M", chest: "36″", waist: "30″", hips: "38″" },
      { size: "L", chest: "38″", waist: "32″", hips: "40″" },
    ],
    inStock: true,
  },
  {
    id: "m-001",
    slug: "sultan-sherwani",
    name: "Sultan Sherwani",
    urduName: "سلطان",
    category: "Men's",
    fabricType: "Stitched",
    price: 215000,
    badge: "Bestseller",
    images: [men, product3],
    description:
      "The Sultan Sherwani — floor-length ivory brocade with hand-embroidered gold tilla collar and cuffs. The definitive groom's piece.",
    details: [
      "Fabric: Jacquard brocade over raw silk lining",
      "Embroidery: Gold tilla on collar, cuffs, and placket",
      "Set: Sherwani, churidar, and embroidered dupatta",
      "Occasion: Wedding, walima, formal",
    ],
    leadTime: "8–10 weeks",
    sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
    sizeChart: [
      { size: "S", chest: "38″", waist: "32″", shoulder: "17″" },
      { size: "M", chest: "40″", waist: "34″", shoulder: "18″" },
      { size: "L", chest: "42″", waist: "36″", shoulder: "19″" },
      { size: "XL", chest: "44″", waist: "38″", shoulder: "20″" },
      { size: "XXL", chest: "46″", waist: "40″", shoulder: "21″" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "m-002",
    slug: "bandhgala-kurta-set",
    name: "Darbar Bandhgala Set",
    urduName: "دربار",
    category: "Men's",
    fabricType: "Stitched",
    price: 145000,
    badge: "New",
    images: [product4, men],
    description:
      "A tailored bandhgala jacket in deep emerald velvet — worn over a hand-loomed kurta and matching trouser. Modern heritage at its finest.",
    details: [
      "Fabric: Italian velvet jacket, hand-loomed cotton kurta",
      "Embroidery: Tilla buttons, embroidered pockets",
      "Set: Bandhgala, kurta, and trouser",
      "Occasion: Eid, mehndi, corporate formal",
    ],
    leadTime: "6–8 weeks",
    sizes: ["S", "M", "L", "XL", "XXL", "Custom"],
    sizeChart: [
      { size: "S", chest: "38″", waist: "32″", shoulder: "17″" },
      { size: "M", chest: "40″", waist: "34″", shoulder: "18″" },
      { size: "L", chest: "42″", waist: "36″", shoulder: "19″" },
      { size: "XL", chest: "44″", waist: "38″", shoulder: "20″" },
      { size: "XXL", chest: "46″", waist: "40″", shoulder: "21″" },
    ],
    inStock: true,
  },
  {
    id: "m-003",
    slug: "malika-unstitched-fabric",
    name: "Jalwa Unstitched Suit",
    urduName: "جلوہ",
    category: "Men's",
    fabricType: "Unstitched",
    price: 55000,
    images: [product2, men],
    description:
      "Premium unstitched men's kurta-trouser in hand-woven chanderi — for the man who prefers his own tailor's touch.",
    details: [
      "Fabric: Hand-woven chanderi with silk finish",
      "Embellishment: Woven self-border",
      "Set: 4m kurta fabric + 2.5m trouser fabric",
    ],
    leadTime: "1–2 weeks",
    sizes: ["4m shirt", "2.5m trouser"],
    sizeChart: [],
    inStock: true,
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
  return "PKR " + price.toLocaleString("en-PK");
}
