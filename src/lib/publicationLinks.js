function normalizeUrl(url) {
  if (typeof url !== "string") return undefined;

  const raw = url.trim();
  if (!raw) return undefined;

  try {
    const safe = raw.startsWith("//") ? `https:${raw}` : raw;
    return new URL(safe).href;
  } catch {
    return undefined;
  }
}

function resolvePreferredUrl(preferredUrl, fallbackUrl) {
  return normalizeUrl(preferredUrl) || normalizeUrl(fallbackUrl) || fallbackUrl;
}

export function resolvePdfUrl(fields) {
  if (!fields) return undefined;

  return resolvePreferredUrl(
    fields.pdfLink,
    fields.pdf?.fields?.file?.url
  );
}

export function resolveSuppUrl(fields) {
  if (!fields) return undefined;

  return resolvePreferredUrl(
    fields.suppPdfLink,
    fields.supplementaryMaterial?.fields?.file?.url
  );
}

export function resolveSupplementaryUrl(fields) {
  return resolveSuppUrl(fields);
}