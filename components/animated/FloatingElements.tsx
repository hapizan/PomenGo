"use client";

import { motion } from "framer-motion";
import { Car, Wrench, Settings, Zap, Shield } from "lucide-react";

const floatingElements = [
  { icon: Car, delay: 0, duration: 20, x: "0%", y: "0%", xOffset: 50, yOffset: 30, size: 40 },
  { icon: Wrench, delay: 2, duration: 25, x: "10%", y: "20%", xOffset: -40, yOffset: 50, size: 35 },
  { icon: Settings, delay: 4, duration: 18, x: "80%", y: "10%", xOffset: -60, yOffset: 40, size: 30 },
  { icon: Zap, delay: 1, duration: 22, x: "20%", y: "60%", xOffset: 60, yOffset: -30, size: 32 },
  { icon: Shield, delay: 3, duration: 24, x: "70%", y: "50%", xOffset: -50, yOffset: 50, size: 38 },
  { icon: Car, delay: 5, duration: 19, x: "50%", y: "30%", xOffset: 40, yOffset: -40, size: 36 },
  { icon: Wrench, delay: 1.5, duration: 21, x: "90%", y: "70%", xOffset: -70, yOffset: -20, size: 33 },
  { icon: Settings, delay: 3.5, duration: 23, x: "30%", y: "80%", xOffset: 50, yOffset: -50, size: 31 },
];

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className="absolute opacity-10 dark:opacity-5 text-primary"
            initial={{
              x: element.x,
              y: element.y,
            }}
            animate={{
              x: [
                element.x,
                `calc(${element.x} + ${element.xOffset}px)`,
                `calc(${element.x} + ${element.xOffset / 2}px)`,
                element.x,
              ],
              y: [
                element.y,
                `calc(${element.y} + ${element.yOffset}px)`,
                `calc(${element.y} + ${element.yOffset / 2}px)`,
                element.y,
              ],
              rotate: [0, 360],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={element.size} />
          </motion.div>
        );
      })}
    </div>
  );
}

