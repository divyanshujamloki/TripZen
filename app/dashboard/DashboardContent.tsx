'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Download, MessageCircle, Calendar, Users } from 'lucide-react';
import { RootState } from '../../redux/store';
import { Booking } from '../../types/trip';
import { formatPrice } from '../../lib/utils';
import { apiJson } from '../../lib/apiClient';
import Button from '../../components/ui/Button';

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [whatsappLinks, setWhatsappLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user || !token) {
      router.push('/login?redirect=/dashboard');
      return;
    }

    apiJson<{ bookings: Booking[] }>('/api/bookings', { headers: { Authorization: `Bearer ${token}` } })
      .then(async ({ data }) => {
        setBookings(data.bookings ?? []);
        const links: Record<string, string> = {};
        for (const b of data.bookings ?? []) {
          if (b.status === 'paid' || b.status === 'confirmed') {
            const { data: d } = await apiJson<{ whatsappGroupLink?: string; booking?: { whatsappGroupLink?: string } }>(
              `/api/bookings/${b.id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const link = d.whatsappGroupLink ?? d.booking?.whatsappGroupLink;
            if (link) links[b.id] = link;
          }
        }
        setWhatsappLinks(links);
      })
      .finally(() => setLoading(false));
  }, [user, token, router]);

  const newBookingId = searchParams.get('booking');

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-white" size={28} />
      </div>
    );
  }

  return (
    <div className="tz-page py-10 sm:py-14">
      <div className="tz-container max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-1">Dashboard</h1>
        <p className="text-[#a1a1a6] text-sm sm:text-base mb-8">Welcome, {user?.name}</p>

        {newBookingId && (
          <p className="mb-8 text-sm text-white border border-white/20 rounded-xl px-4 py-3">
            Booking confirmed. Your spot is reserved.
          </p>
        )}

        {user?.role === 'admin' && (
          <Link href="/admin" className="inline-block mb-8">
            <Button variant="secondary" size="sm">Admin panel</Button>
          </Link>
        )}

        <h2 className="text-lg font-medium text-white mb-4">My bookings</h2>

        {bookings.length === 0 ? (
          <div className="tz-card p-8 sm:p-10 text-center">
            <p className="text-[#a1a1a6] mb-6">No bookings yet.</p>
            <Link href="/trips"><Button>Browse trips</Button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="tz-card p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-medium text-white truncate">{b.tripTitle}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs sm:text-sm text-[#a1a1a6]">
                      <span className="flex items-center gap-1.5"><Users size={14} />{b.seats} seat{b.seats > 1 ? 's' : ''}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(b.createdAt).toLocaleDateString('en-IN')}</span>
                    </div>
                    <p className="text-white font-semibold mt-2">{formatPrice(b.totalAmount)}</p>
                    <span className="inline-block mt-2 text-[11px] uppercase tracking-wider text-[#a1a1a6] border border-white/15 rounded-full px-2.5 py-0.5">
                      {b.status}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                    {(b.status === 'paid' || b.status === 'confirmed') && (
                      <>
                        <a href={`/api/bookings/${b.id}/invoice`} target="_blank" rel="noopener noreferrer">
                          <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                            <Download size={14} className="mr-2" /> Invoice
                          </Button>
                        </a>
                        {whatsappLinks[b.id] && (
                          <a href={whatsappLinks[b.id]} target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                              <MessageCircle size={14} className="mr-2" /> WhatsApp
                            </Button>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
