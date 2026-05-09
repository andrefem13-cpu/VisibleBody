import { motion } from 'framer-motion';

export default function SplitView({ normal, pathology, pathologyLabel }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-lg p-3 bg-accent-teal/5 border border-accent-teal/30"
      >
        <div className="text-[10px] uppercase tracking-wider text-accent-teal font-mono mb-1">Normal</div>
        <p className="text-sm text-text-primary leading-relaxed">{normal}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-lg p-3 bg-accent-amber/5 border border-accent-amber/30"
      >
        <div className="text-[10px] uppercase tracking-wider text-accent-amber font-mono mb-1">
          {pathologyLabel || 'Common Condition'}
        </div>
        <p className="text-sm text-text-primary leading-relaxed">{pathology}</p>
      </motion.div>
    </div>
  );
}
