'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

const destinations = [
  {
    id: '1',
    name: 'Paris, France',
    image: '/paris.jpg',
    rating: 4.8,
    description: 'City of Light and Love'
  },
  {
    id: '2',
    name: 'Maldives',
    image: '/maldives.jpg',
    rating: 4.9,
    description: 'Paradise on Earth'
  },
  {
    id: '3',
    name: 'Tokyo, Japan',
    image: '/tokyo.jpg',
    rating: 4.7,
    description: 'Modern Meets Tradition'
  },
  {
    id: '4',
    name: 'Santorini, Greece',
    image: '/santorini.jpg',
    rating: 4.8,
    description: 'Sunset Paradise'
  }
];

const FeaturedDestinations = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Destinations</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our handpicked luxury destinations for unforgettable experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-dark rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  {/* Placeholder for image */}
                  <span className="text-gray-400">{destination.name}</span>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold">
                    Explore
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{destination.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-400">{destination.rating}</span>
                  </div>
                </div>
                <p className="text-gray-400">{destination.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;