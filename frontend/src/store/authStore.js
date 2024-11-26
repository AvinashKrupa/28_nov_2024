import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      verificationEmail: null,
      setAuth: ({ user, token }) => set({ user, token, isAuthenticated: true }),
      setVerificationEmail: (email) => set({ verificationEmail: email }),
      logout: () => set({ user: null, token: null, isAuthenticated: false, verificationEmail: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;