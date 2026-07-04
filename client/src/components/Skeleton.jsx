// Reusable skeleton loader component.
// Usage: <Skeleton className="h-5 w-48 rounded-btn" />
//        <SkeletonCard />   <- preset card shape
//        <SkeletonTable rows={5} /> <- preset table rows

export default function Skeleton({ className = "" }) {
  return (
    <div className={`bg-surface2 animate-pulse rounded ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-surface border border-border rounded-card p-5 animate-pulse">
      <div className="w-10 h-10 bg-surface2 rounded-btn mb-4" />
      <div className="h-3 bg-surface2 rounded w-3/4 mb-2" />
      <div className="h-6 bg-surface2 rounded w-1/2 mb-2" />
      <div className="h-3 bg-surface2 rounded w-2/3" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border animate-pulse">
      <div className="w-9 h-9 bg-surface2 rounded-btn flex-shrink-0" />
      <div className="flex-1">
        <div className="h-3 bg-surface2 rounded w-32 mb-1.5" />
        <div className="h-2.5 bg-surface2 rounded w-20" />
      </div>
      <div className="h-6 w-10 bg-surface2 rounded-full" />
      <div className="h-3 w-20 bg-surface2 rounded hidden sm:block" />
    </div>
  );
}

export function SkeletonProjectCard() {
  return (
    <div className="bg-surface border border-border rounded-card p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 bg-surface2 rounded-btn" />
        <div className="w-4 h-4 bg-surface2 rounded" />
      </div>
      <div className="h-4 bg-surface2 rounded w-3/4 mb-2" />
      <div className="h-3 bg-surface2 rounded w-1/2 mb-5" />
      <div className="flex justify-between">
        <div className="h-6 bg-surface2 rounded-full w-20" />
        <div className="h-3 bg-surface2 rounded w-24" />
      </div>
    </div>
  );
}

export function SkeletonWorkspaceTab() {
  return (
    <div className="animate-pulse flex flex-col gap-5">
      <div className="grid lg:grid-cols-2 gap-5">
        {[1, 2].map((i) => (
          <div key={i} className="bg-surface2 border border-border rounded-card p-6">
            <div className="h-4 bg-surface rounded w-1/3 mb-5" />
            <div className="flex flex-col gap-3">
              {[1,2,3,4,5].map((j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="h-2.5 bg-surface rounded w-32 flex-shrink-0" />
                  <div className="flex-1 h-2 bg-surface rounded-full" />
                  <div className="h-2.5 bg-surface rounded w-10" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        {[1,2,3].map((i) => (
          <div key={i} className="bg-surface2 border border-border rounded-card p-6 h-48">
            <div className="h-4 bg-surface rounded w-1/2 mb-4" />
            <div className="h-3 bg-surface rounded w-full mb-2" />
            <div className="h-3 bg-surface rounded w-4/5 mb-2" />
            <div className="h-3 bg-surface rounded w-3/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
