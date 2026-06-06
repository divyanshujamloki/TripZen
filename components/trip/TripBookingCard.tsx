'use client';

import Link from 'next/link';
import { Users } from 'lucide-react';
import { Trip } from '../../types/trip';
import { formatPrice, getAvailableSeats } from '../../lib/utils';
import Button from '../ui/Button';

interface TripBookingCardProps {
  trip: Trip;
}

export default function TripBookingCard({ trip }: TripBookingCardProps) {
  const available = getAvailableSeats(trip.totalSeats, trip.bookedSeats);
  const isFull = available === 0;

  return (
    <div className="tz-card p-5 sm:p-6 lg:sticky lg:top-24">
      <p className="text-[#6e6e73] text-xs sm:text-sm mb-1">From</p>
      <p className="text-2xl sm:text-3xl font-semibold text-white mb-1">{formatPrice(trip.pricePerPerson)}</p>
      <p className="text-[#a1a1a6] text-xs sm:text-sm mb-6">per person</p>

      <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#a1a1a6] mb-6 py-3 px-4 rounded-xl border border-white/[0.08]">
        <Users size={15} className="text-white shrink-0" />
        <span>{available} seats available</span>
      </div>

      {isFull ? (
        <Button disabled className="w-full" variant="secondary">
          Sold Out
        </Button>
      ) : (
        <Link href={`/trips/${trip.slug}/book`} className="block">
          <Button className="w-full">Book Now</Button>
        </Link>
      )}

      <p className="text-[#6e6e73] text-[11px] sm:text-xs text-center mt-4">
        Secure checkout
      </p>
    </div>
  );
}
