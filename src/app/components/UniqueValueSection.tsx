import { useEffect, useRef, useState } from "react";

// ── Brand palette ──
const N = "#1B3A6B";   // navy
const C = "#00B4D8";   // cyan
const LC = "#48CAE4";  // light cyan
const R = "#E63329";   // red

const comparisons = [
  { con: "Loud engines disturb wildlife and stress animals",  pro: "Silent approach — zero engine noise at all"           },
  { con: "Fixed viewpoints, limited river access",           pro: "Access secret river corridors and hidden banks"       },
  { con: "Carbon-heavy 4WD jeeps on every trip",             pro: "Zero emissions — pure eco travel"                    },
  { con: "Crowded groups, tourist atmosphere",               pro: "Intimate small group only — max 6 guests"            },
  { con: "Animals often run or hide at approach",            pro: "Elephants behave completely naturally"               },
  { con: "Same route, same experience every time",           pro: "Every trip is unique and unrepeatable"               },
];

const testimonials = [
  { quote: "We were 15 meters from a bathing elephant family. They didn't even glance at us — pure magic.",        name: "Lisa & Team",           loc: "Germany · Wildlife photographer" },
  { quote: "Finally a wildlife experience that truly respects animals. Our guide knew every elephant by name.",    name: "Raj & Priya",           loc: "India · Eco-travel couple"       },
  { quote: "Best thing we did in Sri Lanka. Sunrise paddle with mist rising off the water — unforgettable.",      name: "Wilderness Collective", loc: "USA · Adventure group"           },
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

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke={C} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l4 4 6-7" />
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke={R} strokeWidth="2.2" strokeLinecap="round">
    <path d="M2 2l10 10M12 2L2 12" />
  </svg>
);

const StarShape = () => (
  <div style={{
    width: "10px", height: "10px", background: R, flexShrink: 0,
    clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
  }} />
);

