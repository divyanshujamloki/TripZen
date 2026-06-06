export type TripStatus = 'draft' | 'upcoming' | 'full' | 'completed' | 'cancelled';
export type BookingStatus = 'pending' | 'paid' | 'confirmed' | 'cancelled';

export interface TripMedia {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  pricePerPerson: number;
  currency: 'INR';
  totalSeats: number;
  bookedSeats: number;
  status: TripStatus;
  description: string;
  coverImage: string;
  gallery: TripMedia[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  whatsappGroupLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TripQuestion {
  id: string;
  tripId: string;
  tripSlug: string;
  userId?: string;
  name: string;
  email: string;
  question: string;
  answer?: string;
  isPublic: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  tripId: string;
  tripSlug: string;
  tripTitle: string;
  seats: number;
  totalAmount: number;
  status: BookingStatus;
  paymentId?: string;
  razorpayOrderId?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
}
