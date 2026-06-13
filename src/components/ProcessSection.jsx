import { useInView } from "../hooks";
import Eyebrow from "./ui/Eyebrow";
import { useTranslation } from "react-i18next";

const steps = [
  {
    num: "01",
    title: { uz: "Murojaat", ru: "Заявка", en: "Request" },
    desc: { uz: "Loyiha haqida ma'lumot va talablarni aniqlaymiz", ru: "Уточняем информацию и требования к проекту", en: "We clarify project details and requirements" },
  },
  {
    num: "02",
    title: { uz: "Hisob-kitob", ru: "Расчёт", en: "Calculation" },
    desc: { uz: "Narx va muddatni kelishib olamiz", ru: "Согласовываем цену и сроки", en: "We agree on price and timeline" },
  },
  {
    num: "03",
    title: { uz: "Ishlab chiqarish", ru: "Производство", en: "Production" },
    desc: { uz: "Maketni professional uskunalar bilan yasaymiz", ru: "Изготавливаем макет профессиональным оборудованием", en: "We craft the model with professional equipment" },
  },
  {
    num: "04",
    title: { uz: "Topshirish", ru: "Сдача", en: "Delivery" },
    desc: { uz: "Tayyor maketni qadoqlab topshiramiz", ru: "Упаковываем и передаём готовый макет", en: "We package and deliver the finished model" },
  },
];

function ProcessStep({ step, index, lang }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      padding: "0 20px", textAlign: "center",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
    }}>
      <div style={{
        width: "60px", height: "60px", borderRadius: "50%",
        border: "1px solid #D4AF6A40", background: "#0A0A0A",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 28px", position: "relative", zIndex: 1,
      }}>
        <span style={{ color: "#D4AF6A", fontSize: "11px", fontFamily: "monospace" }}>{step.num}</span>
      </div>
      <h3 style={{ color: "#F5F5F0", fontSize: "16px", fontWeight: 400, marginBottom: "12px" }}>{step.title[lang]}</h3>
      <p style={{ color: "#ffffff40", fontSize: "13px", lineHeight: 1.75, margin: 0 }}>{step.desc[lang]}</p>
    </div>
  );
}

export default function ProcessSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];

  return (
    <section id="jarayon" style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,56px)", background: "#0d0d0d" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "clamp(40px,6vw,72px)" }}>
          <Eyebrow number="04" label={{ uz: "JARAYON", ru: "ПРОЦЕСС", en: "PROCESS" }[lang]} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, margin: 0, color: "#F5F5F0" }}>
            {{ uz: "Qanday ishlaymiz", ru: "Как мы работаем", en: "How we work" }[lang]}
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0", position: "relative" }}>
          <div style={{ position: "absolute", top: "30px", left: "calc(12.5%)", right: "calc(12.5%)", height: "1px", background: "linear-gradient(to right, transparent, #D4AF6A30, transparent)" }} />
          {steps.map((s, i) => <ProcessStep key={i} step={s} index={i} lang={lang} />)}
        </div>
      </div>
    </section>
  );
}