import HeroVisual from "./hero-visual";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        background: "#F7F0E1",
        paddingTop: "56px",
        paddingBottom: "120px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* Two-column grid: text 1.05fr | visual 1fr */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* ══════════════════════════════════
              LEFT COLUMN — Text
              ══════════════════════════════════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Eyebrow pill */}
            <div>
              <span className="fs-eyebrow">
                <span className="dot" aria-hidden="true" />
                Diskon hingga 70% sebelum closing
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-display"
              style={{
                fontFamily: "var(--font-display), 'Bricolage Grotesque', system-ui",
                fontSize: "clamp(48px, 6.2vw, 88px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.02,
                color: "#1F2A1B",
                fontVariationSettings: '"opsz" 80',
                margin: 0,
              }}
            >
              Makan enak,
              <br />
              {/* Line 2: swoosh underline on "dompet aman" */}
              <span className="fs-swoosh" style={{ position: "relative", display: "inline-block" }}>
                dompet aman,
              </span>
              <br />
              {/* Line 3: scribble handwriting */}
              <span className="fs-scribble">bumi happy 🌱</span>
            </h1>

            {/* Sub-copy */}
            <p
              style={{
                fontSize: "19px",
                lineHeight: 1.55,
                color: "#3D4A35",
                maxWidth: "540px",
                margin: 0,
                fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
              }}
            >
              Beli sisa stok makanan dari toko & kafe favoritmu sebelum mereka tutup — harga miring, kualitas sama, bumi lebih bahagia.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#download" className="fs-btn fs-btn-primary fs-btn-hero">
                📱 Download Aplikasi
              </a>
              <a href="#download" className="fs-btn fs-btn-saffron fs-btn-hero">
                🍳 Daftar Toko Kamu
              </a>
            </div>

            {/* Trust row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
              }}
            >
              {/* Overlapping emoji avatars */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {["🧑‍🎓", "👩‍💻", "🧑‍🍳", "👨‍💼"].map((emoji, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#D9E5BE",
                      border: "2px solid #F7F0E1",
                      fontSize: "18px",
                      marginLeft: i === 0 ? 0 : "-8px",
                      zIndex: 4 - i,
                      position: "relative",
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: "14px", color: "#3D4A35" }}>
                <strong style={{ color: "#1F2A1B", fontWeight: 700 }}>12.400+ anak muda</strong>{" "}
                udah hemat bareng kami
              </p>
            </div>
          </div>

          {/* ══════════════════════════════════
              RIGHT COLUMN — Visual
              ══════════════════════════════════ */}
          <HeroVisual />
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .hero-grid {
            padding-top: 0;
          }
        }
      `}</style>
    </section>
  );
}
