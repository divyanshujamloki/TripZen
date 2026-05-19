'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100dvh-5rem)] flex items-center justify-center overflow-x-hidden py-12 sm:py-16">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-black via-gray-900 to-black">
          <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-30" />
        </div>
      </div>

      <motion.div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          Discover Your Dream Destination
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 px-1"
        >
          Luxury travel experiences crafted for the discerning traveler
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-2xl mx-auto"
        >
          <div className="glass-dark rounded-2xl p-2 flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
            <div className="flex flex-col gap-2 sm:flex-1 sm:flex-row sm:items-center sm:gap-0 sm:min-w-0">
              <div className="flex items-center gap-3 px-3 py-2 sm:px-4 sm:flex-1 sm:min-w-0">
                <Search className="shrink-0 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full min-w-0 flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
                />
              </div>
              <select className="w-full border-t border-white/10 bg-transparent px-3 py-2 text-white focus:outline-none text-sm sm:w-auto sm:border-t-0 sm:border-l sm:border-white/10 sm:px-4 sm:py-0 sm:shrink-0">
                <option value="">Category</option>
                <option value="luxury">Luxury</option>
                <option value="adventure">Adventure</option>
                <option value="religious">Religious</option>
                <option value="international">International</option>
                <option value="budget">Budget</option>
              </select>
            </div>
            <button
              type="button"
              className="w-full shrink-0 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-gray-200 sm:w-auto sm:px-8"
            >
              Search
            </button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
