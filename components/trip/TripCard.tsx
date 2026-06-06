'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ChevronRight } from 'lucide-react';
import { Trip } from '../../types/trip';
import { formatPrice, formatDateRange, getAvailableSeats } from '../../lib/utils';
import Badge from '../ui/Badge';

interface TripCardProps {
  trip: Trip;
  index?: number;
}

function getStatusBadge(trip: Trip) {
  const available = getAvailableSeats(trip.totalSeats, trip.bookedSeats);
  if (trip.status === 'full' || available === 0) return 'full' as const;
  if (available <= 5) return 'few-seats' as const;
  return trip.status === 'upcoming' ? 'upcoming' as const : trip.status;
}

export default function TripCard({ trip, index = 0 }: TripCardProps) {
  const available = getAvailableSeats(trip.totalSeats, trip.bookedSeats);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <Link href={`/trips/${trip.slug}`} className="group block tz-card-hover overflow-hidden">
        <div className="relative h-44 sm:h-48 bg-black border-b border-white/[0.08] flex items-end p-4 sm:p-5">
          <div className="absolute inset-0 bg-[url('/trips/rishikesh.jpg')] bg-cover bg-center opacity-[0.15] group-hover:opacity-[0.22] transition-opacity duration-500" />
          <Badge status={getStatusBadge(trip)} />
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-medium text-white mb-3 group-hover:text-[#e8e8ed] transition-colors line-clamp-2">
            {trip.title}
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-[#a1a1a6] mb-5">
            <div className="flex items-center gap-2.5">
              <MapPin size={14} className="shrink-0 text-white" />
              {trip.location}
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar size={14} className="shrink-0 text-white" />
              {formatDateRange(trip.startDate, trip.endDate)}
            </div>
            <div className="flex items-center gap-2.5">
              <Users size={14} className="shrink-0 text-white" />
              {available} seats left
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 tz-divider">
            <span className="text-lg sm:text-xl font-semibold text-white">{formatPrice(trip.pricePerPerson)}</span>
            <span className="text-xs sm:text-sm text-[#a1a1a6] flex items-center gap-0.5 group-hover:text-white transition-colors">
              Learn more <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
