import { Clock, DollarSign, MapPin, Users, Sun, Camera, Waves, Sparkles, Calendar, Shield, Heart, Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

const details = [
  {
    icon: <Clock size={22} />,
    label: "Duration",
    value: "3–4 Hours",
    sub: "Morning or afternoon slots",
    color: COLORS.cyan,
    bg: `${COLORS.cyan}08`,
    border: `${COLORS.cyan}15`,
  },
  {
    icon: <DollarSign size={22} />,
    label: "Price",
    value: "From $89",
    sub: "Per person · all inclusive",
    color: COLORS.lightCyan,
    bg: `${COLORS.lightCyan}08`,
    border: `${COLORS.lightCyan}15`,
  },
  {
    icon: <MapPin size={22} />,
    label: "Location",
    value: "Kalawewa",
    sub: "North Central Province, LK",
    color: COLORS.navy,
    bg: `${COLORS.navy}06`,
    border: `${COLORS.navy}12`,
  },
  {
    icon: <Users size={22} />,
    label: "Group Size",
    value: "Max 8 People",
    sub: "Intimate, never crowded",
    color: COLORS.cyan,
    bg: `${COLORS.cyan}08`,
    border: `${COLORS.cyan}15`,
  },
  {
    icon: <Sun size={22} />,
    label: "Best Season",
    value: "Jun – Oct",
    sub: "Peak elephant gathering",
    color: COLORS.red,
    bg: `${COLORS.red}06`,
    border: `${COLORS.red}12`,
  },
  {
    icon: <Camera size={22} />,
    label: "Photography",
    value: "Unrestricted",
    sub: "Bring your best lens",
    color: COLORS.lightCyan,
    bg: `${COLORS.lightCyan}08`,
    border: `${COLORS.lightCyan}15`,
  },
];

const included = [
  { text: "Professional kayak with paddle & safety gear", icon: <Waves size={16} /> },
  { text: "Certified naturalist guide on every tour", icon: <Shield size={16} /> },
  { text: "Life jacket & full safety briefing", icon: <Heart size={16} /> },
  { text: "Light refreshments & chilled water", icon: <Coffee size={16} /> },
  { text: "Wildlife photography tips & guidance", icon: <Camera size={16} /> },
  { text: "Eco-friendly experience certificate", icon: <Sparkles size={16} /> },
];

// Tourist testimonials
const touristReviews = [
  { name: "Emma Thompson", location: "London, UK", rating: 5, comment: "Absolutely incredible! We saw 23 elephants including 4 babies. The guides are true conservationists.", avatar: "E", date: "2 weeks ago" },
  { name: "Rajiv Mehta", location: "Mumbai, India", rating: 5, comment: "Best wildlife experience of my life. Silent kayaking makes all the difference — elephants didn't even notice us.", avatar: "R", date: "1 month ago" },
  { name: "Sarah Chen", location: "Singapore", rating: 5, comment: "Worth every penny. Sunrise on the water with mist and elephants calling — pure magic!", avatar: "S", date: "3 weeks ago" },
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

function DetailCard({ detail, index, inView }: { detail: typeof details[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "1.5rem",
        padding: "1.5rem",
        border: `1px solid ${hovered ? detail.border : "rgba(27,58,107,0.08)"}`,
        boxShadow: hovered
          ? `0 20px 40px rgba(0,0,0,0.08), 0 0 0 2px ${detail.color}20`
          : "0 2px 12px rgba(0,0,0,0.04)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: inView
          ? hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)"
          : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 0.06}s` : "0s",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent gradient */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "3px",
        background: `linear-gradient(90deg, ${detail.color}, transparent)`,
        opacity: hovered ? 1 : 0.3,
        transition: "opacity 0.3s",
      }} />

      {/* Icon */}
      <div style={{
        width: "3rem", height: "3rem",
        borderRadius: "1rem",
        background: hovered ? detail.bg : "rgba(27,58,107,0.04)",
        border: `1px solid ${hovered ? detail.border : "rgba(27,58,107,0.06)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hovered ? detail.color : COLORS.navy,
        marginBottom: "1rem",
        transition: "all 0.3s ease",
        transform: hovered ? "scale(1.05) rotate(-2deg)" : "scale(1)",
      }}>
        {detail.icon}
      </div>

      {/* Label */}
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "0.65rem",
        color: hovered ? detail.color : "#6B7E73",
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase",
        marginBottom: "0.25rem",
      }}>
        {detail.label}
      </p>

      {/* Value */}
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.6rem",
        fontWeight: 700,
        color: COLORS.navy,
        lineHeight: 1.2,
        marginBottom: "0.25rem",
      }}>
        {detail.value}
      </p>

      {/* Sub */}
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "0.75rem",
        fontWeight: 300,
        color: "#8AA493",
        lineHeight: 1.4,
      }}>
        {detail.sub}
      </p>
    </div>
  );
}

