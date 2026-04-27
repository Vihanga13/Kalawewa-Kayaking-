import { useState } from "react";
import { Calendar, Users, Mail, Phone, CheckCircle, Clock, Shield, Star, Waves, Heart, ArrowRight } from "lucide-react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

export function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    date: "",
    people: "2",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Calculate estimated price
  const estimatedPrice = parseInt(form.people) * 89;

  const inputStyle = {
    width: "100%",
    background: "white",
    border: `1px solid ${COLORS.cyan}15`,
    borderRadius: "12px",
    padding: "12px 16px",
    color: COLORS.navy,
    fontFamily: "'Outfit', sans-serif",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "all 0.2s ease",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    color: COLORS.navy,
    letterSpacing: "0.5px",
    marginBottom: "6px",
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .form-input:focus {
          border-color: ${COLORS.cyan} !important;
          box-shadow: 0 0 0 3px ${COLORS.cyan}20;
        }
        .submit-btn {
          transition: all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(0,180,216,0.25);
        }
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .booking-card {
            padding: 1.5rem !important;
          }
          .price-card {
            flex-direction: column !important;
            text-align: center !important;
            gap: 0.75rem !important;
          }
          .stats-row {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 1rem !important;
          }
        }
      `}</style>

      <section
        id="booking"
        style={{
          background: "linear-gradient(135deg, #FAF5EA 0%, #F5EDE0 100%)",
          padding: "5rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative water elements */}
        <div style={{
          position: "absolute",
          top: "5%",
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
          bottom: "10%",
          left: "-8%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: `${COLORS.lightCyan}04`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }} />
        
        {/* Water ripple dots */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, ${COLORS.cyan}06 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          opacity: 0.4,
        }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Header with Social Proof ── */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: `${COLORS.red}08`,
              border: `1px solid ${COLORS.red}15`,
              padding: "0.4rem 1.2rem",
              borderRadius: "3rem",
              marginBottom: "1rem",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: COLORS.red,
                animation: "pulse 2s infinite",
              }} />
              <Calendar size={12} color={COLORS.red} />
              <span style={{ color: COLORS.red, fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
                Limited Availability
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
              fontWeight: 700,
              color: COLORS.navy,
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}>
              Book Your{" "}
              <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Wild Adventure</span>
            </h2>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 300,
              fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
              color: "#6B7E73", maxWidth: "560px", margin: "1rem auto 0", lineHeight: 1.7,
            }}>
              Limited to 8 guests per trip for an intimate wildlife experience. 
              Spots fill up fast — secure yours today.
            </p>
          </div>

          {/* ── Stats Row ── */}
          <div className="stats-row" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            marginBottom: "2rem",
            padding: "0.75rem 1.5rem",
            background: "white",
            borderRadius: "3rem",
            border: `1px solid ${COLORS.cyan}12`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Star size={14} fill={COLORS.red} color={COLORS.red} />
              <span style={{ fontSize: "0.75rem", color: COLORS.navy, fontWeight: 500 }}>4.98 ★ (2,134 reviews)</span>
            </div>
            <div style={{ width: "1px", height: "20px", background: `${COLORS.cyan}20` }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Users size={14} color={COLORS.cyan} />
              <span style={{ fontSize: "0.75rem", color: COLORS.navy, fontWeight: 500 }}>12,000+ Happy Guests</span>
            </div>
            <div style={{ width: "1px", height: "20px", background: `${COLORS.cyan}20` }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={14} color={COLORS.lightCyan} />
              <span style={{ fontSize: "0.75rem", color: COLORS.navy, fontWeight: 500 }}>3-4 Hour Tour</span>
            </div>
          </div>

          {submitted ? (
            <div
              style={{
                background: "white",
                border: `1px solid ${COLORS.cyan}15`,
                borderRadius: "1.5rem",
                padding: "3rem 2rem",
                textAlign: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
                animation: "scaleIn 0.4s ease",
              }}
            >
              <div style={{
                width: "4rem", height: "4rem",
                borderRadius: "50%",
                background: `${COLORS.cyan}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1rem",
              }}>
                <CheckCircle size={32} color={COLORS.cyan} />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", color: COLORS.navy, fontWeight: 700, marginBottom: "0.5rem" }}>
                You're Almost There!
              </h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", color: "#6B7E73", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 1.5rem" }}>
                We've received your booking request. Our team will reach out within 24 hours to confirm your spot and share the adventure details.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  background: `${COLORS.cyan}10`,
                  border: `1px solid ${COLORS.cyan}20`,
                  color: COLORS.cyan,
                  padding: "0.75rem 2rem",
                  borderRadius: "3rem",
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.cyan}15`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = `${COLORS.cyan}10`; }}
              >
                Book Another Trip
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="booking-card"
              style={{
                background: "white",
                backdropFilter: "blur(0px)",
                border: `1px solid ${COLORS.cyan}12`,
                borderRadius: "1.5rem",
                padding: "2rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="form-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                {/* Date */}
                <div>
                  <label style={labelStyle}>
                    <Calendar size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                    className="form-input"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.cyan)}
                    onBlur={(e) => (e.target.style.borderColor = `${COLORS.cyan}15`)}
                  />
                </div>

                {/* People */}
                <div>
                  <label style={labelStyle}>
                    <Users size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Number of Guests
                  </label>
                  <select
                    name="people"
                    value={form.people}
                    onChange={handleChange}
                    className="form-input"
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.cyan)}
                    onBlur={(e) => (e.target.style.borderColor = `${COLORS.cyan}15`)}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} style={{ background: "white", color: COLORS.navy }}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.cyan)}
                    onBlur={(e) => (e.target.style.borderColor = `${COLORS.cyan}15`)}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>
                    <Mail size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.cyan)}
                    onBlur={(e) => (e.target.style.borderColor = `${COLORS.cyan}15`)}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>
                    <Phone size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 234 567 8900"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-input"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.cyan)}
                    onBlur={(e) => (e.target.style.borderColor = `${COLORS.cyan}15`)}
                  />
                </div>

                {/* Availability note */}
                <div>
                  <label style={labelStyle}>Availability</label>
                  <div style={{
                    background: `${COLORS.cyan}06`,
                    borderRadius: "12px",
                    padding: "12px 16px",
                    border: `1px solid ${COLORS.cyan}12`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Clock size={12} color={COLORS.cyan} />
                      <span style={{ fontSize: "0.7rem", color: COLORS.navy, fontWeight: 500 }}>Next available: </span>
                      <span style={{ fontSize: "0.7rem", color: COLORS.cyan }}>Tomorrow (2 spots left)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelStyle}>Special Requests or Notes</label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Any dietary needs, accessibility requirements, or questions..."
                  value={form.notes}
                  onChange={handleChange}
                  className="form-input"
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "80px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = COLORS.cyan)}
                  onBlur={(e) => (e.target.style.borderColor = `${COLORS.cyan}15`)}
                />
              </div>

              {/* Price estimate */}
              <div
                className="price-card"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0F2A4A 100%)`,
                  borderRadius: "1rem",
                  padding: "1rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                    Estimated Total
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.lightCyan, fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
                    ${estimatedPrice} USD
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.7rem" }}>
                    {form.people} guest{parseInt(form.people) > 1 ? "s" : ""} × $89 per person
                  </p>
                  <p style={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.65rem", marginTop: "2px" }}>
                    No payment required now
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn"
                style={{
                  width: "100%",
                  background: `linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.red}CC 100%)`,
                  color: "#fff",
                  border: "none",
                  padding: "1rem",
                  borderRadius: "3rem",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "0.5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                Request My Booking <ArrowRight size={16} />
              </button>

              <p style={{ fontFamily: "'Outfit', sans-serif", color: "#8AA493", fontSize: "0.7rem", textAlign: "center", marginTop: "1rem", lineHeight: 1.5 }}>
                <Shield size={10} style={{ display: "inline", marginRight: "4px" }} />
                No payment required now. Our team will contact you within 24 hours to confirm.
              </p>
            </form>
          )}

          {/* ── Trust Badges ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Heart size={14} color={COLORS.red} />
              <span style={{ fontSize: "0.7rem", color: "#8AA493" }}>Free cancellation up to 48h</span>
            </div>
            <div style={{ width: "1px", height: "12px", background: `${COLORS.cyan}20` }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Shield size={14} color={COLORS.cyan} />
              <span style={{ fontSize: "0.7rem", color: "#8AA493" }}>Safety guaranteed</span>
            </div>
            <div style={{ width: "1px", height: "12px", background: `${COLORS.cyan}20` }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Waves size={14} color={COLORS.lightCyan} />
              <span style={{ fontSize: "0.7rem", color: "#8AA493" }}>Eco-certified operator</span>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div style={{ marginTop: "3rem", lineHeight: 0, marginLeft: "-1.5rem", marginRight: "-1.5rem" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path fill={`${COLORS.cyan}06`} d="M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite"
                values="M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z;M0,55 C360,15 1080,70 1440,30 L1440,80 L0,80 Z;M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z" />
            </path>
            <path fill="#FAF5EA" d="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite"
                values="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z;M0,30 C360,65 1080,15 1440,55 L1440,80 L0,80 Z;M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}