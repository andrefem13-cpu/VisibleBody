import { useEffect, useState } from 'react';
import { X, Info } from 'lucide-react';

const SESSION_KEY = 'bodymap.disclaimerDismissed';

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_KEY) !== '1') setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(false);
  };

  return (
    <div className="flex items-start gap-3 px-4 py-2 bg-accent-amber/10 border-b border-accent-amber/30 text-xs md:text-sm">
      <Info size={16} className="text-accent-amber mt-0.5 shrink-0" />
      <p className="flex-1 text-text-secondary">
        <span className="text-accent-amber font-medium">Educational use only.</span> BodyMap AI explains anatomy and common conditions. It does not diagnose. Always consult a qualified clinician.
      </p>
      <button onClick={dismiss} className="text-text-muted hover:text-text-primary"><X size={16} /></button>
    </div>
  );
}
