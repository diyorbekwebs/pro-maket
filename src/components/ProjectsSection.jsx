import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "../hooks";
import { projects } from "../data";
import Eyebrow from "./ui/Eyebrow";
import { scrollToSection } from "../utils/scrollToSection";
import { useTranslation } from "react-i18next";

const INTERVAL = 3500;

function ImageSlider({ images, accent, title, category }) {
  const [cur, setCur] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progRef = useRef(null);
  const startTimeRef = useRef(null);

  const goTo = useCallback((idx) => {
    setCur(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const prev = useCallback(
    (e) => {
      e.stopPropagation();
      setCur((c) => {
        setProgress(0);
        startTimeRef.current = Date.now();
        return (c - 1 + images.length) % images.length;
      });
    },
    [images.length],
  );

  const next = useCallback(
    (e) => {
      e.stopPropagation();
      setCur((c) => {
        setProgress(0);
        startTimeRef.current = Date.now();
        return (c + 1) % images.length;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (isHovered) {
      clearInterval(timerRef.current);
      cancelAnimationFrame(progRef.current);
      setProgress(0);
      return;
    }
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setCur((c) => (c + 1) % images.length);
      setProgress(0);
      startTimeRef.current = Date.now();
    }, INTERVAL);
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
      progRef.current = requestAnimationFrame(tick);
    };
    progRef.current = requestAnimationFrame(tick);
    return () => {
      clearInterval(timerRef.current);
      cancelAnimationFrame(progRef.current);
    };
  }, [isHovered, images.length]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
        background: "#111",
        display: "block",
      }}
    >
      {images.map((url, i) => (
        <img
          key={i}
          src={url}
          alt={`${title} — ${i + 1}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            opacity: i === cur ? 1 : 0,
            transform: isHovered && i === cur ? "scale(1.04)" : "scale(1)",
            transition:
              "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            zIndex: i === cur ? 1 : 0,
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          background: "#00000080",
          backdropFilter: "blur(8px)",
          border: `1px solid ${accent}25`,
          padding: "5px 12px",
          borderRadius: "2px",
          color: accent,
          fontSize: "10px",
          letterSpacing: "0.12em",
          fontFamily: "monospace",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {category}
      </div>

      <button
        onClick={prev}
        style={{
          position: "absolute",
          left: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "20px",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        ‹
      </button>

      <button
        onClick={next}
        style={{
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "20px",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        ›
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "5px",
          zIndex: 10,
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              goTo(i);
            }}
            style={{
              width: i === cur ? "16px" : "5px",
              height: "5px",
              borderRadius: i === cur ? "3px" : "50%",
              background: i === cur ? accent : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: `${isHovered ? 0 : progress}%`,
          background: accent + "90",
          zIndex: 10,
        }}
      />
    </div>
  );
}

function ProjectCard({ project, index, lang }) {
  const [ref, inView] = useInView(0.1);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => scrollToSection("aloqa")}
      style={{
        background: "#0f0f0f",
        border: `1px solid ${hov ? project.accent + "50" : "#ffffff0d"}`,
        borderRadius: "3px",
        overflow: "hidden",
        cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0) scale(1)"
          : "translateY(40px) scale(0.97)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, border-color 0.3s ease, box-shadow 0.3s ease`,
        boxShadow: hov ? `0 20px 60px ${project.accent}15` : "none",
      }}
    >
      <ImageSlider
        images={project.images}
        accent={project.accent}
        title={project.title[lang]}
        category={project.category[lang]}
      />

      <div style={{ padding: "22px" }}>
        <p
          style={{
            color: "#ffffff35",
            fontSize: "10px",
            letterSpacing: "0.2em",
            marginBottom: "8px",
            fontFamily: "monospace",
          }}
        >
          {project.year} &nbsp;·&nbsp; {project.scale[lang]}
        </p>
        <h3
          style={{
            color: "#F5F5F0",
            fontSize: "15px",
            fontWeight: 400,
            margin: "0 0 16px",
            lineHeight: 1.4,
          }}
        >
          {project.title[lang]}
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "1px",
              flex: 1,
              background: `linear-gradient(to right, ${project.accent}70, transparent)`,
              transform: hov ? "scaleX(1)" : "scaleX(0.25)",
              transformOrigin: "left",
              transition: "transform 0.4s ease",
            }}
          />
          <span
            style={{
              color: project.accent,
              fontSize: "16px",
              marginLeft: "12px",
              opacity: hov ? 1 : 0,
              transition: "opacity 0.3s",
            }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section
      id="ishlar"
      style={{ padding: "clamp(60px,10vw,110px) clamp(20px,5vw,56px)" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(40px,6vw,72px)",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <Eyebrow number="01" label={t("projects.eyebrow")} />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px,4vw,42px)",
                fontWeight: 400,
                margin: 0,
                color: "#F5F5F0",
              }}
            >
              {t("projects.title")}
            </h2>
          </div>
          <button
            onClick={() => scrollToSection("aloqa")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.firstChild.style.color = "#D4AF6A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.firstChild.style.color = "#D4AF6A80")
            }
          >
            <span
              style={{
                color: "#D4AF6A80",
                fontSize: "12px",
                letterSpacing: "0.1em",
                borderBottom: "1px solid #D4AF6A30",
                paddingBottom: "4px",
                transition: "color 0.2s",
                display: "inline-block",
              }}
            >
              {t("projects.all")}
            </span>
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
