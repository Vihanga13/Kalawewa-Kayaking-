import { useEffect, useRef, useState } from "react";

const N  = "#1B3A6B";
const C  = "#00B4D8";
const LC = "#48CAE4";
const R  = "#E63329";

function useInView(threshold = 0.08) {
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

// Dashed perforation line
function Perforation({ color = `${N}18` }: { color?: string }) {
  return (
    <div style={{
      position: "relative",
      height: "1px",
      margin: "0",
      display: "flex",
      alignItems: "center",
    }}>
      {/* Notch left */}
      <div style={{
        width: "14px", height: "28px",
        background: "#fff",
        borderRadius: "0 14px 14px 0",
        flexShrink: 0,
        border: `1px solid ${color}`,
        borderLeft: "none",
        marginLeft: "-1px",
      }} />
      {/* Dashed line */}
      <div style={{
        flex: 1,
        height: "1px",
        backgroundImage: `repeating-linear-gradient(90deg, ${color} 0, ${color} 8px, transparent 8px, transparent 16px)`,
      }} />
      {/* Scissors icon */}
      <div style={{
        position: "absolute", left: "50%", transform: "translateX(-50%)",
        background: "#fff",
        padding: "0 6px",
        display: "flex", alignItems: "center", gap: "3px",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={`${N}35`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
          <line x1="20" y1="4" x2="8.12" y2="15.88"/>
          <line x1="14.47" y1="14.48" x2="20" y2="20"/>
          <line x1="8.12" y1="8.12" x2="12" y2="12"/>
        </svg>
      </div>
      {/* Notch right */}
      <div style={{
        width: "14px", height: "28px",
        background: "#fff",
        borderRadius: "14px 0 0 14px",
        flexShrink: 0,
        border: `1px solid ${color}`,
        borderRight: "none",
        marginRight: "-1px",
      }} />
    </div>
  );
}

// Single form field
function Field({
  label, value, sub, color = N, span = false, large = false,
  inView, delay = 0,
}: {
  label: string; value: string; sub?: string; color?: string;
  span?: boolean; large?: boolean; inView: boolean; delay?: number;
}) {
  return (
    <div style={{
      gridColumn: span ? "1 / -1" : undefined,
      paddingBottom: "18px",
      borderBottom: `1px solid ${N}0d`,
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(14px)",
      transition: `opacity 0.5s ${delay}s, transform 0.5s ${delay}s`,
    }}>
      <div style={{
        fontFamily: "'DM Mono', 'Courier New', monospace",
        fontSize: "8.5px",
        fontWeight: 500,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: `${N}45`,
        marginBottom: "6px",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontSize: large ? "clamp(24px, 3.5vw, 36px)" : "clamp(18px, 2.2vw, 24px)",
        fontWeight: 700,
        color: color,
        lineHeight: 1.1,
        letterSpacing: large ? "-0.5px" : "0",
        marginBottom: sub ? "4px" : "0",
      }}>
        {value}
      </div>
      {sub && (
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 300,
          color: `${N}50`,
          lineHeight: 1.5,
        }}>
          {sub}
        </div>
      )}
    </div>
  );
}

const fields = [
  { label: "Experience", value: "Kayak Elephant Safari", sub: "Kalawewa Reservoir · Sri Lanka", color: N, span: true, large: true },
  { label: "Duration",   value: "3–4 Hours",             sub: "Morning & afternoon · sunrise available", color: C },
  { label: "Group Size", value: "Max 6 Guests",          sub: "Intimate · never crowded", color: N },
  { label: "Price",      value: "From $89",              sub: "Per person · all taxes included", color: R },
  { label: "Location",   value: "Kalawewa, LK",          sub: "North Central Province", color: N },
  { label: "Best Season",value: "June – October",        sub: "Peak elephant gathering at Minneriya & Kaudulla", color: R },
  { label: "Photography",value: "Unrestricted",          sub: "Bring your best lens", color: C },
];

const included = [
  "Professional kayak with paddle & safety gear",
  "Certified naturalist guide on every tour",
  "Life jacket & full safety briefing",
  "Light refreshments & chilled water",
  "Wildlife photography tips & guidance",
  "Eco-friendly experience certificate",
];

const reviews = [
  { initial: "E", name: "Emma Thompson",      loc: "London, UK",    text: "23 elephants including 4 babies. The guides are true conservationists." },
  { initial: "R", name: "Rajiv Mehta",        loc: "Mumbai, India", text: "Silent kayaking makes all the difference — elephants didn't even notice us." },
  { initial: "S", name: "Sarah Chen",         loc: "Singapore",     text: "Sunrise on the water with mist and elephants calling — pure magic!" },
];

export function TourDetailsSection() {
  const { ref: headerRef, inView: headerIn } = useInView(0.1);
  const { ref: formRef,   inView: formIn   } = useInView(0.06);
  const { ref: incRef,    inView: incIn    } = useInView(0.06);
  const { ref: revRef,    inView: revIn    } = useInView(0.08);
  const { ref: ctaRef,    inView: ctaIn    } = useInView(0.08);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,800;1,9..144,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
      />
      <style>{`
        @keyframes tdPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(230,51,41,.55); }
          50%      { box-shadow: 0 0 0 6px rgba(230,51,41,0); }
        }
        @keyframes checkDraw {
          from { stroke-dashoffset: 30; opacity: 0; }
          to   { stroke-dashoffset: 0;  opacity: 1; }
        }
        @keyframes stampIn {
          from { transform: rotate(-8deg) scale(1.3); opacity: 0; }
          to   { transform: rotate(-8deg) scale(1);   opacity: 0.85; }
        }
        .inc-row { transition: background 0.2s, padding-left 0.2s; cursor: default; }
        .inc-row:hover { background: rgba(0,180,216,0.06) !important; padding-left: 22px !important; }
        .rev-card { transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s; cursor: default; }
        .rev-card:hover { transform: translateY(-7px) rotate(0deg) !important; box-shadow: 0 20px 48px rgba(27,58,107,0.12) !important; }
        .stub-btn {
          background: ${R};
          color: #fff;
          border: none;
          padding: 18px 44px;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 8px 28px rgba(230,51,41,0.38);
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s;
        }
        .stub-btn:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 18px 44px rgba(230,51,41,0.5);
        }
        @media (max-width: 680px) {
          .form-grid { grid-template-columns: 1fr !important; }
          .docket-inner { padding: 32px 22px !important; }
          .stub-inner { flex-direction: column !important; align-items: flex-start !important; }
          .rev-row { flex-direction: column !important; }
        }
      `}</style>

      <section
        id="tour-details"
        style={{ background: "#fff", position: "relative", overflow: "hidden" }}
      >
        {/* Ledger-line bg */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 39px, ${N}06 39px, ${N}06 40px)`,
          zIndex: 0,
        }} />

        <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "96px 28px 0", position: "relative", zIndex: 1 }}>

          {/* ── SECTION HEADER ── */}
          <div ref={headerRef} style={{ marginBottom: "52px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px",
              opacity: headerIn ? 1 : 0, transition: "opacity 0.6s",
            }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase",
                color: R, fontWeight: 500,
                display: "flex", alignItems: "center", gap: "8px",
              }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: R, animation: "tdPulse 2s infinite" }} />
                Booking Docket · Tour Details
              </div>
              <div style={{ flex: 1, height: "1px", backgroundImage: `repeating-linear-gradient(90deg, ${N}20 0, ${N}20 6px, transparent 6px, transparent 12px)` }} />
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px", letterSpacing: "2px",
                color: `${N}35`, fontWeight: 400,
              }}>
                REF-KK-2024
              </div>
            </div>

            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(34px, 6vw, 70px)",
              fontWeight: 800,
              color: N,
              lineHeight: 0.94,
              letterSpacing: "-2px",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
            }}>
              Plan Your
            </h2>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(34px, 6vw, 70px)",
              fontWeight: 800,
              fontStyle: "italic",
              color: C,
              lineHeight: 0.94,
              letterSpacing: "-2px",
              marginBottom: "20px",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s",
            }}>
              Adventure.
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px", fontWeight: 300,
              color: "#6B7C8A", lineHeight: 1.75,
              maxWidth: "460px",
              opacity: headerIn ? 1 : 0,
              transition: "opacity 0.6s 0.3s",
            }}>
              No hidden costs. No surprises. Just you, the river, and the gentle giants of Kalawewa.
            </p>
          </div>

          {/* ── MAIN DOCKET ── */}
          <div style={{
            border: `1.5px solid ${N}18`,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 40px rgba(27,58,107,0.07)",
            marginBottom: "0",
          }}>

            {/* Docket header bar */}
            <div style={{
              background: N,
              padding: "16px 32px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "12px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{
                  width: "32px", height: "32px", border: `1.5px solid ${C}50`,
                  borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px", fontWeight: 600,
                  color: "#fff", letterSpacing: "0.3px",
                }}>
                  Kayaking Kalawewa — Elephant Safari
                </span>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                {["Wildlife", "Heritage", "Eco"].map((t, i) => (
                  <span key={i} style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px", letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: i === 0 ? C : "rgba(255,255,255,0.25)",
                    fontWeight: 500,
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Form fields section */}
            <div
              ref={formRef}
              className="docket-inner"
              style={{ padding: "40px 40px 32px" }}
            >
              <div
                className="form-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 48px",
                  rowGap: "0",
                }}
              >
                {fields.map((f, i) => (
                  <div
                    key={i}
                    style={{ gridColumn: f.span ? "1 / -1" : undefined }}
                  >
                    <Field {...f} inView={formIn} delay={i * 0.07} />
                  </div>
                ))}
              </div>
            </div>

            {/* Perforation between form and included */}
            <Perforation color={`${N}20`} />

            {/* ── INCLUDED CHECKLIST ── */}
            <div
              ref={incRef}
              className="docket-inner"
              style={{
                padding: "36px 40px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0 56px",
                opacity: incIn ? 1 : 0,
                transition: "opacity 0.6s",
              }}
            >
              {/* Left: label */}
              <div style={{ gridColumn: "1 / -1", marginBottom: "24px" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "12px",
                }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px", fontWeight: 500,
                    letterSpacing: "2.5px", textTransform: "uppercase",
                    color: `${N}40`,
                  }}>
                    All Inclusive — What's Provided
                  </span>
                  <div style={{ flex: 1, height: "1px", background: `${N}10` }} />
                  <div style={{
                    background: `${C}12`,
                    border: `1px solid ${C}30`,
                    borderRadius: "50px",
                    padding: "4px 12px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px", fontWeight: 600,
                    color: C, letterSpacing: "0.5px",
                  }}>
                    {included.length} items
                  </div>
                </div>
              </div>

              {/* Checklist items — two columns */}
              {included.map((item, i) => (
                <div
                  key={i}
                  className="inc-row"
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "13px 14px 13px 14px",
                    borderRadius: "8px",
                    marginBottom: "4px",
                    opacity: incIn ? 1 : 0,
                    transform: incIn ? "translateX(0)" : "translateX(-16px)",
                    transition: `opacity 0.5s ${0.05 + i * 0.07}s, transform 0.5s ${0.05 + i * 0.07}s, background 0.2s, padding-left 0.2s`,
                  }}
                >
                  {/* Ink tick box */}
                  <div style={{
                    width: "22px", height: "22px",
                    border: `1.5px solid ${C}`,
                    borderRadius: "4px",
                    flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${C}08`,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke={C} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ animation: incIn ? `checkDraw 0.4s ${0.3 + i * 0.08}s both` : "none", strokeDasharray: 30, strokeDashoffset: incIn ? 0 : 30 }}>
                      <path d="M2 7l4 4 6-7" />
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px", fontWeight: 300,
                    color: "#4A5E6A", lineHeight: 1.5,
                  }}>
                    {item}
                  </span>
                </div>
              ))}

              {/* Price badge — spans full width at bottom */}
              <div style={{
                gridColumn: "1 / -1",
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: `1px solid ${N}0d`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: "16px",
                opacity: incIn ? 1 : 0,
                transition: "opacity 0.6s 0.5s",
              }}>
                <div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "8.5px", letterSpacing: "2px",
                    textTransform: "uppercase", color: `${N}45`,
                    marginBottom: "4px",
                  }}>
                    Starting From
                  </div>
                  <div style={{
                    display: "flex", alignItems: "baseline", gap: "6px",
                  }}>
                    <span style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "42px", fontWeight: 800,
                      color: R, lineHeight: 1, letterSpacing: "-1px",
                    }}>$89</span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px", fontWeight: 300,
                      color: `${N}55`,
                    }}>per person</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {["Free Cancellation", "Eco-Certified", "Small Groups"].map((tag, i) => (
                    <span key={i} style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px", fontWeight: 500,
                      letterSpacing: "0.5px",
                      color: N,
                      background: `${N}08`,
                      border: `1px solid ${N}14`,
                      padding: "6px 14px",
                      borderRadius: "50px",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Perforation before reviews */}
            <Perforation color={`${N}20`} />

            

            {/* Perforation before stub */}
            <Perforation color={`${N}25`} />

            {/* ── CTA STUB ── */}
            <div
              ref={ctaRef}
              style={{
                background: N,
                padding: "36px 40px",
                opacity: ctaIn ? 1 : 0,
                transform: ctaIn ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.7s, transform 0.7s",
              }}
            >
              <div
                className="stub-inner"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "28px",
                  flexWrap: "wrap",
                }}
              >
                {/* Left side of stub */}
                <div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px", fontWeight: 500,
                    letterSpacing: "3px", textTransform: "uppercase",
                    color: LC,
                    marginBottom: "10px",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: R, animation: "tdPulse 2s infinite" }} />
                    Limited Spots Available
                  </div>
                  <div style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(22px, 3vw, 38px)",
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1.0,
                    letterSpacing: "-0.5px",
                    marginBottom: "4px",
                  }}>
                    Ready for the experience
                  </div>
                  <div style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(22px, 3vw, 38px)",
                    fontWeight: 800,
                    fontStyle: "italic",
                    color: C,
                    lineHeight: 1.0,
                    letterSpacing: "-0.5px",
                  }}>
                    of a lifetime?
                  </div>
                </div>

                {/* Right side: barcode + button */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "14px" }}>
                  {/* Decorative barcode */}
                  <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "32px" }}>
                    {[3,5,2,7,4,6,2,8,3,5,7,4,6,3,5,8,2,4,6,3].map((h, i) => (
                      <div key={i} style={{
                        width: "3px",
                        height: `${h * 4}px`,
                        background: `rgba(255,255,255,${i % 3 === 0 ? 0.5 : i % 2 === 0 ? 0.2 : 0.35})`,
                        borderRadius: "1px",
                      }} />
                    ))}
                  </div>
                  <button
                    className="stub-btn"
                    onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Book Your Kayak Safari →
                  </button>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "8.5px", letterSpacing: "1.5px",
                    color: "rgba(255,255,255,0.22)",
                  }}>
                    KK · 2024 · KALAWEWA, LK
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── WAVE DIVIDER ── */}
        <div style={{ marginTop: "80px", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "72px" }}>
            <path fill={`${C}14`} d="M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite"
                values="M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z;M0,55 C400,15 900,70 1440,30 L1440,80 L0,80 Z;M0,40 C400,80 900,10 1440,55 L1440,80 L0,80 Z" />
            </path>
            <path fill={N} d="M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite"
                values="M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z;M0,50 C480,10 960,65 1440,25 L1440,80 L0,80 Z;M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}