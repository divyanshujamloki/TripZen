'use client';

import { motion } from 'framer-motion';
import { Crown, Mountain, Church, Globe, Wallet } from 'lucide-react';

const categories = [
  {
    id: 'luxury',
    name: 'Luxury',
    icon: Crown,
    description: 'Premium experiences with the finest accommodations',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: Mountain,
    description: 'Thrilling activities for the adventurous spirit',
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'religious',
    name: 'Religious',
    icon: Church,
    description: 'Spiritual journeys to sacred destinations',
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'international',
    name: 'International',
    icon: Globe,
    description: 'Global destinations for worldly explorers',
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'budget',
    name: 'Budget',
    icon: Wallet,
    description: 'Quality travel without breaking the bank',
    color: 'from-red-400 to-red-600'
  }
];

const TravelCategories = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Travel Categories</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find your perfect travel style from our diverse range of experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 text-center group cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TravelCategories;