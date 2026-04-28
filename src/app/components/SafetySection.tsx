import { Shield, AlertCircle, Compass, HeartHandshake, Binoculars, Award, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const C = {
  navy:      "#1B3A6B",
  cyan:      "#00B4D8",
  lightCyan: "#48CAE4",
  red:       "#E63329",
  cream:     "#FAF5EA",
  dark:      "#0D2340",
};

const safetyPoints = [
  { icon: <Shield size={18} />,         number: "01", title: "Coast Guard Certified",    description: "All guides hold national water safety certifications with rigorous annual training.",         stat: "100%",  statLabel: "Certified",      color: C.cyan      },
  { icon: <AlertCircle size={18} />,    number: "02", title: "Life Jackets for All",     description: "Premium life jackets mandatory for every participant — no exceptions, ever.",                 stat: "Always",statLabel: "No Exceptions",  color: C.lightCyan },
  { icon: <Binoculars size={18} />,     number: "03", title: "Safe Wildlife Distance",   description: "Strict 20–30m buffer from elephants per Sri Lanka Wildlife Conservation guidelines.",        stat: "20–30m",statLabel: "Wildlife Buffer", color: C.cyan      },
  { icon: <Compass size={18} />,        number: "04", title: "Pre-Tour Safety Briefing", description: "A thorough 15-minute safety and wildlife ethics orientation before every single tour.",       stat: "15 min",statLabel: "Full Briefing",  color: C.lightCyan },
  { icon: <HeartHandshake size={18} />, number: "05", title: "Emergency Protocols",      description: "Satellite communication, first-aid kits, and evacuation plans always on standby.",           stat: "24/7",  statLabel: "Emergency Ready",color: C.red       },
  { icon: <Award size={18} />,          number: "06", title: "Zero Incident Record",     description: "Perfect safety record across every single tour since we first launched in 2016.",            stat: "0",     statLabel: "Incidents Ever", color: C.cyan      },
];

const stories = [
  { name: "Lisa & Family",         flag: "🇩🇪", loc: "Germany", quote: "Our guide made us feel completely safe. My teenage kids loved every second — total confidence." },
  { name: "Wilderness Collective", flag: "🇺🇸", loc: "USA",     quote: "Best safety briefing we've ever had. Top-notch kayaks, perfect life jackets. Zero worries." },
  { name: "Priya & Raj",           flag: "🇮🇳", loc: "India",   quote: "First-time kayakers — the team was so patient and professional. We felt 100% secure." },
];

const badges = ["DWLC Approved", "ISO 9001:2021", "Eco-Tourism SL", "Sri Lanka Tourism"];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function SafetySection() {
  const { ref: heroRef,  inView: heroIn  } = useInView(0.08);
  const { ref: tlRef,    inView: tlIn    } = useInView(0.06);
  const { ref: trustRef, inView: trustIn } = useInView(0.1);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStory(p => (p + 1) % stories.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;1,9..144,700&family=DM+Sans:wght@300;400;500;600;700&display=swap" />
      <style>{`
        @keyframes orbDrift   { 0%,100%{transform:translate(0,0);} 50%{transform:translate(14px,-20px);} }
        @keyframes shieldBeat { 0%,100%{box-shadow:0 0 0 0 rgba(230,51,41,0.35);} 60%{box-shadow:0 0 0 10px rgba(230,51,41,0);} }
        @keyframes quoteSlide { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
        @keyframes lineGrow   { from{transform:scaleY(0);} to{transform:scaleY(1);} }

        .tl-row:hover .tl-dot { background:${C.cyan} !important; border-color:${C.cyan} !important; transform:scale(1.2); }
        .tl-dot { transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),background 0.2s; }
        .tl-card { transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s; }
        .tl-card:hover { transform:translateX(8px) !important; box-shadow:0 10px 32px rgba(0,0,0,0.1) !important; }
        .sf-badge { transition:background 0.2s,border-color 0.2s,transform 0.25s; }
        .sf-badge:hover { background:rgba(0,180,216,0.12) !important; border-color:rgba(0,180,216,0.38) !important; transform:translateY(-2px); }

        @media(max-width:768px) {
          .sf-hero   { flex-direction:column !important; }
          .sf-hero-l { border-right:none !important; border-bottom:1px solid rgba(255,255,255,0.08) !important; padding:48px 24px 36px !important; width:100% !important; }
          .sf-hero-r { padding:36px 24px 48px !important; width:100% !important; }
          .tl-wrapper { padding:60px 20px 60px 20px !important; }
          .tl-line    { left:19px !important; }
          .trust-bar  { flex-direction:column !important; align-items:flex-start !important; }
          .sf-badges  { flex-wrap:wrap !important; }
        }
      `}</style>

      <section id="safety" style={{ background: C.cream, padding: "100px 0 0", position: "relative", overflow: "hidden" }}>

        {/* Background dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${C.cyan}09 1px, transparent 1px)`, backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "5%", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: `${C.cyan}06`, filter: "blur(90px)", animation: "orbDrift 13s ease-in-out infinite", pointerEvents: "none" }} />

        {/* ══════════════════════════════════════
            ZONE 1 — DARK FULL-WIDTH HERO BAND
            Split: Big headline LEFT | Quote RIGHT
        ══════════════════════════════════════ */}
        <div ref={heroRef} style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.dark})`, position: "relative", overflow: "hidden" }}>
          {/* Internal atmosphere */}
          <div style={{ position: "absolute", top: "-50px", right: "20%", width: "240px", height: "240px", borderRadius: "50%", background: `radial-gradient(circle, ${C.cyan}14, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.cyan}05 1px, transparent 1px), linear-gradient(90deg, ${C.cyan}05 1px, transparent 1px)`, backgroundSize: "44px 44px", pointerEvents: "none" }} />

          <div className="sf-hero" style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "stretch" }}>

            {/* LEFT: Headline + stats */}
            <div
              className="sf-hero-l"
              style={{
                width: "50%", padding: "72px 52px 72px 24px",
                borderRight: "1px solid rgba(255,255,255,0.07)",
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "translateX(0)" : "translateX(-28px)",
                transition: "opacity 0.7s, transform 0.7s",
              }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: `${C.red}14`, border: `1px solid ${C.red}28`, padding: "7px 18px", borderRadius: "50px", marginBottom: "28px" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: `${C.red}18`, display: "flex", alignItems: "center", justifyContent: "center", animation: "shieldBeat 2.2s infinite" }}>
                  <Shield size={12} color={C.red} />
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, color: C.red, letterSpacing: "2.5px", textTransform: "uppercase" }}>Safety First, Always</span>
              </div>

              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 4.5vw, 54px)", fontWeight: 700, color: "#fff", lineHeight: 1.05, marginBottom: "18px" }}>
                Adventure You Can{" "}
                <em style={{ color: C.lightCyan, fontStyle: "italic" }}>Trust</em>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "14.5px", color: "rgba(255,255,255,0.52)", lineHeight: 1.8, maxWidth: "340px", marginBottom: "36px" }}>
                Every detail — from gear to guide to wildlife distance — is engineered with your safety as the only priority.
              </p>

              {/* 3 inline stats */}
              <div style={{ display: "flex", gap: "0" }}>
                {[{ v: "0", l: "Incidents ever" }, { v: "500+", l: "Safe tours" }, { v: "100%", l: "Certified staff" }].map((s, i) => (
                  <div key={i} style={{ paddingRight: "24px", marginRight: "24px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", fontWeight: 700, color: C.lightCyan, lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.32)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "4px" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Rotating testimonial */}
            <div
              className="sf-hero-r"
              style={{
                width: "50%", padding: "72px 24px 72px 52px",
                display: "flex", flexDirection: "column", justifyContent: "center",
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "translateX(0)" : "translateX(28px)",
                transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s",
              }}
            >
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", fontWeight: 700, color: `${C.cyan}70`, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "18px" }}>
                What Travelers Say
              </div>

              <div key={activeStory} style={{ animation: "quoteSlide 0.5s ease both" }}>
                <div style={{ fontSize: "48px", lineHeight: 0.7, color: `${C.cyan}22`, fontFamily: "Georgia, serif", marginBottom: "12px" }}>"</div>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(15px, 1.8vw, 19px)", fontStyle: "italic", color: "rgba(255,255,255,0.88)", lineHeight: 1.58, marginBottom: "22px" }}>
                  {stories[activeStory].quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ fontSize: "26px", lineHeight: 1 }}>{stories[activeStory].flag}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#fff", fontSize: "13px" }}>{stories[activeStory].name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: C.lightCyan }}>{stories[activeStory].loc}</div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: "2px" }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: C.red, fontSize: "12px" }}>★</span>)}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "22px" }}>
                {stories.map((_, i) => (
                  <button key={i} onClick={() => setActiveStory(i)} style={{ width: activeStory === i ? "20px" : "6px", height: "6px", borderRadius: "3px", border: "none", cursor: "pointer", background: activeStory === i ? C.cyan : `${C.cyan}32`, transition: "all 0.35s ease" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            ZONE 2 — VERTICAL NUMBERED TIMELINE
            Left: growing connecting line + dots
            Right: cards with stat bubbles
        ══════════════════════════════════════ */}
        <div ref={tlRef} className="tl-wrapper" style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 72px", position: "relative" }}>

          <div style={{ opacity: tlIn ? 1 : 0, transform: tlIn ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.6s, transform 0.6s", display: "inline-flex", alignItems: "center", gap: "8px", background: `${C.navy}0E`, border: `1px solid ${C.navy}18`, padding: "6px 16px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, color: C.navy, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "44px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.navy, opacity: 0.6 }} />
            6 Safety Standards
          </div>

          {/* Animated vertical line */}
          <div
            className="tl-line"
            style={{
              position: "absolute",
              left: "43px",
              top: "calc(44px + 28px + 28px)",
              bottom: "72px",
              width: "2px",
              background: `linear-gradient(to bottom, ${C.cyan}, ${C.navy}30)`,
              transformOrigin: "top",
              transform: tlIn ? "scaleY(1)" : "scaleY(0)",
              transition: "transform 1.4s ease 0.4s",
            }}
          />

          {safetyPoints.map((pt, i) => (
            <div
              key={i}
              className="tl-row"
              style={{
                display: "flex", gap: "0", alignItems: "flex-start",
                marginBottom: i < safetyPoints.length - 1 ? "28px" : "0",
                opacity: tlIn ? 1 : 0,
                transform: tlIn ? "translateX(0)" : "translateX(-18px)",
                transition: `opacity 0.55s ease ${0.25 + i * 0.08}s, transform 0.55s ease ${0.25 + i * 0.08}s`,
                cursor: "default",
              }}
            >
              {/* Dot */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "20px", flexShrink: 0, paddingTop: "6px" }}>
                <div
                  className="tl-dot"
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: "#fff",
                    border: `2px solid ${pt.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: pt.color,
                    boxShadow: `0 0 0 4px ${pt.color}10`,
                    zIndex: 1,
                  }}
                >
                  {pt.icon}
                </div>
              </div>

              {/* Card */}
              <div
                className="tl-card"
                style={{
                  flex: 1, background: "#fff",
                  borderRadius: "18px", padding: "18px 22px",
                  border: `1px solid rgba(27,58,107,0.08)`,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: "16px",
                  flexWrap: "wrap", position: "relative", overflow: "hidden",
                }}
              >
                {/* Left accent */}
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: `linear-gradient(to bottom, ${pt.color}, ${pt.color}40)` }} />

                <div style={{ flex: 1, minWidth: "180px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, color: pt.color, letterSpacing: "1.5px" }}>{pt.number}</span>
                    <div style={{ height: "1px", width: "18px", background: `${pt.color}38` }} />
                  </div>
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: "17px", fontWeight: 700, color: C.navy, marginBottom: "4px", lineHeight: 1.25 }}>{pt.title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px", fontWeight: 300, color: "#6B7E73", lineHeight: 1.65, margin: 0 }}>{pt.description}</p>
                </div>

                {/* Stat bubble */}
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: "68px", height: "68px", borderRadius: "50%",
                    background: `${pt.color}10`, border: `2px solid ${pt.color}22`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: pt.stat.length > 4 ? "13px" : "17px", fontWeight: 700, color: pt.color, lineHeight: 1, textAlign: "center" }}>{pt.stat}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "7px", color: "#9AADA0", letterSpacing: "0.8px", textTransform: "uppercase", marginTop: "2px", textAlign: "center", lineHeight: 1.3 }}>{pt.statLabel}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════
            ZONE 3 — DARK TRUST BAR
            Authority + certification badges
        ══════════════════════════════════════ */}
        <div
          ref={trustRef}
          style={{
            background: C.navy,
            padding: "32px 24px",
            opacity: trustIn ? 1 : 0,
            transform: trustIn ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          <div
            className="trust-bar"
            style={{
              maxWidth: "1100px", margin: "0 auto",
              display: "flex", alignItems: "center",
              justifyContent: "space-between", gap: "24px", flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: `${C.red}18`, border: `1px solid ${C.red}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Award size={18} color={C.red} />
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.32)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "2px" }}>Officially Licensed</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "17px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Sri Lanka Wildlife Authority</div>
              </div>
            </div>

            <div className="sf-badges" style={{ display: "flex", gap: "10px" }}>
              {badges.map((b, i) => (
                <div
                  key={b}
                  className="sf-badge"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "50px", padding: "8px 16px",
                    display: "flex", alignItems: "center", gap: "7px",
                    cursor: "default",
                    opacity: trustIn ? 1 : 0,
                    transform: trustIn ? "translateX(0)" : "translateX(16px)",
                    transition: `opacity 0.5s ease ${0.2 + i * 0.07}s, transform 0.5s ease ${0.2 + i * 0.07}s`,
                  }}
                >
                  <CheckCircle size={11} color={C.lightCyan} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Animated wave */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
            <path fill={`${C.cyan}0C`} d="M0,40 C360,72 1080,10 1440,52 L1440,70 L0,70 Z">
              <animate attributeName="d" dur="7s" repeatCount="indefinite" values="M0,40 C360,72 1080,10 1440,52 L1440,70 L0,70 Z;M0,52 C360,14 1080,65 1440,30 L1440,70 L0,70 Z;M0,40 C360,72 1080,10 1440,52 L1440,70 L0,70 Z" />
            </path>
            <path fill={C.cream} d="M0,50 C360,10 1080,65 1440,28 L1440,70 L0,70 Z">
              <animate attributeName="d" dur="9s" repeatCount="indefinite" values="M0,50 C360,10 1080,65 1440,28 L1440,70 L0,70 Z;M0,28 C360,62 1080,14 1440,52 L1440,70 L0,70 Z;M0,50 C360,10 1080,65 1440,28 L1440,70 L0,70 Z" />
            </path>
          </svg>
        </div>
      </section>
    </>
  );
}