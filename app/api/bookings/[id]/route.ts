import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, getTripById } from '../../../../lib/mockStore';
import { requireAuth, requireAdmin } from '../../../../lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const booking = getBookingById(params.id);
  if (!booking) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });

  if (user.role !== 'admin' && booking.userId !== user.id) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const trip = getTripById(booking.tripId);
  const response: Record<string, unknown> = { booking, trip };

  if (booking.status === 'paid' || booking.status === 'confirmed') {
    response.whatsappGroupLink = trip?.whatsappGroupLink;
  }

  return NextResponse.json(response);
}
