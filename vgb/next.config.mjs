import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEFAULT_PRODUCTION_ORIGIN = "https://vgb.vercel.app";
const DEFAULT_DEV_ORIGIN = "http://localhost:3000";

function trimEnv(name) {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function productionFallbackOrigin() {
  if (trimEnv("VERCEL") === "1" || process.env.NODE_ENV === "production") {
    return DEFAULT_PRODUCTION_ORIGIN;
  }
  return DEFAULT_DEV_ORIGIN;
}

function resolvePublicOrigin() {
  const fromPublic = trimEnv("NEXT_PUBLIC_APP_URL");
  if (fromPublic) {
    const candidate = /^https?:\/\//i.test(fromPublic)
      ? fromPublic
      : `https://${fromPublic}`;
    try {
      return new URL(candidate).origin;
    } catch {
      /* ignore */
    }
  }
  const vercelHost = trimEnv("VERCEL_URL");
  if (vercelHost) return `https://${vercelHost.replace(/\/$/, "")}`;
  return productionFallbackOrigin();
}

function resolveNextAuthUrl() {
  const explicit = trimEnv("NEXTAUTH_URL");
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelHost = trimEnv("VERCEL_URL");
  if (vercelHost) return `https://${vercelHost.replace(/\/$/, "")}`;
  return productionFallbackOrigin();
}

const publicAppOrigin = resolvePublicOrigin();
const nextAuthUrl = resolveNextAuthUrl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  outputFileTracingRoot: path.join(__dirname),
  env: {
    NEXT_PUBLIC_APP_URL: publicAppOrigin,
    NEXTAUTH_URL: nextAuthUrl,
  },
  async rewrites() {
    return [
      { source: "/jouer", destination: "/play.html" },
    ];
  },
};

export default nextConfig;
