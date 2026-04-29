import { Play, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface HeroSectionProps {
  onBookClick?: () => void;
  onVideoClick?: () => void;
}

const STATS = [
  { target: 500, suffix: "+", label: "Happy Adventurers", decimals: 0 },
  { target: 4.9, suffix: "★", label: "Average Rating",    decimals: 1 },
  { target: 100, suffix: "%", label: "Safe Record",       decimals: 0 },
];

/* Free nature/river videos from Pixabay CDN — replace with your own footage */
const BG_VIDEOS = [
  "https://cdn.pixabay.com/video/2019/08/05/25826-353666215_large.mp4",
  "https://cdn.pixabay.com/video/2022/07/17/126121-730438836_large.mp4",
];

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80";

function useCountUp(target: number, decimals: number, started: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    const dur = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((target * e).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, decimals, started]);
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val);
}

function StatItem({ stat, started }: { stat: (typeof STATS)[0]; started: boolean }) {
  const val = useCountUp(stat.target, stat.decimals, started);
  return (
    <div style={{ textAlign: "center", padding: "0 22px" }}>
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontSize: "clamp(22px, 3vw, 30px)",
        fontWeight: 700,
        color: "#8DE0B5",
        lineHeight: 1,
        letterSpacing: "-0.5px",
      }}>
        {val}{stat.suffix}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "10px",
        color: "rgba(255,255,255,0.42)",
        letterSpacing: "1.8px",
        textTransform: "uppercase",
        marginTop: "5px",
      }}>
        {stat.label}
      </div>
    </div>
  );
}

