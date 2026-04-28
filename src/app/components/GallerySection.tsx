import { useState, useEffect, useRef } from "react";

// ── Brand palette ──
const N  = "#1B3A6B";
const C  = "#00B4D8";
const LC = "#48CAE4";
const R  = "#E63329";

// ── Types ──
export interface GalleryImage {
  src:      string;
  alt:      string;
  caption?: string;
}

interface GallerySectionProps {
  images?:    GalleryImage[];
  videoThumb?: string;
}

// ── Default images (replace with real ones) ──
const DEFAULT_IMAGES: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=900&h=700&fit=crop", alt: "Kayaking with elephants",  caption: "Gentle giants at dawn — Kalawewa riverbank" },
  { src: "https://images.unsplash.com/photo-1582433736551-19e3a2e6c0b6?w=600&h=400&fit=crop", alt: "Sunrise kayak",           caption: "Mist over Kalawewa" },
  { src: "https://images.unsplash.com/photo-1549366021-8a06e197bfd1?w=600&h=400&fit=crop",   alt: "Elephant family",         caption: "Baby elephant bathing" },
  { src: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600&h=400&fit=crop", alt: "Wildlife encounter",      caption: "Unforgettable moments" },
  { src: "https://images.unsplash.com/photo-1503788311183-fa3bf9c4d32e?w=600&h=400&fit=crop", alt: "Peaceful paddling",       caption: "Silence is golden" },
];

const STORIES = [
  { avatar: "E", name: "Emma & family",    loc: "London, UK",    quote: "We were 15 metres from a bathing elephant family. They didn't even glance at us." },
  { avatar: "R", name: "Rajiv Mehta",      loc: "Mumbai, India", quote: "Silent kayaking makes all the difference — elephants behave like we aren't even there." },
  { avatar: "S", name: "Sarah Chen",       loc: "Singapore",     quote: "Sunrise on the water with mist rising and elephants calling — pure magic. Nothing else like it." },
];

// ── Helpers ──
const StarShape = () => (
  <div style={{
    width: "9px", height: "9px", background: R, flexShrink: 0,
    clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
  }} />
);

const ReelHoles = ({ count = 28 }: { count?: number }) => (
  <div style={{ display: "flex", gap: "12px", flex: 1, overflow: "hidden" }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{ width: "12px", height: "12px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
    ))}
  </div>
);

