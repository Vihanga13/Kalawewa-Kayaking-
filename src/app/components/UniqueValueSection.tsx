import { X, Check, Leaf, Zap, Waves, Compass, Shield, Eye, Droplet, Users, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

const comparisons = [
  {
    con: "Loud engines disturb wildlife",
    pro: "Silent approach — zero engine noise",
  },
  {
    con: "Fixed viewpoints, limited access",
    pro: "Access secret river corridors",
  },
  {
    con: "Carbon-heavy 4WD safari jeeps",
    pro: "Zero emissions, pure eco-travel",
  },
  {
    con: "Crowded with many tourists",
    pro: "Intimate, small group only (max 8)",
  },
  {
    con: "Animals often run or hide",
    pro: "Elephants behave completely naturally",
  },
  {
    con: "Same routes, same experience",
    pro: "Every trip is unique & unrepeatable",
  },
];

// Tourist testimonials for immersive feel
const touristMoments = [
  { name: "Lisa & Team", location: "Germany", quote: "We were 15 meters from a bathing elephant family. They didn't even glance at us — pure magic.", avatar: "🇩🇪" },
  { name: "Raj & Priya", location: "India", quote: "Finally a wildlife experience that respects animals. Our guide knew every elephant by name.", avatar: "🇮🇳" },
  { name: "Wilderness Collective", location: "USA", quote: "Best thing we did in Sri Lanka. Sunrise kayak with mist rising — unforgettable.", avatar: "🇺🇸" },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface UniqueValueSectionProps {
  jungleImg: string;
  elephantImg: string;
}

export function UniqueValueSection({ jungleImg, elephantImg }: UniqueValueSectionProps) {
  const { ref: headerRef, inView: headerIn } = useInView(0.1);
  const { ref: tableRef, inView: tableIn } = useInView(0.1);
  const { ref: imgsRef, inView: imgsIn } = useInView(0.1);
  const { ref: momentsRef, inView: momentsIn } = useInView(0.1);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [imgHover, setImgHover] = useState<number | null>(null);
  const [activeMoment, setActiveMoment] = useState(0);

  // Auto-rotate tourist moments
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMoment((prev) => (prev + 1) % touristMoments.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ripplePulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15px, -20px) scale(1.05); }
          66% { transform: translate(-10px, 12px) scale(0.97); }
        }
        @keyframes shimmerLine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes waveSway {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-8px) translateY(5px); }
        }
        @keyframes waterRise {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .uv-row {
          transition: background 0.22s, transform 0.22s;
        }
        .uv-row:hover {
          background: rgba(0,180,216,0.04);
          transform: scaleX(1.002);
        }
        .uv-img-card {
          transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
        }
        .uv-img-card:hover {
          transform: scale(1.02) translateY(-6px);
          box-shadow: 0 32px 60px rgba(0,0,0,0.3);
        }
        @media (max-width: 768px) {
          .comparison-grid {
            grid-template-columns: 1fr !important;
          }
          .vs-divider {
            display: none;
          }
          .comparison-row {
            grid-template-columns: 1fr !important;
            gap: 0.75rem;
            margin-bottom: 1rem;
          }
          .con-side, .pro-side {
            border-radius: 1rem !important;
          }
        }
      `}</style>

      <section
        id="unique-value"
        style={{
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0F2A4A 100%)`,
          padding: "5rem 1.5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background animated orbs - water/cyan theme */}
        <div style={{ position: "absolute", top: "80px", left: "-120px", width: "380px", height: "380px", borderRadius: "50%", background: `${COLORS.cyan}06`, filter: "blur(80px)`, animation: 'floatOrb 14s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "200px", right: "-100px", width: "320px", height: "320px", borderRadius: "50%", background: `${COLORS.lightCyan}05`, filter: "blur(70px)`, animation: 'floatOrb 18s ease-in-out 4s infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", left: "20%", width: "200px", height: "200px", borderRadius: "50%", background: `${COLORS.red}03`, filter: "blur(60px)`, animation: 'floatOrb 12s ease-in-out 2s infinite", pointerEvents: "none" }} />

        {/* Water ripple effects */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${10 + (i * 9)}%`,
              bottom: `${20 + (i * 5)}%`,
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: `1px solid ${COLORS.cyan}10`,
              animation: `ripplePulse ${4 + i * 0.5}s infinite`,
              animationDelay: `${i * 0.5}s`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Decorative wave lines at top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", opacity: 0.3 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path fill="none" stroke={COLORS.cyan} strokeWidth="0.5" d="M0,30 C300,10 600,50 900,30 C1200,10 1350,40 1440,25" />
            <path fill="none" stroke={COLORS.lightCyan} strokeWidth="0.3" d="M0,40 C250,20 550,60 850,35 C1150,10 1320,50 1440,30" />
          </svg>
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Header with tourist connection ── */}
          <div ref={headerRef} style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: `${COLORS.cyan}12`,
                color: COLORS.cyan,
                padding: "0.5rem 1.5rem",
                borderRadius: "50px",
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
                border: `1px solid ${COLORS.cyan}25`,
                marginBottom: "1.5rem",
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <Zap size={12} color={COLORS.cyan} />
              What Travelers Say
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5.5vw, 3.8rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "1rem",
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(22px)",
                transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
              }}
            >
              Beyond the{" "}
              <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Ordinary Safari</span>
            </h2>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 300,
                color: "rgba(255,255,255,0.65)", fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
                maxWidth: "560px", margin: "0 auto", lineHeight: 1.7,
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.7s ease 0.22s, transform 0.7s ease 0.22s",
              }}
            >
              Traditional safaris take you close.{" "}
              <em style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Wild Paddle takes you into</em>{" "}
              the heart of elephant country — silently, respectfully, memorably.
            </p>
          </div>

          {/* ── Immersive Tourist Moment Banner ── */}
          <div
            ref={momentsRef}
            style={{
              background: `linear-gradient(135deg, ${COLORS.navy}80, ${COLORS.navy}40)`,
              backdropFilter: "blur(12px)",
              borderRadius: "1.5rem",
              padding: "1.5rem 2rem",
              marginBottom: "3rem",
              border: `1px solid ${COLORS.cyan}20`,
              opacity: momentsIn ? 1 : 0,
              transform: momentsIn ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: "1" }}>
                <div style={{
                  width: "3rem", height: "3rem", borderRadius: "3rem",
                  background: `${COLORS.cyan}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem",
                }}>
                  {touristMoments[activeMoment].avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    {touristMoments[activeMoment].name}
                    <span style={{ fontSize: "0.7rem", color: COLORS.lightCyan }}>• {touristMoments[activeMoment].location}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", marginTop: "0.25rem", fontStyle: "italic", maxWidth: "500px" }}>
                    "{touristMoments[activeMoment].quote}"
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {touristMoments.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMoment(idx)}
                    style={{
                      width: activeMoment === idx ? "2rem" : "0.5rem",
                      height: "0.25rem",
                      borderRadius: "0.25rem",
                      background: activeMoment === idx ? COLORS.cyan : `${COLORS.cyan}40`,
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Comparison Table (Mobile Responsive) ── */}
          <div ref={tableRef} style={{ marginBottom: "4rem" }}>

            {/* Column headers - hidden on mobile, shown as labels inside cards */}
            <div className="comparison-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "0",
              marginBottom: "4px",
              opacity: tableIn ? 1 : 0,
              transition: "opacity 0.6s ease 0.1s",
            }}>
              {/* Traditional Safari Header - hide on mobile, show as inline labels */}
              <div className="traditional-header" style={{
                background: `${COLORS.red}08`,
                border: `1px solid ${COLORS.red}20`,
                borderBottom: "none",
                borderRadius: "1.25rem 1.25rem 0 0",
                padding: "1rem 1.5rem",
              }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${COLORS.red}15`, border: `1px solid ${COLORS.red}30`, borderRadius: "50px", padding: "0.25rem 0.75rem", marginBottom: "6px" }}>
                  <X size={10} color={COLORS.red} />
                  <span style={{ color: COLORS.red, fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Traditional</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Jeep Safari</h3>
              </div>

              {/* VS divider */}
              <div className="vs-divider" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 1rem", zIndex: 2 }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: COLORS.navy, border: `2px solid ${COLORS.cyan}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", fontWeight: 700, color: COLORS.cyan, letterSpacing: "0.5px" }}>VS</span>
                </div>
              </div>

              {/* Wild Paddle Header */}
              <div className="paddle-header" style={{
                background: `linear-gradient(135deg, ${COLORS.cyan}08, ${COLORS.lightCyan}05)`,
                border: `1px solid ${COLORS.cyan}25`,
                borderBottom: "none",
                borderRadius: "1.25rem 1.25rem 0 0",
                padding: "1rem 1.5rem",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)`, overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, width: "60%", background: "rgba(255,255,255,0.3)", animation: "shimmerLine 2.5s ease-in-out infinite" }} />
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${COLORS.cyan}15`, border: `1px solid ${COLORS.cyan}35`, borderRadius: "50px", padding: "0.25rem 0.75rem", marginBottom: "6px" }}>
                  <Leaf size={10} color={COLORS.cyan} />
                  <span style={{ color: COLORS.cyan, fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Wild Paddle</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#fff", fontWeight: 600 }}>Kayak Safari</h3>
              </div>
            </div>

            {/* Rows */}
            <div style={{ borderRadius: "0 0 1.25rem 1.25rem", overflow: "hidden" }}>
              {comparisons.map((row, i) => (
                <div
                  key={i}
                  className="uv-row comparison-row"
                  onMouseEnter={() => setActiveRow(i)}
                  onMouseLeave={() => setActiveRow(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    gap: "0",
                    borderBottom: i < comparisons.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    opacity: tableIn ? 1 : 0,
                    transform: tableIn ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.55s ease ${0.15 + i * 0.07}s, transform 0.55s ease ${0.15 + i * 0.07}s`,
                  }}
                >
                  {/* Con side */}
                  <div className="con-side" style={{
                    background: activeRow === i ? `${COLORS.red}08` : `${COLORS.red}04`,
                    border: `1px solid ${COLORS.red}12`,
                    borderTop: "none", borderRight: "none",
                    padding: "1rem 1.25rem",
                    display: "flex", alignItems: "center", gap: "12px",
                    transition: "background 0.2s",
                  }}>
                    <div style={{
                      width: "1.75rem", height: "1.75rem", borderRadius: "50%",
                      background: `${COLORS.red}15`,
                      border: `1px solid ${COLORS.red}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: activeRow === i ? "scale(1.1)" : "scale(1)",
                    }}>
                      <X size={10} color={COLORS.red} />
                    </div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.45 }}>
                      {row.con}
                    </span>
                  </div>

                  {/* Center line */}
                  <div className="vs-divider-mobile" style={{ width: "1px", background: `${COLORS.cyan}15`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {activeRow === i && (
                      <div style={{ position: "absolute", width: "6px", height: "6px", borderRadius: "50%", background: COLORS.cyan }} />
                    )}
                  </div>

                  {/* Pro side */}
                  <div className="pro-side" style={{
                    background: activeRow === i ? `${COLORS.cyan}08` : `${COLORS.cyan}04`,
                    border: `1px solid ${COLORS.cyan}15`,
                    borderTop: "none", borderLeft: "none",
                    padding: "1rem 1.25rem",
                    display: "flex", alignItems: "center", gap: "12px",
                    transition: "background 0.2s",
                  }}>
                    <div style={{
                      width: "1.75rem", height: "1.75rem", borderRadius: "50%",
                      background: `${COLORS.cyan}20`,
                      border: `1px solid ${COLORS.cyan}35`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: activeRow === i ? "scale(1.15)" : "scale(1)",
                    }}>
                      <Check size={10} color={COLORS.cyan} />
                    </div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "0.8rem", color: activeRow === i ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.7)", lineHeight: 1.45, transition: "color 0.2s" }}>
                      {row.pro}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Image Strip with Tourist Connection ── */}
          <div
            ref={imgsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              marginBottom: "4rem",
            }}
          >
            {[
              { img: jungleImg, label: "Secret River Corridors", sub: "Where elephants come to drink", icon: <Waves size={18} color={COLORS.cyan} />, delay: 0 },
              { img: elephantImg, label: "Wild Encounters", sub: "As close as nature allows", icon: <Eye size={18} color={COLORS.lightCyan} />, delay: 0.12 },
            ].map((item, i) => (
              <div
                key={i}
                className="uv-img-card"
                onMouseEnter={() => setImgHover(i)}
                onMouseLeave={() => setImgHover(null)}
                style={{
                  height: "320px",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "default",
                  opacity: imgsIn ? 1 : 0,
                  transform: imgsIn ? "translateY(0)" : "translateY(36px)",
                  transition: `opacity 0.65s ease ${item.delay}s, transform 0.65s ease ${item.delay}s`,
                }}
              >
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.6s ease",
                  transform: imgHover === i ? "scale(1.06)" : "scale(1)",
                }} />

                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${COLORS.navy}CC 0%, ${COLORS.navy}22 55%, transparent 100%)` }} />

                {/* Border glow */}
                <div style={{
                  position: "absolute", inset: 0,
                  borderRadius: "1.5rem",
                  border: `1px solid ${imgHover === i ? `${COLORS.cyan}50` : `${COLORS.cyan}15`}`,
                  transition: "border-color 0.3s",
                  pointerEvents: "none",
                }} />

                {/* Content */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    background: `${COLORS.cyan}15`,
                    border: `1px solid ${COLORS.cyan}25`,
                    borderRadius: "50px",
                    padding: "0.25rem 0.75rem",
                    width: "fit-content",
                    marginBottom: "0.75rem",
                  }}>
                    {item.icon}
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", fontWeight: 600, color: COLORS.cyan, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                      {item.sub}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Call to Action Banner ── */}
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.cyan}15, ${COLORS.navy}40)`,
              borderRadius: "2rem",
              padding: "2rem",
              textAlign: "center",
              marginBottom: "2rem",
              border: `1px solid ${COLORS.cyan}20`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <Users size={20} color={COLORS.lightCyan} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "2px", color: COLORS.lightCyan, textTransform: "uppercase", fontWeight: 600 }}>Join 12,000+ Happy Adventurers</span>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.2rem, 3vw, 1.5rem)", color: "#fff", marginBottom: "0.5rem" }}>
              Ready for the <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>experience of a lifetime?</span>
            </h3>
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.lightCyan})`,
                border: "none",
                padding: "0.75rem 2rem",
                borderRadius: "3rem",
                color: COLORS.navy,
                fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 20px ${COLORS.cyan}40`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Book Your Kayak Safari <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Animated bottom wave */}
        <div style={{ marginTop: "3rem", lineHeight: 0, marginLeft: "-1.5rem", marginRight: "-1.5rem" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path fill={COLORS.cyan} fillOpacity="0.08" d="M0,50 C400,10 900,70 1440,30 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite"
                values="M0,50 C400,10 900,70 1440,30 L1440,80 L0,80 Z;M0,30 C400,70 900,15 1440,55 L1440,80 L0,80 Z;M0,50 C400,10 900,70 1440,30 L1440,80 L0,80 Z" />
            </path>
            <path fill="#FAF5EA" d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite"
                values="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z;M0,30 C360,80 1080,10 1440,55 L1440,80 L0,80 Z;M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}