import { Star, Waves, ArrowLeft, ArrowRight, Award } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const COLORS = {
  navy: "#1B3A6B",
  navyDeep: "#0F2244",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
  cream: "#FAF5EA",
  creamDark: "#EDE8D5",
};

interface Testimonial {
  name: string;
  origin: string;
  flag: string;
  rating: number;
  text: string;
  avatar: string;
  trip: string;
  platform: "TripAdvisor" | "Google";
  date: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Emma Thompson",
    origin: "London, UK",
    flag: "🇬🇧",
    rating: 5,
    text: "We paddled within 20 metres of a family of elephants. The guides were knowledgeable, deeply respectful of the animals, and the whole experience felt utterly wild. Best wildlife moment of my life — and I've been on safari in four continents.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    trip: "Sunrise Kayak Safari",
    platform: "TripAdvisor",
    date: "March 2024",
  },
  {
    name: "Rajiv Mehta",
    origin: "Mumbai, India",
    flag: "🇮🇳",
    rating: 5,
    text: "Silent kayaking makes all the difference — the elephants simply didn't notice us. We saw over 30 elephants including six babies playing at the water's edge. I've replayed this morning in my head every day since. Unforgettable.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    trip: "Wild Elephant Encounter",
    platform: "Google",
    date: "February 2024",
  },
  {
    name: "Sarah Chen",
    origin: "Singapore",
    flag: "🇸🇬",
    rating: 5,
    text: "As a solo female traveller I was a little nervous, but the team made me feel completely safe and genuinely welcomed from the very first moment. The sunrise paddle was pure, silent magic — steam rising off the water, elephants moving through the mist.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    trip: "Private Tour",
    platform: "TripAdvisor",
    date: "January 2024",
  },
  {
    name: "Michael & Lisa",
    origin: "Melbourne, Australia",
    flag: "🇦🇺",
    rating: 5,
    text: "The single best thing we did in Sri Lanka. Our guide knew every elephant by name and shared decades of stories about the herd. The kayaks were top quality, the briefing was thorough, and the whole operation felt genuinely world-class.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop",
    trip: "Group Safari",
    platform: "Google",
    date: "December 2023",
  },
];

const stats = [
  { value: "12,000+", label: "Adventurers" },
  { value: "4.98", label: "Avg Rating" },
  { value: "98%", label: "Return Rate" },
  { value: "0", label: "Incidents" },
];

