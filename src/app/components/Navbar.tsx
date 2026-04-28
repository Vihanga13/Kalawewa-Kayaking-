import { useState, useEffect, useRef } from "react";
import { Menu, X, Anchor, Star, Calendar, Waves, ChevronRight } from "lucide-react";

const COLORS = {
  navy: "#1B3A6B",
  navyDeep: "#0F2244",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
  cream: "#FAF5EA",
};

const navLinks = [
  { label: "Experience", href: "#about" },
  { label: "Tours", href: "#tour-details" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    // Stagger the entrance animation
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);

          const pos = window.scrollY + 120;
          for (const link of navLinks) {
            const el = document.getElementById(link.href.slice(1));
            if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
              setActiveSection(link.href);
              break;
            }
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Shared island style that transitions between "floating pill" and "merged bar segment"
  const islandBase: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    transition: "all 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
    // Pill state
    background: scrolled ? "transparent" : "rgba(11, 30, 58, 0.72)",
    backdropFilter: scrolled ? "none" : "blur(12px)",
    border: scrolled ? "1px solid transparent" : "1px solid rgba(255,255,255,0.13)",
    borderRadius: scrolled ? "0" : "3rem",
    boxShadow: scrolled ? "none" : "0 4px 24px rgba(0,0,0,0.18)",
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes islandFloat {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGreen {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.25); }
        }
        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes waveScroll {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 0; }
        }

        .island-logo   { animation: islandFloat 0.5s cubic-bezier(0.34,1.2,0.64,1) 0.05s both; }
        .island-links  { animation: islandFloat 0.5s cubic-bezier(0.34,1.2,0.64,1) 0.15s both; }
        .island-right  { animation: islandFloat 0.5s cubic-bezier(0.34,1.2,0.64,1) 0.25s both; }

        .nav-pill-link {
          position: relative;
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem 0;
          letter-spacing: 0.2px;
          transition: color 0.2s ease;
        }
        .nav-pill-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1.5px;
          background: ${COLORS.red};
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.34,1.2,0.64,1);
        }
        .nav-pill-link:hover::after,
        .nav-pill-link.active::after { width: 100%; }

        .book-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.4px;
          color: white;
          background: ${COLORS.red};
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .book-btn:hover {
          background: #C82B22;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(230,51,41,0.38);
        }

        .mobile-toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .mobile-toggle-btn:hover { opacity: 0.75; }

        .mobile-overlay {
          animation: menuSlide 0.3s ease;
        }
        
        /* Mobile link rows */
        .mob-link {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; text-align: left; background: none; border: none;
          cursor: pointer; padding: 0.9rem 0;
          border-bottom: 1px solid rgba(0,180,216,0.08);
          font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 500;
          color: ${COLORS.navy};
          transition: color 0.2s ease;
        }
        .mob-link:hover { color: ${COLORS.cyan}; }

        @media (max-width: 820px) {
          .island-links { display: none !important; }
          .island-right-desktop { display: none !important; }
          .mobile-toggle-btn { display: flex !important; }
        }
        @media (min-width: 821px) {
          .mobile-toggle-btn { display: none !important; }
          .mobile-overlay { display: none !important; }
        }
      `}</style>

      {/* ── Fixed nav wrapper ─────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          // When scrolled: the wrapper itself becomes the glass bar
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid rgba(0,180,216,0.1)` : "none",
          boxShadow: scrolled ? "0 2px 24px rgba(15,34,68,0.08)" : "none",
          transition: "background 0.55s ease, backdrop-filter 0.55s ease, border-color 0.55s ease, box-shadow 0.55s ease",
        }}
      >
        {/* Top micro-strip — only visible when not scrolled */}
        <div
          style={{
            overflow: "hidden",
            height: scrolled ? "0px" : "28px",
            transition: "height 0.45s ease",
            background: scrolled ? "transparent" : COLORS.navyDeep,
            borderBottom: scrolled ? "none" : `1px solid rgba(0,180,216,0.12)`,
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "2rem", height: "28px", padding: "0 1.5rem",
          }}>
            {[
              { icon: <Star size={9} fill={COLORS.red} color={COLORS.red} />, text: "4.98 on TripAdvisor" },
              { icon: <Waves size={9} color={COLORS.lightCyan} />, text: "12,000+ Expeditions" },
              { icon: <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", animation: "pulseGreen 2s infinite" }} />, text: "Tours Running Today" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {item.icon}
                <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.5px" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main bar: three floating islands */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: scrolled ? "0 1.5rem" : "0.85rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: scrolled ? "0" : "0.75rem",
            height: scrolled ? "56px" : "auto",
            transition: "padding 0.55s ease, height 0.55s ease, gap 0.55s ease",
          }}
        >

          {/* ── ISLAND 1: Logo ── */}
          <div
            className="island-logo"
            style={{
              ...islandBase,
              padding: scrolled ? "0 0.5rem 0 0" : "0.55rem 1.1rem",
              gap: "0.65rem",
            }}
          >
            {/* Logo mark */}
            <div style={{
              width: "2.1rem", height: "2.1rem", flexShrink: 0,
              background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.lightCyan})`,
              borderRadius: "0.6rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 2px 10px ${COLORS.cyan}35`,
            }}>
              <Anchor size={14} color="white" strokeWidth={2.2} />
            </div>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.05rem", fontWeight: 700, lineHeight: 1,
                color: scrolled ? COLORS.navy : "#ffffff",
                transition: "color 0.4s ease",
              }}>
                Wild Paddle
              </div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.5rem", fontWeight: 600, letterSpacing: "2px",
                textTransform: "uppercase",
                color: scrolled ? COLORS.cyan : COLORS.lightCyan,
                transition: "color 0.4s ease",
              }}>
                Sri Lanka
              </div>
            </div>

            {/* Mobile hamburger — lives inside logo island */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: scrolled ? "0.75rem" : "0.25rem" }}>
              {/* Mobile book now (scrolled only) */}
              <button
                className="book-btn mobile-toggle-btn"
                onClick={() => scrollTo("#booking")}
                style={{
                  display: "none", // shown via media query override below if needed
                  padding: "0.4rem 0.85rem",
                  borderRadius: "3rem",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                }}
              >
                Book
              </button>
              <button
                className="mobile-toggle-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                style={{
                  width: "2.1rem", height: "2.1rem",
                  borderRadius: "50%",
                  border: `1px solid ${scrolled ? "rgba(27,58,107,0.15)" : "rgba(255,255,255,0.2)"}`,
                  color: scrolled ? COLORS.navy : "white",
                  background: scrolled ? "rgba(27,58,107,0.04)" : "rgba(255,255,255,0.08)",
                }}
              >
                {menuOpen ? <X size={14} /> : <Menu size={14} />}
              </button>
            </div>
          </div>

          {/* ── ISLAND 2: Nav links ── */}
          <div
            className="island-links"
            style={{
              ...islandBase,
              padding: scrolled ? "0 1rem" : "0.55rem 1.5rem",
              gap: "1.6rem",
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                className={`nav-pill-link${activeSection === link.href ? " active" : ""}`}
                onClick={() => scrollTo(link.href)}
                style={{
                  color: scrolled
                    ? activeSection === link.href ? COLORS.navy : "#5A6B7E"
                    : "rgba(255,255,255,0.88)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = scrolled ? COLORS.navy : "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = scrolled
                    ? activeSection === link.href ? COLORS.navy : "#5A6B7E"
                    : "rgba(255,255,255,0.88)")
                }
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ── ISLAND 3: Rating + CTA ── */}
          <div
            className="island-right island-right-desktop"
            style={{
              ...islandBase,
              padding: scrolled ? "0 0 0 1rem" : "0.4rem 0.4rem 0.4rem 1rem",
              gap: "0.85rem",
            }}
          >
            {/* Rating micro-badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.3rem",
              paddingRight: scrolled ? "0.75rem" : "0",
              borderRight: scrolled ? `1px solid rgba(0,180,216,0.15)` : "none",
              transition: "border-color 0.4s ease, padding 0.4s ease",
            }}>
              <Star size={11} fill={COLORS.red} color={COLORS.red} />
              <span style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "0.95rem", fontWeight: 700,
                color: scrolled ? COLORS.navy : "white",
                transition: "color 0.4s",
              }}>4.98</span>
              <span style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "0.6rem",
                color: scrolled ? "#8AA493" : "rgba(255,255,255,0.55)",
                transition: "color 0.4s",
              }}>/ 2k reviews</span>
            </div>

            {/* Book Now */}
            <button
              className="book-btn"
              onClick={() => scrollTo("#booking")}
              style={{
                padding: scrolled ? "0.5rem 1.1rem" : "0.55rem 1.1rem",
                borderRadius: scrolled ? "3rem" : "2.5rem",
              }}
            >
              Book Now
            </button>
          </div>
        </div>

        {/* ── Mobile overlay menu ── */}
        {menuOpen && (
          <div
            className="mobile-overlay"
            style={{
              position: "absolute",
              top: "100%", left: 0, right: 0,
              background: "white",
              borderTop: `1px solid rgba(0,180,216,0.1)`,
              boxShadow: "0 16px 40px rgba(15,34,68,0.12)",
              padding: "0 1.5rem 1.5rem",
            }}
          >
            {/* Section label */}
            <p style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "0.55rem",
              fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
              color: COLORS.cyan, padding: "1rem 0 0.25rem",
            }}>
              Navigate
            </p>

            {navLinks.map((link) => (
              <button key={link.label} className="mob-link" onClick={() => scrollTo(link.href)}>
                <span>{link.label}</span>
                <ChevronRight size={14} color={`${COLORS.cyan}60`} />
              </button>
            ))}

            {/* Stats row */}
            <div style={{
              display: "flex", gap: "0.75rem", flexWrap: "wrap",
              padding: "1rem 0 0.5rem",
            }}>
              {[
                { icon: <Star size={11} fill={COLORS.red} color={COLORS.red} />, label: "4.98 Avg. Rating" },
                { icon: <Waves size={11} color={COLORS.lightCyan} />, label: "12,000+ Guests" },
                { icon: <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", animation: "pulseGreen 2s infinite" }} />, label: "Tours Today" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.3rem 0.7rem",
                  background: `${COLORS.cyan}08`,
                  border: `1px solid ${COLORS.cyan}12`,
                  borderRadius: "3rem",
                }}>
                  {s.icon}
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "0.65rem", color: "#6B7E73" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="book-btn"
              onClick={() => scrollTo("#booking")}
              style={{
                width: "100%", marginTop: "0.75rem",
                padding: "0.9rem",
                borderRadius: "0.75rem",
                fontSize: "0.9rem",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              }}
            >
              <Calendar size={15} /> Book Your Expedition
            </button>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div style={{ height: "5rem" }} />
    </>
  );
}