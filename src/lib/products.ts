import bridalImg from "@/assets/pk-bridal.jpg";
import heroImg from "@/assets/pk-hero.png";
import pretImg from "@/assets/pk-pret.jpg";
import menImg from "@/assets/pk-men.jpg";
import atelierImg from "@/assets/pk-atelier.jpg";
import look1Img from "@/assets/pk-look-1.jpg";
import look2Img from "@/assets/pk-look-2.jpg";
import product1Img from "@/assets/product-1.jpg";
import product2Img from "@/assets/product-2.jpg";
import product3Img from "@/assets/product-3.jpg";
import product4Img from "@/assets/product-4.jpg";

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
    id: "p001",
    slug: "shahnaaz-bridal-lehenga",
    name: "Shahnaaz Bridal Lehenga",
    urduName: "شہناز",
    category: "Bridal",
    fabricType: "Stitched",
    price: 1250000,
    badge: "Limited",
    images: [bridalImg, heroImg, look1Img],
    description:
      "Shahnaaz — meaning 'pride of the king' — is our most iconic bridal lehenga. Hand-embroidered over eight weeks by master karigars in Lahore using pure zardozi, gota patti and resham thread on velvet. The skirt fans into 9 metres of fabric, ensuring a regal, cinematic entrance on your wedding day.",
    details: [
      "Fabric: Pure velvet lehenga · Raw silk dupatta · Organza inner",
      "Embroidery: Zardozi, gota patti, resham — fully hand-worked",
      "Colour: Deep crimson with antique gold",
      "Includes: Lehenga, choli, dupatta & inner slip",
      "Care: Dry clean only · Store flat in silk bag provided",
    ],
    leadTime: "Made to Order · 10–14 weeks",
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    sizeChart: [
      { size: "XS", chest: "32\"", waist: "26\"", hips: "35\"", length: "42\"" },
      { size: "S",  chest: "34\"", waist: "28\"", hips: "37\"", length: "42\"" },
      { size: "M",  chest: "36\"", waist: "30\"", hips: "39\"", length: "43\"" },
      { size: "L",  chest: "38\"", waist: "32\"", hips: "41\"", length: "43\"" },
      { size: "XL", chest: "40\"", waist: "34\"", hips: "43\"", length: "44\"" },
      { size: "Custom", chest: "—", waist: "—", hips: "—", length: "—" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "p002",
    slug: "noorjahan-festive-sharara",
    name: "Noorjahan Festive Sharara",
    urduName: "نورجہاں",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 285000,
    badge: "New",
    images: [pretImg, look2Img],
    description:
      "Named after the most powerful empress of the Mughal court, Noorjahan is our signature festive sharara set. Crafted in blush organza with delicate mirror and thread work across the hemline and sleeves, it transitions effortlessly from mehndi mornings to late-night soirées.",
    details: [
      "Fabric: Pure organza sharara · Tissue silk kurta · Chiffon dupatta",
      "Embroidery: Mirror work, thread embroidery, sequin scatter",
      "Colour: Blush rose with gold mirror",
      "Includes: Sharara, kurta, dupatta",
      "Care: Dry clean only",
    ],
    leadTime: "Made to Order · 6–8 weeks",
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    sizeChart: [
      { size: "XS", chest: "32\"", waist: "24\"", hips: "34\"", length: "40\"" },
      { size: "S",  chest: "34\"", waist: "26\"", hips: "36\"", length: "40\"" },
      { size: "M",  chest: "36\"", waist: "28\"", hips: "38\"", length: "41\"" },
      { size: "L",  chest: "38\"", waist: "30\"", hips: "40\"", length: "41\"" },
      { size: "XL", chest: "40\"", waist: "32\"", hips: "42\"", length: "42\"" },
      { size: "Custom", chest: "—", waist: "—", hips: "—", length: "—" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "p003",
    slug: "asaf-jah-sherwani",
    name: "Asaf Jah Sherwani",
    urduName: "آصف جاہ",
    category: "Men's",
    fabricType: "Stitched",
    price: 495000,
    images: [menImg, product3Img],
    description:
      "Tailored in our Lahore atelier over six weeks, the Asaf Jah sherwani is cut from handwoven silk brocade and finished with intricate thread embroidery at the collar and cuffs. A timeless silhouette for the groom who commands every room.",
    details: [
      "Fabric: Handwoven silk brocade",
      "Embroidery: Thread and zari at collar, cuffs, placket",
      "Colour: Ivory with antique gold",
      "Includes: Sherwani, churidar pyjama, stole",
      "Care: Dry clean only",
    ],
    leadTime: "Made to Order · 8–10 weeks",
    sizes: ["38", "40", "42", "44", "46", "Custom"],
    sizeChart: [
      { size: "38", chest: "38\"", waist: "32\"", shoulder: "17\"",   length: "46\"" },
      { size: "40", chest: "40\"", waist: "34\"", shoulder: "17.5\"", length: "46\"" },
      { size: "42", chest: "42\"", waist: "36\"", shoulder: "18\"",   length: "47\"" },
      { size: "44", chest: "44\"", waist: "38\"", shoulder: "18.5\"", length: "47\"" },
      { size: "46", chest: "46\"", waist: "40\"", shoulder: "19\"",   length: "48\"" },
      { size: "Custom", chest: "—", waist: "—", shoulder: "—", length: "—" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "p004",
    slug: "zumurrud-anarkali",
    name: "Zumurrud Anarkali",
    urduName: "زمرد",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 685000,
    badge: "Last Piece",
    images: [look1Img, look2Img, product1Img],
    description:
      "Zumurrud — emerald — is our most celebrated anarkali silhouette. Falling in layers of pure silk organza, it carries a whisper of the Mughal zenana in every pleat. The bodice is encrusted with hand-set polki stones and real zari threadwork that catches light like a chandelier.",
    details: [
      "Fabric: Pure silk organza anarkali · Silk inner · Organza dupatta",
      "Embroidery: Hand-set polki stones, real zari, gota lace border",
      "Colour: Emerald green with gold",
      "Includes: Anarkali, palazzo trousers, dupatta",
      "Care: Dry clean only",
    ],
    leadTime: "Ready to Ship in 2–3 weeks (last piece)",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: "34\"", waist: "28\"", hips: "38\"", length: "55\"" },
      { size: "M", chest: "36\"", waist: "30\"", hips: "40\"", length: "55\"" },
      { size: "L", chest: "38\"", waist: "32\"", hips: "42\"", length: "56\"" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "p005",
    slug: "gulbahar-unstitched-lawn",
    name: "Gulbahar Embroidered Lawn",
    urduName: "گلبہار",
    category: "Festive / Pret",
    fabricType: "Unstitched",
    price: 42000,
    badge: "New",
    images: [pretImg, product2Img],
    description:
      "Gulbahar is our luxury unstitched lawn collection — giving you the freedom to tailor the cut to perfection. The fabric is printed and hand-embroidered with a signature floral motif inspired by Mughal garden paintings. Stitch it as a kurta, anarkali or a contemporary co-ord — the choice is yours.",
    details: [
      "Fabric: Premium Swiss lawn · Chiffon dupatta · Cotton trouser fabric",
      "Embroidery: Machine-embroidered border, printed body",
      "Colour: Powder blue with ivory embroidery",
      "Includes: 3-piece unstitched fabric",
      "Stitching: Available at additional cost — contact us",
    ],
    leadTime: "In Stock · Ships in 3–5 days",
    sizes: ["3-Piece Set"],
    sizeChart: [
      { size: "Shirt",   length: "3 metres" },
      { size: "Dupatta", length: "2.5 metres" },
      { size: "Trouser", length: "2.5 metres" },
    ],
    inStock: true,
  },
  {
    id: "p006",
    slug: "bahar-unstitched-chiffon",
    name: "Bahar Embroidered Chiffon",
    urduName: "بہار",
    category: "Bridal",
    fabricType: "Unstitched",
    price: 125000,
    images: [bridalImg, product4Img],
    description:
      "Our Bahar unstitched chiffon is hand-embroidered over three weeks with delicate tilla and resham work across the entire shirt length. Perfect for the bride who wants her wedding outfit stitched by her own trusted tailor or wishes to match a pre-existing style.",
    details: [
      "Fabric: Imported Korean chiffon shirt fabric · Net dupatta with heavy border",
      "Embroidery: Tilla, resham, sequin — full shirt embroidery",
      "Colour: Ivory with silver and gold",
      "Includes: Shirt fabric (3m), dupatta, trouser fabric",
    ],
    leadTime: "In Stock · Ships in 3–5 days",
    sizes: ["3-Piece Set"],
    sizeChart: [
      { size: "Shirt",   length: "3 metres" },
      { size: "Dupatta", length: "2.5 metres" },
      { size: "Trouser", length: "2.5 metres" },
    ],
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
