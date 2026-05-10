'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoShowcase = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience the Luxury</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch our cinematic showcase of premium travel destinations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="aspect-video glass-dark rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
              {/* Placeholder for video */}
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-gray-400">Luxury Travel Showcase</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;