export function AurumLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-sans font-bold tracking-widest text-foreground ${className}`}
      style={{ letterSpacing: "0.15em" }}
    >
      AURUM
    </span>
  );
}
