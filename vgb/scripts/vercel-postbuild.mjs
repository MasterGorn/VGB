/**
 * Contournement Vercel + Next.js 16 + Root Directory :
 * finalisation Git cherche /vercel/path0/.next/ au lieu de /vercel/path0/vgb/.next/
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const appRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.join(appRoot, "..");
const nextDir = path.join(appRoot, ".next");

function symlinkDir(target, linkPath) {
  if (!fs.existsSync(target)) {
    console.warn(`[vercel-postbuild] Dossier absent, symlink ignoré : ${target}`);
    return;
  }
  fs.rmSync(linkPath, { recursive: true, force: true });
  fs.symlinkSync(target, linkPath, "dir");
  console.log(`[vercel-postbuild] ${linkPath} -> ${target}`);
}

if (process.env.VERCEL !== "1") {
  console.log("[vercel-postbuild] Ignoré (hors Vercel).");
  process.exit(0);
}

if (!fs.existsSync(nextDir)) {
  console.error("[vercel-postbuild] .next introuvable après build.");
  process.exit(1);
}

const routesManifest = path.join(nextDir, "routes-manifest.json");
const routesDeterministic = path.join(nextDir, "routes-manifest-deterministic.json");
if (fs.existsSync(routesManifest) && !fs.existsSync(routesDeterministic)) {
  fs.copyFileSync(routesManifest, routesDeterministic);
}

symlinkDir(nextDir, path.join(repoRoot, ".next"));

const appModules = path.join(appRoot, "node_modules");
const repoModules = path.join(repoRoot, "node_modules");
if (!fs.existsSync(repoModules) && fs.existsSync(appModules)) {
  symlinkDir(appModules, repoModules);
}
