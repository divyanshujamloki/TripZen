import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, phone, password } = body;

        if (!fullName || !email || !password) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Mock validation logic
        if (password.length < 8) {
            return NextResponse.json({ message: 'Password must be at least 8 characters long' }, { status: 400 });
        }

        // Mock success response
        return NextResponse.json({
            message: 'User registered successfully',
            token: 'mock-jwt-token-new-user',
            user: { id: Math.random().toString(36).substring(7), name: fullName, email }
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}