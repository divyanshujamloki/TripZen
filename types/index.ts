export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  category: 'luxury' | 'adventure' | 'religious' | 'international' | 'budget';
}

export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  description: string;
  price: number;
  duration: string;
  images: string[];
  rating: number;
  reviews: Review[];
  category: string;
  itinerary: string[];
  inclusions: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  guests: number;
  totalPrice: number;
}

export interface WishlistItem {
  id: string;
  userId: string;
  tourId: string;
}