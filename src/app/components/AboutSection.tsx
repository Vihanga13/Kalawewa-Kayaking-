import { Binoculars, Mountain, Users, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: <Binoculars size={26} />,
    tag: "Wildlife",
    title: "Wild Elephant Encounters",
    description:
      "Observe Sri Lanka's iconic wild elephants in their natural habitat as they bathe, drink, and roam the riverbanks — completely undisturbed.",
    accent: "#4CAF82",
    accentBg: "rgba(76,175,130,0.08)",
    stat: "50+",
    statLabel: "Elephants spotted avg.",
  },
  {
    icon: <Mountain size={26} />,
    tag: "Scenery",
    title: "Breathtaking Landscapes",
    description:
      "Paddle through lush emerald waterways framed by ancient jungle canopies, misty hills, and pristine wilderness found nowhere else on Earth.",
    accent: "#2196A8",
    accentBg: "rgba(33,150,168,0.08)",
    stat: "3 hrs",
    statLabel: "Avg. paddle duration",
  },
  {
    icon: <Users size={26} />,
    tag: "Expertise",
    title: "Expert-Guided Tours",
    description:
      "Our certified naturalist guides ensure a safe, educational, and deeply immersive experience for every guest, every single time.",
    accent: "#7EC8A4",
    accentBg: "rgba(126,200,164,0.08)",
    stat: "8 yrs",
    statLabel: "In the field",
  },
];

