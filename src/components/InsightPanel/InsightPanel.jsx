import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { useBodyMapAI } from '../../hooks/useBodyMapAI.js';
import LoadingSkeleton from './LoadingSkeleton.jsx';
import PortalContent from './PortalContent.jsx';
import { REGION_BY_ID } from '../../data/bodyRegions.js';

export default function InsightPanel({ regionId, mode, scanContext, onClose }) {
  const { data, loading, error, explain, reset } = useBodyMapAI();

  useEffect(() => {
    if (!regionId) { reset(); return; }
    explain({
      regionId,
      mode,
      hasUpload: Boolean(scanContext),
      uploadContext: scanContext,
    }).catch(() => {});
  }, [regionId, mode, scanContext, explain, reset]);

  const region = regionId ? REGION_BY_ID[regionId] : null;

  return (
    <AnimatePresence>
      {regionId && (
        <motion.aside
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          className="absolute top-0 right-0 h-full w-full md:w-[420px] bg-bg-panel border-l border-bg-border z-10 overflow-y-auto"
        >
          <header className="sticky top-0 flex items-center justify-between px-4 py-3 bg-bg-panel/95 backdrop-blur border-b border-bg-border z-10">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-text-muted font-mono">{region?.system}</div>
              <div className="text-sm font-medium text-text-primary">{region?.label}</div>
            </div>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary"><X size={18} /></button>
          </header>
          <div className="px-4 py-5">
            {loading && <LoadingSkeleton />}
            {error && (
              <div className="rounded-lg p-3 bg-accent-amber/10 border border-accent-amber/30 text-sm text-text-primary flex gap-2">
                <AlertTriangle size={16} className="text-accent-amber mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium">Couldn't load explanation</div>
                  <div className="text-xs text-text-secondary mt-1">{error.message}</div>
                </div>
              </div>
            )}
            {!loading && !error && data && <PortalContent data={data} mode={mode} />}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
