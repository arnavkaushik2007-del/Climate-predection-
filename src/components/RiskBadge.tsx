import type { RiskLevel } from "@/lib/climate-data";

const riskStyles: Record<RiskLevel, string> = {
  Low: "bg-risk-low/15 text-risk-low border-risk-low/30",
  Medium: "bg-risk-medium/15 text-risk-medium border-risk-medium/30",
  High: "bg-risk-high/15 text-risk-high border-risk-high/30",
  Extreme: "bg-risk-extreme/15 text-risk-extreme border-risk-extreme/30",
};

const dots: Record<RiskLevel, string> = {
  Low: "bg-risk-low",
  Medium: "bg-risk-medium",
  High: "bg-risk-high",
  Extreme: "bg-risk-extreme",
};

export default function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${riskStyles[level]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[level]}`} />
      {level}
    </span>
  );
}
