export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 w-1/3 bg-bg-border rounded" />
      <div className="h-6 w-2/3 bg-bg-border rounded" />
      <div className="h-3 w-full bg-bg-border rounded" />
      <div className="h-3 w-5/6 bg-bg-border rounded" />
      <div className="h-3 w-4/6 bg-bg-border rounded" />
      <div className="pt-4 text-xs text-text-muted font-mono">AI analyzing…</div>
    </div>
  );
}
