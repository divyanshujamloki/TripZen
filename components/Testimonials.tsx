'use client';

import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';

const testimonials = [
  {
    id: '1',
    name: 'Priya Mehta',
    location: 'Delhi',
    comment: 'Rishikesh trip was amazing. Everything was organized — transport, food, rafting. Best value for money.',
  },
  {
    id: '2',
    name: 'Arjun Singh',
    location: 'Gurgaon',
    comment: 'Booked Manali with friends. Transparent pricing, no hidden costs. The group chat made coordination easy.',
  },
  {
    id: '3',
    name: 'Neha Kapoor',
    location: 'Noida',
    comment: 'My first group trip and TripZen made it seamless. The coordinator was helpful throughout.',
  },
];

export default function Testimonials() {
  return (
    <section className="tz-section border-t border-white/[0.08] bg-black">
      <div className="tz-container">
        <SectionHeading title="What travelers say" subtitle="Real stories from recent trips." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="tz-card p-6 sm:p-8"
            >
              <p className="text-[#a1a1a6] text-sm sm:text-base leading-relaxed mb-6">&ldquo;{t.comment}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 tz-divider">
                <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white text-sm font-medium">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-[#6e6e73] text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
