import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('[data-magnetic]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-foreground/80 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePos.x - 6,
          y: mousePos.y - 6,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-foreground/30 pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.5 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8,
        }}
      />

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9997] rounded-full hidden md:block"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
              background: 'radial-gradient(circle, hsl(0 0% 100% / 0.4) 0%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};
