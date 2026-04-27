import { Shield, AlertCircle, Compass, HeartHandshake, Binoculars, Award, CheckCircle, Users, Star, Quote, Waves, Camera, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

const safetyPoints = [
  {
    icon: <Shield size={20} />,
    title: "Coast Guard Certified",
    description: "All guides hold national water safety certifications and undergo rigorous annual training.",
    color: COLORS.cyan,
    bg: `${COLORS.cyan}08`,
    border: `${COLORS.cyan}15`,
    stat: "100%", 
    statLabel: "Certified staff",
  },
  {
    icon: <AlertCircle size={20} />,
    title: "Life Jackets for All",
    description: "Premium life jackets are mandatory for every participant. No exceptions, ever.",
    color: COLORS.lightCyan,
    bg: `${COLORS.lightCyan}08`,
    border: `${COLORS.lightCyan}15`,
    stat: "Always", 
    statLabel: "No exceptions",
  },
  {
    icon: <Binoculars size={20} />,
    title: "Safe Viewing Distance",
    description: "We maintain strict 20–30m distance from wildlife as per Sri Lanka Wildlife Conservation guidelines.",
    color: COLORS.navy,
    bg: `${COLORS.navy}06`,
    border: `${COLORS.navy}12`,
    stat: "20–30m", 
    statLabel: "Wildlife buffer",
  },
  {
    icon: <Compass size={20} />,
    title: "Pre-Tour Safety Briefing",
    description: "Every tour begins with a thorough 15-minute safety and wildlife ethics orientation.",
    color: COLORS.cyan,
    bg: `${COLORS.cyan}08`,
    border: `${COLORS.cyan}15`,
    stat: "15 min", 
    statLabel: "Full briefing",
  },
  {
    icon: <HeartHandshake size={20} />,
    title: "Emergency Protocols",
    description: "Satellite communication, first-aid kits, and emergency evacuation plans always in place.",
    color: COLORS.red,
    bg: `${COLORS.red}06`,
    border: `${COLORS.red}12`,
    stat: "24/7", 
    statLabel: "Emergency ready",
  },
  {
    icon: <Award size={20} />,
    title: "Zero Incident Record",
    description: "Proud of our perfect safety record across 500+ tours since our founding.",
    color: COLORS.lightCyan,
    bg: `${COLORS.lightCyan}08`,
    border: `${COLORS.lightCyan}15`,
    stat: "0", 
    statLabel: "Incidents ever",
  },
];

const touristStories = [
  { name: "Lisa & Family", location: "Germany", comment: "Our guide was amazing — super professional and made us feel completely safe. My teenage kids loved it!", rating: 5, age: "family" },
  { name: "Wilderness Collective", location: "USA", comment: "Best safety briefing we've ever had. Kayaks were top-notch and life jackets in perfect condition.", rating: 5, age: "group" },
  { name: "Priya & Raj", location: "India", comment: "As first-time kayakers, we were nervous. The team was patient, professional, and made us feel 100% secure.", rating: 5, age: "couple" },
];

const certifications = [
  { name: "Sri Lanka Tourism Authority", icon: "✓" },
  { name: "Wildlife Conservation Dept", icon: "✓" },
  { name: "ISO 9001:2021", icon: "✓" },
  { name: "Eco-Tourism Certified", icon: "✓" },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function SafetyCard({ point, index, inView }: { point: typeof safetyPoints[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        boxShadow: hovered
          ? `0 20px 40px rgba(0,0,0,0.08), 0 0 0 2px ${point.color}20`
          : "0 2px 12px rgba(0,0,0,0.04)",
        border: `1px solid ${hovered ? point.border : "rgba(27,58,107,0.08)"}`,
        transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
        transform: inView
          ? hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)"
          : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 0.07}s` : "0s",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "3px",
        background: `linear-gradient(90deg, ${point.color}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.3s",
      }} />

      {/* Header with icon and stat */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{
          width: "2.75rem", height: "2.75rem",
          borderRadius: "0.875rem",
          background: hovered ? point.bg : "rgba(27,58,107,0.04)",
          border: `1px solid ${hovered ? point.border : "rgba(27,58,107,0.06)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hovered ? point.color : COLORS.navy,
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.05) rotate(-2deg)" : "scale(1)",
        }}>
          {point.icon}
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: point.color,
            lineHeight: 1,
          }}>{point.stat}</div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.55rem",
            color: "#8AA493",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginTop: "2px",
          }}>{point.statLabel}</div>
        </div>
      </div>

      {/* Title */}
      <h4 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.15rem",
        fontWeight: 700,
        color: COLORS.navy,
        marginBottom: "0.5rem",
        lineHeight: 1.3,
      }}>
        {point.title}
      </h4>

      {/* Description */}
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "0.75rem",
        fontWeight: 300,
        color: "#6B7E73",
        lineHeight: 1.65,
        marginBottom: "1rem",
      }}>
        {point.description}
      </p>

      {/* Bottom check */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        paddingTop: "0.75rem",
        borderTop: `1px solid ${hovered ? point.border : "rgba(27,58,107,0.06)"}`,
        transition: "opacity 0.25s",
      }}>
        <CheckCircle size={12} color={point.color} />
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.65rem",
          fontWeight: 500,
          color: point.color,
        }}>Enforced on every tour</span>
      </div>
    </div>
  );
}

export function SafetySection() {
  const { ref: headerRef, inView: headerIn } = useInView(0.1);
  const { ref: cardsRef, inView: cardsIn } = useInView(0.08);
  const { ref: bannerRef, inView: bannerIn } = useInView(0.1);
  const [activeStory, setActiveStory] = useState(0);

  // Auto-rotate tourist stories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % touristStories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-12px) translateX(6px); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .cert-badge {
          transition: all 0.3s ease;
        }
        .cert-badge:hover {
          transform: translateY(-2px);
          background: rgba(0,180,216,0.12) !important;
          border-color: rgba(0,180,216,0.35) !important;
        }
        @media (max-width: 768px) {
          .safety-grid {
            grid-template-columns: 1fr !important;
          }
          .banner-content {
            flex-direction: column !important;
            text-align: center !important;
          }
        }
      `}</style>

      <section
        id="safety"
        style={{
          background: "#FAF5EA",
          padding: "5rem 1.5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background orbs */}
        <div style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `${COLORS.cyan}03`,
          filter: "blur(60px)",
          pointerEvents: "none",
          animation: "floatOrb 12s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%",
          left: "-8%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: `${COLORS.lightCyan}03`,
          filter: "blur(50px)",
          pointerEvents: "none",
          animation: "floatOrb 15s ease-in-out 2s infinite",
        }} />

        {/* Water dot pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, ${COLORS.cyan}06 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          opacity: 0.5,
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Header with Tourist Stats ── */}
          <div ref={headerRef} style={{ textAlign: "center", marginBottom: "3rem" }}>
            {/* Animated shield badge with red dot */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: `${COLORS.red}08`,
              border: `1px solid ${COLORS.red}15`,
              padding: "0.5rem 1.25rem",
              borderRadius: "3rem",
              marginBottom: "1.25rem",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: COLORS.red,
                animation: "pulseRing 2s infinite",
              }} />
              <Shield size={12} color={COLORS.red} />
              <span style={{ color: COLORS.red, fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
                Your Safety, Our Promise
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
              fontWeight: 700,
              color: COLORS.navy,
              lineHeight: 1.1,
              marginBottom: "0.5rem",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              Safety Without{" "}
              <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Compromise</span>
            </h2>

            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
              margin: "1rem 0 1.25rem",
              opacity: headerIn ? 1 : 0,
              transition: "opacity 0.6s ease 0.25s",
            }}>
              <div style={{ height: "1px", width: "48px", background: `${COLORS.cyan}30`, transformOrigin: "right", transform: headerIn ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.7s ease 0.45s" }} />
              <Waves size={14} color={COLORS.cyan} />
              <div style={{ height: "1px", width: "48px", background: `${COLORS.cyan}30`, transformOrigin: "left", transform: headerIn ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.7s ease 0.45s" }} />
            </div>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 300,
              fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
              color: "#6B7E73", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7,
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}>
              Adventure and safety go hand in hand. We've engineered every aspect
              of the experience with your wellbeing as our first priority.
            </p>
          </div>

          {/* ── Live Tourist Safety Score Banner ── */}
          <div
            style={{
              background: `linear-gradient(135deg, white, ${COLORS.cyan}04)`,
              borderRadius: "1.25rem",
              padding: "1rem 1.5rem",
              marginBottom: "2rem",
              border: `1px solid ${COLORS.cyan}12`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: "2.5rem", height: "2.5rem",
                borderRadius: "50%",
                background: `${COLORS.cyan}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Users size={18} color={COLORS.cyan} />
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", color: "#8AA493", letterSpacing: "1px" }}>TRUSTED BY TRAVELERS</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, color: COLORS.navy, fontFamily: "'Cormorant Garamond', serif" }}>
                  12,000+ <span style={{ fontSize: "0.75rem", color: COLORS.cyan }}>happy adventurers</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={COLORS.red} color={COLORS.red} />
              ))}
              <span style={{ fontSize: "0.75rem", color: COLORS.navy, fontWeight: 500 }}>4.98 ★ (2,134 reviews)</span>
            </div>
          </div>

          {/* ── Safety Cards Grid ── */}
          <div
            ref={cardsRef}
            className="safety-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
              marginBottom: "3rem",
            }}
          >
            {safetyPoints.map((point, i) => (
              <SafetyCard key={i} point={point} index={i} inView={cardsIn} />
            ))}
          </div>

          {/* ── Tourist Stories / Testimonials Section ── */}
          <div
            style={{
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `${COLORS.cyan}08`, padding: "0.25rem 1rem", borderRadius: "2rem", marginBottom: "0.75rem" }}>
                <Quote size={12} color={COLORS.cyan} />
                <span style={{ fontSize: "0.65rem", letterSpacing: "1px", color: COLORS.navy, fontWeight: 500 }}>Real Stories</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: COLORS.navy }}>
                What Travelers Say About{" "}
                <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Safety</span>
              </h3>
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0F2A4A 100%)`,
              borderRadius: "1.5rem",
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Animated wave overlay */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                  <path fill={COLORS.cyan} d="M0,96 C300,160 500,32 800,96 C1100,160 1200,64 1440,128 L1440,320 L0,320 Z" />
                </svg>
              </div>

              <div style={{ position: "relative", zIndex: 2 }}>
                {/* Rotating testimonial */}
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: "3rem", height: "3rem",
                    borderRadius: "50%",
                    background: `${COLORS.cyan}15`,
                    border: `2px solid ${COLORS.cyan}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: COLORS.cyan,
                  }}>
                    {touristStories[activeStory].name.charAt(0)}
                  </div>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.6,
                    maxWidth: "500px",
                    margin: "0 auto 1rem",
                    fontStyle: "italic",
                  }}>
                    "{touristStories[activeStory].comment}"
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "2px", marginBottom: "0.5rem" }}>
                    {[...Array(touristStories[activeStory].rating)].map((_, i) => (
                      <Star key={i} size={12} fill={COLORS.red} color={COLORS.red} />
                    ))}
                  </div>
                  <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.8rem" }}>
                    {touristStories[activeStory].name}
                  </div>
                  <div style={{ fontSize: "0.65rem", color: COLORS.lightCyan }}>
                    {touristStories[activeStory].location}
                  </div>

                  {/* Dot indicators */}
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}>
                    {touristStories.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStory(idx)}
                        style={{
                          width: activeStory === idx ? "1.5rem" : "0.4rem",
                          height: "0.25rem",
                          borderRadius: "0.25rem",
                          background: activeStory === idx ? COLORS.cyan : `${COLORS.cyan}40`,
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Trust & Certifications Banner ── */}
          <div
            ref={bannerRef}
            className="banner-content"
            style={{
              background: "white",
              borderRadius: "1.5rem",
              padding: "1.5rem",
              border: `1px solid ${COLORS.cyan}12`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              opacity: bannerIn ? 1 : 0,
              transform: bannerIn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: "3rem", height: "3rem",
                borderRadius: "1rem",
                background: `${COLORS.red}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Award size={20} color={COLORS.red} />
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", color: "#8AA493", letterSpacing: "1px" }}>OFFICIALLY LICENSED</div>
                <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: "1rem" }}>Sri Lanka Wildlife Authority</div>
                <div style={{ fontSize: "0.7rem", color: "#6B7E73" }}>Eco-tourism operator since 2016</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {certifications.map((cert, i) => (
                <div
                  key={cert.name}
                  className="cert-badge"
                  style={{
                    background: `${COLORS.cyan}06`,
                    border: `1px solid ${COLORS.cyan}15`,
                    padding: "0.5rem 1rem",
                    borderRadius: "2rem",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    cursor: "default",
                  }}
                >
                  <CheckCircle size={10} color={COLORS.cyan} />
                  <span style={{ fontSize: "0.7rem", color: COLORS.navy, fontWeight: 500 }}>{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div style={{ marginTop: "2.5rem", lineHeight: 0, marginLeft: "-1.5rem", marginRight: "-1.5rem" }}>
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