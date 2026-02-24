import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashAnimationProps {
  show: boolean;
  onComplete: () => void;
}

const hexPositions = [
  { x: -60, y: 20, delay: 0, scale: 0.7 },
  { x: -30, y: -15, delay: 0.15, scale: 0.85 },
  { x: 5, y: 25, delay: 0.3, scale: 0.75 },
  { x: 40, y: -10, delay: 0.45, scale: 0.9 },
  { x: -15, y: 10, delay: 0.1, scale: 1 },
  { x: 20, y: -25, delay: 0.25, scale: 0.65 },
  { x: -45, y: -5, delay: 0.2, scale: 0.8 },
];

const HexShape = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M50 5 L93 27.5 L93 72.5 L50 95 L7 72.5 L7 27.5 Z"
      fill="white"
      opacity="0.9"
    />
  </svg>
);

const essenLetters = ["E", "s", "s", "e", "n"];

const SplashAnimation = ({ show, onComplete }: SplashAnimationProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #763df2 0%, #0468bf 30%, #38dcab 65%, #ffd41d 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Background floating hexagons */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`bg-${i}`}
              className="absolute opacity-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.1, 0.05],
                scale: [0, 1.2, 1],
                rotate: [0, 30],
              }}
              transition={{ duration: 2, delay: i * 0.15, ease: "easeOut" }}
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
            >
              <HexShape size={60 + i * 15} />
            </motion.div>
          ))}

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-4">
            {/* Stacking hexagons cluster */}
            <div className="relative w-40 h-32">
              {hexPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{
                    opacity: 0,
                    x: pos.x - 100,
                    y: pos.y + 60,
                    scale: 0,
                    rotate: -45,
                  }}
                  animate={{
                    opacity: [0, 1, 1],
                    x: pos.x,
                    y: pos.y,
                    scale: pos.scale,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: pos.delay,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <HexShape size={40} />
                </motion.div>
              ))}
            </div>

            {/* ESSEN text emerging letter by letter */}
            <div className="flex items-center gap-0">
              {essenLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-5xl font-extrabold tracking-tight"
                  style={{
                    color: "white",
                    textShadow: "0 2px 20px rgba(0,0,0,0.15)",
                  }}
                  initial={{
                    opacity: 0,
                    x: -30,
                    scale: 0.5,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + i * 0.12,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              className="text-sm font-semibold tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,255,255,0.85)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              Wellbeing Corporativo
            </motion.p>

            {/* Bottom line accent */}
            <motion.div
              className="h-0.5 rounded-full bg-white/40 mt-2"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashAnimation;
