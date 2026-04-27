import { Clock, DollarSign, MapPin, Users, Sun, Camera, Waves, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const details = [
  {
    icon: <Clock size={24} />,
    label: "Duration",
    value: "3–4 Hours",
    sub: "Morning or afternoon slots",
    color: "#4CAF82",
    bg: "rgba(76,175,130,0.08)",
    border: "rgba(76,175,130,0.18)",
  },
  {
    icon: <DollarSign size={24} />,
    label: "Price",
    value: "From $89",
    sub: "Per person · all inclusive",
    color: "#2196A8",
    bg: "rgba(33,150,168,0.08)",
    border: "rgba(33,150,168,0.18)",
  },
  {
    icon: <MapPin size={24} />,
    label: "Location",
    value: "Kaudulla",
    sub: "North Central Province, LK",
    color: "#E8935A",
    bg: "rgba(232,147,90,0.08)",
    border: "rgba(232,147,90,0.18)",
  },
  {
    icon: <Users size={24} />,
    label: "Group Size",
    value: "Max 8 People",
    sub: "Intimate, never crowded",
    color: "#A78BDA",
    bg: "rgba(167,139,218,0.08)",
    border: "rgba(167,139,218,0.18)",
  },
  {
    icon: <Sun size={24} />,
    label: "Best Season",
    value: "Jun – Oct",
    sub: "Peak elephant gathering",
    color: "#E8A030",
    bg: "rgba(232,160,48,0.08)",
    border: "rgba(232,160,48,0.18)",
  },
  {
    icon: <Camera size={24} />,
    label: "Photography",
    value: "Unrestricted",
    sub: "Bring your best lens",
    color: "#E06060",
    bg: "rgba(224,96,96,0.08)",
    border: "rgba(224,96,96,0.18)",
  },
];

const included = [
  { text: "Professional kayak with paddle & safety gear", delay: 0 },
  { text: "Certified naturalist guide on every tour", delay: 0.07 },
  { text: "Life jacket & full safety briefing", delay: 0.14 },
  { text: "Light refreshments & chilled water", delay: 0.21 },
  { text: "Wildlife photography tips & guidance", delay: 0.28 },
  { text: "Eco-friendly experience certificate", delay: 0.35 },
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
        background: hovered ? "#fff" : "#fff",
        borderRadius: "22px",
        padding: "30px 26px 26px",
        border: `1px solid ${hovered ? detail.border : "rgba(28,61,46,0.07)"}`,
        boxShadow: hovered
          ? `0 20px 52px rgba(28,61,46,0.12), 0 0 0 1px ${detail.color}22`
          : "0 3px 18px rgba(28,61,46,0.06)",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s",
        transform: inView
          ? hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)"
          : "translateY(40px) scale(0.96)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 0.08}s` : "0s",
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
        background: `linear-gradient(90deg, ${detail.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      {/* Icon */}
      <div style={{
        width: "50px", height: "50px",
        borderRadius: "15px",
        background: hovered ? detail.bg : "rgba(28,61,46,0.04)",
        border: `1px solid ${hovered ? detail.border : "rgba(28,61,46,0.06)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hovered ? detail.color : "#7A9485",
        marginBottom: "18px",
        transition: "background 0.3s, border-color 0.3s, color 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
      }}>
        {detail.icon}
      </div>

      {/* Label */}
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "10px",
        color: hovered ? detail.color : "#9EB09E",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        marginBottom: "6px",
        transition: "color 0.3s",
      }}>
        {detail.label}
      </p>

      {/* Value */}
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "24px",
        fontWeight: 700,
        color: "#1C3D2E",
        lineHeight: 1.2,
        marginBottom: "4px",
      }}>
        {detail.value}
      </p>

      {/* Sub */}
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "12px",
        fontWeight: 300,
        color: "#8AA493",
        lineHeight: 1.5,
      }}>
        {detail.sub}
      </p>
    </div>
  );
}

