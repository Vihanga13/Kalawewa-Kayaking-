import { Shield, AlertCircle, Compass, HeartHandshake, Binoculars, Award } from "lucide-react";

const safetyPoints = [
  {
    icon: <Shield size={24} />,
    title: "Coast Guard Certified",
    description: "All guides hold national water safety certifications and undergo rigorous annual training.",
  },
  {
    icon: <AlertCircle size={24} />,
    title: "Life Jackets for All",
    description: "Premium life jackets are mandatory for every participant. No exceptions, ever.",
  },
  {
    icon: <Binoculars size={24} />,
    title: "Safe Viewing Distance",
    description: "We maintain strict 20-30m distance from wildlife as per Sri Lanka Wildlife Conservation guidelines.",
  },
  {
    icon: <Compass size={24} />,
    title: "Pre-Tour Safety Briefing",
    description: "Every tour begins with a thorough 15-minute safety and wildlife ethics orientation.",
  },
  {
    icon: <HeartHandshake size={24} />,
    title: "Emergency Protocols",
    description: "Satellite communication, first-aid kits, and emergency evacuation plans always in place.",
  },
  {
    icon: <Award size={24} />,
    title: "Zero Incident Record",
    description: "Proud of our perfect safety record across 500+ tours since our founding in 2021.",
  },
];

export function SafetySection() {
  return (
    <section
      id="safety"
      style={{ backgroundColor: "#E8F4EC", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(45,106,79,0.12)",
              border: "1px solid rgba(45,106,79,0.25)",
              padding: "10px 24px",
              borderRadius: "50px",
              marginBottom: "20px",
            }}
          >
            <Shield size={16} color="#2D6A4F" />
            <span
              style={{
                color: "#2D6A4F",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Safety First, Always
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 800,
              color: "#1C3D2E",
              lineHeight: 1.15,
            }}
          >
            Your Safety is Our{" "}
            <span style={{ color: "#2D6A4F", fontStyle: "italic" }}>Priority</span>
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px",
              color: "#5A7264",
              marginTop: "16px",
              maxWidth: "560px",
              margin: "16px auto 0",
              lineHeight: 1.7,
            }}
          >
            Adventure and safety aren't opposites — they go hand in hand.
            We've engineered every aspect of the experience with your wellbeing in mind.
          </p>
        </div>

        {/* Safety Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {safetyPoints.map((point, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                boxShadow: "0 4px 20px rgba(28,61,46,0.07)",
                border: "1px solid rgba(45,106,79,0.08)",
                transition: "transform 0.25s, box-shadow 0.25s",
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
                  width: "50px", height: "50px", flexShrink: 0,
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(76,175,130,0.15), rgba(33,150,168,0.15))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#2D6A4F",
                }}
              >
                {point.icon}
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#1C3D2E",
                    marginBottom: "6px",
                  }}
                >
                  {point.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "#6B8B79",
                    lineHeight: 1.65,
                  }}
                >
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div
          style={{
            marginTop: "56px",
            background: "linear-gradient(135deg, #1C3D2E 0%, #2D6A4F 100%)",
            borderRadius: "24px",
            padding: "40px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
              Trusted by Sri Lanka Wildlife Authority
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "15px" }}>
              Officially licensed & accredited eco-tourism operator since 2021
            </p>
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {["DWLC Approved", "ISO Certified", "Eco-Tourism SL"].map((badge) => (
              <div
                key={badge}
                style={{
                  background: "rgba(126,200,164,0.15)",
                  border: "1px solid rgba(126,200,164,0.3)",
                  padding: "10px 20px",
                  borderRadius: "50px",
                  color: "#7EC8A4",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                ✓ {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div style={{ marginTop: "80px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,50 C360,10 1080,70 1440,30 L1440,80 L0,80 Z" fill="#1C3D2E" />
        </svg>
      </div>
    </section>
  );
}
