import { NextRequest, NextResponse } from 'next/server';
import { getBookings, createBooking, getTripById } from '../../../lib/mockStore';
import { requireAuth } from '../../../lib/auth';
import { getAvailableSeats } from '../../../lib/utils';

export async function GET(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const bookings = getBookings(user.id);
  return NextResponse.json({ bookings });
}

export async function POST(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { tripId, seats } = await req.json();
  if (!tripId || !seats || seats < 1) {
    return NextResponse.json({ message: 'tripId and seats are required' }, { status: 400 });
  }

  const trip = getTripById(tripId);
  if (!trip) return NextResponse.json({ message: 'Trip not found' }, { status: 404 });

  const available = getAvailableSeats(trip.totalSeats, trip.bookedSeats);
  if (seats > available) {
    return NextResponse.json({ message: 'Not enough seats available' }, { status: 400 });
  }

  const booking = createBooking({
    userId: user.id,
    tripId: trip.id,
    tripSlug: trip.slug,
    tripTitle: trip.title,
    seats,
    totalAmount: trip.pricePerPerson * seats,
    status: 'pending',
    razorpayOrderId: `order_mock_${Date.now()}`,
  });

  return NextResponse.json({ booking, razorpayOrderId: booking.razorpayOrderId }, { status: 201 });
}
