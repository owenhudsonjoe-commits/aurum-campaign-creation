const zimal1 = "/zimal-1.png";
const zimal2 = "/zimal-2.png";
const zimal3 = "/zimal-3.png";
const zimal4 = "/zimal-4.png";
const zimal5 = "/zimal-5.png";
const zimalSizeChart = "/zimal-size-chart.png";

const mishka1 = "/mishka-1.png";
const mishka2 = "/mishka-2.png";
const mishka3 = "/mishka-3.png";
const mishka4 = "/mishka-4.png";
const mishka5 = "/mishka-5.png";
const mishka6 = "/mishka-6.png";
const mishka7 = "/mishka-7.png";
const mishkaSizeChart = "/mishka-size-chart.png";

const nayaab1 = "/nayaab-1.png";
const nayaab2 = "/nayaab-2.png";
const nayaab3 = "/nayaab-3.png";
const nayaab4 = "/nayaab-4.png";
const nayaabSizeChart = "/nayaab-size-chart.png";

const zarmina1 = "/zarmina-1.png";
const zarmina2 = "/zarmina-2.png";
const zarmina3 = "/zarmina-3.png";
const zarmina4 = "/zarmina-4.png";
const zarmina5 = "/zarmina-5.png";
const zarmina6 = "/zarmina-6.png";
const zarmina7 = "/zarmina-7.png";
const zarminaSizeChart = "/zarmina-size-chart.png";

const mehmal1 = "/mehmal-1.png";
const mehmal2 = "/mehmal-2.png";
const mehmal3 = "/mehmal-3.png";
const mehmal4 = "/mehmal-4.png";
const mehmal5 = "/mehmal-5.png";
const mehmal6 = "/mehmal-6.png";
const mehmal7 = "/mehmal-7.png";
const mehmal8 = "/mehmal-8.png";
const mehmalSizeChart = "/mehmal-size-chart.png";

const nazneen1 = "/nazneen-1.png";
const nazneen2 = "/nazneen-2.png";
const nazneen3 = "/nazneen-3.png";
const nazneen4 = "/nazneen-4.png";
const nazneen5 = "/nazneen-5.png";
const nazneen6 = "/nazneen-6.png";
const nazneenSizeChart = "/nazneen-size-chart.png";

const hazel1 = "/hazel-1.png";
const hazel2 = "/hazel-2.png";
const hazel3 = "/hazel-3.png";
const hazel4 = "/hazel-4.png";
const hazel5 = "/hazel-5.png";
const hazelSizeChart = "/hazel-size-chart.png";

const iris1 = "/iris-1.png";
const iris2 = "/iris-2.png";
const iris3 = "/iris-3.png";
const iris4 = "/iris-4.png";
const iris5 = "/iris-5.png";
const irisSizeChart = "/iris-size-chart.png";

const tabeer1 = "/tabeer-1.png";
const tabeer2 = "/tabeer-2.png";
const tabeer3 = "/tabeer-3.png";
const tabeer4 = "/tabeer-4.png";
const tabeer5 = "/tabeer-5.png";
const tabeerSizeChart = "/tabeer-size-chart.png";

