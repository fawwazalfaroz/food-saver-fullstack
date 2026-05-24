const FAQS = [
  {
    q: "Makanannya masih layak dimakan, kan?",
    a: "Pasti dong! Semua makanan masih segar dan layak konsumsi — toko cuma jual sisa stok yang gak akan kejual sebelum tutup. Kualitas sama persis, harga aja yang miring.",
  },
  {
    q: "Diskonnya gede gak sih?",
    a: 'Rata-rata diskon 40–70% dari harga normal. Beberapa toko kasih "mystery box" — isi random, harga miring banget, surprise tiap hari.',
  },
  {
    q: "Cara ambil pesanannya gimana?",
    a: "Pesan dari app, dapet kode pickup, mampir ke toko sebelum jam closing. Kalau males keluar rumah, bisa pakai opsi antar lewat kurir mitra (ongkir hemat karena jaraknya deket).",
  },
  {
    q: "Udah ada di kota saya belum?",
    a: "Saat ini Food Saver aktif di Jabodetabek, Bandung, Surabaya, dan Yogyakarta. Kota lain bakal nyusul — kalau mau request kota kamu, kasih tau lewat aplikasi.",
  },
  {
    q: "Saya punya toko, gimana cara gabung?",
    a: "Daftar di halaman mitra (gratis), tim kami review dalam 1×24 jam, langsung bisa upload sisa stok. Gak butuh kasir tambahan — cukup HP & 5 menit per hari.",
  },
  {
    q: "Apakah aplikasinya berbayar?",
    a: "Gratis selamanya buat pembeli. Buat toko mitra juga gratis daftar — kami cuma ambil komisi kecil dari tiap transaksi yang berhasil, jadi gak ada biaya bulanan.",
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      style={{
        background: "#F7F0E1",
        padding: "110px 32px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "0.85fr 1.15fr",
          gap: "72px",
          alignItems: "start",
        }}
        className="faq-grid"
      >
        {/* ══════════════════════════════════
            ASIDE — Sticky on desktop
            ══════════════════════════════════ */}
        <aside
          className="faq-aside"
          style={{
            position: "sticky",
            top: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <span className="fs-eyebrow">
              <span className="dot" aria-hidden="true" />
              Sering ditanya
            </span>
          </div>

          <h2
            style={{
              fontFamily:
                "var(--font-display), 'Bricolage Grotesque', system-ui",
              fontSize: "clamp(36px, 4vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#1F2A1B",
              margin: 0,
              fontVariationSettings: '"opsz" 56',
            }}
          >
            Masih bingung? Santai, kami jawab di sini.
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.55,
              color: "#3D4A35",
              maxWidth: "380px",
              margin: 0,
              fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
            }}
          >
            Pertanyaan paling sering ditanyain pengguna baru. Kalau masih ada
            yang ngeganjel, tinggal chat tim kami langsung dari aplikasi.
          </p>

          {/* Help card */}
          <div
            style={{
              background: "#FFFCF4",
              border: "1.5px solid #1F2A1B",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 4px 0 #1F2A1B",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "12px",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: "48px",
                height: "48px",
                background: "#F2C94C",
                border: "1.5px solid #1F2A1B",
                borderRadius: "14px",
                display: "grid",
                placeItems: "center",
                fontSize: "24px",
                transform: "rotate(-6deg)",
                boxShadow: "2px 2px 0 #1F2A1B",
                flexShrink: 0,
              }}
            >
              💬
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#6E7861",
                  fontWeight: 600,
                  fontFamily:
                    "var(--font-body), 'Plus Jakarta Sans', system-ui",
                  marginBottom: "2px",
                }}
              >
                Gak nemu jawabannya?
              </div>
              <a
                href="#"
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#3F5A28",
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  textUnderlineOffset: "4px",
                  fontFamily:
                    "var(--font-body), 'Plus Jakarta Sans', system-ui",
                }}
              >
                Chat tim Food Saver →
              </a>
            </div>
          </div>
        </aside>

        {/* ══════════════════════════════════
            FAQ LIST — Native <details>
            ══════════════════════════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAQS.map((faq, i) => (
            <details
              key={faq.q}
              open={i === 0}
              className="fs-faq-item"
              style={{
                background: "#FFFCF4",
                border: "1.5px solid #1F2A1B",
                borderRadius: "20px",
                boxShadow: "0 3px 0 #1F2A1B",
                transition: "transform 120ms, box-shadow 120ms, background 150ms",
                overflow: "hidden",
              }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "20px 24px",
                }}
              >
                {/* Numbered circle */}
                <span
                  className="fs-faq-num"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "#F7F0E1",
                    color: "#C76D1F",
                    border: "1.5px solid #1F2A1B",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "15px",
                    fontWeight: 800,
                    fontFamily:
                      "var(--font-display), 'Bricolage Grotesque', system-ui",
                    flexShrink: 0,
                    transition: "background 150ms, color 150ms",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Question */}
                <span
                  style={{
                    flex: 1,
                    fontFamily:
                      "var(--font-display), 'Bricolage Grotesque', system-ui",
                    fontSize: "19px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "#1F2A1B",
                    lineHeight: 1.3,
                  }}
                >
                  {faq.q}
                </span>

                {/* Plus icon circle */}
                <span
                  aria-hidden="true"
                  className="fs-faq-plus"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#F7F0E1",
                    border: "1.5px solid #1F2A1B",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    position: "relative",
                    transition: "background 150ms, transform 200ms",
                  }}
                >
                  {/* Horizontal bar */}
                  <span
                    style={{
                      position: "absolute",
                      width: "12px",
                      height: "2px",
                      background: "#1F2A1B",
                      borderRadius: "1px",
                    }}
                  />
                  {/* Vertical bar */}
                  <span
                    className="fs-faq-plus-v"
                    style={{
                      position: "absolute",
                      width: "2px",
                      height: "12px",
                      background: "#1F2A1B",
                      borderRadius: "1px",
                      transition: "transform 200ms",
                    }}
                  />
                </span>
              </summary>

              <div
                style={{
                  padding: "0 24px 24px 80px",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "#3D4A35",
                  fontFamily:
                    "var(--font-body), 'Plus Jakarta Sans', system-ui",
                }}
              >
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Open state styles + responsive */}
      <style>{`
        .fs-faq-item summary::-webkit-details-marker { display: none; }
        .fs-faq-item summary::marker { display: none; }
        .fs-faq-item[open] {
          background: #D9E5BE !important;
          box-shadow: 0 4px 0 #1F2A1B !important;
        }
        .fs-faq-item[open] .fs-faq-num {
          background: #E88A3C !important;
          color: #FFFCF4 !important;
        }
        .fs-faq-item[open] .fs-faq-plus {
          background: #5C7D3E !important;
          transform: rotate(180deg);
        }
        .fs-faq-item[open] .fs-faq-plus span {
          background: #FFFCF4 !important;
        }
        .fs-faq-item[open] .fs-faq-plus-v {
          transform: scaleY(0);
        }
        .fs-faq-item:hover:not([open]) {
          transform: translateY(-1px);
        }
        @media (max-width: 980px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .faq-aside {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
