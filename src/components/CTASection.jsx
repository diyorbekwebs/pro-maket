import { useState } from "react";
import { useInView } from "../hooks";
import Eyebrow from "./ui/Eyebrow";
import Fade from "./ui/Fade";
import { useTranslation } from "react-i18next";

export default function CTASection() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];
  const [ref, inView] = useInView();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (name && phone) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setName("");
      setPhone("");
    }
  };

  return (
    <section id="aloqa" style={{ padding: "clamp(80px,12vw,130px) clamp(20px,5vw,56px)", background: "#0d0d0d", textAlign: "center" }}>
      <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Fade inView={inView} delay={0}>
          <Eyebrow number="06" label={{ uz: "ALOQA", ru: "КОНТАКТ", en: "CONTACT" }[lang]} />
        </Fade>
        <Fade inView={inView} delay={0.12}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 400, margin: "0 0 24px", color: "#F5F5F0", lineHeight: 1.15 }}>
            {{ uz: "Loyihangizni", ru: "Начнём", en: "Let's start" }[lang]}
            <br />
            <em style={{ color: "#D4AF6A" }}>
              {{ uz: "boshlaylik", ru: "ваш проект", en: "your project" }[lang]}
            </em>
          </h2>
        </Fade>
        <Fade inView={inView} delay={0.2}>
          <p style={{ color: "#ffffff40", fontSize: "15px", lineHeight: 1.85, marginBottom: "52px" }}>
            {{ uz: "Loyihangiz haqida ma'lumot qoldiring — biz bilan bog'laning va bepul konsultatsiya oling.", ru: "Оставьте информацию о проекте — свяжитесь с нами и получите бесплатную консультацию.", en: "Leave your project details — contact us and get a free consultation." }[lang]}
          </p>
        </Fade>
        <Fade inView={inView} delay={0.28}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "12px" }}>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder={{ uz: "Ismingiz", ru: "Ваше имя", en: "Your name" }[lang]}
              style={{ background: "#151515", border: "1px solid #ffffff12", color: "#F5F5F0", padding: "15px 20px", fontSize: "14px", borderRadius: "2px", outline: "none", fontFamily: "inherit" }}
            />
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              type="tel"
              placeholder="+998 __ ___ __ __"
              style={{ background: "#151515", border: "1px solid #ffffff12", color: "#F5F5F0", padding: "15px 20px", fontSize: "14px", borderRadius: "2px", outline: "none", fontFamily: "inherit" }}
            />
          </div>
          <button
            onClick={handleSubmit}
            style={{
              width: "100%", background: sent ? "#3a8a3a" : "#D4AF6A", color: "#0A0A0A",
              border: "none", padding: "17px", fontSize: "11px", letterSpacing: "0.14em",
              cursor: "pointer", borderRadius: "2px", fontWeight: 500, transition: "all 0.3s", fontFamily: "inherit",
            }}
          >
            {sent
              ? { uz: "✓ YUBORILDI", ru: "✓ ОТПРАВЛЕНО", en: "✓ SENT" }[lang]
              : { uz: "MUROJAAT YUBORISH", ru: "ОТПРАВИТЬ ЗАЯВКУ", en: "SEND REQUEST" }[lang]
            }
          </button>
        </Fade>
        <Fade inView={inView} delay={0.36}>
          <div style={{ marginTop: "52px", display: "flex", gap: "clamp(16px,3vw,36px)", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              ["☎", "+998 90 123 45 67", "tel:+998901234567"],
              ["✉", "info@promaket.uz", "mailto:info@promaket.uz"],
              ["📍", { uz: "Toshkent, O'zbekiston", ru: "Ташкент, Узбекистан", en: "Tashkent, Uzbekistan" }[lang], null],
            ].map(([icon, text, href], i) => (
              href
                ? <a key={i} href={href} style={{ color: "#ffffff35", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#D4AF6A90"}
                    onMouseLeave={e => e.currentTarget.style.color = "#ffffff35"}>
                    <span style={{ fontSize: "15px" }}>{icon}</span>{text}
                  </a>
                : <div key={i} style={{ color: "#ffffff35", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "15px" }}>{icon}</span>{text}
                  </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}