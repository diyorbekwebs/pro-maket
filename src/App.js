import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  { id: 1, title: "Toshkent Biznes Markazi", category: "Tijorat", year: "2024", scale: "1:200", color: "#0d0e1a", accent: "#D4AF6A" },
  { id: 2, title: "Mirzo Ulugbek Turar-joy Majmuasi", category: "Ko'p qavatli", year: "2024", scale: "1:100", color: "#0d1520", accent: "#C9A84C" },
  { id: 3, title: "Premium Villa — Yunusobod", category: "Yashash uyi", year: "2023", scale: "1:50", color: "#1a0d10", accent: "#E8C97A" },
  { id: 4, title: "Samarqand Madaniyat Markazi", category: "Jamoat binosi", year: "2023", scale: "1:300", color: "#0d1a0e", accent: "#B8A060" },
  { id: 5, title: "City Mall Konsepsiyasi", category: "Savdo markazi", year: "2023", scale: "1:150", color: "#1a1a0d", accent: "#DDB870" },
  { id: 6, title: "Anhor Qirg'og'i Kompleksi", category: "Aralash foydalanish", year: "2022", scale: "1:250", color: "#0d0d1a", accent: "#C8A050" },
];

const services = [
  { icon: "⬡", title: "Arxitektura Maketi", desc: "Binolar, komplekslar va shaharsozlik loyihalarining aniq va batafsil maketlari. Har bir detal qo'l bilan ishlanadi.", tag: "Asosiy xizmat" },
  { icon: "⬢", title: "Konsepsiya Modeli", desc: "Loyiha boshlang'ich bosqichida vizual kommunikatsiya uchun soddalashtirilgan konsepsiya maketlari.", tag: "Tez bajariladi" },
  { icon: "◎", title: "Prezentatsion Maket", desc: "Investorlar va mijozlar uchun maxsus ishlangan premium sifatli namoyish maketlari.", tag: "Premium" },
  { icon: "⬜", title: "Interyer Modeli", desc: "Xona planirovkasi va interyer dizaynini ko'rsatuvchi kesim maketlari va detallar.", tag: "Ichki dizayn" },
];

const stats = [
  { value: "120+", label: "Bajarilgan loyiha" },
  { value: "8", label: "Yillik tajriba" },
  { value: "98%", label: "Mijoz mamnuniyati" },
  { value: "15+", label: "Shahar bo'ylab" },
];

const testimonials = [
  { name: "Jamshid Karimov", role: "Bosh arxitektor, Toshkent", text: "PRO MAKET maketlari bizning loyihalarimizni investorlarga taqdim etishda hal qiluvchi rol o'ynadi. Sifat va aniqlik — boshqa darajada.", avatar: "JK" },
  { name: "Malika Yusupova", role: "CEO, YuBuild Group", text: "Professional yondashuv, muddatga rioya qilish va natija — bu kompaniya bilan ishlash samara beradi.", avatar: "MY" },
  { name: "Rustam Nazarov", role: "Dizayner, Studio R", text: "Har bir loyihada individual yondashuv his qilinadi. Maketlar haqiqiy san'at asari darajasida.", avatar: "RN" },
];

const materials = [
  { name: "Lipa yog'ochi", desc: "Nozik detallar uchun", color: "#C4A882" },
  { name: "Akrilik shisha", desc: "Yorug'lik effektlari", color: "#A8C4D4" },
  { name: "Metal sim", desc: "Tarkibiy elementlar", color: "#B0B0B0" },
  { name: "Fotopolimer", desc: "3D detallar", color: "#D4B896" },
];

// ─── SMOOTH SCROLL HELPER ────────────────────────────────────────────────────

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15, once = true) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, once]);
  return [ref, inView];
}

function useCountUp(target, inView, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count || "0";
}

// ─── ATOMS ───────────────────────────────────────────────────────────────────

