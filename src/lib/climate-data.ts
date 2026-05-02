// Mock climate data for the application

export const climateEvents = [
  "Flood", "Drought", "Heatwave", "Cyclone", "Storm", "Wildfire", "Cold Wave", "Tornado"
] as const;

export type ClimateEvent = typeof climateEvents[number];
export type RiskLevel = "Low" | "Medium" | "High" | "Extreme";

export interface PredictionResult {
  event: ClimateEvent;
  severity: RiskLevel;
  probability: number;
  tempRange: [number, number];
  rainfallRange: [number, number];
  precautions: string[];
  model: string;
}

export interface ModelMetrics {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  r2Score: number;
  mae: number;
  mse: number;
  rmse: number;
  trainingTime: number;
}

export const modelMetrics: ModelMetrics[] = [
  {
    name: "Decision Tree",
    accuracy: 0.891,
    precision: 0.873,
    recall: 0.885,
    f1Score: 0.879,
    r2Score: 0.847,
    mae: 1.23,
    mse: 2.41,
    rmse: 1.553,
    trainingTime: 0.34,
  },
  {
    name: "Linear Regression",
    accuracy: 0.824,
    precision: 0.812,
    recall: 0.831,
    f1Score: 0.821,
    r2Score: 0.793,
    mae: 1.87,
    mse: 4.12,
    rmse: 2.03,
    trainingTime: 0.12,
  },
  {
    name: "KNN (K=5)",
    accuracy: 0.863,
    precision: 0.851,
    recall: 0.858,
    f1Score: 0.854,
    r2Score: 0.821,
    mae: 1.52,
    mse: 3.01,
    rmse: 1.735,
    trainingTime: 0.08,
  },
  {
    name: "XGBoost",
    accuracy: 0.923,
    precision: 0.915,
    recall: 0.918,
    f1Score: 0.916,
    r2Score: 0.901,
    mae: 0.87,
    mse: 1.34,
    rmse: 1.158,
    trainingTime: 0.52,
  },
  {
    name: "LightGBM",
    accuracy: 0.912,
    precision: 0.904,
    recall: 0.909,
    f1Score: 0.906,
    r2Score: 0.889,
    mae: 0.94,
    mse: 1.58,
    rmse: 1.257,
    trainingTime: 0.18,
  },
];
export const monthlyTempData = [
  { month: "Jan", avg: 12.3, min: 5.1, max: 19.8 },
  { month: "Feb", avg: 13.7, min: 6.2, max: 21.4 },
  { month: "Mar", avg: 17.2, min: 9.8, max: 24.9 },
  { month: "Apr", avg: 22.1, min: 14.3, max: 30.2 },
  { month: "May", avg: 27.8, min: 19.5, max: 36.4 },
  { month: "Jun", avg: 31.4, min: 23.1, max: 39.8 },
  { month: "Jul", avg: 30.2, min: 24.6, max: 37.1 },
  { month: "Aug", avg: 29.1, min: 23.4, max: 35.8 },
  { month: "Sep", avg: 26.7, min: 20.1, max: 33.4 },
  { month: "Oct", avg: 22.3, min: 15.2, max: 29.7 },
  { month: "Nov", avg: 17.1, min: 9.8, max: 24.6 },
  { month: "Dec", avg: 13.2, min: 5.9, max: 20.8 },
];

export const rainfallData = [
  { month: "Jan", rainfall: 23 },
  { month: "Feb", rainfall: 18 },
  { month: "Mar", rainfall: 15 },
  { month: "Apr", rainfall: 12 },
  { month: "May", rainfall: 28 },
  { month: "Jun", rainfall: 142 },
  { month: "Jul", rainfall: 267 },
  { month: "Aug", rainfall: 243 },
  { month: "Sep", rainfall: 168 },
  { month: "Oct", rainfall: 74 },
  { month: "Nov", rainfall: 12 },
  { month: "Dec", rainfall: 8 },
];

export const eventDistribution = [
  { name: "Floods", value: 31, fill: "hsl(200, 70%, 50%)" },
  { name: "Heatwaves", value: 24, fill: "hsl(15, 80%, 55%)" },
  { name: "Cyclones", value: 18, fill: "hsl(260, 50%, 55%)" },
  { name: "Droughts", value: 14, fill: "hsl(35, 85%, 50%)" },
  { name: "Storms", value: 8, fill: "hsl(210, 60%, 45%)" },
  { name: "Wildfires", value: 5, fill: "hsl(0, 70%, 50%)" },
];

export const co2TempCorrelation = Array.from({ length: 40 }, (_, i) => ({
  co2: 340 + i * 3.2 + (Math.random() - 0.5) * 8,
  temp: 13.8 + i * 0.028 + (Math.random() - 0.5) * 0.3,
  year: 1980 + i,
}));

export const historicalDataset = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  year: 2000 + Math.floor(i / 5),
  region: ["South Asia", "Southeast Asia", "East Africa", "Central America", "Southern Europe", "Australia"][i % 6],
  event: climateEvents[i % climateEvents.length],
  temperature: +(25 + Math.random() * 20).toFixed(1),
  humidity: +(40 + Math.random() * 50).toFixed(1),
  rainfall: +(Math.random() * 300).toFixed(1),
  windSpeed: +(5 + Math.random() * 80).toFixed(1),
  co2: +(380 + i * 0.6 + Math.random() * 10).toFixed(1),
  pressure: +(990 + Math.random() * 30).toFixed(1),
  severity: (["Low", "Medium", "High", "Extreme"] as RiskLevel[])[Math.floor(Math.random() * 4)],
}));

export function generatePrediction(model: string): PredictionResult {
  const event = climateEvents[Math.floor(Math.random() * climateEvents.length)];
  const severities: RiskLevel[] = ["Low", "Medium", "High", "Extreme"];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  const probability = +(60 + Math.random() * 35).toFixed(1);

  const precautionMap: Record<string, string[]> = {
    Flood: ["Move to higher ground", "Store emergency supplies", "Monitor water levels", "Secure important documents"],
    Drought: ["Conserve water resources", "Implement drip irrigation", "Store water reserves", "Monitor crop conditions"],
    Heatwave: ["Stay hydrated", "Avoid outdoor activities 11am-3pm", "Check on vulnerable neighbors", "Use cooling centers"],
    Cyclone: ["Evacuate coastal areas", "Board up windows", "Prepare emergency kit", "Follow official advisories"],
    Storm: ["Stay indoors", "Unplug electronics", "Avoid flooded roads", "Keep emergency lights ready"],
    Wildfire: ["Create defensible space", "Prepare evacuation plan", "Monitor air quality", "Keep N95 masks ready"],
    "Cold Wave": ["Layer clothing", "Insulate water pipes", "Stock heating fuel", "Check on elderly neighbors"],
    Tornado: ["Move to basement or interior room", "Stay away from windows", "Monitor weather alerts", "Have emergency supplies ready"],
  };

  return {
    event,
    severity,
    probability,
    tempRange: [+(20 + Math.random() * 15).toFixed(1), +(30 + Math.random() * 15).toFixed(1)],
    rainfallRange: [+(Math.random() * 50).toFixed(1), +(50 + Math.random() * 250).toFixed(1)],
    precautions: precautionMap[event] || ["Follow local authority guidelines"],
    model,
  };
}

export const yearlyTempTrend = Array.from({ length: 30 }, (_, i) => ({
  year: 1994 + i,
  global: +(14.0 + i * 0.025 + (Math.random() - 0.5) * 0.15).toFixed(2),
  land: +(8.5 + i * 0.035 + (Math.random() - 0.5) * 0.2).toFixed(2),
  ocean: +(16.1 + i * 0.018 + (Math.random() - 0.5) * 0.1).toFixed(2),
}));
