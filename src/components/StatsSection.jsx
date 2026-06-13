import { useInView, useCountUp } from "../hooks";
import { useTranslation } from "react-i18next";

function StatItem({ stat, index, inView }) {
  const count = useCountUp(stat.value, inView);

  return (
    <div
      style={{
        background: "#0A0A0A",
        padding: "clamp(32px,5vw,52px) clamp(16px,3vw,32px)",
        textAlign: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px,5vw,52px)",
          color: "#D4AF6A",
          fontWeight: 400,
          lineHeight: 1,
          marginBottom: "14px",
        }}
      >
        {inView ? count : "0"}
      </div>
      <div style={{ color: "#ffffff35", fontSize: "11px", letterSpacing: "0.2em", fontFamily: "monospace" }}>
        {stat.label.toUpperCase()}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [ref, inView] = useInView(0.2);
  const { t } = useTranslation();

  const stats = [
    { value: "120+", label: t("stats.projects") },
    { value: "8",    label: t("stats.experience") },
    { value: "98%",  label: t("stats.satisfaction") },
    { value: "15+",  label: t("stats.cities") },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: "0 clamp(20px,5vw,56px)",
        borderTop: "1px solid #ffffff07",
        borderBottom: "1px solid #ffffff07",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1px",
          background: "#ffffff07",
        }}
      >
        {stats.map((s, i) => (
          <StatItem key={i} stat={s} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}