// ── Main component ──
export function GallerySection({ images, videoThumb }: GallerySectionProps) {
  const galleryImages = (images && images.length >= 4) ? images : DEFAULT_IMAGES;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [curIdx, setCurIdx]             = useState(0);
  const [isMobile, setIsMobile]         = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setCurIdx(p => (p + 1) % galleryImages.length);
      if (e.key === "ArrowLeft")  setCurIdx(p => (p - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, galleryImages.length]);

  const openLB  = (i: number) => { setCurIdx(i); setLightboxOpen(true); };
  const navLB   = (dir: number) => setCurIdx(p => (p + dir + galleryImages.length) % galleryImages.length);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />

      <style>{`
        @keyframes galPulse {
          0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(230,51,41,.6); }
          50%      { opacity:.5; box-shadow:0 0 0 5px rgba(230,51,41,0); }
        }
        @keyframes galFadeIn {
          from { opacity:0; transform:scale(.92); }
          to   { opacity:1; transform:scale(1); }
        }
        .gal-frame { transition: box-shadow .3s; }
        .gal-frame img { transition: transform .5s ease; }
        .gal-frame:hover img { transform: scale(1.06) !important; }
        .gal-frame:hover .gal-overlay { opacity: 0.45 !important; }
        .gal-frame:hover .gal-cap     { opacity: 1 !important; transform: translateY(0) !important; }
        .gal-story-card { transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s; cursor: default; }
        .gal-story-card:hover { transform: translateY(-5px); box-shadow: 0 20px 44px rgba(27,58,107,0.22); }
        .gal-vframe img { transition: opacity .3s; }
        .gal-vframe:hover img { opacity: 0.45 !important; }
        .gal-vframe:hover .gal-play-circle { transform: scale(1.12); }
        .gal-btn-primary {
          background: ${R}; color: #fff; border: none;
          padding: 14px 32px; border-radius: 50px;
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: .8px; text-transform: uppercase; cursor: pointer;
          box-shadow: 0 8px 24px rgba(230,51,41,.38);
          transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
        }
        .gal-btn-primary:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 16px 36px rgba(230,51,41,.55); }
        .gal-btn-secondary {
          background: rgba(0,180,216,0.12); color: ${C};
          border: 1px solid rgba(0,180,216,0.28);
          padding: 14px 28px; border-radius: 50px;
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: .8px; text-transform: uppercase; cursor: pointer;
          transition: background .25s, transform .25s;
        }
        .gal-btn-secondary:hover { background: rgba(0,180,216,0.22); transform: translateY(-2px); }

        @media (max-width: 640px) {
          .gal-header-grid { grid-template-columns: 1fr !important; gap: 20px !important; padding: 52px 16px 0 !important; }
          .gal-film-grid   { grid-template-columns: 1fr !important; }
          .gal-featured    { height: 280px !important; }
          .gal-film-cell   { height: 220px !important; }
          .gal-stories-grid { grid-template-columns: 1fr !important; }
          .gal-side-pad    { padding: 0 16px !important; }
          .gal-cta-flex    { flex-direction: column !important; text-align: center !important; padding: 24px 20px !important; }
          .gal-cta-actions { justify-content: center !important; }
          .gal-lb-prev     { left: -16px !important; }
          .gal-lb-next     { right: -16px !important; }
        }
        @media (max-width: 860px) and (min-width: 641px) {
          .gal-stories-grid { grid-template-columns: 1fr 1fr !important; }
          .gal-film-grid    { grid-template-columns: 1fr 1fr !important; }
          .gal-featured     { grid-row: span 1 !important; height: 260px !important; }
          .gal-film-cell    { height: 220px !important; }
        }
      `}</style>

      <section id="gallery" style={{ background: "#FAF5EA", position: "relative", overflow: "hidden" }}>

        {/* Subtle dot bg */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, rgba(0,180,216,0.07) 1px, transparent 1px)`, backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

        {/* ── HEADER ── */}
        <div
          className="gal-header-grid"
          style={{
            maxWidth: "1100px", margin: "0 auto",
            padding: "72px 28px 0",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "48px", alignItems: "end", marginBottom: "52px",
            position: "relative", zIndex: 1,
          }}
        >
          <div>
            {/* pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(230,51,41,0.09)", border: "1px solid rgba(230,51,41,0.22)",
              color: R, padding: "6px 16px", borderRadius: "50px",
              fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
              fontFamily: "'Outfit', sans-serif", marginBottom: "18px",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: R, animation: "galPulse 2s infinite" }} />
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={R} strokeWidth="2.2" strokeLinecap="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              Real Moments
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(34px,5vw,60px)", fontWeight: 700, color: N,
              lineHeight: 1.07, letterSpacing: "-0.5px",
            }}>
              Through the<br /><em style={{ color: LC, fontStyle: "italic" }}>Lens</em> of Our<br />Adventurers
            </h2>
          </div>

          <div style={{ paddingBottom: "6px" }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 300, color: "#6b7e8a", lineHeight: 1.8, marginBottom: "20px" }}>
              Every frame is real — no zoom, no staging. Just you, the water, and gentle giants behaving as nature intended. 2,500+ photos tagged by our community.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,180,216,0.25)" }} />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C} strokeWidth="2" strokeLinecap="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, color: N, letterSpacing: "0.5px" }}>#WildPaddle</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,180,216,0.25)" }} />
            </div>
          </div>
        </div>

        {/* ── FILM STRIP ── */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: "56px" }}>

          {/* top reel bar */}
          <div style={{ background: "#0d1e38", padding: "10px 28px", display: "flex", alignItems: "center", gap: "16px", overflow: "hidden" }}>
            <ReelHoles />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>
              KAYAKING KALAWEWA · FILM 2024
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", fontWeight: 600, color: LC, whiteSpace: "nowrap" }}>
              {String(galleryImages.length).padStart(2, "0")} FRAMES
            </span>
            <ReelHoles />
          </div>

          {/* film grid */}
          <div
            className="gal-film-grid"
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr",
              gridTemplateRows: isMobile ? "auto" : "260px 220px",
              gap: "3px",
              background: "#0d1e38",
            }}
          >
            {/* Featured frame */}
            <div
              className="gal-frame gal-featured"
              onClick={() => openLB(0)}
              style={{
                gridRow: isMobile ? "auto" : "span 2",
                height: isMobile ? "280px" : "auto",
                position: "relative", overflow: "hidden", cursor: "pointer",
              }}
            >
              <img src={galleryImages[0].src} alt={galleryImages[0].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div className="gal-overlay" style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${N}66 0%, transparent 55%)`, transition: "opacity .3s" }} />
              <div style={{ position: "absolute", top: "12px", left: "14px", fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "1px" }}>
                01 / {String(galleryImages.length).padStart(2, "0")}
              </div>
              <div style={{ position: "absolute", top: "12px", right: "14px", background: "rgba(230,51,41,0.9)", borderRadius: "50px", padding: "4px 12px", fontFamily: "'Outfit', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#fff" }}>
                Featured
              </div>
              <div className="gal-cap" style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px", fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.88)", lineHeight: 1.4, opacity: 0, transform: "translateY(6px)", transition: "opacity .3s, transform .3s" }}>
                {galleryImages[0].caption}
              </div>
            </div>

            {/* Frame 2 */}
            <div className="gal-frame gal-film-cell" onClick={() => openLB(1)} style={{ height: isMobile ? "220px" : "auto", position: "relative", overflow: "hidden", cursor: "pointer" }}>
              <img src={galleryImages[1].src} alt={galleryImages[1].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div className="gal-overlay" style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${N}66 0%, transparent 55%)`, transition: "opacity .3s" }} />
              <div style={{ position: "absolute", top: "10px", left: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "1px" }}>02</div>
              <div className="gal-cap" style={{ position: "absolute", bottom: "12px", left: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.88)", opacity: 0, transform: "translateY(6px)", transition: "opacity .3s, transform .3s" }}>{galleryImages[1].caption}</div>
            </div>

            {/* Video frame */}
            <div
              className="gal-vframe gal-film-cell"
              style={{ height: isMobile ? "220px" : "auto", position: "relative", overflow: "hidden", cursor: "pointer", background: "#0a1528" }}
            >
              <img src={videoThumb || galleryImages[2]?.src || ""} alt="Watch film" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.6 }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                <div
                  className="gal-play-circle"
                  style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 8px rgba(230,51,41,0.18), 0 8px 24px rgba(0,0,0,0.3)`, transition: "transform .3s cubic-bezier(.34,1.56,.64,1)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={R}><path d="M5 3l14 9-14 9V3z"/></svg>
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#fff" }}>Watch Film</span>
              </div>
            </div>

            {/* Frame 3 */}
            {galleryImages[2] && (
              <div className="gal-frame gal-film-cell" onClick={() => openLB(2)} style={{ height: isMobile ? "220px" : "auto", position: "relative", overflow: "hidden", cursor: "pointer" }}>
                <img src={galleryImages[2].src} alt={galleryImages[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div className="gal-overlay" style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${N}66 0%, transparent 55%)`, transition: "opacity .3s" }} />
                <div style={{ position: "absolute", top: "10px", left: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "1px" }}>03</div>
                <div className="gal-cap" style={{ position: "absolute", bottom: "12px", left: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.88)", opacity: 0, transform: "translateY(6px)", transition: "opacity .3s, transform .3s" }}>{galleryImages[2].caption}</div>
              </div>
            )}

            {/* Frame 4 */}
            {galleryImages[3] && (
              <div className="gal-frame gal-film-cell" onClick={() => openLB(3)} style={{ height: isMobile ? "220px" : "auto", position: "relative", overflow: "hidden", cursor: "pointer" }}>
                <img src={galleryImages[3].src} alt={galleryImages[3].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div className="gal-overlay" style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${N}66 0%, transparent 55%)`, transition: "opacity .3s" }} />
                <div style={{ position: "absolute", top: "10px", left: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "1px" }}>04</div>
                <div className="gal-cap" style={{ position: "absolute", bottom: "12px", left: "12px", fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.88)", opacity: 0, transform: "translateY(6px)", transition: "opacity .3s, transform .3s" }}>{galleryImages[3].caption}</div>
              </div>
            )}
          </div>

          {/* bottom reel bar */}
          <div style={{ background: "#0d1e38", padding: "8px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "12px", overflow: "hidden", flex: 1 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ width: "12px", height: "12px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, margin: "0 16px" }}>
              {[
                { label: "Eco Travel", bg: "rgba(0,180,216,0.12)", color: C },
                { label: "Sri Lanka",  bg: "rgba(230,51,41,0.12)", color: R },
                { label: "Wildlife",   bg: "rgba(27,58,107,0.3)",  color: LC },
              ].map(tag => (
                <div key={tag.label} style={{ background: tag.bg, color: tag.color, padding: "3px 10px", borderRadius: "50px", fontFamily: "'Outfit', sans-serif", fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  {tag.label}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px", overflow: "hidden", flex: 1, justifyContent: "flex-end" }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ width: "12px", height: "12px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── STORIES ROW ── */}
        <div className="gal-side-pad" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 28px", marginBottom: "52px", position: "relative", zIndex: 1 }}>

          {/* section label */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(27,58,107,0.1)" }} />
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 700, color: N }}>
              Traveller <em style={{ color: LC, fontStyle: "italic" }}>Stories</em>
            </div>
            <div style={{ flex: 1, height: "1px", background: "rgba(27,58,107,0.1)" }} />
          </div>

          <div className="gal-stories-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
            {STORIES.map((s, i) => (
              <div key={i} className="gal-story-card" style={{ background: N, borderRadius: "20px", padding: "24px 22px 20px", position: "relative", overflow: "hidden" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `linear-gradient(135deg,${C},${LC})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "14px", border: "2px solid rgba(0,180,216,0.3)" }}>
                  {s.avatar}
                </div>
                <div style={{ display: "flex", gap: "3px", marginBottom: "10px" }}>
                  {Array.from({ length: 5 }).map((_, j) => <StarShape key={j} />)}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", fontWeight: 600, color: "#fff", lineHeight: 1.5, fontStyle: "italic", marginBottom: "14px" }}>
                  "{s.quote}"
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, color: LC, letterSpacing: "0.5px" }}>{s.name}</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", marginTop: "1px" }}>{s.loc}</div>
                {/* corner orb */}
                <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(0,180,216,0.06)", pointerEvents: "none" }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── SOCIAL CTA ── */}
        <div className="gal-side-pad" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 28px", marginBottom: "0", position: "relative", zIndex: 1 }}>
          <div
            className="gal-cta-flex"
            style={{ background: "#0d1e38", borderRadius: "24px", padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", right: "-40px", top: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(0,180,216,0.05)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: LC, marginBottom: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: R, animation: "galPulse 2s infinite" }} />
                Join the community
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px,3vw,30px)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                Share your <em style={{ color: C, fontStyle: "italic" }}>Wild Paddle</em> moment
              </div>
            </div>
            <div className="gal-cta-actions" style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
              <button
                className="gal-btn-primary"
                onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              >
                Book Your Adventure →
              </button>
              <button className="gal-btn-secondary">#WildPaddle</button>
            </div>
          </div>
        </div>

        {/* ── WAVE ── */}
        <div style={{ lineHeight: 0, marginTop: "72px" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "72px" }}>
            <path fill="rgba(0,180,216,0.08)" d="M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite" values="M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z;M0,55 C360,15 1080,70 1440,30 L1440,80 L0,80 Z;M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z" />
            </path>
            <path fill="#0d1e38" d="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite" values="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z;M0,30 C360,65 1080,15 1440,55 L1440,80 L0,80 Z;M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>

        {/* ── LIGHTBOX ── */}
        {lightboxOpen && (
          <div
            onClick={() => setLightboxOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(13,30,56,0.96)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)" }}
          >
            <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: "88vw", maxHeight: "88vh", animation: "galFadeIn .3s ease" }}>
              {/* close */}
              <button
                onClick={() => setLightboxOpen(false)}
                style={{ position: "absolute", top: "-16px", right: "-16px", width: "36px", height: "36px", borderRadius: "50%", background: R, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "16px", boxShadow: `0 4px 12px rgba(230,51,41,.4)` }}
              >
                ✕
              </button>
              {/* prev */}
              <button
                onClick={() => navLB(-1)}
                className="gal-lb-prev"
                style={{ position: "absolute", left: "-52px", top: "50%", transform: "translateY(-50%)", width: "38px", height: "38px", borderRadius: "50%", background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,.2)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={N} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <img
                src={galleryImages[curIdx]?.src}
                alt={galleryImages[curIdx]?.alt}
                style={{ maxWidth: "100%", maxHeight: "82vh", borderRadius: "16px", objectFit: "contain", display: "block" }}
              />
              {galleryImages[curIdx]?.caption && (
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)", textAlign: "center", marginTop: "12px" }}>
                  {galleryImages[curIdx].caption}
                </p>
              )}
              {/* next */}
              <button
                onClick={() => navLB(1)}
                className="gal-lb-next"
                style={{ position: "absolute", right: "-52px", top: "50%", transform: "translateY(-50%)", width: "38px", height: "38px", borderRadius: "50%", background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,.2)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={N} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}