function Eyebrow({ number, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
      <span style={{ color: "#D4AF6A", fontSize: "10px", letterSpacing: "0.3em", fontFamily: "monospace" }}>
        {number} ·
      </span>
      <span style={{ color: "#D4AF6A", fontSize: "10px", letterSpacing: "0.25em", fontFamily: "monospace" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #D4AF6A30, transparent)" }} />
    </div>
  );
}

function GoldButton({ children, variant = "primary", onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  const base = variant === "primary"
    ? { background: hov ? "#E8C97A" : "#D4AF6A", color: "#0A0A0A", border: "none" }
    : { background: "transparent", color: hov ? "#F5F5F0" : "#ffffff90", border: `1px solid ${hov ? "#ffffff40" : "#ffffff20"}` };
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        ...base, padding: "14px 36px", fontSize: "11px", letterSpacing: "0.14em",
        cursor: "pointer", borderRadius: "2px", fontWeight: 500,
        transition: "all 0.25s ease", fontFamily: "inherit", ...style,
      }}>
      {children}
    </button>
  );
}

// ─── MODEL VISUAL ─────────────────────────────────────────────────────────────

function ModelVisual({ color, accent, scale, animated }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!animated) return;
    const id = setInterval(() => setPhase(p => (p + 1) % 360), 50);
    return () => clearInterval(id);
  }, [animated]);

  const pulse = animated ? 0.08 + 0.04 * Math.sin((phase * Math.PI) / 180) : 0.08;
  const uid = scale.replace(":", "");

  return (
    <div style={{ width: "100%", height: "100%", background: color, position: "relative", overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`g${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke={accent} strokeWidth="0.25" opacity="0.25" />
          </pattern>
          <radialGradient id={`rg${uid}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="220" fill={`url(#g${uid})`} />
        <ellipse cx="160" cy="110" rx="100" ry="70" fill={`url(#rg${uid})`} opacity={animated ? pulse * 2 : 0.3} />
        <g transform="translate(160,110)">
          <polygon points="-55,-35 55,-35 75,5 -75,5" fill={accent} opacity={pulse} stroke={accent} strokeWidth="0.5" />
          <polygon points="-55,-35 55,-35 55,-75 -55,-75" fill={accent} opacity={pulse * 0.7} stroke={accent} strokeWidth="0.5" />
          <polygon points="55,-35 75,5 75,-35 55,-75" fill={accent} opacity={pulse * 0.9} stroke={accent} strokeWidth="0.5" />
          <rect x="-18" y="-85" width="36" height="12" rx="0" fill={accent} opacity={pulse * 0.8} stroke={accent} strokeWidth="0.4" />
          <line x1="-18" y1="-85" x2="-18" y2="-73" stroke={accent} strokeWidth="0.3" opacity="0.5" />
          <line x1="18" y1="-85" x2="18" y2="-73" stroke={accent} strokeWidth="0.3" opacity="0.5" />
          {[-35, -15, 5, 25].map((x, i) => (
            <rect key={i} x={x} y="-60" width="12" height="16" fill={accent} opacity={pulse * 0.6} stroke={accent} strokeWidth="0.3" />
          ))}
          {[-35, -15, 5, 25].map((x, i) => (
            <rect key={i} x={x} y="-35" width="12" height="16" fill={accent} opacity={pulse * 0.5} stroke={accent} strokeWidth="0.3" />
          ))}
          <line x1="-75" y1="5" x2="-90" y2="20" stroke={accent} strokeWidth="0.4" opacity="0.35" />
          <line x1="75" y1="5" x2="90" y2="20" stroke={accent} strokeWidth="0.4" opacity="0.35" />
          <line x1="-90" y1="20" x2="90" y2="20" stroke={accent} strokeWidth="0.4" opacity="0.25" />
          <text y="50" textAnchor="middle" fill={accent} fontSize="8" opacity="0.5" fontFamily="monospace">{scale}</text>
        </g>
      </svg>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${color}dd 0%, transparent 55%)` }} />
    </div>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView(0.1);
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => scrollToSection("aloqa")}
      style={{
        background: "#0f0f0f", border: `1px solid ${hov ? project.accent + "50" : "#ffffff0d"}`,
        borderRadius: "3px", overflow: "hidden", cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, border-color 0.3s ease, box-shadow 0.3s ease`,
        boxShadow: hov ? `0 20px 60px ${project.accent}15` : "none",
      }}>
      <div style={{ height: "210px", position: "relative", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%", transform: hov ? "scale(1.04)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
          <ModelVisual {...project} animated={hov} />
        </div>
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          background: "#00000080", backdropFilter: "blur(8px)",
          border: `1px solid ${project.accent}25`, padding: "5px 12px", borderRadius: "2px",
          color: project.accent, fontSize: "10px", letterSpacing: "0.12em", fontFamily: "monospace",
        }}>{project.category}</div>
      </div>
      <div style={{ padding: "22px" }}>
        <p style={{ color: "#ffffff35", fontSize: "10px", letterSpacing: "0.2em", marginBottom: "8px", fontFamily: "monospace" }}>
          {project.year} &nbsp;·&nbsp; {project.scale}
        </p>
        <h3 style={{ color: "#F5F5F0", fontSize: "15px", fontWeight: 400, margin: "0 0 16px", lineHeight: 1.4 }}>
          {project.title}
        </h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{
            height: "1px", flex: 1,
            background: `linear-gradient(to right, ${project.accent}70, transparent)`,
            transform: hov ? "scaleX(1)" : "scaleX(0.25)",
            transformOrigin: "left", transition: "transform 0.4s ease",
          }} />
          <span style={{ color: project.accent, fontSize: "16px", marginLeft: "12px", opacity: hov ? 1 : 0, transition: "opacity 0.3s" }}>→</span>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "clamp(24px,4vw,40px) clamp(20px,3.5vw,36px)", position: "relative",
        background: hov ? "#111111" : "transparent",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, background 0.3s`,
        cursor: "default",
      }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(to right, #D4AF6A, transparent)",
        opacity: hov ? 1 : 0, transition: "opacity 0.3s",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <span style={{ fontSize: "28px", color: "#D4AF6A", lineHeight: 1 }}>{service.icon}</span>
        <span style={{
          background: "#D4AF6A15", border: "1px solid #D4AF6A25",
          color: "#D4AF6A90", fontSize: "9px", letterSpacing: "0.15em",
          padding: "4px 10px", borderRadius: "20px", fontFamily: "monospace",
        }}>{service.tag}</span>
      </div>
      <h3 style={{ color: "#F5F5F0", fontSize: "17px", fontWeight: 400, marginBottom: "14px" }}>
        {service.title}
      </h3>
      <p style={{ color: "#ffffff45", fontSize: "14px", lineHeight: 1.75, margin: 0 }}>
        {service.desc}
      </p>
    </div>
  );
}

// ─── STAT ITEM ────────────────────────────────────────────────────────────────

function StatItem({ stat, index, inView }) {
  const count = useCountUp(stat.value, inView);
  return (
    <div style={{
      background: "#0A0A0A", padding: "clamp(32px,5vw,52px) clamp(16px,3vw,32px)", textAlign: "center",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,52px)", color: "#D4AF6A", fontWeight: 400, lineHeight: 1, marginBottom: "14px" }}>
        {inView ? count : "0"}
      </div>
      <div style={{ color: "#ffffff35", fontSize: "11px", letterSpacing: "0.2em", fontFamily: "monospace" }}>
        {stat.label.toUpperCase()}
      </div>
    </div>
  );
}

// ─── TESTIMONIAL CARD ─────────────────────────────────────────────────────────

function TestimonialCard({ t, index, inView }) {
  return (
    <div style={{
      padding: "clamp(24px,3vw,36px) clamp(20px,3vw,32px)", border: "1px solid #ffffff0d", borderRadius: "3px",
      background: "#0d0d0d",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
    }}>
      <div style={{ color: "#D4AF6A", fontSize: "32px", lineHeight: 1, marginBottom: "20px", opacity: 0.6, fontFamily: "serif" }}>"</div>
      <p style={{ color: "#ffffff65", fontSize: "14px", lineHeight: 1.8, margin: "0 0 28px", fontStyle: "italic" }}>{t.text}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #D4AF6A40, #D4AF6A15)",
          border: "1px solid #D4AF6A30",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#D4AF6A", fontSize: "12px", fontFamily: "monospace", letterSpacing: "0.05em",
        }}>{t.avatar}</div>
        <div>
          <div style={{ color: "#F5F5F0", fontSize: "14px", fontWeight: 500 }}>{t.name}</div>
          <div style={{ color: "#ffffff35", fontSize: "12px", marginTop: "2px" }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

// ─── MATERIAL CHIP ────────────────────────────────────────────────────────────

function MaterialChip({ m, index, inView }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px",
      border: "1px solid #ffffff0a", borderRadius: "2px",
      opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)",
      transition: `all 0.5s ease ${index * 0.08}s`,
    }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: m.color, opacity: 0.7, flexShrink: 0 }} />
      <div>
        <div style={{ color: "#F5F5F0", fontSize: "14px", marginBottom: "2px" }}>{m.name}</div>
        <div style={{ color: "#ffffff35", fontSize: "12px" }}>{m.desc}</div>
      </div>
    </div>
  );
}

// ─── PROCESS STEP ─────────────────────────────────────────────────────────────

function ProcessStep({ step, index }) {
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
      <h3 style={{ color: "#F5F5F0", fontSize: "16px", fontWeight: 400, marginBottom: "12px" }}>{step.title}</h3>
      <p style={{ color: "#ffffff40", fontSize: "13px", lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
    </div>
  );
}

// ─── MOBILE MENU ─────────────────────────────────────────────────────────────

function MobileMenu({ open, onClose }) {
  const navItems = [
    { label: "Ishlar", id: "ishlar" },
    { label: "Xizmatlar", id: "xizmatlar" },
    { label: "Jarayon", id: "jarayon" },
    { label: "Aloqa", id: "aloqa" },
  ];
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "#0A0A0Af8", backdropFilter: "blur(16px)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: "8px",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "all" : "none",
      transition: "opacity 0.3s ease",
    }}>
      <button onClick={onClose} style={{
        position: "absolute", top: "24px", right: "24px",
        background: "none", border: "1px solid #ffffff15", color: "#ffffff60",
        width: "40px", height: "40px", borderRadius: "2px", cursor: "pointer",
        fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
      }}>✕</button>
      {navItems.map(item => (
        <button key={item.id} onClick={() => { scrollToSection(item.id); onClose(); }}
          style={{
            background: "none", border: "none", color: "#F5F5F0", cursor: "pointer",
            fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 400,
            padding: "12px 24px", letterSpacing: "0.04em",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#D4AF6A"}
          onMouseLeave={e => e.currentTarget.style.color = "#F5F5F0"}>
          {item.label}
        </button>
      ))}
      <button onClick={() => { scrollToSection("aloqa"); onClose(); }}
        style={{
          marginTop: "20px", background: "#D4AF6A", color: "#0A0A0A",
          border: "none", padding: "14px 40px", fontSize: "11px", letterSpacing: "0.14em",
          cursor: "pointer", borderRadius: "2px", fontWeight: 500, fontFamily: "inherit",
        }}>
        ZAKAZ BERISH
      </button>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Navbar({ scrollY }) {
  const scrolled = scrollY > 60;
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "Ishlar", id: "ishlar" },
    { label: "Xizmatlar", id: "xizmatlar" },
    { label: "Jarayon", id: "jarayon" },
    { label: "Aloqa", id: "aloqa" },
  ];

  return (
    <>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 clamp(20px,5vw,56px)", height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "#0A0A0Af0" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #ffffff0a" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", gap: "10px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <div style={{ width: "30px", height: "30px", border: "1px solid #D4AF6A", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: "14px", height: "14px", background: "#D4AF6A", borderRadius: "1px", transform: "rotate(45deg) scale(0.7)" }} />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px", letterSpacing: "0.06em", color: "#F5F5F0" }}>
            PRO<span style={{ color: "#D4AF6A" }}>MAKET</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {navItems.map(item => (
            <NavLink key={item.id} onClick={() => scrollToSection(item.id)}>{item.label}</NavLink>
          ))}
          <GoldButton variant="outline" onClick={() => scrollToSection("aloqa")} style={{ padding: "9px 22px", fontSize: "11px" }}>
            ZAKAZ BERISH
          </GoldButton>
        </div>

        {/* Hamburger for mobile */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(true)}
          style={{
            background: "none", border: "1px solid #ffffff15", color: "#ffffff60",
            width: "40px", height: "40px", borderRadius: "2px", cursor: "pointer",
            display: "none", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "5px",
          }}>
          <span style={{ display: "block", width: "18px", height: "1px", background: "#D4AF6A" }} />
          <span style={{ display: "block", width: "18px", height: "1px", background: "#D4AF6A" }} />
          <span style={{ display: "block", width: "12px", height: "1px", background: "#D4AF6A" }} />
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

function NavLink({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "none", border: "none", padding: 0,
        color: hov ? "#D4AF6A" : "#ffffff55", fontSize: "13px", letterSpacing: "0.08em",
        cursor: "pointer", transition: "color 0.2s", fontFamily: "inherit",
      }}>
      {children}
    </button>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ scrollY }) {
  const [ref, inView] = useInView(0.05);
  const y = scrollY * 0.3;

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "0 clamp(20px,5vw,56px)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 25% 55%, #D4AF6A0a 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, #D4AF6A06 0%, transparent 50%)", transform: `translateY(${y * 0.2}px)` }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 79px, #ffffff03 79px, #ffffff03 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, #ffffff03 79px, #ffffff03 80px)` }} />
      <div style={{ position: "absolute", top: "20%", left: "8%", width: "200px", height: "200px", border: "1px solid #D4AF6A10", borderRadius: "50%", transform: `translateY(${-y * 0.1}px)` }} />
      <div style={{ position: "absolute", bottom: "25%", right: "6%", width: "120px", height: "120px", border: "1px solid #D4AF6A08", transform: `translateY(${y * 0.15}px) rotate(45deg)` }} />

      <div ref={ref} style={{ maxWidth: "860px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Fade inView={inView} delay={0.1}>
          <p style={{ color: "#D4AF6A", fontSize: "10px", letterSpacing: "0.35em", marginBottom: "36px", fontFamily: "monospace" }}>
            ARXITEKTURA · MAKET · DIZAYN
          </p>
        </Fade>
        <Fade inView={inView} delay={0.2}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 8.5vw, 92px)", fontWeight: 400, lineHeight: 1.04, color: "#F5F5F0", margin: "0 0 6px" }}>
            Loyihangizni
          </h1>
        </Fade>
        <Fade inView={inView} delay={0.3}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 8.5vw, 92px)", fontWeight: 400, lineHeight: 1.04, color: "#D4AF6A", fontStyle: "italic", margin: "0 0 36px" }}>
            Ko'rinishga keltiring
          </h1>
        </Fade>
        <Fade inView={inView} delay={0.4}>
          <p style={{ color: "#ffffff45", fontSize: "clamp(14px, 2vw, 17px)", maxWidth: "500px", margin: "0 auto 52px", lineHeight: 1.85, fontWeight: 300 }}>
            Arxitektura binolarining aniq va premium maketlari. Har bir loyiha uchun individual yondashuv va professional sifat.
          </p>
        </Fade>
        <Fade inView={inView} delay={0.5}>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <GoldButton onClick={() => scrollToSection("ishlar")}>ISHLARNI KO'RISH</GoldButton>
            <GoldButton variant="outline" onClick={() => scrollToSection("aloqa")}>ALOQA</GoldButton>
          </div>
        </Fade>
      </div>

      <div style={{ position: "absolute", bottom: "44px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer" }}
        onClick={() => scrollToSection("ishlar")}>
        <div style={{ width: "1px", height: "64px", background: "linear-gradient(to bottom, #D4AF6A60, transparent)" }} />
        <p style={{ color: "#ffffff25", fontSize: "9px", letterSpacing: "0.25em", fontFamily: "monospace" }}>SCROLL</p>
      </div>
    </section>
  );
}

