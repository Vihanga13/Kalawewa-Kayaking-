import { X, Check, Leaf, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [imgHover, setImgHover] = useState<number | null>(null);

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
        @keyframes rowReveal {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(12px, -18px) scale(1.05); }
          66%       { transform: translate(-8px, 10px) scale(0.97); }
        }
        @keyframes shimmerLine {
          0%   { left: -100%; }
          100% { left: 100%; }
        }
        .uv-row { transition: background 0.22s, transform 0.22s; }
        .uv-row:hover { background: rgba(255,255,255,0.03); transform: scaleX(1.005); }
        .uv-img-card { transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease; }
        .uv-img-card:hover { transform: scale(1.025) translateY(-6px); box-shadow: 0 32px 80px rgba(0,0,0,0.4); }
      `}</style>

      <section
        id="unique-value"
        style={{ backgroundColor: "#1C3D2E", padding: "110px 24px 0", position: "relative", overflow: "hidden" }}
      >
        {/* Background orbs */}
        <div style={{ position: "absolute", top: "80px", left: "-120px", width: "380px", height: "380px", borderRadius: "50%", background: "rgba(76,175,130,0.05)", filter: "blur(80px)", animation: "floatOrb 12s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "200px", right: "-100px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(33,150,168,0.06)", filter: "blur(70px)", animation: "floatOrb 15s ease-in-out 3s infinite", pointerEvents: "none" }} />

        {/* Decorative grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(126,200,164,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(126,200,164,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div ref={headerRef} style={{ textAlign: "center", marginBottom: "72px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(126,200,164,0.1)", color: "#7EC8A4",
              padding: "7px 20px", borderRadius: "50px",
              fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif",
              border: "1px solid rgba(126,200,164,0.2)", marginBottom: "22px",
              opacity: headerIn ? 1 : 0, transform: headerIn ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <Zap size={12} color="#7EC8A4" />
              Why Choose Us
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(34px, 5.5vw, 62px)",
              fontWeight: 700, color: "#fff", lineHeight: 1.08,
              marginBottom: "18px",
              opacity: headerIn ? 1 : 0, transform: headerIn ? "translateY(0)" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
            }}>
              Beyond the{" "}
              <span style={{ color: "#7EC8A4", fontStyle: "italic" }}>Ordinary Safari</span>
            </h2>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 300,
              color: "rgba(255,255,255,0.55)", fontSize: "clamp(14px, 1.8vw, 17px)",
              maxWidth: "520px", margin: "0 auto", lineHeight: 1.8,
              opacity: headerIn ? 1 : 0, transform: headerIn ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.7s ease 0.22s, transform 0.7s ease 0.22s",
            }}>
              Traditional safaris take you close.{" "}
              <em style={{ color: "#7EC8A4", fontStyle: "italic" }}>Wild Paddle takes you into</em>{" "}
              the experience.
            </p>
          </div>

          {/* ── Comparison Table ── */}
          <div ref={tableRef} style={{ marginBottom: "72px" }}>

            {/* Column headers */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr auto 1fr",
              gap: "0", marginBottom: "4px",
              opacity: tableIn ? 1 : 0,
              transition: "opacity 0.6s ease 0.1s",
            }}>
              <div style={{
                background: "rgba(255,100,100,0.06)",
                border: "1px solid rgba(255,100,100,0.15)",
                borderBottom: "none",
                borderRadius: "20px 20px 0 0",
                padding: "22px 32px 18px",
              }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,100,100,0.1)", border: "1px solid rgba(255,100,100,0.2)", borderRadius: "50px", padding: "5px 14px", marginBottom: "10px" }}>
                  <X size={12} color="#FF6B6B" />
                  <span style={{ color: "#FF6B6B", fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Traditional Safari</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>The Old Way</h3>
              </div>

              {/* VS divider */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px", zIndex: 2 }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#1C3D2E", border: "2px solid rgba(126,200,164,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: 700, color: "#7EC8A4", letterSpacing: "0.5px" }}>VS</span>
                </div>
              </div>

              <div style={{
                background: "linear-gradient(135deg, rgba(76,175,130,0.1), rgba(33,150,168,0.08))",
                border: "1px solid rgba(126,200,164,0.25)",
                borderBottom: "none",
                borderRadius: "20px 20px 0 0",
                padding: "22px 32px 18px",
                position: "relative", overflow: "hidden",
              }}>
                {/* Shimmer line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #7EC8A4, transparent)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, bottom: 0, width: "60%", background: "rgba(255,255,255,0.4)", animation: "shimmerLine 2.5s ease-in-out infinite" }} />
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(76,175,130,0.15)", border: "1px solid rgba(126,200,164,0.35)", borderRadius: "50px", padding: "5px 14px", marginBottom: "10px" }}>
                  <Leaf size={12} color="#7EC8A4" />
                  <span style={{ color: "#7EC8A4", fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Wild Paddle Eco-Tour</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#fff", fontWeight: 600 }}>The Wild Paddle Way</h3>
              </div>
            </div>

            {/* Rows */}
            <div style={{ borderRadius: "0 0 20px 20px", overflow: "hidden" }}>
              {comparisons.map((row, i) => (
                <div
                  key={i}
                  className="uv-row"
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
                  <div style={{
                    background: activeRow === i ? "rgba(255,100,100,0.05)" : "rgba(255,100,100,0.03)",
                    border: "1px solid rgba(255,100,100,0.1)",
                    borderTop: "none", borderRight: "none",
                    padding: "18px 28px",
                    display: "flex", alignItems: "center", gap: "14px",
                    transition: "background 0.2s",
                  }}>
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%",
                      background: "rgba(255,100,100,0.1)",
                      border: "1px solid rgba(255,100,100,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: activeRow === i ? "scale(1.1)" : "scale(1)",
                    }}>
                      <X size={11} color="#FF6B6B" />
                    </div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                      {row.con}
                    </span>
                  </div>

                  {/* Center line */}
                  <div style={{ width: "1px", background: "rgba(126,200,164,0.12)", position: "relative" }}>
                    {activeRow === i && (
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "8px", height: "8px", borderRadius: "50%", background: "#7EC8A4" }} />
                    )}
                  </div>

                  {/* Pro side */}
                  <div style={{
                    background: activeRow === i ? "rgba(76,175,130,0.08)" : "rgba(76,175,130,0.03)",
                    border: "1px solid rgba(126,200,164,0.12)",
                    borderTop: "none", borderLeft: "none",
                    padding: "18px 28px",
                    display: "flex", alignItems: "center", gap: "14px",
                    transition: "background 0.2s",
                  }}>
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%",
                      background: "rgba(76,175,130,0.15)",
                      border: "1px solid rgba(126,200,164,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: activeRow === i ? "scale(1.15)" : "scale(1)",
                    }}>
                      <Check size={11} color="#7EC8A4" />
                    </div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "14px", color: activeRow === i ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.72)", lineHeight: 1.5, transition: "color 0.2s" }}>
                      {row.pro}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Image strip ── */}
          <div
            ref={imgsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              { img: jungleImg, label: "Ancient Rainforest", sub: "Biodiversity hotspot", delay: 0 },
              { img: elephantImg, label: "Elephant Encounters", sub: "As close as nature allows", delay: 0.12 },
            ].map((item, i) => (
              <div
                key={i}
                className="uv-img-card"
                onMouseEnter={() => setImgHover(i)}
                onMouseLeave={() => setImgHover(null)}
                style={{
                  height: "320px",
                  borderRadius: "22px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "default",
                  opacity: imgsIn ? 1 : 0,
                  transform: imgsIn ? "translateY(0)" : "translateY(36px)",
                  transition: `opacity 0.65s ease ${item.delay}s, transform 0.65s ease ${item.delay}s`,
                }}
              >
                {/* Image */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.6s ease",
                  transform: imgHover === i ? "scale(1.06)" : "scale(1)",
                }} />

                {/* Gradient */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,25,15,0.88) 0%, rgba(10,25,15,0.2) 55%, transparent 100%)" }} />

                {/* Border glow on hover */}
                <div style={{
                  position: "absolute", inset: 0,
                  borderRadius: "22px",
                  border: `1px solid ${imgHover === i ? "rgba(126,200,164,0.4)" : "rgba(126,200,164,0.1)"}`,
                  transition: "border-color 0.3s",
                  pointerEvents: "none",
                }} />

                {/* Caption */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 28px 26px" }}>
                  <div style={{
                    display: "inline-block",
                    background: "rgba(126,200,164,0.15)",
                    border: "1px solid rgba(126,200,164,0.25)",
                    borderRadius: "50px",
                    padding: "3px 12px",
                    marginBottom: "8px",
                  }}>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", fontWeight: 600, color: "#7EC8A4", letterSpacing: "2px", textTransform: "uppercase" }}>
                      {item.sub}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", fontSize: "22px", fontWeight: 700, lineHeight: 1.2 }}>
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated bottom wave */}
        <div style={{ marginTop: "90px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path fill="rgba(126,200,164,0.1)" d="M0,50 C400,10 900,70 1440,30 L1440,80 L0,80 Z">
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