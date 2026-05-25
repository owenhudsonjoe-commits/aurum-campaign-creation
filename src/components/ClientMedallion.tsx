import { useEffect, useState, lazy, Suspense } from "react";

const Medallion3D = lazy(() =>
  import("./Medallion3D").then((m) => ({ default: m.Medallion3D }))
);

export function ClientMedallion({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={className} aria-hidden />;
  }

  return (
    <div className={className}>
      <Suspense fallback={null}>
        <Medallion3D />
      </Suspense>
    </div>
  );
}