function Fade({ children, inView, delay = 0 }) {
  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─── STATS SECTION ────────────────────────────────────────────────────────────

function StatsSection() {
  const [ref, inView] = useInView(0.2);
  return (
    <section ref={ref} style={{ padding: "0 clamp(20px,5vw,56px)", borderTop: "1px solid #ffffff07", borderBottom: "1px solid #ffffff07" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1px", background: "#ffffff07" }}>
        {stats.map((s, i) => <StatItem key={i} stat={s} index={i} inView={inView} />)}
      </div>
    </section>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────

function ProjectsSection() {
  return (
    <section id="ishlar" style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,56px)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(40px,6vw,72px)", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <Eyebrow number="01" label="PORTFEL" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, margin: 0, color: "#F5F5F0" }}>
              Bajarilgan ishlar
            </h2>
          </div>
          <button onClick={() => scrollToSection("aloqa")}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.firstChild.style.color = "#D4AF6A"}
            onMouseLeave={e => e.currentTarget.firstChild.style.color = "#D4AF6A80"}>
            <span style={{ color: "#D4AF6A80", fontSize: "12px", letterSpacing: "0.1em", borderBottom: "1px solid #D4AF6A30", paddingBottom: "4px", transition: "color 0.2s", display: "inline-block" }}>
              BARCHASI →
            </span>
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section id="xizmatlar" style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,56px)", background: "#0d0d0d" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "clamp(40px,6vw,72px)" }}>
          <Eyebrow number="02" label="XIZMATLAR" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, margin: 0, color: "#F5F5F0" }}>
            Nima qilamiz
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "#ffffff07" }}>
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