export function UniqueValueSection() {
  const [activeTab, setActiveTab] = useState<"bad" | "good">("bad");
  const { ref: headerRef, inView: headerIn } = useInView(0.1);
  const { ref: tableRef,  inView: tableIn  } = useInView(0.08);
  const { ref: quotesRef, inView: quotesIn } = useInView(0.1);
  const { ref: ctaRef,    inView: ctaIn    } = useInView(0.1);

  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />

      <style>{`
        @keyframes uvPulse {
          0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(230,51,41,.6); }
          50%      { opacity:.5; box-shadow:0 0 0 5px rgba(230,51,41,0); }
        }
        @keyframes uvScrollLine {
          0%   { top:-100%; opacity:0; }
          20%  { opacity:1; }
          80%  { opacity:1; }
          100% { top:100%; opacity:0; }
        }
        .uv-row-item { transition: background 0.22s, transform 0.22s; }
        .uv-row-item:hover { transform: translateX(4px); }
        .bad-row:hover  { background: rgba(230,51,41,0.13) !important; }
        .good-row:hover { background: rgba(0,180,216,0.14) !important; }
        .uv-quote-card { transition: transform 0.35s cubic-bezier(0.34,1.56,.64,1), border-color 0.3s; cursor: default; }
        .uv-quote-card:hover { transform: translateY(-6px) !important; border-color: rgba(0,180,216,0.35) !important; }
        .uv-cta-btn {
          background: ${R};
          color: #fff;
          border: none;
          padding: 16px 38px;
          border-radius: 50px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(230,51,41,0.38);
          transition: transform 0.28s cubic-bezier(0.34,1.56,.64,1), box-shadow 0.25s;
        }
        .uv-cta-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 16px 36px rgba(230,51,41,0.55);
        }
        .uv-tab-bad  { background: transparent; color: rgba(255,255,255,0.38); }
        .uv-tab-bad.active  { background: ${R}; color: #fff; }
        .uv-tab-good { background: transparent; color: rgba(255,255,255,0.38); }
        .uv-tab-good.active { background: ${C}; color: ${N}; }
        @media (max-width: 640px) {
          .uv-compare-grid { grid-template-columns: 1fr !important; }
          .uv-quotes-grid  { grid-template-columns: 1fr !important; }
          .uv-cta-inner    { flex-direction: column !important; text-align: center !important; }
          .uv-section-pad  { padding: 52px 16px 0 !important; }
        }
        @media (max-width: 860px) and (min-width: 641px) {
          .uv-quotes-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <section
        id="unique-value"
        style={{ background: "#0d1e38", position: "relative", overflow: "hidden" }}
      >
        {/* Decorative background lines */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.35 }}>
          <svg viewBox="0 0 1100 500" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path fill="none" stroke={C} strokeWidth="0.5" d="M0,100 C200,60 500,140 800,80 C1000,40 1100,70 1100,70" />
            <path fill="none" stroke={N} strokeWidth="0.5" d="M0,180 C300,220 600,140 900,180 C1050,200 1100,180 1100,180" />
            <circle cx="900" cy="70" r="130" fill="none" stroke={`rgba(0,180,216,0.07)`} strokeWidth="1" />
            <circle cx="900" cy="70" r="85"  fill="none" stroke={`rgba(0,180,216,0.05)`} strokeWidth="1" />
          </svg>
        </div>

        <div
          className="uv-section-pad"
          style={{ padding: "72px 28px 0", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}
        >

          {/* ── HEADER ── */}
          <div
            ref={headerRef}
            style={{ textAlign: "center", marginBottom: "52px" }}
          >
            {/* Pill */}
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "rgba(230,51,41,0.12)", border: `1px solid rgba(230,51,41,0.25)`,
                color: R, padding: "6px 18px", borderRadius: "50px",
                fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif", marginBottom: "20px",
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(16px)",
                transition: "opacity .6s ease, transform .6s ease",
              }}
            >
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: R, animation: "uvPulse 2s infinite" }} />
              Why Kayak
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px,5vw,60px)", fontWeight: 700, color: "#fff",
                lineHeight: 1.08, letterSpacing: "-0.5px",
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(22px)",
                transition: "opacity .7s ease .1s, transform .7s ease .1s",
              }}
            >
              Beyond the <em style={{ color: C, fontStyle: "italic" }}>Ordinary</em> Safari
            </h2>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 300,
                color: "rgba(255,255,255,0.55)", lineHeight: 1.75,
                maxWidth: "480px", margin: "16px auto 0",
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "translateY(0)" : "translateY(18px)",
                transition: "opacity .7s ease .2s, transform .7s ease .2s",
              }}
            >
              Traditional safaris take you close.{" "}
              <em style={{ color: LC }}>Wild Paddle takes you into</em> the heart of
              elephant country — silently, respectfully, unforgettably.
            </p>
          </div>

          {/* ── TOGGLE TABS ── */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "36px" }}>
            <div style={{
              display: "flex",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50px", padding: "5px", gap: "4px",
            }}>
              {(["bad", "good"] as const).map(tab => (
                <button
                  key={tab}
                  className={`uv-tab-${tab}${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "10px 24px", borderRadius: "50px",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "12px", fontWeight: 700,
                    letterSpacing: "1.5px", textTransform: "uppercase",
                    border: "none", cursor: "pointer",
                    transition: "all .28s",
                  }}
                >
                  {tab === "bad" ? "Jeep Safari" : "Kayak Safari"}
                </button>
              ))}
            </div>
          </div>

          {/* ── COMPARISON TABLE ── */}
          <div
            ref={tableRef}
            className="uv-compare-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3px",
              borderRadius: "24px",
              overflow: "hidden",
              marginBottom: "52px",
              opacity: tableIn ? 1 : 0,
              transform: tableIn ? "translateY(0)" : "translateY(28px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            {/* BAD column */}
            <div
              style={{
                display: "flex", flexDirection: "column", gap: "3px",
                opacity: activeTab === "bad" ? 1 : 0.32,
                transform: activeTab === "bad" ? "scale(1)" : "scale(0.98)",
                transition: "opacity .3s, transform .3s",
              }}
            >
              {/* Col header */}
              <div style={{
                padding: "18px 22px 14px",
                background: "rgba(230,51,41,0.12)",
              }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: R, fontFamily: "'Outfit', sans-serif", marginBottom: "4px" }}>
                  Traditional
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>
                  Jeep Safari
                </div>
              </div>

              {comparisons.map((row, i) => (
                <div
                  key={i}
                  className="uv-row-item bad-row"
                  style={{
                    padding: "17px 22px",
                    background: "rgba(230,51,41,0.07)",
                    borderLeft: `3px solid rgba(230,51,41,0.35)`,
                    display: "flex", alignItems: "flex-start", gap: "12px",
                  }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "rgba(230,51,41,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "1px",
                  }}>
                    <XIcon />
                  </div>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                    {row.con}
                  </span>
                </div>
              ))}
            </div>

            {/* GOOD column */}
            <div
              style={{
                display: "flex", flexDirection: "column", gap: "3px",
                opacity: activeTab === "good" ? 1 : 0.32,
                transform: activeTab === "good" ? "scale(1)" : "scale(0.98)",
                transition: "opacity .3s, transform .3s",
              }}
            >
              {/* Col header */}
              <div style={{
                padding: "18px 22px 14px",
                background: `rgba(0,180,216,0.12)`,
              }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C, fontFamily: "'Outfit', sans-serif", marginBottom: "4px" }}>
                  Wild Paddle
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 700, color: "#fff" }}>
                  Kayak Safari
                </div>
              </div>

              {comparisons.map((row, i) => (
                <div
                  key={i}
                  className="uv-row-item good-row"
                  style={{
                    padding: "17px 22px",
                    background: "rgba(0,180,216,0.07)",
                    borderRight: `3px solid rgba(0,180,216,0.3)`,
                    display: "flex", alignItems: "flex-start", gap: "12px",
                  }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "rgba(0,180,216,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "1px",
                  }}>
                    <CheckIcon />
                  </div>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                    {row.pro}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── TESTIMONIALS ── */}
          <div
            ref={quotesRef}
            className="uv-quotes-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "52px" }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="uv-quote-card"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  padding: "24px 22px 20px",
                  opacity: quotesIn ? 1 : 0,
                  transform: quotesIn ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity .6s ease ${i * 0.12}s, transform .6s ease ${i * 0.12}s`,
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                  {Array.from({ length: 5 }).map((_, j) => <StarShape key={j} />)}
                </div>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 300,
                  color: "rgba(255,255,255,0.65)", lineHeight: 1.7,
                  fontStyle: "italic", marginBottom: "14px",
                }}>
                  "{t.quote}"
                </p>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 600, color: LC, letterSpacing: "0.4px" }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "2px", letterSpacing: "0.4px" }}>
                  {t.loc}
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA BAR ── */}
          <div
            ref={ctaRef}
            style={{
              background: `rgba(0,180,216,0.08)`,
              border: `1px solid rgba(0,180,216,0.2)`,
              borderRadius: "24px",
              padding: "36px 40px",
              opacity: ctaIn ? 1 : 0,
              transform: ctaIn ? "translateY(0)" : "translateY(24px)",
              transition: "opacity .7s ease, transform .7s ease",
            }}
          >
            <div
              className="uv-cta-inner"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}
            >
              <div>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px",
                  textTransform: "uppercase", color: LC, marginBottom: "8px",
                }}>
                  Join 500+ happy adventurers
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#fff", lineHeight: 1.1,
                }}>
                  Ready for the{" "}
                  <em style={{ color: C, fontStyle: "italic" }}>experience of a lifetime?</em>
                </div>
              </div>
              <button className="uv-cta-btn" onClick={scrollToBooking}>
                Book Your Kayak Safari →
              </button>
            </div>
          </div>

        </div>

        {/* ── WAVE DIVIDER ── */}
        <div style={{ marginTop: "72px", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "72px" }}>
            <path fill="rgba(0,180,216,0.1)" d="M0,40 C400,10 900,70 1440,30 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite"
                values="M0,40 C400,10 900,70 1440,30 L1440,80 L0,80 Z;M0,25 C400,65 900,15 1440,50 L1440,80 L0,80 Z;M0,40 C400,10 900,70 1440,30 L1440,80 L0,80 Z" />
            </path>
            <path fill="#FAF5EA" d="M0,55 C360,10 1080,75 1440,25 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite"
                values="M0,55 C360,10 1080,75 1440,25 L1440,80 L0,80 Z;M0,30 C360,70 1080,20 1440,55 L1440,80 L0,80 Z;M0,55 C360,10 1080,75 1440,25 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}