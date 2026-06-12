'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Loader2, ArrowLeft } from 'lucide-react';
import { RootState } from '../../../../redux/store';
import { Trip } from '../../../../types/trip';
import { formatPrice, getAvailableSeats } from '../../../../lib/utils';
import { apiJson } from '../../../../lib/apiClient';
import { payWithRazorpay, CreateOrderResponse } from '../../../../lib/razorpay';
import Button from '../../../../components/ui/Button';
import { FormErrorAlert } from '../../../../components/ui/FieldError';

export default function BookTripPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    apiJson<{ trip: Trip }>(`/api/trips/${params.slug}`)
      .then(({ data }) => setTrip(data.trip));
  }, [params.slug]);

  if (!trip) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-white" size={28} />
      </div>
    );
  }

  const available = getAvailableSeats(trip.totalSeats, trip.bookedSeats);
  const total = trip.pricePerPerson * seats;

  const handleBook = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !token) {
      router.push(`/login?redirect=/trips/${params.slug}/book`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Create a new booking (never reuse old order_mock_ bookings)
      const { ok: bookingOk, data: bookingData } = await apiJson<{
        message?: string;
        booking: { id: string };
      }>('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tripId: trip.id, seats }),
      });
      if (!bookingOk) throw new Error(bookingData.message);

      const bookingId = bookingData.booking.id;

      // Step 2: Create Razorpay order — expect order_Nxxx, not order_mock_
      const { ok: orderOk, data: orderData } = await apiJson<CreateOrderResponse & { message?: string }>(
        '/api/payments/create-order',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ bookingId }),
        }
      );
      if (!orderOk) throw new Error(orderData.message);

      // Step 3: Open Razorpay Checkout (or mock only in local dev)
      await payWithRazorpay(orderData, bookingId, token, {
        description: trip.title,
        onDismiss: () => setLoading(false),
      });

      router.push(`/dashboard?booking=${bookingId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tz-page py-10 sm:py-14">
      <div className="tz-container max-w-lg">
        <Link href={`/trips/${params.slug}`} className="inline-flex items-center gap-2 text-[#a1a1a6] hover:text-white mb-8 text-sm transition-colors">
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="tz-card p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">Book your spot</h1>
          <p className="text-[#a1a1a6] text-sm sm:text-base mb-6">{trip.title}</p>

          {!user && (
            <p className="mb-6 text-sm text-[#a1a1a6] border border-white/[0.12] rounded-xl px-4 py-3">
              <Link href={`/login?redirect=/trips/${params.slug}/book`} className="text-white underline">Sign in</Link>
              {' '}or{' '}
              <Link href="/register" className="text-white underline">create an account</Link> to book.
            </p>
          )}

          <form onSubmit={handleBook} className="space-y-6">
            <div>
              <label className="tz-label">Seats</label>
              <select value={seats} onChange={(e) => setSeats(Number(e.target.value))} className="tz-input">
                {Array.from({ length: Math.min(available, 5) }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n} className="bg-black">{n} seat{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div className="rounded-xl border border-white/[0.12] p-4 space-y-2">
              <div className="flex justify-between text-sm text-[#a1a1a6]">
                <span>{formatPrice(trip.pricePerPerson)} × {seats}</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between font-semibold text-white pt-2 tz-divider">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {error && <FormErrorAlert message={error} />}

            <Button type="submit" disabled={loading || available === 0} className="w-full">
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'Pay & confirm booking'}
            </Button>

            <p className="text-[#6e6e73] text-xs text-center">Secure payment via Razorpay</p>
          </form>
        </div>
      </div>
    </div>
  );
}
