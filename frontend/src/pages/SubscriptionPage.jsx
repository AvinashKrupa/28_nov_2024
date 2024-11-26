import React from 'react';
import ManageCredentials from './SubscriptionPages/ManageCredentials';
import CredentialTypes from './SubscriptionPages/CredentialTypes';
import SecurityFeatures from './SubscriptionPages/SecurityFeatures';
import PricingSection from './SubscriptionPages/PricingSection';
import CallToAction from './SubscriptionPages/CallToAction';
import Footer from '../components/Footer';

const SubscriptionPage = () => {
  return (
    <div className="pt-24">
      <ManageCredentials />
      <CredentialTypes />
      <SecurityFeatures />
      <PricingSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default SubscriptionPage;