export default function Eyebrow({ number, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
      <span style={{ color: "#D4AF6A", fontSize: "10px", letterSpacing: "0.3em", fontFamily: "monospace" }}>
        {number} ·
      </span>
      <span style={{ color: "#D4AF6A", fontSize: "10px", letterSpacing: "0.25em", fontFamily: "monospace" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #D4AF6A30, transparent)" }} />
    </div>
  );
}