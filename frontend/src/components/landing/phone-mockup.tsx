const PHONE_ITEMS = [
  { icon: "🍱", iconBg: "#F4B97A", name: "Bento Set", meta: "Tutup 21:00 • 320m", price: "Rp 18rb" },
  { icon: "🥐", iconBg: "#F2C94C", name: "Croissant Mix", meta: "Tutup 20:30 • 180m", price: "Rp 12rb" },
  { icon: "🍰", iconBg: "#D9E5BE", name: "Slice Cake Box", meta: "Tutup 22:00 • 450m", price: "Rp 25rb" },
];

export default function PhoneMockup() {
  return (
    <div
      style={{
        position: "relative",
        width: "280px",
        height: "540px",
        margin: "0 auto",
      }}
    >
      {/* Phone body */}
      <div
        style={{
          width: "280px",
          height: "540px",
          background: "#FFFCF4",
          border: "1.5px solid #1F2A1B",
          borderRadius: "38px",
          boxShadow: "8px 8px 0 #1F2A1B",
          transform: "rotate(-6deg)",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Notch */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "20px",
            background: "#1F2A1B",
            borderRadius: "12px",
          }}
        />

        {/* Inner screen */}
        <div
          style={{
            background: "#F7F0E1",
            borderRadius: "26px",
            padding: "32px 16px 16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "12px",
          }}
        >
          {/* Greeting */}
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#6E7861",
              fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
            }}
          >
            Sore, Rafi 👋
          </div>

          {/* Heading */}
          <div
            style={{
              fontFamily:
                "var(--font-display), 'Bricolage Grotesque', system-ui",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#1F2A1B",
              lineHeight: 1.2,
              marginBottom: "4px",
            }}
          >
            Diskon di sekitar kamu
          </div>

          {/* Search pill */}
          <div
            style={{
              background: "#FFFCF4",
              border: "1.5px solid #1F2A1B",
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "11px",
              color: "#6E7861",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
            }}
          >
            <span aria-hidden="true">🔍</span>
            <span>Cari makanan, toko...</span>
          </div>

          {/* Item cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "4px",
            }}
          >
            {PHONE_ITEMS.map((item) => (
              <div
                key={item.name}
                style={{
                  background: "#FFFCF4",
                  border: "1.5px solid #1F2A1B",
                  borderRadius: "14px",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: item.iconBg,
                    border: "1.5px solid #1F2A1B",
                    borderRadius: "10px",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#1F2A1B",
                      fontFamily:
                        "var(--font-body), 'Plus Jakarta Sans', system-ui",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#6E7861",
                      fontFamily:
                        "var(--font-body), 'Plus Jakarta Sans', system-ui",
                      marginTop: "1px",
                    }}
                  >
                    {item.meta}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-display), 'Bricolage Grotesque', system-ui",
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#5C7D3E",
                    letterSpacing: "-0.02em",
                    flexShrink: 0,
                  }}
                >
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating bubble badges around the phone ── */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-30px",
          background: "#E88A3C",
          color: "#FFFCF4",
          border: "1.5px solid #1F2A1B",
          borderRadius: "14px",
          padding: "8px 12px",
          fontSize: "12px",
          fontWeight: 700,
          transform: "rotate(6deg)",
          boxShadow: "0 3px 0 #1F2A1B",
          fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
          whiteSpace: "nowrap",
        }}
      >
        🎉 Hemat Rp 31rb!
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "12%",
          right: "-40px",
          background: "#F2C94C",
          color: "#1F2A1B",
          border: "1.5px solid #1F2A1B",
          borderRadius: "14px",
          padding: "8px 12px",
          fontSize: "12px",
          fontWeight: 700,
          transform: "rotate(-4deg)",
          boxShadow: "0 3px 0 #1F2A1B",
          fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
          whiteSpace: "nowrap",
        }}
      >
        📍 12 toko di dekat kamu
      </div>

      <div
        style={{
          position: "absolute",
          top: "44%",
          left: "-50px",
          background: "#FFFCF4",
          color: "#1F2A1B",
          border: "1.5px solid #1F2A1B",
          borderRadius: "14px",
          padding: "8px 12px",
          fontSize: "12px",
          fontWeight: 700,
          transform: "rotate(-8deg)",
          boxShadow: "0 3px 0 #1F2A1B",
          fontFamily: "var(--font-body), 'Plus Jakarta Sans', system-ui",
          whiteSpace: "nowrap",
        }}
      >
        ⭐ 4.9 di App Store
      </div>
    </div>
  );
}
