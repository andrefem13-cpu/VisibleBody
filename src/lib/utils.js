export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function classNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function fuzzyMatch(query, candidates, key = 'label') {
  const q = query.trim().toLowerCase();
  if (!q) return candidates;
  return candidates
    .map((c) => {
      const label = (c[key] || '').toLowerCase();
      if (label.startsWith(q)) return { c, score: 3 };
      if (label.includes(q)) return { c, score: 2 };
      const tokens = label.split(/\s+/);
      if (tokens.some((t) => t.startsWith(q))) return { c, score: 1 };
      return { c, score: 0 };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.c);
}
