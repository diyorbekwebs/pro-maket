import { useState, useRef, useEffect } from "react";
import GoldButton from "./ui/GoldButton";
import { scrollToSection } from "../utils/scrollToSection";
import { useTranslation } from "react-i18next";
import { Logo } from "../assets/img/img";

const LANGS = [
  { code: "uz", label: "UZ", full: "O'zbek" },
  { code: "ru", label: "RU", full: "Русский" },
  { code: "en", label: "EN", full: "English" },
];

function LangDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGS.find((l) => l.code === i18n.language) || LANGS[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: open ? "#ffffff08" : "none",
          border: "1px solid #ffffff18",
          borderRadius: "2px",
          color: "#D4AF6A",
          fontSize: "11px",
          letterSpacing: "0.14em",
          fontFamily: "monospace",
          padding: "7px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          transition: "background 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!open) e.currentTarget.style.borderColor = "#D4AF6A40";
        }}
        onMouseLeave={(e) => {
          if (!open) e.currentTarget.style.borderColor = "#ffffff18";
        }}
      >
        {current.label}
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
            opacity: 0.5,
          }}
        >
          <path
            d="M1 2.5L4 5.5L7 2.5"
            stroke="#D4AF6A"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          background: "#0f0f0f",
          border: "1px solid #ffffff12",
          borderRadius: "3px",
          overflow: "hidden",
          minWidth: "130px",
          zIndex: 1000,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        }}
      >
        {LANGS.map((l, idx) => {
          const isActive = l.code === i18n.language;
          return (
            <button
              key={l.code}
              onClick={() => {
                i18n.changeLanguage(l.code);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                background: isActive ? "#ffffff08" : "none",
                border: "none",
                borderBottom:
                  idx < LANGS.length - 1 ? "1px solid #ffffff08" : "none",
                color: isActive ? "#D4AF6A" : "#ffffff55",
                fontSize: "12px",
                letterSpacing: "0.08em",
                fontFamily: "inherit",
                padding: "10px 14px",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s, color 0.15s",
                gap: "12px",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#ffffff05";
                  e.currentTarget.style.color = "#ffffff90";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#ffffff55";
                }
              }}
            >
              <span>{l.full}</span>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  fontFamily: "monospace",
                  color: isActive ? "#D4AF6A" : "#ffffff25",
                }}
              >
                {l.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NavLink({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        color: hov ? "#D4AF6A" : "#ffffff55",
        fontSize: "13px",
        letterSpacing: "0.08em",
        cursor: "pointer",
        transition: "color 0.2s",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}

function MobileMenu({ open, onClose }) {
  const { t, i18n } = useTranslation();

  const NAV_ITEMS = [
    { label: t("nav.works"), id: "ishlar" },
    { label: t("nav.services"), id: "xizmatlar" },
    { label: t("nav.process"), id: "jarayon" },
    { label: t("nav.contact"), id: "aloqa" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#0A0A0Af8",
        backdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "opacity 0.3s ease",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          background: "none",
          border: "1px solid #ffffff15",
          color: "#ffffff60",
          width: "40px",
          height: "40px",
          borderRadius: "2px",
          cursor: "pointer",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✕
      </button>

      {/* Mobil til switcher */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => i18n.changeLanguage(l.code)}
            style={{
              background: i18n.language === l.code ? "#D4AF6A" : "none",
              border: "1px solid #D4AF6A40",
              color: i18n.language === l.code ? "#0A0A0A" : "#D4AF6A",
              padding: "6px 14px",
              borderRadius: "2px",
              fontSize: "11px",
              letterSpacing: "0.12em",
              fontFamily: "monospace",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            scrollToSection(item.id);
            onClose();
          }}
          style={{
            background: "none",
            border: "none",
            color: "#F5F5F0",
            cursor: "pointer",
            fontFamily: "'Playfair Display', serif",
            fontSize: "32px",
            fontWeight: 400,
            padding: "12px 24px",
            letterSpacing: "0.04em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF6A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#F5F5F0")}
        >
          {item.label}
        </button>
      ))}

      <button
        onClick={() => {
          scrollToSection("aloqa");
          onClose();
        }}
        style={{
          marginTop: "20px",
          background: "#D4AF6A",
          color: "#0A0A0A",
          border: "none",
          padding: "14px 40px",
          fontSize: "11px",
          letterSpacing: "0.14em",
          cursor: "pointer",
          borderRadius: "2px",
          fontWeight: 500,
          fontFamily: "inherit",
        }}
      >
        {t("nav.order")}
      </button>
    </div>
  );
}

export default function Navbar({ scrollY }) {
  const { t } = useTranslation();
  const scrolled = scrollY > 60;
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { label: t("nav.works"), id: "ishlar" },
    { label: t("nav.services"), id: "xizmatlar" },
    { label: t("nav.process"), id: "jarayon" },
    { label: t("nav.contact"), id: "aloqa" },
  ];

  return (
    <>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(20px,5vw,56px)",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "#0A0A0Af0" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid #ffffff0a"
            : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {/* <div style={{
            width: "30px", height: "30px", border: "1px solid #D4AF6A",
            borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <div style={{
              width: "14px", height: "14px", background: "#D4AF6A",
              borderRadius: "1px", transform: "rotate(45deg) scale(0.7)",
            }} />
          </div> */}
          <img
            style={{
              width: "60px",
              height: "60px",
              border: "1px solid #D4AF6A",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            src={Logo}
          />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "19px",
              letterSpacing: "0.06em",
              color: "#F5F5F0",
            }}
          >
            PRO_<span style={{ color: "#D4AF6A" }}>MAKET</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: "40px", alignItems: "center" }}
        >
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} onClick={() => scrollToSection(item.id)}>
              {item.label}
            </NavLink>
          ))}
          <LangDropdown />
          <GoldButton
            variant="outline"
            onClick={() => scrollToSection("aloqa")}
            style={{ padding: "9px 22px", fontSize: "11px" }}
          >
            {t("nav.order")}
          </GoldButton>
        </div>

        {/* Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(true)}
          style={{
            background: "none",
            border: "1px solid #ffffff15",
            color: "#ffffff60",
            width: "40px",
            height: "40px",
            borderRadius: "2px",
            cursor: "pointer",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "18px",
              height: "1px",
              background: "#D4AF6A",
            }}
          />
          <span
            style={{
              display: "block",
              width: "18px",
              height: "1px",
              background: "#D4AF6A",
            }}
          />
          <span
            style={{
              display: "block",
              width: "12px",
              height: "1px",
              background: "#D4AF6A",
            }}
          />
        </button>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
