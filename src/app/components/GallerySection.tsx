import { Play } from "lucide-react";

interface GallerySectionProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
    span?: "wide" | "tall" | "normal";
  }[];
  videoThumb: string;
}

export function GallerySection({ images, videoThumb }: GallerySectionProps) {
  return (
    <section
      id="gallery"
      style={{ backgroundColor: "#1C3D2E", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
            Gallery
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
            Through the{" "}
            <span style={{ color: "#7EC8A4", fontStyle: "italic" }}>Lens</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "17px", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0", lineHeight: 1.7 }}>
            Every frame tells a story. These moments are real — no zoom, no staging.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto",
            gap: "16px",
          }}
        >
          {/* Large featured image */}
          <div
            style={{
              gridColumn: "1 / 3",
              gridRow: "1 / 3",
              borderRadius: "20px",
              overflow: "hidden",
              height: "400px",
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector(".gallery-img") as HTMLElement;
              if (img) img.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector(".gallery-img") as HTMLElement;
              if (img) img.style.transform = "scale(1)";
            }}
          >
            <img
              className="gallery-img"
              src={images[0]?.src}
              alt={images[0]?.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,61,46,0.6) 0%, transparent 50%)" }} />
            {images[0]?.caption && (
              <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "16px", fontWeight: 600 }}>{images[0].caption}</p>
              </div>
            )}
          </div>

          {/* Top right */}
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              height: "192px",
              position: "relative",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector(".gallery-img") as HTMLElement;
              if (img) img.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector(".gallery-img") as HTMLElement;
              if (img) img.style.transform = "scale(1)";
            }}
          >
            <img
              className="gallery-img"
              src={images[1]?.src}
              alt={images[1]?.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
            />
          </div>

          {/* Video thumbnail */}
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              height: "192px",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <img
              src={videoThumb}
              alt="Watch our video"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(28,61,46,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  width: "56px", height: "56px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                <Play size={22} fill="#1C3D2E" color="#1C3D2E" style={{ marginLeft: "3px" }} />
              </div>
            </div>
            <div style={{ position: "absolute", bottom: "12px", left: "12px" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", color: "#fff", fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", background: "rgba(0,0,0,0.4)", padding: "4px 10px", borderRadius: "50px" }}>
                Watch Film
              </span>
            </div>
          </div>

          {/* Bottom row */}
          {images.slice(2, 5).map((img, i) => (
            <div
              key={i}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                height: "200px",
                position: "relative",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const imgEl = e.currentTarget.querySelector(".gallery-img") as HTMLElement;
                if (imgEl) imgEl.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                const imgEl = e.currentTarget.querySelector(".gallery-img") as HTMLElement;
                if (imgEl) imgEl.style.transform = "scale(1)";
              }}
            >
              <img
                className="gallery-img"
                src={img.src}
                alt={img.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,61,46,0.5) 0%, transparent 60%)" }} />
              {img.caption && (
                <div style={{ position: "absolute", bottom: "14px", left: "14px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: "#fff", fontSize: "13px", fontWeight: 500 }}>{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: single column note */}
        <p style={{ textAlign: "center", fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "24px", letterSpacing: "0.5px" }}>
          All photos captured during real Wild Paddle tours
        </p>
      </div>

      {/* Wave */}
      <div style={{ marginTop: "80px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,20 C360,80 1080,0 1440,50 L1440,80 L0,80 Z" fill="#FAF5EA" />
        </svg>
      </div>
    </section>
  );
}
