import { Activity, Upload } from 'lucide-react';
import PortalToggle from './PortalToggle.jsx';
import SearchBar from './SearchBar.jsx';

export default function Header({ mode, setMode, onSelectRegion, onUploadClick }) {
  return (
    <header className="flex items-center gap-4 px-4 md:px-6 h-14 border-b border-bg-border bg-bg-panel/70 backdrop-blur z-20">
      <div className="flex items-center gap-2">
        <Activity className="text-accent-teal" size={22} />
        <span className="font-bold tracking-tight text-text-primary">BodyMap AI</span>
      </div>
      <div className="flex-1 max-w-xl">
        <SearchBar onSelect={onSelectRegion} />
      </div>
      <PortalToggle mode={mode} setMode={setMode} />
      <button
        onClick={onUploadClick}
        className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent-teal/10 hover:bg-accent-teal/20 text-accent-teal border border-accent-teal/30 text-sm transition"
      >
        <Upload size={16} /> Upload scan
      </button>
    </header>
  );
}
