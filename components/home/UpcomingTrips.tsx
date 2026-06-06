'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trip } from '../../types/trip';
import TripCard from '../trip/TripCard';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

export default function UpcomingTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trips?status=upcoming&limit=6')
      .then((r) => r.json())
      .then((data) => setTrips(data.trips ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="tz-section bg-black">
      <div className="tz-container">
        <SectionHeading
          title="Upcoming trips"
          subtitle="Curated group adventures with everything planned — just show up."
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="tz-card h-72 sm:h-80 animate-pulse bg-white/[0.02]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {trips.map((trip, i) => (
              <TripCard key={trip.id} trip={trip} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:mt-14">
          <Link href="/trips">
            <Button variant="secondary">View all trips</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