function StarRow({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          fill={s <= rating ? COLORS.red : "transparent"}
          color={s <= rating ? COLORS.red : "rgba(255,255,255,0.2)"}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (fading || idx === active) return;
      setFading(true);
      setTimeout(() => {
        setActive(idx);
        setFading(false);
      }, 320);
    },
    [active, fading]
  );

  const next = () => goTo((active + 1) % testimonials.length);
  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [active]);

  const t = testimonials[active];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes waveShift {
          0%,100% { d: path("M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z"); }
          50%      { d: path("M0,55 C360,15 1080,70 1440,30 L1440,80 L0,80 Z"); }
        }
        @keyframes pulseOrb {
          0%,100% { transform: scale(1); opacity: 0.5; }
          50%      { transform: scale(1.08); opacity: 0.8; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .nav-thumb {
          transition: all 0.35s cubic-bezier(0.34, 1.2, 0.64, 1);
          cursor: pointer;
        }
        .nav-thumb:hover { transform: scale(1.12); }
        .arrow-btn {
          transition: all 0.25s ease;
          cursor: pointer;
          background: none;
          border: none;
        }
        .arrow-btn:hover { transform: scale(1.1); }
        .stat-pill {
          transition: background 0.25s ease;
        }
        .stat-pill:hover { background: rgba(0,180,216,0.12) !important; }
        @media (max-width: 860px) {
          .stage-wrap { flex-direction: column !important; min-height: unset !important; }
          .stage-left { width: 100% !important; min-height: 280px !important; padding: 2.5rem 1.75rem !important; }
          .stage-right { padding: 2.5rem 1.75rem 2rem !important; }
          .quote-text { font-size: clamp(1.3rem, 5vw, 1.75rem) !important; }
          .stats-row { flex-wrap: wrap !important; gap: 0.5rem !important; }
        }
      `}</style>

      <section
        id="testimonials"
        style={{ background: COLORS.cream, position: "relative", overflow: "hidden" }}
      >
        {/* Subtle dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, ${COLORS.cyan}08 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 1.5rem", position: "relative", zIndex: 2 }}>

          {/* ── Section header ── */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", fontWeight: 700,
                letterSpacing: "3px", textTransform: "uppercase", color: COLORS.cyan, marginBottom: "0.5rem",
              }}>
                Real Voices
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 700, color: COLORS.navy, lineHeight: 1.05,
              }}>
                Stories from the{" "}
                <span style={{ fontStyle: "italic", color: COLORS.lightCyan }}>water</span>
              </h2>
            </div>

            {/* Stats strip */}
            <div className="stats-row" style={{ display: "flex", gap: "0.75rem" }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="stat-pill"
                  style={{
                    padding: "0.5rem 1rem",
                    background: "white",
                    border: `1px solid ${COLORS.cyan}18`,
                    borderRadius: "3rem",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: COLORS.navy, lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.55rem", color: "#8AA493", letterSpacing: "0.5px", marginTop: "2px" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── STAGE ── */}
          <div
            className="stage-wrap"
            style={{
              display: "flex",
              minHeight: "420px",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(15,34,68,0.14)",
            }}
          >
            {/* LEFT — Profile panel */}
            <div
              className="stage-left"
              style={{
                width: "300px",
                flexShrink: 0,
                background: `linear-gradient(160deg, ${COLORS.navyDeep} 0%, ${COLORS.navy} 100%)`,
                padding: "3rem 2.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Spinning ring deco */}
              <div style={{
                position: "absolute", bottom: "-40px", right: "-40px",
                width: "160px", height: "160px",
                border: `1px solid ${COLORS.cyan}18`,
                borderRadius: "50%",
                animation: "spinSlow 30s linear infinite",
              }} />
              <div style={{
                position: "absolute", bottom: "-20px", right: "-20px",
                width: "100px", height: "100px",
                border: `1px solid ${COLORS.cyan}12`,
                borderRadius: "50%",
                animation: "spinSlow 20s linear infinite reverse",
              }} />

              {/* Orb glow */}
              <div style={{
                position: "absolute", top: "30%", left: "-30%",
                width: "200px", height: "200px",
                borderRadius: "50%",
                background: `${COLORS.cyan}08`,
                filter: "blur(40px)",
                animation: "pulseOrb 5s ease-in-out infinite",
                pointerEvents: "none",
              }} />

              {/* Top: platform badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "0.3rem 0.75rem",
                borderRadius: "3rem",
                width: "fit-content",
              }}>
                <Award size={10} color={COLORS.lightCyan} />
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: "0.58rem",
                  fontWeight: 600, letterSpacing: "1px",
                  color: COLORS.lightCyan, textTransform: "uppercase",
                  opacity: fading ? 0 : 1, transition: "opacity 0.32s ease",
                }}>
                  {t.platform}
                </span>
              </div>

              {/* Center: Avatar + identity */}
              <div
                style={{
                  opacity: fading ? 0 : 1,
                  transform: fading ? "translateY(8px)" : "translateY(0)",
                  transition: "all 0.32s ease",
                  flex: 1, display: "flex", flexDirection: "column",
                  justifyContent: "center", gap: "1.25rem",
                  paddingTop: "1.5rem",
                }}
              >
                {/* Avatar with ring */}
                <div style={{ position: "relative", width: "fit-content" }}>
                  <div style={{
                    width: "5rem", height: "5rem",
                    borderRadius: "50%",
                    border: `3px solid ${COLORS.cyan}50`,
                    overflow: "hidden",
                  }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  {/* Verified dot */}
                  <div style={{
                    position: "absolute", bottom: "2px", right: "2px",
                    width: "14px", height: "14px",
                    borderRadius: "50%",
                    background: COLORS.cyan,
                    border: "2px solid #0F2244",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "white" }} />
                  </div>
                </div>

                <div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.4rem", fontWeight: 700,
                    color: "#ffffff", lineHeight: 1.1, marginBottom: "0.3rem",
                  }}>
                    {t.name}
                  </p>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.72rem", color: "rgba(255,255,255,0.45)",
                    marginBottom: "0.75rem",
                  }}>
                    {t.flag} {t.origin}
                  </p>
                  <StarRow rating={t.rating} />
                </div>

                {/* Trip tag */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  background: `${COLORS.red}20`,
                  border: `1px solid ${COLORS.red}30`,
                  padding: "0.3rem 0.75rem",
                  borderRadius: "3rem",
                  width: "fit-content",
                }}>
                  <Waves size={10} color={COLORS.lightCyan} />
                  <span style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem",
                    fontWeight: 600, color: COLORS.lightCyan, letterSpacing: "0.5px",
                  }}>
                    {t.trip}
                  </span>
                </div>
              </div>

              {/* Date */}
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem",
                color: "rgba(255,255,255,0.2)", letterSpacing: "1px",
                opacity: fading ? 0 : 1, transition: "opacity 0.32s ease",
                position: "relative", zIndex: 1,
              }}>
                {t.date}
              </p>
            </div>

            {/* RIGHT — Quote panel */}
            <div
              className="stage-right"
              style={{
                flex: 1,
                background: "white",
                padding: "3rem 3.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Giant decorative quote mark */}
              <span style={{
                position: "absolute",
                top: "-0.5rem",
                left: "2rem",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "12rem",
                lineHeight: 1,
                color: `${COLORS.cyan}07`,
                pointerEvents: "none",
                userSelect: "none",
                fontWeight: 700,
              }}>
                "
              </span>

              {/* Review count top-right */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.3rem 0.75rem",
                  background: COLORS.cream,
                  border: `1px solid ${COLORS.cyan}15`,
                  borderRadius: "3rem",
                }}>
                  {[1,2,3,4,5].map(s=>(
                    <Star key={s} size={10} fill={COLORS.red} color={COLORS.red} />
                  ))}
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", color: "#8AA493", marginLeft: "4px" }}>
                    4.98 · 2,134 reviews
                  </span>
                </div>
              </div>

              {/* The QUOTE — the hero element */}
              <blockquote
                className="quote-text"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: COLORS.navy,
                  lineHeight: 1.45,
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  margin: 0,
                  opacity: fading ? 0 : 1,
                  transform: fading ? "translateY(10px)" : "translateY(0)",
                  transition: "all 0.32s ease",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                "{t.text}"
              </blockquote>

              {/* Bottom: Navigation */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: `1px solid ${COLORS.cream}`,
              }}>
                {/* Avatar thumbs */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {testimonials.map((th, i) => (
                    <button
                      key={i}
                      className="nav-thumb"
                      onClick={() => goTo(i)}
                      style={{
                        width: i === active ? "3.25rem" : "2.25rem",
                        height: i === active ? "3.25rem" : "2.25rem",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: i === active
                          ? `2px solid ${COLORS.cyan}`
                          : `2px solid ${COLORS.creamDark}`,
                        padding: 0,
                        opacity: i === active ? 1 : 0.55,
                      }}
                    >
                      <img
                        src={th.avatar}
                        alt={th.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </button>
                  ))}
                  <span style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem",
                    color: "#8AA493", marginLeft: "0.25rem",
                  }}>
                    {active + 1} / {testimonials.length}
                  </span>
                </div>

                {/* Prev / Next */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="arrow-btn"
                    onClick={prev}
                    style={{
                      width: "2.5rem", height: "2.5rem",
                      borderRadius: "50%",
                      border: `1px solid ${COLORS.creamDark}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <ArrowLeft size={14} color={COLORS.navy} />
                  </button>
                  <button
                    className="arrow-btn"
                    onClick={next}
                    style={{
                      width: "2.5rem", height: "2.5rem",
                      borderRadius: "50%",
                      background: COLORS.navy,
                      border: "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <ArrowRight size={14} color="white" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "3px",
                background: COLORS.creamDark,
              }}>
                <div style={{
                  height: "100%",
                  width: `${((active + 1) / testimonials.length) * 100}%`,
                  background: `linear-gradient(to right, ${COLORS.cyan}, ${COLORS.lightCyan})`,
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>
          </div>

          {/* ── Bottom social proof strip ── */}
          <div style={{
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}>
            {[
              { label: "TripAdvisor", sub: "Travellers' Choice 2024" },
              { label: "Google", sub: "4.9 · 1,200+ Reviews" },
              { label: "Booking.com", sub: "Score: 9.8 / 10" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%", background: COLORS.cyan,
                }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: COLORS.navy }}>
                  {p.label}
                </span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", color: "#8AA493" }}>
                  {p.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider to next section */}
        <div style={{ lineHeight: 0, marginTop: "-1px" }}>
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "50px" }}>
            <path fill={COLORS.navyDeep} d="M0,35 C360,70 1080,5 1440,45 L1440,70 L0,70 Z">
              <animate attributeName="d" dur="8s" repeatCount="indefinite"
                values="M0,35 C360,70 1080,5 1440,45 L1440,70 L0,70 Z;M0,45 C360,10 1080,65 1440,25 L1440,70 L0,70 Z;M0,35 C360,70 1080,5 1440,45 L1440,70 L0,70 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}