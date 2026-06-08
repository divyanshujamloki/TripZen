'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Map, Users, MessageCircle, Plus } from 'lucide-react';
import { Trip, Booking, TripQuestion } from '../../types/trip';
import { apiJson } from '../../lib/apiClient';
import Button from '../../components/ui/Button';

export default function AdminDashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [questions, setQuestions] = useState<TripQuestion[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('tripzen_token');
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      apiJson<{ trips: Trip[] }>('/api/admin/trips', { headers }),
      apiJson<{ bookings: Booking[] }>('/api/admin/bookings', { headers }),
      apiJson<{ questions: TripQuestion[] }>('/api/admin/questions?answered=false', { headers }),
    ]).then(([t, b, q]) => {
      setTrips(t.data.trips ?? []);
      setBookings(b.data.bookings ?? []);
      setQuestions(q.data.questions ?? []);
    });
  }, []);

  const stats = [
    { label: 'Active trips', value: trips.filter((t) => t.status === 'upcoming').length, icon: Map, href: '/admin/trips' },
    { label: 'Bookings', value: bookings.length, icon: Users, href: '/admin/bookings' },
    { label: 'Pending questions', value: questions.length, icon: MessageCircle, href: '/admin/questions' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Dashboard</h1>
        <Link href="/admin/trips/new"><Button size="sm"><Plus size={16} className="mr-2" /> New trip</Button></Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="tz-card-hover p-5 sm:p-6 block">
            <Icon size={20} className="text-white mb-3" />
            <p className="text-2xl sm:text-3xl font-semibold text-white">{value}</p>
            <p className="text-[#a1a1a6] text-sm mt-1">{label}</p>
          </Link>
        ))}
      </div>

      <div className="tz-card p-5 sm:p-6">
        <p className="text-[#a1a1a6] text-sm">
          Demo admin: <span className="text-white">admin@tripzen.com</span> / <span className="text-white">admin123</span>
        </p>
      </div>
    </div>
  );
}
