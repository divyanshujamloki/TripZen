import { MapPin, Calendar, Users } from 'lucide-react';
import { Trip } from '../../types/trip';
import { formatPrice, formatDateRange, getAvailableSeats } from '../../lib/utils';
import Badge from '../ui/Badge';

interface TripHeroProps {
  trip: Trip;
}

export default function TripHero({ trip }: TripHeroProps) {
  const available = getAvailableSeats(trip.totalSeats, trip.bookedSeats);
  const badgeStatus = available === 0 ? 'full' : available <= 5 ? 'few-seats' : 'upcoming';

  return (
    <div className="tz-card overflow-hidden">
      <div className="p-6 sm:p-8 md:p-10 lg:p-12">
        <Badge status={badgeStatus} />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mt-5 mb-4 text-balance">
          {trip.title}
        </h1>
        <p className="text-[#a1a1a6] text-sm sm:text-base max-w-2xl mb-8 leading-relaxed">{trip.description}</p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-8 text-sm text-[#a1a1a6]">
          <div className="flex items-center gap-2.5">
            <MapPin size={16} className="text-white shrink-0" />
            {trip.location}
          </div>
          <div className="flex items-center gap-2.5">
            <Calendar size={16} className="text-white shrink-0" />
            {formatDateRange(trip.startDate, trip.endDate)}
          </div>
          <div className="flex items-center gap-2.5">
            <Users size={16} className="text-white shrink-0" />
            {available} of {trip.totalSeats} seats available
          </div>
        </div>
        <div className="mt-8 pt-8 tz-divider">
          <span className="text-2xl sm:text-3xl font-semibold text-white">{formatPrice(trip.pricePerPerson)}</span>
          <span className="text-[#a1a1a6] text-sm sm:text-base ml-2">per person</span>
        </div>
      </div>
    </div>
  );
}
