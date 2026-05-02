import { supabase } from "@/integrations/supabase/client";

export interface WeatherData {
  location: string;
  temperature: string;
  humidity: string;
  rainfall: string;
  windSpeed: string;
  co2: string;
  pressure: string;
  description: string;
  feelsLike: string;
  visibility: string | null;
}

export async function fetchWeatherData(location: string): Promise<WeatherData> {
  const { data, error } = await supabase.functions.invoke('get-weather', {
    body: { location },
  });

  if (error) {
    throw new Error(error.message || 'Failed to fetch weather data');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data as WeatherData;
}
