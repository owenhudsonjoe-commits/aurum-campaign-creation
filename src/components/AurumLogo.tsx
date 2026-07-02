export function AurumLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span
        className="font-display font-light text-foreground"
        style={{ fontSize: "1.35em", letterSpacing: "0.25em" }}
      >
        AURUM
      </span>
      <span
        className="font-sans font-light text-foreground/40"
        style={{ fontSize: "0.38em", letterSpacing: "0.35em", marginTop: "3px" }}
      >
        MAISON · LAHORE
      </span>
    </span>
  );
}
