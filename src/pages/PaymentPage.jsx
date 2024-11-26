import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreditCard, Smartphone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const subscription = location.state?.subscription;

  if (!user) {
    navigate('/signin', { state: { from: '/payment' } });
    return null;
  }

  if (!subscription) {
    navigate('/');
    return null;
  }

  const handlePayment = async (data) => {
    try {
      setLoading(true);
      // For testing, simulate successful payment
      setTimeout(() => {
        navigate('/payment/success', {
          state: {
            paymentId: 'test_' + Math.random().toString(36).substr(2, 9),
            subscription,
            orderId: 'order_' + Math.random().toString(36).substr(2, 9)
          }
        });
      }, 1500);
    } catch (error) {
      toast.error('Payment failed');
      navigate('/payment/error');
    } finally {
      setLoading(false);
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
          <div className="glow-box p-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Payment Details
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Selected Plan: {subscription.title}
              </h3>
              <p className="text-2xl font-bold text-accent-100">
                ₹0.00/month
              </p>
            </div>

            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 p-4 rounded-lg flex items-center justify-center space-x-2 ${
                  paymentMethod === 'card' 
                    ? 'bg-accent-100 text-dark-100' 
                    : 'bg-dark-200 text-gray-300'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Card Payment</span>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`flex-1 p-4 rounded-lg flex items-center justify-center space-x-2 ${
                  paymentMethod === 'upi' 
                    ? 'bg-accent-100 text-dark-100' 
                    : 'bg-dark-200 text-gray-300'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span>UPI Payment</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(handlePayment)} className="space-y-6">
              {paymentMethod === 'card' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Card Number
                    </label>
                    <input
                      {...register("cardNumber", { 
                        required: "Card number is required",
                        pattern: {
                          value: /^\d{16}$/,
                          message: "Please enter a valid 16-digit card number"
                        }
                      })}
                      type="text"
                      maxLength="16"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-400">{errors.cardNumber.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Expiry Date
                      </label>
                      <input
                        {...register("expiryDate", { 
                          required: "Expiry date is required",
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                            message: "Please enter a valid date (MM/YY)"
                          }
                        })}
                        type="text"
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-400">{errors.expiryDate.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        CVV
                      </label>
                      <input
                        {...register("cvv", { 
                          required: "CVV is required",
                          pattern: {
                            value: /^\d{3,4}$/,
                            message: "Please enter a valid CVV"
                          }
                        })}
                        type="password"
                        maxLength="4"
                        placeholder="***"
                        className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-400">{errors.cvv.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Card Holder Name
                    </label>
                    <input
                      {...register("cardHolderName", { required: "Card holder name is required" })}
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                    />
                    {errors.cardHolderName && (
                      <p className="mt-1 text-sm text-red-400">{errors.cardHolderName.message}</p>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    UPI ID
                  </label>
                  <input
                    {...register("upiId", { 
                      required: "UPI ID is required",
                      pattern: {
                        value: /^[\w\.\-_]{3,}@[a-zA-Z]{3,}$/,
                        message: "Please enter a valid UPI ID"
                      }
                    })}
                    type="text"
                    placeholder="yourname@upi"
                    className="w-full px-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                  />
                  {errors.upiId && (
                    <p className="mt-1 text-sm text-red-400">{errors.upiId.message}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Complete Payment'}
              </button>
            </form>

            <p className="text-sm text-gray-400 text-center mt-4">
              By proceeding, you agree to our terms and conditions
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;