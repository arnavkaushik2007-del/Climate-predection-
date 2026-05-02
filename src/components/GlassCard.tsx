import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "primary" | "accent" | "danger";
  delay?: number;
}

export default function GlassCard({ children, className, hover = true, glow, delay = 0 }: GlassCardProps) {
  const glowClass = glow === "primary" ? "glow-primary" : glow === "accent" ? "glow-accent" : glow === "danger" ? "glow-danger" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "glass-card p-6",
        hover && "transition-all duration-300",
        glowClass,
        className
      )}
    >
      {children}
    </motion.div>
  );
}
