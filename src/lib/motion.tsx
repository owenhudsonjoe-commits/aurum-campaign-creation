import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

/* ─────────────────────────────────────────────────────────────
   Shared scroll ticker — one rAF loop for the whole page
   ───────────────────────────────────────────────────────────── */

type Listener = () => void;
const listeners = new Set<Listener>();
let running = false;
let frame = 0;

function loop() {
  frame = 0;
  running = false;
  listeners.forEach((fn) => fn());
}

function schedule() {
  if (running) return;
  running = true;
  frame = requestAnimationFrame(loop);
}

function subscribe(fn: Listener) {
  if (typeof window === "undefined") return () => {};
  listeners.add(fn);
  if (listeners.size === 1) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  fn();
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      running = false;
    }
  };
}

/* ─────────────────────────────────────────────────────────────
   Preferences
   ───────────────────────────────────────────────────────────── */

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return coarse;
}

const MotionCtx = createContext(true);
export const MotionProvider = MotionCtx.Provider;
export const useMotionEnabled = () => useContext(MotionCtx);

/* ─────────────────────────────────────────────────────────────
   Scroll progress of an element through the viewport (0 → 1)
   ───────────────────────────────────────────────────────────── */

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

export function useElementProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onProgress: (p: number) => void,
  enabled = true,
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    return subscribe(() => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the element's top hits the bottom of the viewport,
      // 1 when its bottom leaves the top of the viewport.
      const p = clamp((vh - rect.top) / (vh + rect.height));
      cb.current(p);
    });
  }, [ref, enabled]);
}

/* ─────────────────────────────────────────────────────────────
   Reveal — masked, depth-aware entrance
   ───────────────────────────────────────────────────────────── */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** vertical offset in px */
  y?: number;
  /** starting scale */
  from?: number;
  /** z-depth feeling */
  depth?: number;
  once?: boolean;
  style?: CSSProperties;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
  from = 1,
  depth = 0,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useMotionEnabled();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown
          ? "none"
          : `perspective(1200px) translate3d(0, ${y}px, ${-depth}px) scale(${from})`,
        transition: enabled
          ? `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.15s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
          : undefined,
        willChange: shown ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Parallax — layered depth driven by scroll
   ───────────────────────────────────────────────────────────── */

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** px of travel across the full pass (negative = moves up faster) */
  distance?: number;
  /** extra scale added while in view */
  scaleRange?: number;
  style?: CSSProperties;
}

export function Parallax({
  children,
  className = "",
  distance = -80,
  scaleRange = 0,
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useMotionEnabled();

  useElementProgress(
    ref,
    (p) => {
      const el = ref.current;
      if (!el) return;
      const t = (p - 0.5) * 2; // -1 → 1
      const scale = 1 + scaleRange * (1 - Math.abs(t));
      el.style.transform = `translate3d(0, ${t * distance}px, 0) scale(${scale.toFixed(4)})`;
    },
    enabled,
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: enabled ? "transform" : undefined, ...style }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scene — render-prop access to a section's scroll progress
   ───────────────────────────────────────────────────────────── */

export function useSceneProgress<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const last = useRef(0);
  useElementProgress(
    ref,
    (p) => {
      if (Math.abs(p - last.current) < 0.002) return;
      last.current = p;
      setProgress(p);
    },
    enabled,
  );
  return { ref, progress: enabled ? progress : 0.5 };
}

/* ─────────────────────────────────────────────────────────────
   Tilt — subtle pointer-driven perspective (desktop only)
   ───────────────────────────────────────────────────────────── */

export function TiltCard({
  children,
  className = "",
  max = 5,
  lift = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  lift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useMotionEnabled();
  const coarse = useIsCoarsePointer();
  const active = enabled && !coarse;

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!active) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translate3d(0, -${lift}px, 0)`;
    },
    [active, max, lift],
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 700ms cubic-bezier(0.16,1,0.3,1), box-shadow 700ms cubic-bezier(0.16,1,0.3,1)",
        willChange: active ? "transform" : undefined,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HorizontalRail — vertical scroll drives horizontal travel
   ───────────────────────────────────────────────────────────── */

export function HorizontalRail({
  children,
  className = "",
  heightVh = 220,
}: {
  children: ReactNode;
  className?: string;
  heightVh?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const enabled = useMotionEnabled();
  const coarse = useIsCoarsePointer();
  const pinned = enabled && !coarse;

  useEffect(() => {
    if (!pinned) return;
    const el = outer.current;
    const tr = track.current;
    if (!el || !tr) return;
    return subscribe(() => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;
      const p = clamp(-rect.top / total);
      const travel = Math.max(0, tr.scrollWidth - window.innerWidth + 80);
      tr.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
    });
  }, [pinned]);

  if (!pinned) {
    return (
      <div className={`flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-5 pb-4 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div ref={outer} style={{ height: `${heightVh}vh` }} className="relative">
      <div className="sticky top-[97px] flex h-[calc(100svh-97px)] max-h-[820px] items-center overflow-hidden">
        <div
          ref={track}
          className={`flex gap-8 pl-8 md:pl-20 ${className}`}
          style={{ willChange: "transform" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Smooth scroll (lenis) — desktop only, respects reduced motion
   ───────────────────────────────────────────────────────────── */

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 });
      const tick = (time: number) => {
        lenis?.raf(time);
        schedule();
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [enabled]);
}

/* ─────────────────────────────────────────────────────────────
   Small helpers
   ───────────────────────────────────────────────────────────── */

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t);
}

export function useMotionSettings() {
  const reduced = useReducedMotion();
  const coarse = useIsCoarsePointer();
  return useMemo(() => ({ enabled: !reduced, coarse }), [reduced, coarse]);
}
