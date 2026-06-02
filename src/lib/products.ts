const rimsha1 = "/rimsha-1.png";
const rimsha2 = "/rimsha-2.png";
const rimsha3 = "/rimsha-3.png";
const rimsha4 = "/rimsha-4.png";
const rimsha5 = "/rimsha-5.png";
const rimsha6 = "/rimsha-6.png";
const rimshaSizeChart = "/rimsha-size-chart.png";

const zyra1 = "/zyra-1.png";
const zyra2 = "/zyra-2.png";
const zyra3 = "/zyra-3.png";
const zyra4 = "/zyra-4.png";
const zyra5 = "/zyra-5.png";
const zyraSizeChart = "/zyra-size-chart.png";

const charm1 = "/charm-1.png";
const charm2 = "/charm-2.png";
const charm3 = "/charm-3.png";
const charm4 = "/charm-4.png";
const charm5 = "/charm-5.png";
const charm6 = "/charm-6.png";
const charm7 = "/charm-7.png";
const charmSizeChart = "/charm-size-chart.png";

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
    id: "f-010",
    slug: "rimsha-3pc-organza",
    name: "Rimsha 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 9000,
    discountedPrice: 4050,
    discountPercent: 55,
    badge: "Bestseller",
    images: [rimsha1, rimsha2, rimsha3, rimsha4, rimsha5, rimsha6],
    description:
      "Rimsha 3 Piece is a vision of artisan opulence — rich mocha organza layered with bold ivory cutwork appliqué that blooms across every inch of the kameez and sleeves. Grand floral medallions, lattice panels, and trailing vine motifs are all rendered in crisp relief against the sheer base, creating a three-dimensional texture that photographs like a dream. The straight-cut satin trouser and coordinated organza dupatta with matching cutwork border complete a look that is impossible to ignore.",
    details: [
      "Fabric: Premium Organza (kameez & dupatta)",
      "Trouser: Satin lining",
      "Embroidery: Full-coverage ivory cutwork appliqué — floral medallions, lattice panels, vine motifs",
      "Set: 3-piece stitched (kameez, trouser, dupatta)",
      "Colour: Mocha / Warm Brown with ivory appliqué",
      "Occasion: Festive, Eid, walima, formal dinners",
      "Care: Dry clean only — do not wring or bleach",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: rimshaSizeChart,
    reviewCount: 7,
    soldCount: 38,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-009",
    slug: "zyra-3pc-shamoz-silk",
    name: "Zyra 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 9000,
    discountedPrice: 4320,
    discountPercent: 52,
    badge: "Bestseller",
    images: [zyra1, zyra2, zyra3, zyra4, zyra5],
    description:
      "Zyra 3 Piece is a masterclass in modern restraint — rich midnight navy Shamoz Silk with a distinctive square neckline edged in tone-on-tone crystal and bead embellishment. A sweeping hem border of hand-scattered sequin florals catches every light, while the matching palazzos and draped dupatta complete a silhouette that is at once architectural and deeply feminine. For the woman who commands a room without trying.",
    details: [
      "Fabric: Shamoz Silk",
      "Embellishment: Crystal & bead trim on square neckline",
      "Embroidery: Sequin floral hem border (hand-worked)",
      "Set: 3-piece stitched (kameez, palazzo trouser, dupatta)",
      "Colour: Midnight Navy",
      "Occasion: Festive, Eid, walima, formal evenings",
      "Care: Dry clean only — do not wring or bleach",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: zyraSizeChart,
    reviewCount: 7,
    soldCount: 35,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-008",
    slug: "charm-2pc-cotton",
    name: "Charm 2 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 7990,
    discountedPrice: 3435,
    discountPercent: 57,
    badge: "Bestseller",
    images: [charm1, charm2, charm3, charm4, charm5, charm6, charm7],
    description:
      "The Charm 2 Piece is effortless festive elegance distilled into a single rose-toned silhouette — crafted in breathable premium cotton with delicate floral threadwork adorning the sleeves and trouser hem. Intricate cutwork borders trace the cuffs and wide-leg bottoms, while soft scattered embroidery adds a light, romantic touch to the full ensemble. A versatile, polished look that moves seamlessly from an afternoon dawat to an evening mehfil.",
    details: [
      "Fabric: Premium Cotton",
      "Embroidery: Scattered floral threadwork on sleeves and trouser hem",
      "Border: Cutwork (katha) trim on cuffs, hem, and trouser hem",
      "Set: 2-piece stitched (kameez + trouser)",
      "Colour: Dusty Rose / Mauve",
      "Occasion: Festive, Eid, dawat, casual gatherings",
      "Care: Machine wash cold, gentle cycle — do not tumble dry",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: charmSizeChart,
    reviewCount: 7,
    soldCount: 35,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-007",
    slug: "zeba-3pc-cotton",
    name: "Zeba 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 9500,
    discountedPrice: 5320,
    discountPercent: 44,
    badge: "Bestseller",
    images: [
      "/zeba-1.png",
      "/zeba-2.png",
      "/zeba-3.png",
      "/zeba-4.png",
      "/zeba-5.png",
      "/zeba-6.png",
    ],
    description:
      "Zeba 3 Piece is pure festive drama in the most regal of tones — deep plum premium cotton cut into a sweeping A-line silhouette with a front-open flair. The grandeur lives in the details: a bright purple sequin-dense hem border of arched motifs, richly embroidered bell cuffs alive with zardozi and resham florals, a delicate scattered neckline in gold and lilac, and a sheer plum dupatta sprinkled with sequin bootas. Whether you are leading the table at Eid or turning heads at a walima, Zeba commands every room.",
    details: [
      "Fabric: Premium Cotton",
      "Silhouette: A-line / frock-style with front opening",
      "Embroidery: Purple sequin-work hem border (arch motifs), zardozi & resham bell cuffs, gold-lilac neckline scatter",
      "Dupatta: Sheer plum with scattered sequin bootas",
      "Set: 3-piece stitched (kameez, trouser, dupatta)",
      "Colour: Deep Plum / Aubergine with purple & gold embellishments",
      "Occasion: Eid, walima, mehndi, formal gatherings",
      "Care: Hand wash cold — do not tumble dry",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: "/zeba-size-chart.png",
    reviewCount: 7,
    soldCount: 37,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-006",
    slug: "namal-3pc-cotton",
    name: "Namal 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 8500,
    discountedPrice: 3060,
    discountPercent: 64,
    badge: "Bestseller",
    images: [
      "/namal-1.png",
      "/namal-2.png",
      "/namal-3.png",
      "/namal-4.png",
      "/namal-5.png",
      "/namal-6.png",
    ],
    description:
      "Namal 3 Piece is a study in quiet confidence — deep forest green premium cotton, richly embroidered with ivory and black thread in grand floral arches at the neckline, dense bands at the hem and cuffs, and a delicate scatter of mirror-work on the matching chiffon dupatta. Paired with ivory straight-leg trousers carrying coordinated border embroidery at the ankle, this ensemble moves effortlessly from a family dawat to a moonlit mehndi.",
    details: [
      "Fabric: Premium Cotton",
      "Embroidery: Ivory & black threadwork — neckline arch, dense hem and cuff borders",
      "Dupatta: Olive-green chiffon with scattered mirror-work",
      "Trouser: Ivory with matching green border embroidery",
      "Set: 3-piece stitched (kameez, trouser, dupatta)",
      "Colour: Forest Green with ivory & black embroidery",
      "Occasion: Festive, Eid, mehndi, dawat",
      "Care: Machine wash cold, gentle cycle — do not tumble dry",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: "/namal-size-chart.png",
    reviewCount: 7,
    soldCount: 31,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-005",
    slug: "zara-3pc-cotton",
    name: "Zara 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 9000,
    discountedPrice: 3060,
    discountPercent: 66,
    badge: "Bestseller",
    images: [
      "/zara-1.png",
      "/zara-2.png",
      "/zara-3.png",
      "/zara-4.png",
      "/zara-5.png",
    ],
    description:
      "Zara 3 Piece captures the romance of a Lahori spring — dusty rose premium cotton adorned with all-over white floral threadwork and intricate border embroidery at the hem and cuffs. The matching chikankari dupatta and straight-cut trouser create a complete, effortlessly feminine look that is just as beautiful at a mehndi as it is on a family lunch.",
    details: [
      "Fabric: Premium Cotton",
      "Embroidery: White chikankari floral motifs, dense border at hem and cuffs",
      "Set: 3-piece stitched (kameez, trouser, dupatta)",
      "Colour: Dusty Rose / Blush Pink with white embroidery",
      "Occasion: Festive, Eid, mehndi, casual gatherings",
      "Care: Machine wash cold, gentle cycle — do not tumble dry",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: "/zara-size-chart.png",
    reviewCount: 7,
    soldCount: 21,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-004",
    slug: "sahar-3pc-organza",
    name: "Sahar 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 10000,
    discountedPrice: 3400,
    discountPercent: 66,
    badge: "Bestseller",
    images: [
      "/sahar-1.png",
      "/sahar-2.png",
      "/sahar-3.png",
      "/sahar-4.png",
      "/sahar-5.png",
      "/sahar-6.png",
    ],
    description:
      "Sahar 3 Piece is a luminous celebration of fine organza — ivory white with intricate gold and silver threadwork cascading down the front panel and hem border. The sheer sleeves and dupatta float like morning light, while delicate leaf and floral motifs hand-embroidered across the fabric make this an effortlessly regal choice for any festive occasion.",
    details: [
      "Fabric: Premium Organza",
      "Embroidery: Gold & silver zari threadwork, floral and leaf motifs",
      "Set: 3-piece stitched (kameez, trouser, dupatta)",
      "Colour: Ivory / Off-White with gold-silver embellishment",
      "Occasion: Festive, Eid, mehndi, family gatherings",
      "Care: Dry clean only — handle dupatta with care",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: "/sahar-size-chart.png",
    reviewCount: 7,
    soldCount: 35,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
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
