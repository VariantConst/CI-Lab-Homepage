// Parenthetical conference details do not change a TOG paper's journal.
export function publicationVenue(publisher) {
  const venue = String(publisher ?? "").trim();
  return /^(?:ACM\s+)?TOG\b/i.test(venue) ? "TOG" : venue;
}
