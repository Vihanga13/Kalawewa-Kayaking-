import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";

// Brand Colors
const COLORS = {
  navy: "#1B3A6B",
  cyan: "#00B4D8",
  lightCyan: "#48CAE4",
  red: "#E63329",
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDecided, setHasDecided] = useState(false);

  // Check if user has already made a choice
  useEffect(() => {
    const cookieConsent = localStorage.getItem("wildpaddle_cookie_consent");
    if (cookieConsent) {
      setHasDecided(true);
    } else {
      // Show banner after 1 second delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("wildpaddle_cookie_consent", "accepted");
    localStorage.setItem("wildpaddle_cookie_consent_date", new Date().toISOString());
    setIsVisible(false);
    setHasDecided(true);
    
    // Initialize analytics or other tracking scripts here
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem("wildpaddle_cookie_consent", "rejected");
    localStorage.setItem("wildpaddle_cookie_consent_date", new Date().toISOString());
    setIsVisible(false);
    setHasDecided(true);
    
    // Disable analytics
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || hasDecided) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(100px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        .cookie-banner {
          animation: slideUp 0.5s ease-out;
        }
        .cookie-button {
          transition: all 0.3s ease;
        }
        .cookie-button:hover {
          transform: translateY(-2px);
        }
        .cookie-button-accept:hover {
          box-shadow: 0 8px 20px rgba(230, 51, 41, 0.3);
        }
        .cookie-button-reject:hover {
          background-color: rgba(27, 58, 107, 0.08);
        }
        @media (max-width: 640px) {
          .cookie-container {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .cookie-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .cookie-button {
            width: 100% !important;
          }
        }
      `}</style>

      {/* Overlay backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(4px)",
          zIndex: 999,
        }}
        onClick={handleDismiss}
      />

      {/* Cookie Banner */}
      <div
        className="cookie-banner"
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          zIndex: 1000,
          background: `linear-gradient(135deg, #fff 0%, #FAF5EA 100%)`,
          borderTop: `1px solid ${COLORS.cyan}20`,
          boxShadow: "0 -4px 30px rgba(0,0,0,0.1)",
        }}
      >
        <div
          className="cookie-container"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "1.5rem",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Content */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <Cookie size={24} color={COLORS.cyan} style={{ marginTop: "0.25rem", flexShrink: 0 }} />
              <div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: COLORS.navy,
                    marginBottom: "0.5rem",
                  }}
                >
                  We use cookies to enhance your experience
                </h3>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.85rem",
                    color: "#6B7E73",
                    lineHeight: 1.6,
                    marginBottom: "0.75rem",
                  }}
                >
                  We use cookies and similar technologies to understand how you use our website, improve your browsing experience, and enable analytics. By clicking "Accept", you consent to the use of cookies. You can adjust your preferences anytime by visiting our{" "}
                  <a
                    href="#privacy"
                    style={{
                      color: COLORS.cyan,
                      textDecoration: "none",
                      fontWeight: 600,
                      borderBottom: `1px solid ${COLORS.cyan}40`,
                    }}
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                {/* Cookie details */}
                <details
                  style={{
                    fontSize: "0.8rem",
                    color: "#8AA493",
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  <summary style={{ fontWeight: 500, userSelect: "none" }}>
                    Learn more about our cookies
                  </summary>
                  <ul
                    style={{
                      marginTop: "0.5rem",
                      paddingLeft: "1.5rem",
                      lineHeight: 1.8,
                    }}
                  >
                    <li>
                      <strong>Essential Cookies:</strong> Required for the website to function properly
                    </li>
                    <li>
                      <strong>Analytics Cookies:</strong> Help us understand user behavior and improve the site
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> Allow us to show you relevant content on other platforms
                    </li>
                  </ul>
                </details>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className="cookie-buttons"
            style={{
              display: "flex",
              gap: "0.75rem",
              flexShrink: 0,
              alignItems: "center",
            }}
          >
            <button
              onClick={handleReject}
              className="cookie-button cookie-button-reject"
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.navy}20`,
                color: COLORS.navy,
                padding: "0.65rem 1.5rem",
                borderRadius: "3rem",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                minWidth: "100px",
                transition: "all 0.3s ease",
              }}
            >
              Reject
            </button>

            <button
              onClick={handleAccept}
              className="cookie-button cookie-button-accept"
              style={{
                background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.red}CC)`,
                color: "#fff",
                border: "none",
                padding: "0.65rem 1.5rem",
                borderRadius: "3rem",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                minWidth: "100px",
                transition: "all 0.3s ease",
                boxShadow: `0 4px 12px ${COLORS.red}25`,
              }}
            >
              Accept
            </button>

            <button
              onClick={handleDismiss}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#8AA493",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.navy)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8AA493")}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
