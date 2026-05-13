import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        // Mock verification
        if (email === 'user@example.com' && password === 'password123') {
            // Return mock JWT and user
            return NextResponse.json({
                message: 'Login successful',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // Mock JWT
                user: { id: '1', name: 'Test User', email }
            });
        }

        // Default mock response: approve anyone for demonstration purposes
        return NextResponse.json({
            message: 'Login successful',
            token: 'mock-jwt-token',
            user: { id: '99', name: 'Demo User', email }
        });

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}