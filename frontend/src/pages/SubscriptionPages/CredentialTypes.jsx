import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, TrendingUp, Tv, Share2, Gamepad2, FolderLock, ChevronDown } from 'lucide-react';

const credentialTypes = [
  {
    title: 'Banking Credentials',
    icon: CreditCard,
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80',
    description: 'Securely store your banking passwords and PINs',
    details: ['Multi-factor authentication', 'Encrypted storage', 'Automatic logout', 'Access logs']
  },
  {
    title: 'Investment Credentials',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80',
    description: 'Keep your investment platform access secure',
    details: ['Trading platform access', 'Portfolio credentials', 'Secure API keys', 'Backup codes']
  },
  {
    title: 'Entertainment Platform Credentials',
    icon: Tv,
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80',
    description: 'Store streaming and entertainment login details',
    details: ['Streaming services', 'Digital content', 'Subscription management', 'Family sharing']
  },
  {
    title: 'Social Media Credentials',
    icon: Share2,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    description: 'Manage your social media account access',
    details: ['Platform logins', '2FA backup codes', 'App passwords', 'Recovery emails']
  },
  {
    title: 'Gaming Platform Credentials',
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80',
    description: 'Keep your gaming accounts secure',
    details: ['Game launchers', 'In-game items', 'Platform credentials', 'Recovery codes']
  },
  {
    title: 'Others',
    icon: FolderLock,
    image: 'https://images.unsplash.com/photo-1618044619888-009e412ff12a?auto=format&fit=crop&q=80',
    description: 'Store credentials for any other platforms',
    details: ['Custom categories', 'Flexible storage', 'Custom fields', 'Notes']
  }
];

const CredentialCard = ({ type, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl glow-box"
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
        <p className="text-gray-300 mb-4">{type.description}</p>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-accent-100 hover:text-accent-200 transition-colors"
        >
          <span className="mr-2">Learn more</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2">
                {type.details.map((detail, i) => (
                  <motion.li
                    key={detail}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center text-gray-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-100 mr-2" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

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
            <CredentialCard key={type.title} type={type} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredentialTypes;