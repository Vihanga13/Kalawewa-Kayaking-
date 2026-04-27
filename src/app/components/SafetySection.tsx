import { Shield, AlertCircle, Compass, HeartHandshake, Binoculars, Award, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const safetyPoints = [
  {
    icon: <Shield size={22} />,
    title: "Coast Guard Certified",
    description: "All guides hold national water safety certifications and undergo rigorous annual training.",
    color: "#4CAF82",
    bg: "rgba(76,175,130,0.08)",
    border: "rgba(76,175,130,0.2)",
    stat: "100%", statLabel: "Certified staff",
  },
  {
    icon: <AlertCircle size={22} />,
    title: "Life Jackets for All",
    description: "Premium life jackets are mandatory for every participant. No exceptions, ever.",
    color: "#2196A8",
    bg: "rgba(33,150,168,0.08)",
    border: "rgba(33,150,168,0.2)",
    stat: "Always", statLabel: "No exceptions",
  },
  {
    icon: <Binoculars size={22} />,
    title: "Safe Viewing Distance",
    description: "We maintain strict 20–30m distance from wildlife as per Sri Lanka Wildlife Conservation guidelines.",
    color: "#E8935A",
    bg: "rgba(232,147,90,0.08)",
    border: "rgba(232,147,90,0.2)",
    stat: "20–30m", statLabel: "Wildlife buffer",
  },
  {
    icon: <Compass size={22} />,
    title: "Pre-Tour Safety Briefing",
    description: "Every tour begins with a thorough 15-minute safety and wildlife ethics orientation.",
    color: "#A78BDA",
    bg: "rgba(167,139,218,0.08)",
    border: "rgba(167,139,218,0.2)",
    stat: "15 min", statLabel: "Full briefing",
  },
  {
    icon: <HeartHandshake size={22} />,
    title: "Emergency Protocols",
    description: "Satellite communication, first-aid kits, and emergency evacuation plans always in place.",
    color: "#E06060",
    bg: "rgba(224,96,96,0.08)",
    border: "rgba(224,96,96,0.2)",
    stat: "24/7", statLabel: "Emergency ready",
  },
  {
    icon: <Award size={22} />,
    title: "Zero Incident Record",
    description: "Proud of our perfect safety record across 500+ tours since our founding in 2021.",
    color: "#E8A030",
    bg: "rgba(232,160,48,0.08)",
    border: "rgba(232,160,48,0.2)",
    stat: "0", statLabel: "Incidents ever",
  },
];

const badges = [
  { label: "DWLC Approved", icon: "✓" },
  { label: "ISO Certified",  icon: "✓" },
  { label: "Eco-Tourism SL", icon: "✓" },
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
        background: "#fff",
        borderRadius: "22px",
        padding: "32px 30px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        boxShadow: hovered
          ? `0 20px 52px rgba(28,61,46,0.12), 0 0 0 1px ${point.color}28`
          : "0 3px 18px rgba(28,61,46,0.06)",
        border: `1px solid ${hovered ? point.border : "rgba(45,106,79,0.08)"}`,
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s",
        transform: inView
          ? hovered ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)"
          : "translateY(40px) scale(0.97)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 0.09}s` : "0s",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "3px",
        background: `linear-gradient(90deg, ${point.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      {/* Icon row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{
          width: "50px", height: "50px",
          borderRadius: "15px",
          background: hovered ? point.bg : "rgba(45,106,79,0.06)",
          border: `1px solid ${hovered ? point.border : "rgba(45,106,79,0.08)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hovered ? point.color : "#5A7264",
          transition: "background 0.3s, color 0.3s, border-color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
          flexShrink: 0,
        }}>
          {point.icon}
        </div>

        {/* Stat badge */}
        <div style={{
          textAlign: "right",
          opacity: hovered ? 1 : 0.45,
          transition: "opacity 0.3s",
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "20px",
            fontWeight: 700,
            color: point.color,
            lineHeight: 1,
          }}>{point.stat}</div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "9px",
            color: "#9AADA0",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginTop: "2px",
          }}>{point.statLabel}</div>
        </div>
      </div>

      {/* Text */}
      <h4 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "20px",
        fontWeight: 700,
        color: "#1C3D2E",
        marginBottom: "8px",
        lineHeight: 1.25,
        transition: "color 0.2s",
      }}>
        {point.title}
      </h4>
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "13.5px",
        fontWeight: 300,
        color: "#6B8B79",
        lineHeight: 1.72,
      }}>
        {point.description}
      </p>

      {/* Bottom divider + check */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: "20px",
        paddingTop: "16px",
        borderTop: `1px solid ${hovered ? point.border : "rgba(45,106,79,0.07)"}`,
        transition: "border-color 0.3s",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(6px)",
        transition2: "opacity 0.25s, transform 0.25s",
      } as React.CSSProperties}>
        <CheckCircle size={14} color={point.color} />
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          color: point.color,
          letterSpacing: "0.5px",
        }}>Verified & enforced on every tour</span>
      </div>
    </div>
  );
}

export function SafetySection() {
  const { ref: headerRef, inView: headerIn } = useInView(0.1);
  const { ref: cardsRef, inView: cardsIn } = useInView(0.08);
  const { ref: bannerRef, inView: bannerIn } = useInView(0.1);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(10px,-14px) scale(1.04); }
        }
        @keyframes shieldPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(76,175,130,0.3); }
          50%       { box-shadow: 0 0 0 10px rgba(76,175,130,0); }
        }
        @keyframes badgeSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .safety-badge {
          transition: background 0.25s, border-color 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .safety-badge:hover {
          background: rgba(126,200,164,0.22) !important;
          border-color: rgba(126,200,164,0.5) !important;
          transform: translateY(-2px);
        }
      `}</style>

      <section
        id="safety"
        style={{ backgroundColor: "#E8F4EC", padding: "110px 24px 0", position: "relative", overflow: "hidden" }}
      >
        {/* Background orbs */}
        <div style={{ position: "absolute", top: "60px", right: "-100px", width: "360px", height: "360px", borderRadius: "50%", background: "rgba(76,175,130,0.06)", filter: "blur(90px)", animation: "floatOrb 11s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "180px", left: "-80px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(33,150,168,0.05)", filter: "blur(70px)", animation: "floatOrb 14s ease-in-out 2s infinite", pointerEvents: "none" }} />

        {/* Subtle cross-hatch pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(45,106,79,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,106,79,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

          {/* ── Header ── */}
          <div ref={headerRef} style={{ textAlign: "center", marginBottom: "68px" }}>

            {/* Animated shield badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "rgba(45,106,79,0.1)",
              border: "1px solid rgba(45,106,79,0.22)",
              padding: "10px 26px", borderRadius: "50px",
              marginBottom: "24px",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%",
                background: "rgba(76,175,130,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "shieldPulse 2.5s ease-in-out infinite",
              }}>
                <Shield size={14} color="#2D6A4F" />
              </div>
              <span style={{ color: "#2D6A4F", fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase" }}>
                Safety First, Always
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(34px, 5.5vw, 62px)",
              fontWeight: 700, color: "#1C3D2E", lineHeight: 1.1,
              marginBottom: "6px",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              Your Safety is Our{" "}
              <span style={{ color: "#2D6A4F", fontStyle: "italic" }}>Priority</span>
            </h2>

            {/* Decorative divider */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
              margin: "18px 0 20px",
              opacity: headerIn ? 1 : 0,
              transition: "opacity 0.6s ease 0.25s",
            }}>
              <div style={{ height: "1px", width: "52px", background: "rgba(45,106,79,0.22)", transformOrigin: "right", transform: headerIn ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.7s ease 0.5s" }} />
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4CAF82", opacity: 0.7 }} />
              <div style={{ height: "1px", width: "52px", background: "rgba(45,106,79,0.22)", transformOrigin: "left", transform: headerIn ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.7s ease 0.5s" }} />
            </div>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 300,
              fontSize: "clamp(14px, 1.8vw, 17px)",
              color: "#5A7264", maxWidth: "520px", margin: "0 auto", lineHeight: 1.82,
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.22s, transform 0.7s ease 0.22s",
            }}>
              Adventure and safety aren't opposites — they go hand in hand.
              We've engineered every aspect of the experience with your wellbeing in mind.
            </p>
          </div>

          {/* ── Safety Cards ── */}
          <div
            ref={cardsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "18px",
              marginBottom: "52px",
            }}
          >
            {safetyPoints.map((point, i) => (
              <SafetyCard key={i} point={point} index={i} inView={cardsIn} />
            ))}
          </div>

          {/* ── Trust Banner ── */}
          <div
            ref={bannerRef}
            style={{
              background: "linear-gradient(135deg, #1C3D2E 0%, #1a4a38 50%, #1e3d4f 100%)",
              borderRadius: "28px",
              padding: "clamp(28px, 4vw, 48px) clamp(28px, 5vw, 56px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "28px",
              position: "relative",
              overflow: "hidden",
              opacity: bannerIn ? 1 : 0,
              transform: bannerIn ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Glow orbs inside banner */}
            <div style={{ position: "absolute", top: "-50px", right: "200px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(76,175,130,0.12), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-30px", left: "120px", width: "150px", height: "150px", borderRadius: "50%", background: "radial-gradient(circle, rgba(33,150,168,0.1), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(126,200,164,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(126,200,164,0.03) 1px, transparent 1px)", backgroundSize: "36px 36px", pointerEvents: "none", borderRadius: "28px" }} />

            {/* Left text */}
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4CAF82", animation: "shieldPulse 2s infinite" }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, color: "#7EC8A4", letterSpacing: "2.5px", textTransform: "uppercase" }}>Officially Licensed</span>
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(20px, 3vw, 28px)",
                fontWeight: 700, color: "#fff", marginBottom: "8px", lineHeight: 1.2,
              }}>
                Trusted by Sri Lanka Wildlife Authority
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>
                Officially licensed & accredited eco-tourism operator since 2021
              </p>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", position: "relative" }}>
              {badges.map((badge, i) => (
                <div
                  key={badge.label}
                  className="safety-badge"
                  style={{
                    background: "rgba(126,200,164,0.1)",
                    border: "1px solid rgba(126,200,164,0.25)",
                    padding: "12px 20px",
                    borderRadius: "50px",
                    display: "flex", alignItems: "center", gap: "8px",
                    cursor: "default",
                    opacity: bannerIn ? 1 : 0,
                    animation: bannerIn ? `badgeSlideIn 0.5s ease ${0.3 + i * 0.1}s both` : "none",
                  }}
                >
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(126,200,164,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#7EC8A4", fontSize: "10px", fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ color: "#7EC8A4", fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 500, letterSpacing: "0.3px" }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated wave */}
        <div style={{ marginTop: "90px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path fill="rgba(76,175,130,0.12)" d="M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite"
                values="M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z;M0,55 C360,15 1080,70 1440,30 L1440,80 L0,80 Z;M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z" />
            </path>
            <path fill="#1C3D2E" d="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite"
                values="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z;M0,30 C360,65 1080,15 1440,55 L1440,80 L0,80 Z;M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}