import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-key",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_USERNAMES = ["umair455", "admin"];
const CATALOG_ID = "default";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}

function isAuthorized(key: string | null): boolean {
  const password = Deno.env.get("ADMIN_PASSWORD");
  const candidate = (key ?? "").trim();
  if (!candidate) return false;
  if (password) return candidate === password;
  return ALLOWED_USERNAMES.includes(candidate.toLowerCase());
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json().catch(() => ({}))) as {
      action?: string;
      credential?: string;
      data?: unknown;
    };

    const key = req.headers.get("x-admin-key") ?? body.credential ?? null;

    if (body.action === "login") {
      return isAuthorized(key)
        ? json({ authenticated: true })
        : json({ authenticated: false, error: "Invalid credentials." }, 401);
    }

    if (body.action !== "save") return json({ error: "Unknown action." }, 400);

    if (!isAuthorized(key)) return json({ error: "Not authorized." }, 401);
    if (!body.data || typeof body.data !== "object") return json({ error: "Missing data." }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { error } = await supabase
      .from("catalog_state")
      .upsert({ id: CATALOG_ID, data: body.data, updated_at: new Date().toISOString() });

    if (error) {
      console.error(error);
      return json({ error: error.message }, 500);
    }

    return json({ saved: true });
  } catch (error) {
    console.error(error);
    return json({ error: "Unexpected error." }, 500);
  }
});
