import { useTranslation } from "react-i18next";

const socials = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "Telegram", href: "https://t.me" },
  { name: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  const { i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];

  return (
    <footer
      style={{
        padding: "clamp(24px,3vw,36px) clamp(20px,5vw,56px)",
        borderTop: "1px solid #ffffff07",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "17px",
            color: "#F5F5F0",
          }}
        >
          PRO<span style={{ color: "#D4AF6A" }}>MAKET</span>
        </span>
      </button>
      <p
        style={{
          color: "#ffffff20",
          fontSize: "11px",
          margin: 0,
          fontFamily: "monospace",
          order: 3,
        }}
      >
        {
          {
            uz: "© 2025 PRO Maket. Barcha huquqlar himoyalangan.",
            ru: "© 2025 PRO Maket. Все права защищены.",
            en: "© 2025 PRO Maket. All rights reserved.",
          }[lang]
        }
      </p>
      <div style={{ display: "flex", gap: "28px" }}>
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#ffffff25",
              fontSize: "12px",
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF6A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff25")}
          >
            {s.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
