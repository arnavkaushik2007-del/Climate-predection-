import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import RiskBadge from "@/components/RiskBadge";
import { generatePrediction, modelMetrics, type PredictionResult } from "@/lib/climate-data";
import { fetchWeatherData } from "@/lib/weather-api";
import { AlertTriangle, CheckCircle2, Loader2, Shield, CloudDownload, History, Trash2, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedPrediction {
  id: string;
  timestamp: number;
  location: string;
  model: string;
  result: PredictionResult;
  inputs: {
    temperature: string;
    humidity: string;
    rainfall: string;
    windSpeed: string;
    co2: string;
    pressure: string;
  };
}

const HISTORY_KEY = "climacast-prediction-history";

function loadHistory(): SavedPrediction[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: SavedPrediction[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

export default function Predict() {
  const [model, setModel] = useState("Decision Tree");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<SavedPrediction[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [compareId, setCompareId] = useState<string | null>(null);

  const [form, setForm] = useState({
    location: "",
    temperature: "",
    humidity: "",
    rainfall: "",
    windSpeed: "",
    co2: "",
    pressure: "",
  });

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));
  const { toast } = useToast();

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleFetchWeather = async () => {
    if (!form.location.trim()) {
      toast({ title: "Location required", description: "Please enter a location first.", variant: "destructive" });
      return;
    }
    setFetching(true);
    try {
      const data = await fetchWeatherData(form.location);
      setForm((f) => ({
        ...f,
        location: data.location,
        temperature: data.temperature,
        humidity: data.humidity,
        rainfall: data.rainfall,
        windSpeed: data.windSpeed,
        co2: data.co2,
        pressure: data.pressure,
      }));
      toast({ title: "Weather data loaded", description: `Live data fetched for ${data.location}.` });
    } catch (err: any) {
      toast({ title: "Fetch failed", description: err.message || "Could not fetch weather data.", variant: "destructive" });
    } finally {
      setFetching(false);
    }
  };

  const handlePredict = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const prediction = generatePrediction(model);
      setResult(prediction);
      setLoading(false);
      const entry: SavedPrediction = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        location: form.location || "Unknown",
        model,
        result: prediction,
        inputs: {
          temperature: form.temperature,
          humidity: form.humidity,
          rainfall: form.rainfall,
          windSpeed: form.windSpeed,
          co2: form.co2,
          pressure: form.pressure,
        },
      };
      const updated = [entry, ...history].slice(0, 20);
      setHistory(updated);
      saveHistory(updated);
    }, 1500);
  };

  const deleteEntry = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    saveHistory(updated);
    if (compareId === id) setCompareId(null);
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
    setCompareId(null);
  };

  const compareEntry = compareId ? history.find((h) => h.id === compareId) : null;

  const fields = [
    { key: "location", label: "Location / Region", placeholder: "e.g. Mumbai, India", type: "text" },
    { key: "temperature", label: "Temperature (°C)", placeholder: "e.g. 34.5", type: "number" },
    { key: "humidity", label: "Humidity (%)", placeholder: "e.g. 72", type: "number" },
    { key: "rainfall", label: "Rainfall (mm)", placeholder: "e.g. 120", type: "number" },
    { key: "windSpeed", label: "Wind Speed (km/h)", placeholder: "e.g. 45", type: "number" },
    { key: "co2", label: "CO₂ Levels (ppm)", placeholder: "e.g. 415", type: "number" },
    { key: "pressure", label: "Sea Level Pressure (hPa)", placeholder: "e.g. 1013", type: "number" },
  ];

  const riskColorMap = { Low: "border-risk-low/50", Medium: "border-risk-medium/50", High: "border-risk-high/50", Extreme: "border-risk-extreme/50" };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Climate Prediction Engine</h1>
            <p className="text-muted-foreground mb-8 text-lg">Enter climate parameters and select a model to predict extreme weather events.</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 space-y-6">
              <GlassCard hover={false} className="space-y-5">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Input Parameters
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {fields.map((f) => (
                    <div key={f.key} className={f.key === "location" ? "sm:col-span-2" : ""}>
                      <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{f.label}</label>
                      <div className={f.key === "location" ? "flex gap-2" : ""}>
                        {fetching && f.key !== "location" ? (
                          <div className="w-full h-[42px] rounded-xl bg-muted/60 animate-pulse" />
                        ) : (
                          <input
                            type={f.type}
                            placeholder={f.placeholder}
                            value={form[f.key as keyof typeof form]}
                            onChange={(e) => update(f.key, e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-white/[0.08] bg-background/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all placeholder:text-muted-foreground/50"
                          />
                        )}
                        {f.key === "location" && (
                          <button
                            type="button"
                            onClick={handleFetchWeather}
                            disabled={fetching || !form.location.trim()}
                            className="shrink-0 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-1.5 glow-accent"
                          >
                            {fetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <CloudDownload className="h-4 w-4" />}
                            {fetching ? "Fetching…" : "Live Data"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard hover={false} delay={0.1} className="space-y-4">
                <h2 className="font-bold text-lg">Select Model</h2>
                <div className="space-y-2">
                  {modelMetrics.map((m) => (
                    <label
                      key={m.name}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all hover:bg-white/[0.03] active:scale-[0.99] ${
                        model === m.name ? "border-primary/40 bg-primary/5 glow-primary" : "border-white/[0.06] bg-background/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="model"
                          checked={model === m.name}
                          onChange={() => setModel(m.name)}
                          className="accent-[hsl(174,72%,41%)]"
                        />
                        <span className="font-medium text-sm">{m.name}</span>
                      </div>
                      <span className="text-sm tabular-nums text-muted-foreground">
                        {(m.accuracy * 100).toFixed(1)}%
                      </span>
                    </label>
                  ))}
                </div>

                <motion.button
                  onClick={handlePredict}
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-base hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2 glow-primary"
                >
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing…</> : "Run Prediction"}
                </motion.button>
              </GlassCard>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-6">
              {!result && !loading && (
                <GlassCard hover={false} delay={0.2} className="text-center py-12">
                  <AlertTriangle className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Fill the parameters and run a prediction to see results here.</p>
                </GlassCard>
              )}

              {loading && (
                <GlassCard hover={false} className="text-center py-12">
                  <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Running {model} analysis…</p>
                </GlassCard>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`glass-card p-6 space-y-5 border-2 ${riskColorMap[result.severity]}`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">Prediction Result</h2>
                    <RiskBadge level={result.severity} />
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-background/40">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Predicted Event</p>
                      <p className="text-xl font-extrabold mt-1">{result.event}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-background/40">
                        <p className="text-xs text-muted-foreground">Probability</p>
                        <p className="text-lg font-bold tabular-nums">{result.probability}%</p>
                      </div>
                      <div className="p-3 rounded-xl bg-background/40">
                        <p className="text-xs text-muted-foreground">Model</p>
                        <p className="text-sm font-semibold mt-0.5">{result.model}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-background/40">
                        <p className="text-xs text-muted-foreground">Temp Range</p>
                        <p className="text-sm font-semibold tabular-nums">{result.tempRange[0]}–{result.tempRange[1]}°C</p>
                      </div>
                      <div className="p-3 rounded-xl bg-background/40">
                        <p className="text-xs text-muted-foreground">Rainfall Range</p>
                        <p className="text-sm font-semibold tabular-nums">{result.rainfallRange[0]}–{result.rainfallRange[1]}mm</p>
                      </div>
                    </div>
                  </div>

                  {compareEntry && (
                    <div className="pt-4 border-t border-white/[0.06] space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Comparing with</p>
                        <button onClick={() => setCompareId(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">✕ Close</button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-lg bg-background/40">
                          <p className="text-muted-foreground">Current</p>
                          <p className="font-bold">{result.event}</p>
                          <p className="tabular-nums">{result.probability}% • {result.severity}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-background/40">
                          <p className="text-muted-foreground">{compareEntry.location}</p>
                          <p className="font-bold">{compareEntry.result.event}</p>
                          <p className="tabular-nums">{compareEntry.result.probability}% • {compareEntry.result.severity}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-sm">Recommended Precautions</h3>
                    </div>
                    <ul className="space-y-1.5">
                      {result.precautions.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-success shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* History Panel */}
              <GlassCard hover={false} delay={0.3} className="overflow-hidden !p-0">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">Prediction History</span>
                    {history.length > 0 && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full tabular-nums">{history.length}</span>
                    )}
                  </div>
                  {showHistory ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {showHistory && (
                  <div className="border-t border-white/[0.06]">
                    {history.length === 0 ? (
                      <div className="p-6 text-center">
                        <p className="text-sm text-muted-foreground">No predictions yet.</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-end px-4 pt-2">
                          <button onClick={clearHistory} className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                            <Trash2 className="h-3 w-3" /> Clear all
                          </button>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto divide-y divide-white/[0.06]">
                          {history.map((entry) => (
                            <div
                              key={entry.id}
                              className={`p-4 hover:bg-white/[0.03] transition-colors ${compareId === entry.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm truncate">{entry.location}</span>
                                    <RiskBadge level={entry.result.severity} />
                                  </div>
                                  <p className="text-sm font-semibold">{entry.result.event}</p>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                    <span>{entry.model}</span>
                                    <span className="tabular-nums">{entry.result.probability}%</span>
                                    <span>{formatTime(entry.timestamp)}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  {result && (
                                    <button
                                      onClick={() => setCompareId(compareId === entry.id ? null : entry.id)}
                                      className={`text-xs px-2 py-1 rounded-lg transition-colors ${
                                        compareId === entry.id
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                      }`}
                                    >
                                      {compareId === entry.id ? "Comparing" : "Compare"}
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteEntry(entry.id)}
                                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
