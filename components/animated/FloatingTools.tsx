"use client";

import { motion } from "framer-motion";
import { Wrench, Settings, Cog } from "lucide-react";

const tools = [
  { icon: Wrench, delay: 0, duration: 8, x: "5%", y: "15%", xOffset: 40, yOffset: 30, size: 28 },
  { icon: Settings, delay: 1, duration: 10, x: "85%", y: "25%", xOffset: -50, yOffset: 40, size: 32 },
  { icon: Cog, delay: 2, duration: 9, x: "15%", y: "75%", xOffset: 35, yOffset: -45, size: 30 },
  { icon: Wrench, delay: 1.5, duration: 11, x: "75%", y: "65%", xOffset: -40, yOffset: -35, size: 26 },
  { icon: Settings, delay: 0.5, duration: 8.5, x: "45%", y: "35%", xOffset: 45, yOffset: 50, size: 29 },
  { icon: Cog, delay: 2.5, duration: 9.5, x: "55%", y: "85%", xOffset: -35, yOffset: -40, size: 31 },
];

export function FloatingTools() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {tools.map((tool, index) => {
        const Icon = tool.icon;
        return (
          <motion.div
            key={index}
            className="absolute opacity-15 dark:opacity-8 text-primary"
            initial={{
              x: tool.x,
              y: tool.y,
            }}
            animate={{
              x: [
                tool.x,
                `calc(${tool.x} + ${tool.xOffset}px)`,
                `calc(${tool.x} + ${tool.xOffset / 2}px)`,
                tool.x,
              ],
              y: [
                tool.y,
                `calc(${tool.y} + ${tool.yOffset}px)`,
                `calc(${tool.y} + ${tool.yOffset / 2}px)`,
                tool.y,
              ],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: tool.duration,
              delay: tool.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={tool.size} />
          </motion.div>
        );
      })}
    </div>
  );
}

