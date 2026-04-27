import { useState } from "react";
import { ChevronDown, HelpCircle, Mail, MessageCircle, Clock, Shield, Users, Camera, Sun, MapPin, Phone } from "lucide-react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

const faqs = [
  {
    q: "Do I need kayaking experience?",
    a: "Not at all! Wild Paddle is designed for complete beginners and seasoned paddlers alike. Our guides provide a full briefing and technique tutorial before every departure. If you can sit and hold a paddle, you're ready.",
    icon: <HelpCircle size={16} />,
  },
  {
    q: "Is it safe to be near wild elephants in a kayak?",
    a: "Safety is our top priority. We maintain a strict 20–30 meter distance from wildlife at all times, guided by Sri Lanka's Department of Wildlife Conservation protocols. Elephants are observed at their natural gathering spots where they're accustomed to the river environment. No incidents have occurred in our 500+ tours.",
    icon: <Shield size={16} />,
  },
  {
    q: "What should I wear and bring?",
    a: "Light, quick-dry clothing in neutral colours (avoid bright colours near wildlife). Sunscreen, insect repellent, a hat, and a waterproof bag for your camera. We provide all safety equipment. Leave your valuables at the hotel.",
    icon: <Camera size={16} />,
  },
  {
    q: "What if the elephants don't appear?",
    a: "We operate during peak elephant-gathering seasons (June–October) when sightings are virtually guaranteed near water sources. However, wildlife is wild — on the rare occasion of no sighting, we offer a complimentary rebooking or partial refund.",
    icon: <Sun size={16} />,
  },
  {
    q: "What time do tours depart?",
    a: "We offer early morning departures (6:00 AM) and late afternoon (3:30 PM). Morning tours catch mist on the water and golden light; afternoon tours often see larger elephant herds as they come to drink before sunset.",
    icon: <Clock size={16} />,
  },
  {
    q: "How far in advance should I book?",
    a: "We strongly recommend booking at least 2–4 weeks in advance, especially June–October when demand is highest. Group bookings of 5+ people should book 4–6 weeks ahead.",
    icon: <CalendarIcon size={16} />,
  },
  {
    q: "Is this suitable for children?",
    a: "Children aged 8 and above are welcome. All minors must be accompanied by an adult and wear a life jacket. We recommend the experience for adventurous families who want a unique wildlife encounter.",
    icon: <Users size={16} />,
  },
  {
    q: "Do you offer private tours?",
    a: "Yes! Private tours for couples, families, or groups of up to 8 are available at a premium. These can be customised for special occasions like proposals, anniversaries, or corporate team experiences.",
    icon: <MapPin size={16} />,
  },
];

