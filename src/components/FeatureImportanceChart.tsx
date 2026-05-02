import { motion } from "framer-motion";

const features = [
  { name: "Rainfall", value: 92, color: "hsl(var(--primary))" },
  { name: "Temperature", value: 78, color: "hsl(var(--accent))" },
  { name: "Humidity", value: 65, color: "hsl(var(--risk-medium))" },
  { name: "Wind Speed", value: 54, color: "hsl(var(--risk-high))" },
  { name: "River Level", value: 88, color: "hsl(var(--destructive))" },
];

export default function FeatureImportanceChart() {
  return (
    <div className="space-y-4">
      {features.map((f, i) => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="space-y-1.5"
        >
          <div className="flex justify-between text-sm">
            <span className="font-medium">{f.name}</span>
            <span className="tabular-nums text-muted-foreground">{f.value}%</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${f.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${f.color}, ${f.color}dd)` }}
            />
          </div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-muted-foreground leading-relaxed"
      >
        <span className="text-primary font-semibold">AI Explanation:</span> Flood risk is high due to heavy rainfall (92% importance) and rising river levels (88% importance). Combined with high humidity, these factors create conditions favorable for severe flooding.
      </motion.div>
    </div>
  );
}
