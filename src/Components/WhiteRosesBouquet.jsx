import { useEffect, useState } from "react";

/* ─── Rose petal shape ─── */
function RosePetal({
  cx,
  cy,
  angle,
  length = 28,
  width = 14,
  color = "#fff",
  opacity = 1,
}) {
  const rad = (angle * Math.PI) / 180;
  const ex = cx + Math.cos(rad) * length;
  const ey = cy + Math.sin(rad) * length;
  const perpX = -Math.sin(rad) * width;
  const perpY = Math.cos(rad) * width;
  const cp1x = cx + Math.cos(rad) * length * 0.4 + perpX * 0.9;
  const cp1y = cy + Math.sin(rad) * length * 0.4 + perpY * 0.9;
  const cp2x = ex + perpX * 0.6;
  const cp2y = ey + perpY * 0.6;
  const cp3x = ex - perpX * 0.6;
  const cp3y = ey - perpY * 0.6;
  const cp4x = cx + Math.cos(rad) * length * 0.4 - perpX * 0.9;
  const cp4y = cy + Math.sin(rad) * length * 0.4 - perpY * 0.9;
  return (
    <path
      d={`M ${cx} ${cy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey} C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${cx} ${cy}`}
      fill={color}
      opacity={opacity}
      stroke="rgba(200,210,220,0.35)"
      strokeWidth="0.5"
    />
  );
}

/* ─── Single rose ─── */
function Rose({ cx, cy, size = 1, bloomed, delay, stemX, stemY }) {
  const outerLen = 32 * size,
    outerW = 15 * size;
  const midLen = 22 * size,
    midW = 12 * size;
  const innerLen = 14 * size,
    innerW = 9 * size;

  return (
    <g>
      {/* Stem */}
      <line
        x1={stemX}
        y1={stemY}
        x2={cx}
        y2={cy + 38 * size}
        stroke="#8aab7a"
        strokeWidth={4 * size}
        strokeLinecap="round"
        style={{
          strokeDasharray: 260,
          strokeDashoffset: bloomed ? 0 : 260,
          transition: `stroke-dashoffset 0.7s ease ${delay - 300}ms`,
          opacity: bloomed ? 1 : 0,
        }}
      />
      {/* Bloom */}
      <g
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: bloomed
            ? "scale(1) rotate(0deg)"
            : "scale(0) rotate(-20deg)",
          opacity: bloomed ? 1 : 0,
          transition: `transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms, opacity 0.5s ease ${delay}ms`,
        }}
      >
        <ellipse
          cx={cx}
          cy={cy + 4 * size}
          rx={36 * size}
          ry={12 * size}
          fill="rgba(140,160,170,0.18)"
        />
        {Array.from({ length: 8 }).map((_, i) => (
          <RosePetal
            key={`o${i}`}
            cx={cx}
            cy={cy}
            angle={(360 / 8) * i - 90}
            length={outerLen}
            width={outerW}
            color={i % 2 === 0 ? "#f4f8fb" : "#e8f0f5"}
            opacity={0.95}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <RosePetal
            key={`m${i}`}
            cx={cx}
            cy={cy}
            angle={(360 / 6) * i - 60}
            length={midLen}
            width={midW}
            color={i % 2 === 0 ? "#ffffff" : "#edf4f8"}
            opacity={0.97}
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <RosePetal
            key={`n${i}`}
            cx={cx}
            cy={cy}
            angle={(360 / 5) * i - 36}
            length={innerLen}
            width={innerW}
            color="#ffffff"
            opacity={1}
          />
        ))}
        <ellipse
          cx={cx}
          cy={cy}
          rx={8 * size}
          ry={10 * size}
          fill="#f0f6f8"
          stroke="rgba(180,200,210,0.5)"
          strokeWidth="0.5"
        />
        <ellipse
          cx={cx}
          cy={cy - 2 * size}
          rx={5 * size}
          ry={6 * size}
          fill="#fff"
        />
        <path
          d={`M${cx} ${cy - 8 * size} C${cx + 4 * size} ${cy - 4 * size} ${cx + 3 * size} ${cy + 2 * size} ${cx} ${cy + 5 * size}`}
          fill="none"
          stroke="rgba(160,185,200,0.5)"
          strokeWidth={0.8 * size}
          strokeLinecap="round"
        />
        <path
          d={`M${cx} ${cy - 7 * size} C${cx - 3 * size} ${cy - 3 * size} ${cx - 2 * size} ${cy + 2 * size} ${cx} ${cy + 4 * size}`}
          fill="none"
          stroke="rgba(160,185,200,0.5)"
          strokeWidth={0.8 * size}
          strokeLinecap="round"
        />
        <ellipse
          cx={cx}
          cy={cy}
          rx={36 * size}
          ry={34 * size}
          fill="none"
          stroke="rgba(170,195,210,0.2)"
          strokeWidth={2 * size}
        />
      </g>
    </g>
  );
}

