import { createFileRoute } from "@tanstack/react-router";
import {
  ADMIN_SESSION_COOKIE,
  isValidSessionToken,
  jsonResponse,
  readCookie,
} from "@/lib/admin-auth";

export const Route = createFileRoute("/api/admin/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = readCookie(request, ADMIN_SESSION_COOKIE);
        return jsonResponse({ authenticated: await isValidSessionToken(token) });
      },
    },
  },
});
