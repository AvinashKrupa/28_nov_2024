import React from 'react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glow-box p-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Profile Settings
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.fullName || ''}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={user?.phone || ''}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={user?.country || ''}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  readOnly
                />
              </div>
            </div>

            <div className="mt-8">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity">
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;