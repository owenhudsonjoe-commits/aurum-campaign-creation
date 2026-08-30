import { createFileRoute } from "@tanstack/react-router";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createSessionToken,
  isAllowedUsername,
  jsonResponse,
} from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Record<string, unknown> | null = null;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          body = null;
        }

        const username = typeof body?.username === "string" ? body.username.trim() : "";
        if (!isAllowedUsername(username)) {
          return jsonResponse({ message: "Incorrect username." }, { status: 401 });
        }

        const token = await createSessionToken(username);
        return jsonResponse(
          { authenticated: true },
          {
            headers: {
              "set-cookie": `${ADMIN_SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${ADMIN_SESSION_MAX_AGE}`,
            },
          },
        );
      },
    },
  },
});
