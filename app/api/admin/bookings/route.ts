import { NextRequest, NextResponse } from 'next/server';
import { getBookings } from '../../../../lib/mockStore';
import { requireAdmin } from '../../../../lib/auth';

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const bookings = getBookings();
  return NextResponse.json({ bookings });
}
