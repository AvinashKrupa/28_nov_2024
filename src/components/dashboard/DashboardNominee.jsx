import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, Key, ArrowLeft } from 'lucide-react';

const nomineeTypes = [
  {
    id: 'primary',
    title: 'Primary Nominee',
    icon: Users,
    color: 'from-purple-400 to-purple-600',
    status: 'Active',
    description: 'Manage your primary nominee'
  },
  {
    id: 'secondary',
    title: 'Secondary Nominee',
    icon: Shield,
    color: 'from-blue-400 to-blue-600',
    status: 'Not Set',
    description: 'Set up a backup nominee'
  },
  {
    id: 'access',
    title: 'Access Rules',
    icon: Key,
    color: 'from-green-400 to-green-600',
    status: 'Configured',
    description: 'Configure access permissions'
  }
];

const DashboardNominee = () => {
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nomineeTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/nominees/${type.id}`)}
            className="p-4 rounded-xl bg-dark-200 hover:bg-dark-300 transition-all duration-300 cursor-pointer"
          >
            <div className={`p-3 rounded-lg bg-gradient-to-br ${type.color} w-fit mb-4`}>
              <type.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{type.title}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${
                type.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                type.status === 'Not Set' ? 'bg-red-500/20 text-red-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {type.status}
              </span>
            </div>
            <p className="text-sm text-gray-400">{type.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardNominee;