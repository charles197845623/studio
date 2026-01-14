'use client';

import { format } from 'date-fns';
import { Sun, Cloudy, CloudRain, CloudLightning } from 'lucide-react';
import type { Weather, WeatherCondition } from '@/lib/weather-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const weatherIcons: Record<WeatherCondition, React.ReactNode> = {
  sunny: <Sun className="h-6 w-6 text-yellow-500" />,
  cloudy: <Cloudy className="h-6 w-6 text-gray-400" />,
  rainy: <CloudRain className="h-6 w-6 text-blue-400" />,
  thunderstorm: <CloudLightning className="h-6 w-6 text-purple-500" />,
};

export function WeatherOverview({ weather }: { weather: Weather[] }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-headline font-semibold text-center mb-4">
        5-Day Forecast (Mar 13-17, 2026)
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center">
        {weather.map((day) => (
          <div key={day.date} className="rounded-lg p-3 bg-background/80 border">
            <p className="font-semibold font-body text-sm">
              {format(new Date(day.date), 'MMM d')}
            </p>
            <div className="flex justify-center my-2">{weatherIcons[day.condition]}</div>
            <p className="text-xs text-muted-foreground">{day.condition}</p>
            <p className="font-bold text-sm">{day.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}
