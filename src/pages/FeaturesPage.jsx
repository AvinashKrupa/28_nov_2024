import React from 'react';
import FeaturesSection from '../components/FeaturesSection';
import KeyFeaturesSection from '../components/KeyFeaturesSection';
import SecuritySection from '../components/SecuritySection';
import Footer from '../components/Footer';

const FeaturesPage = () => {
  return (
    <div className="pt-24">
      <FeaturesSection />
      <KeyFeaturesSection />
      <SecuritySection />
      <Footer />
    </div>
  );
};

export default FeaturesPage;