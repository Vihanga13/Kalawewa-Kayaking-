import { Play, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

interface HeroSectionProps {
  heroImg: string;
}

const STATS = [
  { target: 500, suffix: "+", label: "Happy Adventurers" },
  { target: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
  { target: 100, suffix: "%", label: "Safe Record" },
];

function useCountUp(target: number, duration = 2000, decimals = 0, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((target * ease).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, decimals, started]);
  return value;
}

function StatItem({
  stat,
  started,
  isLast,
}: {
  stat: (typeof STATS)[0];
  started: boolean;
  isLast: boolean;
}) {
  const val = useCountUp(stat.target, 2000, stat.decimals ?? 0, started);
  return (
    <div
      style={{
        textAlign: "center",
        padding: "0 28px",
        position: "relative",
        flex: "0 0 auto",
      }}
    >
      {!isLast && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "36px",
            width: "1px",
            background: "rgba(255,255,255,0.15)",
          }}
        />
      )}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "34px",
          fontWeight: 700,
          color: "#7EC8A4",
          lineHeight: 1,
          marginBottom: "4px",
          letterSpacing: "-0.5px",
        }}
      >
        {stat.decimals ? val.toFixed(stat.decimals) : Math.round(val)}
        {stat.suffix}
      </div>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "10px",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export function HeroSection({ heroImg }: HeroSectionProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [bgLoaded, setBgLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rippleIdRef = useRef(0);

  /* preload hero image */
  useEffect(() => {
    const img = new Image();
    img.src = heroImg;
    img.onload = () => setBgLoaded(true);
  }, [heroImg]);

  /* start stats after mount */
  useEffect(() => {
    const t = setTimeout(() => setStatsStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  /* parallax mouse tracking */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth: w, innerHeight: h } = window;
    setMousePos({ x: (e.clientX / w - 0.5) * 2, y: (e.clientY / h - 0.5) * 2 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* water ripple on click */
  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current!.getBoundingClientRect();
    const id = ++rippleIdRef.current;
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1800);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const bgX = mousePos.x * -18;
  const bgY = mousePos.y * -12;
  const contentX = mousePos.x * 8;
  const contentY = mousePos.y * 5;

  return (
    <>
      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />

      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.08) translate(0px, 0px); }
          50%  { transform: scale(1.12) translate(-12px, 8px); }
          100% { transform: scale(1.08) translate(0px, 0px); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgeFade {
          from { opacity: 0; transform: translateX(-50%) translateY(-16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(76,175,130,0.6); }
          50%       { opacity: 0.5; box-shadow: 0 0 0 6px rgba(76,175,130,0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes waterRipple {
          0%   { transform: scale(0.2); opacity: 0.7; }
          100% { transform: scale(6);  opacity: 0; }
        }
        @keyframes floatParticle {
          0%   { transform: translateY(0) scale(1);   opacity: 0.12; }
          50%  { transform: translateY(-40px) scale(1.3); opacity: 0.25; }
          100% { transform: translateY(0) scale(1);   opacity: 0.12; }
        }
        @keyframes waveAnim1 {
          0%, 100% { d: path("M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50 C1300,35 1370,45 1440,50 L1440,80 L0,80 Z"); }
          50%       { d: path("M0,60 C200,85 400,30 600,60 C800,85 1000,30 1200,60 C1300,72 1370,55 1440,60 L1440,80 L0,80 Z"); }
        }
        @keyframes scrollLine {
          0%   { top: -100%; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes textReveal {
          from { opacity: 0; clip-path: inset(0 100% 0 0); }
          to   { opacity: 1; clip-path: inset(0 0% 0 0); }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes grainMove {
          0%   { transform: translate(0,0); }
          10%  { transform: translate(-2%,-3%); }
          30%  { transform: translate(3%,2%); }
          50%  { transform: translate(-1%,4%); }
          70%  { transform: translate(2%,-2%); }
          90%  { transform: translate(-3%,1%); }
          100% { transform: translate(0,0); }
        }
        .hero-btn-primary {
          background: linear-gradient(135deg, #4CAF82 0%, #1a9aac 100%);
          color: #fff;
          border: none;
          padding: 18px 42px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          box-shadow: 0 8px 32px rgba(76,175,130,0.38);
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease;
          position: relative;
          overflow: hidden;
        }
        .hero-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
          background-size: 400px 100%;
          background-position: -400px 0;
          transition: none;
        }
        .hero-btn-primary:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 18px 48px rgba(76,175,130,0.55); }
        .hero-btn-primary:hover::after { animation: shimmer 0.7s ease forwards; }
        .hero-btn-primary:active { transform: translateY(-1px) scale(0.99); }

        .hero-btn-secondary {
          background: rgba(255,255,255,0.09);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.28);
          padding: 18px 36px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background 0.25s, border-color 0.25s, transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-3px) scale(1.02);
        }
        .hero-btn-secondary:active { transform: translateY(0) scale(0.99); }

        .scroll-indicator:hover .scroll-label { color: #7EC8A4; }
      `}</style>

      <section
        ref={sectionRef}
        onClick={handleSectionClick}
        id="hero"
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "700px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "crosshair",
        }}
      >
        {/* ── Background with Parallax ── */}
        <div
          style={{
            position: "absolute",
            inset: "-60px",
            backgroundImage: bgLoaded ? `url(${heroImg})` : undefined,
            background: bgLoaded
              ? undefined
              : "linear-gradient(160deg, #0a3d2e 0%, #0d5c40 30%, #0a4a5c 60%, #0a1f15 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
            transform: `scale(1.08) translate(${bgX}px, ${bgY}px)`,
            transition: "transform 0.12s linear",
            animation: "kenBurns 22s ease-in-out infinite",
          }}
        />

        {/* Film grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
            opacity: 0.45,
            animation: "grainMove 0.4s steps(2) infinite",
            pointerEvents: "none",
          }}
        />

        {/* Gradient layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(6,18,10,0.62) 0%, rgba(6,18,10,0.2) 38%, rgba(6,18,10,0.78) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 30%, rgba(3,10,5,0.55) 100%)",
          }}
        />

        {/* Floating light orbs */}
        {[
          { top: "18%", left: "12%", size: 220, delay: 0, color: "rgba(76,175,130,0.07)" },
          { top: "60%", left: "78%", size: 280, delay: 2.5, color: "rgba(33,150,168,0.07)" },
          { top: "35%", left: "60%", size: 160, delay: 1.2, color: "rgba(126,200,164,0.05)" },
        ].map((orb, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: orb.top,
              left: orb.left,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: orb.color,
              filter: "blur(60px)",
              animation: `floatParticle ${7 + i * 1.5}s ease-in-out ${orb.delay}s infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Click ripple effects */}
        {ripples.map((r) => (
          <div
            key={r.id}
            style={{
              position: "absolute",
              left: r.x,
              top: r.y,
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "1.5px solid rgba(126,200,164,0.6)",
              transform: "translate(-50%,-50%) scale(0.2)",
              animation: "waterRipple 1.8s cubic-bezier(0.22,1,0.36,1) forwards",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Badge */}
        <div
          style={{
            position: "absolute",
            top: "116px",
            left: "50%",
            display: "flex",
            alignItems: "center",
            gap: "9px",
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.18)",
            padding: "9px 24px",
            borderRadius: "50px",
            whiteSpace: "nowrap",
            animation: "badgeFade 0.7s ease-out both",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#4CAF82",
              animation: "pulseGlow 2.2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.92)",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
            }}
          >
            First in South Asia · Sri Lanka
          </span>
        </div>

        {/* Main Content with subtle parallax */}
        <div
          style={{
            position: "relative",
            textAlign: "center",
            padding: "0 24px",
            maxWidth: "920px",
            marginTop: "32px",
            willChange: "transform",
            transform: `translate(${contentX}px, ${contentY}px)`,
            transition: "transform 0.18s linear",
          }}
        >
          {/* Eyebrow line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "20px",
              animation: "heroFadeUp 0.9s ease-out 0.1s both",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "48px",
                background: "rgba(126,200,164,0.6)",
                transformOrigin: "right",
                animation: "lineExpand 0.8s ease-out 0.6s both",
              }}
            />
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "11px",
                color: "#7EC8A4",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Kayak · Encounter · Connect
            </span>
            <div
              style={{
                height: "1px",
                width: "48px",
                background: "rgba(126,200,164,0.6)",
                transformOrigin: "left",
                animation: "lineExpand 0.8s ease-out 0.6s both",
              }}
            />
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 7.5vw, 88px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.05,
              marginBottom: "26px",
              letterSpacing: "-1px",
              animation: "heroFadeUp 1s ease-out 0.25s both",
            }}
          >
            Paddle Beside{" "}
            <span
              style={{
                color: "#7EC8A4",
                fontStyle: "italic",
                position: "relative",
                display: "inline-block",
              }}
            >
              Wild Elephants
              <svg
                viewBox="0 0 340 14"
                style={{
                  position: "absolute",
                  bottom: "-6px",
                  left: 0,
                  width: "100%",
                  height: "14px",
                  overflow: "visible",
                }}
              >
                <path
                  d="M4,10 C60,2 140,12 200,6 C260,0 310,8 336,5"
                  stroke="#7EC8A4"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 380,
                    strokeDashoffset: 380,
                    animation: "textReveal 1.2s ease-out 1.1s forwards",
                  }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="380"
                    to="0"
                    dur="1.2s"
                    begin="1.1s"
                    fill="freeze"
                  />
                </path>
              </svg>
            </span>
            <br />
            <span
              style={{
                fontSize: "0.52em",
                fontWeight: 600,
                fontStyle: "normal",
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "3px",
                textTransform: "uppercase",
                display: "block",
                marginTop: "12px",
              }}
            >
              A First in South Asia
            </span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(15px, 2vw, 19px)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.8,
              margin: "0 auto 40px",
              maxWidth: "580px",
              animation: "heroFadeUp 1s ease-out 0.45s both",
            }}
          >
            Glide silently through ancient rivers as wild elephants bathe just metres away.
            An intimate wildlife encounter{" "}
            <em style={{ color: "rgba(255,255,255,0.9)", fontStyle: "italic" }}>
              unlike anywhere else on Earth.
            </em>
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              animation: "heroFadeUp 1s ease-out 0.6s both",
            }}
          >
            <button className="hero-btn-primary" onClick={() => scrollTo("#booking")}>
              Book Your Adventure
            </button>

            <button className="hero-btn-secondary" onClick={() => setVideoOpen(true)}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 0 4px rgba(255,255,255,0.15)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
              >
                <Play size={13} fill="#1C3D2E" color="#1C3D2E" style={{ marginLeft: "2px" }} />
              </div>
              Watch the Experience
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "60px",
              flexWrap: "wrap",
              animation: "heroFadeUp 1s ease-out 0.8s both",
            }}
          >
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} started={statsStarted} isLast={i === STATS.length - 1} />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          className="scroll-indicator"
          onClick={() => scrollTo("#about")}
          style={{
            position: "absolute",
            bottom: "90px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            animation: "heroFadeUp 1s ease-out 1.2s both",
          }}
        >
          <span
            className="scroll-label"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "9px",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
          >
            Discover More
          </span>
          <div
            style={{
              width: "1px",
              height: "44px",
              background: "rgba(255,255,255,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-100%",
                left: 0,
                right: 0,
                height: "100%",
                background: "linear-gradient(to bottom, transparent, #7EC8A4, transparent)",
                animation: "scrollLine 1.8s ease-in-out infinite",
              }}
            />
          </div>
          <ChevronDown
            size={16}
            color="rgba(126,200,164,0.7)"
          />
        </button>

        {/* Animated wave divider */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "80px" }}
          >
            {/* Back wave */}
            <path fill="rgba(126,200,164,0.15)" d="M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50 C1300,35 1370,45 1440,50 L1440,80 L0,80 Z">
              <animate
                attributeName="d"
                dur="5s"
                repeatCount="indefinite"
                values="
                  M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50 C1300,35 1370,45 1440,50 L1440,80 L0,80 Z;
                  M0,60 C200,85 400,30 600,60 C800,85 1000,30 1200,60 C1300,72 1370,55 1440,60 L1440,80 L0,80 Z;
                  M0,50 C200,20 400,80 600,50 C800,20 1000,80 1200,50 C1300,35 1370,45 1440,50 L1440,80 L0,80 Z
                "
              />
            </path>
            {/* Front wave */}
            <path fill="#FAF5EA" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z">
              <animate
                attributeName="d"
                dur="7s"
                repeatCount="indefinite"
                values="
                  M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z;
                  M0,55 C360,15 1080,65 1440,55 L1440,80 L0,80 Z;
                  M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z
                "
              />
            </path>
          </svg>
        </div>

        {/* Video Modal */}
        {videoOpen && (
          <div
            onClick={() => setVideoOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              background: "rgba(0,0,0,0.88)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              cursor: "default",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#0a0a0a",
                borderRadius: "20px",
                overflow: "hidden",
                width: "90%",
                maxWidth: "900px",
                aspectRatio: "16/9",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(126,200,164,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "16px",
                animation: "modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  border: "2px solid rgba(126,200,164,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px",
                }}
              >
                <Play size={28} color="#7EC8A4" style={{ marginLeft: "4px" }} />
              </div>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.5)",
                  textAlign: "center",
                }}
              >
                Video coming soon — connect your media source
              </p>
              <button
                onClick={() => setVideoOpen(false)}
                style={{
                  marginTop: "8px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.8)",
                  padding: "10px 28px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "13px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
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