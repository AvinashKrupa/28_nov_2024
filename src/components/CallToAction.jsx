import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useAuthStore from '../store/authStore';

const CallToAction = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Don't render if user is authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <section className="py-20 bg-dark-100" id="cta">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glow-box relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
              alt="Start Your Legacy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-100/95 to-dark-200/95" />
          </div>
          
          <div className="relative py-16 px-8 md:px-16 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Ready to Start Your Legacy?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust SacredSecret with their digital legacy. Start securing your digital assets today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="inline-flex items-center px-8 py-4 rounded-lg bg-accent-100 text-dark-100 hover:bg-accent-200 transition-colors text-lg font-semibold"
            >
              Let's Start
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;