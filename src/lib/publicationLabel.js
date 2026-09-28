// Keep parenthetical venue details after the year/identifier.
export function formatPublicationLabel(publisher, identifier) {
  const venue = String(publisher ?? "").trim();
  const suffix = String(identifier ?? "").trim();
  const match = venue.match(/^(.+?)\s*(\([^)]*\))$/);
  return match ? `${match[1].trim()}${suffix} ${match[2]}` : `${venue}${suffix}`;
}
