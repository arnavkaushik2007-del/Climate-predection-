import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import { modelMetrics } from "@/lib/climate-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Trophy } from "lucide-react";

const best = modelMetrics.reduce((a, b) => (a.accuracy > b.accuracy ? a : b));

const radarData = ["accuracy", "precision", "recall", "f1Score"].map((key) => ({
  metric: key === "f1Score" ? "F1" : key.charAt(0).toUpperCase() + key.slice(1),
  ...Object.fromEntries(modelMetrics.map((m) => [m.name, +((m as any)[key] * 100).toFixed(1)])),
}));

const barData = modelMetrics.map((m) => ({
  name: m.name.replace("Linear Regression", "Lin. Reg."),
  Accuracy: +(m.accuracy * 100).toFixed(1),
  F1: +(m.f1Score * 100).toFixed(1),
}));

const chartTooltipStyle = {
  contentStyle: {
    background: "hsl(222 47% 13% / 0.95)",
    border: "1px solid hsl(222 20% 20%)",
    borderRadius: "12px",
    backdropFilter: "blur(12px)",
    color: "hsl(210 40% 98%)",
    fontSize: "12px",
  },
};

// Circular progress component
function CircularProgress({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="hsl(222 20% 20%)" strokeWidth="4" />
          <motion.circle
            cx="40" cy="40" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold tabular-nums">{value.toFixed(1)}%</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </div>
  );
}

export default function Models() {
  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Model Comparison</h1>
            <p className="text-muted-foreground mb-10 text-lg">Compare Decision Tree, Linear Regression, KNN, XGBoost & LightGBM side by side.</p>
          </motion.div>

          {/* Best model banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 p-4 rounded-2xl glass border-primary/20 mb-8 glow-primary"
          >
            <Trophy className="h-5 w-5 text-accent" />
            <p className="text-sm font-medium">
              <span className="font-bold text-primary">{best.name}</span> is the recommended model with {(best.accuracy * 100).toFixed(1)}% accuracy.
            </p>
          </motion.div>

          {/* Metric cards */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 mb-10">
            {modelMetrics.map((m, i) => (
              <GlassCard key={m.name} delay={i * 0.08} className={m.name === best.name ? "ring-2 ring-primary glow-primary" : ""}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm">{m.name}</h3>
                  {m.name === best.name && (
                    <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Best</span>
                  )}
                </div>

                {/* Circular progress for top metrics */}
                <div className="flex justify-center gap-3 mb-4">
                  <CircularProgress value={m.accuracy * 100} label="Accuracy" color="hsl(174 72% 41%)" />
                  <CircularProgress value={m.f1Score * 100} label="F1" color="hsl(28 100% 50%)" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    ["Precision", (m.precision * 100).toFixed(1) + "%"],
                    ["Recall", (m.recall * 100).toFixed(1) + "%"],
                    ["R²", m.r2Score.toFixed(3)],
                    ["MAE", m.mae.toFixed(2)],
                  ].map(([label, val]) => (
                    <div key={label} className="p-2 rounded-lg bg-background/40">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-semibold tabular-nums">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-3 mt-3 border-t border-white/[0.06] text-xs text-muted-foreground">
                  Training: <span className="font-medium tabular-nums">{m.trainingTime}s</span>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <GlassCard hover={false}>
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Accuracy & F1 Comparison</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 20% 20%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 20% 20%)" />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 20% 20%)" />
                  <Tooltip {...chartTooltipStyle} />
                  <Bar dataKey="Accuracy" fill="hsl(174 72% 41%)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="F1" fill="hsl(28 100% 50%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard hover={false} delay={0.1}>
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Multi-Metric Radar</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(222 20% 20%)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} />
                  <PolarRadiusAxis domain={[70, 100]} tick={{ fontSize: 10, fill: "hsl(215 20% 55%)" }} />
                  <Radar name="Decision Tree" dataKey="Decision Tree" stroke="hsl(174 72% 41%)" fill="hsl(174 72% 41%)" fillOpacity={0.15} />
                  <Radar name="Linear Regression" dataKey="Linear Regression" stroke="hsl(28 100% 50%)" fill="hsl(28 100% 50%)" fillOpacity={0.15} />
                  <Radar name="KNN (K=5)" dataKey="KNN (K=5)" stroke="hsl(160 100% 50%)" fill="hsl(160 100% 50%)" fillOpacity={0.15} />
                  <Radar name="XGBoost" dataKey="XGBoost" stroke="hsl(280 60% 55%)" fill="hsl(280 60% 55%)" fillOpacity={0.15} />
                  <Radar name="LightGBM" dataKey="LightGBM" stroke="hsl(340 70% 55%)" fill="hsl(340 70% 55%)" fillOpacity={0.15} />
                  <Tooltip {...chartTooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        </div>
      </section>
    </Layout>
  );
}
