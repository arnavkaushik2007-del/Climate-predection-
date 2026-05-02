import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Bell, Mail, MapPin, Volume2, VolumeX } from "lucide-react";

const alerts = [
  { type: "EXTREME FLOOD WARNING", region: "Mumbai, India", eta: "2h 15m", severity: "Extreme" as const },
  { type: "CYCLONE ALERT", region: "Bay of Bengal", eta: "6h 30m", severity: "High" as const },
  { type: "HEATWAVE ADVISORY", region: "Southern Europe", eta: "12h", severity: "High" as const },
];

export default function EmergencyAlert() {
  const [currentAlert, setCurrentAlert] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [countdown, setCountdown] = useState(8100); // seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % alerts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const alert = alerts[currentAlert];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/5">
      {/* Pulsing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 via-transparent to-destructive/10 animate-emergency-flash" />

      <div className="relative p-6 space-y-4">
        {/* Alert header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full animate-ping" />
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentAlert}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-lg font-extrabold text-destructive tracking-wide"
              >
                ⚠ {alert.type}
              </motion.span>
            </AnimatePresence>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-destructive" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
          </button>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Time to Impact</p>
            <p className="text-3xl font-mono font-extrabold text-destructive tabular-nums tracking-wider">
              {formatCountdown(countdown)}
            </p>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">{alert.region}</span>
            </div>
            <div className="text-xs text-muted-foreground">ETA: {alert.eta}</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold hover:brightness-110 active:scale-[0.97] transition-all">
            <Bell className="h-3.5 w-3.5" /> Send SMS Alert
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:brightness-110 active:scale-[0.97] transition-all">
            <Mail className="h-3.5 w-3.5" /> Email Alert
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-semibold hover:bg-secondary active:scale-[0.97] transition-all">
            <MapPin className="h-3.5 w-3.5" /> Share Location
          </button>
        </div>
      </div>
    </div>
  );
}
