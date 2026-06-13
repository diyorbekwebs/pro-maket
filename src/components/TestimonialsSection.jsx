import { useInView } from "../hooks";
import { testimonials } from "../data";
import Eyebrow from "./ui/Eyebrow";
import { useTranslation } from "react-i18next";

function TestimonialCard({ item, index, inView }) {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];
  return (
    <div style={{
      padding: "clamp(24px,3vw,36px) clamp(20px,3vw,32px)", border: "1px solid #ffffff0d", borderRadius: "3px",
      background: "#0d0d0d",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
    }}>
      <div style={{ color: "#D4AF6A", fontSize: "32px", lineHeight: 1, marginBottom: "20px", opacity: 0.6, fontFamily: "serif" }}>"</div>
      <p style={{ color: "#ffffff65", fontSize: "14px", lineHeight: 1.8, margin: "0 0 28px", fontStyle: "italic" }}>{item.text[lang]}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #D4AF6A40, #D4AF6A15)",
          border: "1px solid #D4AF6A30",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#D4AF6A", fontSize: "12px", fontFamily: "monospace", letterSpacing: "0.05em",
        }}>{item.avatar}</div>
        <div>
          <div style={{ color: "#F5F5F0", fontSize: "14px", fontWeight: 500 }}>{item.name}</div>
          <div style={{ color: "#ffffff35", fontSize: "12px", marginTop: "2px" }}>{item.role[lang]}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];
  const [ref, inView] = useInView();

  return (
    <section style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,56px)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "clamp(40px,6vw,72px)" }}>
          <Eyebrow number="05" label={{ uz: "MIJOZLAR", ru: "КЛИЕНТЫ", en: "CLIENTS" }[lang]} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, margin: 0, color: "#F5F5F0" }}>
            {{ uz: "Ular haqida", ru: "Что говорят", en: "What they say" }[lang]}{" "}
            <em style={{ color: "#D4AF6A" }}>
              {{ uz: "nima deyishadi", ru: "о нас", en: "about us" }[lang]}
            </em>
          </h2>
        </div>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {testimonials.map((item, i) => <TestimonialCard key={i} item={item} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}