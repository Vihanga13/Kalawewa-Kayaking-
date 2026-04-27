import { Anchor, Instagram, Facebook, Youtube, Mail, Phone, MapPin, Heart, Shield, Star, Waves, Send } from "lucide-react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

export function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes waveFloat {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-8px) translateY(4px); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        .social-icon {
          transition: all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
        }
        .social-icon:hover {
          transform: translateY(-3px);
        }
        .footer-link {
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: ${COLORS.cyan} !important;
          transform: translateX(4px);
        }
        .newsletter-input:focus {
          border-color: ${COLORS.cyan} !important;
          box-shadow: 0 0 0 3px ${COLORS.cyan}20;
          outline: none;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center !important;
          }
          .brand-section {
            text-align: center !important;
            align-items: center !important;
          }
          .social-links {
            justify-content: center !important;
          }
          .contact-item {
            justify-content: center !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
          }
          .footer-links {
            justify-content: center !important;
          }
        }
      `}</style>

      <footer
        style={{
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0F2A4A 100%)`,
          padding: "4rem 1.5rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative wave pattern at top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${COLORS.red}, ${COLORS.cyan}, ${COLORS.lightCyan}, ${COLORS.red})` }} />
        
        {/* Water ripple background */}
        <div style={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `${COLORS.cyan}04`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          top: "20%",
          left: "-8%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: `${COLORS.red}03`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }} />

        {/* Floating water dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${5 + (i * 12)}%`,
              top: `${15 + (i * 8)}%`,
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: `${COLORS.cyan}20`,
              animation: `waveFloat ${3 + i * 0.5}s infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* Top row */}
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2.5rem",
              marginBottom: "3rem",
            }}
          >
            {/* Brand Section */}
            <div className="brand-section">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div
                  style={{
                    width: "44px", height: "44px",
                    background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.lightCyan})`,
                    borderRadius: "12px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 4px 12px ${COLORS.cyan}40`,
                  }}
                >
                  <Anchor size={20} color="white" />
                </div>
                <div>
                  <div style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, lineHeight: 1.1 }}>
                    Wild Paddle
                  </div>
                  <div style={{ color: COLORS.lightCyan, fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>
                    Sri Lanka
                  </div>
                </div>
              </div>
              
              <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", lineHeight: 1.65, maxWidth: "280px" }}>
                Sri Lanka's first and only kayak-based wild elephant watching experience. Eco-friendly, safe, and unforgettable.
              </p>
              
              {/* Trust badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: `${COLORS.cyan}10`,
                border: `1px solid ${COLORS.cyan}20`,
                borderRadius: "2rem",
                padding: "0.4rem 0.8rem",
                marginTop: "1rem",
              }}>
                <Shield size={12} color={COLORS.cyan} />
                <span style={{ fontSize: "0.65rem", color: COLORS.cyan, fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>Eco-Certified Operator</span>
              </div>

              {/* Social Links */}
              <div className="social-links" style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                {[
                  { Icon: Instagram, href: "#", color: "#E4405F" },
                  { Icon: Facebook, href: "#", color: "#1877F2" },
                  { Icon: Youtube, href: "#", color: "#FF0000" },
                ].map(({ Icon, href, color }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="social-icon"
                    style={{
                      width: "36px", height: "36px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid rgba(255,255,255,0.08)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${COLORS.cyan}15`;
                      e.currentTarget.style.borderColor = COLORS.cyan;
                      e.currentTarget.style.color = COLORS.cyan;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: COLORS.lightCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Explore
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { label: "The Experience", href: "#about" },
                  { label: "Tour Details", href: "#tour-details" },
                  { label: "Safety", href: "#safety" },
                  { label: "Gallery", href: "#gallery" },
                  { label: "Testimonials", href: "#testimonials" },
                  { label: "FAQ", href: "#faq" },
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="footer-link"
                    style={{
                      display: "inline-block", background: "none", border: "none",
                      cursor: "pointer", color: "rgba(255,255,255,0.5)",
                      fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem",
                      padding: "0.3rem 0", textAlign: "left",
                      transition: "all 0.2s",
                      width: "fit-content",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.cyan)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: COLORS.lightCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Contact
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="contact-item" style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <Mail size={14} color={COLORS.cyan} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <a href="mailto:hello@wildpaddle.lk" style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.cyan)} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                    hello@wildpaddle.lk
                  </a>
                </div>
                <div className="contact-item" style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <Phone size={14} color={COLORS.cyan} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <a href="tel:+94771234567" style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.cyan)} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                    +94 77 123 4567
                  </a>
                </div>
                <div className="contact-item" style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <MapPin size={14} color={COLORS.cyan} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", lineHeight: 1.5 }}>
                    Kaudulla, North Central Province, Sri Lanka
                  </span>
                </div>
              </div>
              
              {/* Live support badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: `${COLORS.red}10`,
                border: `1px solid ${COLORS.red}20`,
                borderRadius: "2rem",
                padding: "0.4rem 0.8rem",
                marginTop: "1rem",
              }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.red, animation: "pulseRing 2s infinite" }} />
                <span style={{ fontSize: "0.65rem", color: COLORS.red, fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>Live Support • 24/7</span>
              </div>
            </div>

            {/* Newsletter - Tourist Connection */}
            <div>
              <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: COLORS.lightCyan, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Join the Adventure
              </h4>
              <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                Get seasonal offers, wildlife updates, and trip reports straight to your inbox.
              </p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="newsletter-input"
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid rgba(255,255,255,0.1)`,
                    borderRadius: "10px",
                    padding: "0.7rem 0.8rem",
                    color: "#fff",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.75rem",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                />
                <button
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.lightCyan})`,
                    border: "none",
                    borderRadius: "10px",
                    padding: "0.7rem 1rem",
                    color: COLORS.navy,
                    cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 12px ${COLORS.cyan}40`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <Send size={12} /> Subscribe
                </button>
              </div>
              
              {/* Community stats */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "1rem",
                padding: "0.5rem 0",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <Heart size={12} color={COLORS.red} />
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>12,000+</span>
                </div>
                <div style={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.1)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <Star size={12} fill={COLORS.red} color={COLORS.red} />
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>4.98 ★</span>
                </div>
                <div style={{ width: "1px", height: "10px", background: "rgba(255,255,255,0.1)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <Waves size={12} color={COLORS.cyan} />
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>Eco-Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "1.5rem" }} />

          {/* Bottom */}
          <div className="footer-bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>
              © {currentYear} Wild Paddle Sri Lanka. All rights reserved. Made with <Heart size={10} color={COLORS.red} /> for nature.
            </p>
            <div className="footer-links" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {["Privacy Policy", "Terms & Conditions", "Cancellation Policy", "Cookie Policy"].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.7rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.cyan)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}