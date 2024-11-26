import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Lock, Key, Bell, Users, Database, Server, Eye } from 'lucide-react';

const bigBoxes = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description: "Military-grade encryption ensures your data remains secure from end to end, protecting your digital assets at every step.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80"
  },
  {
    icon: Lock,
    title: "Multi-Factor Authentication",
    description: "Advanced authentication protocols with multiple layers of security to verify legitimate access attempts.",
    image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80"
  },
  {
    icon: Key,
    title: "Secure Nominee Access",
    description: "Rigorous verification process ensures only authorized nominees can access designated assets.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80"
  }
];

const smallBoxes = [
  {
    icon: Bell,
    title: "Real-time Alerts",
    description: "Instant notifications for any security-related activities"
  },
  {
    icon: Users,
    title: "Access Control",
    description: "Granular control over who can access what"
  },
  {
    icon: Database,
    title: "Encrypted Storage",
    description: "Your data is encrypted at rest and in transit"
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "Enterprise-grade security infrastructure"
  }
];

const SecuritySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-dark-100" id="security">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            Security First
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Your security is our top priority. We employ industry-leading security measures to protect your digital legacy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {bigBoxes.map((box, index) => (
            <motion.div
              key={box.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glow-box group"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={box.image}
                  alt={box.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-dark-100/50 to-transparent" />
              </div>
              <div className="p-6 relative">
                <box.icon className="w-8 h-8 text-accent-100 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{box.title}</h3>
                <p className="text-gray-300">{box.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {smallBoxes.map((box, index) => (
            <motion.div
              key={box.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
              className="glow-box p-6"
            >
              <box.icon className="w-6 h-6 text-accent-100 mb-3" />
              <h4 className="text-lg font-semibold mb-1 text-white">{box.title}</h4>
              <p className="text-sm text-gray-300">{box.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glow-box p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-100/5 to-accent-200/5" />
          <div className="relative">
            <Eye className="w-12 h-12 text-accent-100 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-white">
              Verification Process
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our robust verification system ensures that only authorized nominees can access designated assets. We employ multiple layers of authentication and verification to maintain the highest level of security while sharing credentials.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecuritySection;