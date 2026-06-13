import { useInView } from "../hooks";
import { materials } from "../data";
import Eyebrow from "./ui/Eyebrow";
import { useTranslation } from "react-i18next";

function MaterialChip({ m, index, inView }) {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px",
      border: "1px solid #ffffff0a", borderRadius: "2px",
      opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)",
      transition: `all 0.5s ease ${index * 0.08}s`,
    }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: m.color, opacity: 0.7, flexShrink: 0 }} />
      <div>
        <div style={{ color: "#F5F5F0", fontSize: "14px", marginBottom: "2px" }}>{m.name[lang]}</div>
        <div style={{ color: "#ffffff35", fontSize: "12px" }}>{m.desc[lang]}</div>
      </div>
    </div>
  );
}

export default function MaterialsSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];
  const [ref, inView] = useInView();

  return (
    <section style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,56px)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
        <div>
          <Eyebrow number="03" label={{ uz: "MATERIALLAR", ru: "МАТЕРИАЛЫ", en: "MATERIALS" }[lang]} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, margin: "0 0 24px", color: "#F5F5F0", lineHeight: 1.2 }}>
            {{ uz: "Faqat sifatli", ru: "Только качественные", en: "Only quality" }[lang]}
            <br />
            <em style={{ color: "#D4AF6A" }}>
              {{ uz: "materiallar", ru: "материалы", en: "materials" }[lang]}
            </em>
          </h2>
          <p style={{ color: "#ffffff40", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>
            {{ uz: "Har bir maket uchun eng yaxshi materiallarni tanlaymiz. Lipa yog'ochidan tortib premium akrilikgacha — sifat birinchi o'rinda.", ru: "Для каждого макета подбираем лучшие материалы. От липовой древесины до премиального акрила — качество на первом месте.", en: "We select the best materials for every model. From linden wood to premium acrylic — quality comes first." }[lang]}
          </p>
        </div>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
          {materials.map((m, i) => <MaterialChip key={i} m={m} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}