"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";

interface MovingCarProps {
  startX?: string;
  startY?: string;
  endX?: string;
  endY?: string;
  duration?: number;
  delay?: number;
  size?: number;
}

export function MovingCar({
  startX = "0%",
  startY = "50%",
  endX = "100%",
  endY = "50%",
  duration = 15,
  delay = 0,
  size = 50,
}: MovingCarProps) {
  return (
    <motion.div
      className="absolute pointer-events-none opacity-20 dark:opacity-10 text-primary"
      initial={{
        x: startX,
        y: startY,
        rotate: 0,
      }}
      animate={{
        x: [startX, endX, startX],
        y: [startY, endY, startY],
        rotate: [0, 0, 360],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <Car size={size} />
    </motion.div>
  );
}

