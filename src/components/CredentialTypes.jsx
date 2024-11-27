import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, Tv, Share2, Gamepad2, FolderLock } from 'lucide-react';

const credentialTypes = [
  {
    title: 'Banking Credentials',
    icon: CreditCard,
    image: '/BankingCredentials.jpg',
    description: 'Securely store your banking passwords and PINs'
  },
  {
    title: 'Investment Credentials',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80',
    description: 'Keep your investment platform access secure'
  },
  {
    title: 'Entertainment Platform Credentials',
    icon: Tv,
    image: '/Entertainment.jpg',
    description: 'Store streaming and entertainment login details'
  },
  {
    title: 'Social Media Credentials',
    icon: Share2,
    image: '/SocialMedia.jpg',
    description: 'Manage your social media account access'
  },
  {
    title: 'Gaming Platform Credentials',
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80',
    description: 'Keep your gaming accounts secure'
  },
  {
    title: 'Others',
    icon: FolderLock,
    image: 'https://images.unsplash.com/photo-1618044619888-009e412ff12a?auto=format&fit=crop&q=80',
    description: 'Store credentials for any other platforms'
  }
];

const CredentialTypes = () => {
  return (
    <section className="py-20 bg-dark-200">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent"
        >
          Store All Your Credentials
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {credentialTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl glow-box group"
            >
              <div className="absolute inset-0">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark-100/80 transition-opacity duration-300 group-hover:opacity-90" />
              </div>
              
              <div className="relative p-8">
                <type.icon className="w-12 h-12 text-accent-100 mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-white">{type.title}</h3>
                <p className="text-gray-300">{type.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredentialTypes;
