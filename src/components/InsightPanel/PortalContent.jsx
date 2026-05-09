import SplitView from './SplitView.jsx';

function Section({ title, children }) {
  return (
    <div className="space-y-1.5">
      <h4 className="text-[10px] uppercase tracking-wider text-text-secondary font-mono">{title}</h4>
      {children}
    </div>
  );
}

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-1 text-sm text-text-primary">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2"><span className="text-accent-teal">•</span><span>{it}</span></li>
      ))}
    </ul>
  );
}

export default function PortalContent({ data, mode }) {
  if (!data) return null;

  if (mode === 'clinician') {
    return (
      <div className="space-y-5">
        <header className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-text-primary">{data.regionName}</h3>
            {data.icd10 && <span className="font-mono text-xs text-accent-violet">{data.icd10}</span>}
          </div>
          <p className="text-sm text-text-secondary">{data.headline}</p>
        </header>
        <SplitView normal={data.normalExplanation} pathology={data.pathologyExplanation} pathologyLabel={data.pathologyName} />
        <Section title="Clinical Pearls"><BulletList items={data.keyPoints} /></Section>
        <Section title="Diagnostic Criteria"><BulletList items={data.diagnosticCriteria} /></Section>
        <Section title="Treatment Options"><BulletList items={data.treatmentOptions} /></Section>
        {data.redFlags?.length > 0 && (
          <Section title="Red Flags">
            <ul className="space-y-1 text-sm">
              {data.redFlags.map((it, i) => (
                <li key={i} className="flex gap-2 text-accent-amber"><span>!</span><span>{it}</span></li>
              ))}
            </ul>
          </Section>
        )}
        <Section title="Differential Diagnosis"><BulletList items={data.differentialDiagnosis} /></Section>
        <Section title="References">
          <ul className="space-y-1 text-xs text-text-muted font-mono">
            {(data.references || []).map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </Section>
        <p className="text-[10px] text-text-muted border-t border-bg-border pt-3">
          Decision-support reference. Not a diagnostic tool. Verify against current guidelines.
        </p>
      </div>
    );
  }

  // Patient mode
  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h3 className="text-lg font-semibold text-text-primary">{data.regionName}</h3>
        <p className="text-sm text-text-secondary">{data.headline}</p>
      </header>
      <SplitView normal={data.normalExplanation} pathology={data.pathologyExplanation} pathologyLabel={data.pathologyName} />
      <Section title="Key Things to Know"><BulletList items={data.keyPoints} /></Section>
      <Section title="Common Symptoms"><BulletList items={data.commonSymptoms} /></Section>
      {data.whenToSeekHelp && (
        <Section title="When to Seek Help">
          <p className="text-sm text-text-primary">{data.whenToSeekHelp}</p>
        </Section>
      )}
      {data.hopefulNote && (
        <div className="rounded-lg p-3 bg-accent-teal/10 border border-accent-teal/30 text-sm text-text-primary">
          {data.hopefulNote}
        </div>
      )}
      <p className="text-[10px] text-text-muted border-t border-bg-border pt-3">
        {data.disclaimer || 'Educational content only. Not a diagnosis. Always consult your clinician.'}
      </p>
    </div>
  );
}
