const QUOTES = [
  {
    parts: [
      "Tiap akhir bulan saldo nipis, tapi laper tetep wajib disolve. Sejak pake Food Saver, gue bisa makan ",
      { em: "enak banget" },
      " cuma 18rb. Game changer sih.",
    ],
    avatar: "🧑‍🎓",
    avatarBg: "#D9E5BE",
    name: "Rafi Hidayat",
    role: "Mahasiswa, Depok",
    cardBg: "#FFFCF4",
    shadowColor: "#5C7D3E",
  },
  {
    parts: [
      "Jam 7 malem pulang kerja, mampir 5 menit, dapet bento lengkap setengah harga. ",
      { em: "Lumayan banget" },
      " buat sebulan lebih hemat 500ribuan.",
    ],
    avatar: "👩‍💻",
    avatarBg: "#F4B97A",
    name: "Nadya Putri",
    role: "Software Engineer, Jakarta",
    cardBg: "#FBF6EA",
    shadowColor: "#E88A3C",
  },
  {
    parts: [
      "Dulu sisa roti tiap malem bingung mau diapain. Sekarang abis terus, malah jadi pelanggan tetap. ",
      { em: "Win-win lah pokoknya." },
    ],
    avatar: "🧑‍🍳",
    avatarBg: "#F2C94C",
    name: "Bu Mira",
    role: "Owner, Roti Bu Mira",
    cardBg: "#FFFCF4",
    shadowColor: "#F2C94C",
  },
];

type Part = string | { em: string };

function QuoteBody({ parts }: { parts: Part[] }) {
  return (
    <blockquote
      style={{
        margin: 0,
        fontSize: "17px",
        lineHeight: 1.65,
        color: "#1F2A1B",
        fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
        flex: 1,
      }}
    >
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <em
            key={i}
            style={{
              fontStyle: "normal",
              fontFamily: "var(--font-scribble), 'Caveat', cursive",
              color: "#C76D1F",
              fontSize: "1.15em",
              fontWeight: 700,
            }}
          >
            {part.em}
          </em>
        )
      )}
    </blockquote>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testi"
      aria-label="Testimoni pengguna"
      style={{
        background: "#3F5A28",
        borderBottom: "1.5px solid #1F2A1B",
        padding: "96px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-pattern overlay — cream tint, very low opacity */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(247,240,225,0.07) 1px, transparent 1.2px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Section head ── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "56px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* Eyebrow — recolored for dark bg */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(247,240,225,0.12)",
              color: "#F7F0E1",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.02em",
              border: "1.5px solid rgba(247,240,225,0.3)",
              fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#E88A3C",
                display: "inline-block",
                animation: "fs-pulse 1.6s infinite",
              }}
            />
            Suara mereka
          </span>

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
              maxWidth: "680px",
            }}
          >
            Anak kos & pekerja kantoran udah pada coba
          </h2>

          <p
            style={{
              fontSize: "17px",
              color: "#A9C078",
              maxWidth: "480px",
              margin: 0,
              fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
            }}
          >
            Ribuan orang udah buktiin sendiri. Ini cerita mereka.
          </p>
        </div>

        {/* ── Quote cards ── */}
        <div
          className="testi-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {QUOTES.map((q, i) => {
            const isMiddle = i === 1;
            return (
              <div
                key={q.name}
                className="testi-card"
                style={{
                  background: q.cardBg,
                  border: "1.5px solid #1F2A1B",
                  borderRadius: "28px",
                  padding: "28px",
                  transform: isMiddle ? "translateY(14px)" : "none",
                  boxShadow: `0 4px 4px ${q.shadowColor}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Opening quote mark */}
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily:
                      "var(--font-display), 'Bricolage Grotesque', system-ui",
                    fontSize: "64px",
                    fontWeight: 800,
                    color: "#5C7D3E",
                    lineHeight: 0.8,
                    userSelect: "none",
                  }}
                >
                  "
                </div>

                {/* Quote body */}
                <QuoteBody parts={q.parts} />

                {/* Author row */}
                <div
                  style={{
                    borderTop: "1.5px dashed rgba(31,42,27,0.2)",
                    paddingTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  {/* Avatar */}
                  <div
                    aria-hidden="true"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: q.avatarBg,
                      border: "1.5px solid #1F2A1B",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "22px",
                      flexShrink: 0,
                    }}
                  >
                    {q.avatar}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#1F2A1B",
                        fontFamily:
                          "var(--font-body), 'Plus Jakarta Sans', system-ui",
                        lineHeight: 1.2,
                      }}
                    >
                      {q.name}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#6E7861",
                        fontFamily:
                          "var(--font-body), 'Plus Jakarta Sans', system-ui",
                        marginTop: "2px",
                      }}
                    >
                      {q.role}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 980px) {
          .testi-grid {
            grid-template-columns: 1fr !important;
          }
          .testi-card {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