const shanzay1 = "/shanzay-1.png";
const shanzay2 = "/shanzay-2.png";
const shanzay3 = "/shanzay-3.png";
const shanzaySizeChart = "/shanzay-size-chart.png";

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
    id: "f-020",
    slug: "zimal-3pc-silk",
    name: "Zimal 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 15500,
    discountedPrice: 5850,
    discountPercent: 61,
    badge: "Bestseller",
    images: [zimal1, zimal2, zimal3, zimal4, zimal5],
    description:
      "Zimal 3 Piece is sunshine captured in silk — a radiant mustard yellow set that carries the warmth of golden hour in every thread. The kurta features a V-neck keyhole neckline adorned with delicate multi-colour floral embroidery in pink, teal, and silver, while the hem and sleeves are decorated with bold chevron zari borders that catch light with every movement. Dhoti-style trousers in the same lustrous silk mirror the hem embroidery, and the dupatta floats in matching yellow with a tonal gold border. Zimal is celebration made visible — bold, joyful, and impossible to ignore.",
    details: [
      "Fabric: Premium Pure Silk",
      "Neckline: V-neck keyhole with multi-colour floral embroidery (pink, teal, silver thread)",
      "Hem & Sleeves: Bold chevron zari border",
      "Trousers: Dhoti-style silk with matching chevron hem border",
      "Dupatta: Pure silk with tonal gold border",
      "Set: 3-piece stitched (kurta, dhoti trousers, dupatta)",
      "Colour: Mustard Yellow with multi-colour & gold embellishment",
      "Occasion: Mehndi, Eid, festive day events, bridal showers",
      "Care: Dry clean recommended",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: zimalSizeChart,
    reviewCount: 7,
    soldCount: 25,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-019",
    slug: "mishka-3pc-organza-silk-crepe",
    name: "Mishka 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 21700,
    discountedPrice: 9331,
    discountPercent: 57,
    badge: "Bestseller",
    images: [mishka1, mishka2, mishka3, mishka4, mishka5, mishka6, mishka7],
    description:
      "Mishka 3 Piece is a masterclass in Pakistani couture — mauve organza and silk crepe fused into a silhouette that is at once regal and romantic. The kurta is densely hand-embellished from neckline to hem: a jewelled column of mirror-cut stones cascades down the placket while the entire body blooms with intricate chikankari bootas in gold thread. The sleeves are a garden unto themselves — deep cutwork organza florals outlined in pearl and sequin finish in a scalloped border of breathtaking detail. Palazzo trousers in silk crepe carry a matching gold floral hem border, and the dupatta drifts in panels of sheer organza, its edge finished in the same lavish gold lace. Mishka is for the woman who knows that every stitch tells a story.",
    details: [
      "Fabric: Organza & Silk Crepe",
      "Embroidery: Hand-worked chikankari bootas in gold thread across body",
      "Neckline: Jewelled with mirror-cut stones & pearl detailing",
      "Sleeves: Cutwork organza florals with sequin & pearl border",
      "Trousers: Silk Crepe with gold floral hem border",
      "Dupatta: Sheer organza with heavy gold lace border (2.5M)",
      "Set: 3-piece stitched (kurta, palazzo trousers, dupatta)",
      "Colour: Mauve / Dusty Rose with gold embellishment",
      "Occasion: Barat, Walima, formal dinners, luxury weddings",
      "Care: Dry clean only",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: mishkaSizeChart,
    reviewCount: 7,
    soldCount: 36,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-018",
    slug: "nayaab-3pc-chiffon-crepe",
    name: "Nayaab 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 15000,
    discountedPrice: 6750,
    discountPercent: 55,
    badge: "Bestseller",
    images: [nayaab1, nayaab2, nayaab3, nayaab4],
    description:
      "Nayaab 3 Piece is quiet luxury at its most breathtaking — ivory chiffon and crepe layered into a floor-sweeping silhouette that moves like a whisper. The kurta carries a delicate gold sequin scatter across the body, framed by a dense geometric gold border at the hem that anchors the ethereal fabric to earth. Sheer chiffon sleeves and a billowing dupatta embroidered in matching gold sequin bootas complete the look. Nayaab is for the woman who needs no colour to command every room she enters.",
    details: [
      "Fabric: Premium Chiffon & Crepe blend",
      "Embroidery: All-over gold sequin scatter on body",
      "Hem: Dense geometric gold sequin border",
      "Sleeves: Sheer chiffon with sequin detailing",
      "Dupatta: Chiffon with gold sequin bootas & border",
      "Set: 3-piece stitched (kurta, trousers, dupatta)",
      "Colour: Ivory / Off-White with gold embellishment",
      "Occasion: Walima, Eid, formal evenings, wedding guest",
      "Care: Dry clean only",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: nayaabSizeChart,
    reviewCount: 7,
    soldCount: 39,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-017",
    slug: "zarmina-2pc-crush-silk",
    name: "Zarmina 2 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 6500,
    discountedPrice: 3120,
    discountPercent: 52,
    badge: "Bestseller",
    images: [zarmina1, zarmina2, zarmina3, zarmina4, zarmina5, zarmina6, zarmina7],
    description:
      "Zarmina 2 Piece is pure ivory poetry — crushed silk flowing in a full-sweep maxi silhouette that catches light in a thousand ripples. The square neckline is framed in delicate chikankari with pearl pom-pom trim on the sleeves, adding a playful feminine touch to an otherwise regal form. The skirt flares dramatically from the fitted waist, finishing in a satin ruffle hem that grazes the floor. With a sheer organza dupatta trimmed in gold, Zarmina is everything a celebration should feel like: effortless, luminous, and unforgettable.",
    details: [
      "Fabric: Premium Crush Silk",
      "Silhouette: Full-sweep maxi with dramatic flare",
      "Neckline: Square with chikankari embroidery",
      "Sleeves: Puff with pearl pom-pom trim",
      "Hem: Satin ruffle border",
      "Dupatta: Sheer organza with gold trim (2.5M)",
      "Set: 2-piece stitched (maxi + dupatta)",
      "Colour: Ivory / Off-White with gold accents",
      "Maxi Length: 55\" | Sleeve Length: 16\"",
      "Occasion: Mehndi, Eid, festive gatherings, garden parties",
      "Care: Dry clean recommended",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '20"', shoulder: '15"', hips: '—', armHole: '8"', legOpening: '—', trouserLength: '—', shirtLength: '55"', thigh: '—' },
      { size: "M", chest: '22"', shoulder: '16"', hips: '—', armHole: '9"', legOpening: '—', trouserLength: '—', shirtLength: '55"', thigh: '—' },
      { size: "L", chest: '23"', shoulder: '17"', hips: '—', armHole: '10.5"', legOpening: '—', trouserLength: '—', shirtLength: '55"', thigh: '—' },
    ],
    sizeChartImage: zarminaSizeChart,
    reviewCount: 7,
    soldCount: 39,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-016",
    slug: "mehmal-2pc-arabic-lawn",
    name: "Mehmal 2 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 6500,
    discountedPrice: 3445,
    discountPercent: 47,
    badge: "Bestseller",
    images: [mehmal1, mehmal2, mehmal3, mehmal4, mehmal5, mehmal6, mehmal7, mehmal8],
    description:
      "Mehmal 2 Piece is bold femininity distilled — rich crimson Arabic Lawn cut into a long straight kurta with a clean mandarin collar and pintuck placket. The showstopper: an oversized hand-embroidered bloom in blush-white and gold adorns the side front hem and cuffs, each petal worked in dense satin stitch with raised dimensional texture. The matching straight trousers keep the silhouette sleek and grounded. Mehmal is for the woman who doesn't need a dupatta to command a room.",
    details: [
      "Fabric: Premium Arabic Lawn",
      "Embroidery: Oversized hand-embroidered floral bloom — blush-white & gold satin stitch",
      "Collar: Clean mandarin with pintuck placket",
      "Cuffs: Matching floral embroidery panels",
      "Set: 2-piece stitched (kurta + straight trousers)",
      "Colour: Rich Crimson with blush-white & gold embellishment",
      "Occasion: Festive, Eid, semi-formal gatherings",
      "Care: Dry clean recommended",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: mehmalSizeChart,
    reviewCount: 7,
    soldCount: 37,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-015",
    slug: "nazneen-3pc-organza",
    name: "Nazneen 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 17000,
    discountedPrice: 6800,
    discountPercent: 60,
    badge: "Bestseller",
    images: [nazneen1, nazneen2, nazneen3, nazneen4, nazneen5, nazneen6],
    description:
      "Nazneen 3 Piece is a love letter to lilac — sheer mauve-grey organza densely worked with white pearl-thread chikankari and silver sequin trellis that covers every inch of the body in a haze of delicate embroidery. The architectural front panel frames an arched jaal motif from collar to hem, while the sheer sleeves carry scrolling floral vines that end in a fine lace cuff. The softly printed organza dupatta trails like a cloud — dotted with floral sprigs and a scalloped edge that dissolves into the air. Ethereal, romantic, and undeniably refined.",
    details: [
      "Fabric: Premium Organza (kameez & dupatta)",
      "Embroidery: All-over white chikankari & silver sequin trellis",
      "Front panel: Arched jaal motif with pearl-thread work",
      "Hem: Dense cutwork lace border",
      "Sleeves: Sheer with scrolling floral vine embroidery & lace cuff",
      "Dupatta: Organza with floral sprigs & scalloped edge",
      "Set: 3-piece stitched (kameez, trousers, dupatta)",
      "Colour: Mauve-Grey / Lilac with white & silver embellishment",
      "Occasion: Walima, Eid, formal evenings, wedding guest",
      "Care: Dry clean only",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: nazneenSizeChart,
    reviewCount: 7,
    soldCount: 36,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-014",
    slug: "hazel-3pc-organza",
    name: "Hazel 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 16000,
    discountedPrice: 8000,
    discountPercent: 50,
    badge: "Bestseller",
    images: [hazel1, hazel2, hazel3, hazel4, hazel5],
    description:
      "Hazel 3 Piece is luminosity made wearable — sheer champagne-gold organza layered over a soft base, carrying dense zardozi panels that trace the neckline, cascade down the front, and pool into a scalloped lace hem. The sheer bell sleeves, encased in a wide embroidered cuff, add dramatic elegance, while the matching organza dupatta — kissed with pearl-sequin bootas and a gold lace border — completes a look that belongs on every special occasion. When the light catches it, Hazel glows.",
    details: [
      "Fabric: Premium Organza (kameez & dupatta)",
      "Embroidery: Dense zardozi neckline & cascading front panels",
      "Hem: Scalloped lace border with mirror highlights",
      "Sleeves: Sheer bell sleeves with wide embroidered cuffs",
      "Dupatta: Organza with pearl-sequin bootas & gold lace border",
      "Set: 3-piece stitched (kameez, trousers, dupatta)",
      "Colour: Champagne Gold / Soft Pistachio",
      "Occasion: Walima, formal evenings, Eid, wedding guest",
      "Care: Dry clean only",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: hazelSizeChart,
    reviewCount: 7,
    soldCount: 39,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-013",
    slug: "iris-2pc-arabic-lawn",
    name: "Iris 2 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 5800,
    discountedPrice: 3480,
    discountPercent: 40,
    badge: "Bestseller",
    images: [iris1, iris2, iris3, iris4, iris5],
    description:
      "Iris 2 Piece is the art of quiet confidence — deep plum Arabic Lawn draped in scattered gold-and-blush threadwork bootas that catch the light with every movement. The straight-cut kurta carries a signature paisley panel at the pocket, flowing into crisply tailored wide-leg trousers anchored by a rich embroidered border — a bold statement in gold and mauve that elevates the hem into a work of art. Clean silhouette, maximum impact: this is festive dressing refined to its purest form.",
    details: [
      "Fabric: Premium Arabic Lawn",
      "Embroidery: Scattered gold & blush bootas across body",
      "Pocket detail: Signature hand-worked paisley panel",
      "Trouser hem: Bold gold & mauve embroidered border",
      "Set: 2-piece stitched (kurta + wide-leg trousers)",
      "Colour: Deep Plum with gold & rose-blush embellishment",
      "Occasion: Festive, Eid, semi-formal evenings",
      "Care: Dry clean recommended",
    ],
    leadTime: "Ready to ship",
    estimatedDelivery: "2–3 days",
    sizes: ["S", "M", "L"],
    sizeChart: [
      { size: "S", chest: '18–19"', shoulder: '14"', hips: '18"', armHole: '9"', legOpening: '8"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "M", chest: '21"', shoulder: '15"', hips: '21"', armHole: '9.5"', legOpening: '9"', trouserLength: '37"', shirtLength: '37"', thigh: '12"' },
      { size: "L", chest: '23"', shoulder: '16"', hips: '23"', armHole: '10"', legOpening: '9.5"', trouserLength: '38"', shirtLength: '38"', thigh: '13"' },
    ],
    sizeChartImage: irisSizeChart,
    reviewCount: 7,
    soldCount: 35,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-012",
    slug: "tabeer-3pc-chiffon",
    name: "Tabeer 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 8500,
    discountedPrice: 4760,
    discountPercent: 44,
    badge: "Bestseller",
    images: [tabeer1, tabeer2, tabeer3, tabeer4, tabeer5],
    description:
      "Tabeer 3 Piece is where poetry meets craftsmanship — deep midnight navy premium chiffon adorned with hand-worked silver zardozi at the neckline and cascading floral panels down the front. Scattered mirror-work bootas catch the light across the body, while richly embroidered cuffs and a grand silver-gold hem border on the flowing sharara bring a regal finale to every step. The matching sheer dupatta, scattered with silver sequin bootas, floats effortlessly — completing a look built for those who wear occasions, not the other way around.",
    details: [
      "Fabric: Premium Chiffon",
      "Embroidery: Silver zardozi neckline, cascading floral panels, mirror-work bootas",
      "Cuffs: Richly embroidered silver-gold",
      "Hem: Grand silver-gold border on sharara",
      "Dupatta: Sheer chiffon with scattered sequin bootas",
      "Set: 3-piece stitched (kameez, sharara, dupatta)",
      "Colour: Midnight Navy with silver & gold embellishment",
      "Occasion: Festive, Eid, walima, formal evenings",
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
    sizeChartImage: tabeerSizeChart,
    reviewCount: 7,
    soldCount: 36,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
  {
    id: "f-011",
    slug: "shanzay-3pc-cotton",
    name: "Shanzay 3 Pc",
    category: "Festive / Pret",
    fabricType: "Stitched",
    price: 9000,
    discountedPrice: 5400,
    discountPercent: 40,
    badge: "Bestseller",
    images: [shanzay1, shanzay2, shanzay3],
    description:
      "Shanzay 3 Piece is the purest expression of tonal dressing — head-to-toe ivory premium cotton dressed in dense all-over chikankari embroidery. Grand medallion motifs cascade from the neckline panel down to the hem, while intricate lace cuffs and a scalloped cutwork border at the trouser hem lend it a delicate, heirloom quality. Paired with a soft ivory dupatta, this ensemble carries quiet confidence from a family Eid gathering to a garden brunch.",
    details: [
      "Fabric: Premium Cotton",
      "Embroidery: All-over chikankari — medallion motifs, dense thread fill",
      "Cuffs: Floral lace trim",
      "Border: Scalloped cutwork hem on kameez and trouser",
      "Set: 3-piece stitched (kameez, trouser, dupatta)",
      "Colour: Ivory / Off-White",
      "Occasion: Festive, Eid, dawat, garden celebrations",
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
    sizeChartImage: shanzaySizeChart,
    reviewCount: 7,
    soldCount: 39,
    soldTimeframe: "13 hours",
    returnPolicy:
      "We want you to love your purchase. If your item arrives with a manufacturing defect or damage, please contact us within 24 hours of delivery with photos and we will arrange a replacement or full refund. As each piece is stitched to standard sizes, size-based returns are not accepted — please refer to the size guide before ordering. Sale and discounted items are final sale.",
    inStock: true,
    featured: true,
  },
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
