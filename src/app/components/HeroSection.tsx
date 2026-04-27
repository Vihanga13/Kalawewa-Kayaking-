import { Play, ChevronDown } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  heroImg: string;
}

export function HeroSection({ heroImg }: HeroSectionProps) {
  const [videoOpen, setVideoOpen] = useState(false);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.05)",
          transition: "transform 8s ease-out",
        }}
      />

      {/* Gradient Overlays */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,25,15,0.55) 0%, rgba(10,25,15,0.3) 40%, rgba(10,25,15,0.7) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,15,8,0.4) 100%)",
        }}
      />

      {/* Badge */}
      <div
        style={{
          position: "absolute", top: "120px", left: "50%", transform: "translateX(-50%)",
          display: "flex", alignItems: "center", gap: "8px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
          padding: "8px 20px",
          borderRadius: "50px",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4CAF82", animation: "pulse 2s infinite" }} />
        <span style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase" }}>
          First in South Asia
        </span>
      </div>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "900px",
          marginTop: "40px",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px, 7vw, 82px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: "24px",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            letterSpacing: "-0.5px",
          }}
        >
          Kayak Beside{" "}
          <span style={{ color: "#7EC8A4", fontStyle: "italic" }}>Wild Elephants</span>
          <br />— A First in South Asia
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.7,
            marginBottom: "40px",
            maxWidth: "620px",
            margin: "0 auto 40px",
          }}
        >
          Glide silently through the ancient rivers of Sri Lanka as wild elephants
          bathe just meters away. An intimate wildlife encounter unlike anywhere else on Earth.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => scrollTo("#booking")}
            style={{
              background: "linear-gradient(135deg, #4CAF82 0%, #2196A8 100%)",
              color: "#fff",
              border: "none",
              padding: "18px 40px",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.5px",
              boxShadow: "0 8px 30px rgba(76,175,130,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 14px 40px rgba(76,175,130,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(76,175,130,0.4)";
            }}
          >
            Book Your Adventure
          </button>

          <button
            onClick={() => setVideoOpen(true)}
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "18px 36px",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              display: "flex", alignItems: "center", gap: "10px",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
          >
            <div
              style={{
                width: "32px", height: "32px",
                borderRadius: "50%",
                background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Play size={14} fill="#1C3D2E" color="#1C3D2E" style={{ marginLeft: "2px" }} />
            </div>
            Watch Video
          </button>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex", gap: "40px", justifyContent: "center",
            marginTop: "56px", flexWrap: "wrap",
          }}
        >
          {[
            { value: "500+", label: "Happy Adventurers" },
            { value: "4.9★", label: "Average Rating" },
            { value: "100%", label: "Safe Record" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "#7EC8A4" }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.6)", letterSpacing: "1px", textTransform: "uppercase", marginTop: "2px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("#about")}
        style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
          fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
        }}
      >
        <span>Explore</span>
        <ChevronDown size={20} style={{ animation: "bounce 2s infinite" }} />
      </button>

      {/* Wave divider */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FAF5EA" />
        </svg>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          onClick={() => setVideoOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#000", borderRadius: "16px", overflow: "hidden",
              width: "90%", maxWidth: "900px", aspectRatio: "16/9",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "center", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
              <Play size={64} color="#7EC8A4" style={{ marginBottom: "16px" }} />
              <p style={{ fontSize: "18px", opacity: 0.7 }}>Video coming soon — connect your media</p>
              <button
                onClick={() => setVideoOpen(false)}
                style={{
                  marginTop: "24px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff", padding: "10px 24px",
                  borderRadius: "50px", cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
