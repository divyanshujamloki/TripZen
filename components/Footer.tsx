import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-black text-white mt-auto">
      <div className="tz-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          <div>
            <h3 className="text-lg font-semibold tracking-tight mb-4">TripZen</h3>
            <p className="text-[#a1a1a6] text-sm leading-relaxed max-w-xs">
              Affordable group trips across India. Full itinerary, transparent pricing, effortless booking.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/trips" className="text-[#a1a1a6] hover:text-white transition-colors">Upcoming Trips</Link></li>
              <li><Link href="/dashboard" className="text-[#a1a1a6] hover:text-white transition-colors">My Dashboard</Link></li>
              <li><Link href="/contact" className="text-[#a1a1a6] hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-[#a1a1a6]">
              <li className="flex items-center gap-2.5"><MapPin size={14} className="shrink-0 text-white" /> Delhi, India</li>
              <li className="flex items-center gap-2.5"><Mail size={14} className="shrink-0 text-white" /> hello@tripzen.com</li>
              <li className="flex items-center gap-2.5"><Phone size={14} className="shrink-0 text-white" /> +91 98765 43210</li>
            </ul>
          </div>
        </div>

        <div className="tz-divider mt-10 sm:mt-12 pt-8 text-center text-[#6e6e73] text-xs sm:text-sm">
          <p>Copyright © 2026 TripZen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
