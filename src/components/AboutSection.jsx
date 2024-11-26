import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Clock, Heart, Users, Lock, Globe } from 'lucide-react';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-dark-200" id="about">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            Our Story
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glow-box overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
              alt="Digital Future"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-dark-100/60" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glow-box p-8"
          >
            <h3 className="text-3xl font-bold mb-6">The Genesis</h3>
            <p className="text-gray-300 mb-8">
              In today's digital age, our lives are increasingly intertwined with technology. From precious memories stored in 
              social media to critical financial information in banking apps, our digital footprint has become a significant part 
              of our legacy. SacredSecret emerged from the recognition that these digital assets need the same level of protection 
              and careful succession planning as physical assets. We've created a platform that ensures your digital legacy remains 
              secure and accessible to those you trust, exactly when they need it.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Heart className="w-6 h-6 text-accent-100 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Personal Touch</h4>
                  <p className="text-gray-300">Built with understanding of the emotional value of digital memories.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-accent-100 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Community Driven</h4>
                  <p className="text-gray-300">Developed based on real needs and feedback from our community.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Lock className="w-6 h-6 text-accent-100 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold mb-2">Privacy First</h4>
                  <p className="text-gray-300">Built on principles of absolute privacy and security.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glow-box p-8"
          >
            <Shield className="w-12 h-12 text-accent-100 mb-6" />
            <h4 className="text-2xl font-bold mb-4">Security First</h4>
            <ul className="space-y-4 text-gray-300">
              <li>• Military-grade encryption</li>
              <li>• Customizable access controls</li>
              <li>• Automated security updates</li>
              <li>• 24/7 technical support</li>
              <li>• Regular security audits</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glow-box p-8"
          >
            <Globe className="w-12 h-12 text-accent-100 mb-6" />
            <h4 className="text-2xl font-bold mb-4">Global Reach</h4>
            <ul className="space-y-4 text-gray-300">
              <li>• Multi-language support</li>
              <li>• 24/7 customer service</li>
              <li>• Regional compliance</li>
              <li>• Local data centers</li>
              <li>• Global accessibility</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glow-box p-8"
          >
            <Clock className="w-12 h-12 text-accent-100 mb-6" />
            <h4 className="text-2xl font-bold mb-4">Innovation</h4>
            <ul className="space-y-4 text-gray-300">
              <li>• Cutting-edge technology</li>
              <li>• Regular feature updates</li>
              <li>• User-driven development</li>
              <li>• Advanced automation</li>
              <li>• Future-proof design</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;