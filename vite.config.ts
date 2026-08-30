import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "path";
import { randomBytes } from "node:crypto";

const ADMIN_SESSION_COOKIE = "aurum_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24;
const DEFAULT_ADMIN_USERNAME = "umair455";

function adminAuthPlugin(): Plugin {
  const sessions = new Set<string>();

  return {
    name: "aurum-admin-auth",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const requestUrl = request.url ? new URL(request.url, "http://localhost") : null;
        if (!requestUrl?.pathname.startsWith("/api/admin/")) {
          next();
          return;
        }

        response.setHeader("content-type", "application/json");
        response.setHeader("cache-control", "no-store");
        const cookies = Object.fromEntries(
          (request.headers.cookie ?? "")
            .split(";")
            .map((cookie) => cookie.trim().split("="))
            .filter(([key, value]) => key && value),
        );
        const session = cookies[ADMIN_SESSION_COOKIE];

        if (requestUrl.pathname === "/api/admin/session" && request.method === "GET") {
          response.statusCode = 200;
          response.end(
            JSON.stringify({ authenticated: Boolean(session && sessions.has(session)) }),
          );
          return;
        }

        if (requestUrl.pathname === "/api/admin/logout" && request.method === "POST") {
          if (session) sessions.delete(session);
          response.setHeader(
            "set-cookie",
            `${ADMIN_SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`,
          );
          response.statusCode = 200;
          response.end(JSON.stringify({ authenticated: false }));
          return;
        }

        if (requestUrl.pathname === "/api/admin/login" && request.method === "POST") {
          const body = await readRequestBody(request);
          const username = typeof body?.username === "string" ? body.username.trim().toLowerCase() : "";
          const allowedUsernames = new Set(
            [process.env.ADMIN_USERNAME, DEFAULT_ADMIN_USERNAME, "admin"]
              .filter((value): value is string => Boolean(value && value.trim()))
              .map((value) => value.trim().toLowerCase()),
          );

          if (!allowedUsernames.has(username)) {
            response.statusCode = 401;
            response.end(JSON.stringify({ message: "Incorrect username." }));
            return;
          }


          const token = randomBytes(32).toString("hex");
          sessions.add(token);
          response.setHeader(
            "set-cookie",
            `${ADMIN_SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`,
          );
          response.statusCode = 200;
          response.end(JSON.stringify({ authenticated: true }));
          return;
        }

        response.statusCode = 404;
        response.end(JSON.stringify({ message: "Admin endpoint not found." }));
      });
    },
  };
}

function readRequestBody(
  request: import("node:http").IncomingMessage,
): Promise<Record<string, unknown> | null> {
  return new Promise((resolveBody) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10_000) request.destroy();
    });
    request.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        resolveBody(parsed && typeof parsed === "object" ? parsed : null);
      } catch {
        resolveBody(null);
      }
    });
    request.on("error", () => resolveBody(null));
  });
}

export default defineConfig({
  plugins: [
    adminAuthPlugin(),
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    watch: {
      ignored: ["**/.cache/**", "**/node_modules/**", "**/.git/**", "**/.local/**"],
    },
  },
});
