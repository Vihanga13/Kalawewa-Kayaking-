import { Anchor, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "#0A1A10", padding: "80px 24px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "48px",
            marginBottom: "64px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "36px", height: "36px",
                  background: "linear-gradient(135deg, #4CAF82, #2196A8)",
                  borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Anchor size={18} color="white" />
              </div>
              <div>
                <div style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, lineHeight: 1.1 }}>Wild Paddle</div>
                <div style={{ color: "#7EC8A4", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>Sri Lanka</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.75, maxWidth: "280px" }}>
              Sri Lanka's first and only kayak-based wild elephant watching experience.
              Eco-friendly, safe, and unforgettable.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "36px", height: "36px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(76,175,130,0.15)";
                    e.currentTarget.style.borderColor = "rgba(126,200,164,0.3)";
                    e.currentTarget.style.color = "#7EC8A4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
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
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 700, color: "#7EC8A4", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
              Explore
            </h4>
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
                style={{
                  display: "block", background: "none", border: "none",
                  cursor: "pointer", color: "rgba(255,255,255,0.5)",
                  fontFamily: "'Inter', sans-serif", fontSize: "14px",
                  padding: "5px 0", textAlign: "left",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#7EC8A4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 700, color: "#7EC8A4", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
              Contact
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { Icon: Mail, text: "hello@wildpaddle.lk" },
                { Icon: Phone, text: "+94 77 123 4567" },
                { Icon: MapPin, text: "Kaudulla, North Central Province, Sri Lanka" },
              ].map(({ Icon, text }, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <Icon size={15} color="#7EC8A4" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.5 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 700, color: "#7EC8A4", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
              Stay Updated
            </h4>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1.65, marginBottom: "16px" }}>
              Get seasonal offers, wildlife updates, and trip reports straight to your inbox.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button
                style={{
                  background: "linear-gradient(135deg, #4CAF82, #2196A8)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "11px 16px",
                  color: "#fff",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "28px" }} />

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
            © 2026 Wild Paddle Sri Lanka. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms & Conditions", "Cancellation Policy"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#7EC8A4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
