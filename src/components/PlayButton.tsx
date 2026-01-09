import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const PlayButton = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [intensity, setIntensity] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      const maxDistance = 100;
      const newIntensity = Math.max(0, 1 - distance / maxDistance);
      setIntensity(newIntensity);
    }
  };

  const waveformBars = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    baseHeight: 12 + Math.sin(i * 0.8) * 8,
  }));

  return (
    <motion.button
      ref={buttonRef}
      className="relative group flex items-center gap-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIntensity(0);
      }}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-magnetic
    >
      {/* Main circle */}
      <motion.div
        className="relative w-16 h-16 rounded-full border-2 border-foreground/30 flex items-center justify-center overflow-hidden"
        animate={{
          borderColor: isHovering ? 'hsl(0 0% 60%)' : 'hsl(0 0% 30%)',
          boxShadow: isHovering
            ? '0 0 30px hsl(0 0% 50% / 0.3), inset 0 0 20px hsl(0 0% 50% / 0.1)'
            : '0 0 15px hsl(0 0% 30% / 0.15)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-foreground/20"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* Second pulse ring (staggered) */}
        <motion.div
          className="absolute inset-0 rounded-full border border-foreground/15"
          animate={{
            scale: [1, 1.8, 1.8],
            opacity: [0.3, 0, 0],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* Waveform bars */}
        <div className="flex items-center gap-0.5 z-10">
          {waveformBars.map((bar) => (
            <motion.div
              key={bar.id}
              className="w-1 bg-foreground/80 rounded-full"
              animate={{
                height: isHovering
                  ? [bar.baseHeight, bar.baseHeight * (1.5 + intensity * 0.8), bar.baseHeight]
                  : [bar.baseHeight * 0.6, bar.baseHeight, bar.baseHeight * 0.6],
              }}
              transition={{
                duration: isHovering ? 0.3 + bar.id * 0.05 : 0.8 + bar.id * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bar.id * 0.08,
              }}
            />
          ))}
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(0 0% 100% / 0.1) 0%, transparent 70%)',
          }}
          animate={{
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Text label */}
      <motion.span
        className="text-sm text-muted-foreground uppercase tracking-widest"
        animate={{
          x: isHovering ? 5 : 0,
          color: isHovering ? 'hsl(0 0% 90%)' : 'hsl(0 0% 55%)',
        }}
        transition={{ duration: 0.3 }}
      >
        Listen
      </motion.span>
    </motion.button>
  );
};
