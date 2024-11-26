// Update the existing imports
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import useCredentialStore from '../../store/credentialStore';
import useAuthStore from '../../store/authStore';
import { sendVerificationEmail } from '../../utils/email';
import VerificationModal from '../../components/VerificationModal';
import { toast } from 'react-hot-toast';

const CredentialListPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  
  const { user } = useAuthStore();
  const { 
    getCredentials, 
    isCredentialVerified,
    deleteCredential 
  } = useCredentialStore();

  const credentials = getCredentials(type);

  const handleView = async (credential) => {
    if (isCredentialVerified(credential.id)) {
      // Already verified, show the data
      setSelectedCredential(credential);
    } else {
      // Need verification
      try {
        await sendVerificationEmail(
          user.email, 
          credential.verificationCode,
          credential.title
        );
        toast.success('Verification code sent to your email');
        setSelectedCredential(credential);
        setShowVerificationModal(true);
      } catch (error) {
        toast.error('Failed to send verification code');
      }
    }
  };

  const handleEdit = (credential) => {
    if (isCredentialVerified(credential.id)) {
      navigate(`/credentials/${type}/edit/${credential.id}`);
    } else {
      toast.error('Please verify access before editing');
    }
  };

  const handleDelete = (credential) => {
    if (isCredentialVerified(credential.id)) {
      if (window.confirm('Are you sure you want to delete this credential?')) {
        deleteCredential(type, credential.id);
        toast.success('Credential deleted successfully');
      }
    } else {
      toast.error('Please verify access before deleting');
    }
  };

  const filteredCredentials = credentials.filter(cred => 
    cred.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              {type.charAt(0).toUpperCase() + type.slice(1)} Credentials
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/credentials/${type}/add`)}
              className="flex items-center px-4 py-2 rounded-lg bg-accent-100 text-dark-100 hover:bg-accent-200 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New
            </motion.button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search credentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
            />
          </div>

          <div className="space-y-4">
            {filteredCredentials.map((credential) => (
              <motion.div
                key={credential.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-lg bg-dark-200 hover:bg-dark-300 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {credential.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Added: {new Date(credential.createdAt).toLocaleDateString()}
                    </p>
                    {!isCredentialVerified(credential.id) && (
                      <p className="text-sm text-accent-100 mt-1">
                        Verification required to view details
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(credential)}
                      className="p-2 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors text-accent-100"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(credential)}
                      className="p-2 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors text-accent-100"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(credential)}
                      className="p-2 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredCredentials.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No credentials found</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        credentialId={selectedCredential?.id}
        credentialType={type}
        onVerified={() => {
          toast.success('Access granted');
          setShowVerificationModal(false);
        }}
      />
    </div>
  );
};

export default CredentialListPage;