export function HeroSection({ onBookClick, onVideoClick }: HeroSectionProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoIdx,    setVideoIdx]    = useState(0);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [statsGo,     setStatsGo]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsGo(true), 700);
    return () => clearTimeout(t);
  }, []);

  const tryNext = () => {
    if (videoIdx < BG_VIDEOS.length - 1) setVideoIdx((v) => v + 1);
    else setVideoFailed(true);
  };

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,800;1,9..144,700&family=DM+Sans:wght@300;400;500&display=swap"
      />

      <style>{`
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgeDrop {
          from { opacity: 0; transform: translateX(-50%) translateY(-14px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes liveDot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        @keyframes scrollDrip {
          0%   { top: -100%; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes rippleOut {
          from { transform: translate(-50%,-50%) scale(0.3); opacity: 0.6; }
          to   { transform: translate(-50%,-50%) scale(2.6); opacity: 0; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.9) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .hp-book {
          background: linear-gradient(135deg, #4CAF82, #1C8EA0);
          color: #fff;
          border: none;
          padding: 15px 38px;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.4px;
          cursor: pointer;
          box-shadow: 0 6px 28px rgba(76,175,130,0.38);
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
        }
        .hp-book:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 16px 40px rgba(76,175,130,0.52);
        }
        .hp-watch {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          padding: 14px 28px;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          cursor: pointer;
          display: flex; align-items: center; gap: 10px;
          transition: background 0.25s, border-color 0.25s, transform 0.3s;
        }
        .hp-watch:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.38);
          transform: translateY(-3px);
        }
      `}</style>

      <section
        id="hero"
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "620px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* ── Video / Fallback ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {!videoFailed ? (
            <video
              key={videoIdx}
              autoPlay muted loop playsInline
              onError={tryNext}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                minWidth: "100%", minHeight: "100%",
                width: "auto", height: "auto",
                transform: "translate(-50%,-50%)",
                objectFit: "cover",
                filter: "saturate(1.15) brightness(0.78)",
              }}
            >
              <source src={BG_VIDEOS[videoIdx]} type="video/mp4" />
            </video>
          ) : (
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${FALLBACK_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.72)",
            }} />
          )}

          {/* Overlays */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(4,14,8,0.58) 0%, rgba(4,14,8,0.18) 45%, rgba(4,14,8,0.68) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 90% 80% at 50% 42%, transparent 28%, rgba(2,8,4,0.42) 100%)",
          }} />
        </div>

        {/* ── Headline & content ── */}
        <div style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "800px",
          marginTop: "20px",
        }}>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(38px, 7.5vw, 82px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.06,
            marginBottom: "20px",
            letterSpacing: "-1px",
            textShadow: "0 2px 28px rgba(0,0,0,0.32)",
            animation: "heroReveal 0.8s ease-out 0.25s both",
          }}>
            Paddle Beside{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ color: "#8DE0B5", fontStyle: "italic" }}>Wild Elephants</span>
              {/* Animated underline */}
              <svg viewBox="0 0 320 10" style={{
                position: "absolute", bottom: "-6px", left: 0,
                width: "100%", height: "10px", overflow: "visible",
              }}>
                <path
                  d="M2,7 C60,1 140,9 200,4 C260,-1 300,6 318,4"
                  stroke="#4CAF82" strokeWidth="2.2" fill="none"
                  strokeLinecap="round"
                  strokeDasharray="340" strokeDashoffset="340"
                >
                  <animate attributeName="stroke-dashoffset"
                    from="340" to="0" dur="1s" begin="1.1s" fill="freeze" />
                </path>
              </svg>
            </span>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(14px, 1.9vw, 17px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.82,
            maxWidth: "500px",
            margin: "0 auto 36px",
            animation: "heroReveal 0.8s ease-out 0.4s both",
          }}>
            Glide silently through ancient rivers as wild elephants bathe metres
            away — an intimate encounter{" "}
            <em style={{ color: "rgba(255,255,255,0.9)", fontStyle: "italic" }}>
              found nowhere else on Earth.
            </em>
          </p>

          {/* Buttons */}
          <div style={{
            display: "flex", gap: "14px",
            justifyContent: "center", flexWrap: "wrap",
            marginBottom: "52px",
            animation: "heroReveal 0.8s ease-out 0.55s both",
          }}>
            <button className="hp-book"
              onClick={() => { onBookClick?.(); scrollTo("#booking"); }}>
              Book Your Adventure
            </button>

            <button className="hp-watch"
              onClick={() => { setModalOpen(true); onVideoClick?.(); }}>
              {/* Pulsing play button */}
              <div style={{ position: "relative", width: "30px", height: "30px", flexShrink: 0 }}>
                <div style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  width: "30px", height: "30px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.14)",
                  animation: "rippleOut 2s ease-out infinite",
                }} />
                <div style={{
                  position: "relative", zIndex: 1,
                  width: "30px", height: "30px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Play size={11} fill="#1C3D2E" color="#1C3D2E" style={{ marginLeft: "2px" }} />
                </div>
              </div>
              Watch the Experience
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "heroReveal 0.8s ease-out 0.7s both",
          }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} style={{ position: "relative" }}>
                {i > 0 && (
                  <div style={{
                    position: "absolute",
                    left: 0, top: "50%",
                    transform: "translateY(-50%)",
                    height: "26px", width: "1px",
                    background: "rgba(255,255,255,0.1)",
                  }} />
                )}
                <StatItem stat={stat} started={statsGo} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <button
          onClick={() => scrollTo("#about")}
          style={{
            position: "absolute",
            bottom: "82px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "none", border: "none",
            cursor: "pointer",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "7px",
            animation: "heroReveal 0.8s ease-out 1s both",
            zIndex: 10,
          }}
        >
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "9px", color: "rgba(255,255,255,0.35)",
            letterSpacing: "2.5px", textTransform: "uppercase",
          }}>Scroll</span>
          <div style={{
            width: "1px", height: "38px",
            background: "rgba(255,255,255,0.1)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              left: 0, right: 0, height: "100%",
              background: "linear-gradient(to bottom, transparent, #8DE0B5, transparent)",
              animation: "scrollDrip 1.8s ease-in-out infinite",
            }} />
          </div>
          <ChevronDown size={13} color="rgba(141,224,181,0.55)" />
        </button>

        {/* ── Animated wave ── */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 5 }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "64px" }}>
            <path fill="#FAF5EA" d="M0,40 C360,80 1080,0 1440,40 L1440,64 L0,64 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite"
                values="M0,40 C360,80 1080,0 1440,40 L1440,64 L0,64 Z;M0,24 C360,4 1080,58 1440,24 L1440,64 L0,64 Z;M0,40 C360,80 1080,0 1440,40 L1440,64 L0,64 Z" />
            </path>
          </svg>
        </div>

        {/* ── Video Modal ── */}
        {modalOpen && (
          <div
            onClick={() => setModalOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(0,0,0,0.88)",
              backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#0b1c10",
                borderRadius: "20px",
                padding: "44px 36px",
                textAlign: "center",
                maxWidth: "420px",
                width: "90%",
                border: "1px solid rgba(141,224,181,0.1)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
                animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
              }}
            >
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                border: "1.5px solid rgba(141,224,181,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px",
              }}>
                <Play size={20} color="#8DE0B5" style={{ marginLeft: "3px" }} />
              </div>
              <h3 style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "22px", fontWeight: 700,
                color: "#fff", marginBottom: "10px",
              }}>
                Experience Video
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px", fontWeight: 300,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.72, marginBottom: "24px",
              }}>
                Breathtaking footage coming soon.
                Connect your video source to activate.
              </p>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  background: "rgba(141,224,181,0.08)",
                  border: "1px solid rgba(141,224,181,0.22)",
                  color: "#8DE0B5",
                  padding: "9px 26px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(141,224,181,0.16)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(141,224,181,0.08)")}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}