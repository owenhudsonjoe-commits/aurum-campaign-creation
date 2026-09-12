import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Pause } from "lucide-react";
import { useMotionEnabled } from "@/lib/motion";

interface Props {
  images: string[];
  alt: string;
  index: number;
  onIndexChange: (i: number) => void;
  children?: React.ReactNode;
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

export function Product360Viewer({ images, alt, index, onIndexChange, children }: Props) {
  const motionEnabled = useMotionEnabled();
  const n = images.length;
  const angle = 360 / n;

  const stageRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(420);
  const [rotation, setRotation] = useState(-index * angle);
  const [dragging, setDragging] = useState(false);
  const [autoplay, setAutoplay] = useState(motionEnabled);
  const [hovering, setHovering] = useState(false);

  const rotationRef = useRef(rotation);
  rotationRef.current = rotation;
  const dragState = useRef<{ x: number; start: number } | null>(null);

  // Cylinder radius from stage width
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      setRadius(Math.round(w / 2 / Math.tan(Math.PI / n)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [n]);

  // Keep rotation in sync when thumbnails change the index externally
  useEffect(() => {
    const target = -index * angle;
    const current = rotationRef.current;
    const delta = mod(target - current + 180, 360) - 180;
    if (Math.abs(delta) > 0.5) setRotation(current + delta);
  }, [index, angle]);

  const settle = useCallback(
    (value: number) => {
      const snapped = Math.round(value / angle) * angle;
      setRotation(snapped);
      onIndexChange(mod(Math.round(-snapped / angle), n));
    },
    [angle, n, onIndexChange],
  );

  const step = useCallback(
    (dir: number) => settle(rotationRef.current - dir * angle),
    [angle, settle],
  );

  // Gentle auto-rotate
  useEffect(() => {
    if (!autoplay || !motionEnabled || dragging || hovering) return;
    const id = window.setInterval(() => step(1), 3200);
    return () => window.clearInterval(id);
  }, [autoplay, motionEnabled, dragging, hovering, step]);

  function onPointerDown(e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = { x: e.clientX, start: rotationRef.current };
    setDragging(true);
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = dragState.current;
    if (!d) return;
    const width = stageRef.current?.clientWidth || 1;
    setRotation(d.start + ((e.clientX - d.x) / width) * angle * 2.2);
  }
  function onPointerUp() {
    if (!dragState.current) return;
    dragState.current = null;
    setDragging(false);
    settle(rotationRef.current);
  }

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        ref={stageRef}
        className="relative aspect-[3/4] overflow-hidden bg-muted touch-pan-y"
        style={{ perspective: "1600px", cursor: dragging ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="group"
        aria-label={`${alt} — drag to rotate through product views`}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
            transition: dragging
              ? "none"
              : "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {images.map((src, i) => {
            const face = mod(i * angle + rotation, 360);
            const off = Math.min(face, 360 - face);
            const front = off < angle / 2 + 0.5;
            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                  opacity: off > 92 ? 0 : 1,
                  transition: dragging ? "none" : "opacity 700ms ease",
                }}
              >
                <img
                  src={src}
                  alt={front ? alt : ""}
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                  style={{
                    filter: `brightness(${1 - Math.min(off, 90) / 260})`,
                    transition: dragging ? "none" : "filter 700ms ease",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Soft floor shadow for depth */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: "linear-gradient(to top, rgba(23,19,15,0.22), transparent)" }}
        />

        {children}

        {/* Controls */}
        <button
          onClick={() => step(-1)}
          aria-label="Previous view"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center bg-background/75 backdrop-blur opacity-0 transition-opacity duration-300 hover:bg-background group-hover:opacity-100 md:opacity-60 md:hover:opacity-100"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
        </button>
        <button
          onClick={() => step(1)}
          aria-label="Next view"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center bg-background/75 backdrop-blur opacity-0 transition-opacity duration-300 hover:bg-background group-hover:opacity-100 md:opacity-60 md:hover:opacity-100"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
        </button>

        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex items-center gap-3 bg-background/75 px-3 py-1.5 backdrop-blur">
          <button
            onClick={() => setAutoplay((v) => !v)}
            aria-label={autoplay ? "Pause rotation" : "Play rotation"}
            className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-foreground/70 hover:text-foreground transition-colors"
          >
            {autoplay ? <Pause className="h-3 w-3" strokeWidth={2} /> : <RotateCw className="h-3 w-3" strokeWidth={2} />}
            360° View
          </button>
          <span className="h-3 w-px bg-border" />
          <span className="text-[9px] uppercase tracking-widest text-foreground/45">
            {index + 1} / {n}
          </span>
        </div>
      </div>
    </div>
  );
}
