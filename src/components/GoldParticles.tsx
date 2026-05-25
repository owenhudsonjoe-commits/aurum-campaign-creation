export function GoldParticles({ count = 18 }: { count?: number }) {
  const particles = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 6 + Math.random() * 6;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gradient-gold animate-float"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              filter: "blur(0.5px)",
              boxShadow: "0 0 12px oklch(0.78 0.13 80 / 0.7)",
            }}
          />
        );
      })}
    </div>
  );
}