// ─── MATERIALS SECTION ────────────────────────────────────────────────────────

function MaterialsSection() {
  const [ref, inView] = useInView();
  return (
    <section style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,56px)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
        <div>
          <Eyebrow number="03" label="MATERIALLAR" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, margin: "0 0 24px", color: "#F5F5F0", lineHeight: 1.2 }}>
            Faqat sifatli<br /><em style={{ color: "#D4AF6A" }}>materiallar</em>
          </h2>
          <p style={{ color: "#ffffff40", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>
            Har bir maket uchun eng yaxshi materiallarni tanlaymiz. Lipa yog'ochidan tortib premium akrilikgacha — sifat birinchi o'rinda.
          </p>
        </div>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
          {materials.map((m, i) => <MaterialChip key={i} m={m} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS SECTION ─────────────────────────────────────────────────────────

function ProcessSection() {
  const steps = [
    { num: "01", title: "Murojaat", desc: "Loyiha haqida ma'lumot va talablarni aniqlaymiz" },
    { num: "02", title: "Hisob-kitob", desc: "Narx va muddatni kelishib olamiz" },
    { num: "03", title: "Ishlab chiqarish", desc: "Maketni professional uskunalar bilan yasaymiz" },
    { num: "04", title: "Topshirish", desc: "Tayyor maketni qadoqlab topshiramiz" },
  ];
  return (
    <section id="jarayon" style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,56px)", background: "#0d0d0d" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "clamp(40px,6vw,72px)" }}>
          <Eyebrow number="04" label="JARAYON" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, margin: 0, color: "#F5F5F0" }}>
            Qanday ishlaymiz
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0", position: "relative" }}>
          <div style={{ position: "absolute", top: "30px", left: "calc(12.5%)", right: "calc(12.5%)", height: "1px", background: "linear-gradient(to right, transparent, #D4AF6A30, transparent)" }} />
          {steps.map((s, i) => <ProcessStep key={i} step={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ─────────────────────────────────────────────────────

function TestimonialsSection() {
  const [ref, inView] = useInView();
  return (
    <section style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,56px)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "clamp(40px,6vw,72px)" }}>
          <Eyebrow number="05" label="MIJOZLAR" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, margin: 0, color: "#F5F5F0" }}>
            Ular haqida <em style={{ color: "#D4AF6A" }}>nima deyishadi</em>
          </h2>
        </div>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {testimonials.map((t, i) => <TestimonialCard key={i} t={t} index={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────

function CTASection() {
  const [ref, inView] = useInView();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (name && phone) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setName(""); setPhone("");
    }
  };

  return (
    <section id="aloqa" style={{ padding: "clamp(80px,12vw,130px) clamp(20px,5vw,56px)", background: "#0d0d0d", textAlign: "center" }}>
      <div ref={ref} style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Fade inView={inView} delay={0}>
          <Eyebrow number="06" label="ALOQA" />
        </Fade>
        <Fade inView={inView} delay={0.12}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 400, margin: "0 0 24px", color: "#F5F5F0", lineHeight: 1.15 }}>
            Loyihangizni<br /><em style={{ color: "#D4AF6A" }}>boshlaylik</em>
          </h2>
        </Fade>
        <Fade inView={inView} delay={0.2}>
          <p style={{ color: "#ffffff40", fontSize: "15px", lineHeight: 1.85, marginBottom: "52px" }}>
            Loyihangiz haqida ma'lumot qoldiring — biz bilan bog'laning va bepul konsultatsiya oling.
          </p>
        </Fade>
        <Fade inView={inView} delay={0.28}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "12px" }}>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Ismingiz"
              style={{ background: "#151515", border: "1px solid #ffffff12", color: "#F5F5F0", padding: "15px 20px", fontSize: "14px", borderRadius: "2px", outline: "none", fontFamily: "inherit" }} />
            <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="+998 __ ___ __ __"
              style={{ background: "#151515", border: "1px solid #ffffff12", color: "#F5F5F0", padding: "15px 20px", fontSize: "14px", borderRadius: "2px", outline: "none", fontFamily: "inherit" }} />
          </div>
          <button onClick={handleSubmit}
            style={{
              width: "100%", background: sent ? "#3a8a3a" : "#D4AF6A", color: "#0A0A0A",
              border: "none", padding: "17px", fontSize: "11px", letterSpacing: "0.14em",
              cursor: "pointer", borderRadius: "2px", fontWeight: 500, transition: "all 0.3s", fontFamily: "inherit",
            }}>
            {sent ? "✓ YUBORILDI" : "MUROJAAT YUBORISH"}
          </button>
        </Fade>
        <Fade inView={inView} delay={0.36}>
          <div style={{ marginTop: "52px", display: "flex", gap: "clamp(16px,3vw,36px)", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              ["☎", "+998 90 123 45 67", "tel:+998901234567"],
              ["✉", "info@promaket.uz", "mailto:info@promaket.uz"],
              ["📍", "Toshkent, O'zbekiston", null],
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

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const socials = [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Telegram", href: "https://t.me" },
    { name: "YouTube", href: "https://youtube.com" },
  ];
  return (
    <footer style={{ padding: "clamp(24px,3vw,36px) clamp(20px,5vw,56px)", borderTop: "1px solid #ffffff07", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", color: "#F5F5F0" }}>
          PRO<span style={{ color: "#D4AF6A" }}>MAKET</span>
        </span>
      </button>
      <p style={{ color: "#ffffff20", fontSize: "11px", margin: 0, fontFamily: "monospace", order: 3 }}>
        © 2024 PRO Maket. Barcha huquqlar himoyalangan.
      </p>
      <div style={{ display: "flex", gap: "28px" }}>
        {socials.map(s => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{ color: "#ffffff25", fontSize: "12px", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#D4AF6A"}
            onMouseLeave={e => e.currentTarget.style.color = "#ffffff25"}>
            {s.name}
          </a>
        ))}
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#F5F5F0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        input::placeholder { color: #ffffff30; }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>
      <Navbar scrollY={scrollY} />
      <Hero scrollY={scrollY} />
      <StatsSection />
      <ProjectsSection />
      <ServicesSection />
      <MaterialsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
