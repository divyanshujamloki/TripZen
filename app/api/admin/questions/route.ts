import { NextRequest, NextResponse } from 'next/server';
import { getAllQuestions } from '../../../../lib/mockStore';
import { requireAdmin } from '../../../../lib/auth';

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const answeredParam = searchParams.get('answered');
  const answered = answeredParam === 'false' ? false : answeredParam === 'true' ? true : undefined;

  const questions = getAllQuestions(answered);
  return NextResponse.json({ questions });
}
