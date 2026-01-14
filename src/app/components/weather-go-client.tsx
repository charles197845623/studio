'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendation, type FormState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Loader2, Send } from 'lucide-react';
import { ArtsyIcon, DiverseIcon, FemaleIcon, FoodieIcon, MaleIcon, OutdoorIcon } from './icons';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { RecommendationCard, RecommendationCardSkeleton } from './recommendation-card';

const initialState: FormState = {
  result: null,
  error: null,
};

const genderOptions = [
  { id: 'male', label: 'Male', icon: MaleIcon },
  { id: 'female', label: 'Female', icon: FemaleIcon },
  { id: 'diverse', label: 'Diverse', icon: DiverseIcon },
];

const personalityOptions = [
  { id: 'outdoor', label: 'Outdoor & Active', icon: OutdoorIcon },
  { id: 'indoor', label: 'Artsy & Introverted', icon: ArtsyIcon },
  { id: 'foodie', label: 'Foodie & Chill', icon: FoodieIcon },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-headline text-lg" size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          Get Recommendation
          <Send className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
}

export function WeatherGoClient() {
  const [state, formAction] = useFormState(getRecommendation, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  const { pending } = useFormStatus();

  return (
    <div className="w-full max-w-2xl mt-8">
      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">Tell Us About Yourself</CardTitle>
            <CardDescription className="font-body text-center">
              Select your gender and personality to get a tailored suggestion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <Label className="text-lg font-headline">Gender</Label>
              <RadioGroup name="gender" required className="grid grid-cols-3 gap-4">
                {genderOptions.map((option) => (
                  <div key={option.id}>
                    <RadioGroupItem value={option.id} id={`gender-${option.id}`} className="sr-only" />
                    <Label
                      htmlFor={`gender-${option.id}`}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has(:checked)]:border-primary"
                    >
                      <option.icon className="mb-3 h-6 w-6" />
                      <span className="font-body">{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-headline">Personality</Label>
              <RadioGroup name="personality" required className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {personalityOptions.map((option) => (
                   <div key={option.id}>
                    <RadioGroupItem value={option.id} id={`personality-${option.id}`} className="sr-only" />
                    <Label
                      htmlFor={`personality-${option.id}`}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has(:checked)]:border-primary h-full"
                    >
                      <option.icon className="mb-3 h-6 w-6" />
                      <span className="font-body text-center">{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <SubmitButton />
          </CardContent>
        </Card>
      </form>
      
      <div className="mt-8">
        {pending && <RecommendationCardSkeleton />}
        {!pending && state.result && (
          <RecommendationCard
            recommendation={state.result.recommendation}
            image={state.result.image}
            weather={state.result.weather}
            isBadWeather={state.result.isBadWeather}
          />
        )}
      </div>
    </div>
  );
}
