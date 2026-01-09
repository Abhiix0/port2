import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import silhouetteImage from '@/assets/silhouette-headphones.png';
import { ParticleField } from './ParticleField';
import { PlayButton } from './PlayButton';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringText, setIsHoveringText] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);

  const springY = useSpring(y, { stiffness: 80, damping: 25 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  // GSAP animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Silhouette idle animation
      gsap.to(silhouetteRef.current, {
        y: 8,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Laptop glow pulse
      const glow = document.querySelector('.laptop-glow');
      if (glow) {
        gsap.to(glow, {
          opacity: 0.8,
          scale: 1.1,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
    { text: "a creator", delay: 0.15 },
    { text: "who breathes life", delay: 0.3 },
    { text: "into pixels.", delay: 0.45 },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden section-ambient"
      style={{ 
        opacity: springOpacity, 
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <ParticleField />

      {/* Silhouette with parallax and idle animations */}
      <motion.div
        ref={silhouetteRef}
        className="absolute left-0 bottom-0 w-[55%] md:w-2/5 h-[85vh] pointer-events-none"
        style={{ y: springY }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            x: mousePos.x * 20,
            y: mousePos.y * 15,
            rotateY: mousePos.x * 3,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        >
          {/* Laptop screen glow */}
          <div 
            className="laptop-glow absolute bottom-[35%] left-[55%] w-20 h-16 rounded-lg opacity-40 blur-xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, hsl(0 0% 50% / 0.6) 0%, transparent 70%)',
            }}
          />

          <motion.img
            src={silhouetteImage}
            alt="Silhouette"
            className="w-full h-full object-contain object-bottom opacity-95 select-none"
            whileHover={{ scale: 1.02 }}
            data-magnetic
          />

          {/* Subtle ambient glow under silhouette */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-40 blur-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, hsl(0 0% 25% / 0.5) 0%, transparent 70%)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Text content */}
      <div ref={textRef} className="container relative z-10 ml-auto w-full md:w-3/5 px-8 md:px-16">
        <div className="max-w-2xl ml-auto">
          {textLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                delay: 0.6 + line.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setIsHoveringText(index)}
              onMouseLeave={() => setIsHoveringText(null)}
            >
              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight transition-all duration-300 ${
                  index === 1 ? 'text-gradient font-medium' : 'text-foreground/90'
                }`}
                style={{
                  letterSpacing: isHoveringText === index ? '0.02em' : '-0.02em',
                  transform: isHoveringText === index ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {line.text.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    className="inline-block"
                    whileHover={{
                      scale: 1.15,
                      y: -3,
                      transition: { duration: 0.15, ease: "easeOut" },
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          ))}

          <motion.p
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Crafting digital experiences that feel alive. Every interaction is intentional, every animation tells a story.
          </motion.p>

          {/* Play button */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <PlayButton />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-12 flex items-center gap-3 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
          >
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-foreground/60 via-foreground/30 to-transparent"
              animate={{ scaleY: [1, 0.6, 1], opacity: [0.8, 0.4, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-sm tracking-widest uppercase">Scroll to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Ambient corner gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-muted/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </motion.section>
  );
};
