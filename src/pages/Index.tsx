import { Link } from "react-router-dom";
import { ArrowRight, Thermometer, Droplets, Wind, Activity, Zap, BarChart3, MapPin, Brain, Shield, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedCounter from "@/components/AnimatedCounter";
import GlassCard from "@/components/GlassCard";
import ParticleField from "@/components/ParticleField";
import EmergencyAlert from "@/components/EmergencyAlert";
import DisasterTimeline from "@/components/DisasterTimeline";
import FeatureImportanceChart from "@/components/FeatureImportanceChart";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-earth.jpg";

const features = [
  { icon: Zap, title: "Real-Time Predictions", desc: "AI models analyze live climate data to forecast extreme weather events within seconds.", color: "text-primary" },
  { icon: MapPin, title: "Global Risk Mapping", desc: "Interactive map with color-coded risk zones covering 14+ critical regions worldwide.", color: "text-accent" },
  { icon: Brain, title: "Explainable AI", desc: "Understand why predictions are made with feature importance visualization and explanations.", color: "text-success" },
  { icon: Shield, title: "Emergency Alerts", desc: "Real-time warning system with countdown timers, SMS and email alert capabilities.", color: "text-destructive" },
  { icon: BarChart3, title: "Performance Analytics", desc: "Compare 5 ML models side-by-side with accuracy, precision, recall, and F1 metrics.", color: "text-risk-medium" },
  { icon: Clock, title: "Disaster Timeline", desc: "Historical timeline of major climate events to understand patterns and prepare better.", color: "text-primary" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,11%,0.8)] via-[hsl(222,47%,11%,0.6)] to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,11%,0.9)] via-transparent to-transparent" />
        </div>
        <ParticleField />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative container py-28 md:py-40">
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/20 text-sm">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-primary font-semibold tracking-wide uppercase text-xs">AI-Powered Climate Intelligence</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-gradient">Predict</span> Extreme Climate Events{" "}
                <span className="text-muted-foreground">Before They Strike</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Harnessing Decision Trees, XGBoost, KNN & more to forecast floods, heatwaves, cyclones — giving communities time to prepare.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/predict"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 active:scale-[0.97] transition-all glow-primary"
              >
                Launch Prediction Engine <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 glass border-white/10 text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 active:scale-[0.97] transition-all"
              >
                View Dashboard
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats */}
      <section className="py-20 relative">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <AnimatedCounter icon={<Thermometer className="h-6 w-6" />} value="+1.2°C" label="Global Temp Rise" color="text-risk-high" delay={0} />
            <AnimatedCounter icon={<Droplets className="h-6 w-6" />} value="421 ppm" label="CO₂ Concentration" color="text-primary" delay={0.1} />
            <AnimatedCounter icon={<Wind className="h-6 w-6" />} value="+3.6mm" label="Sea Level Rise/yr" color="text-accent" delay={0.2} />
            <AnimatedCounter icon={<Activity className="h-6 w-6" />} value="348" label="Extreme Events (2025)" color="text-destructive" delay={0.3} />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              Three steps to predict extreme weather with AI-powered analysis.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Input Parameters", desc: "Enter location, temperature, humidity, CO₂ levels, and other climate variables — or fetch live weather data." },
              { step: "02", title: "ML Analysis", desc: "Our 5 models — Decision Tree, Linear Regression, KNN, XGBoost & LightGBM — process your data against historical patterns." },
              { step: "03", title: "Get Predictions", desc: "Receive event type, severity level, probability score, feature importance, and recommended precautions." },
            ].map((f, i) => (
              <GlassCard key={f.step} delay={i * 0.1} className="relative overflow-hidden group">
                <span className="absolute -top-4 -right-2 text-[80px] font-black text-primary/[0.06] group-hover:text-primary/[0.12] transition-colors leading-none">
                  {f.step}
                </span>
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-sm">{f.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Platform Features</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              A comprehensive suite of tools for climate intelligence and disaster preparedness.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.08} className="group">
                <div className={`${f.color} mb-4`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Explainable AI */}
      <section className="py-20 relative">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Explainable AI</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              Understand exactly why predictions are made with feature importance analysis.
            </p>
          </motion.div>

          <GlassCard hover={false}>
            <FeatureImportanceChart />
          </GlassCard>
        </div>
      </section>

      {/* Emergency Alerts */}
      <section className="py-20 relative">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Emergency Alert System</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              Real-time disaster warnings with countdown timers and multi-channel alerting.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <EmergencyAlert />
          </motion.div>
        </div>
      </section>

      {/* Disaster Timeline */}
      <section className="py-20 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Disaster Timeline</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg">
              Major climate events from recent years — understanding the past to predict the future.
            </p>
          </motion.div>

          <DisasterTimeline />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10" />
        <ParticleField />
        <div className="relative container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Ready to <span className="text-gradient">Predict the Future?</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Start making data-driven climate predictions today. Choose your model and get results in seconds.
            </p>
            <Link
              to="/predict"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-10 py-4 rounded-xl font-bold text-lg hover:brightness-110 active:scale-[0.97] transition-all glow-accent"
            >
              Launch Prediction Engine <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
