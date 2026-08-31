import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  Check,
  ChevronRight,
  CircleDollarSign,
  FolderOpen,
  ImagePlus,
  LayoutDashboard,
  Menu,
  Package,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Settings2,
  ShoppingBag,
  Store,
  Trash2,
  X,
} from "lucide-react";
import {
  DEFAULT_COLLECTIONS,
  emptyProduct,
  slugify,
  useCatalog,
  type SiteSettings,
  type StoreBanner,
} from "@/lib/catalog";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type AdminSection = "overview" | "products" | "collections" | "promotions" | "settings";

const navItems: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "collections", label: "Collections", icon: FolderOpen },
  { id: "promotions", label: "Promotions & banners", icon: ImagePlus },
  { id: "settings", label: "Site settings", icon: Settings2 },
];

const LOCAL_SESSION_KEY = "aurum_admin_local_session";
const ALLOWED_USERNAMES = ["umair455", "admin"];

function isAllowedUsername(value: string) {
  return ALLOWED_USERNAMES.includes(value.trim().toLowerCase());
}

function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const local =
      typeof window !== "undefined" && window.localStorage.getItem(LOCAL_SESSION_KEY) === "1";

    fetch("/api/admin/session", { credentials: "same-origin" })
      .then(async (response) => {
        const text = await response.text();
        let data: { authenticated?: boolean } = {};
        try {
          data = JSON.parse(text) as { authenticated?: boolean };
        } catch {
          // Static hosting returns HTML for unknown API paths.
          if (!cancelled) setAuthenticated(local);
          return;
        }
        if (!cancelled) setAuthenticated((response.ok && data.authenticated === true) || local);
      })
      .catch(() => {
        if (!cancelled) setAuthenticated(local);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (authenticated === null) return <AuthLoading />;
  if (!authenticated) return <AdminLogin onSuccess={() => setAuthenticated(true)} />;

  return <AdminWorkspace onLogout={() => setAuthenticated(false)} />;
}


function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#191713] text-[#f6f1e8]">
      <div className="text-center">
        <p className="font-serif text-3xl tracking-[0.2em]">AURUM</p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[#c9a84c]">
          Securing your workspace…
        </p>
      </div>
    </div>
  );
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const candidate = username.trim();
    if (!isAllowedUsername(candidate)) {
      setError("Incorrect username.");
      setSubmitting(false);
      return;
    }

    try {
      await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: candidate }),
      }).catch(() => undefined);
      window.localStorage.setItem(LOCAL_SESSION_KEY, "1");
      onSuccess();
    } catch {
      setError("Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#191713] text-[#f6f1e8]">
      <div className="hidden flex-1 flex-col justify-between border-r border-white/10 p-10 lg:flex">
        <div>
          <p className="font-serif text-3xl tracking-[0.24em]">AURUM</p>
          <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]">
            Atelier administration
          </p>
        </div>
        <div className="max-w-md">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a84c]">
            Private workspace
          </p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.95]">
            Your house,
            <br />
            <em>your story.</em>
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/45">
            Manage the pieces, edits and moments that make the Aurum storefront yours.
          </p>
        </div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
          Handcrafted in Lahore · {new Date().getFullYear()}
        </p>
      </div>
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-[520px] lg:bg-[#f6f4ef] lg:text-[#191713]">
        <div className="w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <p className="font-serif text-3xl tracking-[0.24em]">AURUM</p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]">
              Atelier administration
            </p>
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b28e2f]">
            Welcome back
          </p>
          <h2 className="mt-3 font-serif text-4xl">Sign in to your atelier.</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#77736b]">
            Enter your store owner username to access the catalog and site controls.
          </p>
          <form onSubmit={login} className="mt-8 space-y-5">
            <Field
              label="Username"
              value={username}
              onChange={setUsername}
              placeholder="Your admin username"
              autoComplete="username"
              required
            />
            {error && (
              <p className="border border-red-200 bg-red-50 px-3 py-2.5 text-[11px] text-red-700">
                {error}
              </p>
            )}
            <button
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 bg-[#191713] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#c9a84c] hover:text-[#191713] disabled:opacity-50"
            >
              {submitting ? "Checking access…" : "Enter workspace"}{" "}
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </form>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8e8a81] hover:text-[#191713]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return to storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

function AdminWorkspace({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<AdminSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { settings } = useCatalog();

  async function logout() {
    window.localStorage.removeItem(LOCAL_SESSION_KEY);
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" }).catch(
      () => undefined,
    );
    onLogout();
  }

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#191713]">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col bg-[#191713] text-[#f6f1e8] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-24 items-center border-b border-white/10 px-7">
          <div>
            <p className="font-serif text-2xl tracking-[0.24em]">AURUM</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-[#c9a84c]">
              Atelier administration
            </p>
          </div>
          <button
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5 text-white/50" />
          </button>
        </div>

        <div className="flex-1 px-4 py-7">
          <p className="px-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/30">
            Workspace
          </p>
          <nav className="mt-4 space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setSection(id);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-3 py-3 text-left text-[12px] transition-colors ${
                  section === id
                    ? "bg-[#c9a84c] font-semibold text-[#191713]"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.7} />
                {label}
                {section === id && <ChevronRight className="ml-auto h-3.5 w-3.5" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 p-5">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> View storefront
            </Link>
            <button
              onClick={logout}
              className="text-[10px] uppercase tracking-[0.13em] text-white/30 hover:text-white"
            >
              Sign out
            </button>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c9a84c] text-[11px] font-bold text-[#191713]">
              A
            </div>
            <div>
              <p className="text-[11px] font-medium text-white/85">Aurum admin</p>
              <p className="text-[10px] text-white/35">Store owner</p>
            </div>
            <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
          </div>
        </div>
      </aside>

      <div className="lg:pl-[272px]">
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-[#191713]/10 bg-[#f6f4ef]/95 px-5 backdrop-blur md:px-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#9b8040]">
                Aurum control room
              </p>
              <h1 className="mt-1 font-serif text-2xl font-normal capitalize">
                {section === "promotions" ? "Promotions & banners" : section}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-[11px] text-[#6e6a62] sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> All changes saved locally
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-[#191713]/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-[#191713] hover:text-white"
            >
              <Store className="h-3.5 w-3.5" /> Storefront
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-5 py-7 md:px-10 md:py-10">
          {section === "overview" && <Overview onNavigate={setSection} />}
          {section === "products" && <ProductsManager />}
          {section === "collections" && <CollectionsManager />}
          {section === "promotions" && <PromotionsManager />}
          {section === "settings" && <SettingsManager initialSettings={settings} />}
        </main>
      </div>
    </div>
  );
}

function Overview({ onNavigate }: { onNavigate: (section: AdminSection) => void }) {
  const { products, collections, banners } = useCatalog();
  const inventoryValue = products.reduce((sum, product) => sum + product.price, 0);
  const saleCount = products.filter((product) => product.discountedPrice).length;
  const featuredCount = products.filter((product) => product.featured).length;
  const activeBanner = banners.find((banner) => banner.isActive);

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9b8040]">
            Sunday, August 30, 2026
          </p>
          <h2 className="mt-2 max-w-xl font-serif text-4xl font-normal leading-tight md:text-5xl">
            Good morning, <em>atelier.</em>
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#77736b]">
            Your storefront is ready for its next chapter. Keep your collection fresh and your story
            visible.
          </p>
        </div>
        <button
          onClick={() => onNavigate("products")}
          className="inline-flex w-fit items-center gap-2 bg-[#191713] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f6f1e8] transition-colors hover:bg-[#c9a84c] hover:text-[#191713]"
        >
          <Plus className="h-4 w-4" /> Add a product
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Live products"
          value={products.length.toString()}
          note={`${featuredCount} featured pieces`}
          icon={Package}
          accent="gold"
        />
        <StatCard
          label="Collections"
          value={collections.length.toString()}
          note="Curated navigation groups"
          icon={FolderOpen}
        />
        <StatCard
          label="On sale"
          value={saleCount.toString()}
          note="Discounted products"
          icon={CircleDollarSign}
          accent="red"
        />
        <StatCard
          label="Catalog value"
          value={formatPrice(inventoryValue)}
          note="At listed prices"
          icon={BarChart3}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="border border-[#191713]/10 bg-white">
          <div className="flex items-center justify-between border-b border-[#191713]/10 px-6 py-5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9b8040]">
                Catalog health
              </p>
              <h3 className="mt-1 font-serif text-2xl">Recently added pieces</h3>
            </div>
            <button
              onClick={() => onNavigate("products")}
              className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#77736b] hover:text-[#191713]"
            >
              Manage products →
            </button>
          </div>
          <div className="divide-y divide-[#191713]/10">
            {products
              .slice(-5)
              .reverse()
              .map((product) => (
                <div key={product.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="h-14 w-12 shrink-0 overflow-hidden bg-[#efede7]">
                    {product.images[0] ? (
                      <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImagePlus className="h-4 w-4 text-[#aaa59a]" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-semibold">
                      {product.name || "Untitled product"}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#8e8a81]">
                      {product.category} · {product.fabricType}
                    </p>
                  </div>
                  <span
                    className={`hidden px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] sm:block ${product.inStock ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}
                  >
                    {product.inStock ? "In stock" : "Sold out"}
                  </span>
                  <p className="text-[12px] font-semibold">
                    {formatPrice(product.discountedPrice ?? product.price)}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="border border-[#191713]/10 bg-[#191713] p-6 text-[#f6f1e8]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c9a84c]">
                Live promotion
              </p>
              <h3 className="mt-2 font-serif text-3xl">
                {activeBanner?.title ?? "No active banner"}
              </h3>
            </div>
            <span className="rounded-full border border-emerald-400/40 px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-emerald-300">
              {activeBanner ? "Live" : "Draft"}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            {activeBanner?.subtitle ?? "Create a promotion to announce your next story."}
          </p>
          <div className="mt-8 border-t border-white/10 pt-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">Ends</p>
            <p className="mt-1 text-sm">{activeBanner?.endsAt || "Not scheduled"}</p>
          </div>
          <button
            onClick={() => onNavigate("promotions")}
            className="mt-6 inline-flex items-center gap-2 border border-[#c9a84c]/60 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#191713]"
          >
            Edit promotion <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <QuickAction
          icon={Package}
          title="Build your catalog"
          description="Add products with images, sizes, pricing and delivery details."
          onClick={() => onNavigate("products")}
        />
        <QuickAction
          icon={FolderOpen}
          title="Shape collections"
          description="Create a new edit for bridal, festive or any story you want to tell."
          onClick={() => onNavigate("collections")}
        />
        <QuickAction
          icon={Settings2}
          title="Tune the storefront"
          description="Update your announcement bar, hero message and contact details."
          onClick={() => onNavigate("settings")}
        />
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  note,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  note: string;
  icon: typeof Package;
  accent?: "gold" | "red";
}) {
  return (
    <div className="border border-[#191713]/10 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#858077]">
          {label}
        </p>
        <Icon
          className={`h-4 w-4 ${accent === "red" ? "text-red-500" : accent === "gold" ? "text-[#b28e2f]" : "text-[#858077]"}`}
          strokeWidth={1.6}
        />
      </div>
      <p className="mt-5 truncate font-serif text-3xl">{value}</p>
      <p className="mt-1 text-[11px] text-[#9b968d]">{note}</p>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: typeof Package;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group border border-[#191713]/10 bg-white p-5 text-left transition-colors hover:border-[#c9a84c]"
    >
      <Icon className="h-5 w-5 text-[#b28e2f]" strokeWidth={1.5} />
      <p className="mt-5 text-[12px] font-semibold">{title}</p>
      <p className="mt-2 text-[11px] leading-relaxed text-[#858077]">{description}</p>
      <span className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9b8040] group-hover:text-[#191713]">
        Open workspace →
      </span>
    </button>
  );
}

function ProductsManager() {
  const { products, collections, addProduct, updateProduct, removeProduct } = useCatalog();
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [draft, setDraft] = useState<Product>(
    emptyProduct(collections[0] ?? DEFAULT_COLLECTIONS[0]),
  );

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return products;
    return products.filter((product) =>
      `${product.name} ${product.category} ${product.slug}`.toLowerCase().includes(query),
    );
  }, [products, search]);

  function openNew() {
    setEditingId(null);
    setDraft(emptyProduct(collections[0] ?? DEFAULT_COLLECTIONS[0]));
    setEditorOpen(true);
  }

  function openEdit(product: Product) {
    setEditingId(product.id);
    setDraft({ ...product });
    setEditorOpen(true);
  }

  function save() {
    if (!draft.name.trim() || !draft.price) return;
    const discountedPrice =
      draft.discountedPrice && draft.discountedPrice > 0
        ? Number(draft.discountedPrice)
        : undefined;
    const normalized: Product = {
      ...draft,
      name: draft.name.trim(),
      slug: slugify(draft.slug || draft.name),
      price: Number(draft.price),
      discountedPrice,
      discountPercent: discountedPrice
        ? Math.round((1 - discountedPrice / Number(draft.price)) * 100)
        : undefined,
      images: draft.images.map((image) => image.trim()).filter(Boolean),
      details: draft.details.map((detail) => detail.trim()).filter(Boolean),
      sizes: draft.sizes.map((size) => size.trim()).filter(Boolean),
      description: draft.description.trim(),
    };
    if (editingId) updateProduct(editingId, normalized);
    else addProduct(normalized);
    setEditorOpen(false);
  }

  function deleteProduct(product: Product) {
    if (window.confirm(`Remove ${product.name} from the catalog?`)) removeProduct(product.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm text-[#77736b]">
            Manage every detail from the product page, from gallery images to sizing and stock.
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#9b8040]">
            {products.length} products in catalog
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex w-fit items-center gap-2 bg-[#191713] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#c9a84c] hover:text-[#191713]"
        >
          <Plus className="h-4 w-4" /> Add product
        </button>
      </div>

      <div className="border border-[#191713]/10 bg-white">
        <div className="flex flex-col gap-3 border-b border-[#191713]/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products by name, collection or slug…"
            className="w-full max-w-md border border-[#191713]/15 bg-[#faf9f6] px-4 py-2.5 text-[12px] outline-none placeholder:text-[#aaa59a] focus:border-[#c9a84c]"
          />
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#8e8a81]">
            {filtered.length} shown
          </span>
        </div>
        <div className="hidden grid-cols-[minmax(230px,1.5fr)_1fr_0.7fr_0.7fr_80px] gap-4 border-b border-[#191713]/10 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9b968d] md:grid">
          <span>Product</span>
          <span>Collection</span>
          <span>Price</span>
          <span>Status</span>
          <span />
        </div>
        <div className="divide-y divide-[#191713]/10">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(230px,1.5fr)_1fr_0.7fr_0.7fr_80px] md:items-center md:gap-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-14 w-11 shrink-0 overflow-hidden bg-[#efede7]">
                  {product.images[0] ? (
                    <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImagePlus className="h-4 w-4 text-[#aaa59a]" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold">{product.name}</p>
                  <p className="mt-1 truncate text-[10px] text-[#98938a]">/{product.slug}</p>
                </div>
              </div>
              <p className="text-[11px] text-[#6f6b64]">
                {product.category}
                <span className="mx-1 text-[#c9a84c]">·</span>
                {product.fabricType}
              </p>
              <p className="text-[12px] font-semibold">
                {formatPrice(product.discountedPrice ?? product.price)}
                {product.discountedPrice && (
                  <span className="ml-1 text-[10px] font-normal text-red-500">sale</span>
                )}
              </p>
              <span
                className={`w-fit px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] ${product.inStock ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}
              >
                {product.inStock ? "In stock" : "Sold out"}
              </span>
              <div className="flex items-center gap-1 md:justify-end">
                <button
                  onClick={() => openEdit(product)}
                  className="p-2 text-[#77736b] hover:bg-[#f0eee9] hover:text-[#191713]"
                  aria-label={`Edit ${product.name}`}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => deleteProduct(product)}
                  className="p-2 text-[#a39d94] hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${product.name}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editorOpen && (
        <ProductEditor
          draft={draft}
          setDraft={setDraft}
          editing={Boolean(editingId)}
          onSave={save}
          onClose={() => setEditorOpen(false)}
          collections={collections}
        />
      )}
    </div>
  );
}

function ProductEditor({
  draft,
  setDraft,
  editing,
  onSave,
  onClose,
  collections,
}: {
  draft: Product;
  setDraft: (product: Product) => void;
  editing: boolean;
  onSave: () => void;
  onClose: () => void;
  collections: string[];
}) {
  const update = <K extends keyof Product>(key: K, value: Product[K]) =>
    setDraft({ ...draft, [key]: value });
  const imageText = draft.images.join("\n");
  const detailText = draft.details.join("\n");
  const sizesText = draft.sizes.join(", ");

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-[#191713]/45 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-2xl flex-col bg-[#faf9f6] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#191713]/10 px-6 py-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9b8040]">
              {editing ? "Edit catalog item" : "New catalog item"}
            </p>
            <h2 className="mt-1 font-serif text-2xl">{editing ? draft.name : "Add product"}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#77736b] hover:bg-[#efede7]"
            aria-label="Close editor"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-7">
            <EditorGroup title="Core information" description="The essentials customers see first.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Product name"
                  value={draft.name}
                  onChange={(value) => update("name", value)}
                  placeholder="e.g. Noor Embroidered Lawn"
                  required
                />
                <Field
                  label="URL slug"
                  value={draft.slug}
                  onChange={(value) => update("slug", value)}
                  placeholder="auto-generated if blank"
                />
                <SelectField
                  label="Collection"
                  value={draft.category}
                  options={collections}
                  onChange={(value) => update("category", value)}
                />
                <SelectField
                  label="Fabric type"
                  value={draft.fabricType}
                  options={["Stitched", "Unstitched"]}
                  onChange={(value) => update("fabricType", value as Product["fabricType"])}
                />
              </div>
            </EditorGroup>

            <EditorGroup
              title="Pricing & visibility"
              description="Set a sale price to automatically calculate the discount badge."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Regular price (PKR)"
                  type="number"
                  value={String(draft.price || "")}
                  onChange={(value) => update("price", Number(value))}
                  placeholder="0"
                  required
                />
                <Field
                  label="Sale price (optional)"
                  type="number"
                  value={String(draft.discountedPrice || "")}
                  onChange={(value) => update("discountedPrice", value ? Number(value) : undefined)}
                  placeholder="Leave blank for full price"
                />
                <SelectField
                  label="Badge"
                  value={draft.badge ?? "None"}
                  options={["None", "New", "Limited", "Last Piece", "Bestseller"]}
                  onChange={(value) =>
                    update("badge", value === "None" ? undefined : (value as Product["badge"]))
                  }
                />
                <div className="flex items-end gap-5 pb-1">
                  <Toggle
                    label="In stock"
                    checked={draft.inStock}
                    onChange={(value) => update("inStock", value)}
                  />
                  <Toggle
                    label="Featured"
                    checked={Boolean(draft.featured)}
                    onChange={(value) => update("featured", value)}
                  />
                </div>
              </div>
            </EditorGroup>

            <EditorGroup
              title="Product gallery"
              description="Pick image files or paste (Ctrl+V) a copied image — or paste one image URL / public asset path per line."
            >
              <ImagePicker
                images={draft.images}
                onChange={(images) => update("images", images)}
              />
              <TextArea
                label="Image paths / URLs"
                value={imageText}
                onChange={(value) => update("images", value.split("\n"))}
                placeholder="/product-front.webp&#10;/product-detail.webp"
                rows={4}
              />
            </EditorGroup>

            <EditorGroup
              title="Story & details"
              description="Give customers the context and craftsmanship behind the piece."
            >
              <TextArea
                label="Description"
                value={draft.description}
                onChange={(value) => update("description", value)}
                placeholder="Describe the silhouette, craft and occasion…"
                rows={5}
              />
              <TextArea
                label="Details (one per line)"
                value={detailText}
                onChange={(value) => update("details", value.split("\n"))}
                placeholder="Hand-finished embroidery&#10;Includes shirt, trouser and dupatta"
                rows={4}
              />
            </EditorGroup>

            <EditorGroup
              title="Sizing & fulfilment"
              description="This information appears on the product detail page."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Sizes (comma separated)"
                  value={sizesText}
                  onChange={(value) => update("sizes", value.split(","))}
                  placeholder="XS, S, M, L, XL"
                />
                <Field
                  label="Lead time"
                  value={draft.leadTime}
                  onChange={(value) => update("leadTime", value)}
                  placeholder="Ready to ship"
                />
                <Field
                  label="Estimated delivery"
                  value={draft.estimatedDelivery ?? ""}
                  onChange={(value) => update("estimatedDelivery", value)}
                  placeholder="2–5 working days"
                />
                <Field
                  label="Return policy"
                  value={draft.returnPolicy ?? ""}
                  onChange={(value) => update("returnPolicy", value)}
                  placeholder="Optional"
                />
              </div>
            </EditorGroup>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[#191713]/10 bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#77736b] hover:text-[#191713]"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!draft.name.trim() || !draft.price}
            className="inline-flex items-center gap-2 bg-[#191713] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#c9a84c] hover:text-[#191713]"
          >
            <Save className="h-3.5 w-3.5" /> {editing ? "Save changes" : "Create product"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditorGroup({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3">
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.13em]">{title}</h3>
        <p className="mt-1 text-[11px] text-[#908b82]">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77736b]">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>
      <input
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#191713]/15 bg-white px-3 py-2.5 text-[12px] outline-none placeholder:text-[#b4afa6] focus:border-[#c9a84c]"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77736b]">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y border border-[#191713]/15 bg-white px-3 py-2.5 text-[12px] leading-relaxed outline-none placeholder:text-[#b4afa6] focus:border-[#c9a84c]"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77736b]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-[#191713]/15 bg-white px-3 py-2.5 text-[12px] outline-none focus:border-[#c9a84c]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[11px] text-[#5f5a52]">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors ${checked ? "bg-[#191713]" : "bg-[#d1cec7]"}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`}
        />
      </button>
      {label}
    </label>
  );
}

function CollectionsManager() {
  const { collections, products, addCollection, removeCollection } = useCatalog();
  const [name, setName] = useState("");
  const [notice, setNotice] = useState("");

  function createCollection() {
    const clean = name.trim();
    if (!clean) return;
    if (collections.some((item) => item.toLowerCase() === clean.toLowerCase())) {
      setNotice("That collection already exists.");
      return;
    }
    addCollection(clean);
    setName("");
    setNotice(`${clean} is ready for products.`);
  }

  function deleteCollection(collection: string) {
    const count = products.filter((product) => product.category === collection).length;
    if (count > 0) {
      setNotice(
        `Move ${count} product${count === 1 ? "" : "s"} out of ${collection} before removing it.`,
      );
      return;
    }
    if (window.confirm(`Remove the ${collection} collection?`)) removeCollection(collection);
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="border border-[#191713]/10 bg-white p-6 md:p-8">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9b8040]">
          Create a new edit
        </p>
        <h2 className="mt-2 font-serif text-3xl">Collections give the catalog its rhythm.</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#77736b]">
          Use them for permanent categories or limited-time edits. They will appear as filters in
          the storefront automatically.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && createCollection()}
            placeholder="e.g. Eid Edit, Summer Linen, Accessories"
            className="flex-1 border border-[#191713]/15 bg-[#faf9f6] px-4 py-3 text-[12px] outline-none placeholder:text-[#aaa59a] focus:border-[#c9a84c]"
          />
          <button
            onClick={createCollection}
            className="inline-flex items-center justify-center gap-2 bg-[#191713] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#c9a84c] hover:text-[#191713]"
          >
            <Plus className="h-4 w-4" /> Create collection
          </button>
        </div>
        {notice && <p className="mt-3 text-[11px] text-[#9b8040]">{notice}</p>}
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9b8040]">
              Your navigation
            </p>
            <h2 className="mt-1 font-serif text-3xl">Collections</h2>
          </div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#8e8a81]">
            {collections.length} total
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {collections.map((collection, index) => {
            const count = products.filter((product) => product.category === collection).length;
            return (
              <div
                key={collection}
                className="flex items-center gap-4 border border-[#191713]/10 bg-white p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-[#191713] font-serif text-lg text-[#c9a84c]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold">{collection}</p>
                  <p className="mt-1 text-[10px] text-[#98938a]">
                    {count} {count === 1 ? "product" : "products"}
                  </p>
                </div>
                <button
                  onClick={() => deleteCollection(collection)}
                  className="p-2 text-[#aaa59a] hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove ${collection}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PromotionsManager() {
  const { banners, addBanner, updateBanner, removeBanner } = useCatalog();
  const [draft, setDraft] = useState<Omit<StoreBanner, "id" | "isActive">>({
    title: "",
    subtitle: "",
    ctaLabel: "Shop now",
    ctaHref: "/sale",
    background: "#c9a84c",
    endsAt: "",
  });
  const [notice, setNotice] = useState("");

  function createBanner() {
    if (!draft.title.trim() || !draft.subtitle.trim()) return;
    addBanner({
      ...draft,
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim(),
      isActive: true,
    });
    setDraft({
      title: "",
      subtitle: "",
      ctaLabel: "Shop now",
      ctaHref: "/sale",
      background: "#c9a84c",
      endsAt: "",
    });
    setNotice("Promotion published to the storefront.");
  }

  function activate(id: string) {
    banners.forEach((banner) => updateBanner(banner.id, { isActive: banner.id === id }));
    setNotice("Active promotion updated.");
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="border border-[#191713]/10 bg-white p-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9b8040]">
            New promotion
          </p>
          <h2 className="mt-2 font-serif text-3xl">Make the next moment visible.</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#77736b]">
            Only one banner is live at a time. Publishing a new one automatically replaces the
            current promotion.
          </p>
          <div className="mt-6 space-y-4">
            <Field
              label="Headline"
              value={draft.title}
              onChange={(value) => setDraft({ ...draft, title: value })}
              placeholder="Summer Sale · Up to 60% off"
              required
            />
            <TextArea
              label="Supporting line"
              value={draft.subtitle}
              onChange={(value) => setDraft({ ...draft, subtitle: value })}
              placeholder="A short sentence customers will see in the announcement bar."
              rows={3}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Button label"
                value={draft.ctaLabel}
                onChange={(value) => setDraft({ ...draft, ctaLabel: value })}
                placeholder="Shop now"
              />
              <Field
                label="Button link"
                value={draft.ctaHref}
                onChange={(value) => setDraft({ ...draft, ctaHref: value })}
                placeholder="/sale"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Ends on"
                type="date"
                value={draft.endsAt}
                onChange={(value) => setDraft({ ...draft, endsAt: value })}
              />
              <label className="block">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77736b]">
                  Accent colour
                </span>
                <div className="flex h-[42px] items-center gap-3 border border-[#191713]/15 bg-white px-3">
                  <input
                    type="color"
                    value={draft.background}
                    onChange={(event) => setDraft({ ...draft, background: event.target.value })}
                    className="h-7 w-9 cursor-pointer border-0 bg-transparent p-0"
                  />
                  <span className="text-[12px] uppercase text-[#77736b]">{draft.background}</span>
                </div>
              </label>
            </div>
            <button
              onClick={createBanner}
              disabled={!draft.title.trim() || !draft.subtitle.trim()}
              className="mt-2 inline-flex items-center gap-2 bg-[#191713] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-40 hover:bg-[#c9a84c] hover:text-[#191713]"
            >
              <Plus className="h-4 w-4" /> Publish banner
            </button>
            {notice && <p className="text-[11px] text-[#9b8040]">{notice}</p>}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9b8040]">
                Promotion library
              </p>
              <h2 className="mt-1 font-serif text-3xl">Banners</h2>
            </div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#8e8a81]">
              {banners.length} saved
            </p>
          </div>
          <div className="space-y-3">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`border bg-white p-5 ${banner.isActive ? "border-[#c9a84c]" : "border-[#191713]/10"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 shrink-0" style={{ background: banner.background }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[13px] font-semibold">{banner.title}</h3>
                      {banner.isActive && (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-700">
                          <Check className="h-3 w-3" /> Live
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-[#77736b]">{banner.subtitle}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#a19c93]">
                      Ends {banner.endsAt || "whenever you retire it"}
                    </p>
                  </div>
                  <button
                    onClick={() => removeBanner(banner.id)}
                    className="p-2 text-[#aaa59a] hover:bg-red-50 hover:text-red-600"
                    aria-label={`Delete ${banner.title}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#191713]/10 pt-3">
                  <span className="text-[10px] text-[#98938a]">Links to {banner.ctaHref}</span>
                  {!banner.isActive && (
                    <button
                      onClick={() => activate(banner.id)}
                      className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9b8040] hover:text-[#191713]"
                    >
                      Make live →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsManager({ initialSettings }: { initialSettings: SiteSettings }) {
  const { updateSettings, resetCatalog } = useCatalog();
  const [draft, setDraft] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  function save() {
    updateSettings(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  const update = (key: keyof SiteSettings, value: string) => setDraft({ ...draft, [key]: value });

  return (
    <div className="max-w-5xl space-y-7">
      <div className="border border-[#191713]/10 bg-white p-6 md:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9b8040]">
              Brand presentation
            </p>
            <h2 className="mt-2 font-serif text-3xl">Shape the storefront voice.</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#77736b]">
              These fields update the live navigation, hero section and contact points without
              touching code.
            </p>
          </div>
          <span className="inline-flex h-fit items-center gap-1.5 bg-[#f0eee9] px-3 py-2 text-[10px] text-[#77736b]">
            <Settings2 className="h-3.5 w-3.5" /> Store settings
          </span>
        </div>
        <div className="mt-8 space-y-8">
          <EditorGroup
            title="Announcement bar"
            description="The slim message at the very top of the storefront."
          >
            <Field
              label="Announcement text"
              value={draft.announcement}
              onChange={(value) => update("announcement", value)}
              placeholder="Complimentary shipping on orders above RS 5,000"
            />
          </EditorGroup>
          <EditorGroup
            title="Homepage hero"
            description="Update the first impression without rebuilding the page."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Eyebrow"
                value={draft.heroEyebrow}
                onChange={(value) => update("heroEyebrow", value)}
                placeholder="New Collection · Summer 2026"
              />
              <Field
                label="Hero image URL (optional)"
                value={draft.heroImage}
                onChange={(value) => update("heroImage", value)}
                placeholder="https://… or /your-image.webp"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Hero title"
                value={draft.heroTitle}
                onChange={(value) => update("heroTitle", value)}
                placeholder="Dressed for the Modern Woman"
              />
              <Field
                label="Accent word"
                value={draft.heroAccent}
                onChange={(value) => update("heroAccent", value)}
                placeholder="Modern"
              />
            </div>
            <TextArea
              label="Hero supporting copy"
              value={draft.heroSubtitle}
              onChange={(value) => update("heroSubtitle", value)}
              placeholder="A short description of the collection."
              rows={3}
            />
          </EditorGroup>
          <EditorGroup
            title="Store contact & fulfilment"
            description="Shown in the header, footer and customer support touchpoints."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Free shipping threshold"
                value={draft.shippingThreshold}
                onChange={(value) => update("shippingThreshold", value)}
                placeholder="RS 5,000"
              />
              <Field
                label="WhatsApp number"
                value={draft.whatsapp}
                onChange={(value) => update("whatsapp", value)}
                placeholder="923474325410"
              />
              <Field
                label="Support email"
                value={draft.supportEmail}
                onChange={(value) => update("supportEmail", value)}
                placeholder="hello@yourbrand.com"
              />
              <Field
                label="Instagram URL"
                value={draft.instagram}
                onChange={(value) => update("instagram", value)}
                placeholder="https://instagram.com/yourbrand"
              />
              <Field
                label="Facebook URL"
                value={draft.facebook}
                onChange={(value) => update("facebook", value)}
                placeholder="https://facebook.com/yourbrand"
              />
            </div>
          </EditorGroup>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#191713]/10 pt-5">
          <button
            onClick={() => {
              if (window.confirm("Reset all catalog content to the original Aurum demo data?"))
                resetCatalog();
            }}
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9b968d] hover:text-red-600"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset demo data
          </button>
          <button
            onClick={save}
            className="inline-flex items-center gap-2 bg-[#191713] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-[#c9a84c] hover:text-[#191713]"
          >
            {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}{" "}
            {saved ? "Saved" : "Save settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
