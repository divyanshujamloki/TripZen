'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    comment: 'An absolutely incredible experience. The attention to detail and luxury was beyond my expectations.',
    avatar: '/avatar1.jpg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'London, UK',
    rating: 5,
    comment: 'LuxTravel made our honeymoon in the Maldives unforgettable. Every moment was perfectly planned.',
    avatar: '/avatar2.jpg'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    location: 'Barcelona, Spain',
    rating: 5,
    comment: 'The Paris tour was magical. The guides were knowledgeable and the accommodations were luxurious.',
    avatar: '/avatar3.jpg'
  }
];

const Testimonials = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Travelers Say</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real experiences from our satisfied customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-dark rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-600" />
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                  {/* Placeholder for avatar */}
                  <span className="text-white font-semibold">{testimonial.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 italic">"{testimonial.comment}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;