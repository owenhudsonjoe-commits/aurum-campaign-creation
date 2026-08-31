import { supabase } from "@/integrations/supabase/client";

export const ADMIN_KEY_STORAGE = "aurum_admin_key";
const CATALOG_ID = "default";

export interface CatalogSnapshot {
  products: unknown[];
  collections: string[];
  banners: unknown[];
  settings: Record<string, unknown>;
}

export function getAdminKey(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ADMIN_KEY_STORAGE);
}

export function setAdminKey(value: string) {
  window.localStorage.setItem(ADMIN_KEY_STORAGE, value);
}

export function clearAdminKey() {
  window.localStorage.removeItem(ADMIN_KEY_STORAGE);
}

/** Reads the shared catalog that every visitor sees. */
export async function fetchCloudCatalog(): Promise<CatalogSnapshot | null> {
  const { data, error } = await supabase
    .from("catalog_state")
    .select("data")
    .eq("id", CATALOG_ID)
    .maybeSingle();

  if (error || !data?.data) return null;
  return data.data as unknown as CatalogSnapshot;
}

/** Publishes the catalog for everyone. Requires a valid admin credential. */
export async function saveCloudCatalog(snapshot: CatalogSnapshot): Promise<boolean> {
  const key = getAdminKey();
  if (!key) return false;

  const { data, error } = await supabase.functions.invoke("catalog-admin", {
    body: { action: "save", data: snapshot },
    headers: { "x-admin-key": key },
  });

  if (error) {
    console.error("Failed to publish catalog", error);
    return false;
  }
  return Boolean((data as { saved?: boolean } | null)?.saved);
}

export async function verifyAdminCredential(credential: string): Promise<boolean> {
  const { data, error } = await supabase.functions.invoke("catalog-admin", {
    body: { action: "login", credential },
    headers: { "x-admin-key": credential },
  });
  if (error) return false;
  return Boolean((data as { authenticated?: boolean } | null)?.authenticated);
}
