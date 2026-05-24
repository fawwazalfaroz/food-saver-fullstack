const STATS = [
  { number: "12.400+", label: "Pengguna aktif tiap minggu" },
  { number: "320",     label: "Toko & resto mitra" },
  { number: "28 ton",  label: "Makanan diselamatkan" },
  { number: "Rp 1,2M", label: "Total hemat pengguna" },
];

export default function StatsStrip() {
  return (
    <section
      id="stats"
      aria-label="Statistik Food Saver"
      style={{
        background: "#E88A3C",
        borderBottom: "1.5px solid #1F2A1B",
      }}
    >
      {/* Stats grid — 4 cells on desktop, 2×2 on mobile */}
      <div
        className="stats-grid"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: "36px 24px",
              textAlign: "center",
              borderRight:
                i < STATS.length - 1
                  ? "1.5px dashed rgba(31,42,27,0.25)"
                  : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {/* Stat number */}
            <span
              style={{
                fontFamily:
                  "var(--font-display), 'Bricolage Grotesque', system-ui",
                fontSize: "clamp(40px, 4.2vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "#1F2A1B",
                fontVariationSettings: '"opsz" 56',
              }}
            >
              {stat.number}
            </span>

            {/* Label */}
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1F2A1B",
                opacity: 0.75,
                fontFamily:
                  "var(--font-body), 'Plus Jakarta Sans', system-ui",
                maxWidth: "160px",
                lineHeight: 1.35,
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Responsive: 2 columns on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          /* Re-apply dividers for 2-col layout */
          .stats-grid > *:nth-child(2) {
            border-right: none !important;
          }
          .stats-grid > *:nth-child(3) {
            border-top: 1.5px dashed rgba(31,42,27,0.25);
            border-right: 1.5px dashed rgba(31,42,27,0.25) !important;
          }
          .stats-grid > *:nth-child(4) {
            border-top: 1.5px dashed rgba(31,42,27,0.25);
          }
        }
      `}</style>
    </section>
  );
}
