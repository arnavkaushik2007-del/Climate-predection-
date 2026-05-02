import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  color?: string;
  delay?: number;
}

export default function AnimatedCounter({ value, label, icon, color = "text-primary", delay = 0 }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numericPart = value.replace(/[^0-9.]/g, "");
    const prefix = value.match(/^[^0-9.]*/)?.[0] || "";
    const suffix = value.replace(/^[^0-9.]*[0-9.]+/, "") || "";
    const target = parseFloat(numericPart);
    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const decimals = numericPart.includes(".") ? numericPart.split(".")[1].length : 0;
      setDisplayValue(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card-hover p-6 text-center group"
    >
      <div className={`${color} mb-3 flex justify-center`}>
        {icon}
      </div>
      <p className="text-3xl font-extrabold tabular-nums tracking-tight">{displayValue}</p>
      <p className="text-sm text-muted-foreground mt-1.5">{label}</p>
    </motion.div>
  );
}
