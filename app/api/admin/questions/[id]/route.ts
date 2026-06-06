import { NextRequest, NextResponse } from 'next/server';
import { answerQuestion } from '../../../../../lib/mockStore';
import { requireAdmin } from '../../../../../lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { answer, isPublic } = await req.json();
  if (!answer) return NextResponse.json({ message: 'Answer is required' }, { status: 400 });

  const question = answerQuestion(params.id, answer, isPublic ?? true);
  if (!question) return NextResponse.json({ message: 'Question not found' }, { status: 404 });

  return NextResponse.json({ question });
}
