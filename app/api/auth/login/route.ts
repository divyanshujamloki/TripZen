import { NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '../../../../lib/mockStore';
import { createMockToken } from '../../../../lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password, name, phone } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Admin login
    if (email === 'admin@tripzen.com' && password === 'admin123') {
      const user = findUserByEmail(email) ?? { id: 'admin-1', name: 'Admin', email, phone: phone ?? '', role: 'admin' as const };
      return NextResponse.json({
        message: 'Login successful',
        token: createMockToken(user.id),
        user,
      });
    }

    let user = findUserByEmail(email);
    if (!user) {
      user = createUser({
        name: name ?? email.split('@')[0],
        email,
        phone: phone ?? '',
        role: 'user',
      });
    }

    return NextResponse.json({
      message: 'Login successful',
      token: createMockToken(user.id),
      user,
    });
  } catch {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
