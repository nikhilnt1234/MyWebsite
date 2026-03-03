import type { Variants } from "framer-motion";

export const getFadeUp = (reduced: boolean): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0 : 0.6, ease: "easeOut" }
  }
});

export const getStagger = (reduced: boolean): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: reduced ? 0 : 0.12, delayChildren: reduced ? 0 : 0.1 }
  }
});

export const hoverLift = {
  y: -6,
  boxShadow: "0 24px 60px -30px rgba(0,0,0,0.5)"
};
