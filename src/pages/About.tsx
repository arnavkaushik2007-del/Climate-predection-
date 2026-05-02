import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import { GitBranch, Database, Cpu, Globe, Code2, Users } from "lucide-react";

const techStack = [
  { icon: Code2, label: "React + TypeScript", desc: "Frontend framework" },
  { icon: Cpu, label: "scikit-learn", desc: "ML model training" },
  { icon: Database, label: "NOAA / NASA GISS", desc: "Training dataset sources" },
  { icon: Globe, label: "Recharts", desc: "Data visualization" },
  { icon: GitBranch, label: "Decision Tree / LR / KNN", desc: "Prediction models" },
];

const team = [
  { name: "Arnav Kaushik", role: "Developer" },
];

export default function About() {
  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">About ClimateCast</h1>
            <p className="text-muted-foreground mb-12 text-lg">An AI-powered platform for extreme climate event prediction and awareness.</p>
          </motion.div>

          {/* Mission */}
          <GlassCard hover={false} className="mb-10">
            <h2 className="text-xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              ClimateCast was created to bridge the gap between complex climate science and actionable community-level preparedness. By leveraging machine learning on decades of historical weather data, we aim to provide accessible, reliable predictions of extreme climate events.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our goal: give people and communities the information they need to prepare for and mitigate the impact of floods, heatwaves, cyclones, droughts, and other climate-driven disasters.
            </p>
          </GlassCard>

          {/* Architecture */}
          <GlassCard hover={false} className="mb-10">
            <h2 className="text-xl font-bold mb-6">System Architecture</h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              {["User Input", "→", "Data Preprocessing", "→", "Feature Engineering", "→", "ML Model Selection", "→", "Prediction Engine", "→", "Results + Precautions"].map((s, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={s === "→" ? "text-muted-foreground" : "px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium"}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </GlassCard>

          {/* ML Explanations */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6"
          >
            How Our Models Work
          </motion.h2>
          <div className="space-y-5 mb-10">
            {[
              { title: "Decision Tree", desc: "Builds a tree structure where each node represents a test on a feature (e.g., temperature > 35°C). Recursively partitions data to minimize impurity." },
              { title: "Linear Regression", desc: "Fits a linear equation to data by minimizing squared residuals. Best for predicting continuous values like temperature or rainfall." },
              { title: "K-Nearest Neighbors", desc: "Classifies new data by finding the K most similar historical observations using Euclidean distance." },
            ].map((m, i) => (
              <GlassCard key={m.title} delay={i * 0.08}>
                <h3 className="font-bold mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </GlassCard>
            ))}
          </div>

          {/* Tech stack */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6"
          >
            Technology Stack
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {techStack.map((t, i) => (
              <GlassCard key={t.label} delay={i * 0.06}>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <t.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Developer</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {team.map((t, i) => (
              <GlassCard key={t.name} delay={i * 0.06}>
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm mb-3">
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </GlassCard>
            ))}
          </div>

          {/* Contact */}
          <GlassCard hover={false}>
            <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input placeholder="Your Name" className="px-4 py-2.5 rounded-xl border border-white/[0.08] bg-background/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                <input placeholder="Email Address" type="email" className="px-4 py-2.5 rounded-xl border border-white/[0.08] bg-background/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
              <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] bg-background/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all" />
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-sm hover:brightness-110 transition-all glow-primary"
              >
                Send Message
              </motion.button>
            </form>
          </GlassCard>
        </div>
      </section>
    </Layout>
  );
}
