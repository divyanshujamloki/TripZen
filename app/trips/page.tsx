'use client';

import { useEffect, useState } from 'react';
import { Trip } from '../../types/trip';
import { apiJson } from '../../lib/apiClient';
import TripCard from '../../components/trip/TripCard';
import SectionHeading from '../../components/ui/SectionHeading';

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiJson<{ trips: Trip[] }>('/api/trips?status=upcoming')
      .then(({ data }) => setTrips(data.trips ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="tz-page py-10 sm:py-14">
      <div className="tz-container">
        <SectionHeading
          title="Upcoming trips"
          subtitle="Affordable group adventures — all details upfront."
        />
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="tz-card h-72 sm:h-80 animate-pulse bg-white/[0.02]" />
            ))}
          </div>
        ) : trips.length === 0 ? (
          <p className="text-center text-[#a1a1a6]">No upcoming trips right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {trips.map((trip, i) => (
              <TripCard key={trip.id} trip={trip} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
