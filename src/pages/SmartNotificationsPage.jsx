import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Tv, Gamepad2, Share2, Wrench, FolderLock, Bell, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';

const features = [
  {
    title: 'Entertainment Platform Subscription',
    icon: Tv,
    description: 'Get notified about upcoming subscription renewals and payment deductions for streaming services.',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80'
  },
  {
    title: 'Gaming Platform Subscription',
    icon: Gamepad2,
    description: 'Stay informed about gaming subscription payments and renewal dates.',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80'
  },
  {
    title: 'Credit Card Payment Links',
    icon: CreditCard,
    description: 'Monitor automatic payments linked to your credit cards.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80'
  },
  {
    title: 'Social Media Subscription',
    icon: Share2,
    description: 'Track premium subscription payments for social media platforms.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80'
  },
  {
    title: 'Business Tool Subscription',
    icon: Wrench,
    description: 'Manage notifications for business tools and cloud services.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80'
  },
  {
    title: 'Others',
    icon: FolderLock,
    description: 'Custom notifications for any other subscription services.',
    image: 'https://images.unsplash.com/photo-1618044619888-009e412ff12a?auto=format&fit=crop&q=80'
  }
];

const SmartNotificationsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
              Smart Notifications
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Receive important notifications for payments that are automatically deducted, 
              whether for subscription services, credit card payments, or any other services 
              that require linking a payment option for recurring deductions.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-dark-200"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-dark-100/50 to-transparent" />
                </div>
                
                <div className="p-6 relative">
                  <feature.icon className="w-8 h-8 text-accent-100 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300 mb-4">{feature.description}</p>
                  
                  <button className="flex items-center text-accent-100 hover:text-accent-200 transition-colors">
                    <span className="mr-2">Learn more</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-dark-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Bell className="w-16 h-16 text-accent-100 mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-white mb-8">
              Why Smart Notifications?
            </h2>
            <p className="text-xl text-gray-300">
              Stay informed about all your automatic payments and subscriptions. 
              Cancel unwanted services before they renew and maintain better control 
              over your recurring expenses.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartNotificationsPage;