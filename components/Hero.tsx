'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Button from './ui/Button';

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-4rem)] flex items-center justify-center bg-black overflow-hidden">
      <motion.div
        className="relative z-10 tz-container text-center py-16 sm:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#a1a1a6] mb-6 sm:mb-8"
        >
          Group trips · From ₹1,500
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-5 sm:mb-6 leading-[1.05] text-balance"
        >
          Travel together.
          <br />
          <span className="text-[#a1a1a6]">Plan less.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl text-[#a1a1a6] mb-10 sm:mb-12 max-w-xl mx-auto leading-relaxed text-balance"
        >
          Upcoming group adventures with full itinerary, inclusions, and pricing — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link href="/trips" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-1">
              Browse Trips <ChevronRight size={18} />
            </Button>
          </Link>
          <Link href="/register" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Create Account
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
