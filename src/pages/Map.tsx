import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import RiskBadge from "@/components/RiskBadge";
import type { RiskLevel } from "@/lib/climate-data";
import "leaflet/dist/leaflet.css";

interface RiskZone {
  name: string;
  lat: number;
  lng: number;
  risk: RiskLevel;
  event: string;
  detail: string;
  radius: number;
}

const riskZones: RiskZone[] = [
  { name: "Mumbai, India", lat: 19.076, lng: 72.8777, risk: "Extreme", event: "Flood", detail: "Monsoon flooding, coastal surge risk. Population: 20M+", radius: 80000 },
  { name: "Dhaka, Bangladesh", lat: 23.8103, lng: 90.4125, risk: "Extreme", event: "Cyclone", detail: "Low-lying delta, severe cyclone corridor. Population: 22M+", radius: 70000 },
  { name: "Sahel Region, Africa", lat: 14.5, lng: 2.0, risk: "High", event: "Drought", detail: "Persistent drought, desertification expanding south.", radius: 200000 },
  { name: "California, USA", lat: 36.7783, lng: -119.4179, risk: "High", event: "Wildfire", detail: "Extreme fire seasons, dry Santa Ana winds.", radius: 150000 },
  { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, risk: "Medium", event: "Storm", detail: "Typhoon season risk, earthquake-tsunami compound events.", radius: 60000 },
  { name: "Amazon Basin, Brazil", lat: -3.4653, lng: -62.2159, risk: "High", event: "Drought", detail: "Deforestation-driven drying. Record low river levels.", radius: 250000 },
  { name: "Jakarta, Indonesia", lat: -6.2088, lng: 106.8456, risk: "Extreme", event: "Flood", detail: "Sinking city, annual flooding displaces thousands.", radius: 50000 },
  { name: "Southern Europe", lat: 40.4168, lng: -3.7038, risk: "High", event: "Heatwave", detail: "Record-breaking heatwaves, 48°C+ temperatures.", radius: 180000 },
  { name: "Arctic Circle", lat: 71.0, lng: 25.0, risk: "Extreme", event: "Cold Wave", detail: "Polar vortex disruptions increasing mid-latitude cold snaps.", radius: 200000 },
  { name: "Central America", lat: 15.5, lng: -88.0, risk: "High", event: "Cyclone", detail: "Hurricane corridor, Category 4-5 storms increasing.", radius: 120000 },
  { name: "Australia", lat: -25.2744, lng: 133.7751, risk: "High", event: "Wildfire", detail: "Bushfire seasons lengthening. Record 2019-20 fires.", radius: 250000 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278, risk: "Low", event: "Storm", detail: "Moderate flooding risk, Thames Barrier activated more frequently.", radius: 40000 },
  { name: "Karachi, Pakistan", lat: 24.8607, lng: 67.0011, risk: "Extreme", event: "Heatwave", detail: "Lethal heat events, 50°C+ wet-bulb danger.", radius: 60000 },
  { name: "Manila, Philippines", lat: 14.5995, lng: 120.9842, risk: "High", event: "Cyclone", detail: "Typhoon corridor, 20+ storms per year.", radius: 55000 },
];

const riskColor: Record<RiskLevel, string> = {
  Low: "#00FF9C",
  Medium: "#FFD700",
  High: "#FF7A00",
  Extreme: "#FF3B3B",
};

