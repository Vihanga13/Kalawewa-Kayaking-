import { useEffect, useRef, useState } from "react";

// ── Brand palette ──
const N = "#1B3A6B";   // navy
const C = "#00B4D8";   // cyan
const LC = "#48CAE4";  // light cyan
const R = "#E63329";   // red

// ── Data ──
const details = [
  {
    label: "Duration",    value: "3–4 Hours",     sub: "Morning & afternoon slots · sunrise available",
    color: C,  iconColor: C,  accentBg: "rgba(0,180,216,0.10)",  large: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    label: "Group Size",  value: "Max 6",          sub: "Intimate · never crowded",
    color: C,  iconColor: C,  accentBg: "rgba(0,180,216,0.10)",  large: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Price",       value: "From $89",       sub: "Per person · all inclusive",
    color: R,  iconColor: R,  accentBg: "rgba(230,51,41,0.09)",  large: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={R} strokeWidth="1.8" strokeLinecap="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    label: "Location",    value: "Kalawewa",        sub: "North Central Province, LK",
    color: N,  iconColor: N,  accentBg: "rgba(27,58,107,0.07)",  large: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={N} strokeWidth="1.8" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    label: "Best Season", value: "June – October",  sub: "Peak elephant gathering at Minneriya & Kaudulla",
    color: R,  iconColor: R,  accentBg: "rgba(230,51,41,0.09)",  large: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={R} strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      </svg>
    ),
  },
  {
    label: "Photography", value: "Unrestricted",    sub: "Bring your best lens",
    color: LC, iconColor: LC, accentBg: "rgba(72,202,228,0.10)", large: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={LC} strokeWidth="1.8" strokeLinecap="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
];

