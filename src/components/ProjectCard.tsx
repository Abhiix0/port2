import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  github?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        className="relative h-80 cursor-pointer perspective-1000"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsExpanded(true)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        data-magnetic
      >
        <motion.div
          className="w-full h-full card-ambient rounded-2xl p-8 flex flex-col justify-between glow-border transition-all duration-500"
          whileHover={{
            boxShadow: "0 25px 50px -12px hsl(0 0% 0% / 0.9), 0 0 80px -20px hsl(0 0% 30% / 0.4)",
          }}
        >
          {/* Project number */}
          <span className="text-6xl font-light text-muted-foreground/30 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="space-y-4">
            <h3 className="text-2xl font-medium text-foreground">{project.title}</h3>
            <p className="text-muted-foreground line-clamp-2">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full border border-border/50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
          >
            <span className="text-muted-foreground text-2xl">+</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Expanded overlay */}
      {isExpanded && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsExpanded(false)}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full max-w-2xl card-ambient rounded-3xl p-8 md:p-12 glow-border"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
            >
              <X size={20} />
            </button>

            <span className="text-7xl font-light text-muted-foreground/20 select-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            <h2 className="text-3xl md:text-4xl font-medium text-foreground mt-4">
              {project.title}
            </h2>

            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm bg-secondary/50 text-secondary-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
                >
                  <ExternalLink size={18} />
                  View Live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:border-foreground/50 hover:text-foreground transition-colors text-muted-foreground"
                >
                  <Github size={18} />
                  Source
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
