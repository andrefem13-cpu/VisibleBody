import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { DEIDENTIFY_STEPS } from '../../hooks/useUploadFlow.js';

export default function DeidentifySteps({ completedSteps }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs uppercase tracking-wider text-text-secondary font-mono">De-identification</h4>
      <ul className="space-y-2">
        {DEIDENTIFY_STEPS.map((step, i) => {
          const done = completedSteps.includes(step.id);
          const active = !done && completedSteps.length === i;
          return (
            <motion.li
              key={step.id}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: done || active ? 1 : 0.5 }}
              className="flex items-center gap-3 text-sm"
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-bg-secondary border border-bg-border">
                {done ? (
                  <Check size={12} className="text-accent-teal" />
                ) : active ? (
                  <Loader2 size={12} className="text-accent-teal animate-spin" />
                ) : null}
              </span>
              <span className={done ? 'text-text-primary' : active ? 'text-text-primary' : 'text-text-muted'}>
                {step.label}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
