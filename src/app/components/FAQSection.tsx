import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need kayaking experience?",
    a: "Not at all! Wild Paddle is designed for complete beginners and seasoned paddlers alike. Our guides provide a full briefing and technique tutorial before every departure. If you can sit and hold a paddle, you're ready.",
  },
  {
    q: "Is it safe to be near wild elephants in a kayak?",
    a: "Safety is our top priority. We maintain a strict 20–30 meter distance from wildlife at all times, guided by Sri Lanka's Department of Wildlife Conservation protocols. Elephants are observed at their natural gathering spots where they're accustomed to the river environment. No incidents have occurred in our 500+ tours.",
  },
  {
    q: "What should I wear and bring?",
    a: "Light, quick-dry clothing in neutral colours (avoid bright colours near wildlife). Sunscreen, insect repellent, a hat, and a waterproof bag for your camera. We provide all safety equipment. Leave your valuables at the hotel.",
  },
  {
    q: "What if the elephants don't appear?",
    a: "We operate during peak elephant-gathering seasons (June–October) when sightings are virtually guaranteed near water sources. However, wildlife is wild — on the rare occasion of no sighting, we offer a complimentary rebooking or partial refund.",
  },
  {
    q: "What time do tours depart?",
    a: "We offer early morning departures (6:00 AM) and late afternoon (3:30 PM). Morning tours catch mist on the water and golden light; afternoon tours often see larger elephant herds as they come to drink before sunset.",
  },
  {
    q: "How far in advance should I book?",
    a: "We strongly recommend booking at least 2–4 weeks in advance, especially June–October when demand is highest. Group bookings of 5+ people should book 4–6 weeks ahead.",
  },
  {
    q: "Is this suitable for children?",
    a: "Children aged 8 and above are welcome. All minors must be accompanied by an adult and wear a life jacket. We recommend the experience for adventurous families who want a unique wildlife encounter.",
  },
  {
    q: "Do you offer private tours?",
    a: "Yes! Private tours for couples, families, or groups of up to 8 are available at a premium. These can be customised for special occasions like proposals, anniversaries, or corporate team experiences.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{ backgroundColor: "#FAF5EA", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
            FAQs
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
            Got{" "}
            <span style={{ color: "#2D6A4F", fontStyle: "italic" }}>Questions?</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#6B8B79", fontSize: "17px", marginTop: "12px", lineHeight: 1.7 }}>
            We've answered everything you might want to know before you paddle.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: isOpen
                    ? "0 8px 32px rgba(28,61,46,0.12)"
                    : "0 2px 12px rgba(28,61,46,0.06)",
                  border: isOpen
                    ? "1px solid rgba(76,175,130,0.25)"
                    : "1px solid rgba(28,61,46,0.07)",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "22px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: isOpen ? "#2D6A4F" : "#1C3D2E",
                      lineHeight: 1.4,
                      transition: "color 0.2s",
                    }}
                  >
                    {faq.q}
                  </span>
                  <div
                    style={{
                      width: "32px", height: "32px", flexShrink: 0,
                      borderRadius: "50%",
                      background: isOpen ? "rgba(76,175,130,0.12)" : "rgba(28,61,46,0.06)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: isOpen ? "#2D6A4F" : "#7A9485",
                      transition: "all 0.3s",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 28px 24px",
                    }}
                  >
                    <div
                      style={{
                        height: "1px",
                        background: "rgba(76,175,130,0.15)",
                        marginBottom: "20px",
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        color: "#5A7264",
                        lineHeight: 1.75,
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div
          style={{
            textAlign: "center",
            marginTop: "48px",
            padding: "40px",
            background: "#fff",
            borderRadius: "20px",
            border: "1px solid rgba(76,175,130,0.15)",
          }}
        >
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1C3D2E", marginBottom: "8px" }}>
            Still have questions?
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#6B8B79", fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>
            Our team is available via WhatsApp and email 7 days a week.
          </p>
          <a
            href="mailto:hello@wildpaddle.lk"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #4CAF82, #2196A8)",
              color: "#fff",
              textDecoration: "none",
              padding: "14px 32px",
              borderRadius: "50px",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 6px 20px rgba(76,175,130,0.3)",
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
