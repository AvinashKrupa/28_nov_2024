import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bell, Calendar, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';

const notificationTypes = [
  {
    id: 'subscription',
    title: 'Subscription Alerts',
    icon: Bell,
    color: 'from-blue-400 to-blue-600',
    count: 2,
    description: 'Get notified about upcoming renewals'
  },
  {
    id: 'security',
    title: 'Security Alerts',
    icon: AlertTriangle,
    color: 'from-red-400 to-red-600',
    count: 1,
    description: 'Important security notifications'
  },
  {
    id: 'reminders',
    title: 'Password Reminders',
    icon: Clock,
    color: 'from-green-400 to-green-600',
    count: 3,
    description: 'Password update reminders'
  }
];

const DashboardNotifications = () => {
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
        {notificationTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/notifications/${type.id}`)}
            className="p-4 rounded-xl bg-dark-200 hover:bg-dark-300 transition-all duration-300 cursor-pointer"
          >
            <div className={`p-3 rounded-lg bg-gradient-to-br ${type.color} w-fit mb-4`}>
              <type.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{type.title}</h3>
              <span className="px-2 py-1 rounded-full bg-dark-300 text-sm text-white">
                {type.count}
              </span>
            </div>
            <p className="text-sm text-gray-400">{type.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardNotifications;