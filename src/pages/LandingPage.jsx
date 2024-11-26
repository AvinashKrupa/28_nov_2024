import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import KeyFeaturesSection from '../components/KeyFeaturesSection';
import SecuritySection from '../components/SecuritySection';
import MissionVisionSection from '../components/MissionVisionSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AboutSection from '../components/AboutSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { homeFaqs } from '../data/faqs';

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Hero />
        <div id="features">
          <FeaturesSection />
        </div>
        <KeyFeaturesSection />
        <SecuritySection />
        <div id="about">
          <MissionVisionSection />
          <AboutSection />
        </div>
        <TestimonialsSection />
        <FAQ faqs={homeFaqs} />
        <CallToAction />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;