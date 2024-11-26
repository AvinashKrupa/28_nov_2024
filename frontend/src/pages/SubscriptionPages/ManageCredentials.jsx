import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronRight } from 'lucide-react';

const ManageCredentials = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFeatureList, setShowFeatureList] = useState(false);

  const features = [
    "Centralized credential storage",
    "Easy access anytime, anywhere",
    "Military-grade encryption",
    "Secure sharing capabilities",
    "Automated backups"
  ];

  return (
    <section className="py-20 bg-dark-100">
      <div className="container mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent"
        >
          Manage Your Credentials
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Store all your credentials in one centralized location for easy access, eliminating the need to memorize them. This provides users with peace of mind regarding where to store countless credentials, making it easy to access these details anytime and anywhere, while ensuring security as a top priority.
            </motion.p>

            <AnimatePresence>
              {showFeatureList && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-3 mt-4">
                    {features.map((feature, index) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-gray-300"
                      >
                        <ChevronRight className="w-5 h-5 text-accent-100 mr-2" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFeatureList(!showFeatureList)}
                className="px-8 py-4 rounded-lg border border-accent-100 text-accent-100 font-semibold"
              >
                {showFeatureList ? 'Show Less' : 'Learn More'}
              </motion.button>
            </div>
          </motion.div>

          {/* Video Thumbnail */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative aspect-video rounded-xl overflow-hidden glow-box group"
          >
            <img
              src="https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80"
              alt="Credential Management"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark-100/60 transition-opacity duration-300 group-hover:bg-dark-100/40" />
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-accent-100/90 flex items-center justify-center backdrop-blur-sm transition-transform duration-300 hover:bg-accent-100"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-dark-100" />
              ) : (
                <Play className="w-8 h-8 text-dark-100 ml-1" />
              )}
            </motion.button>

            {/* Video Progress Bar */}
            {isPlaying && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 30, ease: "linear" }}
                className="absolute bottom-0 left-0 h-1 bg-accent-100"
                style={{ transformOrigin: "left" }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManageCredentials;