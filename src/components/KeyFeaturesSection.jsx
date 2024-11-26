import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Key, Lock, FileCheck, Cloud, Database, Server } from 'lucide-react';

const bigFeatures = [
  {
    title: "Advanced Encryption",
    description: "Military-grade encryption for all your sensitive data",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
  },
  {
    title: "Biometric Authentication",
    description: "Multi-factor authentication with biometric security",
    icon: Lock,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80",
  },
  {
    title: "Smart Contracts",
    description: "Automated and secure asset transfer protocols",
    icon: FileCheck,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
  },
];

const smallFeatures = [
  {
    title: "Cloud Backup",
    description: "Redundant backup systems",
    icon: Cloud,
  },
  {
    title: "Data Recovery",
    description: "Advanced recovery options",
    icon: Database,
  },
  {
    title: "API Security",
    description: "Secure API endpoints",
    icon: Server,
  },
  {
    title: "Access Control",
    description: "Granular permissions",
    icon: Key,
  },
];

const KeyFeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-dark-200" id="key-features">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            Key Features
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experience unparalleled security and control with our advanced feature set
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {bigFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glow-box"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-dark-100/50 to-transparent" />
              </div>
              <div className="p-6 relative">
                <feature.icon className="w-8 h-8 text-accent-100 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {smallFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
              className="glow-box p-6"
            >
              <feature.icon className="w-6 h-6 text-accent-100 mb-3" />
              <h4 className="text-lg font-semibold mb-1 text-white">{feature.title}</h4>
              <p className="text-sm text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;