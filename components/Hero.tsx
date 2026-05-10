'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-black via-gray-900 to-black">
          {/* Placeholder for background image/video */}
          <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-30"></div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          Discover Your Dream Destination
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-12"
        >
          Luxury travel experiences crafted for the discerning traveler
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-dark rounded-2xl p-2 flex items-center">
            <div className="flex-1 flex items-center space-x-4 px-4">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              <select className="bg-transparent text-white focus:outline-none">
                <option value="">Category</option>
                <option value="luxury">Luxury</option>
                <option value="adventure">Adventure</option>
                <option value="religious">Religious</option>
                <option value="international">International</option>
                <option value="budget">Budget</option>
              </select>
            </div>
            <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              Search
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;