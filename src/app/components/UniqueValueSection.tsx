import { X, Check, Leaf } from "lucide-react";

const safariCons = [
  "Loud vehicles disturb wildlife",
  "Fixed viewpoints, limited access",
  "Carbon-heavy 4WD safari jeeps",
  "Crowded with many tourists",
  "Animals often run or hide",
  "Same routes, same experience",
];

const kayakPros = [
  "Silent approach — no engine noise",
  "Access secret river corridors",
  "Zero emissions, pure eco-travel",
  "Intimate, small group only",
  "Elephants behave completely naturally",
  "Every trip is unique & unrepeatable",
];

interface UniqueValueSectionProps {
  jungleImg: string;
  elephantImg: string;
}

export function UniqueValueSection({ jungleImg, elephantImg }: UniqueValueSectionProps) {
  return (
    <section
      id="unique-value"
      style={{ backgroundColor: "#1C3D2E", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(126,200,164,0.15)",
              color: "#7EC8A4",
              padding: "6px 18px",
              borderRadius: "50px",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
              border: "1px solid rgba(126,200,164,0.25)",
              marginBottom: "16px",
            }}
          >
            Why Choose Us
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.15,
              marginTop: "8px",
            }}
          >
            Beyond the{" "}
            <span style={{ color: "#7EC8A4", fontStyle: "italic" }}>Ordinary Safari</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.6)",
              fontSize: "17px",
              marginTop: "16px",
              maxWidth: "560px",
              margin: "16px auto 0",
              lineHeight: 1.7,
            }}
          >
            Traditional safaris take you close. Wild Paddle takes you{" "}
            <em style={{ color: "#7EC8A4" }}>into</em> the experience.
          </p>
        </div>

        {/* Comparison Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "64px",
          }}
        >
          {/* Traditional Safari */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "24px",
              padding: "40px 36px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,100,100,0.1)",
                  border: "1px solid rgba(255,100,100,0.2)",
                  borderRadius: "50px",
                  padding: "6px 16px",
                  marginBottom: "16px",
                }}
              >
                <X size={14} color="#FF6B6B" />
                <span style={{ color: "#FF6B6B", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  Traditional Safari
                </span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>
                The Old Way
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {safariCons.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "22px", height: "22px", borderRadius: "50%",
                      background: "rgba(255,100,100,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}
                  >
                    <X size={12} color="#FF6B6B" />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Wild Paddle */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(76,175,130,0.12), rgba(33,150,168,0.12))",
              borderRadius: "24px",
              padding: "40px 36px",
              border: "1px solid rgba(126,200,164,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: "absolute", top: "-50px", right: "-50px",
                width: "200px", height: "200px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(76,175,130,0.2), transparent 70%)",
              }}
            />

            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(76,175,130,0.15)",
                  border: "1px solid rgba(126,200,164,0.4)",
                  borderRadius: "50px",
                  padding: "6px 16px",
                  marginBottom: "16px",
                }}
              >
                <Leaf size={14} color="#7EC8A4" />
                <span style={{ color: "#7EC8A4", fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  Wild Paddle Eco-Tour
                </span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "#fff", fontWeight: 700 }}>
                The Wild Paddle Way
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {kayakPros.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "22px", height: "22px", borderRadius: "50%",
                      background: "rgba(76,175,130,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}
                  >
                    <Check size={12} color="#7EC8A4" />
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "300px",
              backgroundImage: `url(${jungleImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,61,46,0.8) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "18px", fontWeight: 700 }}>Ancient Rainforest</p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "13px", marginTop: "4px" }}>Biodiversity hotspot</p>
            </div>
          </div>
          <div
            style={{
              height: "300px",
              backgroundImage: `url(${elephantImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,61,46,0.8) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "18px", fontWeight: 700 }}>Elephant Encounters</p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "13px", marginTop: "4px" }}>As close as nature allows</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{ marginTop: "80px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="#FAF5EA" />
        </svg>
      </div>
    </section>
  );
}
