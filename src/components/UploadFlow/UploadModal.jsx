import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileCheck2, AlertTriangle } from 'lucide-react';
import DropZone from './DropZone.jsx';
import DeidentifySteps from './DeidentifySteps.jsx';
import SegmentationProgress from './SegmentationProgress.jsx';
import { useUploadFlow } from '../../hooks/useUploadFlow.js';
import { BODY_REGIONS } from '../../data/bodyRegions.js';

export default function UploadModal({ open, onClose, onComplete }) {
  const [regionHint, setRegionHint] = useState('knee');
  const [fileName, setFileName] = useState(null);
  const { state, completedSteps, result, error, start, reset } = useUploadFlow({
    onComplete: (seg) => onComplete?.(seg, regionHint),
  });

  const handleFile = (file) => {
    setFileName(file.name);
    start(file, regionHint);
  };

  const handleClose = () => {
    reset();
    setFileName(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-bg-primary/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-bg-panel border border-bg-border shadow-2xl"
          >
            <header className="flex items-center justify-between px-5 py-3 border-b border-bg-border">
              <h3 className="font-semibold">Upload a scan</h3>
              <button onClick={handleClose} className="text-text-muted hover:text-text-primary"><X size={18} /></button>
            </header>
            <div className="p-5 space-y-5">
              {state === 'idle' && (
                <>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-text-secondary font-mono mb-2 block">
                      Body region (helps target analysis)
                    </label>
                    <select
                      value={regionHint}
                      onChange={(e) => setRegionHint(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-bg-secondary border border-bg-border text-sm focus:border-accent-teal/50 outline-none"
                    >
                      {BODY_REGIONS.map((r) => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                  <DropZone onFile={handleFile} />
                </>
              )}

              {(state === 'uploading' || state === 'deidentifying' || state === 'segmenting' || state === 'complete') && (
                <div className="space-y-5">
                  {fileName && (
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <FileCheck2 size={16} className="text-accent-teal" />
                      <span className="font-mono truncate">{fileName}</span>
                    </div>
                  )}
                  <DeidentifySteps completedSteps={completedSteps} />
                  {state === 'segmenting' && <SegmentationProgress />}
                  {state === 'complete' && result && (
                    <div className="rounded-lg p-3 bg-accent-teal/10 border border-accent-teal/30 text-sm">
                      <div className="font-medium text-text-primary mb-1">Analysis complete</div>
                      <p className="text-text-secondary text-xs">
                        Finding mapped to body model. Click the highlighted region for a personalized explanation.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-3 w-full py-2 rounded-md bg-accent-teal text-bg-primary text-sm font-medium hover:opacity-90"
                      >
                        View on body
                      </button>
                    </div>
                  )}
                </div>
              )}

              {state === 'error' && (
                <div className="rounded-lg p-3 bg-accent-amber/10 border border-accent-amber/30 text-sm flex gap-2">
                  <AlertTriangle size={16} className="text-accent-amber mt-0.5" />
                  <div>
                    <div className="font-medium text-text-primary">Upload failed</div>
                    <div className="text-text-secondary text-xs mt-1">{error?.message}</div>
                    <button onClick={reset} className="mt-2 text-accent-teal text-xs hover:underline">Try again</button>
                  </div>
                </div>
              )}

              <p className="text-[10px] text-text-muted border-t border-bg-border pt-3">
                Files are de-identified before any AI processing. We do not store your scan unless you explicitly save it. Phase 1: segmentation is simulated — no real PHI processing yet.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
