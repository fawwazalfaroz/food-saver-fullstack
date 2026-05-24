"use client";
import { useState } from "react";

type Tab = "buyer" | "store";

const STEPS = {
  buyer: [
    {
      icon: "📍",
      iconBg: "#D9E5BE",
      title: "Buka app, cek sekitar",
      body: "Lihat toko mana aja yang lagi diskon makanan sisa di radius jalan kaki. Update real-time, tiap menit.",
      tag: "⏱ < 1 menit",
    },
    {
      icon: "🛒",
      iconBg: "#F4B97A",
      title: "Pilih, pesan, bayar",
      body: "Ketuk makanan yang menggoda. Bayar lewat e-wallet favoritmu. Gak ribet, gak antri.",
      tag: "💸 Hemat 50–70%",
    },
    {
      icon: "🛵",
      iconBg: "#F2C94C",
      title: "Ambil sebelum tutup",
      body: "Mampir ke tokonya pakai kode pickup. Atau pilih antar, tinggal terima di depan rumah. Done!",
      tag: "🎉 Yumm.",
    },
  ],
  store: [
    {
      icon: "📝",
      iconBg: "#D9E5BE",
      title: "Daftar toko (gratis)",
      body: "Isi data toko & menu yang sering bersisa. Approved dalam 1×24 jam, langsung bisa jualan.",
      tag: "🆓 Tanpa biaya bulanan",
    },
    {
      icon: "📦",
      iconBg: "#F4B97A",
      title: "Upload sisa stok",
      body: "Tinggal foto + harga diskon. Bisa lewat aplikasi mitra dari HP, gak butuh laptop atau staff khusus.",
      tag: "⚡ 2 menit jadi",
    },
    {
      icon: "💰",
      iconBg: "#F2C94C",
      title: "Terima pesanan & cuan",
      body: "Pelanggan datang ambil sebelum closing. Dana masuk H+1 ke rekening kamu. Tanpa biaya tersembunyi.",
      tag: "📈 Naikkan revenue 18%",
    },
  ],
};

export default function HowItWorks() {
  const [tab, setTab] = useState<Tab>("buyer");
  const steps = STEPS[tab];

  return (
    <section
      id="how"
      style={{
        background: "#EFE6D1",
        borderTop: "1.5px solid #1F2A1B",
        borderBottom: "1.5px solid #1F2A1B",
        padding: "96px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-pattern overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(31,42,27,0.06) 1px, transparent 1.2px)",
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
            marginBottom: "52px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span className="fs-eyebrow">
            <span className="dot" aria-hidden="true" />
            Gampang banget
          </span>

          <h2
            style={{
              fontFamily: "var(--font-display), 'Bricolage Grotesque', system-ui",
              fontSize: "clamp(36px, 4.4vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#1F2A1B",
              margin: 0,
              fontVariationSettings: '"opsz" 56',
            }}
          >
            Cuma 3 langkah, perut{" "}
            <span
              className="fs-scribble"
              style={{ fontSize: "0.9em", paddingBottom: "8px" }}
            >
              kenyang.
            </span>
          </h2>

          <p
            style={{
              fontSize: "17px",
              color: "#3D4A35",
              maxWidth: "480px",
              margin: 0,
              fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
            }}
          >
            Dari buka app sampai makan, prosesnya lebih cepat dari antri di kasir.
          </p>
        </div>

        {/* ── Tab segmented control ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              background: "#FFFCF4",
              border: "1.5px solid #1F2A1B",
              borderRadius: "999px",
              padding: "5px",
              boxShadow: "0 3px 0 #1F2A1B",
              gap: "4px",
            }}
          >
            {(
              [
                { key: "buyer", label: "🍽️ Buat Pembeli" },
                { key: "store", label: "🏪 Buat Toko" },
              ] as { key: Tab; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
                  transition: "background 150ms, color 150ms",
                  background: tab === key ? "#5C7D3E" : "transparent",
                  color: tab === key ? "#F7F0E1" : "#1F2A1B",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Step cards ── */}
        <div
          className="how-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {steps.map((step, i) => {
            const isMiddle = i === 1;
            return (
              <div
                key={step.title}
                className="how-card"
                style={{
                  background: "#FFFCF4",
                  border: "1.5px solid #1F2A1B",
                  borderRadius: "28px",
                  padding: "28px",
                  transform: isMiddle ? "translateY(16px)" : "none",
                  transition: "transform 150ms ease, box-shadow 150ms ease",
                  boxShadow: "0 1px 0 rgba(0,0,0,.04), 0 18px 32px -20px rgba(31,42,27,.18)",
                  cursor: "default",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = isMiddle
                    ? "translateY(12px)"
                    : "translateY(-4px)";
                  el.style.boxShadow =
                    "0 1px 0 rgba(0,0,0,.06), 0 24px 40px -18px rgba(31,42,27,.28)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = isMiddle ? "translateY(16px)" : "none";
                  el.style.boxShadow =
                    "0 1px 0 rgba(0,0,0,.04), 0 18px 32px -20px rgba(31,42,27,.18)";
                }}
              >
                {/* Step number watermark */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "24px",
                    fontFamily:
                      "var(--font-display), 'Bricolage Grotesque', system-ui",
                    fontSize: "48px",
                    fontWeight: 800,
                    color: "#EFE6D1",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    userSelect: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icon box */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    background: step.iconBg,
                    border: "1.5px solid #1F2A1B",
                    borderRadius: "18px",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "30px",
                    transform: "rotate(-4deg)",
                    boxShadow: "2px 2px 0 #1F2A1B",
                    marginBottom: "20px",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {step.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily:
                      "var(--font-display), 'Bricolage Grotesque', system-ui",
                    fontSize: "24px",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#1F2A1B",
                    margin: "0 0 10px",
                    lineHeight: 1.15,
                  }}
                >
                  {step.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: "#3D4A35",
                    margin: "0 0 20px",
                    fontFamily:
                      "var(--font-body), 'Plus Jakarta Sans', system-ui",
                  }}
                >
                  {step.body}
                </p>

                {/* Tag pill */}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: "#D9E5BE",
                    color: "#3F5A28",
                    border: "1.5px solid #3F5A28",
                    borderRadius: "999px",
                    padding: "5px 12px",
                    fontSize: "13px",
                    fontWeight: 700,
                    fontFamily:
                      "var(--font-body), 'Plus Jakarta Sans', system-ui",
                  }}
                >
                  {step.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 980px) {
          .how-cards {
            grid-template-columns: 1fr !important;
          }
          .how-card {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
