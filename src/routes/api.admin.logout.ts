import { createFileRoute } from "@tanstack/react-router";
import { ADMIN_SESSION_COOKIE, jsonResponse } from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: () =>
        jsonResponse(
          { authenticated: false },
          {
            headers: {
              "set-cookie": `${ADMIN_SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`,
            },
          },
        ),
    },
  },
});