/* ─── Leaf ─── */
function Leaf({ x1, y1, x2, y2, flip = false, delay, shown }) {
  const mx = (x1 + x2) / 2 + (flip ? 18 : -18);
  const my = (y1 + y2) / 2 - 10;
  return (
    <g
      style={{
        transformOrigin: `${x1}px ${y1}px`,
        transform: shown ? "scale(1)" : "scale(0)",
        opacity: shown ? 1 : 0,
        transition: `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms, opacity 0.4s ease ${delay}ms`,
      }}
    >
      <path
        d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2} Q${x1 + (flip ? 6 : -6)} ${(y1 + y2) / 2} ${x1} ${y1}`}
        fill="#7aaa6a"
        stroke="#5a8a52"
        strokeWidth="0.8"
        opacity="0.9"
      />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#5a8a52"
        strokeWidth="0.7"
        opacity="0.5"
      />
    </g>
  );
}

/* ─── Baby's breath ─── */
function BabysBreath({ cx, cy, shown, delay }) {
  return (
    <g
      style={{
        opacity: shown ? 1 : 0,
        transition: `opacity 0.5s ease ${delay}ms`,
      }}
    >
      {[-60, -30, 0, 30, 60].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const bx = cx + Math.cos(rad) * 18;
        const by = cy + Math.sin(rad) * 18;
        return (
          <g key={i}>
            <line
              x1={cx}
              y1={cy}
              x2={bx}
              y2={by}
              stroke="#b0c8a0"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle
              cx={bx}
              cy={by}
              r="3.5"
              fill="white"
              stroke="rgba(180,200,185,0.5)"
              strokeWidth="0.5"
            />
            {[
              [-25, 12],
              [25, 12],
            ].map(([sa, sl], j) => {
              const sr = ((angle + sa) * Math.PI) / 180;
              const sx = bx + Math.cos(sr) * sl;
              const sy = by + Math.sin(sr) * sl;
              return (
                <g key={j}>
                  <line
                    x1={bx}
                    y1={by}
                    x2={sx}
                    y2={sy}
                    stroke="#b0c8a0"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                  <circle
                    cx={sx}
                    cy={sy}
                    r="2.5"
                    fill="white"
                    stroke="rgba(180,200,185,0.4)"
                    strokeWidth="0.5"
                  />
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

/* ─── Sparkle ─── */
function Sparkle({ cx, cy, size = 8, delay, shown }) {
  return (
    <g
      style={{
        opacity: shown ? 1 : 0,
        transition: `opacity 0.4s ease ${delay}ms`,
        transformOrigin: `${cx}px ${cy}px`,
      }}
    >
      <line
        x1={cx - size}
        y1={cy}
        x2={cx + size}
        y2={cy}
        stroke="rgba(220,235,245,0.8)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1={cx}
        y1={cy - size}
        x2={cx}
        y2={cy + size}
        stroke="rgba(220,235,245,0.8)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1={cx - size * 0.6}
        y1={cy - size * 0.6}
        x2={cx + size * 0.6}
        y2={cy + size * 0.6}
        stroke="rgba(220,235,245,0.5)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <line
        x1={cx + size * 0.6}
        y1={cy - size * 0.6}
        x2={cx - size * 0.6}
        y2={cy + size * 0.6}
        stroke="rgba(220,235,245,0.5)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={2} fill="rgba(240,248,255,0.9)" />
    </g>
  );
}

const rosesData = [
  { id: 1, cx: 175, cy: 215, size: 0.9, stemX: 168, stemY: 375, delay: 500 },
  { id: 2, cx: 232, cy: 162, size: 1.0, stemX: 210, stemY: 375, delay: 680 },
  { id: 3, cx: 288, cy: 138, size: 1.05, stemX: 248, stemY: 375, delay: 820 },
  { id: 4, cx: 345, cy: 160, size: 1.0, stemX: 295, stemY: 375, delay: 580 },
  { id: 5, cx: 398, cy: 208, size: 0.9, stemX: 348, stemY: 375, delay: 920 },
  { id: 6, cx: 312, cy: 200, size: 0.92, stemX: 278, stemY: 375, delay: 740 },
  { id: 7, cx: 255, cy: 220, size: 0.88, stemX: 232, stemY: 375, delay: 640 },
];

const sparklesData = [
  { cx: 108, cy: 185, s: 9, d: 1200 },
  { cx: 460, cy: 178, s: 8, d: 1350 },
  { cx: 122, cy: 145, s: 6, d: 1500 },
  { cx: 448, cy: 145, s: 7, d: 1250 },
  { cx: 258, cy: 90, s: 7, d: 1400 },
  { cx: 315, cy: 82, s: 6, d: 1300 },
  { cx: 475, cy: 250, s: 5, d: 1450 },
  { cx: 100, cy: 260, s: 5, d: 1350 },
];

export default function WhiteRosesBouquet({ onReplay }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const delays = [100, 300, 1100, 400];
    if (phase < 4) {
      const t = setTimeout(() => setPhase((p) => p + 1), delays[phase]);
      return () => clearTimeout(t);
    }
  }, [phase]);

  /* allow parent's "replay" button to reset */
  useEffect(() => {
    if (onReplay !== undefined) setPhase(0);
  }, [onReplay]);

  const stemGrown = phase >= 1;
  const bloomed = phase >= 2;
  const leavesOn = phase >= 3;
  const sparklesOn = phase >= 4;

  return (
    <div className="relative flex justify-center">
      {/* glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 340,
          height: 280,
          background:
            "radial-gradient(ellipse, rgba(236,72,153,0.08) 0%, transparent 70%)",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: bloomed ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      />

      <svg
        className="bouquet-sway"
        viewBox="0 0 570 490"
        width="460"
        xmlns="http://www.w3.org/2000/svg"
      >
        {rosesData.map((r) => (
          <Rose
            key={r.id}
            cx={r.cx}
            cy={r.cy}
            size={r.size}
            stemX={r.stemX}
            stemY={r.stemY}
            bloomed={stemGrown}
            delay={r.delay}
          />
        ))}

        <Leaf
          x1={210}
          y1={310}
          x2={158}
          y2={265}
          shown={leavesOn}
          delay={200}
        />
        <Leaf
          x1={218}
          y1={330}
          x2={160}
          y2={300}
          shown={leavesOn}
          delay={280}
        />
        <Leaf
          x1={346}
          y1={308}
          x2={400}
          y2={262}
          flip
          shown={leavesOn}
          delay={240}
        />
        <Leaf
          x1={352}
          y1={328}
          x2={402}
          y2={296}
          flip
          shown={leavesOn}
          delay={320}
        />
        <Leaf
          x1={248}
          y1={318}
          x2={200}
          y2={285}
          shown={leavesOn}
          delay={180}
        />
        <Leaf
          x1={318}
          y1={315}
          x2={368}
          y2={282}
          flip
          shown={leavesOn}
          delay={260}
        />

        <BabysBreath cx={130} cy={235} shown={leavesOn} delay={350} />
        <BabysBreath cx={445} cy={228} shown={leavesOn} delay={420} />
        <BabysBreath cx={150} cy={290} shown={leavesOn} delay={300} />
        <BabysBreath cx={430} cy={285} shown={leavesOn} delay={380} />

        {/* Ribbon */}
        <g
          style={{
            opacity: leavesOn ? 1 : 0,
            transition: "opacity 0.5s ease 450ms",
          }}
        >
          <path
            d="M192 368 Q284 350 376 368"
            fill="none"
            stroke="#f9a8d4"
            strokeWidth="18"
            strokeLinecap="round"
            style={{
              strokeDasharray: 300,
              strokeDashoffset: leavesOn ? 0 : 300,
              transition: "stroke-dashoffset 0.9s ease 380ms",
            }}
          />
          <path
            d="M192 368 Q284 350 376 368"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 300,
              strokeDashoffset: leavesOn ? 0 : 300,
              transition: "stroke-dashoffset 0.9s ease 380ms",
            }}
          />
          <path
            d="M284 352 C270 330 248 322 256 335 C264 348 278 345 284 348"
            fill="#f9a8d4"
            stroke="rgba(244,114,182,0.4)"
            strokeWidth="1"
          />
          <path
            d="M284 352 C298 330 320 322 312 335 C304 348 290 345 284 348"
            fill="#f9a8d4"
            stroke="rgba(244,114,182,0.4)"
            strokeWidth="1"
          />
          <ellipse cx="284" cy="350" rx="8" ry="7" fill="#fbcfe8" />
          <path
            d="M279 355 Q274 368 268 378"
            stroke="#f9a8d4"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M289 355 Q294 368 300 378"
            stroke="#f9a8d4"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {sparklesData.map((sp, i) => (
          <Sparkle
            key={i}
            cx={sp.cx}
            cy={sp.cy}
            size={sp.s}
            shown={sparklesOn}
            delay={sp.d}
          />
        ))}
      </svg>
    </div>
  );
}
