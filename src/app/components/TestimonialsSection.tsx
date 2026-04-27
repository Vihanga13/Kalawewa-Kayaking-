import { Star, Quote } from "lucide-react";

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

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          fill={star <= rating ? "#F4A261" : "transparent"}
          color={star <= rating ? "#F4A261" : "#ccc"}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      style={{ backgroundColor: "#FAF5EA", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(244,162,97,0.12)",
              color: "#C47A35",
              padding: "6px 18px",
              borderRadius: "50px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
              border: "1px solid rgba(244,162,97,0.25)",
              marginBottom: "16px",
            }}
          >
            Traveller Stories
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 800,
              color: "#1C3D2E",
              lineHeight: 1.15,
              marginTop: "8px",
            }}
          >
            Moments That Last{" "}
            <span style={{ color: "#C47A35", fontStyle: "italic" }}>a Lifetime</span>
          </h2>

          {/* Overall rating */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} fill="#F4A261" color="#F4A261" />
              ))}
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1C3D2E" }}>4.9</span>
            <span style={{ fontFamily: "'Inter', sans-serif", color: "#6B8B79", fontSize: "15px" }}>from 200+ verified reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "24px",
                padding: "36px 32px",
                boxShadow: "0 4px 24px rgba(28,61,46,0.08)",
                border: "1px solid rgba(28,61,46,0.06)",
                position: "relative",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(28,61,46,0.13)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(28,61,46,0.08)";
              }}
            >
              {/* Quote icon */}
              <div
                style={{
                  position: "absolute", top: "28px", right: "28px",
                  color: "rgba(76,175,130,0.15)",
                }}
              >
                <Quote size={40} fill="rgba(76,175,130,0.15)" />
              </div>

              {/* Rating */}
              <StarRating rating={t.rating} />

              {/* Text */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  color: "#4A6456",
                  lineHeight: 1.75,
                  margin: "20px 0 28px",
                  fontStyle: "italic",
                }}
              >
                "{t.text}"
              </p>

              {/* Trip tag */}
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(76,175,130,0.1)",
                  color: "#2D6A4F",
                  padding: "4px 12px",
                  borderRadius: "50px",
                  fontSize: "11px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  marginBottom: "20px",
                }}
              >
                {t.trip}
              </div>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: "48px", height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid rgba(76,175,130,0.2)",
                  }}
                />
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 700, color: "#1C3D2E" }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#7A9485" }}>
                    {t.origin}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div style={{ marginTop: "80px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,40 C480,0 960,80 1440,30 L1440,80 L0,80 Z" fill="#1C3D2E" />
        </svg>
      </div>
    </section>
  );
}