// Calendar icon component
function CalendarIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .faq-item {
          transition: all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
        }
        .faq-item:hover {
          transform: translateY(-2px);
        }
        .faq-question {
          transition: all 0.2s ease;
        }
        @media (max-width: 768px) {
          .faq-header {
            padding: 1rem !important;
          }
          .faq-answer {
            padding: 0 1rem 1.25rem !important;
          }
          .contact-card {
            padding: 1.5rem !important;
          }
        }
      `}</style>

      <section
        id="faq"
        style={{
          background: "#FAF5EA",
          padding: "5rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div style={{
          position: "absolute",
          top: "5%",
          right: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `${COLORS.cyan}03`,
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
          background: `${COLORS.lightCyan}03`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }} />
        
        {/* Water dots pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, ${COLORS.cyan}06 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          opacity: 0.4,
        }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Header with Live Chat Stats ── */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
                animation: "pulseRing 2s infinite",
              }} />
              <HelpCircle size={12} color={COLORS.red} />
              <span style={{ color: COLORS.red, fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
                Got Questions?
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
              We Have{" "}
              <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Answers</span>
            </h2>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 300,
              fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
              color: "#6B7E73", maxWidth: "560px", margin: "1rem auto 0", lineHeight: 1.7,
            }}>
              Everything you need to know before your Wild Paddle adventure.
              Can't find what you're looking for? We're here to help 7 days a week.
            </p>
          </div>

          {/* ── Quick Stats Banner ── */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
            padding: "0.75rem 1.5rem",
            background: "white",
            borderRadius: "3rem",
            border: `1px solid ${COLORS.cyan}12`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MessageCircle size={14} color={COLORS.cyan} />
              <span style={{ fontSize: "0.75rem", color: COLORS.navy }}>Avg. response: 2 min</span>
            </div>
            <div style={{ width: "1px", height: "16px", background: `${COLORS.cyan}20` }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Users size={14} color={COLORS.lightCyan} />
              <span style={{ fontSize: "0.75rem", color: COLORS.navy }}>12,000+ questions answered</span>
            </div>
            <div style={{ width: "1px", height: "16px", background: `${COLORS.cyan}20` }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={14} color={COLORS.red} />
              <span style={{ fontSize: "0.75rem", color: COLORS.navy }}>24/7 Support</span>
            </div>
          </div>

          {/* ── FAQ Accordion ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.5rem" }}>
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="faq-item"
                  style={{
                    background: "white",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    boxShadow: isOpen
                      ? "0 8px 24px rgba(0,0,0,0.06)"
                      : "0 1px 4px rgba(0,0,0,0.04)",
                    border: isOpen
                      ? `1px solid ${COLORS.cyan}25`
                      : `1px solid ${COLORS.cyan}10`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="faq-question"
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
                      <div style={{
                        width: "2rem", height: "2rem",
                        borderRadius: "50%",
                        background: isOpen ? `${COLORS.cyan}10` : "rgba(27,58,107,0.04)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: isOpen ? COLORS.cyan : COLORS.navy,
                        transition: "all 0.2s ease",
                      }}>
                        {faq.icon}
                      </div>
                      <span
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: isOpen ? COLORS.cyan : COLORS.navy,
                          lineHeight: 1.4,
                          transition: "color 0.2s",
                        }}
                      >
                        {faq.q}
                      </span>
                    </div>
                    <div
                      style={{
                        width: "2rem", height: "2rem", flexShrink: 0,
                        borderRadius: "50%",
                        background: isOpen ? `${COLORS.cyan}10` : "rgba(27,58,107,0.04)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: isOpen ? COLORS.cyan : "#8AA493",
                        transition: "all 0.3s",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown size={14} />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      className="faq-answer"
                      style={{
                        padding: "0 1.5rem 1.5rem 4rem",
                        animation: "slideDown 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          height: "1px",
                          background: `${COLORS.cyan}15`,
                          marginBottom: "1rem",
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.85rem",
                          color: "#6B7E73",
                          lineHeight: 1.7,
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Contact Options Card ── */}
          <div
            className="contact-card"
            style={{
              background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0F2A4A 100%)`,
              borderRadius: "1.5rem",
              padding: "2rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background pattern */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}>
              <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                <path fill={COLORS.cyan} d="M0,96 C300,160 500,32 800,96 C1100,160 1200,64 1440,128 L1440,320 L0,320 Z" />
              </svg>
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{
                width: "3rem", height: "3rem",
                borderRadius: "50%",
                background: `${COLORS.cyan}15`,
                border: `1px solid ${COLORS.cyan}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1rem",
              }}>
                <MessageCircle size={18} color={COLORS.cyan} />
              </div>
              
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.5rem",
              }}>
                Still have questions?
              </h3>
              
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "1.5rem",
                maxWidth: "400px",
                marginLeft: "auto",
                marginRight: "auto",
              }}>
                Our team is available via WhatsApp, email, and phone 7 days a week.
              </p>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}>
                <a
                  href="mailto:hello@wildpaddle.lk"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: `${COLORS.cyan}15`,
                    color: COLORS.cyan,
                    textDecoration: "none",
                    padding: "0.6rem 1.25rem",
                    borderRadius: "3rem",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    fontFamily: "'Outfit', sans-serif",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.cyan}25`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${COLORS.cyan}15`; }}
                >
                  <Mail size={14} />
                  hello@wildpaddle.lk
                </a>
                <a
                  href="https://wa.me/94771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: `${COLORS.red}15`,
                    color: COLORS.red,
                    textDecoration: "none",
                    padding: "0.6rem 1.25rem",
                    borderRadius: "3rem",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    fontFamily: "'Outfit', sans-serif",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.red}25`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${COLORS.red}15`; }}
                >
                  <Phone size={14} />
                  WhatsApp +94 77 123 4567
                </a>
              </div>

              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.35)",
                marginTop: "1rem",
              }}>
                Typically replies within 5 minutes
              </p>
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