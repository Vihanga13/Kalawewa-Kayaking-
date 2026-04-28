import { useState, useEffect } from "react";
import { Menu, X, Anchor, Users, Star, Calendar, Waves } from "lucide-react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

const navLinks = [
  { label: "Experience", href: "#about" },
  { label: "Tour Details", href: "#tour-details" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track scroll position for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      // Determine active section
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 ${COLORS.red}40; }
          50% { box-shadow: 0 0 0 4px ${COLORS.red}20; }
        }
        .nav-link {
          position: relative;
          transition: color 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: ${COLORS.red};
          transition: width 0.3s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .mobile-menu {
          animation: slideDown 0.3s ease;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
          background: scrolled 
            ? "rgba(255,255,255,0.98)" 
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled 
            ? `1px solid ${COLORS.cyan}12` 
            : "none",
          boxShadow: scrolled 
            ? "0 4px 24px rgba(0,0,0,0.04)" 
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? "4rem" : "5rem",
            transition: "height 0.4s ease",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", cursor: "pointer" }}
          >
            <div
              style={{
                width: "2.5rem", height: "2.5rem",
                background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.lightCyan})`,
                borderRadius: "0.75rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 2px 8px ${COLORS.cyan}30`,
              }}
            >
              <Anchor size={16} color="white" strokeWidth={2} />
            </div>
            <div>
              <div style={{ 
                color: scrolled ? COLORS.navy : "#fff", 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: "1.1rem", 
                fontWeight: 700, 
                lineHeight: 1.1,
                transition: "color 0.3s ease",
                textShadow: scrolled ? "none" : "0 2px 4px rgba(0,0,0,0.3)",
              }}>
                Wild Paddle
              </div>
              <div style={{ 
                color: scrolled ? COLORS.cyan : COLORS.lightCyan, 
                fontSize: "0.55rem", 
                letterSpacing: "2px", 
                textTransform: "uppercase", 
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                transition: "color 0.3s ease",
                textShadow: scrolled ? "none" : "0 1px 3px rgba(0,0,0,0.3)",
              }}>
                Sri Lanka
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`nav-link ${activeSection === link.href ? "active" : ""}`}
                style={{
                  background: "none", 
                  border: "none", 
                  cursor: "pointer",
                  color: scrolled ? COLORS.navy : "#fff",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.85rem", 
                  fontWeight: 500,
                  letterSpacing: "0.3px",
                  transition: "color 0.2s",
                  padding: "0.5rem 0",
                  textShadow: scrolled ? "none" : "0 1px 2px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.lightCyan)}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? COLORS.navy : "#fff")}
              >
                {link.label}
              </button>
            ))}
            
            {/* Rating badge */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.25rem 0.75rem",
              background: scrolled ? `${COLORS.cyan}08` : "rgba(255,255,255,0.15)",
              borderRadius: "2rem",
              border: `1px solid ${scrolled ? COLORS.cyan : "rgba(255,255,255,0.3)"}`
            }}>
              <Star size={12} fill={COLORS.red} color={COLORS.red} />
              <span style={{ fontSize: "0.7rem", color: scrolled ? COLORS.navy : "#fff", fontWeight: 500, textShadow: scrolled ? "none" : "0 1px 2px rgba(0,0,0,0.2)" }}>4.98</span>
              <span style={{ fontSize: "0.65rem", color: scrolled ? "#8AA493" : "#fff", textShadow: scrolled ? "none" : "0 1px 2px rgba(0,0,0,0.2)" }}>(2k+)</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollTo("#booking")}
            className="desktop-nav"
            style={{
              background: `linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.red}CC 100%)`,
              color: "#fff",
              border: "none",
              padding: "0.6rem 1.5rem",
              borderRadius: "3rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 20px ${COLORS.red}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Book Now
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ 
              background: "none", 
              border: "none", 
              cursor: "pointer", 
              color: scrolled ? COLORS.navy : "#fff", 
              padding: "0.5rem",
              transition: "color 0.3s ease",
              filter: scrolled ? "none" : "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="mobile-menu"
            style={{
              background: "white",
              borderTop: `1px solid ${COLORS.cyan}12`,
              padding: "1rem 1.5rem 1.5rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none", cursor: "pointer",
                  color: COLORS.navy,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem", fontWeight: 500,
                  padding: "0.75rem 0",
                  borderBottom: `1px solid ${COLORS.cyan}10`,
                }}
              >
                {link.label}
              </button>
            ))}
            
            {/* Mobile stats row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 0",
              marginTop: "0.5rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Users size={14} color={COLORS.cyan} />
                <span style={{ fontSize: "0.7rem", color: "#6B7E73" }}>12,000+ Guests</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Star size={14} fill={COLORS.red} color={COLORS.red} />
                <span style={{ fontSize: "0.7rem", color: "#6B7E73" }}>4.98 ★</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Waves size={14} color={COLORS.lightCyan} />
                <span style={{ fontSize: "0.7rem", color: "#6B7E73" }}>Eco-Certified</span>
              </div>
            </div>
            
            <button
              onClick={() => scrollTo("#booking")}
              style={{
                marginTop: "0.5rem",
                width: "100%",
                background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.red}CC)`,
                color: "#fff",
                border: "none",
                padding: "0.85rem",
                borderRadius: "3rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <Calendar size={14} /> Book Your Adventure
            </button>
            
            {/* Live support indicator */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1rem",
              padding: "0.5rem",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.cyan, animation: "glowPulse 2s infinite" }} />
              <span style={{ fontSize: "0.65rem", color: "#8AA493" }}>Live support • 24/7</span>
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div style={{ height: "5rem" }} />
    </>
  );
}