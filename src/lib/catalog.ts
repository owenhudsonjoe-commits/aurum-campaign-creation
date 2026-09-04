import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, DEFAULT_SIZE_CHART, type Product } from "./products";
import { fetchCloudCatalog, getAdminKey, saveCloudCatalog } from "./cloud-catalog";


export interface StoreBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  background: string;
  isActive: boolean;
  endsAt: string;
}

export interface SiteSettings {
  announcement: string;
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroSubtitle: string;
  heroImage: string;
  shippingThreshold: string;
  whatsapp: string;
  supportEmail: string;
  instagram: string;
  facebook: string;
}

export interface ProductInput extends Omit<Product, "id"> {
  id?: string;
}

interface CatalogStore {
  products: Product[];
  collections: string[];
  banners: StoreBanner[];
  settings: SiteSettings;
  addProduct: (product: ProductInput) => void;
  updateProduct: (id: string, product: Partial<ProductInput>) => void;
  removeProduct: (id: string) => void;
  moveProduct: (id: string, to: "first" | "last" | "up" | "down" | number) => void;
  addCollection: (name: string) => void;
  removeCollection: (name: string) => void;
  addBanner: (banner: Omit<StoreBanner, "id">) => void;
  updateBanner: (id: string, banner: Partial<StoreBanner>) => void;
  removeBanner: (id: string) => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  resetCatalog: () => void;
}


export const DEFAULT_COLLECTIONS = [
  "Bridal",
  "Festive / Pret",
  "Daily Wear",
  "Men's",
  "Cultural Fusion",
];

export const DEFAULT_SETTINGS: SiteSettings = {
  announcement: "Complimentary shipping on orders above RS 5,000",
  heroEyebrow: "New Collection · Summer 2026",
  heroTitle: "Dressed for\nthe Modern Woman",
  heroAccent: "Modern",
  heroSubtitle:
    "Heritage craftsmanship, contemporary silhouettes — bridal, festive prêt and bespoke, handcrafted in Lahore.",
  heroImage: "",
  shippingThreshold: "RS 5,000",
  whatsapp: "923474325410",
  supportEmail: "aurumshop12@gmail.com",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

export const DEFAULT_BANNERS: StoreBanner[] = [
  {
    id: "summer-sale",
    title: "Summer Sale",
    subtitle: "Dresses from RS 2,499 · Limited stock",
    ctaLabel: "Shop sale",
    ctaHref: "/sale",
    background: "#c9a84c",
    isActive: true,
    endsAt: "2026-08-31",
  },
];

const makeId = (prefix: string) =>
  `${prefix}-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : Date.now()}`;

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const emptyProduct = (category = DEFAULT_COLLECTIONS[0]): Product => ({
  id: "",
  slug: "",
  name: "",
  category,
  fabricType: "Stitched",
  price: 0,
  images: [],
  description: "",
  details: [],
  leadTime: "Ready to ship",
  estimatedDelivery: "2–5 working days",
  sizes: ["S", "M", "L"],
  sizeChart: DEFAULT_SIZE_CHART,
  reviewCount: 0,
  soldCount: 0,
  inStock: true,
  featured: false,
});

export const useCatalog = create<CatalogStore>()(
  persist(
    (set) => ({
      products: PRODUCTS,
      collections: DEFAULT_COLLECTIONS,
      banners: DEFAULT_BANNERS,
      settings: DEFAULT_SETTINGS,

      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            {
              ...product,
              id: product.id || makeId("product"),
              slug: product.slug || slugify(product.name),
            } as Product,
          ],
        })),

      updateProduct: (id, product) =>
        set((state) => ({
          products: state.products.map((item) =>
            item.id === id ? { ...item, ...product, slug: product.slug || item.slug } : item,
          ),
        })),

      removeProduct: (id) =>
        set((state) => ({ products: state.products.filter((item) => item.id !== id) })),

      moveProduct: (id, to) =>
        set((state) => {
          const index = state.products.findIndex((item) => item.id === id);
          if (index === -1) return state;

          const next = [...state.products];
          const [item] = next.splice(index, 1);

          const target =
            to === "first"
              ? 0
              : to === "last"
                ? next.length
                : to === "up"
                  ? Math.max(0, index - 1)
                  : to === "down"
                    ? Math.min(next.length, index + 1)
                    : Math.min(Math.max(0, to), next.length);

          next.splice(target, 0, item);
          return { products: next };
        }),



      addCollection: (name) =>
        set((state) => {
          const normalized = name.trim();
          if (
            !normalized ||
            state.collections.some((item) => item.toLowerCase() === normalized.toLowerCase())
          ) {
            return state;
          }
          return { collections: [...state.collections, normalized] };
        }),

      removeCollection: (name) =>
        set((state) => ({ collections: state.collections.filter((item) => item !== name) })),

      addBanner: (banner) =>
        set((state) => ({
          banners: [
            ...state.banners.map((item) => ({ ...item, isActive: false })),
            { ...banner, id: makeId("banner") },
          ],
        })),

      updateBanner: (id, banner) =>
        set((state) => ({
          banners: state.banners.map((item) => (item.id === id ? { ...item, ...banner } : item)),
        })),

      removeBanner: (id) =>
        set((state) => ({ banners: state.banners.filter((item) => item.id !== id) })),

      updateSettings: (settings) =>
        set((state) => ({ settings: { ...state.settings, ...settings } })),

      resetCatalog: () =>
        set({
          products: PRODUCTS,
          collections: DEFAULT_COLLECTIONS,
          banners: DEFAULT_BANNERS,
          settings: DEFAULT_SETTINGS,
        }),
    }),
    { name: "aurum-catalog-v1" },
  ),
);

