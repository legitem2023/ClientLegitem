// components/TransitionWrapper.tsx

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const TransitionWrapper = ({ children }) => {
  const pathname = usePathname();
//   const [isExiting, setIsExiting] = useState(false);

//   useEffect(() => {
//     // Trigger exit animation when pathname changes
//     setIsExiting(true);

//     const timeout = setTimeout(() => {
//       setIsExiting(false);
//     }, 3000); // Match this with the duration of your animation

//     return () => clearTimeout(timeout);
//   }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // Use pathname as key to trigger animation
        initial={{ opacity: 0, y: 20 }} // Start off slightly below
        animate={{ opacity: 1, y: 0 }} // Animate to original position
        exit={{ opacity: 0, y: -20 }} // Slide up out
        transition={{ duration: 0.3 }} // Animation duration
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionWrapper;
