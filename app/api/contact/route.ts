import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Example payload extraction
        const {
            fullName, email, phone, destination, travelDate,
            travelers, subject, message, preferredContactMethod
        } = body;

        // Basic validation
        if (!fullName || !email || !message) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // In a real application, you would send an email using Resend, SendGrid, etc.
        // or store this query in a database like MongoDB/Prisma here.

        // For now, simulate network delay and successful response
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return NextResponse.json({
            success: true,
            message: 'Inquiry received successfully!'
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: 'Internal server error while processing the request.' },
            { status: 500 }
        );
    }
}
