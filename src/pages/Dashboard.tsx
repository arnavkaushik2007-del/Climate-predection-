import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import {
  monthlyTempData,
  rainfallData,
  eventDistribution,
  co2TempCorrelation,
  yearlyTempTrend,
} from "@/lib/climate-data";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
} from "recharts";

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

export default function Dashboard() {
  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Climate Dashboard</h1>
            <p className="text-muted-foreground mb-10 text-lg">Visualize historical climate patterns and trends through interactive charts.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Temp Trend */}
            <GlassCard hover={false}>
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Global Temperature Trend (1994–2023)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={yearlyTempTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 20% 20%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 20% 20%)" />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 20% 20%)" domain={["auto", "auto"]} />
                  <Tooltip {...chartTooltipStyle} />
                  <Legend />
                  <Line type="monotone" dataKey="global" name="Global" stroke="hsl(174 72% 41%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="land" name="Land" stroke="hsl(28 100% 50%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="ocean" name="Ocean" stroke="hsl(210 60% 50%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Monthly Temp */}
            <GlassCard hover={false} delay={0.1}>
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Monthly Temperature Range</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlyTempData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 20% 20%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 20% 20%)" />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 20% 20%)" />
                  <Tooltip {...chartTooltipStyle} />
                  <Legend />
                  <Area type="monotone" dataKey="max" name="Max" stroke="hsl(0 84% 60%)" fill="hsl(0 84% 60%)" fillOpacity={0.1} />
                  <Area type="monotone" dataKey="avg" name="Avg" stroke="hsl(28 100% 50%)" fill="hsl(28 100% 50%)" fillOpacity={0.15} />
                  <Area type="monotone" dataKey="min" name="Min" stroke="hsl(210 60% 50%)" fill="hsl(210 60% 50%)" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Rainfall */}
            <GlassCard hover={false}>
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Monthly Rainfall Distribution</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={rainfallData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 20% 20%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 20% 20%)" />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 20% 20%)" />
                  <Tooltip {...chartTooltipStyle} />
                  <Bar dataKey="rainfall" name="Rainfall (mm)" fill="hsl(174 72% 41%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* Event Distribution */}
            <GlassCard hover={false} delay={0.1}>
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Extreme Event Distribution</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={eventDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={{ stroke: "hsl(215 20% 40%)" }}>
                    {eventDistribution.map((e, i) => (
                      <Cell key={i} fill={e.fill} />
                    ))}
                  </Pie>
                  <Tooltip {...chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>

            {/* CO2 vs Temp */}
            <GlassCard hover={false} className="lg:col-span-2">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">CO₂ Concentration vs Global Temperature</h3>
              <ResponsiveContainer width="100%" height={320}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 20% 20%)" />
                  <XAxis dataKey="co2" name="CO₂ (ppm)" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 20% 20%)" />
                  <YAxis dataKey="temp" name="Temp (°C)" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} stroke="hsl(222 20% 20%)" domain={["auto", "auto"]} />
                  <Tooltip {...chartTooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Year data" data={co2TempCorrelation} fill="hsl(174 72% 41%)" />
                </ScatterChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        </div>
      </section>
    </Layout>
  );
}
