export const ADMIN_SESSION_COOKIE = "aurum_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24;

const DEFAULT_ADMIN_USERNAME = "umair455";

function env(key: string): string | undefined {
  try {
    return (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.[
      key
    ];
  } catch {
    return undefined;
  }
}

export function allowedUsernames(): Set<string> {
  return new Set(
    [env("ADMIN_USERNAME"), DEFAULT_ADMIN_USERNAME, "admin"]
      .filter((value): value is string => Boolean(value && value.trim()))
      .map((value) => value.trim().toLowerCase()),
  );
}

export function isAllowedUsername(raw: unknown): boolean {
  const username = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  if (!username) return false;
  return allowedUsernames().has(username);
}

function secret(): string {
  return env("ADMIN_SESSION_SECRET") || "aurum-atelier-session-secret";
}

async function sign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(username: string): Promise<string> {
  const payload = username.trim().toLowerCase();
  return `${payload}.${await sign(payload)}`;
}

export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;
  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!allowedUsernames().has(payload)) return false;
  return (await sign(payload)) === signature;
}

export function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie") ?? "";
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return undefined;
}

export function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}
