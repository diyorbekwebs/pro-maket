import { useState } from "react";

export default function GoldButton({ children, variant = "primary", onClick, style = {} }) {
  const [hov, setHov] = useState(false);

  const base =
    variant === "primary"
      ? { background: hov ? "#E8C97A" : "#D4AF6A", color: "#0A0A0A", border: "none" }
      : {
          background: "transparent",
          color: hov ? "#F5F5F0" : "#ffffff90",
          border: `1px solid ${hov ? "#ffffff40" : "#ffffff20"}`,
        };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...base,
        padding: "14px 36px",
        fontSize: "11px",
        letterSpacing: "0.14em",
        cursor: "pointer",
        borderRadius: "2px",
        fontWeight: 500,
        transition: "all 0.25s ease",
        fontFamily: "inherit",
        ...style,
      }}
    >
      {children}
    </button>
  );
}