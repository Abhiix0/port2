import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import silhouetteImage from '@/assets/silhouette.png';
import { ParticleField } from './ParticleField';

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const textLines = [
    { text: "Hello, I'm", delay: 0 },
    { text: "a creator", delay: 0.2 },
    { text: "who breathes life", delay: 0.4 },
    { text: "into pixels.", delay: 0.6 },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden section-ambient"
      style={{ opacity: springOpacity, scale }}
    >
      <ParticleField />

      {/* Silhouette with parallax */}
      <motion.div
        className="absolute left-0 bottom-0 w-1/2 md:w-2/5 h-[80vh] pointer-events-none"
        style={{ y: springY }}
      >
        <motion.img
          src={silhouetteImage}
          alt="Silhouette"
          className="w-full h-full object-contain object-bottom opacity-90 select-none"
          animate={{
            x: mousePos.x * 15,
            y: mousePos.y * 10,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          whileHover={{ scale: 1.02 }}
          data-magnetic
        />
        
        {/* Subtle glow under silhouette */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, hsl(0 0% 20% / 0.4) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Text content */}
      <div className="container relative z-10 ml-auto w-full md:w-3/5 px-8 md:px-16">
        <div className="max-w-2xl ml-auto">
          {textLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.5 + line.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1 
                className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight ${
                  index === 1 ? 'text-gradient font-medium' : 'text-foreground/90'
                }`}
              >
                {line.text}
              </h1>
            </motion.div>
          ))}

          <motion.p
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Crafting digital experiences that feel alive. Every interaction is intentional, every animation tells a story.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 flex items-center gap-3 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-foreground/50 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-sm tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Ambient corner gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-muted/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </motion.section>
  );
};
