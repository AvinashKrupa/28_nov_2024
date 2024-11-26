import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Key, Database, Cloud, Server, ChevronRight, ExternalLink } from 'lucide-react';

const features = [
  {
    title: 'AWS KMS Encryption',
    icon: Shield,
    description: 'Data encrypted using AWS Key Management Service with customer-managed keys',
    details: [
      'AES 256-bit encryption',
      'Customer-managed keys',
      'Automatic key rotation',
      'Access logging'
    ],
    link: 'https://aws.amazon.com/kms/'
  },
  {
    title: 'Multi-Factor Authentication',
    icon: Lock,
    description: 'Enhanced security with AWS Cognito MFA and biometric verification',
    details: [
      'SMS verification',
      'Email verification',
      'Authenticator apps',
      'Biometric authentication'
    ],
    link: 'https://aws.amazon.com/cognito/'
  },
  {
    title: 'AWS WAF Protection',
    icon: Server,
    description: 'Web Application Firewall for protection against common web exploits',
    details: [
      'DDoS protection',
      'SQL injection prevention',
      'Cross-site scripting protection',
      'Rate limiting'
    ],
    link: 'https://aws.amazon.com/waf/'
  },
  {
    title: 'Secure Data Storage',
    icon: Database,
    description: 'Data stored in encrypted AWS RDS instances with automated backups',
    details: [
      'Encrypted at rest',
      'Automated backups',
      'Point-in-time recovery',
      'Multi-AZ deployment'
    ],
    link: 'https://aws.amazon.com/rds/'
  },
  {
    title: 'AWS CloudWatch Monitoring',
    icon: Cloud,
    description: '24/7 monitoring and automated alerts for suspicious activities',
    details: [
      'Real-time monitoring',
      'Automated alerts',
      'Performance metrics',
      'Security logging'
    ],
    link: 'https://aws.amazon.com/cloudwatch/'
  },
  {
    title: 'AWS Secrets Manager',
    icon: Key,
    description: 'Secure credential rotation and management using AWS Secrets Manager',
    details: [
      'Automatic rotation',
      'Version control',
      'Access control',
      'Audit logging'
    ],
    link: 'https://aws.amazon.com/secrets-manager/'
  }
];

const FeatureCard = ({ feature }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="p-6 rounded-xl glow-box bg-dark-200 relative overflow-hidden group"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          y: showDetails ? -20 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <feature.icon className="w-12 h-12 text-accent-100 mb-4" />
        <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
        <p className="text-gray-300">{feature.description}</p>
      </motion.div>

      <motion.div
        className="mt-4 flex items-center justify-between"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-accent-100 hover:text-accent-200 transition-colors flex items-center"
        >
          <span className="mr-2">{showDetails ? 'Show Less' : 'Learn More'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <a
          href={feature.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-100 hover:text-accent-200 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <ul className="space-y-2">
              {feature.details.map((detail, index) => (
                <motion.li
                  key={detail}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
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
    </motion.div>
  );
};

const SecurityFeatures = () => {
  return (
    <section className="py-20 bg-dark-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            Enterprise-Grade Security
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powered by AWS security features, ensuring your credentials are protected with the highest level of security
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityFeatures;