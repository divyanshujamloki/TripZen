import { NextResponse } from 'next/server';
import { getTripBySlug } from '../../../../../lib/mockStore';
import { getAvailableSeats } from '../../../../../lib/utils';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const trip = getTripBySlug(params.slug);
  if (!trip) {
    return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
  }
  return NextResponse.json({
    totalSeats: trip.totalSeats,
    bookedSeats: trip.bookedSeats,
    availableSeats: getAvailableSeats(trip.totalSeats, trip.bookedSeats),
  });
}
