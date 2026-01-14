import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { WeatherOverview } from './weather-overview';
import type { Weather } from '@/lib/weather-data';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface RecommendationCardProps {
  recommendation: string;
  image: string;
  weather: Weather[];
  isBadWeather: boolean;
}

export function RecommendationCard({ recommendation, image, weather, isBadWeather }: RecommendationCardProps) {
  return (
    <Card className="w-full max-w-2xl animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="font-headline text-center text-3xl">Your Personalized Itinerary</CardTitle>
      </CardHeader>
      <CardContent>
        <WeatherOverview weather={weather} />

        {isBadWeather && (
          <Alert variant="destructive" className="mb-6 bg-yellow-100 border-yellow-300 text-yellow-800 [&>svg]:text-yellow-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-headline">Heads Up!</AlertTitle>
            <AlertDescription className="font-body">
              外面下雨，別跟老天過不去，室內才是你的主場。
              <br />
              (It's raining, don't mess with mother nature. Indoors is where you belong!)
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={recommendation}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint="recommendation landscape"
            />
          </div>
          <div>
            <h4 className="font-headline text-xl font-semibold">Recommendation:</h4>
            <p className="font-body text-foreground/80 mt-1">{recommendation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RecommendationCardSkeleton() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
         <div className="h-8 bg-muted rounded-md w-3/4 mx-auto animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="h-6 bg-muted rounded-md w-1/2 mx-auto mb-4 animate-pulse"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-lg p-3 bg-muted h-28 animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded-md w-1/4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
            <div className="h-4 bg-muted rounded-md w-3/4 animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
