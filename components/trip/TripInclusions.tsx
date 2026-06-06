import { Check, X } from 'lucide-react';

interface TripInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export default function TripInclusions({ inclusions, exclusions }: TripInclusionsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
      <div className="tz-card p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-white mb-4 sm:mb-5">Included</h3>
        <ul className="space-y-3">
          {inclusions.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-[#a1a1a6]">
              <Check size={15} className="text-white shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="tz-card p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-white mb-4 sm:mb-5">Not included</h3>
        <ul className="space-y-3">
          {exclusions.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-[#a1a1a6]">
              <X size={15} className="text-[#6e6e73] shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
