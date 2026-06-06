import { NextRequest, NextResponse } from 'next/server';
import { getQuestionsBySlug, createQuestion, getTripBySlug } from '../../../../../lib/mockStore';

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const questions = getQuestionsBySlug(params.slug);
  return NextResponse.json({ questions });
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const trip = getTripBySlug(params.slug);
  if (!trip) {
    return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
  }

  const { name, email, question } = await req.json();
  if (!name || !email || !question) {
    return NextResponse.json({ message: 'Name, email, and question are required' }, { status: 400 });
  }

  const created = createQuestion({
    tripId: trip.id,
    tripSlug: trip.slug,
    name,
    email,
    question,
    isPublic: true,
  });

  return NextResponse.json({ question: created }, { status: 201 });
}
