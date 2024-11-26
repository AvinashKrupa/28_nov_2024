import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronRight } from 'lucide-react';
import useAuthStore from '../store/authStore';
import CredentialTypes from '../components/CredentialTypes';
import SecurityFeatures from '../components/SecurityFeatures';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

const faqs = [
  {
    question: "What types of credentials can I store?",
    answer: "You can store various types of credentials including banking, investment, entertainment platforms, social media, gaming, and other custom credentials. Each type has specific fields tailored to its requirements."
  },
  {
    question: "How secure is my data?",
    answer: "We use military-grade encryption and advanced security measures to protect your data. All credentials are encrypted both in transit and at rest, ensuring maximum security."
  },
  {
    question: "Can I access my credentials from multiple devices?",
    answer: "Yes, you can securely access your credentials from any device through our web interface. Multi-factor authentication ensures only you can access your account."
  },
  {
    question: "How do I share credentials with nominees?",
    answer: "You can designate trusted nominees and set up specific access rules. Nominees will only gain access according to your predetermined conditions and verification process."
  },
  {
    question: "What happens if I forget my master password?",
    answer: "We have a secure recovery process that verifies your identity through multiple factors. Your data remains safe while you regain access to your account."
  }
];

const ManageCredentialsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: '/manage-credentials' } });
      return;
    }

    navigate('/payment', {
      state: {
        subscription: {
          id: 'starter',
          title: 'Starter Plan',
          price: 0,
          features: [
            'Store unlimited credentials',
            'Secure encryption',
            'Multi-factor authentication',
            'Mobile access',
            'Email support',
            'Regular security updates'
          ]
        }
      }
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-center mb-16 text-white"
          >
            Manage Your Credentials
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-2xl text-gray-300 leading-relaxed">
                Store all your credentials in one centralized location for easy access, eliminating the need to memorize them. This provides users with peace of mind regarding where to store countless credentials, making it easy to access these details anytime and anywhere, while ensuring security as a top priority.
              </p>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold"
                >
                  Start For Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/features')}
                  className="px-8 py-4 rounded-lg border border-accent-100 text-accent-100 font-semibold"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video rounded-xl overflow-hidden glow-box group"
            >
              <img
                src="https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80"
                alt="Credential Management"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark-100/60" />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-accent-100/90 flex items-center justify-center backdrop-blur-sm"
              >
                <Play className="w-8 h-8 text-dark-100 ml-1" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credential Types Section */}
      <CredentialTypes />

      {/* Security Features Section */}
      <SecurityFeatures />

      {/* Pricing Section */}
      <section className="py-20 bg-dark-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg mx-auto"
          >
            <div className="relative p-8 rounded-xl glow-box bg-dark-100">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-6 py-2 rounded-full bg-accent-100 text-dark-100 font-semibold text-sm whitespace-nowrap">
                  SPECIAL OFFER
                </span>
              </div>

              <div className="text-center mb-8 pt-4">
                <h3 className="text-3xl font-bold text-white mb-2">Free Forever</h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-5xl font-bold text-accent-100">₹0.00</span>
                  <span className="text-xl text-gray-300 ml-2">/month</span>
                </div>
                <p className="text-gray-300">Everything you need to get started</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  'Store unlimited credentials',
                  'Secure encryption',
                  'Multi-factor authentication',
                  'Mobile access',
                  'Email support',
                  'Regular security updates'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-accent-100 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetStarted}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity"
              >
                Let's Start
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={faqs} />

      <Footer />
    </div>
  );
};

export default ManageCredentialsPage;