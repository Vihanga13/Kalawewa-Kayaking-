import { Binoculars, Mountain, Users, ArrowRight, Waves, Droplet, Shield, MapPin, Clock, Users as UsersIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

// Feature data with icons
const features = [
  {
    icon: <Binoculars size={26} strokeWidth={1.8} />,
    tag: "Wildlife",
    title: "Close Encounters",
    description: "Paddle silently within metres of bathing elephant herds — an intimate wildlife moment unmatched anywhere in Asia.",
    accent: COLORS.cyan,
    accentBg: `${COLORS.cyan}12`,
    stat: "50+",
    statLabel: "Elephants spotted per tour",
  },
  {
    icon: <Mountain size={26} strokeWidth={1.8} />,
    tag: "Scenery",
    title: "Ancient Waters",
    description: "Glide through 2,000-year-old Kalawewa reservoir, surrounded by jungle canopies and misty horizon lines.",
    accent: COLORS.lightCyan,
    accentBg: `${COLORS.lightCyan}12`,
    stat: "3+ hrs",
    statLabel: "Immersive paddle journey",
  },
  {
    icon: <Users size={26} strokeWidth={1.8} />,
    tag: "Expertise",
    title: "Naturalist Guides",
    description: "Certified wildlife naturalists ensure safe, respectful encounters while revealing elephant behaviour secrets.",
    accent: COLORS.cyan,
    accentBg: `${COLORS.cyan}12`,
    stat: "8 yrs",
    statLabel: "Pioneering the experience",
  },
];

// Testimonial data
const testimonials = [
  {
    quote: "We paddled just 20 metres from a herd of 14 elephants — they didn't even notice us. Surreal and respectful.",
    author: "Sarah & James",
    location: "Australia",
    rating: 5,
  },
  {
    quote: "The guides know every elephant by name. This is conservation done right. Best thing we did in Sri Lanka.",
    author: "Michael Chen",
    location: "Singapore",
    rating: 5,
  },
  {
    quote: "Sunrise on the water with mist rising, elephants calling in the distance — pure magic. Worth every rupee.",
    author: "Emma Wilson",
    location: "UK",
    rating: 5,
  },
];

// Hook for scroll-triggered animations
function useInView(threshold = 0.15, triggerOnce = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) obs.disconnect();
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, triggerOnce]);
  return { ref, inView };
}

// Feature Card Component
function FeatureCard({ feature, index, inView }: { feature: typeof features[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "2rem",
        padding: "2rem 1.75rem",
        border: `1px solid ${hovered ? `${feature.accent}40` : "rgba(27,58,107,0.08)"}`,
        transition: "all 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
        transform: inView
          ? hovered
            ? "translateY(-8px) scale(1.01)"
            : "translateY(0) scale(1)"
          : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 0.1}s` : "0s",
        boxShadow: hovered
          ? `0 20px 40px rgba(0,0,0,0.08), 0 0 0 2px ${feature.accent}20`
          : "0 4px 12px rgba(0,0,0,0.03)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative gradient blob */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-30%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: feature.accent,
          opacity: hovered ? 0.06 : 0,
          filter: "blur(40px)",
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }}
      />

      {/* Tag pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: feature.accentBg,
          color: feature.accent,
          padding: "0.3rem 1rem",
          borderRadius: "3rem",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontFamily: "'Outfit', sans-serif",
          marginBottom: "1.5rem",
          border: `1px solid ${feature.accent}25`,
        }}
      >
        {feature.tag}
      </div>

      {/* Icon with animated hover */}
      <div
        style={{
          width: "3.5rem",
          height: "3.5rem",
          background: feature.accentBg,
          borderRadius: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: feature.accent,
          marginBottom: "1.5rem",
          transition: "transform 0.3s ease",
          transform: hovered ? "scale(1.1) rotate(-2deg)" : "scale(1)",
        }}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          color: COLORS.navy,
          marginBottom: "0.75rem",
          lineHeight: 1.25,
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.9rem",
          fontWeight: 400,
          color: "#5A6B5E",
          lineHeight: 1.65,
          marginBottom: "1.75rem",
        }}
      >
        {feature.description}
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: `linear-gradient(90deg, ${feature.accent}30, transparent)`,
          marginBottom: "1.25rem",
        }}
      />

      {/* Stat row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: feature.accent,
              lineHeight: 1,
            }}
          >
            {feature.stat}
          </div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.65rem",
              color: "#9AADA0",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginTop: "0.25rem",
            }}
          >
            {feature.statLabel}
          </div>
        </div>
        <div
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
            background: feature.accentBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s ease",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          <ArrowRight size={14} color={feature.accent} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

// Testimonial Card
function TestimonialCard({ testimonial, index, inView }: { testimonial: typeof testimonials[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: `linear-gradient(135deg, ${COLORS.navy}08, white)`,
        backdropFilter: "blur(8px)",
        borderRadius: "1.5rem",
        padding: "1.75rem",
        border: `1px solid ${hovered ? `${COLORS.cyan}30` : "rgba(27,58,107,0.06)"}`,
        transition: "all 0.3s ease",
        transform: inView ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(30px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${0.5 + index * 0.1}s`,
      }}
    >
      {/* Quote marks */}
      <div style={{ fontSize: "3rem", lineHeight: 1, color: `${COLORS.cyan}30`, marginBottom: "-1rem", fontFamily: "Georgia, serif" }}>"</div>
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.9rem",
          fontWeight: 400,
          color: "#4A5B4E",
          lineHeight: 1.65,
          marginBottom: "1.25rem",
          fontStyle: "italic",
        }}
      >
        {testimonial.quote}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: "0.85rem" }}>{testimonial.author}</div>
          <div style={{ fontSize: "0.7rem", color: "#9AADA0" }}>{testimonial.location}</div>
        </div>
        <div style={{ display: "flex", gap: "2px" }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: COLORS.red, fontSize: "0.7rem" }}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Highlight stat item
