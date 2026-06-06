import { NextResponse } from 'next/server';
import { getTripBySlug } from '../../../../lib/mockStore';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const trip = getTripBySlug(params.slug);
  if (!trip) {
    return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
  }
  return NextResponse.json({ trip });
}
