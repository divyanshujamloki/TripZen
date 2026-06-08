'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Trip } from '../../../types/trip';
import { formatPrice, formatDateRange } from '../../../lib/utils';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

export default function AdminTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);

  const load = () => {
    const token = localStorage.getItem('tripzen_token');
    if (!token) return;
    fetch('/api/admin/trips', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setTrips(d.trips ?? []));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this trip?')) return;
    const token = localStorage.getItem('tripzen_token');
    if (!token) return;
    await fetch(`/api/admin/trips/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Trips</h1>
        <Link href="/admin/trips/new"><Button size="sm"><Plus size={16} className="mr-2" /> New trip</Button></Link>
      </div>

      <div className="space-y-3">
        {trips.map((trip) => (
          <div key={trip.id} className="tz-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                <h3 className="font-medium text-white truncate">{trip.title}</h3>
                <Badge status={trip.status === 'upcoming' ? 'upcoming' : trip.status === 'full' ? 'full' : 'draft'} />
              </div>
              <p className="text-sm text-[#a1a1a6]">{trip.location} · {formatDateRange(trip.startDate, trip.endDate)} · {formatPrice(trip.pricePerPerson)}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href={`/admin/trips/${trip.id}/edit`}>
                <Button variant="secondary" size="sm"><Pencil size={14} /></Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(trip.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
