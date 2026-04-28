import { useState, useEffect } from "react";

// ── Brand palette ──
const N  = "#1B3A6B";
const C  = "#00B4D8";
const LC = "#48CAE4";
const R  = "#E63329";

// ── Types ──
export interface VideoEmbed {
  url:          string;
  title?:       string;
  tag?:         string;
}

interface CommunityStoriesSectionProps {
  videos?: VideoEmbed[];
}

// ── Default videos ──
const DEFAULT_VIDEOS: VideoEmbed[] = [
  { url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F870022206063871%2F&show_text=false&width=267&t=0",  title: "Elephant Close Encounter", tag: "Kalawewa"  },
  { url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1458356091892774%2F&show_text=false&width=267&t=0", title: "Sunrise Paddle",            tag: "Sri Lanka"  },
  { url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1461924882035869%2F&show_text=false&width=267&t=0", title: "Wild Adventure",            tag: "Wildlife"   },
  { url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1624068882267226%2F&show_text=false&width=267&t=0", title: "Water Wildlife",            tag: "Moments"    },
  { url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1942837032995157%2F&show_text=false&width=267&t=0", title: "Community Moments",        tag: "Community"  },
  { url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1994732851474008%2F&show_text=false&width=267&t=0", title: "Amazing Journey",          tag: "Journey"    },
  { url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1421655396094815%2F&show_text=false&width=267&t=0", title: "Natural Beauty",           tag: "Nature"     },
  { url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F4387606248127643%2F&show_text=false&width=267&t=0", title: "Epic Adventure",           tag: "Epic"       },
];

const TICKER_ITEMS = [
  { text: "Elephant Close Encounter",   tag: "#WildPaddle" },
  { text: "Sunrise Paddle",             tag: "Sri Lanka"   },
  { text: "Wild Adventure",             tag: "Kalawewa"    },
  { text: "15 Metres from Giants",      tag: "#WildPaddle" },
  { text: "2,500+ Videos Shared",       tag: "Community"   },
  { text: "100% Safe Record",           tag: "Eco Travel"  },
  { text: "Baby Elephant Bathing",      tag: "Wildlife"    },
  { text: "Mist over Kalawewa",         tag: "Sunrise"     },
];

// ── Sub-components ──
function ReelCard({ video, index }: { video: VideoEmbed; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        borderRadius: "18px",
        overflow: "hidden",
        background: "#0a1528",
        cursor: "pointer",
        // even-indexed cards offset downward for stagger effect
        marginTop: index % 2 !== 0 ? "28px" : "0",
      }}
    >
      {/* portrait reel */}
      <div style={{ aspectRatio: "9/16", position: "relative", overflow: "hidden" }}>
        <iframe
          src={video.url}
          width="267"
          height="476"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          scrolling="no"
          frameBorder={0}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>

      {/* cyan border frame */}
      <div style={{
        position: "absolute", inset: 0,
        border: `1.5px solid ${hov ? "rgba(0,180,216,0.45)" : "rgba(0,180,216,0.15)"}`,
        borderRadius: "18px",
        pointerEvents: "none",
        transition: "border-color .3s",
      }} />

      {/* frame number */}
      <div style={{
        position: "absolute", top: "10px", left: "12px", zIndex: 2,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "11px", fontWeight: 600,
        color: "rgba(255,255,255,0.3)", letterSpacing: "1px",
        pointerEvents: "none",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* hover caption */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "28px 14px 14px",
        background: "linear-gradient(to top, rgba(13,30,56,0.92) 0%, transparent 100%)",
        zIndex: 2, pointerEvents: "none",
        opacity: hov ? 1 : 0,
        transform: hov ? "translateY(0)" : "translateY(4px)",
        transition: "opacity .3s, transform .3s",
      }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, color: "#fff", lineHeight: 1.4, marginBottom: "3px" }}>
          {video.title}
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", color: LC, letterSpacing: "1.5px", textTransform: "uppercase" }}>
          #WildPaddle · {video.tag}
        </div>
      </div>
    </div>
  );
}

// ── Main export ──
export function CommunityStoriesSection({ videos }: CommunityStoriesSectionProps) {
  const displayVideos = (videos && videos.length > 0) ? videos : DEFAULT_VIDEOS;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Duplicate ticker items for seamless loop
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />

      <style>{`
        @keyframes csPulse {
          0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(230,51,41,.6); }
          50%      { opacity:.5; box-shadow:0 0 0 5px rgba(230,51,41,0); }
        }
        @keyframes csTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cs-btn-primary {
          background: ${R}; color: #fff; border: none;
          padding: 15px 34px; border-radius: 50px;
          font-family: 'Outfit', sans-serif; font-size: 12px;
          font-weight: 700; letter-spacing: .8px; text-transform: uppercase;
          cursor: pointer; white-space: nowrap;
          box-shadow: 0 8px 24px rgba(230,51,41,.38);
          transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
        }
        .cs-btn-primary:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 16px 36px rgba(230,51,41,.55); }
        .cs-btn-secondary {
          background: rgba(0,180,216,0.10); color: ${C};
          border: 1px solid rgba(0,180,216,0.28);
          padding: 15px 28px; border-radius: 50px;
          font-family: 'Outfit', sans-serif; font-size: 12px;
          font-weight: 600; letter-spacing: .8px; text-transform: uppercase;
          cursor: pointer; white-space: nowrap;
          transition: background .25s, transform .25s;
        }
        .cs-btn-secondary:hover { background: rgba(0,180,216,0.2); transform: translateY(-2px); }

        @media (max-width: 640px) {
          .cs-header-grid  { grid-template-columns: 1fr !important; gap: 20px !important; }
          .cs-wall-grid    { grid-template-columns: repeat(2,1fr) !important; gap: 8px !important; }
          .cs-reel-stagger { margin-top: 20px !important; }
          .cs-cta-flex     { flex-direction: column !important; text-align: center !important; padding: 24px 20px !important; }
          .cs-cta-actions  { justify-content: center !important; }
          .cs-cta-label    { justify-content: center !important; }
          .cs-pad          { padding: 52px 16px 0 !important; }
        }
        @media (max-width: 860px) and (min-width: 641px) {
          .cs-header-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .cs-wall-grid   { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      <section
        id="community-stories"
        style={{ background: "#0d1e38", position: "relative", overflow: "hidden" }}
      >
        {/* grid bg */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div className="cs-pad" style={{ maxWidth: "1100px", margin: "0 auto", padding: "72px 28px 0", position: "relative", zIndex: 1 }}>

          {/* ── HEADER ── */}
          <div
            className="cs-header-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center", marginBottom: "52px" }}
          >
            <div>
              {/* pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "rgba(0,180,216,0.12)", border: "1px solid rgba(0,180,216,0.28)",
                color: C, padding: "6px 16px", borderRadius: "50px",
                fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif", marginBottom: "18px",
              }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: R, animation: "csPulse 2s infinite" }} />
                <svg width="11" height="11" viewBox="0 0 24 24" fill={C}><path d="M5 3l14 9-14 9V3z"/></svg>
                Live Community
              </div>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 700, color: "#fff",
                lineHeight: 1.07, letterSpacing: "-0.5px",
              }}>
                Stories From Our<br /><em style={{ color: LC, fontStyle: "italic" }}>Adventurers</em>
              </h2>
            </div>

            <div style={{ paddingLeft: "8px" }}>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "24px" }}>
                Real moments captured by our community. No scripts, no staging — just wild encounters, misty mornings, and the gentle giants of Kalawewa.
              </p>
              {/* live counter badge */}
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                background: "rgba(0,180,216,0.08)", border: "1px solid rgba(0,180,216,0.18)",
                borderRadius: "14px", padding: "12px 16px",
              }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: R, animation: "csPulse 1.5s infinite", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 700, color: LC, lineHeight: 1 }}>2,500+</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "1px" }}>
                    Videos tagged #WildPaddle
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── TICKER TAPE ── */}
          <div style={{
            overflow: "hidden",
            borderTop: "1px solid rgba(0,180,216,0.12)",
            borderBottom: "1px solid rgba(0,180,216,0.12)",
            padding: "10px 0",
            marginBottom: "44px",
            position: "relative",
          }}>
            {/* fade edges */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "80px", background: `linear-gradient(90deg, #0d1e38, transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "80px", background: `linear-gradient(-90deg, #0d1e38, transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ display: "flex", animation: "csTicker 24s linear infinite", whiteSpace: "nowrap" }}>
              {tickerItems.map((item, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "0 28px",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  <span style={{ color: LC }}>{item.text}</span>
                  <span style={{ color: "rgba(0,180,216,0.3)" }}>·</span>
                  <span style={{ color: "rgba(0,180,216,0.5)" }}>{item.tag}</span>
                  <span style={{ color: "rgba(0,180,216,0.3)" }}>◆</span>
                </span>
              ))}
            </div>
          </div>

          {/* ── VIDEO WALL ── */}
          <div
            className="cs-wall-grid"
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
              gap: isMobile ? "8px" : "12px",
              alignItems: "start",
              marginBottom: "52px",
            }}
          >
            {displayVideos.map((video, i) => (
              <div
                key={i}
                className={i % 2 !== 0 ? "cs-reel-stagger" : ""}
                style={{ marginTop: i % 2 !== 0 ? (isMobile ? "20px" : "28px") : "0" }}
              >
                <ReelCard video={video} index={i} />
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div
            className="cs-cta-flex"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(0,180,216,0.15)",
              borderRadius: "24px",
              padding: "36px 44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "28px",
              flexWrap: "wrap",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* accent orb */}
            <div style={{ position: "absolute", left: "-60px", top: "-60px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(0,180,216,0.05)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                className="cs-cta-label"
                style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: LC, marginBottom: "8px" }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: R, animation: "csPulse 2s infinite" }} />
                Share Your Story
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px,3vw,34px)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                Captured an <em style={{ color: C, fontStyle: "italic" }}>epic moment?</em>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.45)", marginTop: "6px", lineHeight: 1.6 }}>
                Tag us with <span style={{ color: LC, fontWeight: 500 }}>@WildPaddle</span> on Facebook or Instagram to be featured here.
              </p>
            </div>

            <div
              className="cs-cta-actions"
              style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", flexShrink: 0, position: "relative", zIndex: 1 }}
            >
              <button
                className="cs-btn-primary"
                onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              >
                Book Your Adventure →
              </button>
              <button className="cs-btn-secondary">#WildPaddle</button>
            </div>
          </div>

        </div>

        {/* ── WAVE DIVIDER ── */}
        <div style={{ lineHeight: 0, marginTop: "72px" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "72px" }}>
            <path fill="rgba(0,180,216,0.08)" d="M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite" values="M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z;M0,55 C360,15 1080,70 1440,30 L1440,80 L0,80 Z;M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z" />
            </path>
            <path fill="#FAF5EA" d="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite" values="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z;M0,30 C360,65 1080,15 1440,55 L1440,80 L0,80 Z;M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}