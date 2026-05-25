export function PaisleyDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      <span className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent to-gold/70" />
      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="text-gold">
        <path
          d="M24 2 C 30 6, 32 12, 30 18 C 28 22, 24 22, 24 18 C 24 22, 20 22, 18 18 C 16 12, 18 6, 24 2 Z"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="24" cy="12" r="1.2" fill="currentColor" />
        <path d="M6 12 L 14 12" stroke="currentColor" strokeWidth="0.6" />
        <path d="M34 12 L 42 12" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="4" cy="12" r="1.2" fill="currentColor" />
        <circle cx="44" cy="12" r="1.2" fill="currentColor" />
      </svg>
      <span className="h-px w-24 md:w-40 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}
