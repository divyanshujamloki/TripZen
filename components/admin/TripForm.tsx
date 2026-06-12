'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Trip, ItineraryDay } from '../../types/trip';
import { slugify, toDateInput } from '../../lib/utils';
import { apiJson } from '../../lib/apiClient';
import Button from '../ui/Button';
import { FormErrorAlert } from '../ui/FieldError';
import CoverImageUpload from './CoverImageUpload';
import ItineraryEditor, { cleanItineraryForSubmit, normalizeItinerary } from './ItineraryEditor';

interface TripFormProps {
  initial?: Partial<Trip>;
  tripId?: string;
}

export default function TripForm({ initial, tripId }: TripFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState(initial?.title ?? '');
  const [location, setLocation] = useState(initial?.location ?? '');
  const [startDate, setStartDate] = useState(toDateInput(initial?.startDate));
  const [endDate, setEndDate] = useState(toDateInput(initial?.endDate));
  const [pricePerPerson, setPricePerPerson] = useState(initial?.pricePerPerson ?? 1500);
  const [totalSeats, setTotalSeats] = useState(initial?.totalSeats ?? 40);
  const [status, setStatus] = useState(initial?.status ?? 'draft');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [inclusions, setInclusions] = useState((initial?.inclusions ?? []).join('\n'));
  const [exclusions, setExclusions] = useState((initial?.exclusions ?? []).join('\n'));
  const [whatsappGroupLink, setWhatsappGroupLink] = useState(initial?.whatsappGroupLink ?? '');
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? '');
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(() => normalizeItinerary(initial?.itinerary));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanedItinerary = cleanItineraryForSubmit(itinerary);
    if (cleanedItinerary.length === 0) {
      setError('Add at least one itinerary day');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('tripzen_token');
    if (!token) {
      setError('Please sign in as admin');
      setLoading(false);
      return;
    }

    const body: Record<string, unknown> = {
      title,
      location,
      startDate,
      endDate,
      pricePerPerson: Number(pricePerPerson),
      totalSeats: Number(totalSeats),
      status,
      description,
      inclusions: inclusions.split('\n').filter(Boolean),
      exclusions: exclusions.split('\n').filter(Boolean),
      itinerary: cleanedItinerary,
      whatsappGroupLink,
      coverImage: coverImage || '/trips/rishikesh.jpg',
    };

    if (!tripId) {
      body.slug = slugify(title);
    }

    try {
      const path = tripId ? `/api/admin/trips/${tripId}` : '/api/admin/trips';
      const { ok, data } = await apiJson<{ message?: string }>(path, {
        method: tripId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!ok) throw new Error(data.message);
      router.push('/admin/trips');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'tz-input w-full';

  return (
    <form onSubmit={handleSubmit} className="tz-card p-6 space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Title</label>
          <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Location</label>
          <input className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Start Date</label>
          <input type="date" className={inputClass} value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">End Date</label>
          <input type="date" className={inputClass} value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Price (INR)</label>
          <input type="number" className={inputClass} value={pricePerPerson} onChange={(e) => setPricePerPerson(Number(e.target.value))} required />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Total Seats</label>
          <input type="number" className={inputClass} value={totalSeats} onChange={(e) => setTotalSeats(Number(e.target.value))} required />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Status</label>
          <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value as Trip['status'])}>
            <option value="draft">Draft</option>
            <option value="upcoming">Upcoming</option>
            <option value="full">Full</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">WhatsApp Group Link</label>
          <input className={inputClass} value={whatsappGroupLink} onChange={(e) => setWhatsappGroupLink(e.target.value)} />
        </div>
      </div>

      <CoverImageUpload value={coverImage} onChange={setCoverImage} tripId={tripId} />

      <div>
        <label className="block text-sm text-gray-400 mb-1">Description</label>
        <textarea className={`${inputClass} resize-none`} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Inclusions (one per line)</label>
          <textarea className={`${inputClass} resize-none font-mono text-sm`} rows={6} value={inclusions} onChange={(e) => setInclusions(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Exclusions (one per line)</label>
          <textarea className={`${inputClass} resize-none font-mono text-sm`} rows={6} value={exclusions} onChange={(e) => setExclusions(e.target.value)} />
        </div>
      </div>

      <ItineraryEditor value={itinerary} onChange={setItinerary} />

      {error && <FormErrorAlert message={error} />}

      <Button type="submit" disabled={loading}>
        {loading ? <Loader2 size={18} className="animate-spin" /> : tripId ? 'Update Trip' : 'Create Trip'}
      </Button>
    </form>
  );
}
