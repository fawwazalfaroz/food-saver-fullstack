import BentoSvg from "./bento-svg";

export default function HeroVisual() {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: "1 / 1.05", minHeight: "560px" }}
    >
      {/* ── Background saffron disc ── */}
      <div
        className="absolute"
        style={{
          width: "86%",
          aspectRatio: "1 / 1",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#E88A3C",
          borderRadius: "50%",
          border: "1.5px solid #1F2A1B",
        }}
      >
        {/* Inner dashed ring */}
        <div
          style={{
            position: "absolute",
            inset: "4%",
            borderRadius: "50%",
            border: "1.5px dashed rgba(31,42,27,0.35)",
          }}
        />
      </div>

      {/* ── Bento SVG ── */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "96%",
          filter: "drop-shadow(0 28px 28px rgba(31,42,27,0.32))",
        }}
      >
        <BentoSvg />
      </div>

      {/* ── Floating accent: coffee ── */}
      <div
        className="fs-float absolute select-none"
        style={{
          top: "4%",
          right: "2%",
          fontSize: "90px",
          lineHeight: 1,
          transform: "rotate(-10deg)",
          filter: "drop-shadow(2px 4px 6px rgba(31,42,27,0.25))",
        }}
        aria-hidden="true"
      >
        ☕
      </div>

      {/* ── Floating accent: croissant (hidden below 560px) ── */}
      <div
        className="fs-float absolute select-none hidden sm2:block"
        style={{
          bottom: "6%",
          left: "-2%",
          fontSize: "84px",
          lineHeight: 1,
          transform: "rotate(14deg)",
          animationDelay: "0.8s",
          filter: "drop-shadow(2px 4px 6px rgba(31,42,27,0.25))",
        }}
        aria-hidden="true"
      >
        🥐
      </div>

      {/* ── Sticker 1: price badge (top-left) ── */}
      <div
        className="absolute fs-shadow-sticker"
        style={{
          top: "8%",
          left: "-4%",
          background: "#5C7D3E",
          color: "#F7F0E1",
          border: "1.5px solid #1F2A1B",
          borderRadius: "18px",
          padding: "10px 14px",
          transform: "rotate(-8deg)",
          minWidth: "96px",
        }}
      >
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", opacity: 0.8 }}>
          🏷️ BENTO SET
        </div>
        <div
          style={{
            fontFamily: "var(--font-display), 'Bricolage Grotesque', system-ui",
            fontSize: "22px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Rp 18rb
        </div>
      </div>

      {/* ── Sticker 2: closing time (bottom-right) ── */}
      <div
        className="absolute fs-shadow-sticker"
        style={{
          bottom: "10%",
          right: "-2%",
          background: "#FFFCF4",
          color: "#1F2A1B",
          border: "1.5px solid #1F2A1B",
          borderRadius: "18px",
          padding: "10px 14px",
          transform: "rotate(6deg)",
          minWidth: "108px",
        }}
      >
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", opacity: 0.7 }}>
          ⏰ CLOSING IN
        </div>
        <div
          style={{
            fontFamily: "var(--font-display), 'Bricolage Grotesque', system-ui",
            fontSize: "22px",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#C76D1F",
          }}
        >
          1j 24m
        </div>
      </div>

      {/* ── Squiggle: matcha top-left ── */}
      <svg
        className="absolute"
        style={{ top: "18%", left: "2%", opacity: 0.6 }}
        width="40"
        height="24"
        viewBox="0 0 40 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 12 Q8 2 14 12 Q20 22 26 12 Q32 2 38 12"
          stroke="#5C7D3E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* ── Squiggle: ink bottom-right ── */}
      <svg
        className="absolute"
        style={{ bottom: "22%", right: "4%", opacity: 0.4 }}
        width="36"
        height="22"
        viewBox="0 0 36 22"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 11 Q7 2 12 11 Q17 20 22 11 Q27 2 34 11"
          stroke="#1F2A1B"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* ── Dot circle: butter right edge ── */}
      <svg
        className="absolute"
        style={{ top: "42%", right: "-1%", opacity: 0.55 }}
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="14" cy="14" r="12" stroke="#F2C94C" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="14" cy="14" r="4" fill="#F2C94C" />
      </svg>
    </div>
  );
}
