import { FC, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  words: string[];
}

export const RotatingText: FC<RotatingTextProps> = ({ words }) => {
  const [index, setIndex] = useState(0);
  const list = useMemo(
    () => (words.length > 0 ? words : ["Code"]),
    [words]
  );

  const longestWord = useMemo(
    () => list.reduce((a, b) => (a.length > b.length ? a : b)),
    [list]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % list.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [list.length]);

  return (
    <>
      {/* Mobile: inline flow, no fixed width reservation */}
      <span className="sm:hidden text-gradient font-bold font-display" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={list[index]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            {list[index]}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Desktop: stable width via grid spacer */}
      <span className="hidden sm:inline-grid align-baseline" aria-hidden="true">
        <span className="invisible col-start-1 row-start-1 font-bold font-display whitespace-nowrap">
          {longestWord}
        </span>
        <span className="col-start-1 row-start-1 relative overflow-hidden h-[1.12em]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={list[index]}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-end text-gradient font-bold font-display whitespace-nowrap"
            >
              {list[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </>
  );
};

export default RotatingText;
