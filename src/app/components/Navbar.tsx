import { useState, useEffect } from "react";
import { Menu, X, Anchor } from "lucide-react";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        backgroundColor: scrolled ? "rgba(17, 37, 24, 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? "64px" : "80px",
          transition: "height 0.4s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
        >
          <div
            style={{
              width: "36px", height: "36px",
              background: "linear-gradient(135deg, #4CAF82, #2196A8)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Anchor size={18} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, lineHeight: 1.1 }}>
              Wild Paddle
            </div>
            <div style={{ color: "#7EC8A4", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>
              Sri Lanka
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }} className="hidden md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px", fontWeight: 500,
                letterSpacing: "0.3px",
                transition: "color 0.2s",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#7EC8A4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo("#booking")}
          className="hidden md:block"
          style={{
            background: "linear-gradient(135deg, #4CAF82, #2196A8)",
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            borderRadius: "50px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 15px rgba(76,175,130,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(76,175,130,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(76,175,130,0.35)";
          }}
        >
          Book Now
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: "4px" }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "rgba(17, 37, 24, 0.98)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "16px 24px 24px",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px", fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#booking")}
            style={{
              marginTop: "16px",
              width: "100%",
              background: "linear-gradient(135deg, #4CAF82, #2196A8)",
              color: "#fff",
              border: "none",
              padding: "14px",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}
