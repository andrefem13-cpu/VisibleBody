import { classNames } from '../lib/utils.js';

export default function PortalToggle({ mode, setMode }) {
  return (
    <div className="flex p-0.5 rounded-full bg-bg-secondary border border-bg-border text-xs">
      <button
        onClick={() => setMode('patient')}
        className={classNames(
          'px-3 py-1 rounded-full transition',
          mode === 'patient' ? 'bg-accent-teal text-bg-primary font-medium' : 'text-text-secondary hover:text-text-primary'
        )}
      >
        Patient
      </button>
      <button
        onClick={() => setMode('clinician')}
        className={classNames(
          'px-3 py-1 rounded-full transition',
          mode === 'clinician' ? 'bg-accent-violet text-white font-medium' : 'text-text-secondary hover:text-text-primary'
        )}
      >
        Clinician
      </button>
    </div>
  );
}
