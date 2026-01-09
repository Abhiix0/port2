import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#", direction: "left" },
  { icon: Twitter, label: "Twitter", href: "#", direction: "right" },
  { icon: Linkedin, label: "LinkedIn", href: "#", direction: "left" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com", direction: "right" },
];

export const ContactSection = () => {
  return (
    <section className="relative min-h-screen py-32 flex items-center section-ambient overflow-hidden">
      {/* Animated border lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container px-8 md:px-16 relative z-10">
        {/* Main heading */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.span
            className="text-sm tracking-widest uppercase text-muted-foreground block mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.span>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Let's create
            </motion.span>{" "}
            <motion.span
              className="inline-block text-gradient"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              something
            </motion.span>
            <br />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              extraordinary together.
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mt-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </motion.p>
        </div>

        {/* Social links */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="group relative"
              initial={{ opacity: 0, x: link.direction === "left" ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
              data-magnetic
            >
              <motion.div
                className="relative flex items-center gap-3 px-6 py-4 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm glow-border overflow-hidden"
                whileHover={{ scale: 1.05, borderColor: "hsl(0 0% 40%)" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors relative z-10" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors relative z-10">
                  {link.label}
                </span>
                <motion.div
                  className="relative z-10"
                  initial={{ x: 0, y: 0 }}
                  whileHover={{ x: 3, y: -3 }}
                >
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                </motion.div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Email CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.a
            href="mailto:hello@example.com"
            className="inline-block group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative px-10 py-5 rounded-full border-2 border-border glow-pulse overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-foreground"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
              />
              <span className="relative z-10 text-lg font-medium text-foreground group-hover:text-background transition-colors duration-300">
                hello@example.com
              </span>
            </div>
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-8 left-0 w-full text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <p className="text-sm text-muted-foreground/50">
          © {new Date().getFullYear()} — Designed & Built with ♥
        </p>
      </motion.footer>
    </section>
  );
};
