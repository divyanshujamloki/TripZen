export const BACKEND_URL = process.env.BACKEND_API_URL || 'https://tripzenbackend.onrender.com';

export function backendPath(segments: string[]): string {
  const joined = segments.join('/');
  if (joined === 'auth/signup') return '/api/auth/register';
  return `/api/${joined}`;
}

function idStr(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'object' && value !== null && '_id' in value) {
    return String((value as { _id: unknown })._id);
  }
  return String(value);
}

function stripMongo(obj: Record<string, unknown>): Record<string, unknown> {
  const { _id, __v, ...rest } = obj;
  return { ...rest, id: idStr(_id ?? obj.id) };
}

function normalizeTrip(raw: Record<string, unknown>): Record<string, unknown> {
  const t = stripMongo(raw);
  for (const key of ['startDate', 'endDate', 'createdAt', 'updatedAt'] as const) {
    if (t[key]) t[key] = String(t[key]);
  }
  return t;
}

function normalizeBooking(raw: Record<string, unknown>): Record<string, unknown> {
  const b = { ...raw };
  const tripRef = b.tripId;
  let tripTitle = b.tripTitle;
  let tripSlug = b.tripSlug;

  if (tripRef && typeof tripRef === 'object') {
    const trip = tripRef as Record<string, unknown>;
    tripTitle = tripTitle ?? trip.title;
    tripSlug = tripSlug ?? trip.slug;
    b.tripId = idStr(trip._id ?? trip.id);
  } else if (b.tripId) {
    b.tripId = idStr(b.tripId);
  }

  b.userId = idStr(b.userId);
  const result = stripMongo(b);
  if (tripTitle) result.tripTitle = tripTitle;
  if (tripSlug) result.tripSlug = tripSlug;
  if (result.createdAt) result.createdAt = String(result.createdAt);
  return result;
}

function normalizeQuestion(raw: Record<string, unknown>): Record<string, unknown> {
  const q = { ...raw };
  const tripRef = q.tripId;

  if (tripRef && typeof tripRef === 'object') {
    const trip = tripRef as Record<string, unknown>;
    q.tripSlug = q.tripSlug ?? trip.slug;
    q.tripId = idStr(trip._id ?? trip.id);
  } else if (q.tripId) {
    q.tripId = idStr(q.tripId);
  }

  const result = stripMongo(q);
  if (result.createdAt) result.createdAt = String(result.createdAt);
  return result;
}

export function normalizeResponse(data: unknown): unknown {
  if (data == null || typeof data !== 'object') return data;

  const obj = data as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key === 'trips' && Array.isArray(value)) {
      result.trips = value.map((t) => normalizeTrip(t as Record<string, unknown>));
    } else if (key === 'trip' && value && typeof value === 'object') {
      result.trip = normalizeTrip(value as Record<string, unknown>);
    } else if (key === 'bookings' && Array.isArray(value)) {
      result.bookings = value.map((b) => normalizeBooking(b as Record<string, unknown>));
    } else if (key === 'booking' && value && typeof value === 'object') {
      const booking = normalizeBooking(value as Record<string, unknown>);
      result.booking = booking;
      if (booking.whatsappGroupLink) {
        result.whatsappGroupLink = booking.whatsappGroupLink;
      }
    } else if (key === 'questions' && Array.isArray(value)) {
      result.questions = value.map((q) => normalizeQuestion(q as Record<string, unknown>));
    } else if (key === 'question' && value && typeof value === 'object') {
      result.question = normalizeQuestion(value as Record<string, unknown>);
    } else if (key === 'user' && value && typeof value === 'object') {
      result.user = stripMongo(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export async function backendFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${BACKEND_URL}${path}`, { cache: 'no-store', ...init });
}
