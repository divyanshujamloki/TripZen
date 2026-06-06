import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, updateBooking } from '../../../../lib/mockStore';
import { requireAuth } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { bookingId } = await req.json();
  if (!bookingId) return NextResponse.json({ message: 'bookingId is required' }, { status: 400 });

  const booking = getBookingById(bookingId);
  if (!booking || booking.userId !== user.id) {
    return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
  }

  const updated = updateBooking(bookingId, {
    status: 'paid',
    paymentId: `pay_mock_${Date.now()}`,
  });

  return NextResponse.json({ success: true, booking: updated });
}
