'use client';

import Hero from '../components/Hero';
import UpcomingTrips from '../components/home/UpcomingTrips';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <div className="tz-page">
      <Hero />
      <UpcomingTrips />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
