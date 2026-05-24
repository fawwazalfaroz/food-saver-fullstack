import PhoneMockup from "./phone-mockup";

export default function DownloadCta() {
  return (
    <section
      id="download"
      style={{
        background: "#F7F0E1",
        padding: "40px 32px 120px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Matcha card */}
        <div
          className="dl-card"
          style={{
            position: "relative",
            background: "#5C7D3E",
            border: "1.5px solid #1F2A1B",
            borderRadius: "36px",
            boxShadow: "6px 6px 0 #1F2A1B",
            padding: "64px",
            overflow: "hidden",
          }}
        >
          {/* Decorative circle 1 — matcha-deep, top-right */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-120px",
              right: "-100px",
              width: "280px",
              height: "280px",
              background: "#3F5A28",
              borderRadius: "50%",
              opacity: 0.7,
              pointerEvents: "none",
            }}
          />

          {/* Decorative circle 2 — saffron, bottom-left-ish */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-90px",
              left: "30%",
              width: "180px",
              height: "180px",
              background: "#E88A3C",
              border: "1.5px solid #1F2A1B",
              borderRadius: "50%",
              opacity: 0.8,
              pointerEvents: "none",
            }}
          />

          {/* Content grid */}
          <div
            className="dl-grid"
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: "48px",
              alignItems: "center",
            }}
          >
            {/* ── LEFT — Copy + buttons ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {/* Eyebrow — recolored: saffron bg */}
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#E88A3C",
                    color: "#1F2A1B",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    border: "1.5px solid #1F2A1B",
                    fontFamily:
                      "var(--font-body), 'Plus Jakarta Sans', system-ui",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#1F2A1B",
                      animation: "fs-pulse 1.6s infinite",
                    }}
                  />
                  Gratis selamanya
                </span>
              </div>

              <h2
                style={{
                  fontFamily:
                    "var(--font-display), 'Bricolage Grotesque', system-ui",
                  fontSize: "clamp(36px, 4.4vw, 56px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  color: "#F7F0E1",
                  margin: 0,
                  fontVariationSettings: '"opsz" 56',
                }}
              >
                Yuk install. Perut & dompet bakal sayang banget.
              </h2>

              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.55,
                  color: "#D9E5BE",
                  maxWidth: "440px",
                  margin: 0,
                  fontFamily:
                    "var(--font-body), 'Plus Jakarta Sans', system-ui",
                }}
              >
                Tersedia di iOS dan Android. Gratis download, gratis daftar,
                gak ada iklan menyebalkan. Cuma diskon makanan terus-terusan.
              </p>

              {/* Store buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "8px",
                }}
              >
                <a
                  href="#"
                  className="dl-store-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "#FFFCF4",
                    color: "#1F2A1B",
                    border: "1.5px solid #1F2A1B",
                    borderRadius: "16px",
                    padding: "12px 20px",
                    boxShadow: "0 4px 0 #1F2A1B",
                    textDecoration: "none",
                    transition: "transform 120ms, box-shadow 120ms",
                    minWidth: "160px",
                  }}
                >
                  <span style={{ fontSize: "28px" }} aria-hidden="true">
                    🍎
                  </span>
                  <span
                    style={{ display: "flex", flexDirection: "column", gap: "2px" }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#6E7861",
                        fontFamily:
                          "var(--font-body), 'Plus Jakarta Sans', system-ui",
                      }}
                    >
                      Unduh di
                    </span>
                    <span
                      style={{
                        fontFamily:
                          "var(--font-display), 'Bricolage Grotesque', system-ui",
                        fontSize: "18px",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      App Store
                    </span>
                  </span>
                </a>

                <a
                  href="#"
                  className="dl-store-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "#FFFCF4",
                    color: "#1F2A1B",
                    border: "1.5px solid #1F2A1B",
                    borderRadius: "16px",
                    padding: "12px 20px",
                    boxShadow: "0 4px 0 #1F2A1B",
                    textDecoration: "none",
                    transition: "transform 120ms, box-shadow 120ms",
                    minWidth: "160px",
                  }}
                >
                  <span style={{ fontSize: "28px" }} aria-hidden="true">
                    ▶️
                  </span>
                  <span
                    style={{ display: "flex", flexDirection: "column", gap: "2px" }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#6E7861",
                        fontFamily:
                          "var(--font-body), 'Plus Jakarta Sans', system-ui",
                      }}
                    >
                      Unduh di
                    </span>
                    <span
                      style={{
                        fontFamily:
                          "var(--font-display), 'Bricolage Grotesque', system-ui",
                        fontSize: "18px",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      Google Play
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* ── RIGHT — Phone mockup ── */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: "24px",
              }}
            >
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dl-store-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 0 #1F2A1B;
        }
        .dl-store-btn:active {
          transform: translateY(2px);
          box-shadow: 0 1px 0 #1F2A1B;
        }
        @media (max-width: 980px) {
          .dl-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
        @media (max-width: 560px) {
          .dl-card {
            padding: 40px 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
