/**
 * Host-agnostic media URL resolver.
 *
 * All binary assets live in `.asset.json` pointer files that expose a URL
 * beginning with `/__l5e/assets-v1/{id}/{filename}`. On Lovable hosting that
 * path is served automatically. When deploying to Vercel, Render, Railway,
 * Cloudflare Pages, or any other host, set the env var
 *
 *   VITE_ASSET_BASE_URL=https://<your-project>.lovable.app
 *
 * and every asset URL resolves to the fully-qualified CDN address. If the
 * variable is empty (default), URLs stay relative — which is exactly what
 * Lovable-hosted deployments want.
 */

type AssetPointer = { url: string };

const BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_ASSET_BASE_URL) ||
  (typeof process !== "undefined" && process.env?.VITE_ASSET_BASE_URL) ||
  "";

const trim = (s: string) => s.replace(/\/+$/, "");

export function assetUrl(pointerOrUrl: AssetPointer | string): string {
  const raw = typeof pointerOrUrl === "string" ? pointerOrUrl : pointerOrUrl.url;
  if (!raw) return raw;
  if (/^(https?:)?\/\//.test(raw)) return raw;
  if (!BASE) return raw;
  return `${trim(BASE)}${raw.startsWith("/") ? raw : `/${raw}`}`;
}
