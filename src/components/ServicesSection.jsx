import { useState } from "react";
import { useInView } from "../hooks";
import { services } from "../data";
import Eyebrow from "./ui/Eyebrow";
import { useTranslation } from "react-i18next";

function ServiceCard({ service, index }) {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "clamp(24px,4vw,40px) clamp(20px,3.5vw,36px)",
        position: "relative",
        background: hov ? "#111111" : "transparent",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, background 0.3s`,
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(to right, #D4AF6A, transparent)",
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <span style={{ fontSize: "28px", color: "#D4AF6A", lineHeight: 1 }}>{service.icon}</span>
        <span
          style={{
            background: "#D4AF6A15",
            border: "1px solid #D4AF6A25",
            color: "#D4AF6A90",
            fontSize: "9px",
            letterSpacing: "0.15em",
            padding: "4px 10px",
            borderRadius: "20px",
            fontFamily: "monospace",
          }}
        >
          {service.tag[lang]}
        </span>
      </div>
      <h3 style={{ color: "#F5F5F0", fontSize: "17px", fontWeight: 400, marginBottom: "14px" }}>
        {service.title[lang]}
      </h3>
      <p style={{ color: "#ffffff45", fontSize: "14px", lineHeight: 1.75, margin: 0 }}>{service.desc[lang]}</p>
    </div>
  );
}

export default function ServicesSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];

  return (
    <section id="xizmatlar" style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,56px)", background: "#0d0d0d" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "clamp(40px,6vw,72px)" }}>
          <Eyebrow number="02" label={{ uz: "XIZMATLAR", ru: "УСЛУГИ", en: "SERVICES" }[lang]} />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px,4vw,42px)",
              fontWeight: 400,
              margin: 0,
              color: "#F5F5F0",
            }}
          >
            {{ uz: "Nima qilamiz", ru: "Что мы делаем", en: "What we do" }[lang]}
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "#ffffff07",
          }}
        >
          {services.map((s, i) => (
            <div key={i} style={{ background: "#0d0d0d" }}>
              <ServiceCard service={s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}