// Mini coffee icon
function Coffee(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
    </svg>
  );
}

export function TourDetailsSection() {
  const { ref: headerRef, inView: headerIn } = useInView(0.1);
  const { ref: cardsRef, inView: cardsIn } = useInView(0.1);
  const { ref: includedRef, inView: includedIn } = useInView(0.1);
  const { ref: reviewsRef, inView: reviewsIn } = useInView(0.1);
  const [activeReview, setActiveReview] = useState(0);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % touristReviews.length);
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
          50% { transform: translateY(-15px) translateX(8px); }
        }
        @keyframes waveSoft {
          0%, 100% { d: path("M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z"); }
          50% { d: path("M0,50 C480,10 960,65 1440,25 L1440,80 L0,80 Z"); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        .included-item {
          transition: all 0.3s ease;
        }
        .included-item:hover {
          transform: translateX(6px);
          background: rgba(0,180,216,0.05);
        }
        @media (max-width: 768px) {
          .reviews-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section
        id="tour-details"
        style={{
          background: "#FAF5EA",
          padding: "5rem 1.5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background elements */}
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
          left: "-10%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: `${COLORS.lightCyan}03`,
          filter: "blur(50px)",
          pointerEvents: "none",
          animation: "floatOrb 15s ease-in-out 2s infinite",
        }} />

        {/* Water dots pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, ${COLORS.cyan}08 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          opacity: 0.5,
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Header with tourist connection ── */}
          <div ref={headerRef} style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: `${COLORS.red}08`,
                color: COLORS.red,
                padding: "0.4rem 1.2rem",
                borderRadius: "50px",
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
                border: `1px solid ${COLORS.red}15`,
                marginBottom: "1rem",
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: COLORS.red, animation: "pulseDot 2s infinite" }} />
              Plan Your Adventure
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
                fontWeight: 700,
                color: COLORS.navy,
                lineHeight: 1.1,
                marginBottom: "0.5rem",
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              Everything You Need to{" "}
              <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Know</span>
            </h2>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 300,
                color: "#6B7E73", fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
                maxWidth: "520px", margin: "1rem auto 0", lineHeight: 1.7,
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(15px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              No hidden costs. No surprises. Just you, the river,
              and the gentle giants of Kalawewa.
            </p>
          </div>

          {/* ── Live Tourist Count Banner (Eye-catching) ── */}
          <div
            style={{
              background: `linear-gradient(135deg, white, ${COLORS.cyan}04)`,
              borderRadius: "1.5rem",
              padding: "1rem 1.5rem",
              marginBottom: "2.5rem",
              border: `1px solid ${COLORS.cyan}15`,
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
                <div style={{ fontSize: "0.7rem", color: "#8AA493", letterSpacing: "1px" }}>JOINED THIS MONTH</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: COLORS.navy, fontFamily: "'Cormorant Garamond', serif" }}>
                  342 <span style={{ fontSize: "0.9rem", color: COLORS.cyan }}>happy adventurers</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={COLORS.red} color={COLORS.red} />
              ))}
              <span style={{ fontSize: "0.8rem", color: COLORS.navy, fontWeight: 500 }}>4.98 ★ (1,284 reviews)</span>
            </div>
          </div>

          {/* ── Detail Cards ── */}
          <div
            ref={cardsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            {details.map((d, i) => (
              <DetailCard key={i} detail={d} index={i} inView={cardsIn} />
            ))}
          </div>

          {/* ── What's Included Section with Tourist Vibe ── */}
          <div
            ref={includedRef}
            style={{
              background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0F2A4A 100%)`,
              borderRadius: "2rem",
              padding: "clamp(2rem, 5vw, 3rem)",
              marginBottom: "3rem",
              position: "relative",
              overflow: "hidden",
              opacity: includedIn ? 1 : 0,
              transform: includedIn ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Animated wave overlay */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none" }}>
              <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                <path fill={COLORS.cyan} d="M0,96 C300,160 500,32 800,96 C1100,160 1200,64 1440,128 L1440,320 L0,320 Z" />
              </svg>
            </div>

            {/* Content */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
              position: "relative",
              zIndex: 2,
            }}>
              {/* Left side */}
              <div>
                <div style={{
                  width: "3rem", height: "3rem",
                  borderRadius: "1rem",
                  background: `${COLORS.cyan}15`,
                  border: `1px solid ${COLORS.cyan}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1rem",
                }}>
                  <Waves size={20} color={COLORS.cyan} />
                </div>

                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: `${COLORS.cyan}12`, border: `1px solid ${COLORS.cyan}20`, borderRadius: "50px", padding: "0.25rem 0.75rem", marginBottom: "1rem" }}>
                  <Sparkles size={10} color={COLORS.cyan} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", fontWeight: 700, color: COLORS.cyan, letterSpacing: "2px", textTransform: "uppercase" }}>All Inclusive</span>
                </div>

                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: "0.75rem",
                }}>
                  What's{" "}
                  <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Included</span>
                </h3>

                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  marginBottom: "1.5rem",
                }}>
                  Every Wild Paddle experience is fully curated so you can focus entirely
                  on the wildlife and the moment.
                </p>

                {/* Price badge */}
                <div style={{
                  display: "inline-block",
                  background: `${COLORS.cyan}10`,
                  border: `1px solid ${COLORS.cyan}25`,
                  borderRadius: "1rem",
                  padding: "0.75rem 1.25rem",
                }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem", color: COLORS.lightCyan, letterSpacing: "1px", textTransform: "uppercase" }}>Starting from</span>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: COLORS.cyan, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>$89</div>
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>per person · all taxes included</span>
                </div>
              </div>

              {/* Right side - Included items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {included.map((item, i) => (
                  <div
                    key={i}
                    className="included-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      cursor: "default",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div style={{
                      width: "2rem", height: "2rem",
                      borderRadius: "50%",
                      background: `${COLORS.cyan}12`,
                      border: `1px solid ${COLORS.cyan}25`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: COLORS.cyan,
                    }}>
                      {item.icon}
                    </div>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "0.85rem",
                    }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Tourist Reviews Section (Eye-catching) ── */}
          <div
            ref={reviewsRef}
            style={{
              marginBottom: "3rem",
              opacity: reviewsIn ? 1 : 0,
              transform: reviewsIn ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `${COLORS.cyan}08`, padding: "0.25rem 1rem", borderRadius: "2rem", marginBottom: "0.75rem" }}>
                <Quote size={12} color={COLORS.cyan} />
                <span style={{ fontSize: "0.65rem", letterSpacing: "1px", color: COLORS.navy, fontWeight: 500 }}>Loved by Travelers</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: COLORS.navy }}>
                What Our <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Adventurers</span> Say
              </h3>
            </div>

            <div className="reviews-container" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}>
              {touristReviews.map((review, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "white",
                    borderRadius: "1.25rem",
                    padding: "1.25rem",
                    border: `1px solid ${COLORS.cyan}12`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <div style={{
                      width: "2.5rem", height: "2.5rem",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.lightCyan})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}>
                      {review.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: COLORS.navy, fontSize: "0.85rem" }}>{review.name}</div>
                      <div style={{ fontSize: "0.65rem", color: "#8AA493" }}>{review.location} • {review.date}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "0.5rem" }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} fill={COLORS.red} color={COLORS.red} />
                    ))}
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#5A6B5E", lineHeight: 1.5, fontStyle: "italic" }}>
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA Banner ── */}
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.cyan}10, ${COLORS.navy}05)`,
              borderRadius: "2rem",
              padding: "1.5rem",
              textAlign: "center",
              border: `1px solid ${COLORS.cyan}15`,
              marginBottom: "2rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <Calendar size={18} color={COLORS.red} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "2px", color: COLORS.red, textTransform: "uppercase", fontWeight: 600 }}>Limited Spots Available</span>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: COLORS.navy, marginBottom: "0.5rem" }}>
              Ready for the <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>experience of a lifetime?</span>
            </h3>
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.red}CC)`,
                border: "none",
                padding: "0.7rem 1.8rem",
                borderRadius: "2rem",
                color: "white",
                fontWeight: 700,
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.8rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "0.75rem",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 20px ${COLORS.red}40`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Book Your Kayak Safari <Calendar size={14} />
            </button>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div style={{ marginTop: "2rem", lineHeight: 0, marginLeft: "-1.5rem", marginRight: "-1.5rem" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path fill={`${COLORS.cyan}08`} d="M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite"
                values="M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z;M0,55 C400,15 900,70 1440,30 L1440,80 L0,80 Z;M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z" />
            </path>
            <path fill="#FAF5EA" d="M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite"
                values="M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z;M0,50 C480,10 960,65 1440,25 L1440,80 L0,80 Z;M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}