function HighlightStat({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  const { ref, inView } = useInView(0.3);
  const [counted, setCounted] = useState(0);
  
  useEffect(() => {
    if (inView && counted === 0) {
      const target = parseInt(value) || 0;
      let start = 0;
      const duration = 1500;
      const step = (timestamp: number) => {
        start += 16;
        const progress = Math.min(start / duration, 1);
        const current = Math.floor(target * progress);
        setCounted(current);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      setCounted(1); // mark as started
    }
  }, [inView, value, counted]);

  const displayValue = counted === 0 ? "0" : value.includes("+") ? `${counted}+` : value.includes("k") ? `${Math.floor(counted / 1000)}k+` : counted.toString();

  return (
    <div ref={ref} style={{ textAlign: "center", position: "relative" }}>
      <div
        style={{
          width: "3rem",
          height: "3rem",
          margin: "0 auto 1rem",
          borderRadius: "1rem",
          background: `${COLORS.cyan}10`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: COLORS.cyan,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2.5rem",
          fontWeight: 700,
          color: COLORS.lightCyan,
          lineHeight: 1,
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.7rem",
          color: "#6B7E73",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginTop: "0.5rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function AboutSection() {
  const { ref: headerRef, inView: headerInView } = useInView(0.15);
  const { ref: cardsRef, inView: cardsInView } = useInView(0.1);
  const { ref: statsRef, inView: statsInView } = useInView(0.2);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Carousel images (use actual image URLs in production)
  const carouselImages = [
    "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1582433736551-19e3a2e6c0b6?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1549366021-8a06e197bfd1?w=800&h=500&fit=crop",
  ];

  // Auto rotate carousel
  useEffect(() => {
    if (imageIntervalRef.current) clearInterval(imageIntervalRef.current);
    imageIntervalRef.current = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => {
      if (imageIntervalRef.current) clearInterval(imageIntervalRef.current);
    };
  }, [carouselImages.length]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes waveFloat {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-10px) translateY(8px); }
        }
        @keyframes ripplePulse {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .carousel-image {
          transition: opacity 0.5s ease-in-out;
        }
        @media (max-width: 768px) {
          .highlight-stats-grid {
            gap: 1.5rem;
          }
        }
      `}</style>

      <section
        id="about"
        style={{
          background: "#FAF5EA",
          padding: "5rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Background Elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: `${COLORS.cyan}04`,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "-10%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: `${COLORS.lightCyan}04`,
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />
        
        {/* Floating water drops */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${5 + (i * 15)}%`,
              top: `${30 + (i * 12)}%`,
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: `${COLORS.cyan}20`,
              animation: `ripplePulse ${3 + i * 0.5}s infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          
          {/* Header Section with Image Carousel */}
          <div
            ref={headerRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "4rem",
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: `${COLORS.red}10`,
                color: COLORS.red,
                padding: "0.4rem 1.2rem",
                borderRadius: "2rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
                marginBottom: "1.5rem",
                border: `1px solid ${COLORS.red}20`,
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.6s ease",
              }}
            >
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.red }} />
              Since 2016 — Pioneers of Kayak Safari
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: 700,
                color: COLORS.navy,
                textAlign: "center",
                lineHeight: 1.2,
                marginBottom: "0.5rem",
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.1s",
              }}
            >
              Paddle Into the Heart
            </h2>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: 700,
                color: COLORS.lightCyan,
                fontStyle: "italic",
                textAlign: "center",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0.2s",
              }}
            >
              of Elephant Country
            </h2>

            {/* Decorative line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "2rem",
                opacity: headerInView ? 1 : 0,
                transition: "opacity 0.6s ease 0.3s",
              }}
            >
              <div style={{ width: "40px", height: "2px", background: `${COLORS.cyan}40`, transformOrigin: "right", transform: headerInView ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.7s ease 0.4s" }} />
              <Waves size={16} color={COLORS.cyan} />
              <div style={{ width: "40px", height: "2px", background: `${COLORS.cyan}40`, transformOrigin: "left", transform: headerInView ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.7s ease 0.4s" }} />
            </div>

            {/* Image Carousel - Eye-catching visual */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "900px",
                borderRadius: "1.5rem",
                overflow: "hidden",
                marginBottom: "2rem",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                opacity: headerInView ? 1 : 0,
                transform: headerInView ? "scale(1)" : "scale(0.95)",
                transition: "all 0.7s ease 0.3s",
              }}
            >
              <div style={{ position: "relative", paddingBottom: "56.25%" }}>
                {carouselImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Kayaking adventure ${idx + 1}`}
                    className="carousel-image"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: activeImageIndex === idx ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                  />
                ))}
              </div>
              {/* Carousel dots */}
              <div style={{ position: "absolute", bottom: "1rem", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: activeImageIndex === idx ? "2rem" : "0.5rem",
                      height: "0.25rem",
                      borderRadius: "0.25rem",
                      background: activeImageIndex === idx ? COLORS.red : "white",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Description text */}
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
                fontWeight: 400,
                color: "#5A6B5E",
                lineHeight: 1.75,
                maxWidth: "700px",
                textAlign: "center",
                margin: "0 auto",
                opacity: headerInView ? 1 : 0,
                transition: "opacity 0.6s ease 0.5s",
              }}
            >
              Deep in Sri Lanka's{" "}
              <strong style={{ color: COLORS.cyan, fontWeight: 600 }}>Minneriya–Kaudulla corridor</strong>
              , we pioneered the world's first kayak-based elephant watching. 
              No engines, no crowds — just you, the water, and gentle giants.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div
            ref={cardsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.75rem",
              marginBottom: "5rem",
            }}
          >
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} inView={cardsInView} />
            ))}
          </div>

          {/* Stats Highlight Bar - Attached Tourist People Feel */}
          <div
            ref={statsRef}
            style={{
              background: `linear-gradient(135deg, ${COLORS.navy}04, white)`,
              borderRadius: "2rem",
              padding: "2.5rem 1.5rem",
              marginBottom: "4rem",
              border: `1px solid ${COLORS.cyan}15`,
              opacity: statsInView ? 1 : 0,
              transform: statsInView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "2rem",
                textAlign: "center",
              }}
            >
              <HighlightStat value="12k+" label="Happy Travelers" icon={<UsersIcon size={24} strokeWidth={1.5} />} />
              <HighlightStat value="156" label="Elephant Sightings" icon={<Binoculars size={24} strokeWidth={1.5} />} />
              <HighlightStat value="99%" label="Recommend Us" icon={<Shield size={24} strokeWidth={1.5} />} />
              <HighlightStat value="8+" label="Years Pioneering" icon={<Clock size={24} strokeWidth={1.5} />} />
            </div>
          </div>

          {/* Testimonials + Bottom Wave */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: `${COLORS.cyan}08`,
                padding: "0.3rem 1.2rem",
                borderRadius: "2rem",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ fontSize: "0.7rem", letterSpacing: "2px", fontWeight: 600, color: COLORS.navy }}>VOICES FROM THE WATER</span>
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                color: COLORS.navy,
                marginBottom: "2rem",
              }}
            >
              What Our <em style={{ color: COLORS.cyan, fontStyle: "italic" }}>Adventurers</em> Say
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={i} testimonial={testimonial} index={i} inView={statsInView} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div style={{ marginTop: "4rem", marginLeft: "-1.5rem", marginRight: "-1.5rem", lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "60px" }}
          >
            <path fill={`${COLORS.navy}08`} d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z">
              <animate
                attributeName="d"
                dur="6s"
                repeatCount="indefinite"
                values="
                  M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z;
                  M0,55 C360,15 1080,65 1440,55 L1440,80 L0,80 Z;
                  M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z
                "
              />
            </path>
            <path fill={`${COLORS.navy}`} d="M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z">
              <animate
                attributeName="d"
                dur="8s"
                repeatCount="indefinite"
                values="
                  M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z;
                  M0,30 C480,5 960,65 1440,25 L1440,80 L0,80 Z;
                  M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z
                "
              />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}