import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import { Flame, Droplets, Thermometer, Wind, CloudRain, Brain, Shield, HelpCircle } from "lucide-react";

const events = [
  { icon: CloudRain, title: "Floods", desc: "Overflow of water onto normally dry land. Caused by heavy rainfall, storm surges, or rapid snowmelt. Can devastate communities within hours.", color: "text-primary" },
  { icon: Thermometer, title: "Heatwaves", desc: "Prolonged periods of abnormally high temperatures. Leads to heat stroke, crop failure, and increased energy demand. Growing 3x more frequent since 1960.", color: "text-accent" },
  { icon: Wind, title: "Cyclones", desc: "Intense circular storms with winds exceeding 119 km/h. Form over warm ocean waters and can cause catastrophic coastal damage.", color: "text-muted-foreground" },
  { icon: Droplets, title: "Droughts", desc: "Extended periods of below-average precipitation. Affects agriculture, water supply, and can trigger famine. Duration ranges from weeks to years.", color: "text-risk-medium" },
  { icon: Flame, title: "Wildfires", desc: "Uncontrolled fires that spread rapidly through vegetation. Intensified by climate change, dry conditions, and high winds. Destroys ecosystems.", color: "text-destructive" },
];

const faqs = [
  { q: "How does machine learning predict climate events?", a: "ML models learn patterns from historical climate data (temperature, humidity, pressure, CO₂ levels, etc.) and use those patterns to predict future extreme weather events." },
  { q: "Which model is most accurate?", a: "XGBoost typically performs best with ~92% accuracy. Decision Trees excel at categorical predictions, while Linear Regression is best for continuous forecasting." },
  { q: "How far ahead can predictions be made?", a: "Short-term predictions (7–30 days) are most reliable with 80–90% accuracy. Medium-term (30–90 days) predictions drop to 65–80% accuracy." },
  { q: "What data sources are used?", a: "Our models are trained on publicly available datasets from NOAA, NASA GISS, World Meteorological Organization, and regional weather stations spanning 1980–2024." },
];

export default function Education() {
  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Climate Education</h1>
            <p className="text-muted-foreground mb-12 text-lg">Understanding extreme climate events and how machine learning helps us prepare.</p>
          </motion.div>

          {/* What is climate change */}
          <GlassCard hover={false} className="mb-12">
            <h2 className="text-xl font-bold mb-4">What is Climate Change?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Climate change refers to long-term shifts in temperatures and weather patterns. While natural processes like volcanic eruptions contribute, human activities — particularly burning fossil fuels — have been the primary driver since the 1800s.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The global average temperature has already risen ~1.2°C above pre-industrial levels, and without drastic action, could exceed 2°C by 2050.
            </p>
          </GlassCard>

          {/* Events */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold mb-6"
          >
            Types of Extreme Climate Events
          </motion.h2>
          <div className="space-y-4 mb-12">
            {events.map((e, i) => (
              <GlassCard key={e.title} delay={i * 0.08}>
                <div className="flex gap-5">
                  <div className={`shrink-0 mt-1 ${e.color}`}>
                    <e.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{e.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* ML explanation */}
          <GlassCard hover={false} glow="primary" className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">How ML Helps Predict Climate Events</h2>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>Machine learning models can process vast amounts of historical climate data to identify patterns invisible to traditional analysis:</p>
              <ul className="space-y-2 ml-4">
                <li><strong className="text-foreground">Decision Trees</strong> — Split data based on feature thresholds, excellent for classifying event types.</li>
                <li><strong className="text-foreground">Linear Regression</strong> — Models continuous relationships (e.g., CO₂ → temperature). Best for trend forecasting.</li>
                <li><strong className="text-foreground">K-Nearest Neighbors</strong> — Classifies based on similarity to historical events. Effective for region-specific predictions.</li>
                <li><strong className="text-foreground">XGBoost & LightGBM</strong> — Gradient boosting ensembles that combine many weak learners for state-of-the-art accuracy.</li>
              </ul>
            </div>
          </GlassCard>

          {/* Safety */}
          <GlassCard hover={false} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-success" />
              <h2 className="text-xl font-bold">Prevention & Safety Guidelines</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                "Create an emergency preparedness kit with essentials for 72 hours",
                "Monitor local weather alerts and early warning systems",
                "Know your area's evacuation routes and shelter locations",
                "Reduce carbon footprint: use public transport, conserve energy",
                "Support reforestation and sustainable agriculture initiatives",
                "Educate your community about climate risks and preparedness",
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-2 p-3 rounded-xl bg-background/40">
                  <span className="text-success mt-0.5">✓</span>
                  <span className="text-muted-foreground">{tip}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <GlassCard key={i} delay={i * 0.08}>
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
