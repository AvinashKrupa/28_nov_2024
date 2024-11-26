import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Save, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';

const formFields = {
  banking: [
    { name: 'bankName', label: 'Bank Name', type: 'text', required: true },
    { name: 'accountNumber', label: 'Account Number', type: 'text', required: true },
    { name: 'accountType', label: 'Account Type', type: 'select', required: true, 
      options: ['Savings', 'Current', 'Credit Card', 'Loan', 'Other'] },
    { name: 'username', label: 'Username/Customer ID', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'ifscCode', label: 'IFSC Code', type: 'text', required: true },
    { name: 'branchName', label: 'Branch Name', type: 'text', required: false },
    { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false }
  ],
  investment: [
    { name: 'platform', label: 'Platform Name', type: 'text', required: true },
    { name: 'accountId', label: 'Account ID/DEMAT Number', type: 'text', required: true },
    { name: 'accountType', label: 'Account Type', type: 'select', required: true,
      options: ['Trading', 'DEMAT', 'Mutual Funds', 'Crypto', 'Other'] },
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'dpId', label: 'DP ID (if applicable)', type: 'text', required: false },
    { name: 'panNumber', label: 'PAN Number', type: 'text', required: true },
    { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false }
  ],
  entertainment: [
    { name: 'platform', label: 'Platform Name', type: 'text', required: true },
    { name: 'subscriptionType', label: 'Subscription Type', type: 'select', required: true,
      options: ['Basic', 'Standard', 'Premium', 'Family', 'Other'] },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'renewalDate', label: 'Renewal Date', type: 'date', required: false },
    { name: 'paymentMethod', label: 'Payment Method', type: 'text', required: false },
    { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false }
  ],
  social: [
    { name: 'platform', label: 'Social Media Platform', type: 'text', required: true },
    { name: 'username', label: 'Username/Handle', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'recoveryEmail', label: 'Recovery Email', type: 'email', required: false },
    { name: 'phoneNumber', label: 'Recovery Phone', type: 'tel', required: false },
    { name: 'twoFactorEnabled', label: '2FA Enabled', type: 'checkbox', required: false },
    { name: 'backupCodes', label: 'Backup Codes', type: 'textarea', required: false },
    { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false }
  ],
  gaming: [
    { name: 'platform', label: 'Gaming Platform', type: 'text', required: true },
    { name: 'username', label: 'Username/Gamertag', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'subscriptionType', label: 'Subscription Type', type: 'select', required: false,
      options: ['Free', 'Premium', 'Gold', 'Plus', 'Other'] },
    { name: 'recoveryEmail', label: 'Recovery Email', type: 'email', required: false },
    { name: 'securityQuestion', label: 'Security Question Answer', type: 'text', required: false },
    { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false }
  ],
  others: [
    { name: 'serviceName', label: 'Service Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true,
      options: ['Email', 'Cloud Storage', 'Work', 'Education', 'Shopping', 'Other'] },
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: false },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'url', label: 'Website URL', type: 'url', required: false },
    { name: 'notes', label: 'Additional Notes', type: 'textarea', required: false }
  ]
};

const CredentialFormPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
    // Handle form submission
    navigate(`/credentials/${type}`);
  };

  const getTitle = () => {
    switch (type) {
      case 'banking': return 'Banking Credentials';
      case 'investment': return 'Investment Credentials';
      case 'entertainment': return 'Entertainment Platform';
      case 'social': return 'Social Media Account';
      case 'gaming': return 'Gaming Platform';
      case 'others': return 'Other Credentials';
      default: return 'Add New Credentials';
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="glow-box p-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Add New {getTitle()}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {formFields[type]?.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field.label}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      {...register(field.name, { required: field.required })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      {...register(field.name, { required: field.required })}
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...register(field.name)}
                        className="w-4 h-4 rounded border-dark-300 text-accent-100 focus:ring-accent-100"
                      />
                      <span className="ml-2 text-gray-300">Enable {field.label}</span>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        {...register(field.name, { required: field.required })}
                        type={field.type === 'password' ? (showPassword ? 'text' : 'password') : field.type}
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                      {field.type === 'password' && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      )}
                    </div>
                  )}
                  
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-400">{field.label} is required</p>
                  )}
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Credentials
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CredentialFormPage;