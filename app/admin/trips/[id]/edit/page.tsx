'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Trip } from '../../../../../types/trip';
import TripForm from '../../../../../components/admin/TripForm';

export default function EditTripPage({ params }: { params: { id: string } }) {
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    fetch(`/api/admin/trips/${params.id}`)
      .then((r) => r.json())
      .then((d) => setTrip(d.trip));
  }, [params.id]);

  if (!trip) {
    return <Loader2 className="animate-spin text-white" size={28} />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Edit Trip</h1>
      <TripForm initial={trip} tripId={trip.id} />
    </div>
  );
}
