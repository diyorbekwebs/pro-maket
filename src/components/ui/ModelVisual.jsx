import { useState, useEffect } from "react";

export default function ModelVisual({ color, accent, scale, animated }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % 360), 50);
    return () => clearInterval(id);
  }, [animated]);

  const pulse = animated ? 0.08 + 0.04 * Math.sin((phase * Math.PI) / 180) : 0.08;
  const uid = scale.replace(":", "");

  return (
    <div style={{ width: "100%", height: "100%", background: color, position: "relative", overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`g${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke={accent} strokeWidth="0.25" opacity="0.25" />
          </pattern>
          <radialGradient id={`rg${uid}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="220" fill={`url(#g${uid})`} />
        <ellipse cx="160" cy="110" rx="100" ry="70" fill={`url(#rg${uid})`} opacity={animated ? pulse * 2 : 0.3} />
        <g transform="translate(160,110)">
          <polygon points="-55,-35 55,-35 75,5 -75,5" fill={accent} opacity={pulse} stroke={accent} strokeWidth="0.5" />
          <polygon points="-55,-35 55,-35 55,-75 -55,-75" fill={accent} opacity={pulse * 0.7} stroke={accent} strokeWidth="0.5" />
          <polygon points="55,-35 75,5 75,-35 55,-75" fill={accent} opacity={pulse * 0.9} stroke={accent} strokeWidth="0.5" />
          <rect x="-18" y="-85" width="36" height="12" rx="0" fill={accent} opacity={pulse * 0.8} stroke={accent} strokeWidth="0.4" />
          <line x1="-18" y1="-85" x2="-18" y2="-73" stroke={accent} strokeWidth="0.3" opacity="0.5" />
          <line x1="18" y1="-85" x2="18" y2="-73" stroke={accent} strokeWidth="0.3" opacity="0.5" />
          {[-35, -15, 5, 25].map((x, i) => (
            <rect key={i} x={x} y="-60" width="12" height="16" fill={accent} opacity={pulse * 0.6} stroke={accent} strokeWidth="0.3" />
          ))}
          {[-35, -15, 5, 25].map((x, i) => (
            <rect key={i} x={x} y="-35" width="12" height="16" fill={accent} opacity={pulse * 0.5} stroke={accent} strokeWidth="0.3" />
          ))}
          <line x1="-75" y1="5" x2="-90" y2="20" stroke={accent} strokeWidth="0.4" opacity="0.35" />
          <line x1="75" y1="5" x2="90" y2="20" stroke={accent} strokeWidth="0.4" opacity="0.35" />
          <line x1="-90" y1="20" x2="90" y2="20" stroke={accent} strokeWidth="0.4" opacity="0.25" />
          <text y="50" textAnchor="middle" fill={accent} fontSize="8" opacity="0.5" fontFamily="monospace">
            {scale}
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to top, ${color}dd 0%, transparent 55%)`,
        }}
      />
    </div>
  );
}