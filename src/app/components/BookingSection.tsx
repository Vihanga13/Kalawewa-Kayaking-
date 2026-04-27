import { useState } from "react";
import { Calendar, Users, Mail, Phone, CheckCircle } from "lucide-react";

export function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    date: "",
    people: "2",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: "0.5px",
    marginBottom: "8px",
  };

  return (
    <section
      id="booking"
      style={{
        background: "linear-gradient(135deg, #0F2318 0%, #1C3D2E 50%, #163B3A 100%)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(76,175,130,0.1), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(33,150,168,0.1), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
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
            Reserve Your Spot
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
            Book Your{" "}
            <span style={{ color: "#7EC8A4", fontStyle: "italic" }}>Wild Adventure</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.6)",
              fontSize: "17px",
              marginTop: "12px",
              lineHeight: 1.7,
            }}
          >
            Limited to 8 guests per trip. Spots fill up fast — secure yours today.
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              background: "rgba(76,175,130,0.1)",
              border: "1px solid rgba(126,200,164,0.3)",
              borderRadius: "24px",
              padding: "64px",
              textAlign: "center",
            }}
          >
            <CheckCircle size={56} color="#7EC8A4" style={{ marginBottom: "20px" }} />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#fff", fontWeight: 700, marginBottom: "12px" }}>
              You're Almost There!
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "16px", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto 28px" }}>
              We've received your booking request. Our team will reach out within 24 hours to confirm your spot and share the adventure details.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: "50px",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Book Another Trip
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "28px",
              padding: "48px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {/* Date */}
              <div>
                <label style={labelStyle}>
                  <Calendar size={12} style={{ display: "inline", marginRight: "6px" }} />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(126,200,164,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />
              </div>

              {/* People */}
              <div>
                <label style={labelStyle}>
                  <Users size={12} style={{ display: "inline", marginRight: "6px" }} />
                  Number of Guests
                </label>
                <select
                  name="people"
                  value={form.people}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(126,200,164,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n} style={{ background: "#1C3D2E" }}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(126,200,164,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>
                  <Mail size={12} style={{ display: "inline", marginRight: "6px" }} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(126,200,164,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />
              </div>

              {/* Phone */}
              <div>
                <label style={labelStyle}>
                  <Phone size={12} style={{ display: "inline", marginRight: "6px" }} />
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 234 567 8900"
                  value={form.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(126,200,164,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                />
              </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom: "28px" }}>
              <label style={labelStyle}>Special Requests or Notes</label>
              <textarea
                name="notes"
                rows={4}
                placeholder="Any dietary needs, accessibility requirements, or questions..."
                value={form.notes}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "100px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(126,200,164,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
              />
            </div>

            {/* Price estimate */}
            <div
              style={{
                background: "rgba(76,175,130,0.08)",
                border: "1px solid rgba(126,200,164,0.2)",
                borderRadius: "14px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "28px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Estimated Total</p>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#7EC8A4", fontSize: "26px", fontWeight: 700, marginTop: "2px" }}>
                  ${parseInt(form.people) * 89} USD
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
                  {form.people} guest{parseInt(form.people) > 1 ? "s" : ""} × $89 per person
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "11px", marginTop: "2px" }}>
                  Final price confirmed upon booking
                </p>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #4CAF82 0%, #2196A8 100%)",
                color: "#fff",
                border: "none",
                padding: "18px",
                borderRadius: "50px",
                fontSize: "17px",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.5px",
                boxShadow: "0 8px 30px rgba(76,175,130,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 14px 40px rgba(76,175,130,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(76,175,130,0.35)";
              }}
            >
              Request My Booking →
            </button>

            <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "13px", textAlign: "center", marginTop: "16px", lineHeight: 1.6 }}>
              No payment required now. Our team will contact you within 24 hours to confirm.
            </p>
          </form>
        )}
      </div>

      {/* Wave */}
      <div style={{ marginTop: "80px", lineHeight: 0, marginLeft: "-24px", marginRight: "-24px" }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
          <path d="M0,50 C480,10 960,70 1440,25 L1440,80 L0,80 Z" fill="#FAF5EA" />
        </svg>
      </div>
    </section>
  );
}
