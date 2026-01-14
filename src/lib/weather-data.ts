export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'thunderstorm';

export interface Weather {
  date: string;
  condition: WeatherCondition;
  temp: number; // in Celsius
}

export const weatherForecast: Weather[] = [
  { date: '2026-03-13', condition: 'sunny', temp: 22 },
  { date: '2026-03-14', condition: 'cloudy', temp: 20 },
  { date: '2026-03-15', condition: 'rainy', temp: 18 },
  { date: '2026-03-16', condition: 'sunny', temp: 24 },
  { date: '2026-03-17', condition: 'thunderstorm', temp: 17 },
];
