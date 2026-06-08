import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL, backendPath, normalizeResponse } from '../../../lib/backendApi';

export const dynamic = 'force-dynamic';

async function handler(req: NextRequest, { params }: { params: { path?: string[] } }) {
  const segments = params.path ?? [];
  const path = backendPath(segments);
  const url = `${BACKEND_URL}${path}${req.nextUrl.search}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const auth = req.headers.get('authorization');
  if (auth) headers.Authorization = auth;

  let body: string | undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await req.text();
  }

  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body: body || undefined,
      cache: 'no-store',
    });

    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const text = await res.text();
    if (!text) {
      return new NextResponse(null, { status: res.status });
    }

    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      return new NextResponse(text, { status: res.status });
    }

    return NextResponse.json(normalizeResponse(data), { status: res.status });
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach backend server.' },
      { status: 502 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
