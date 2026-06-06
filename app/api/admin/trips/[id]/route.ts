import { NextRequest, NextResponse } from 'next/server';
import { getTripById, updateTrip, deleteTrip } from '../../../../../lib/mockStore';
import { requireAdmin } from '../../../../../lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const trip = updateTrip(params.id, body);
  if (!trip) return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
  return NextResponse.json({ trip });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const deleted = deleteTrip(params.id);
  if (!deleted) return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const trip = getTripById(params.id);
  if (!trip) return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
  return NextResponse.json({ trip });
}
