import { Star, Quote, Users, Heart, Waves, Shield, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

interface Testimonial {
  name: string;
  origin: string;
  rating: number;
  text: string;
  avatar: string;
  trip: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

// Verified badges data
const statsData = [
  { value: "12,000+", label: "Happy Adventurers", icon: <Users size={16} /> },
  { value: "4.98", label: "Average Rating", icon: <Star size={16} /> },
  { value: "98%", label: "Would Return", icon: <Heart size={16} /> },
  { value: "0", label: "Safety Incidents", icon: <Shield size={16} /> },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          fill={star <= rating ? COLORS.red : "transparent"}
          color={star <= rating ? COLORS.red : "#D4D4D4"}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate testimonials on mobile
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isMobile, testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Default testimonials if none provided
  const defaultTestimonials: Testimonial[] = [
    {
      name: "Emma Thompson",
      origin: "London, UK",
      rating: 5,
      text: "Absolutely incredible! We paddled within 20 metres of a family of elephants. The guides were knowledgeable and respectful of the animals. Best wildlife experience of my life!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      trip: "Sunrise Kayak Safari"
    },
    {
      name: "Rajiv Mehta",
      origin: "Mumbai, India",
      rating: 5,
      text: "Silent kayaking makes all the difference — the elephants didn't even notice us. We saw over 30 elephants including 6 babies. Unforgettable morning on the water.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      trip: "Wild Elephant Encounter"
    },
    {
      name: "Sarah Chen",
      origin: "Singapore",
      rating: 5,
      text: "The team's commitment to conservation and safety is outstanding. As a solo female traveler, I felt completely safe and welcomed. The sunrise paddle was pure magic!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      trip: "Private Tour"
    },
    {
      name: "Michael & Lisa",
      origin: "Melbourne, Australia",
      rating: 5,
      text: "Best thing we did in Sri Lanka. Our guide knew every elephant by name and shared fascinating stories. The kayaks were top quality and the briefing thorough.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop",
      trip: "Group Safari"
    },
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

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
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .testimonial-card {
          transition: all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1);
        }
        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .stat-item {
          transition: all 0.3s ease;
        }
        .stat-item:hover {
          transform: translateY(-2px);
          background: rgba(0,180,216,0.06);
        }
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
          .mobile-carousel {
            display: block !important;
          }
          .desktop-grid {
            display: none !important;
          }
        }
      `}</style>

      <section
        id="testimonials"
        style={{
          background: "#FAF5EA",
          padding: "5rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
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
        
        {/* Water dots pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, ${COLORS.cyan}06 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          opacity: 0.4,
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Header ── */}
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
                animation: "pulseRing 2s infinite",
              }} />
              <Quote size={12} color={COLORS.red} />
              <span style={{ color: COLORS.red, fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
                Real Stories
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
              Moments That Last{" "}
              <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>a Lifetime</span>
            </h2>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 300,
              fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)",
              color: "#6B7E73", maxWidth: "560px", margin: "1rem auto 0", lineHeight: 1.7,
            }}>
              Don't just take our word for it — hear what our adventurers have to say about their Wild Paddle experience.
            </p>
          </div>

          {/* ── Stats Banner ── */}
          <div className="stats-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "3rem",
          }}>
            {statsData.map((stat, i) => (
              <div
                key={i}
                className="stat-item"
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "0.75rem",
                  textAlign: "center",
                  border: `1px solid ${COLORS.cyan}12`,
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <span style={{ color: COLORS.cyan }}>{stat.icon}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: COLORS.navy }}>{stat.value}</span>
                </div>
                <div style={{ fontSize: "0.65rem", color: "#8AA493", letterSpacing: "0.5px" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ── Overall Rating Banner ── */}
          <div style={{
            background: `linear-gradient(135deg, white, ${COLORS.cyan}04)`,
            borderRadius: "1.25rem",
            padding: "1rem 1.5rem",
            marginBottom: "2rem",
            border: `1px solid ${COLORS.cyan}12`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} fill={COLORS.red} color={COLORS.red} />
              ))}
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 700, color: COLORS.navy }}>4.98</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", color: "#6B7E73", fontSize: "0.85rem" }}>from 2,134 verified reviews on TripAdvisor & Google</span>
          </div>

          {/* ── Desktop Grid View ── */}
          <div className="desktop-grid" style={{
            display: isMobile ? "none" : "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}>
            {displayTestimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card"
                style={{
                  background: "white",
                  borderRadius: "1.25rem",
                  padding: "1.5rem",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  border: `1px solid ${COLORS.cyan}10`,
                  position: "relative",
                }}
              >
                {/* Quote icon */}
                <div style={{ position: "absolute", top: "1rem", right: "1rem", color: `${COLORS.cyan}10` }}>
                  <Quote size={32} />
                </div>

                {/* Rating */}
                <StarRating rating={t.rating} />

                {/* Text */}
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.85rem",
                  color: "#5A6B5E",
                  lineHeight: 1.65,
                  margin: "1rem 0 1.25rem",
                  fontStyle: "italic",
                }}>
                  "{t.text}"
                </p>

                {/* Trip tag */}
                <div style={{
                  display: "inline-block",
                  background: `${COLORS.cyan}10`,
                  color: COLORS.cyan,
                  padding: "0.25rem 0.75rem",
                  borderRadius: "2rem",
                  fontSize: "0.65rem",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  marginBottom: "1rem",
                }}>
                  {t.trip}
                </div>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: "2.5rem", height: "2.5rem",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: `2px solid ${COLORS.cyan}20`,
                    }}
                  />
                  <div>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: COLORS.navy }}>
                      {t.name}
                    </p>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: "#8AA493" }}>
                      {t.origin}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Mobile Carousel View ── */}
          <div className="mobile-carousel" style={{ display: isMobile ? "block" : "none" }}>
            <div
              style={{
                background: "white",
                borderRadius: "1.25rem",
                padding: "1.5rem",
                border: `1px solid ${COLORS.cyan}12`,
                position: "relative",
                animation: "scaleIn 0.3s ease",
              }}
            >
              <div style={{ position: "absolute", top: "1rem", right: "1rem", color: `${COLORS.cyan}10` }}>
                <Quote size={32} />
              </div>

              <StarRating rating={displayTestimonials[activeIndex].rating} />

              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.85rem",
                color: "#5A6B5E",
                lineHeight: 1.65,
                margin: "1rem 0 1.25rem",
                fontStyle: "italic",
              }}>
                "{displayTestimonials[activeIndex].text}"
              </p>

              <div style={{
                display: "inline-block",
                background: `${COLORS.cyan}10`,
                color: COLORS.cyan,
                padding: "0.25rem 0.75rem",
                borderRadius: "2rem",
                fontSize: "0.65rem",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                marginBottom: "1rem",
              }}>
                {displayTestimonials[activeIndex].trip}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img
                  src={displayTestimonials[activeIndex].avatar}
                  alt={displayTestimonials[activeIndex].name}
                  style={{
                    width: "2.5rem", height: "2.5rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${COLORS.cyan}20`,
                  }}
                />
                <div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: COLORS.navy }}>
                    {displayTestimonials[activeIndex].name}
                  </p>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: "#8AA493" }}>
                    {displayTestimonials[activeIndex].origin}
                  </p>
                </div>
              </div>

              {/* Carousel navigation */}
              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
                <button
                  onClick={prevTestimonial}
                  style={{
                    width: "2rem", height: "2rem",
                    borderRadius: "50%",
                    background: `${COLORS.cyan}10`,
                    border: `1px solid ${COLORS.cyan}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ChevronLeft size={14} color={COLORS.cyan} />
                </button>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  {displayTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      style={{
                        width: activeIndex === idx ? "1.5rem" : "0.4rem",
                        height: "0.25rem",
                        borderRadius: "0.25rem",
                        background: activeIndex === idx ? COLORS.cyan : `${COLORS.cyan}40`,
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  style={{
                    width: "2rem", height: "2rem",
                    borderRadius: "50%",
                    background: `${COLORS.cyan}10`,
                    border: `1px solid ${COLORS.cyan}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ChevronRight size={14} color={COLORS.cyan} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Social Proof Banner ── */}
          <div style={{
            marginTop: "2.5rem",
            textAlign: "center",
            padding: "1.5rem",
            background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0F2A4A 100%)`,
            borderRadius: "1.5rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Camera size={16} color={COLORS.lightCyan} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", letterSpacing: "2px", color: COLORS.lightCyan, textTransform: "uppercase" }}>Join the Community</span>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#fff", marginBottom: "0.5rem" }}>
              Share your Wild Paddle moments with <span style={{ color: COLORS.cyan }}>#WildPaddle</span>
            </p>
            <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>
              Tag us for a chance to be featured on our social media
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.75rem" }}>
              <Waves size={12} color={COLORS.cyan} />
              <span style={{ fontSize: "0.7rem", color: "#fff" }}>12,000+ adventures and counting</span>
              <Waves size={12} color={COLORS.cyan} />
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div style={{ marginTop: "2.5rem", lineHeight: 0, marginLeft: "-1.5rem", marginRight: "-1.5rem" }}>
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