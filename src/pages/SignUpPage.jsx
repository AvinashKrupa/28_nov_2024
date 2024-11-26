import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password', '');

  // Password validation criteria
  const passwordCriteria = [
    { label: 'At least 8 characters', test: (value) => value.length >= 8 },
    { label: 'Contains uppercase letter', test: (value) => /[A-Z]/.test(value) },
    { label: 'Contains lowercase letter', test: (value) => /[a-z]/.test(value) },
    { label: 'Contains number', test: (value) => /\d/.test(value) },
    { label: 'Contains special character', test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value) }
  ];

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 p-8 md:p-16 bg-dark-100"
      >
        <div className="pt-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>

          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Create Your Account
            </h2>
            <p className="text-gray-300 mb-8">
              Join SacredSecret to secure your digital legacy
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  {...register("fullName", { required: "Full name is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  {...register("phone", { required: "Phone number is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <input
                  {...register("country", { required: "Country is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="United States"
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) => {
                      const failedCriteria = passwordCriteria.filter(c => !c.test(value));
                      return failedCriteria.length === 0 || 
                        "Password must meet all criteria below";
                    }
                  })}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>

              {/* Password criteria checklist */}
              <div className="space-y-2 p-4 bg-dark-200 rounded-lg">
                <p className="text-sm font-medium text-gray-300 mb-2">Password must contain:</p>
                {passwordCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {criteria.test(password) ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${
                      criteria.test(password) ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      {criteria.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Register'}
              </button>

              <p className="text-center text-gray-300">
                Already have an account?{' '}
                <Link to="/signin" className="text-accent-100 hover:text-accent-200 transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block w-1/2 relative"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
            alt="Digital Security"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-100/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <h2 className="text-4xl font-bold mb-4 text-white">
                Your Privacy Is Our Responsibility
              </h2>
              <p className="text-xl text-gray-300">
                We ensure your digital legacy is protected and transferred according to your wishes
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;