/* ------------------------------------------------------------------ */
/* Cloud sync — the catalog is shared by every visitor on every device */
/* ------------------------------------------------------------------ */

type CatalogSnapshotShape = Pick<
  CatalogStore,
  "products" | "collections" | "banners" | "settings"
>;

const snapshotOf = (state: CatalogStore): CatalogSnapshotShape => ({
  products: state.products,
  collections: state.collections,
  banners: state.banners,
  settings: state.settings,
});

let hydrated = false;
let applyingRemote = false;
let saveTimer: ReturnType<typeof setTimeout> | undefined;

export const catalogSyncStatus = create<{
  status: "idle" | "saving" | "saved" | "error";
  setStatus: (status: "idle" | "saving" | "saved" | "error") => void;
}>((set) => ({
  status: "idle",
  setStatus: (status) => set({ status }),
}));

/** Pulls the shared catalog from the backend so every device shows the same store. */
export async function hydrateCatalogFromCloud() {
  if (typeof window === "undefined" || hydrated) return;
  hydrated = true;

  const remote = await fetchCloudCatalog();
  if (!remote) return;

  applyingRemote = true;
  useCatalog.setState({
    products: (remote.products as Product[]) ?? PRODUCTS,
    collections: (remote.collections as string[]) ?? DEFAULT_COLLECTIONS,
    banners: (remote.banners as StoreBanner[]) ?? DEFAULT_BANNERS,
    settings: { ...DEFAULT_SETTINGS, ...(remote.settings as Partial<SiteSettings>) },
  });
  applyingRemote = false;
}

if (typeof window !== "undefined") {
  useCatalog.subscribe((state, previous) => {
    if (applyingRemote) return;
    if (!getAdminKey()) return;

    const changed =
      state.products !== previous.products ||
      state.collections !== previous.collections ||
      state.banners !== previous.banners ||
      state.settings !== previous.settings;
    if (!changed) return;

    catalogSyncStatus.getState().setStatus("saving");
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      const ok = await saveCloudCatalog(
        snapshotOf(useCatalog.getState()) as never,
      );
      catalogSyncStatus.getState().setStatus(ok ? "saved" : "error");
    }, 600);
  });
}

