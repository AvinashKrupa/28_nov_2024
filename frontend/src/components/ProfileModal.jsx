import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';

const ProfileModal = ({ isOpen, onClose, onSave }) => {
  const { user } = useAuthStore();
  const [imagePreview, setImagePreview] = useState(user?.profileImage || null);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.country || ''
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    if (!isDirty && !imagePreview) {
      toast.error('No changes made');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to save these changes?');
    if (confirmed) {
      try {
        await onSave({ ...data, profileImage: imagePreview });
        toast.success('Profile updated successfully');
        onClose();
      } catch (error) {
        toast.error('Failed to update profile');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dark-200 rounded-xl w-full max-w-xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
                Edit Profile
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-dark-300 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent-100">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-dark-300 flex items-center justify-center">
                        <span className="text-4xl text-gray-400">
                          {user?.fullName?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="absolute bottom-0 right-0 bg-accent-100 rounded-full p-2">
                    <svg
                      className="w-4 h-4 text-dark-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  {...register("fullName", { required: "Full name is required" })}
                  className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
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
                  className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
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
                  className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
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
                  className="w-full px-4 py-3 rounded-lg bg-dark-300 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-lg border border-accent-100 text-accent-100 font-semibold hover:bg-accent-100/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;