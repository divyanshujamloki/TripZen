'use client';

import { motion } from 'framer-motion';
import { Search, CreditCard, Users, MessageCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const steps = [
  { icon: Search, title: 'Browse', desc: 'Explore trips with full itinerary, pricing, and seat availability.' },
  { icon: CreditCard, title: 'Book', desc: 'Reserve your seat and pay securely in minutes.' },
  { icon: Users, title: 'Connect', desc: 'Join the group and get your trip details instantly.' },
  { icon: MessageCircle, title: 'Go', desc: 'Show up and enjoy — your coordinator handles the rest.' },
];

export default function HowItWorks() {
  return (
    <section className="tz-section border-t border-white/[0.08] bg-black">
      <div className="tz-container">
        <SectionHeading title="How it works" subtitle="Simple from start to finish." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="tz-card p-5 sm:p-6"
            >
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-4">
                <step.icon size={18} className="text-white" />
              </div>
              <h3 className="font-medium text-white mb-2 text-sm sm:text-base">{step.title}</h3>
              <p className="text-[#a1a1a6] text-xs sm:text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
