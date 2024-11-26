import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Bell, Users, Activity, TrendingUp, Clock, Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Footer from '../components/Footer';
import DashboardCredentials from '../components/dashboard/DashboardCredentials';
import DashboardNotifications from '../components/dashboard/DashboardNotifications';
import DashboardNominee from '../components/dashboard/DashboardNominee';

const features = [
  {
    id: 'credentials',
    title: 'Manage Credentials',
    icon: Shield,
    status: 'Active',
    nextBilling: '2024-03-15',
    price: '$9.99/month',
    description: 'Securely store and manage all your digital credentials',
    color: 'from-blue-500 to-indigo-500',
    bgImage: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
    component: DashboardCredentials
  },
  {
    id: 'notifications',
    title: 'Smart Notifications',
    icon: Bell,
    status: 'Trial',
    nextBilling: '2024-03-10',
    price: '$4.99/month',
    description: 'Stay informed with intelligent alerts and updates',
    color: 'from-purple-500 to-pink-500',
    bgImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
    component: DashboardNotifications
  },
  {
    id: 'nominee',
    title: 'Choose Nominee',
    icon: Users,
    status: 'Inactive',
    price: '$7.99/month',
    description: 'Select and manage trusted nominees',
    color: 'from-green-500 to-teal-500',
    bgImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    component: DashboardNominee
  }
];

const StatCard = ({ icon: Icon, title, value, trend }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-xl bg-dark-200 backdrop-blur-sm"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 rounded-lg bg-accent-100/10">
        <Icon className="w-6 h-6 text-accent-100" />
      </div>
      {trend && (
        <div className={`flex items-center ${
          trend > 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
    <h4 className="text-lg text-gray-400 mb-1">{title}</h4>
    <p className="text-2xl font-bold text-white">{value}</p>
  </motion.div>
);

const FeatureCard = ({ feature, isActive, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 group ${
      isActive ? 'ring-2 ring-accent-100' : ''
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="absolute inset-0">
      <img 
        src={feature.bgImage}
        alt={feature.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`} />
    </div>
    
    <div className="relative p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm">
          <feature.icon className="w-6 h-6 text-white" />
        </div>
        <span className={`px-3 py-1 rounded-full text-sm backdrop-blur-sm ${
          feature.status === 'Active' ? 'bg-green-500/20 text-green-100' :
          feature.status === 'Trial' ? 'bg-yellow-500/20 text-yellow-100' :
          'bg-red-500/20 text-red-100'
        }`}>
          {feature.status}
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
      <p className="text-sm mb-4 text-white/80">{feature.description}</p>
      <p className="text-lg font-bold text-white">{feature.price}</p>
    </div>
  </motion.div>
);

const DashboardPage = () => {
  const { user } = useAuthStore();
  const [activeFeature, setActiveFeature] = useState(null);
  const navigate = useNavigate();

  const ActiveFeatureComponent = activeFeature ? 
    features.find(f => f.id === activeFeature)?.component : 
    null;

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Section */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.fullName}
              </h1>
              <p className="text-gray-300">
                Your digital legacy dashboard
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-dark-200 hover:bg-dark-300 transition-colors"
            >
              <Settings className="w-6 h-6 text-accent-100" />
            </motion.button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard 
              icon={Shield}
              title="Total Credentials"
              value="17"
              trend={5}
            />
            <StatCard 
              icon={Activity}
              title="Active Services"
              value="8"
              trend={2}
            />
            <StatCard 
              icon={Clock}
              title="Last Update"
              value="2h ago"
            />
            <StatCard 
              icon={Users}
              title="Nominees"
              value="2"
            />
          </div>

          {!activeFeature ? (
            /* Main Features Grid */
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  isActive={activeFeature === feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                />
              ))}
            </div>
          ) : (
            /* Active Feature Component */
            <div className="mb-12">
              {ActiveFeatureComponent && <ActiveFeatureComponent />}
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;