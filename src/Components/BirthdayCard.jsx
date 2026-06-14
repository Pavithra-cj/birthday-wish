import { useState } from "react";
import BirthdayHeading from "./BirthdayHeading";
import WhiteRosesBouquet from "./WhiteRosesBouquet";

export default function BirthdayCard() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <>
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-1.2deg) translateX(-2px); }
          50%       { transform: rotate(1.2deg)  translateX(2px); }
        }
        @keyframes sparkleFloat {
          0%, 100% { opacity: 0.4; transform: scale(0.85) rotate(0deg); }
          50%       { opacity: 1;   transform: scale(1.15) rotate(15deg); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .bouquet-sway   { animation: sway 5s ease-in-out infinite; transform-origin: 50% 90%; }
        .sparkle-anim   { animation: sparkleFloat 2.5s ease-in-out infinite; }
        .card-reveal    { animation: cardReveal 0.7s cubic-bezier(0.34,1.2,0.64,1) both; }
        .card-shimmer::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
          background-size: 800px 100%;
          animation: shimmer 4s linear infinite;
          border-radius: inherit;
          pointer-events: none;
        }
      `}</style>

      {/* ── Full-page bg ── */}
      <div className="min-h-screen flex items-center justify-center bg-[#0d1b2e] px-4 py-10">
        {/* Ambient orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-80px] left-[-80px] w-80 h-80 rounded-full bg-pink-600/10 blur-3xl" />
          <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 rounded-full bg-purple-700/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-pink-500/5 blur-3xl" />
        </div>

        {/* ── Card ── */}
        <div
          className="card-reveal card-shimmer relative w-full max-w-lg rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          style={{
            background:
              "linear-gradient(160deg, #1a2640 0%, #111827 60%, #1c1030 100%)",
          }}
        >
          {/* Top decorative strip */}
          <div
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #f472b6, #a78bfa, #f472b6)",
            }}
          />

          {/* Corner hearts */}
          <span className="absolute top-4 left-5 text-pink-400/40 text-xl select-none">
            ♥
          </span>
          <span className="absolute top-4 right-5 text-pink-400/40 text-xl select-none">
            ♥
          </span>

          {/* Heading */}
          <BirthdayHeading />

          {/* Divider */}
          <div className="mx-auto mt-2 mb-0 w-24 h-px bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />

          {/* Bouquet */}
          <div className="px-4 pt-0 pb-2">
            <WhiteRosesBouquet onReplay={replayKey} />
          </div>

          {/* Bottom message */}
          <div className="px-8 pb-2 text-center">
            <p className="text-white/40 text-xs tracking-widest uppercase">
              wishing you a wonderful day ✨
            </p>
          </div>

          {/* Replay button */}
          <div className="flex justify-center pb-8 pt-1">
            <button
              onClick={() => setReplayKey((k) => k + 1)}
              className="px-6 py-2 rounded-full text-sm font-medium text-pink-300 border border-pink-400/30 bg-pink-500/10 hover:bg-pink-500/20 active:scale-95 transition-all duration-150"
            >
              🌹 Bloom again
            </button>
          </div>
          <div className="flex justify-center pb-8 pt-1 text-sm font-medium text-white border">
            <p>From:- Pavithra ❤️</p>
            <p className="mx-4">|</p>
            <p>To:- Vishmini ❤️</p>
          </div>

          {/* Bottom decorative strip */}
          <div
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #f472b6, #a78bfa, #f472b6)",
            }}
          />
        </div>
      </div>
    </>
  );
}
