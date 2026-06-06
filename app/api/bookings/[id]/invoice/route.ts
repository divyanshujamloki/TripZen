import { NextRequest, NextResponse } from 'next/server';
import { getBookingById } from '../../../../../lib/mockStore';
import { requireAuth } from '../../../../../lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const booking = getBookingById(params.id);
  if (!booking) return NextResponse.json({ message: 'Booking not found' }, { status: 404 });

  if (user.role !== 'admin' && booking.userId !== user.id) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  if (booking.status !== 'paid' && booking.status !== 'confirmed') {
    return NextResponse.json({ message: 'Invoice available after payment' }, { status: 400 });
  }

  // Mock invoice response — real backend generates PDF
  return NextResponse.json({
    invoice: {
      id: `INV-${booking.id}`,
      bookingId: booking.id,
      tripTitle: booking.tripTitle,
      seats: booking.seats,
      totalAmount: booking.totalAmount,
      currency: 'INR',
      date: booking.createdAt,
      downloadUrl: `/api/bookings/${booking.id}/invoice`,
    },
  });
}