export function TourDetailsSection() {
  const { ref: headerRef, inView: headerIn } = useInView(0.1);
  const { ref: cardsRef, inView: cardsIn } = useInView(0.1);
  const { ref: includedRef, inView: includedIn } = useInView(0.1);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes checkDraw {
          from { stroke-dashoffset: 16; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0,0); }
          50%       { transform: translate(10px, -14px); }
        }
        @keyframes shimmerCard {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes waveBreath {
          0%, 100% { d: path("M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z"); }
          50%       { d: path("M0,50 C480,10 960,65 1440,25 L1440,80 L0,80 Z"); }
        }
        .td-included-row {
          transition: background 0.2s, transform 0.2s;
        }
        .td-included-row:hover {
          background: rgba(126,200,164,0.06);
          transform: translateX(4px);
        }
      `}</style>

      <section
        id="tour-details"
        style={{ backgroundColor: "#FAF5EA", padding: "110px 24px 0", position: "relative", overflow: "hidden" }}
      >
        {/* Background texture dots */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(45,106,79,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }} />

        {/* Soft orbs */}
        <div style={{ position: "absolute", top: "5%", right: "-80px", width: "340px", height: "340px", borderRadius: "50%", background: "rgba(76,175,130,0.05)", filter: "blur(80px)", animation: "floatOrb2 10s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(33,150,168,0.05)", filter: "blur(70px)", animation: "floatOrb2 13s ease-in-out 2s infinite", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

          {/* ── Header ── */}
          <div ref={headerRef} style={{ textAlign: "center", marginBottom: "68px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(76,175,130,0.1)", color: "#2D6A4F",
              padding: "7px 20px", borderRadius: "50px",
              fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
              border: "1px solid rgba(76,175,130,0.2)", marginBottom: "22px",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4CAF82" }} />
              Tour Details
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(34px, 5.5vw, 60px)",
              fontWeight: 700,
              color: "#1C3D2E",
              lineHeight: 1.1,
              marginBottom: "6px",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}>
              Everything You Need to{" "}
              <span style={{ color: "#2D6A4F", fontStyle: "italic" }}>Know</span>
            </h2>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 300,
              color: "#6B7E6F", fontSize: "clamp(14px, 1.8vw, 17px)",
              maxWidth: "500px", margin: "16px auto 0", lineHeight: 1.8,
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}>
              No hidden costs. No surprises. Just you, the river,
              and the elephants.
            </p>
          </div>

          {/* ── Detail Cards ── */}
          <div
            ref={cardsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "18px",
              marginBottom: "56px",
            }}
          >
            {details.map((d, i) => (
              <DetailCard key={i} detail={d} index={i} inView={cardsIn} />
            ))}
          </div>

          {/* ── What's Included ── */}
          <div
            ref={includedRef}
            style={{
              background: "linear-gradient(135deg, #1C3D2E 0%, #1a4a38 50%, #1e3d4f 100%)",
              borderRadius: "32px",
              padding: "clamp(36px, 5vw, 60px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "48px",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
              opacity: includedIn ? 1 : 0,
              transform: includedIn ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Internal glow */}
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(76,175,130,0.12), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(33,150,168,0.1), transparent 70%)", pointerEvents: "none" }} />

            {/* Grid pattern inside card */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(126,200,164,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(126,200,164,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", borderRadius: "32px", pointerEvents: "none" }} />

            {/* Left: heading */}
            <div style={{ position: "relative" }}>
              <div style={{
                width: "52px", height: "52px",
                borderRadius: "16px",
                background: "rgba(126,200,164,0.12)",
                border: "1px solid rgba(126,200,164,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "24px",
              }}>
                <Waves size={24} color="#7EC8A4" />
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(126,200,164,0.1)", border: "1px solid rgba(126,200,164,0.2)", borderRadius: "50px", padding: "4px 14px", marginBottom: "16px" }}>
                <Sparkles size={11} color="#7EC8A4" />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, color: "#7EC8A4", letterSpacing: "2px", textTransform: "uppercase" }}>All Inclusive</span>
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 3.5vw, 38px)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}>
                What's{" "}
                <span style={{ color: "#7EC8A4", fontStyle: "italic" }}>Included</span>
              </h3>

              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                color: "rgba(255,255,255,0.55)",
                fontSize: "14.5px",
                lineHeight: 1.8,
                maxWidth: "300px",
              }}>
                Every Wild Paddle experience is fully curated so you can focus entirely
                on the wildlife and the moment.
              </p>

              {/* Price callout */}
              <div style={{
                display: "inline-flex",
                flexDirection: "column",
                background: "rgba(76,175,130,0.12)",
                border: "1px solid rgba(126,200,164,0.25)",
                borderRadius: "16px",
                padding: "16px 22px",
                marginTop: "28px",
              }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>Starting from</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "34px", fontWeight: 700, color: "#7EC8A4", lineHeight: 1 }}>$89</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "3px" }}>per person · all taxes included</span>
              </div>
            </div>

            {/* Right: list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", position: "relative" }}>
              {included.map((item, i) => (
                <div
                  key={i}
                  className="td-included-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "13px 14px",
                    borderRadius: "12px",
                    cursor: "default",
                    opacity: includedIn ? 1 : 0,
                    transform: includedIn ? "translateX(0)" : "translateX(20px)",
                    transition: `opacity 0.55s ease ${item.delay + 0.2}s, transform 0.55s ease ${item.delay + 0.2}s`,
                  }}
                >
                  <div style={{
                    width: "28px", height: "28px",
                    borderRadius: "50%",
                    background: "rgba(126,200,164,0.15)",
                    border: "1px solid rgba(126,200,164,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path
                        d="M1 4.5L4 7.5L10 1"
                        stroke="#7EC8A4"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="16"
                        strokeDashoffset={includedIn ? 0 : 16}
                        style={{ transition: `stroke-dashoffset 0.5s ease ${item.delay + 0.5}s` }}
                      />
                    </svg>
                  </div>

                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "14.5px",
                    lineHeight: 1.5,
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated wave */}
        <div style={{ marginTop: "90px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path fill="rgba(76,175,130,0.1)" d="M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite"
                values="M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z;M0,55 C400,15 900,70 1440,30 L1440,80 L0,80 Z;M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z" />
            </path>
            <path fill="#E8F4EC" d="M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite"
                values="M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z;M0,50 C480,10 960,65 1440,25 L1440,80 L0,80 Z;M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}