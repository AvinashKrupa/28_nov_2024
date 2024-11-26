import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, CreditCard, Share2, FileText, TrendingUp, FolderLock, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';

const features = [
  {
    title: 'Online Banking Details',
    icon: CreditCard,
    description: 'Securely share banking credentials with your chosen nominee.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80'
  },
  {
    title: 'Social Media Details',
    icon: Share2,
    description: 'Pass on access to your social media accounts.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80'
  },
  {
    title: 'Last Wishes',
    icon: FileText,
    description: 'Document and share your final wishes securely.',
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80'
  },
  {
    title: 'Investment Details',
    icon: TrendingUp,
    description: 'Ensure your investments are properly transferred.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80'
  },
  {
    title: 'Others',
    icon: FolderLock,
    description: 'Custom access settings for any other digital assets.',
    image: 'https://images.unsplash.com/photo-1618044619888-009e412ff12a?auto=format&fit=crop&q=80'
  }
];

const ChooseNomineePage = () => {
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
              Choose Your Nominee
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Choose your nominees to share access to all important details, such as banking 
              credentials, social media accounts, last wishes and more, in case of an emergency 
              or after you are gone. This empowers users to assert their will, independent of 
              societal or systemic norms.
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
            <Users className="w-16 h-16 text-accent-100 mx-auto mb-8" />
            <h2 className="text-4xl font-bold text-white mb-8">
              Why Choose a Nominee?
            </h2>
            <p className="text-xl text-gray-300">
              Ensure your digital legacy is passed on according to your wishes. 
              Make the transition easier for your loved ones during difficult times 
              by providing organized access to your digital assets and final wishes.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChooseNomineePage;