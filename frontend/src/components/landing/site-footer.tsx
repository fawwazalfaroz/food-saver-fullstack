import Image from "next/image";

const COLUMNS = [
  {
    heading: "Pembeli",
    links: ["Cara pakai", "Daftar toko", "Promo minggu ini", "Aplikasi mobile"],
  },
  {
    heading: "Mitra Toko",
    links: ["Daftar jadi mitra", "Dashboard toko", "Tarif & biaya", "Panduan mitra"],
  },
  {
    heading: "Lainnya",
    links: ["Tentang kami", "Karir di FS", "Kontak & bantuan", "Privasi & syarat"],
  },
];

const SOCIALS = [
  { label: "Instagram", emoji: "📷" },
  { label: "TikTok", emoji: "🎵" },
  { label: "Twitter", emoji: "🐦" },
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "#1F2A1B",
        color: "#F7F0E1",
        padding: "72px 32px 28px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* ── Main grid ── */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Col 1: Brand + tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="fs-brand-mark" aria-hidden="true">
                <Image src="/FoodSaver_Green.png" alt="Food Saver" width={24} height={24} className="object-contain" style={{ filter: 'hue-rotate(85deg) saturate(0.8) brightness(0.9)' }} />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display), 'Bricolage Grotesque', system-ui",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#F7F0E1",
                  letterSpacing: "-0.02em",
                }}
              >
                Food Saver
              </span>
            </div>

            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.6,
                color: "#F7F0E1",
                opacity: 0.8,
                maxWidth: "320px",
                margin: 0,
                fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
              }}
            >
              Setiap suapan makanan yang gak terbuang itu kemenangan kecil — buat
              dompet kamu, buat toko, buat bumi.
            </p>
          </div>

          {/* Cols 2–4: Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <h4
                style={{
                  fontFamily: "var(--font-display), 'Bricolage Grotesque', system-ui",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#E88A3C",
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {col.heading}
              </h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: "14px",
                        color: "#F7F0E1",
                        opacity: 0.85,
                        textDecoration: "none",
                        fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
                        transition: "color 150ms, opacity 150ms",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.color = "#E88A3C";
                        (e.target as HTMLElement).style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.color = "#F7F0E1";
                        (e.target as HTMLElement).style.opacity = "0.85";
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: "1.5px dashed rgba(247,240,225,0.2)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#F7F0E1",
              opacity: 0.6,
              margin: 0,
              fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
            }}
          >
            © 2026 Food Saver. Dibikin dengan ❤️ di Jakarta.
          </p>

          {/* Social pills */}
          <div style={{ display: "flex", gap: "8px" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#3F5A28",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "background 150ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#E88A3C";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#3F5A28";
                }}
              >
                <span aria-hidden="true">{s.emoji}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 980px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
