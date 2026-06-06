import { NextRequest, NextResponse } from 'next/server';
import { getTrips } from '../../../lib/mockStore';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') ?? undefined;
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : undefined;

  const result = getTrips({ status, limit, page });
  return NextResponse.json(result);
}
