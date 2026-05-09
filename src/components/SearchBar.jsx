import { useState, useMemo, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { BODY_REGIONS } from '../data/bodyRegions.js';
import { fuzzyMatch } from '../lib/utils.js';

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const matches = useMemo(() => fuzzyMatch(query, BODY_REGIONS).slice(0, 6), [query]);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const pick = (region) => {
    setQuery('');
    setOpen(false);
    onSelect(region.id);
  };

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-secondary border border-bg-border focus-within:border-accent-teal/50">
        <Search size={16} className="text-text-muted" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search a region (knee, shoulder, spine…)"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-text-muted"
        />
      </div>
      {open && query && matches.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 rounded-md bg-bg-panel border border-bg-border shadow-lg z-30 overflow-hidden">
          {matches.map((r) => (
            <li key={r.id}>
              <button
                onClick={() => pick(r)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent-teal/10 hover:text-accent-teal transition flex justify-between"
              >
                <span>{r.label}</span>
                <span className="text-text-muted text-xs">{r.system}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
