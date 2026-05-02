import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import RiskBadge from "@/components/RiskBadge";
import { historicalDataset, type RiskLevel } from "@/lib/climate-data";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 15;

export default function Explorer() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return historicalDataset
      .filter((r) => r.region.toLowerCase().includes(q) || r.event.toLowerCase().includes(q) || String(r.year).includes(q))
      .sort((a, b) => {
        const av = (a as any)[sortKey];
        const bv = (b as any)[sortKey];
        const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [search, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const rows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const downloadCSV = () => {
    const header = "ID,Year,Region,Event,Temp,Humidity,Rainfall,WindSpeed,CO2,Pressure,Severity\n";
    const body = historicalDataset.map((r) => `${r.id},${r.year},${r.region},${r.event},${r.temperature},${r.humidity},${r.rainfall},${r.windSpeed},${r.co2},${r.pressure},${r.severity}`).join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "climate_dataset.csv";
    a.click();
  };

  const cols = [
    { key: "id", label: "#" },
    { key: "year", label: "Year" },
    { key: "region", label: "Region" },
    { key: "event", label: "Event" },
    { key: "temperature", label: "Temp (°C)" },
    { key: "humidity", label: "Humidity" },
    { key: "rainfall", label: "Rain (mm)" },
    { key: "co2", label: "CO₂" },
    { key: "severity", label: "Severity" },
  ];

  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Historical Data Explorer</h1>
            <p className="text-muted-foreground mb-8 text-lg">Browse, search, and export the training dataset used for climate predictions.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by region, event, or year…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.08] bg-surface-glass/40 backdrop-blur-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <button onClick={downloadCSV} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium hover:bg-white/[0.06] active:scale-[0.98] transition-all">
              <Download className="h-4 w-4" /> Download CSV
            </button>
          </motion.div>

          <GlassCard hover={false} className="!p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-background/40">
                    {cols.map((c) => (
                      <th
                        key={c.key}
                        onClick={() => toggleSort(c.key)}
                        className="px-3 py-3 text-left font-semibold text-muted-foreground cursor-pointer hover:text-foreground select-none whitespace-nowrap transition-colors"
                      >
                        {c.label} {sortKey === c.key ? (sortDir === "asc" ? "↑" : "↓") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors">
                      <td className="px-3 py-2.5 tabular-nums">{r.id}</td>
                      <td className="px-3 py-2.5 tabular-nums">{r.year}</td>
                      <td className="px-3 py-2.5">{r.region}</td>
                      <td className="px-3 py-2.5">{r.event}</td>
                      <td className="px-3 py-2.5 tabular-nums">{r.temperature}</td>
                      <td className="px-3 py-2.5 tabular-nums">{r.humidity}%</td>
                      <td className="px-3 py-2.5 tabular-nums">{r.rainfall}</td>
                      <td className="px-3 py-2.5 tabular-nums">{r.co2}</td>
                      <td className="px-3 py-2.5"><RiskBadge level={r.severity as RiskLevel} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>{filtered.length} records found</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="tabular-nums">Page {page + 1} of {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="p-1.5 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
