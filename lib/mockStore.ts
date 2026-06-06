import tripsSeed from '../data/trips.json';
import { Trip, TripQuestion, Booking, User } from '../types/trip';

// In-memory store — replace with database when backend is ready
let trips: Trip[] = [...(tripsSeed as Trip[])];
let questions: TripQuestion[] = [
  {
    id: 'q-1',
    tripId: 'trip-1',
    tripSlug: 'rishikesh-adventure-weekend',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    question: 'Is pickup available from Noida?',
    answer: 'Yes! We have pickup points in Noida, Delhi, and Gurgaon. Details shared after booking.',
    isPublic: true,
    createdAt: '2026-01-10T00:00:00.000Z',
  },
];
let bookings: Booking[] = [];
let users: User[] = [
  { id: 'admin-1', name: 'Admin', email: 'admin@tripzen.com', phone: '9876543210', role: 'admin' },
  { id: 'user-1', name: 'Demo User', email: 'user@example.com', phone: '9876543211', role: 'user' },
];

export function getAllTrips(): Trip[] {
  return [...trips];
}

export function getTrips(filters?: { status?: string; limit?: number; page?: number }) {
  let result = [...trips];
  if (filters?.status) {
    result = result.filter((t) => t.status === filters.status);
  } else {
    result = result.filter((t) => t.status !== 'draft');
  }
  const page = filters?.page ?? 1;
  const limit = filters?.limit ?? 20;
  const total = result.length;
  const start = (page - 1) * limit;
  return { trips: result.slice(start, start + limit), total, page };
}

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}

export function getTripById(id: string): Trip | undefined {
  return trips.find((t) => t.id === id);
}

export function createTrip(data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt' | 'bookedSeats'>): Trip {
  const now = new Date().toISOString();
  const trip: Trip = {
    ...data,
    id: `trip-${Date.now()}`,
    bookedSeats: 0,
    createdAt: now,
    updatedAt: now,
  };
  trips.push(trip);
  return trip;
}

export function updateTrip(id: string, data: Partial<Trip>): Trip | undefined {
  const idx = trips.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  trips[idx] = { ...trips[idx], ...data, updatedAt: new Date().toISOString() };
  return trips[idx];
}

export function deleteTrip(id: string): boolean {
  const len = trips.length;
  trips = trips.filter((t) => t.id !== id);
  return trips.length < len;
}

export function getQuestionsBySlug(slug: string): TripQuestion[] {
  return questions.filter((q) => q.tripSlug === slug && q.isPublic && q.answer);
}

export function getAllQuestions(answered?: boolean): TripQuestion[] {
  if (answered === false) return questions.filter((q) => !q.answer);
  if (answered === true) return questions.filter((q) => q.answer);
  return [...questions];
}

export function createQuestion(data: Omit<TripQuestion, 'id' | 'createdAt'>): TripQuestion {
  const q: TripQuestion = { ...data, id: `q-${Date.now()}`, createdAt: new Date().toISOString() };
  questions.push(q);
  return q;
}

export function answerQuestion(id: string, answer: string, isPublic = true): TripQuestion | undefined {
  const idx = questions.findIndex((q) => q.id === id);
  if (idx === -1) return undefined;
  questions[idx] = { ...questions[idx], answer, isPublic };
  return questions[idx];
}

export function getBookings(userId?: string): Booking[] {
  if (userId) return bookings.filter((b) => b.userId === userId);
  return [...bookings];
}

export function getBookingById(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}

export function createBooking(data: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const booking: Booking = { ...data, id: `booking-${Date.now()}`, createdAt: new Date().toISOString() };
  bookings.push(booking);
  const trip = getTripById(data.tripId);
  if (trip) {
    updateTrip(trip.id, { bookedSeats: trip.bookedSeats + data.seats });
  }
  return booking;
}

export function updateBooking(id: string, data: Partial<Booking>): Booking | undefined {
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return undefined;
  bookings[idx] = { ...bookings[idx], ...data };
  return bookings[idx];
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function createUser(data: Omit<User, 'id'>): User {
  const user: User = { ...data, id: `user-${Date.now()}` };
  users.push(user);
  return user;
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}
