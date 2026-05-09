import { Loader2 } from 'lucide-react';

export default function SegmentationProgress() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-accent-amber/5 border border-accent-amber/30">
      <Loader2 size={18} className="text-accent-amber animate-spin shrink-0" />
      <div>
        <div className="text-sm text-text-primary font-medium">Analyzing your scan…</div>
        <div className="text-xs text-text-muted mt-0.5 font-mono">AI segmentation in progress</div>
      </div>
    </div>
  );
}
