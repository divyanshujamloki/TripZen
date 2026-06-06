import { NextRequest, NextResponse } from 'next/server';
import { getAllTrips, createTrip } from '../../../../lib/mockStore';
import { requireAdmin } from '../../../../lib/auth';
import { slugify } from '../../../../lib/utils';
import { Trip } from '../../../../types/trip';

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const all = getAllTrips();
  const page = 1;
  const limit = 100;
  return NextResponse.json({ trips: all, total: all.length, page });
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || slugify(body.title);

  const trip = createTrip({
    slug,
    title: body.title,
    location: body.location,
    startDate: body.startDate,
    endDate: body.endDate,
    pricePerPerson: body.pricePerPerson,
    currency: 'INR',
    totalSeats: body.totalSeats,
    status: body.status ?? 'draft',
    description: body.description,
    coverImage: body.coverImage ?? '/trips/default.jpg',
    gallery: body.gallery ?? [],
    inclusions: body.inclusions ?? [],
    exclusions: body.exclusions ?? [],
    itinerary: body.itinerary ?? [],
    whatsappGroupLink: body.whatsappGroupLink,
  } as Omit<Trip, 'id' | 'createdAt' | 'updatedAt' | 'bookedSeats'>);

  return NextResponse.json({ trip }, { status: 201 });
}
