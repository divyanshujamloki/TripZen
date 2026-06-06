import { NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '../../../../lib/mockStore';
import { createMockToken } from '../../../../lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
    }

    if (findUserByEmail(email)) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    const user = createUser({ name, email, phone: phone ?? '', role: 'user' });

    return NextResponse.json({
      message: 'Registration successful',
      token: createMockToken(user.id),
      user,
    }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
