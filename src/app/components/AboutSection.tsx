import { Binoculars, Mountain, Users } from "lucide-react";

const features = [
  {
    icon: <Binoculars size={28} />,
    title: "Wild Elephant Encounters",
    description:
      "Observe Sri Lanka's iconic wild elephants in their natural habitat as they bathe, drink, and roam the riverbanks — completely undisturbed.",
  },
  {
    icon: <Mountain size={28} />,
    title: "Breathtaking Scenery",
    description:
      "Paddle through lush emerald waterways framed by ancient jungle canopies, misty hills, and pristine wilderness found nowhere else.",
  },
  {
    icon: <Users size={28} />,
    title: "Expert-Guided Tours",
    description:
      "Our certified naturalist guides ensure a safe, educational, and deeply immersive experience for every guest, every single time.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      style={{ backgroundColor: "#FAF5EA", padding: "100px 24px 80px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Label */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
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
            }}
          >
            The Experience
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            color: "#1C3D2E",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: "20px",
          }}
        >
          Where Nature Meets
          <br />
          <span style={{ color: "#2D6A4F", fontStyle: "italic" }}>Adventure</span>
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "#5A6B5E",
            textAlign: "center",
            lineHeight: 1.75,
            maxWidth: "680px",
            margin: "0 auto 72px",
          }}
        >
          Deep in Sri Lanka's Minneriya and Kaudulla wildlife corridors, a hidden river
          winds through elephant country. We pioneered the world's first kayak-based
          elephant watching experience — where silence, patience, and nature's magic
          come together in one unforgettable moment.
        </p>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "28px",
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "24px",
                padding: "40px 36px",
                boxShadow: "0 4px 24px rgba(28,61,46,0.08)",
                border: "1px solid rgba(76,175,130,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(28,61,46,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(28,61,46,0.08)";
              }}
            >
              <div
                style={{
                  width: "60px", height: "60px",
                  background: "linear-gradient(135deg, rgba(76,175,130,0.15), rgba(33,150,168,0.15))",
                  borderRadius: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#2D6A4F",
                  marginBottom: "24px",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1C3D2E",
                  marginBottom: "12px",
                  lineHeight: 1.3,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  color: "#6B7E73",
                  lineHeight: 1.7,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ marginTop: "80px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="#1C3D2E" />
        </svg>
      </div>
    </section>
  );
}
