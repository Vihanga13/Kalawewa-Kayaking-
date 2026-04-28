import { useEffect, useRef, useState } from "react";
import { Waves } from "lucide-react";

const C = {
  navy:      "#1B3A6B",
  cyan:      "#00B4D8",
  lightCyan: "#48CAE4",
  red:       "#E63329",
  cream:     "#ffffff",
  dark:      "#0D2340",
  ink:       "#1a2e1a",
  paper:     "#ffffff",
  paperDark: "#F4F7FB",
};

function useInView(threshold = 0.1) {
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

// Torn paper edge SVG divider
function TornEdge({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 800 28"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{
        display: "block",
        width: "100%",
        height: "18px",
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <path
        fill={C.paperDark}
        d="M0,14 L12,8 L28,18 L44,6 L58,16 L72,4 L88,14 L104,7 L118,17 L132,5 L148,15 L164,3 L180,13 L196,8 L210,16 L226,4 L240,14 L256,7 L270,18 L286,5 L300,15 L316,3 L330,13 L346,9 L360,17 L376,4 L390,14 L406,8 L420,18 L436,5 L450,15 L466,3 L480,13 L496,7 L510,17 L526,5 L540,15 L556,4 L570,14 L586,8 L600,18 L616,5 L630,15 L646,3 L660,13 L676,9 L690,17 L706,4 L720,14 L736,8 L750,18 L766,6 L780,15 L800,10 L800,28 L0,28 Z"
      />
    </svg>
  );
}

// Ink node for timeline
function InkNode({ active, color }: { active: boolean; color: string }) {
  return (
    <div style={{
      width: "14px", height: "14px", borderRadius: "50%",
      background: active ? color : "transparent",
      border: `2px solid ${color}`,
      flexShrink: 0,
      transition: "background 0.4s, transform 0.4s",
      transform: active ? "scale(1)" : "scale(0.6)",
      boxShadow: active ? `0 0 0 4px ${color}18` : "none",
    }} />
  );
}

const journalEntries = [
  {
    num: "01",
    tag: "Wildlife",
    title: "Wild Elephant Encounters",
    description:
      "Paddle silently within metres of bathing elephant herds. An intimate wildlife moment found nowhere else in Asia.",
    stat: "50+",
    statLabel: "Elephants per tour",
    accent: C.cyan,
    symbol: "🐘",
  },
  {
    num: "02",
    tag: "Heritage",
    title: "Ancient Kalawewa Waters",
    description:
      "Glide across a 2,000-year-old reservoir surrounded by jungle canopies, misty horizons, and pure silence.",
    stat: "3+ hrs",
    statLabel: "Immersive paddle",
    accent: C.navy,
    symbol: "🌿",
  },
  {
    num: "03",
    tag: "Expertise",
    title: "Certified Naturalist Guides",
    description:
      "Our experts reveal elephant behaviour secrets while keeping every encounter safe, respectful, and unforgettable.",
    stat: "8 yrs",
    statLabel: "Pioneering the experience",
    accent: C.red,
    symbol: "🔭",
  },
];

const timelineNodes = [
  { year: "460 CE", text: "Kalawewa Reservoir built by King Dhatusena" },
  { year: "2016",   text: "Kayaking Kalawewa founded — world's first kayak elephant safari" },
  { year: "2019",   text: "500+ adventurers guided through the wildlife corridor" },
  { year: "2024",   text: "Rated #1 nature experience in North Central Sri Lanka" },
];

const imgs = [
  "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=900&h=600&fit=crop",
  "https://images.unsplash.com/photo-1549366021-8a06e197bfd1?w=900&h=600&fit=crop",
  "https://images.unsplash.com/photo-1582433736551-19e3a2e6c0b6?w=900&h=600&fit=crop",
];

export function AboutSection() {
  const { ref: heroRef,    inView: heroIn    } = useInView(0.06);
  const { ref: entriesRef, inView: entriesIn } = useInView(0.06);
  const { ref: timeRef,    inView: timeIn    } = useInView(0.06);
  const { ref: statsRef,   inView: statsIn   } = useInView(0.08);

  const [activeImg, setActiveImg] = useState(0);
  const [activeNode, setActiveNode] = useState(-1);

  useEffect(() => {
    const t = setInterval(() => setActiveImg((p) => (p + 1) % imgs.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!timeIn) return;
    let i = 0;
    const t = setInterval(() => {
      setActiveNode(i);
      i++;
      if (i >= timelineNodes.length) clearInterval(t);
    }, 300);
    return () => clearInterval(t);
  }, [timeIn]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;0,9..144,800;1,9..144,700&family=DM+Sans:wght@300;400;500;600&family=Caveat:wght@400;600&display=swap"
      />
      <style>{`
        @keyframes floatOrb { 0%,100%{transform:translate(0,0);} 50%{transform:translate(10px,-16px);} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
        @keyframes penDraw { from{stroke-dashoffset:600;} to{stroke-dashoffset:0;} }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .jentry:hover .jentry-bar { transform: scaleX(1) !important; }
        .jentry:hover .jentry-num { color: var(--jentry-accent) !important; }
        .jentry:hover { background: ${C.paperDark} !important; }
      `}</style>

      <section
        id="about"
        style={{
          background: C.cream,
          padding: "0 0",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── JOURNAL COVER STRIP ── */}
        <div style={{
          background: C.navy,
          padding: "18px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              width: "32px", height: "32px",
              border: `1.5px solid ${C.cyan}60`,
              borderRadius: "4px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Waves size={14} color={C.cyan} />
            </div>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px", fontWeight: 600,
              letterSpacing: "3px", textTransform: "uppercase",
              color: `rgba(255,255,255,0.45)`,
            }}>
              Field Journal — Kayaking Kalawewa
            </span>
          </div>
          <div style={{ display: "flex", gap: "28px" }}>
            {["Wildlife", "Heritage", "Expertise"].map((t, i) => (
              <span key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px", fontWeight: 500,
                letterSpacing: "2px", textTransform: "uppercase",
                color: i === 0 ? C.cyan : `rgba(255,255,255,0.28)`,
              }}>
                {t}
              </span>
            ))}
          </div>
          <span style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "14px",
            color: `rgba(255,255,255,0.3)`,
          }}>
            Vol. I — Minneriya–Kaudulla Corridor
          </span>
        </div>

        {/* ── HERO SPREAD: two-column open-book layout ── */}
        <div
          ref={heroRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "520px",
            position: "relative",
          }}
        >
          {/* Left page — image */}
          <div style={{
            background: C.paperDark,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Page lines */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                transparent,
                transparent 31px,
                ${C.navy}08 31px,
                ${C.navy}08 32px
              )`,
              pointerEvents: "none",
              zIndex: 1,
            }} />

            {/* Red margin line */}
            <div style={{
              position: "absolute",
              left: "52px", top: 0, bottom: 0,
              width: "1px",
              background: `${C.red}30`,
              zIndex: 2,
            }} />

            {/* Chapter annotation */}
            <div style={{
              position: "absolute",
              top: "28px", left: "60px",
              zIndex: 3,
              opacity: heroIn ? 1 : 0,
              transition: "opacity 0.6s 0.1s",
            }}>
              <div style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "13px",
                color: `${C.navy}60`,
                marginBottom: "4px",
              }}>
                Chapter I.
              </div>
              <div style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(22px, 3vw, 38px)",
                fontWeight: 800,
                color: C.navy,
                lineHeight: 1.1,
                marginBottom: "6px",
              }}>
                Paddle Into the Heart
              </div>
              <div style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(22px, 3vw, 38px)",
                fontWeight: 700,
                fontStyle: "italic",
                color: C.cyan,
                lineHeight: 1.1,
                marginBottom: "20px",
              }}>
                of Elephant Country
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "#5A6B5E",
                lineHeight: 1.78,
                maxWidth: "320px",
              }}>
                Deep in Sri Lanka's{" "}
                <strong style={{ color: C.cyan, fontWeight: 500 }}>
                  Minneriya–Kaudulla wildlife corridor
                </strong>{" "}
                we pioneered the world's first kayak-based elephant watching. No engines, no crowds
                — just you, the ancient water, and gentle giants.
              </p>
            </div>

            {/* Photo — bottom of left page, like a specimen photo taped in */}
            <div style={{
              position: "absolute",
              bottom: "0",
              left: "52px",
              right: "0",
              height: "240px",
              overflow: "hidden",
              zIndex: 3,
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s 0.3s, transform 0.8s 0.3s",
            }}>
              {/* Tape strips */}
              <div style={{
                position: "absolute", top: "-6px", left: "18px",
                width: "60px", height: "18px",
                background: `${C.cyan}20`, borderRadius: "2px",
                border: `1px solid ${C.cyan}30`,
                zIndex: 10,
                transform: "rotate(-2deg)",
              }} />
              <div style={{
                position: "absolute", top: "-6px", right: "28px",
                width: "60px", height: "18px",
                background: `${C.cyan}20`, borderRadius: "2px",
                border: `1px solid ${C.cyan}30`,
                zIndex: 10,
                transform: "rotate(1.5deg)",
              }} />
              {imgs.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Kayaking Kalawewa"
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    opacity: activeImg === i ? 1 : 0,
                    transition: "opacity 0.8s ease",
                  }}
                />
              ))}
              {/* Caption strip */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: `${C.dark}bb`,
                padding: "10px 16px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontFamily: "'Caveat', cursive", color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
                  Kalawewa Reservoir · Est. 460 CE
                </span>
                <div style={{ display: "flex", gap: "5px" }}>
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      style={{
                        width: activeImg === i ? "18px" : "5px",
                        height: "5px",
                        borderRadius: "3px",
                        background: activeImg === i ? C.red : "rgba(255,255,255,0.3)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Spine / center binding */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: 0, bottom: 0,
            width: "14px",
            transform: "translateX(-50%)",
            zIndex: 10,
            background: `linear-gradient(to right, ${C.navy}18, ${C.navy}04, ${C.navy}18)`,
            boxShadow: `inset 2px 0 6px ${C.navy}14, inset -2px 0 6px ${C.navy}14`,
          }}>
            {/* Stitching marks */}
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: "50%",
                top: `${10 + i * 12}%`,
                transform: "translateX(-50%)",
                width: "2px", height: "10px",
                background: `${C.navy}25`,
                borderRadius: "1px",
              }} />
            ))}
          </div>

          {/* Right page — timeline */}
          <div
            ref={timeRef}
            style={{
              background: C.paper,
              padding: "36px 44px 36px 36px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0",
            }}
          >
            {/* Page lines */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                transparent,
                transparent 31px,
                ${C.navy}07 31px,
                ${C.navy}07 32px
              )`,
              pointerEvents: "none",
            }} />

            {/* Handwritten section header */}
            <div style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "16px",
              color: `${C.navy}50`,
              marginBottom: "28px",
              position: "relative",
              zIndex: 1,
              opacity: timeIn ? 1 : 0,
              transition: "opacity 0.5s",
            }}>
              Field Notes — Chronology
            </div>

            {/* Timeline */}
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Vertical ink line */}
              <svg
                style={{
                  position: "absolute",
                  left: "6px",
                  top: "7px",
                  height: `${(timelineNodes.length - 1) * 88 + 14}px`,
                  width: "2px",
                  overflow: "visible",
                }}
              >
                <line
                  x1="1" y1="0"
                  x2="1" y2="100%"
                  stroke={`${C.navy}20`}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  style={{
                    strokeDashoffset: timeIn ? "0" : "600",
                    transition: "stroke-dashoffset 1.2s 0.2s",
                  }}
                />
              </svg>

              {timelineNodes.map((node, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                    marginBottom: i < timelineNodes.length - 1 ? "36px" : "0",
                    opacity: i <= activeNode ? 1 : 0,
                    transform: i <= activeNode ? "translateX(0)" : "translateX(-12px)",
                    transition: `opacity 0.5s ${i * 0.08}s, transform 0.5s ${i * 0.08}s`,
                  }}
                >
                  <div style={{ paddingTop: "1px" }}>
                    <InkNode active={i <= activeNode} color={i === 1 ? C.red : C.cyan} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: i === 1 ? C.red : C.navy,
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}>
                      {node.year}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "#5A6B5E",
                      lineHeight: 1.65,
                    }}>
                      {node.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stamp decoration */}
            <div style={{
              position: "absolute",
              bottom: "28px",
              right: "32px",
              width: "80px", height: "80px",
              borderRadius: "50%",
              border: `2px solid ${C.red}40`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(-12deg)",
              opacity: timeIn ? 0.7 : 0,
              transition: "opacity 0.6s 1s",
            }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "7px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: C.red,
                textAlign: "center",
                lineHeight: 1.4,
              }}>
                Since<br/>2016
              </div>
              <div style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "18px",
                fontWeight: 800,
                color: C.red,
                lineHeight: 1,
              }}>
                ★
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "7px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: C.red,
                textAlign: "center",
              }}>
                Pioneers
              </div>
            </div>
          </div>
        </div>

        {/* Torn edge transition */}
        <TornEdge />

        {/* ── JOURNAL ENTRIES (Feature Cards) ── */}
        <div
          ref={entriesRef}
          style={{
            background: C.paperDark,
            padding: "48px 48px 20px",
            position: "relative",
          }}
        >
          {/* Page lines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent,
              transparent 39px,
              ${C.navy}07 39px,
              ${C.navy}07 40px
            )`,
            pointerEvents: "none",
          }} />

          {/* Section label — handwritten style */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "36px",
            position: "relative",
            zIndex: 1,
            opacity: entriesIn ? 1 : 0,
            transition: "opacity 0.5s",
          }}>
            <span style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "18px",
              color: `${C.navy}55`,
            }}>
              Key Observations —
            </span>
            <div style={{ flex: 1, height: "1px", background: `${C.navy}15` }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: `${C.navy}35`,
            }}>
              Field Notes
            </span>
          </div>

          {/* Journal entry rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", position: "relative", zIndex: 1 }}>
            {journalEntries.map((entry, i) => (
              <div
                key={i}
                className="jentry"
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr auto",
                  gap: "0 32px",
                  alignItems: "center",
                  padding: "22px 24px",
                  borderRadius: "6px",
                  position: "relative",
                  cursor: "default",
                  transition: "background 0.25s",
                  opacity: entriesIn ? 1 : 0,
                  transform: entriesIn ? "translateX(0)" : "translateX(-24px)",
                  transitionDelay: `${i * 0.1}s`,
                  // @ts-ignore
                  "--jentry-accent": entry.accent,
                }}
              >
                {/* Accent bar — reveals on hover */}
                <div
                  className="jentry-bar"
                  style={{
                    position: "absolute",
                    left: 0, top: 0, bottom: 0,
                    width: "3px",
                    background: entry.accent,
                    borderRadius: "2px 0 0 2px",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.25s",
                  }}
                />

                {/* Index number */}
                <div
                  className="jentry-num"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "36px",
                    fontWeight: 800,
                    color: `${C.navy}18`,
                    lineHeight: 1,
                    letterSpacing: "-1px",
                    transition: "color 0.25s",
                    userSelect: "none",
                  }}
                >
                  {entry.num}
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      color: entry.accent,
                      background: `${entry.accent}12`,
                      padding: "2px 10px",
                      borderRadius: "50px",
                      border: `1px solid ${entry.accent}25`,
                    }}>
                      {entry.tag}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: C.navy,
                    marginBottom: "5px",
                    lineHeight: 1.2,
                  }}>
                    {entry.title}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "#5A6B5E",
                    lineHeight: 1.68,
                    maxWidth: "520px",
                  }}>
                    {entry.description}
                  </div>
                </div>

                {/* Stat specimen label */}
                <div style={{
                  textAlign: "right",
                  padding: "14px 18px",
                  border: `1px solid ${entry.accent}25`,
                  borderRadius: "6px",
                  background: `${entry.accent}06`,
                  minWidth: "100px",
                  flexShrink: 0,
                }}>
                  <div style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "26px",
                    fontWeight: 700,
                    color: entry.accent,
                    lineHeight: 1,
                  }}>
                    {entry.stat}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: `${entry.accent}80`,
                    marginTop: "4px",
                  }}>
                    {entry.statLabel}
                  </div>
                </div>

                {/* Horizontal rule */}
                {i < journalEntries.length - 1 && (
                  <div style={{
                    position: "absolute",
                    bottom: 0, left: "56px", right: "24px",
                    height: "1px",
                    background: `${C.navy}10`,
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <TornEdge flip />

        {/* ── SPECIMEN LABEL STATS STRIP ── */}
        <div
          ref={statsRef}
          style={{
            background: C.cream,
            padding: "48px 48px 60px",
            position: "relative",
          }}
        >
          <div style={{
            maxWidth: "900px",
            margin: "0 auto",
            border: `1.5px solid ${C.navy}20`,
            borderRadius: "12px",
            overflow: "hidden",
            opacity: statsIn ? 1 : 0,
            transform: statsIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}>

            {/* Top label bar */}
            <div style={{
              background: C.navy,
              padding: "10px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: `rgba(255,255,255,0.35)`,
              }}>
                Specimen Record — Kayaking Kalawewa
              </span>
              <span style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "13px",
                color: `${C.cyan}70`,
              }}>
                Class: Kayak Safari · Order: Wildlife Tourism
              </span>
            </div>

            {/* Stats grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              background: "#fff",
            }}>
              {[
                { val: "500+", label: "Happy Adventurers", sub: "Verified guests" },
                { val: "4.9★", label: "Average Rating",   sub: "TripAdvisor" },
                { val: "100%", label: "Safe Record",       sub: "Since founding" },
                { val: "2016", label: "Year Founded",      sub: "Pioneering kayak safari" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "28px 24px",
                    borderRight: i < 3 ? `1px dashed ${C.navy}15` : "none",
                    textAlign: "center",
                    position: "relative",
                    opacity: statsIn ? 1 : 0,
                    transform: statsIn ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.5s ${0.1 + i * 0.1}s, transform 0.5s ${0.1 + i * 0.1}s`,
                  }}
                >
                  <div style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(22px, 2.8vw, 34px)",
                    fontWeight: 700,
                    color: i === 0 ? C.cyan : i === 3 ? C.red : C.navy,
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}>
                    {s.val}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: C.navy,
                    marginBottom: "3px",
                    letterSpacing: "0.5px",
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "12px",
                    color: "#9AADA0",
                  }}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom footnote bar */}
            <div style={{
              background: `${C.paperDark}`,
              padding: "10px 28px",
              borderTop: `1px dashed ${C.navy}15`,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.red, flexShrink: 0 }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                color: "#9AADA0",
                letterSpacing: "0.5px",
              }}>
                Deep in Sri Lanka's Minneriya–Kaudulla wildlife corridor · No engines, no crowds — just you, the ancient water, and gentle giants.
              </span>
            </div>
          </div>
        </div>

        {/* ── WAVE DIVIDER ── */}
        <div style={{ lineHeight: 0, marginLeft: "-0px", marginRight: "-0px" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path fill={`${C.navy}12`} d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="6s" repeatCount="indefinite"
                values="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z;M0,55 C360,15 1080,65 1440,55 L1440,80 L0,80 Z;M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
            </path>
            <path fill={C.navy} d="M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="8s" repeatCount="indefinite"
                values="M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z;M0,35 C480,5 960,65 1440,25 L1440,80 L0,80 Z;M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}