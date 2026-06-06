'use client';

import { useEffect, useState } from 'react';
import { Booking } from '../../../types/trip';
import { formatPrice } from '../../../lib/utils';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('tripzen_token') ?? 'mock-token-admin-1';
    fetch('/api/admin/bookings', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setBookings(d.bookings ?? []));
  }, []);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-8">Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-[#a1a1a6]">No bookings yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="tz-card p-4 sm:p-5">
              <h3 className="font-medium text-white">{b.tripTitle}</h3>
              <p className="text-sm text-[#a1a1a6] mt-1">{b.seats} seats · {formatPrice(b.totalAmount)}</p>
              <p className="text-xs text-[#6e6e73] mt-1">{new Date(b.createdAt).toLocaleString('en-IN')} · {b.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
