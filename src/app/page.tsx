import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { WeatherGoClient } from '@/app/components/weather-go-client';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="bg-background">
      <main className="relative min-h-screen w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-start min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-white shadow-lg">
              WeatherGo Navigator
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-200 font-body">
              氣象導航員
            </p>
            <p className="mt-2 max-w-lg mx-auto text-base text-gray-300 font-body">
              Eliminate travel decision fatigue. Get personalized suggestions based on weather and your style for your trip on Mar 13-17, 2026.
            </p>
          </div>
          <WeatherGoClient />
        </div>
      </main>
    </div>
  );
}
