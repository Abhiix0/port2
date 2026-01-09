import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    id: 1,
    title: "Ethereal Canvas",
    description: "An interactive art experience that responds to sound and movement.",
    longDescription: "A groundbreaking web experience that transforms audio input into stunning visual art. Built with WebGL and the Web Audio API, this project explores the intersection of music and visual design, creating unique artworks that evolve in real-time.",
    tags: ["WebGL", "Audio API", "Creative Coding"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Mindflow",
    description: "A meditation app with adaptive ambient soundscapes.",
    longDescription: "Mindflow combines AI-generated ambient music with guided breathing exercises. The app learns from user sessions to create personalized soundscapes that evolve throughout the meditation, helping users achieve deeper states of relaxation.",
    tags: ["React Native", "AI/ML", "Audio"],
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Chronicle",
    description: "A minimal journaling platform with beautiful typography.",
    longDescription: "Chronicle reimagines digital journaling with a focus on typography and distraction-free writing. Features include mood tracking, encrypted storage, and beautiful PDF exports. The interface adapts to the time of day with subtle theme changes.",
    tags: ["Next.js", "Typography", "Privacy"],
    link: "#",
  },
  {
    id: 4,
    title: "Pulse",
    description: "Real-time collaboration tools for creative teams.",
    longDescription: "A suite of tools designed for creative agencies and design teams. Pulse includes real-time whiteboarding, asset management, and client feedback systems. Built for speed and seamless collaboration across distributed teams.",
    tags: ["WebSockets", "Canvas API", "Collaboration"],
    link: "#",
    github: "#",
  },
];

export const ProjectsSection = () => {
  return (
    <section className="relative min-h-screen py-32 section-ambient">
      <div className="container px-8 md:px-16">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="text-sm tracking-widest uppercase text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Selected Works
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl font-light mt-4 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Projects
          </motion.h2>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Ambient gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
