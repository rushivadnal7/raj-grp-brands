import { AnimatePresence, useInView, motion } from "framer-motion";
import React from "react";

export function GradualSpacing({ text = "Gradual Spacing" }: { text: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const shouldBreak = text === "MOTORCYCLE & SCOOTER OIL";
  const words = shouldBreak ? ["MOTORCYCLE &", "SCOOTER OIL"] : [text];

  return (
    <div
      key={text}
      ref={ref}
      className={`flex ${
        shouldBreak
          ? "flex-col space-y-2 items-center"
          : "flex-row space-x-1 justify-center"
      } z-[200]`}
    >
      <AnimatePresence>
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className="flex space-x-1 justify-center">
            {word.split("").map((char, i) => (
              <motion.p
                key={`${wordIndex}-${i}`}
                initial={{ opacity: 0, x: -18 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: wordIndex * 0.5 + i * 0.07,
                }}
                className="tracking-tighter text-xl sm:text-4xl font-bold md:text-6xl md:leading-[4rem]"
              >
                {char === " " ? "\u00A0" : char}
              </motion.p>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
