import { useInView } from "../hooks";
import GoldButton from "./ui/GoldButton";
import Fade from "./ui/Fade";
import { scrollToSection } from "../utils/scrollToSection";
import { useTranslation } from "react-i18next";

export default function Hero({ scrollY }) {
  const [ref, inView] = useInView(0.05);
  const { t } = useTranslation();
  const y = scrollY * 0.3;

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 clamp(20px,5vw,56px)",
      }}
    >
      {/* Background layers */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(ellipse at 25% 55%, #D4AF6A0a 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, #D4AF6A06 0%, transparent 50%)",
        transform: `translateY(${y * 0.2}px)`,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 79px, #ffffff03 79px, #ffffff03 80px),
          repeating-linear-gradient(90deg, transparent, transparent 79px, #ffffff03 79px, #ffffff03 80px)`,
      }} />
      <div style={{
        position: "absolute", top: "20%", left: "8%",
        width: "200px", height: "200px",
        border: "1px solid #D4AF6A10", borderRadius: "50%",
        transform: `translateY(${-y * 0.1}px)`,
      }} />
      <div style={{
        position: "absolute", bottom: "25%", right: "6%",
        width: "120px", height: "120px",
        border: "1px solid #D4AF6A08",
        transform: `translateY(${y * 0.15}px) rotate(45deg)`,
      }} />

      {/* Content */}
      <div ref={ref} style={{ maxWidth: "860px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Fade inView={inView} delay={0.1}>
          <p style={{ color: "#D4AF6A", fontSize: "10px", letterSpacing: "0.35em", marginBottom: "36px", fontFamily: "monospace" }}>
            {t("hero.eyebrow")}
          </p>
        </Fade>
        <Fade inView={inView} delay={0.2}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(44px, 8.5vw, 92px)",
            fontWeight: 400, lineHeight: 1.04,
            color: "#F5F5F0", margin: "0 0 6px",
          }}>
            {t("hero.title_line1")}
          </h1>
        </Fade>
        <Fade inView={inView} delay={0.3}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(44px, 8.5vw, 92px)",
            fontWeight: 400, lineHeight: 1.04,
            color: "#D4AF6A", fontStyle: "italic", margin: "0 0 36px",
          }}>
            {t("hero.title_line2")}
          </h1>
        </Fade>
        <Fade inView={inView} delay={0.4}>
          <p style={{
            color: "#ffffff45",
            fontSize: "clamp(14px, 2vw, 17px)",
            maxWidth: "500px", margin: "0 auto 52px",
            lineHeight: 1.85, fontWeight: 300,
          }}>
            {t("hero.subtitle")}
          </p>
        </Fade>
        <Fade inView={inView} delay={0.5}>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <GoldButton onClick={() => scrollToSection("ishlar")}>{t("hero.cta_works")}</GoldButton>
            <GoldButton variant="outline" onClick={() => scrollToSection("aloqa")}>{t("hero.cta_contact")}</GoldButton>
          </div>
        </Fade>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute", bottom: "44px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "8px", cursor: "pointer",
        }}
        onClick={() => scrollToSection("ishlar")}
      >
        <div style={{ width: "1px", height: "64px", background: "linear-gradient(to bottom, #D4AF6A60, transparent)" }} />
        <p style={{ color: "#ffffff25", fontSize: "9px", letterSpacing: "0.25em", fontFamily: "monospace" }}>SCROLL</p>
      </div>
    </section>
  );
}