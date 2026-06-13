import { useInView } from "../hooks";
import Eyebrow from "./ui/Eyebrow";
import Fade from "./ui/Fade";
import { useTranslation } from "react-i18next";

export default function CTASection() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];
  const [ref, inView] = useInView();

  const TELEGRAM = "https://t.me/pro_maket1";
  const INSTAGRAM = "https://instagram.com/pro_maket.1";

  return (
    <section
      id="aloqa"
      style={{
        padding: "clamp(80px,12vw,130px) clamp(20px,5vw,56px)",
        background: "#0d0d0d",
        textAlign: "center",
      }}
    >
      <div ref={ref} style={{ maxWidth: "700px", margin: "0 auto" }}>
        <Fade inView={inView} delay={0}>
          <Eyebrow
            number="06"
            label={
              {
                uz: "ALOQA",
                ru: "КОНТАКТ",
                en: "CONTACT",
              }[lang]
            }
          />
        </Fade>

        <Fade inView={inView} delay={0.12}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px,5vw,52px)",
              fontWeight: 400,
              margin: "0 0 24px",
              color: "#F5F5F0",
              lineHeight: 1.15,
            }}
          >
            {
              {
                uz: "Loyihangizni",
                ru: "Начнём",
                en: "Let's start",
              }[lang]
            }
            <br />
            <em style={{ color: "#D4AF6A" }}>
              {
                {
                  uz: "boshlaylik",
                  ru: "ваш проект",
                  en: "your project",
                }[lang]
              }
            </em>
          </h2>
        </Fade>

        <Fade inView={inView} delay={0.2}>
          <p
            style={{
              color: "#ffffff70",
              fontSize: "15px",
              lineHeight: 1.85,
              marginBottom: "48px",
            }}
          >
            {
              {
                uz: "Biz bilan bog'laning — bepul konsultatsiya oling.",
                ru: "Свяжитесь с нами — получите бесплатную консультацию.",
                en: "Contact us and get a free consultation.",
              }[lang]
            }
          </p>
        </Fade>

        <Fade inView={inView} delay={0.28}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                background: "#229ED9",
                color: "#fff",
                padding: "17px",
                fontSize: "11px",
                letterSpacing: "0.14em",
                fontWeight: 500,
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              TELEGRAM'DA YOZISH
            </a>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                background:
                  "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                color: "#fff",
                padding: "17px",
                fontSize: "11px",
                letterSpacing: "0.14em",
                fontWeight: 500,
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              INSTAGRAM'DA YOZISH
            </a>

            <a
              href="tel:+998770086758"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "17px",
                color: "#F5F5F0",
                border: "1px solid #ffffff20",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              ☎ +998 77 008 67 58
            </a>

            <a
              href="tel:+998889788688"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "17px",
                color: "#F5F5F0",
                border: "1px solid #ffffff20",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              ☎ +998 88 978 86 88
            </a>
          </div>
        </Fade>

        <Fade inView={inView} delay={0.36}>
          <div
            style={{
              color: "#ffffff50",
              fontSize: "13px",
            }}
          >
            📍{" "}
            {
              {
                uz: "Toshkent, O'zbekiston",
                ru: "Ташкент, Узбекистан",
                en: "Tashkent, Uzbekistan",
              }[lang]
            }
          </div>
        </Fade>
      </div>
    </section>
  );
}
