import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const ParticleField = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ambient gradient overlay */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(0 0% 15% / 0.3) 0%, transparent 50%)`,
        }}
      />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-foreground/20"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            y: [window.innerHeight, -100],
            x: [0, Math.sin(particle.id) * 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Subtle light streaks */}
      <motion.div
        className="absolute w-px h-32 bg-gradient-to-b from-transparent via-foreground/10 to-transparent"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100 - 10}%`,
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scaleY: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
