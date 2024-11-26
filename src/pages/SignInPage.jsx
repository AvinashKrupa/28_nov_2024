import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await login(data);
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
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
              Welcome Back
            </h2>
            <p className="text-gray-300 mb-8">
              Sign in to continue managing your digital legacy
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  {...register("password", { required: "Password is required" })}
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-dark-300 text-accent-100 focus:ring-accent-100"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent-100 hover:text-accent-200 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p className="text-center text-gray-300">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  state={{ from: location.state?.from }}
                  className="text-accent-100 hover:text-accent-200 transition-colors"
                >
                  Sign up
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
                Secure Your Digital Legacy
              </h2>
              <p className="text-xl text-gray-300">
                Access and manage your digital assets with confidence
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPage;