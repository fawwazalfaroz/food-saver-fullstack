export default function BentoSvg() {
  return (
    <svg
      viewBox="0 0 480 504"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: "96%", transform: "rotate(-4deg)" }}
    >
      {/* ── Outer box (dark wood) ── */}
      <rect x="8" y="8" width="464" height="488" rx="28" fill="#3A2A1E" />
      {/* Shadow strip */}
      <rect x="8" y="460" width="464" height="36" rx="0" fill="#1F140C" opacity="0.6" />
      <rect x="8" y="460" width="464" height="36" rx="0" ry="0" fill="#1F140C" opacity="0.4" />
      {/* Bottom rounded corners for shadow strip */}
      <rect x="8" y="468" width="464" height="28" rx="0" fill="#1F140C" opacity="0.3" />

      {/* ── Outer box border ── */}
      <rect x="8" y="8" width="464" height="488" rx="28" stroke="#1F2A1B" strokeWidth="3" fill="none" />

      {/* ── Inner divider lines ── */}
      {/* Vertical divider */}
      <line x1="296" y1="24" x2="296" y2="480" stroke="#1F140C" strokeWidth="3" />
      {/* Horizontal divider (right column) */}
      <line x1="296" y1="252" x2="472" y2="252" stroke="#1F140C" strokeWidth="3" />

      {/* ══════════════════════════════════
          LEFT COMPARTMENT — Rice + toppings
          ══════════════════════════════════ */}
      <rect x="20" y="20" width="264" height="468" rx="18" fill="#F7F0E1" />

      {/* Rice grain pattern */}
      {[
        [50,60],[80,45],[110,70],[140,50],[170,65],[200,48],[230,62],[260,55],
        [50,90],[85,105],[115,88],[145,100],[175,85],[205,98],[235,90],[260,80],
        [55,130],[90,145],[120,128],[150,140],[180,125],[210,138],[240,130],
        [50,170],[80,155],[110,168],[140,152],[170,165],[200,158],[230,170],
        [55,210],[85,195],[115,208],[145,192],[175,205],[205,198],[235,210],
        [50,250],[80,235],[110,248],[140,232],[170,245],[200,238],[230,250],
      ].map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="5" ry="3" fill="#E8DCC8" transform={`rotate(${(i * 37) % 180} ${cx} ${cy})`} />
      ))}

      {/* Nori strip */}
      <rect x="20" y="290" width="264" height="32" rx="0" fill="#2D3A1E" opacity="0.85" />
      <rect x="20" y="290" width="264" height="32" rx="0" fill="#1A2410" opacity="0.3" />

      {/* Salmon fillet */}
      <ellipse cx="152" cy="370" rx="88" ry="44" fill="#E8845A" />
      <ellipse cx="152" cy="370" rx="88" ry="44" fill="url(#salmonGrad)" />
      {/* Salmon lines */}
      <path d="M80 358 Q152 348 224 358" stroke="#C96840" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M75 370 Q152 360 229 370" stroke="#C96840" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M80 382 Q152 372 224 382" stroke="#C96840" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* Shiso leaf */}
      <ellipse cx="68" cy="420" rx="28" ry="20" fill="#5C7D3E" transform="rotate(-20 68 420)" />
      <path d="M68 400 Q72 420 68 440" stroke="#3F5A28" strokeWidth="1.5" fill="none" />
      <path d="M68 408 Q80 415 72 425" stroke="#3F5A28" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M68 408 Q56 415 64 425" stroke="#3F5A28" strokeWidth="1" fill="none" opacity="0.7" />

      {/* Umeboshi (pickled plum) */}
      <circle cx="230" cy="430" r="22" fill="#D8553B" />
      <circle cx="230" cy="430" r="22" fill="url(#umeboshiGrad)" />
      <circle cx="230" cy="430" r="10" fill="#B83E26" opacity="0.5" />

      {/* Sesame seeds */}
      {[
        [100,440],[130,450],[160,445],[190,455],[220,448],
        [110,460],[145,465],[175,458],[205,462],
      ].map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="3" ry="2" fill="#C8A870" transform={`rotate(${i * 40} ${cx} ${cy})`} />
      ))}

      {/* ══════════════════════════════════
          TOP-RIGHT COMPARTMENT — Tamago
          ══════════════════════════════════ */}
      <rect x="308" y="20" width="152" height="220" rx="18" fill="#F2C94C" />

      {/* Tamago slices */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={322}
            y={36 + i * 62}
            width={124}
            height={52}
            rx={10}
            fill={i === 0 ? "#F2C94C" : i === 1 ? "#EDB93C" : "#E8A82C"}
          />
          {/* Swirl line */}
          <path
            d={`M ${340} ${62 + i * 62} Q ${384} ${50 + i * 62} ${428} ${62 + i * 62}`}
            stroke="#C8901A"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        </g>
      ))}

      {/* ══════════════════════════════════
          BOTTOM-RIGHT COMPARTMENT — Edamame
          ══════════════════════════════════ */}
      <rect x="308" y="264" width="152" height="224" rx="18" fill="#A9C078" />

      {/* Edamame pods */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${316 + i * 4}, ${280 + i * 62})`}>
          {/* Pod body */}
          <ellipse cx="68" cy="28" rx="52" ry="22" fill="#7BA050" />
          <ellipse cx="68" cy="28" rx="52" ry="22" fill="#5C7D3E" opacity="0.3" />
          {/* Pea bumps */}
          <circle cx="36" cy="28" r="12" fill="#6E9048" />
          <circle cx="68" cy="26" r="13" fill="#6E9048" />
          <circle cx="100" cy="28" r="12" fill="#6E9048" />
          {/* Pea spots */}
          <circle cx="36" cy="28" r="5" fill="#5C7D3E" opacity="0.5" />
          <circle cx="68" cy="26" r="5.5" fill="#5C7D3E" opacity="0.5" />
          <circle cx="100" cy="28" r="5" fill="#5C7D3E" opacity="0.5" />
        </g>
      ))}

      {/* ══════════════════════════════════
          CHOPSTICKS (top-right, rotated)
          ══════════════════════════════════ */}
      <g transform="translate(340, 8) rotate(28)">
        <rect x="0" y="0" width="10" height="120" rx="5" fill="#C8A870" />
        <rect x="0" y="100" width="10" height="20" rx="3" fill="#8B6840" />
        <rect x="18" y="0" width="10" height="120" rx="5" fill="#C8A870" />
        <rect x="18" y="100" width="10" height="20" rx="3" fill="#8B6840" />
      </g>

      {/* ══════════════════════════════════
          STEAM CURLS (top)
          ══════════════════════════════════ */}
      <path d="M100 14 Q96 4 100 -4 Q104 -12 100 -20" stroke="#C8A870" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M152 10 Q148 0 152 -8 Q156 -16 152 -24" stroke="#C8A870" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M204 14 Q200 4 204 -4 Q208 -12 204 -20" stroke="#C8A870" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* ── Gradient defs ── */}
      <defs>
        <radialGradient id="salmonGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#F0A080" />
          <stop offset="100%" stopColor="#D06848" />
        </radialGradient>
        <radialGradient id="umeboshiGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#E87060" />
          <stop offset="100%" stopColor="#B83E26" />
        </radialGradient>
      </defs>
    </svg>
  );
}
