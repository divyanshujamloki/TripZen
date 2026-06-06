import { ItineraryDay } from '../../types/trip';

interface TripItineraryProps {
  itinerary: ItineraryDay[];
}

export default function TripItinerary({ itinerary }: TripItineraryProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {itinerary.map((day) => (
        <div key={day.day} className="tz-card p-5 sm:p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center text-white text-xs sm:text-sm font-medium shrink-0">
              {day.day}
            </div>
            <div>
              <p className="text-[#6e6e73] text-xs uppercase tracking-wider mb-1">Day {day.day}</p>
              <h3 className="text-base sm:text-lg font-medium text-white">{day.title}</h3>
            </div>
          </div>
          <ul className="ml-0 sm:ml-14 space-y-2.5">
            {day.activities.map((activity) => (
              <li key={activity} className="text-sm text-[#a1a1a6] flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-white shrink-0 mt-2" />
                {activity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
