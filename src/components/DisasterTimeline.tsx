import { motion } from "framer-motion";
import { CloudRain, Flame, Thermometer, Wind, Droplets, Zap } from "lucide-react";

const disasters = [
  { year: "2019", event: "Cyclone Fani", location: "Odisha, India", icon: Wind, color: "text-primary" },
  { year: "2020", event: "Australian Bushfires", location: "Australia", icon: Flame, color: "text-destructive" },
  { year: "2021", event: "European Floods", location: "Germany & Belgium", icon: CloudRain, color: "text-primary" },
  { year: "2022", event: "Pakistan Floods", location: "Sindh, Pakistan", icon: Droplets, color: "text-accent" },
  { year: "2023", event: "Record Heatwave", location: "Southern Europe", icon: Thermometer, color: "text-risk-high" },
  { year: "2024", event: "Hurricane Helene", location: "Florida, USA", icon: Zap, color: "text-risk-extreme" },
];

export default function DisasterTimeline() {
  return (
    <div className="relative">
      {/* Horizontal line */}
      <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {disasters.map((d, i) => (
          <motion.div
            key={d.year + d.event}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="snap-start shrink-0 w-[200px]"
          >
            {/* Dot on timeline */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className={`w-4 h-4 rounded-full bg-card border-2 border-primary z-10 relative`} />
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30 animate-ping" />
              </div>
            </div>

            <div className="glass-card p-4 space-y-2">
              <div className="flex items-center gap-2">
                <d.icon className={`h-4 w-4 ${d.color}`} />
                <span className="text-xs font-bold text-primary tabular-nums">{d.year}</span>
              </div>
              <p className="font-semibold text-sm leading-tight">{d.event}</p>
              <p className="text-xs text-muted-foreground">{d.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
