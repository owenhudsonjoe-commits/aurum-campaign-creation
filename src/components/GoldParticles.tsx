function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export function GoldParticles({ count = 18 }: { count?: number }) {
  const rand = seededRand(42);
  const particles = Array.from({ length: count }, () => ({
    size: 2 + rand() * 4,
    left: rand() * 100,
    top: rand() * 100,
    delay: rand() * 8,
    duration: 6 + rand() * 6,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gradient-gold animate-float"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: "blur(0.5px)",
            boxShadow: "0 0 12px oklch(0.78 0.13 80 / 0.7)",
          }}
        />
      ))}
    </div>
  );
}
