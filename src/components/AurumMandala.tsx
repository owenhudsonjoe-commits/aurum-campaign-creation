export function AurumMandala({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden
      >
        <defs>
          {/* Gold radial gradient — center bright, edge deep */}
          <radialGradient id="goldCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5e0a0" />
            <stop offset="35%" stopColor="#d4a030" />
            <stop offset="70%" stopColor="#9c6d10" />
            <stop offset="100%" stopColor="#6b470a" />
          </radialGradient>

          {/* Pale gold for thin strokes */}
          <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d070" />
            <stop offset="50%" stopColor="#c89020" />
            <stop offset="100%" stopColor="#f0d070" />
          </linearGradient>

          {/* Warm ivory fill for centre medallion */}
          <radialGradient id="ivoryFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fdf6e3" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f7e8c0" stopOpacity="0.7" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft outer glow */}
          <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── LAYER 0: ambient soft halo ── */}
        <circle cx="300" cy="300" r="270" fill="url(#goldCenter)" opacity="0.04" />
        <circle cx="300" cy="300" r="240" fill="url(#goldCenter)" opacity="0.05" />

        {/* ── LAYER 1: Outermost ring of 24 tear-drops (slow CW) ── */}
        <g style={{ transformOrigin: "300px 300px", animation: "mandala-spin-cw 80s linear infinite" }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 360;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                <ellipse cx="300" cy="90" rx="5" ry="12" fill="url(#goldCenter)" opacity="0.55" />
                <line x1="300" y1="102" x2="300" y2="115" stroke="url(#goldStroke)" strokeWidth="0.6" opacity="0.4" />
              </g>
            );
          })}
        </g>

        {/* ── LAYER 2: Outer scallop ring (slow CCW) ── */}
        <g style={{ transformOrigin: "300px 300px", animation: "mandala-spin-ccw 60s linear infinite" }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * 360;
            const r = 248;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                <circle cx="300" cy={300 - r} r="9" fill="none" stroke="url(#goldStroke)" strokeWidth="1" opacity="0.7" />
                <circle cx="300" cy={300 - r} r="4" fill="url(#goldCenter)" opacity="0.8" />
                {/* connector spoke */}
                <line x1="300" y1={300 - 222} x2="300" y2={300 - r + 10} stroke="url(#goldStroke)" strokeWidth="0.7" opacity="0.35" />
              </g>
            );
          })}
          {/* Outer thin ring */}
          <circle cx="300" cy="300" r="255" stroke="url(#goldStroke)" strokeWidth="0.8" opacity="0.45" />
          <circle cx="300" cy="300" r="237" stroke="url(#goldStroke)" strokeWidth="0.4" opacity="0.3" />
        </g>

        {/* ── LAYER 3: Geometric 16-petal flower (medium CW) ── */}
        <g style={{ transformOrigin: "300px 300px", animation: "mandala-spin-cw 40s linear infinite" }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * 360;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                {/* Elongated diamond petal */}
                <path
                  d="M300 118 L308 160 L300 202 L292 160 Z"
                  fill="url(#goldCenter)"
                  opacity="0.35"
                />
                <path
                  d="M300 118 L308 160 L300 202 L292 160 Z"
                  stroke="url(#goldStroke)"
                  strokeWidth="0.6"
                  fill="none"
                  opacity="0.6"
                />
              </g>
            );
          })}
          {/* Ring border */}
          <circle cx="300" cy="300" r="222" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.5" />
          <circle cx="300" cy="300" r="118" stroke="url(#goldStroke)" strokeWidth="0.8" opacity="0.4" />
        </g>

        {/* ── LAYER 4: 8-pointed arabian star (medium CCW) ── */}
        <g style={{ transformOrigin: "300px 300px", animation: "mandala-spin-ccw 30s linear infinite" }}>
          {/* 8-fold star polygon */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * 360;
            const a2 = ((i + 0.5) / 8) * 360;
            const rad1 = (a * Math.PI) / 180;
            const rad2 = (a2 * Math.PI) / 180;
            const outerR = 200;
            const innerR = 115;
            const x1 = 300 + outerR * Math.sin(rad1);
            const y1 = 300 - outerR * Math.cos(rad1);
            const x2 = 300 + innerR * Math.sin(rad2);
            const y2 = 300 - innerR * Math.cos(rad2);
            const x3 = 300 + outerR * Math.sin((((i + 1) / 8) * 360 * Math.PI) / 180);
            const y3 = 300 - outerR * Math.cos((((i + 1) / 8) * 360 * Math.PI) / 180);
            return (
              <path
                key={i}
                d={`M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}`}
                stroke="url(#goldStroke)"
                strokeWidth="1"
                fill="url(#goldCenter)"
                fillOpacity="0.15"
                opacity="0.65"
              />
            );
          })}
          {/* Dot at each star tip */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = ((i / 8) * 360 * Math.PI) / 180;
            const r = 200;
            return (
              <circle
                key={i}
                cx={300 + r * Math.sin(a)}
                cy={300 - r * Math.cos(a)}
                r="4.5"
                fill="url(#goldCenter)"
                opacity="0.9"
                filter="url(#glow)"
              />
            );
          })}
          <circle cx="300" cy="300" r="200" stroke="url(#goldStroke)" strokeWidth="0.6" opacity="0.3" />
        </g>

        {/* ── LAYER 5: Dense 24-petal inner lotus (faster CW) ── */}
        <g style={{ transformOrigin: "300px 300px", animation: "mandala-spin-cw 20s linear infinite" }}>
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 360;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                <path
                  d="M300 170 Q308 185 300 210 Q292 185 300 170 Z"
                  fill="url(#goldCenter)"
                  opacity="0.5"
                />
              </g>
            );
          })}
          <circle cx="300" cy="300" r="170" stroke="url(#goldStroke)" strokeWidth="1" opacity="0.4" />
          <circle cx="300" cy="300" r="155" stroke="url(#goldStroke)" strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* ── LAYER 6: Inner 12-fold geometric ring (medium CCW) ── */}
        <g style={{ transformOrigin: "300px 300px", animation: "mandala-spin-ccw 16s linear infinite" }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 360;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                {/* Rhombus */}
                <path
                  d="M300 148 L306 155 L300 162 L294 155 Z"
                  fill="url(#goldCenter)"
                  opacity="0.7"
                />
                {/* Spine line */}
                <line x1="300" y1="130" x2="300" y2="148" stroke="url(#goldStroke)" strokeWidth="0.8" opacity="0.5" />
              </g>
            );
          })}
          <circle cx="300" cy="300" r="130" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.5" />
        </g>

        {/* ── LAYER 7: Central 8-pointed Mughal star (faster CCW) ── */}
        <g style={{ transformOrigin: "300px 300px", animation: "mandala-spin-ccw 12s linear infinite" }}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 360;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                <path d="M300 210 L307 250 L300 290 L293 250 Z" fill="url(#goldCenter)" opacity="0.6" />
              </g>
            );
          })}
          {/* Octagon outline */}
          <polygon
            points={Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2 - Math.PI / 8;
              return `${300 + 110 * Math.cos(a)},${300 + 110 * Math.sin(a)}`;
            }).join(" ")}
            fill="none"
            stroke="url(#goldStroke)"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <circle cx="300" cy="300" r="110" stroke="url(#goldStroke)" strokeWidth="0.5" opacity="0.25" />
        </g>

        {/* ── LAYER 8: Inner decorative ring (slow CW) ── */}
        <g style={{ transformOrigin: "300px 300px", animation: "mandala-spin-cw 50s linear infinite" }}>
          {Array.from({ length: 32 }).map((_, i) => {
            const angle = (i / 32) * 360;
            return (
              <g key={i} transform={`rotate(${angle} 300 300)`}>
                <rect x="299" y="228" width="2" height="8" fill="url(#goldCenter)" opacity={i % 2 === 0 ? 0.8 : 0.4} rx="1" />
              </g>
            );
          })}
          <circle cx="300" cy="300" r="90" stroke="url(#goldStroke)" strokeWidth="1.4" opacity="0.65" />
          <circle cx="300" cy="300" r="78" stroke="url(#goldStroke)" strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* ── CORE: Static centre medallion ── */}
        {/* Background disc */}
        <circle cx="300" cy="300" r="74" fill="url(#ivoryFill)" opacity="0.85" />
        <circle cx="300" cy="300" r="74" stroke="url(#goldStroke)" strokeWidth="1.5" opacity="0.7" />

        {/* 8-pointed star fill */}
        <g style={{ transformOrigin: "300px 300px", animation: "mandala-spin-cw 25s linear infinite" }}>
          <polygon
            points={Array.from({ length: 16 }).map((_, i) => {
              const a = (i / 16) * Math.PI * 2;
              const r = i % 2 === 0 ? 58 : 28;
              return `${300 + r * Math.cos(a)},${300 + r * Math.sin(a)}`;
            }).join(" ")}
            fill="url(#goldCenter)"
            opacity="0.55"
            stroke="url(#goldStroke)"
            strokeWidth="0.8"
          />
        </g>

        {/* Innermost glow dot */}
        <circle cx="300" cy="300" r="20" fill="url(#goldCenter)" opacity="0.9" filter="url(#outerGlow)" />
        <circle cx="300" cy="300" r="10" fill="#f5e0a0" opacity="1" filter="url(#glow)" />
        <circle cx="300" cy="300" r="4" fill="#fff8e8" opacity="1" />

        {/* Calligraphic dot ring (static) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const r = 44;
          return (
            <circle
              key={i}
              cx={300 + r * Math.cos(a)}
              cy={300 + r * Math.sin(a)}
              r="2.5"
              fill="url(#goldCenter)"
              opacity="0.8"
            />
          );
        })}
      </svg>
    </div>
  );
}
