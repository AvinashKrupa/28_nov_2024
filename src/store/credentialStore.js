import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCredentialStore = create(
  persist(
    (set, get) => ({
      credentials: {},
      verifiedCredentials: new Set(),
      
      addCredential: (type, credential) => set((state) => ({
        credentials: {
          ...state.credentials,
          [type]: [...(state.credentials[type] || []), {
            ...credential,
            id: `cred_${Math.random().toString(36).substr(2, 9)}`,
            isVerified: false,
            verificationCode: Math.floor(100000 + Math.random() * 900000).toString(),
            createdAt: new Date().toISOString()
          }]
        }
      })),

      updateCredential: (type, id, updatedData) => set((state) => ({
        credentials: {
          ...state.credentials,
          [type]: (state.credentials[type] || []).map(cred =>
            cred.id === id ? { ...cred, ...updatedData } : cred
          )
        }
      })),

      deleteCredential: (type, id) => set((state) => ({
        credentials: {
          ...state.credentials,
          [type]: (state.credentials[type] || []).filter(cred => cred.id !== id)
        }
      })),

      verifyCredential: (type, id, code) => {
        const credential = get().credentials[type]?.find(cred => cred.id === id);
        if (credential && credential.verificationCode === code) {
          set((state) => ({
            verifiedCredentials: new Set([...state.verifiedCredentials, id])
          }));
          return true;
        }
        return false;
      },

      isCredentialVerified: (id) => {
        return get().verifiedCredentials.has(id);
      },

      getCredentials: (type) => {
        const credentials = get().credentials[type] || [];
        return credentials.map(cred => ({
          ...cred,
          // Only show sensitive data if verified
          displayData: get().verifiedCredentials.has(cred.id) ? cred : {
            id: cred.id,
            title: cred.title,
            type: cred.type,
            createdAt: cred.createdAt,
            isVerified: false
          }
        }));
      }
    }),
    {
      name: 'credential-storage',
      partialize: (state) => ({
        credentials: state.credentials,
        verifiedCredentials: Array.from(state.verifiedCredentials)
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.verifiedCredentials = new Set(state.verifiedCredentials);
        }
      }
    }
  )
);

export default useCredentialStore;