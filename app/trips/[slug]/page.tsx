import { notFound } from 'next/navigation';
import { getTripBySlug, getQuestionsBySlug } from '../../../lib/mockStore';
import TripHero from '../../../components/trip/TripHero';
import TripInclusions from '../../../components/trip/TripInclusions';
import TripItinerary from '../../../components/trip/TripItinerary';
import TripBookingCard from '../../../components/trip/TripBookingCard';
import TripQuestions from '../../../components/trip/TripQuestions';

export default function TripDetailPage({ params }: { params: { slug: string } }) {
  const trip = getTripBySlug(params.slug);
  if (!trip || trip.status === 'draft') notFound();

  const questions = getQuestionsBySlug(params.slug);

  return (
    <div className="tz-page py-8 sm:py-12">
      <div className="tz-container space-y-10 sm:space-y-14">
        <TripHero trip={trip} />

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-10 sm:space-y-14 order-2 lg:order-1">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-5 sm:mb-6">Inclusions</h2>
              <TripInclusions inclusions={trip.inclusions} exclusions={trip.exclusions} />
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-5 sm:mb-6">Itinerary</h2>
              <TripItinerary itinerary={trip.itinerary} />
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-5 sm:mb-6">Q&amp;A</h2>
              <TripQuestions slug={trip.slug} initialQuestions={questions} />
            </section>
          </div>

          <div className="order-1 lg:order-2">
            <TripBookingCard trip={trip} />
          </div>
        </div>
      </div>
    </div>
  );
}
