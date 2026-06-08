'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Trip, TripQuestion } from '../../../types/trip';
import { apiJson } from '../../../lib/apiClient';
import TripHero from '../../../components/trip/TripHero';
import TripInclusions from '../../../components/trip/TripInclusions';
import TripItinerary from '../../../components/trip/TripItinerary';
import TripBookingCard from '../../../components/trip/TripBookingCard';
import TripQuestions from '../../../components/trip/TripQuestions';
import Button from '../../../components/ui/Button';

export default function TripDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [questions, setQuestions] = useState<TripQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    Promise.all([
      apiJson<{ trip: Trip }>(`/api/trips/${slug}`),
      apiJson<{ questions: TripQuestion[] }>(`/api/trips/${slug}/questions`),
    ]).then(([tripRes, qRes]) => {
      if (!tripRes.ok || !tripRes.data.trip || tripRes.data.trip.status === 'draft') {
        setMissing(true);
        return;
      }
      setTrip(tripRes.data.trip);
      setQuestions(qRes.data.questions ?? []);
    }).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-white" size={28} />
      </div>
    );
  }

  if (missing || !trip) {
    return (
      <div className="tz-page py-20 text-center">
        <h1 className="text-2xl font-semibold text-white mb-4">Trip not found</h1>
        <Link href="/trips"><Button variant="secondary">Browse trips</Button></Link>
      </div>
    );
  }

  return (
    <div className="tz-page py-8 sm:py-12">
      <div className="tz-container space-y-10 sm:space-y-14">
        <TripHero trip={trip} />

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-10 sm:space-y-14 order-2 lg:order-1">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-5 sm:mb-6">Inclusions</h2>
              <TripInclusions inclusions={trip.inclusions} exclusions={trip.exclusions} />
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-5 sm:mb-6">Itinerary</h2>
              <TripItinerary itinerary={trip.itinerary} />
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-5 sm:mb-6">Q&amp;A</h2>
              <TripQuestions slug={trip.slug} initialQuestions={questions} />
            </section>
          </div>

          <div className="order-1 lg:order-2">
            <TripBookingCard trip={trip} />
          </div>
        </div>
      </div>
    </div>
  );
}
