import { useState, useRef, useEffect } from "react";
import { Plus, Minus, Compass, Mail, Phone, Waves, ArrowUpRight } from "lucide-react";

const COLORS = {
  navy: "#1B3A6B",
  navyDeep: "#0F2244",
  navyMid: "#142D56",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
  cream: "#FAF5EA",
  creamDim: "#F0EBD8",
};

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Experience",
    question: "Do I need paddling experience to join?",
    answer:
      "Not at all. Wild Paddle is designed for all abilities — from first-timers to seasoned kayakers. Our certified guides give a full 20-minute briefing on shore before launch, covering paddle technique, steering, and safety protocols. Single and tandem kayaks are available; most guests feel completely comfortable within minutes on the water.",
  },
  {
    category: "Wildlife",
    question: "How close will we actually get to the elephants?",
    answer:
      "Distances vary with the elephants' behaviour — we always let them lead. On a typical morning you'll paddle within 20–50 metres of wild herds, sometimes closer when elephants approach us out of curiosity. Because kayaks are silent and low in the water, animals treat us as part of the river rather than a threat. No two safaris are ever the same.",
  },
  {
    category: "Safety",
    question: "What safety measures are in place on the water?",
    answer:
      "Every guest wears a Coast Guard-approved PFD and receives a full safety briefing. Each tour is led by two certified guides — one at the front of the group, one at the rear. We maintain a strict 300-metre exclusion zone from hippos and crocodile habitats, and our routes are continuously updated based on daily wildlife surveys. In 12,000 adventures we have had zero safety incidents.",
  },
  {
    category: "Logistics",
    question: "What should I bring and what will be provided?",
    answer:
      "We provide kayaks, paddles, PFDs, dry bags, and bottled water. Bring: lightweight clothing you don't mind getting wet, closed-toe shoes or water sandals, sunscreen (reef-safe, please), a hat, sunglasses, and your camera. We recommend insect repellent for early-morning departures. Most guests find light layers ideal — mornings on the river are cool and magical.",
  },
  {
    category: "Bookings",
    question: "Can I book a private tour, and what's the group size?",
    answer:
      "Yes. Sunrise group tours run with a maximum of 8 guests to preserve the wildlife experience. Private tours for 2–12 people can be arranged any day of the week, including custom departure times and bespoke routes. Private bookings include a dedicated guide, a post-paddle breakfast, and complimentary underwater camera hire.",
  },
  {
    category: "Logistics",
    question: "What is your cancellation and weather policy?",
    answer:
      "We offer full refunds for cancellations made 48 hours or more before departure. Within 48 hours, we issue a transferable credit valid for 12 months. If we cancel a tour due to unsafe weather or river conditions, you receive a full refund — no questions asked. Sri Lanka's dry season (May–September) offers the most consistent conditions, though we operate year-round.",
  },
  {
    category: "Conservation",
    question: "How does Wild Paddle support elephant conservation?",
    answer:
      "15% of every booking goes directly to our in-house conservation fund, which has supported anti-poaching patrols, human-elephant conflict mitigation, and community education since 2018. Our guides are all trained naturalists who contribute daily sighting data to the National Wildlife Research Database. When you paddle with us, you're actively part of the solution.",
  },
  {
    category: "Experience",
    question: "Is this experience suitable for children and elderly guests?",
    answer:
      "Absolutely. We welcome guests from age 6 upward, and our oldest paddler was 81. Children under 12 share a tandem kayak with an adult. Our route is flat-water with no rapids, currents, or demanding conditions. For guests with limited mobility, we can accommodate most needs — just let us know at booking and our team will ensure everything is arranged.",
  },
];

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      style={{
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost number */}
      <span
        style={{
          position: "absolute",
          right: "1rem",
          top: "50%",
          transform: isOpen ? "translateY(-70%) scale(1.15)" : "translateY(-50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(4rem, 8vw, 7rem)",
          fontWeight: 700,
          color: isOpen ? `${COLORS.cyan}10` : "rgba(255,255,255,0.03)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          transition: "all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)",
          zIndex: 0,
        }}
      >
        {num}
      </span>

      {/* Question button */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "1.5rem 5rem 1.5rem 1.75rem",
          textAlign: "left",
          display: "flex",
          alignItems: "flex-start",
          gap: "1.25rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "2px",
            color: isOpen ? COLORS.cyan : "rgba(255,255,255,0.3)",
            paddingTop: "0.35rem",
            flexShrink: 0,
            transition: "color 0.3s ease",
          }}
        >
          {num}
        </span>

        {/* Question + category */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "inline-block",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: isOpen ? COLORS.lightCyan : "rgba(255,255,255,0.25)",
              marginBottom: "0.4rem",
              transition: "color 0.3s ease",
            }}
          >
            {item.category}
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
              fontWeight: 600,
              color: isOpen ? "#ffffff" : "rgba(255,255,255,0.75)",
              lineHeight: 1.3,
              margin: 0,
              transition: "color 0.3s ease",
            }}
          >
            {item.question}
          </p>
        </div>

        {/* Toggle icon */}
        <div
          style={{
            width: "1.75rem",
            height: "1.75rem",
            borderRadius: "50%",
            border: `1px solid ${isOpen ? COLORS.cyan : "rgba(255,255,255,0.15)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "0.15rem",
            background: isOpen ? `${COLORS.cyan}15` : "transparent",
            transition: "all 0.3s ease",
          }}
        >
          {isOpen ? (
            <Minus size={12} color={COLORS.cyan} />
          ) : (
            <Plus size={12} color="rgba(255,255,255,0.4)" />
          )}
        </div>
      </button>

      {/* Answer */}
      <div
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          ref={answerRef}
          style={{
            padding: "0 1.75rem 1.75rem calc(1.75rem + 1.25rem + 1.25rem)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Cyan left bar */}
          <div
            style={{
              position: "absolute",
              left: "calc(1.75rem + 1.25rem + 0.55rem)",
              top: 0,
              bottom: "1.75rem",
              width: "2px",
              background: `linear-gradient(to bottom, ${COLORS.cyan}, transparent)`,
              borderRadius: "2px",
            }}
          />
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.62)",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
      />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes driftX {
          0%,100% { transform: translateX(0); }
          50%      { transform: translateX(6px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .faq-contact-btn {
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .faq-contact-btn:hover {
          background: rgba(0,180,216,0.12) !important;
          border-color: rgba(0,180,216,0.5) !important;
        }
        .faq-item-row {
          transition: background 0.25s ease;
        }
        .faq-item-row:hover {
          background: rgba(255,255,255,0.018);
        }
        @media (max-width: 900px) {
          .faq-layout { flex-direction: column !important; }
          .faq-sidebar { width: 100% !important; position: relative !important; top: auto !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; padding: 2.5rem 1.5rem !important; }
          .faq-main { padding: 0 !important; }
        }
      `}</style>

      <section
        style={{
          background: COLORS.navyDeep,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Nautical grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,180,216,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,180,216,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        {/* Radial glow — top left */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `${COLORS.cyan}07`,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        {/* Radial glow — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `${COLORS.navy}`,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* ── Main layout ── */}
        <div
          className="faq-layout"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-start",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* ── LEFT SIDEBAR ── */}
          <aside
            className="faq-sidebar"
            style={{
              width: "320px",
              flexShrink: 0,
              padding: "5rem 2.5rem 5rem 2rem",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              position: "sticky",
              top: 0,
              alignSelf: "flex-start",
            }}
          >
            {/* Rotating compass icon */}
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                marginBottom: "1.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: `1px solid ${COLORS.cyan}30`,
                  borderRadius: "50%",
                  animation: "spin 18s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Compass size={16} color={COLORS.cyan} />
              </div>
            </div>

            {/* Label */}
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: COLORS.cyan,
                marginBottom: "0.75rem",
              }}
            >
              Before You Paddle
            </p>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              Every{" "}
              <span style={{ color: COLORS.lightCyan, fontStyle: "italic" }}>
                question
              </span>
              ,<br /> answered.
            </h2>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                marginBottom: "2.5rem",
              }}
            >
              Still curious? Our team is on the water six days a week and always
              happy to help you plan the perfect adventure.
            </p>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: `linear-gradient(to right, ${COLORS.cyan}40, transparent)`,
                marginBottom: "2rem",
              }}
            />

            {/* Contact options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href="mailto:hello@wildpaddle.lk"
                className="faq-contact-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "0.75rem",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: `${COLORS.cyan}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={13} color={COLORS.cyan} />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.65rem",
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: "0.1rem",
                    }}
                  >
                    Email us
                  </p>
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 500,
                    }}
                  >
                    hello@wildpaddle.lk
                  </p>
                </div>
              </a>

              <a
                href="tel:+94771234567"
                className="faq-contact-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "0.75rem",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: `${COLORS.cyan}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={13} color={COLORS.cyan} />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.65rem",
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: "0.1rem",
                    }}
                  >
                    Call / WhatsApp
                  </p>
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 500,
                    }}
                  >
                    +94 77 123 4567
                  </p>
                </div>
              </a>
            </div>

            {/* Book CTA */}
            <a
              href="#book"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "1.5rem",
                padding: "0.9rem",
                background: COLORS.red,
                borderRadius: "0.75rem",
                textDecoration: "none",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.5px",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              Book Your Safari
              <ArrowUpRight size={14} />
            </a>

            {/* Bottom wave deco */}
            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Waves size={12} color={`${COLORS.cyan}50`} style={{ animation: "driftX 3s ease-in-out infinite" }} />
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "1px",
                }}
              >
                SINCE 2018 · SRI LANKA
              </span>
            </div>
          </aside>

          {/* ── RIGHT: FAQ LIST ── */}
          <div
            className="faq-main"
            style={{
              flex: 1,
              padding: "5rem 2.5rem 5rem 0",
            }}
          >
            {/* Count strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0 1.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                {faqs.length} questions
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
            </div>

            {/* Accordion items */}
            <div>
              {faqs.map((item, i) => (
                <div key={i} className="faq-item-row">
                  <AccordionItem
                    item={item}
                    index={i}
                    isOpen={openIndex === i}
                    onToggle={() => toggle(i)}
                  />
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div
              style={{
                padding: "2rem 1.75rem 0",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: COLORS.cyan,
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.25)",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                All tours operate under the Sri Lanka Wildlife Conservation
                Department permit #WCT-2024-0047 and are fully insured.
              </p>
            </div>
          </div>
        </div>

        {/* Top wave separator (from cream above) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            lineHeight: 0,
            transform: "scaleY(-1)",
          }}
        >
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "40px" }}
          >
            <path
              fill={COLORS.cream}
              d="M0,20 C360,55 1080,0 1440,35 L1440,0 L0,0 Z"
            />
          </svg>
        </div>
      </section>
    </>
  );
}