function useInView(threshold = 0.15) {
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

function FeatureCard({ feature, index, inView }: { feature: typeof features[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: "28px",
        padding: "44px 38px 36px",
        border: `1px solid ${hovered ? feature.accent + "44" : "rgba(28,61,46,0.07)"}`,
        transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s",
        transform: inView
          ? hovered ? "translateY(-10px) scale(1.015)" : "translateY(0) scale(1)"
          : "translateY(48px) scale(0.97)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${index * 0.13}s` : "0s",
        boxShadow: hovered
          ? `0 24px 60px rgba(28,61,46,0.14), 0 0 0 1px ${feature.accent}33`
          : "0 4px 28px rgba(28,61,46,0.07)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow blob on hover */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: feature.accent,
          opacity: hovered ? 0.06 : 0,
          filter: "blur(48px)",
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }}
      />

      {/* Tag */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          background: feature.accentBg,
          color: feature.accent,
          padding: "4px 12px",
          borderRadius: "50px",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "'Outfit', sans-serif",
          marginBottom: "24px",
          border: `1px solid ${feature.accent}28`,
        }}
      >
        {feature.tag}
      </div>

      {/* Icon */}
      <div
        style={{
          width: "58px",
          height: "58px",
          background: feature.accentBg,
          borderRadius: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: feature.accent,
          marginBottom: "22px",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
          transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1) rotate(0deg)",
          border: `1px solid ${feature.accent}20`,
        }}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "24px",
          fontWeight: 700,
          color: "#1C3D2E",
          marginBottom: "12px",
          lineHeight: 1.25,
          transition: "color 0.2s",
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "14.5px",
          fontWeight: 300,
          color: "#6B7E73",
          lineHeight: 1.75,
          marginBottom: "28px",
        }}
      >
        {feature.description}
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: `linear-gradient(90deg, ${feature.accent}40, transparent)`,
          marginBottom: "20px",
        }}
      />

      {/* Stat row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "26px",
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
              fontSize: "10px",
              color: "#9AADA0",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            {feature.statLabel}
          </div>
        </div>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: feature.accentBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          <ArrowRight size={16} color={feature.accent} />
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const { ref: cardsRef, inView: cardsInView } = useInView(0.1);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-16px) rotate(2deg); }
        }
        @keyframes waveShift {
          0%, 100% { d: path("M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z"); }
          50%       { d: path("M0,40 C480,5 960,70 1440,20 L1440,80 L0,80 Z"); }
        }
      `}</style>

      <section
        id="about"
        style={{ backgroundColor: "#FAF5EA", padding: "110px 24px 0", position: "relative", overflow: "hidden" }}
      >
        {/* Decorative background elements */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            border: "1px solid rgba(76,175,130,0.1)",
            pointerEvents: "none",
            animation: "floatSlow 9s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "100px",
            right: "-50px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            border: "1px solid rgba(76,175,130,0.08)",
            pointerEvents: "none",
            animation: "floatSlow 9s ease-in-out 1s infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "160px",
            left: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(76,175,130,0.04)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div ref={sectionRef} style={{ textAlign: "center", marginBottom: "80px" }}>

            {/* Label pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(76,175,130,0.1)",
                color: "#2D6A4F",
                padding: "7px 20px",
                borderRadius: "50px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                fontFamily: "'Outfit', sans-serif",
                border: "1px solid rgba(76,175,130,0.2)",
                marginBottom: "24px",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4CAF82" }} />
              The Experience
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(34px, 5.5vw, 64px)",
                fontWeight: 700,
                color: "#1C3D2E",
                lineHeight: 1.1,
                marginBottom: "8px",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              Where Nature Meets
            </h2>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(34px, 5.5vw, 64px)",
                fontWeight: 700,
                color: "#2D6A4F",
                fontStyle: "italic",
                lineHeight: 1.1,
                marginBottom: "28px",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              Raw Adventure
            </h2>

            {/* Decorative line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "28px",
                opacity: inView ? 1 : 0,
                transition: "opacity 0.6s ease 0.3s",
              }}
            >
              <div style={{ height: "1px", width: "56px", background: "rgba(45,106,79,0.25)", transformOrigin: "right", transform: inView ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.7s ease 0.5s" }} />
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4CAF82", opacity: 0.6 }} />
              <div style={{ height: "1px", width: "56px", background: "rgba(45,106,79,0.25)", transformOrigin: "left", transform: inView ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.7s ease 0.5s" }} />
            </div>

            {/* Body text */}
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(15px, 1.8vw, 17.5px)",
                fontWeight: 300,
                color: "#5A6B5E",
                lineHeight: 1.85,
                maxWidth: "660px",
                margin: "0 auto",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
              }}
            >
              Deep in Sri Lanka's{" "}
              <strong style={{ color: "#2D6A4F", fontWeight: 500 }}>Minneriya and Kaudulla</strong>{" "}
              wildlife corridors, a hidden river winds through elephant country. We pioneered
              the world's first kayak-based elephant watching experience — where silence,
              patience, and nature's magic come together in{" "}
              <em style={{ color: "#1C3D2E" }}>one unforgettable moment.</em>
            </p>
          </div>

          {/* Inline highlight bar */}
          <div
            style={{
              display: "flex",
              gap: "0",
              background: "#1C3D2E",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "60px",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
            }}
          >
            {[
              { num: "#1", text: "Kayak elephant experience in South Asia" },
              { num: "12+", text: "Expert naturalist guides on every tour" },
              { num: "2016", text: "Year we first pioneered this experience" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "28px 32px",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 700, color: "#7EC8A4", lineHeight: 1 }}>
                  {item.num}
                </div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", marginTop: "6px", lineHeight: 1.5, letterSpacing: "0.3px" }}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div
            ref={cardsRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} inView={cardsInView} />
            ))}
          </div>
        </div>

        {/* Animated bottom wave */}
        <div style={{ marginTop: "90px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "80px" }}
          >
            <path fill="rgba(76,175,130,0.15)" d="M0,30 C360,70 1080,0 1440,50 L1440,80 L0,80 Z">
              <animate
                attributeName="d"
                dur="6s"
                repeatCount="indefinite"
                values="
                  M0,30 C360,70 1080,0 1440,50 L1440,80 L0,80 Z;
                  M0,50 C360,10 1080,65 1440,25 L1440,80 L0,80 Z;
                  M0,30 C360,70 1080,0 1440,50 L1440,80 L0,80 Z
                "
              />
            </path>
            <path fill="#1C3D2E" d="M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z">
              <animate
                attributeName="d"
                dur="8s"
                repeatCount="indefinite"
                values="
                  M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z;
                  M0,40 C480,5 960,65 1440,20 L1440,80 L0,80 Z;
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