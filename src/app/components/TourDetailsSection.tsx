import { Clock, DollarSign, MapPin, Users, Sun, Camera, Waves } from "lucide-react";

const details = [
  {
    icon: <Clock size={26} />,
    label: "Duration",
    value: "3–4 Hours",
    sub: "Morning or afternoon",
    color: "#4CAF82",
  },
  {
    icon: <DollarSign size={26} />,
    label: "Price",
    value: "From $89",
    sub: "Per person, all inclusive",
    color: "#2196A8",
  },
  {
    icon: <MapPin size={26} />,
    label: "Location",
    value: "Kaudulla, Sri Lanka",
    sub: "North Central Province",
    color: "#F4A261",
  },
  {
    icon: <Users size={26} />,
    label: "Group Size",
    value: "Max 8 People",
    sub: "Intimate experience only",
    color: "#9B59B6",
  },
  {
    icon: <Sun size={26} />,
    label: "Best Season",
    value: "Jun – Oct",
    sub: "Peak elephant gathering",
    color: "#E67E22",
  },
  {
    icon: <Camera size={26} />,
    label: "Photography",
    value: "Unrestricted",
    sub: "Bring your best lens",
    color: "#E74C3C",
  },
];

const included = [
  "Professional kayak with paddle & safety gear",
  "Certified naturalist guide",
  "Life jacket & safety briefing",
  "Light refreshments & water",
  "Wildlife photography tips",
  "Eco-friendly certificate",
];

export function TourDetailsSection() {
  return (
    <section
      id="tour-details"
      style={{ backgroundColor: "#FAF5EA", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(76,175,130,0.12)",
              color: "#2D6A4F",
              padding: "6px 18px",
              borderRadius: "50px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
              border: "1px solid rgba(76,175,130,0.25)",
              marginBottom: "16px",
            }}
          >
            Tour Details
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
            Everything You Need to{" "}
            <span style={{ color: "#2D6A4F", fontStyle: "italic" }}>Know</span>
          </h2>
        </div>

        {/* Detail Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "60px",
          }}
        >
          {details.map((detail, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "32px 28px",
                boxShadow: "0 4px 20px rgba(28,61,46,0.07)",
                border: "1px solid rgba(28,61,46,0.06)",
                transition: "transform 0.25s, box-shadow 0.25s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 36px rgba(28,61,46,0.13)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(28,61,46,0.07)";
              }}
            >
              <div
                style={{
                  width: "52px", height: "52px",
                  borderRadius: "14px",
                  background: `${detail.color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: detail.color,
                  marginBottom: "20px",
                }}
              >
                {detail.icon}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9EB09E", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                {detail.label}
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1C3D2E", lineHeight: 1.2 }}>
                {detail.value}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#7A9485", marginTop: "4px" }}>
                {detail.sub}
              </p>
            </div>
          ))}
        </div>

        {/* What's Included */}
        <div
          style={{
            background: "linear-gradient(135deg, #1C3D2E 0%, #2D6A4F 100%)",
            borderRadius: "28px",
            padding: "56px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div>
            <Waves size={36} color="#7EC8A4" style={{ marginBottom: "20px" }} />
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              What's{" "}
              <span style={{ color: "#7EC8A4", fontStyle: "italic" }}>Included</span>
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "15px", lineHeight: 1.7 }}>
              Every Wild Paddle experience is fully curated so you can focus entirely
              on the wildlife and the moment.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {included.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div
                  style={{
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: "rgba(126,200,164,0.2)",
                    border: "1px solid rgba(126,200,164,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "1px",
                  }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#7EC8A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.82)", fontSize: "15px", lineHeight: 1.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div style={{ marginTop: "80px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,30 C480,80 960,0 1440,50 L1440,80 L0,80 Z" fill="#E8F4EC" />
        </svg>
      </div>
    </section>
  );
}
