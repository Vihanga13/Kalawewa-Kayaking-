import { Play, Waves, Camera, Users, Heart, ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

interface GallerySectionProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
    span?: "wide" | "tall" | "normal";
  }[];
  videoThumb: string;
}

// Tourist moments data
const touristMoments = [
  { name: "Emma & family", moment: "Sunrise paddle with baby elephants", image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&h=500&fit=crop" },
  { name: "Wilderness Collective", moment: "Silent glide through mist", image: "https://images.unsplash.com/photo-1582433736551-19e3a2e6c0b6?w=800&h=500&fit=crop" },
  { name: "Sarah & James", moment: "Just metres from giants", image: "https://images.unsplash.com/photo-1549366021-8a06e197bfd1?w=800&h=500&fit=crop" },
];

export function GallerySection({ images, videoThumb }: GallerySectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeMoment, setActiveMoment] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate tourist moments
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMoment((prev) => (prev + 1) % touristMoments.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Use provided images or fallback
  const galleryImages = images.length >= 5 ? images : [
    { src: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&h=600&fit=crop", alt: "Kayaking with elephants", caption: "Gentle giants at dawn" },
    { src: "https://images.unsplash.com/photo-1582433736551-19e3a2e6c0b6?w=800&h=600&fit=crop", alt: "Sunrise kayak", caption: "Mist over Kalawewa" },
    { src: "https://images.unsplash.com/photo-1549366021-8a06e197bfd1?w=800&h=600&fit=crop", alt: "Elephant family", caption: "Baby elephant bathing" },
    { src: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&h=600&fit=crop", alt: "Wildlife encounter", caption: "Unforgettable moments" },
    { src: "https://images.unsplash.com/photo-1503788311183-fa3bf9c4d32e?w=800&h=600&fit=crop", alt: "Peaceful paddling", caption: "Silence is golden" },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .gallery-item {
          transition: all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
        }
        .gallery-item:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .lightbox-open {
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .gallery-item {
            height: 280px !important;
          }
          .featured-item {
            grid-column: 1 !important;
            grid-row: auto !important;
            height: 320px !important;
          }
        }
      `}</style>

      <section
        id="gallery"
        style={{
          background: "#FAF5EA",
          padding: "5rem 1.5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative water ripples */}
        <div style={{
          position: "absolute",
          top: "5%",
          right: "-5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `${COLORS.cyan}03`,
          filter: "blur(60px)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "10%",
          left: "-8%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: `${COLORS.lightCyan}03`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Header with Social Proof ── */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: `${COLORS.red}08`,
              border: `1px solid ${COLORS.red}15`,
              padding: "0.4rem 1.2rem",
              borderRadius: "3rem",
              marginBottom: "1rem",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: COLORS.red,
                animation: "pulse 2s infinite",
              }} />
              <Camera size={12} color={COLORS.red} />
              <span style={{ color: COLORS.red, fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
                Real Moments
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
              fontWeight: 700,
              color: COLORS.navy,
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}>
              Through the{" "}
              <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Lens</span>
              <br />
              <span style={{ fontSize: "0.6em", color: "#6B7E73" }}>of Our Adventurers</span>
            </h2>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 300,
              fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
              color: "#6B7E73", maxWidth: "560px", margin: "1rem auto 0", lineHeight: 1.7,
            }}>
              Every frame tells a story. These moments are real — no zoom, no staging.
              Just you, the water, and gentle giants.
            </p>
          </div>

          {/* ── Live Tourist Counter Banner ── */}
          <div style={{
            background: `linear-gradient(135deg, white, ${COLORS.cyan}04)`,
            borderRadius: "1.25rem",
            padding: "0.75rem 1.5rem",
            marginBottom: "2rem",
            border: `1px solid ${COLORS.cyan}12`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: "2.5rem", height: "2.5rem",
                borderRadius: "50%",
                background: `${COLORS.cyan}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Users size={18} color={COLORS.cyan} />
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", color: "#8AA493", letterSpacing: "1px" }}>SHARED THEIR JOURNEY</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: COLORS.navy, fontFamily: "'Cormorant Garamond', serif" }}>
                  2,500+ <span style={{ fontSize: "0.7rem", color: COLORS.cyan }}>{'photos tagged #WildPaddle'}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={COLORS.red} color={COLORS.red} />
              ))}
              <span style={{ fontSize: "0.7rem", color: COLORS.navy, marginLeft: "0.25rem" }}>4.98 ★</span>
            </div>
          </div>

          {/* ── Masonry Gallery Grid ── */}
          <div className="gallery-grid" style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
          }}>
            {/* Featured large image (first image) */}
            <div
              className="gallery-item featured-item"
              onClick={() => openLightbox(0)}
              style={{
                gridColumn: isMobile ? "1" : "1 / 3",
                gridRow: isMobile ? "auto" : "1 / 3",
                borderRadius: "1.25rem",
                overflow: "hidden",
                height: isMobile ? "280px" : "400px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <img
                src={galleryImages[0]?.src}
                alt={galleryImages[0]?.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${COLORS.navy}66 0%, transparent 50%)` }} />
              {galleryImages[0]?.caption && (
                <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", fontSize: "1rem", fontWeight: 600 }}>{galleryImages[0].caption}</p>
                </div>
              )}
              <div style={{ position: "absolute", bottom: "1rem", right: "1rem", background: "rgba(0,0,0,0.5)", padding: "0.25rem 0.75rem", borderRadius: "2rem", backdropFilter: "blur(4px)" }}>
                <span style={{ fontSize: "0.7rem", color: "#fff" }}>📸 @wildpaddle</span>
              </div>
            </div>

            {/* Top right image */}
            <div
              className="gallery-item"
              onClick={() => openLightbox(1)}
              style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                height: isMobile ? "280px" : "192px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <img
                src={galleryImages[1]?.src}
                alt={galleryImages[1]?.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            {/* Video thumbnail */}
            <div
              className="gallery-item"
              onClick={() => window.open("#video-modal", "_blank")}
              style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                height: isMobile ? "280px" : "192px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <img
                src={videoThumb || "https://images.unsplash.com/photo-1549366021-8a06e197bfd1?w=800&h=500&fit=crop"}
                alt="Watch our video"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle, transparent 40%, ${COLORS.navy}33 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                  width: "3.5rem", height: "3.5rem",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 8px 24px rgba(0,0,0,0.2), 0 0 0 3px ${COLORS.red}40`,
                }}>
                  <Play size={18} fill={COLORS.red} color={COLORS.red} style={{ marginLeft: "2px" }} />
                </div>
              </div>
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", color: "#fff", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", background: `${COLORS.red}CC`, padding: "0.25rem 0.75rem", borderRadius: "2rem" }}>
                  Watch Film
                </span>
              </div>
            </div>

            {/* Bottom row images */}
            {galleryImages.slice(2, 5).map((img, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => openLightbox(i + 2)}
                style={{
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  height: isMobile ? "280px" : "200px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${COLORS.navy}55 0%, transparent 60%)` }} />
                {img.caption && (
                  <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem" }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", color: "#fff", fontSize: "0.75rem", fontWeight: 500 }}>{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Tourist Moments Carousel ── */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `${COLORS.cyan}08`, padding: "0.25rem 1rem", borderRadius: "2rem", marginBottom: "0.75rem" }}>
                <Heart size={12} color={COLORS.red} />
                <span style={{ fontSize: "0.65rem", letterSpacing: "1px", color: COLORS.navy, fontWeight: 500 }}>Traveler Stories</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: COLORS.navy }}>
                Unforgettable <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>Moments</span> Shared
              </h3>
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0F2A4A 100%)`,
              borderRadius: "1.5rem",
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Background pattern */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                  <path fill={COLORS.cyan} d="M0,96 C300,160 500,32 800,96 C1100,160 1200,64 1440,128 L1440,320 L0,320 Z" />
                </svg>
              </div>

              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: "4rem", height: "4rem",
                    borderRadius: "50%",
                    background: `${COLORS.cyan}15`,
                    border: `2px solid ${COLORS.cyan}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1rem",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: COLORS.cyan,
                  }}>
                    {touristMoments[activeMoment].name.charAt(0)}
                  </div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1rem",
                    color: "#fff",
                    lineHeight: 1.5,
                    maxWidth: "500px",
                    margin: "0 auto 0.5rem",
                    fontStyle: "italic",
                  }}>
                    "{touristMoments[activeMoment].moment}"
                  </p>
                  <div style={{ fontWeight: 600, color: COLORS.lightCyan, fontSize: "0.85rem" }}>
                    — {touristMoments[activeMoment].name}
                  </div>

                  {/* Dot indicators */}
                  <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}>
                    {touristMoments.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveMoment(idx)}
                        style={{
                          width: activeMoment === idx ? "1.5rem" : "0.4rem",
                          height: "0.25rem",
                          borderRadius: "0.25rem",
                          background: activeMoment === idx ? COLORS.cyan : `${COLORS.cyan}40`,
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Instagram / Social Link ── */}
          <div style={{
            textAlign: "center",
            padding: "1.5rem 0",
            borderTop: `1px solid ${COLORS.cyan}12`,
            borderBottom: `1px solid ${COLORS.cyan}12`,
            marginBottom: "1rem",
          }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: "#6B7E73", marginBottom: "0.5rem" }}>
              Join our community of adventurers
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <Waves size={16} color={COLORS.cyan} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: COLORS.navy, letterSpacing: "1px" }}>#WildPaddle</span>
              <Waves size={16} color={COLORS.cyan} />
            </div>
            <p style={{ fontSize: "0.7rem", color: "#8AA493", marginTop: "0.5rem" }}>
              Share your moments — tag us for a chance to be featured
            </p>
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: `rgba(27,58,107,0.95)`,
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                position: "relative",
                animation: "scaleIn 0.3s ease",
              }}
            >
              <img
                src={galleryImages[currentImageIndex]?.src}
                alt={galleryImages[currentImageIndex]?.alt}
                style={{ maxWidth: "100%", maxHeight: "85vh", borderRadius: "1rem", objectFit: "contain" }}
              />
              {galleryImages[currentImageIndex]?.caption && (
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  textAlign: "center",
                  color: "#fff",
                  marginTop: "0.75rem",
                  fontSize: "0.85rem",
                }}>
                  {galleryImages[currentImageIndex].caption}
                </p>
              )}
              
              {/* Navigation buttons */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    style={{
                      position: "absolute",
                      left: "-3rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "white",
                      border: "none",
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    <ChevronLeft size={20} color={COLORS.navy} />
                  </button>
                  <button
                    onClick={nextImage}
                    style={{
                      position: "absolute",
                      right: "-3rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "white",
                      border: "none",
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    <ChevronRight size={20} color={COLORS.navy} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Bottom wave divider */}
        <div style={{ marginTop: "2rem", lineHeight: 0, marginLeft: "-1.5rem", marginRight: "-1.5rem" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
            <path fill={`${COLORS.cyan}06`} d="M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite"
                values="M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z;M0,55 C360,15 1080,70 1440,30 L1440,80 L0,80 Z;M0,40 C360,75 1080,10 1440,55 L1440,80 L0,80 Z" />
            </path>
            <path fill="#FAF5EA" d="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite"
                values="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z;M0,30 C360,65 1080,15 1440,55 L1440,80 L0,80 Z;M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}