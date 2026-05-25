import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  borderClass?: string;
}

// Cusped Mughal arch frame using SVG mask via inline style
export function ArchFrame({ children, className = "", borderClass = "border-gold/60" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute inset-0 border ${borderClass} pointer-events-none z-10`}
        style={{
          borderTopLeftRadius: "50% 22%",
          borderTopRightRadius: "50% 22%",
        }}
      />
      <div
        className="relative overflow-hidden h-full w-full"
        style={{
          borderTopLeftRadius: "50% 22%",
          borderTopRightRadius: "50% 22%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
