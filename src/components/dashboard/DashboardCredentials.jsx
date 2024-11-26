import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, TrendingUp, Tv, Share2, Gamepad2, FolderLock, ArrowLeft } from 'lucide-react';

const credentialTypes = [
  {
    id: 'banking',
    title: 'Banking Credentials',
    icon: CreditCard,
    color: 'from-orange-400 to-orange-600',
    description: 'Manage your banking credentials'
  },
  {
    id: 'investment',
    title: 'Investment Credentials',
    icon: TrendingUp,
    color: 'from-green-400 to-green-600',
    description: 'Track your investment accounts'
  },
  {
    id: 'entertainment',
    title: 'Entertainment Platforms',
    icon: Tv,
    color: 'from-blue-400 to-blue-600',
    description: 'Streaming service credentials'
  },
  {
    id: 'social',
    title: 'Social Media',
    icon: Share2,
    color: 'from-purple-400 to-purple-600',
    description: 'Social media account credentials'
  },
  {
    id: 'gaming',
    title: 'Gaming Platforms',
    icon: Gamepad2,
    color: 'from-red-400 to-red-600',
    description: 'Gaming platform credentials'
  },
  {
    id: 'others',
    title: 'Others',
    icon: FolderLock,
    color: 'from-gray-400 to-gray-600',
    description: 'Other platform credentials'
  }
];

const DashboardCredentials = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {credentialTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/credentials/${type.id}`)}
            className="p-4 rounded-xl bg-dark-200 hover:bg-dark-300 transition-all duration-300 cursor-pointer"
          >
            <div className={`p-3 rounded-lg bg-gradient-to-br ${type.color} w-fit mb-4`}>
              <type.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
            <p className="text-sm text-gray-400">{type.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCredentials;