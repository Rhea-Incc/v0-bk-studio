/**
 * Host-agnostic media URL resolver.
 *
 * Binary assets are included under `public/media`, so every deployment owns
 * and serves its media. The pointer is retained only as a stable way to derive
 * the original filename; no request depends on Lovable's asset gateway.
 */

type AssetPointer = { url: string };

export function assetUrl(pointerOrUrl: AssetPointer | string): string {
  const raw = typeof pointerOrUrl === "string" ? pointerOrUrl : pointerOrUrl.url;
  if (!raw) return raw;
  if (/^(https?:)?\/\//.test(raw)) return raw;

  const filename = raw.split("/").filter(Boolean).at(-1);
  if (raw.includes("/__l5e/assets-v1/") && filename) {
    return `/media/${encodeURIComponent(filename)}`;
  }

  return raw;
}