const riskFill: Record<RiskLevel, string> = {
  Low: "rgba(0,255,156,0.15)",
  Medium: "rgba(255,215,0,0.15)",
  High: "rgba(255,122,0,0.15)",
  Extreme: "rgba(255,59,59,0.15)",
};

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selected, setSelected] = useState<RiskZone | null>(null);
  const [filter, setFilter] = useState<RiskLevel | "All">("All");

  const filtered = filter === "All" ? riskZones : riskZones.filter((z) => z.risk === filter);

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !mapRef.current) return;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }

      const map = L.map(mapRef.current, {
        center: [20, 10],
        zoom: 2.5,
        minZoom: 2,
        maxZoom: 8,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.control.attribution({ position: "bottomleft" }).addTo(map);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OSM &copy; CARTO',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      filtered.forEach((zone) => {
        const circle = L.circle([zone.lat, zone.lng], {
          radius: zone.radius,
          color: riskColor[zone.risk],
          fillColor: riskFill[zone.risk],
          fillOpacity: 0.35,
          weight: 2,
        }).addTo(map);

        const marker = L.circleMarker([zone.lat, zone.lng], {
          radius: 6,
          color: riskColor[zone.risk],
          fillColor: riskColor[zone.risk],
          fillOpacity: 1,
          weight: 2,
        }).addTo(map);

        const popup = L.popup({ className: "climate-popup" }).setContent(
          `<div style="font-family:Inter,system-ui;min-width:180px;">
            <strong style="font-size:14px;">${zone.name}</strong>
            <div style="margin:4px 0;color:${riskColor[zone.risk]};font-weight:700;font-size:13px;">● ${zone.risk} Risk — ${zone.event}</div>
            <div style="font-size:12px;color:#8899aa;">${zone.detail}</div>
          </div>`
        );

        circle.bindPopup(popup);
        marker.bindPopup(popup);
        circle.on("click", () => setSelected(zone));
        marker.on("click", () => setSelected(zone));
      });

      mapInstance.current = map;
    });

    return () => {
      cancelled = true;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [filter]);

  return (
    <Layout>
      <section className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Climate Risk Map</h1>
          <p className="text-muted-foreground mb-6 max-w-2xl text-lg">
            Interactive global map showing color-coded climate risk zones. Click a zone to view details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-4"
        >
          <span className="text-sm font-medium text-muted-foreground mr-1">Filter:</span>
          {(["All", "Low", "Medium", "High", "Extreme"] as const).map((level) => (
            <button
              key={level}
              onClick={() => { setFilter(level); setSelected(null); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
                filter === level
                  ? "bg-primary text-primary-foreground border-primary glow-primary"
                  : "glass border-white/[0.08] text-muted-foreground hover:text-foreground"
              }`}
            >
              {level === "All" ? "All Zones" : (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: riskColor[level as RiskLevel] }} />
                  {level}
                </span>
              )}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">{filtered.length} zones</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            ref={mapRef}
            className="h-[520px] rounded-2xl border border-white/[0.08] glass overflow-hidden"
            style={{ zIndex: 0 }}
          />

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {selected ? (
              <div className="glass-card p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-extrabold text-lg leading-tight">{selected.name}</h3>
                  <RiskBadge level={selected.risk} />
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event Type</span>
                    <span className="font-medium">{selected.event}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coordinates</span>
                    <span className="font-mono text-xs">{selected.lat.toFixed(2)}, {selected.lng.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Affected Radius</span>
                    <span className="font-medium">{(selected.radius / 1000).toFixed(0)} km</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground border-t border-white/[0.06] pt-3">{selected.detail}</p>
              </div>
            ) : (
              <div className="glass-card p-5 text-center text-sm text-muted-foreground">
                Click a zone on the map to view details.
              </div>
            )}

            <div className="glass-card p-4 space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Legend</h4>
              {(["Low", "Medium", "High", "Extreme"] as RiskLevel[]).map((level) => (
                <div key={level} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: riskColor[level] }} />
                  <span className="font-medium">{level}</span>
                  <span className="text-muted-foreground text-xs ml-auto">
                    {level === "Low" && "Minimal threat"}
                    {level === "Medium" && "Monitor"}
                    {level === "High" && "Stay alert"}
                    {level === "Extreme" && "Action needed"}
                  </span>
                </div>
              ))}
            </div>

            <div className="glass-card p-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Zone List</h4>
              <div className="space-y-1.5">
                {filtered.map((z) => (
                  <button
                    key={z.name}
                    onClick={() => setSelected(z)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all active:scale-[0.98] ${
                      selected?.name === z.name
                        ? "bg-primary/15 text-foreground"
                        : "hover:bg-white/[0.05] text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: riskColor[z.risk] }} />
                      <span className="truncate font-medium">{z.name}</span>
                      <span className="ml-auto text-xs opacity-60">{z.event}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
