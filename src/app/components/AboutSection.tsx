import { Binoculars, Mountain, Users, ArrowRight, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Kayaking Kalawewa Brand Colors (extracted from logo) ──
const C = {
  navy:      "#1B3A6B",
  cyan:      "#00B4D8",
  lightCyan: "#48CAE4",
  red:       "#E63329",
  cream:     "#FAF5EA",
  dark:      "#0D2340",
};

const features = [
  {
    icon: <Binoculars size={24} strokeWidth={1.8} />,
    tag: "Wildlife",
    title: "Wild Elephant Encounters",
    description:
      "Paddle silently within metres of bathing elephant herds. An intimate wildlife moment found nowhere else in Asia.",
    accent: C.cyan,
    stat: "50+",
    statLabel: "Elephants per tour",
  },
  {
    icon: <Mountain size={24} strokeWidth={1.8} />,
    tag: "Heritage",
    title: "Ancient Kalawewa Waters",
    description:
      "Glide across a 2,000-year-old reservoir surrounded by jungle canopies, misty horizons, and pure silence.",
    accent: C.lightCyan,
    stat: "3+ hrs",
    statLabel: "Immersive paddle",
  },
  {
    icon: <Users size={24} strokeWidth={1.8} />,
    tag: "Expertise",
    title: "Certified Naturalist Guides",
    description:
      "Our experts reveal elephant behaviour secrets while keeping every encounter safe, respectful, and unforgettable.",
    accent: C.cyan,
    stat: "8 yrs",
    statLabel: "Pioneering the experience",
  },
];

const testimonials = [
  {
    quote: "We paddled just 20 metres from a herd of 14 elephants — they didn't even notice us. Surreal and beautiful.",
    author: "Sarah & James",
    location: "Australia",
  },
  {
    quote: "The guides know every elephant by name. Best thing we did in Sri Lanka — conservation done right.",
    author: "Michael Chen",
    location: "Singapore",
  },
  {
    quote: "Sunrise on the water, mist rising, elephants calling in the distance. Pure magic. Worth every moment.",
    author: "Emma Wilson",
    location: "United Kingdom",
  },
];

function useInView(threshold = 0.12) {
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

function FeatureCard({
  feature, index, inView,
}: {
  feature: typeof features[0]; index: number; inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "36px 30px 28px",
        border: `1px solid ${hovered ? feature.accent + "44" : "rgba(27,58,107,0.08)"}`,
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px ${feature.accent}22`
          : "0 3px 16px rgba(0,0,0,0.05)",
        transition:
          "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s, border-color 0.3s",
        transform: inView
          ? hovered
            ? "translateY(-8px) scale(1.015)"
            : "translateY(0)"
          : "translateY(44px)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 0.1}s` : "0s",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hover glow blob */}
      <div style={{
        position: "absolute", top: "-40px", right: "-40px",
        width: "160px", height: "160px", borderRadius: "50%",
        background: feature.accent,
        opacity: hovered ? 0.06 : 0, filter: "blur(48px)",
        transition: "opacity 0.4s", pointerEvents: "none",
      }} />
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, ${feature.accent}, transparent)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />

      <span style={{
        display: "inline-block",
        background: `${feature.accent}14`, color: feature.accent,
        padding: "3px 12px", borderRadius: "50px",
        fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
        fontFamily: "'DM Sans', sans-serif", marginBottom: "20px",
        border: `1px solid ${feature.accent}25`,
      }}>
        {feature.tag}
      </span>

      <div style={{
        width: "50px", height: "50px", borderRadius: "14px",
        background: `${feature.accent}12`, border: `1px solid ${feature.accent}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: feature.accent, marginBottom: "18px",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1)",
      }}>
        {feature.icon}
      </div>

      <h3 style={{
        fontFamily: "'Fraunces', serif", fontSize: "21px", fontWeight: 700,
        color: C.navy, lineHeight: 1.25, marginBottom: "10px",
      }}>
        {feature.title}
      </h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 300,
        color: "#5A6B5E", lineHeight: 1.72, marginBottom: "24px",
      }}>
        {feature.description}
      </p>

      <div style={{ height: "1px", background: `linear-gradient(90deg, ${feature.accent}35, transparent)`, marginBottom: "18px" }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", fontWeight: 700, color: feature.accent, lineHeight: 1 }}>
            {feature.stat}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#9AADA0", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>
            {feature.statLabel}
          </div>
        </div>
        <div style={{
          width: "34px", height: "34px", borderRadius: "50%",
          background: `${feature.accent}12`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.3s",
          transform: hovered ? "translateX(5px)" : "translateX(0)",
        }}>
          <ArrowRight size={15} color={feature.accent} />
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  const { ref: headerRef, inView: headerIn } = useInView(0.1);
  const { ref: cardsRef,  inView: cardsIn  } = useInView(0.08);
  const { ref: statsRef,  inView: statsIn  } = useInView(0.1);
  const { ref: testiRef,  inView: testiIn  } = useInView(0.08);

  const [activeImg, setActiveImg] = useState(0);
  const imgs = [
    "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=900&h=500&fit=crop",
    "https://images.unsplash.com/photo-1549366021-8a06e197bfd1?w=900&h=500&fit=crop",
    "https://images.unsplash.com/photo-1582433736551-19e3a2e6c0b6?w=900&h=500&fit=crop",
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveImg((p) => (p + 1) % imgs.length), 4000);
    return () => clearInterval(t);
  }, [imgs.length]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,800;1,9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap"
      />
      <style>{`
        @keyframes floatOrb { 0%,100%{transform:translate(0,0);} 50%{transform:translate(10px,-16px);} }
        .ab-testi:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 16px 40px rgba(0,0,0,0.09) !important;
          border-color: ${C.cyan}40 !important;
        }
      `}</style>

      <section
        id="about"
        style={{ background: C.cream, padding: "110px 24px 0", position: "relative", overflow: "hidden" }}
      >
        {/* Bg orbs */}
        <div style={{ position: "absolute", top: "8%", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: `${C.cyan}06`, filter: "blur(80px)", animation: "floatOrb 11s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: `${C.navy}05`, filter: "blur(70px)", animation: "floatOrb 14s ease-in-out 2s infinite", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

          {/* ── HEADER ── */}
          <div ref={headerRef} style={{ textAlign: "center", marginBottom: "60px" }}>
            {/* Red badge (matches logo red arc) */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: `${C.red}10`, color: C.red,
              padding: "7px 20px", borderRadius: "50px",
              fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              border: `1px solid ${C.red}22`, marginBottom: "22px",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s, transform 0.6s",
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.red }} />
              Since 2016 — Pioneers of Kayak Safari
            </div>

            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(34px, 6vw, 64px)",
              fontWeight: 700, color: C.navy, lineHeight: 1.08, marginBottom: "6px",
              opacity: headerIn ? 1 : 0, transform: headerIn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
            }}>
              Paddle Into the Heart
            </h2>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(34px, 6vw, 64px)",
              fontWeight: 700, color: C.cyan, fontStyle: "italic", lineHeight: 1.08,
              marginBottom: "24px",
              opacity: headerIn ? 1 : 0, transform: headerIn ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s 0.18s, transform 0.7s 0.18s",
            }}>
              of Elephant Country
            </h2>

            {/* Divider — cyan matches logo waves */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "32px", opacity: headerIn ? 1 : 0, transition: "opacity 0.6s 0.3s" }}>
              <div style={{ width: "48px", height: "1px", background: `${C.cyan}40`, transformOrigin: "right", transform: headerIn ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.7s 0.5s" }} />
              <Waves size={15} color={C.cyan} />
              <div style={{ width: "48px", height: "1px", background: `${C.cyan}40`, transformOrigin: "left", transform: headerIn ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.7s 0.5s" }} />
            </div>

            {/* Image Carousel */}
            <div style={{
              position: "relative", width: "100%", maxWidth: "860px",
              margin: "0 auto 32px", borderRadius: "22px", overflow: "hidden",
              boxShadow: `0 24px 60px ${C.navy}22`,
              opacity: headerIn ? 1 : 0, transform: headerIn ? "scale(1)" : "scale(0.96)",
              transition: "opacity 0.7s 0.3s, transform 0.7s 0.3s",
            }}>
              <div style={{ position: "relative", paddingBottom: "52%" }}>
                {imgs.map((src, i) => (
                  <img key={i} src={src} alt="Kayaking Kalawewa" style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%", objectFit: "cover",
                    opacity: activeImg === i ? 1 : 0,
                    transition: "opacity 0.7s ease",
                  }} />
                ))}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: `linear-gradient(to top, ${C.dark}cc, transparent)`, padding: "24px 28px 18px" }}>
                  <span style={{ fontFamily: "'Fraunces', serif", color: "#fff", fontSize: "17px", fontWeight: 700 }}>
                    Kalawewa Reservoir, Sri Lanka
                  </span>
                  <span style={{ display: "block", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "12px", marginTop: "3px" }}>
                    North Central Province · Est. 460 CE
                  </span>
                </div>
              </div>
              {/* Dots */}
              <div style={{ position: "absolute", bottom: "18px", right: "22px", display: "flex", gap: "6px" }}>
                {imgs.map((_, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{
                    width: activeImg === i ? "22px" : "6px", height: "6px",
                    borderRadius: "3px",
                    background: activeImg === i ? C.red : "rgba(255,255,255,0.45)",
                    border: "none", cursor: "pointer",
                    transition: "all 0.35s ease",
                  }} />
                ))}
              </div>
            </div>

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: "clamp(14px, 1.8vw, 17px)", color: "#5A6B5E",
              lineHeight: 1.82, maxWidth: "640px", margin: "0 auto",
              opacity: headerIn ? 1 : 0, transition: "opacity 0.7s 0.45s",
            }}>
              Deep in Sri Lanka's{" "}
              <strong style={{ color: C.cyan, fontWeight: 500 }}>Minneriya–Kaudulla wildlife corridor</strong>
              {" "}we pioneered the world's first kayak-based elephant watching. No engines, no crowds
              — just you, the ancient water, and gentle giants.
            </p>
          </div>

          {/* ── FEATURE CARDS ── */}
          <div
            ref={cardsRef}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "22px", marginBottom: "60px" }}
          >
            {features.map((f, i) => (
              <FeatureCard key={i} feature={f} index={i} inView={cardsIn} />
            ))}
          </div>

          {/* ── STATS BAR — navy bg matching logo kayak color ── */}
          <div
            ref={statsRef}
            style={{
              background: `linear-gradient(135deg, ${C.navy}, ${C.dark})`,
              borderRadius: "24px",
              padding: "clamp(28px,4vw,44px) clamp(24px,5vw,52px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "32px",
              marginBottom: "60px",
              position: "relative", overflow: "hidden",
              opacity: statsIn ? 1 : 0,
              transform: statsIn ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s, transform 0.7s",
            }}
          >
            <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.cyan}06 1px, transparent 1px), linear-gradient(90deg, ${C.cyan}06 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: "-50px", right: "10%", width: "200px", height: "200px", borderRadius: "50%", background: `radial-gradient(circle, ${C.cyan}16, transparent 70%)`, pointerEvents: "none" }} />

            {[
              { val: "500+", label: "Happy Adventurers" },
              { val: "4.9★", label: "Average Rating" },
              { val: "100%", label: "Safe Record" },
              { val: "2016", label: "Year Founded" },
            ].map((s, i) => (
              <div key={i} style={{
                textAlign: "center", position: "relative",
                opacity: statsIn ? 1 : 0,
                transform: statsIn ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.6s ${0.1 + i * 0.08}s, transform 0.6s ${0.1 + i * 0.08}s`,
              }}>
                {i > 0 && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", height: "30px", width: "1px", background: "rgba(255,255,255,0.08)" }} />}
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: C.lightCyan, lineHeight: 1 }}>
                  {s.val}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.38)", letterSpacing: "1.8px", textTransform: "uppercase", marginTop: "6px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── TESTIMONIALS ── */}
          <div ref={testiRef}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${C.cyan}10`, border: `1px solid ${C.cyan}22`, padding: "6px 18px", borderRadius: "50px", marginBottom: "14px" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 600, color: C.navy, letterSpacing: "2px", textTransform: "uppercase" }}>
                  Voices From the Water
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, color: C.navy,
                opacity: testiIn ? 1 : 0, transform: testiIn ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s, transform 0.6s",
              }}>
                What Our{" "}
                <em style={{ color: C.cyan, fontStyle: "italic" }}>Adventurers</em> Say
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="ab-testi"
                  style={{
                    background: "#fff", borderRadius: "20px", padding: "28px 26px",
                    border: "1px solid rgba(27,58,107,0.07)",
                    boxShadow: "0 3px 14px rgba(0,0,0,0.04)",
                    transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                    opacity: testiIn ? 1 : 0,
                    transform: testiIn ? "translateY(0)" : "translateY(24px)",
                    transitionDelay: `${0.1 + i * 0.1}s`,
                  }}
                >
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "44px", lineHeight: 0.8, color: `${C.cyan}28`, marginBottom: "10px" }}>"</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 300, color: "#4A5B4E", lineHeight: 1.72, marginBottom: "20px", fontStyle: "italic" }}>
                    {t.quote}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: C.navy }}>{t.author}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#9AADA0", marginTop: "2px" }}>{t.location}</div>
                    </div>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[...Array(5)].map((_, j) => (
                        <span key={j} style={{ color: C.red, fontSize: "12px" }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── WAVE DIVIDER ── */}
        <div style={{ marginTop: "90px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
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