const included = [
  { text: "Professional kayak with paddle & safety gear",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg> },
  { text: "Certified naturalist guide on every tour",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { text: "Life jacket & full safety briefing",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { text: "Light refreshments & chilled water",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg> },
  { text: "Wildlife photography tips & guidance",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> },
  { text: "Eco-friendly experience certificate",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
];

const reviews = [
  { avatar: "E", name: "Emma Thompson",      loc: "London, UK",    date: "2 weeks ago",  comment: "Absolutely incredible! We saw 23 elephants including 4 babies. The guides are true conservationists." },
  { avatar: "R", name: "Rajiv Mehta",        loc: "Mumbai, India", date: "1 month ago",  comment: "Best wildlife experience of my life. Silent kayaking makes all the difference — elephants didn't even notice us." },
  { avatar: "S", name: "Sarah Chen",         loc: "Singapore",     date: "3 weeks ago",  comment: "Worth every penny. Sunrise on the water with mist and elephants calling — pure magic!" },
];

// ── Helpers ──
function useInView(threshold = 0.1) {
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

const StarShape = () => (
  <div style={{
    width: "10px", height: "10px", background: R, flexShrink: 0,
    clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
  }} />
);

// ── Sub-components ──
function BentoTile({ d, index, inView }: { d: typeof details[0]; index: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        borderRadius: "22px",
        border: `1px solid ${hov ? d.color + "33" : "rgba(27,58,107,0.07)"}`,
        padding: "28px 26px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        gridColumn: d.large ? "span 2" : "span 1",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,.64,1), box-shadow 0.3s, border-color 0.3s",
        transform: inView
          ? hov ? "translateY(-6px) scale(1.01)" : "translateY(0)"
          : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 0.07}s` : "0s",
        boxShadow: hov ? "0 20px 48px rgba(27,58,107,0.11)" : "0 2px 12px rgba(27,58,107,0.04)",
      }}
    >
      {/* top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: d.color, opacity: hov ? 1 : 0.28,
        transition: "opacity 0.3s",
      }} />
      {/* corner orb */}
      {d.large && (
        <div style={{
          position: "absolute", right: "-20px", bottom: "-20px",
          width: "100px", height: "100px", borderRadius: "50%",
          background: d.color + "09", pointerEvents: "none",
        }} />
      )}
      {/* icon */}
      <div style={{
        width: "44px", height: "44px", borderRadius: "14px",
        background: hov ? d.accentBg : "rgba(27,58,107,0.04)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "18px",
        transition: "background 0.3s, transform 0.3s cubic-bezier(0.34,1.56,.64,1)",
        transform: hov ? "scale(1.08) rotate(-3deg)" : "scale(1)",
      }}>
        {d.icon}
      </div>
      {/* label */}
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "9px", fontWeight: 700, letterSpacing: "2.2px",
        textTransform: "uppercase", color: hov ? d.color : "#8aabb0",
        marginBottom: "6px", transition: "color 0.2s",
      }}>
        {d.label}
      </div>
      {/* value */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: d.large ? "34px" : "26px",
        fontWeight: 700, color: d.label === "Price" ? R : N,
        lineHeight: 1.1, marginBottom: "4px",
      }}>
        {d.value}
      </div>
      {/* sub */}
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "11px", fontWeight: 300,
        color: "#8aabb0", lineHeight: 1.5,
      }}>
        {d.sub}
      </div>
    </div>
  );
}

function IncludedItem({ item }: { item: typeof included[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "12px 14px", borderRadius: "12px",
        background: hov ? "rgba(0,180,216,0.08)" : "transparent",
        transform: hov ? "translateX(5px)" : "translateX(0)",
        transition: "background 0.22s, transform 0.22s",
        cursor: "default",
      }}
    >
      <div style={{
        width: "32px", height: "32px", borderRadius: "50%",
        background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        color: C,
      }}>
        {item.icon}
      </div>
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.82)" }}>
        {item.text}
      </span>
    </div>
  );
}

// ── Main export ──
export function TourDetailsSection() {
  const { ref: headerRef, inView: headerIn } = useInView(0.1);
  const { ref: bentoRef,  inView: bentoIn  } = useInView(0.08);
  const { ref: incRef,    inView: incIn    } = useInView(0.08);
  const { ref: revRef,    inView: revIn    } = useInView(0.1);
  const { ref: ctaRef,    inView: ctaIn    } = useInView(0.1);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />

      <style>{`
        @keyframes tdPulse {
          0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(230,51,41,.6); }
          50%      { opacity:.5; box-shadow:0 0 0 5px rgba(230,51,41,0); }
        }
        .td-inc-item-wrap { transition: background .22s, transform .22s; }
        .td-inc-item-wrap:hover { background: rgba(0,180,216,0.08) !important; transform: translateX(5px); }
        .td-review-card { transition: transform .3s cubic-bezier(.34,1.56,.64,1), border-color .3s; }
        .td-review-card:hover { transform: translateY(-5px) !important; border-color: rgba(0,180,216,0.3) !important; }
        .td-cta-btn-main {
          background: ${R};
          color: #fff;
          border: none;
          padding: 16px 38px;
          border-radius: 50px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .8px;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(230,51,41,.38);
          transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
        }
        .td-cta-btn-main:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 16px 36px rgba(230,51,41,.55); }

        @media (max-width: 640px) {
          .td-bento-grid     { grid-template-columns: 1fr 1fr !important; }
          .td-bento-large    { grid-column: span 2 !important; }
          .td-included-grid  { grid-template-columns: 1fr !important; padding: 28px 22px !important; gap: 24px !important; }
          .td-reviews-grid   { grid-template-columns: 1fr !important; }
          .td-cta-inner      { flex-direction: column !important; text-align: center !important; padding: 28px 22px !important; }
          .td-section-pad    { padding: 52px 16px 0 !important; }
        }
        @media (max-width: 860px) and (min-width: 641px) {
          .td-reviews-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <section
        id="tour-details"
        style={{ background: "#FAF5EA", position: "relative", overflow: "hidden" }}
      >
        {/* dot pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(0,180,216,0.09) 1.2px, transparent 1.2px)`,
          backgroundSize: "28px 28px",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div
          className="td-section-pad"
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "72px 28px 0", position: "relative", zIndex: 1 }}
        >

          {/* ── HEADER ── */}
          <div ref={headerRef} style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(230,51,41,0.09)", border: "1px solid rgba(230,51,41,0.22)",
              color: R, padding: "6px 18px", borderRadius: "50px",
              fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif", marginBottom: "18px",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(14px)",
              transition: "opacity .6s ease, transform .6s ease",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: R, animation: "tdPulse 2s infinite" }} />
              Plan Your Adventure
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(30px,5vw,58px)", fontWeight: 700, color: N,
              lineHeight: 1.08, letterSpacing: "-0.5px",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity .7s ease .1s, transform .7s ease .1s",
            }}>
              Everything You Need<br />to <em style={{ color: LC, fontStyle: "italic" }}>Know</em>
            </h2>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 300,
              color: "#6b7e8a", lineHeight: 1.75, maxWidth: "460px", margin: "14px auto 0",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(16px)",
              transition: "opacity .7s ease .2s, transform .7s ease .2s",
            }}>
              No hidden costs. No surprises. Just you, the river, and the gentle giants of Kalawewa.
            </p>
          </div>

          {/* ── BENTO GRID ── */}
          <div
            ref={bentoRef}
            className="td-bento-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "14px",
              marginBottom: "52px",
            }}
          >
            {details.map((d, i) => (
              <div key={i} className={d.large ? "td-bento-large" : ""} style={{ gridColumn: d.large ? "span 2" : "span 1" }}>
                <BentoTile d={d} index={i} inView={bentoIn} />
              </div>
            ))}
          </div>

          {/* ── INCLUDED DARK PANEL ── */}
          <div
            ref={incRef}
            className="td-included-grid"
            style={{
              background: N,
              borderRadius: "26px",
              padding: "44px 48px",
              marginBottom: "52px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              position: "relative",
              overflow: "hidden",
              opacity: incIn ? 1 : 0,
              transform: incIn ? "translateY(0)" : "translateY(28px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            {/* wave bg */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.07, pointerEvents: "none" }}>
              <svg viewBox="0 0 1100 200" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                <path fill={C} d="M0,60 C300,130 600,20 900,80 C1050,110 1100,60 1100,60 L1100,200 L0,200 Z" />
              </svg>
            </div>

            {/* left */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.22)",
                color: C, padding: "5px 14px", borderRadius: "50px",
                fontSize: "9px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif", marginBottom: "18px",
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2.2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                All Inclusive
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700, color: "#fff",
                lineHeight: 1.1, marginBottom: "14px",
              }}>
                What's <em style={{ color: LC, fontStyle: "italic" }}>Included</em>
              </h3>
              <p style={{
                fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 300,
                color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "28px",
              }}>
                Every Wild Paddle experience is fully curated so you can focus entirely on the wildlife and the moment.
              </p>
              {/* price badge */}
              <div style={{
                display: "inline-block",
                background: "rgba(0,180,216,0.10)", border: "1px solid rgba(0,180,216,0.22)",
                borderRadius: "16px", padding: "14px 20px",
              }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: LC, marginBottom: "3px" }}>Starting from</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 700, color: C, lineHeight: 1 }}>$89</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>per person · all taxes included</div>
              </div>
            </div>

            {/* right — included items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", justifyContent: "center", position: "relative", zIndex: 1 }}>
              {included.map((item, i) => <IncludedItem key={i} item={item} />)}
            </div>
          </div>

          

          {/* ── CTA BAR ── */}
          <div
            ref={ctaRef}
            className="td-cta-inner"
            style={{
              background: N,
              borderRadius: "24px",
              padding: "36px 44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
              position: "relative",
              overflow: "hidden",
              opacity: ctaIn ? 1 : 0,
              transform: ctaIn ? "translateY(0)" : "translateY(24px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            {/* accent orb */}
            <div style={{ position: "absolute", right: "-40px", top: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(0,180,216,0.06)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: LC, marginBottom: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: R, animation: "tdPulse 2s infinite" }} />
                Limited spots available
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                Ready for the <em style={{ color: C, fontStyle: "italic" }}>experience of a lifetime?</em>
              </div>
            </div>
            <button
              className="td-cta-btn-main"
              style={{ position: "relative", zIndex: 1 }}
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book Your Kayak Safari →
            </button>
          </div>

        </div>

        {/* ── WAVE DIVIDER ── */}
        <div style={{ lineHeight: 0, marginTop: "72px" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "72px" }}>
            <path fill="rgba(0,180,216,0.09)" d="M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite"
                values="M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z;M0,55 C400,15 900,70 1440,30 L1440,80 L0,80 Z;M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z" />
            </path>
            <path fill="#1B3A6B" d="M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite"
                values="M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z;M0,50 C480,10 960,65 1440,25 L1440,80 L0,80 Z;M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}