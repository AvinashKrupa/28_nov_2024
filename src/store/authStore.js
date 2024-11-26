import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      verificationEmail: null,
      setAuth: ({ user, token }) => set({ 
        user: {
          ...user,
          accountId: user.accountId || `SS${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          avatar: user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
        }, 
        token, 
        isAuthenticated: true 
      }),
      setVerificationEmail: (email) => set({ verificationEmail: email }),
      logout: () => set({ user: null, token: null, isAuthenticated: false, verificationEmail: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;