import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../lib/auth';

export async function GET(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ user });
}
