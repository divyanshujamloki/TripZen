'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';

const tours = [
  {
    id: '1',
    title: 'Luxury Paris Escape',
    destination: 'Paris, France',
    price: 2500,
    duration: '7 Days',
    rating: 4.9,
    image: '/paris-tour.jpg'
  },
  {
    id: '2',
    title: 'Maldives Paradise',
    destination: 'Maldives',
    price: 3500,
    duration: '5 Days',
    rating: 4.8,
    image: '/maldives-tour.jpg'
  },
  {
    id: '3',
    title: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    price: 2200,
    duration: '6 Days',
    rating: 4.7,
    image: '/tokyo-tour.jpg'
  },
  {
    id: '4',
    title: 'Greek Islands Hop',
    destination: 'Santorini, Greece',
    price: 2800,
    duration: '8 Days',
    rating: 4.9,
    image: '/santorini-tour.jpg'
  }
];

const PopularTours = () => {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Popular Tour Packages</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Curated experiences for the most discerning travelers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  {/* Placeholder for image */}
                  <span className="text-gray-400">{tour.title}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{tour.destination}</span>
                </div>
                <div className="flex items-center text-gray-400 mb-4">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-400">{tour.rating}</span>
                  </div>
                  <span className="text-2xl font-bold text-white">${tour.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            View All Tours
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularTours;