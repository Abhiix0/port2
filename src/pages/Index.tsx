import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { CustomCursor } from '@/components/CustomCursor';

const Index = () => {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <CustomCursor />
        
        {/* Navigation */}
        <motion.nav
          className="fixed top-0 left-0 w-full z-40 p-6 md:p-8 flex justify-between items-center mix-blend-difference"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.a
            href="#"
            className="text-lg font-medium text-foreground tracking-tight"
            whileHover={{ scale: 1.05 }}
            data-magnetic
          >
            portfolio.
          </motion.a>
          
          <div className="flex items-center gap-6 md:gap-8">
            <motion.a
              href="#projects"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              Work
            </motion.a>
            <motion.a
              href="#contact"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              Contact
            </motion.a>
          </div>
        </motion.nav>

        {/* Sections */}
        <main>
          <HeroSection />
          <div id="projects">
            <ProjectsSection />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
        </main>

        {/* Ambient noise overlay */}
        <div 
          className="fixed inset-0 pointer-events-none z-[100] opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
