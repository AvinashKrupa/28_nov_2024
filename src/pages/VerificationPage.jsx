import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import useAuthStore from '../store/authStore';

const VerificationPage = () => {
  const navigate = useNavigate();
  const { verify, resendVerificationCode, loading } = useAuth();
  const verificationEmail = useAuthStore(state => state.verificationEmail);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const inputs = Array(6).fill(0);

  useEffect(() => {
    if (!verificationEmail) {
      navigate('/signup');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [verificationEmail, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name=code-${index + 1}]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=code-${index - 1}]`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join('');
    if (code.length === 6) {
      try {
        await verify({ email: verificationEmail, code });
      } catch (error) {
        console.error('Verification error:', error);
      }
    }
  };

  const handleResendCode = async () => {
    if (timeLeft === 0) {
      try {
        await resendVerificationCode(verificationEmail);
        setTimeLeft(300); // Reset timer to 5 minutes
      } catch (error) {
        console.error('Resend code error:', error);
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="glow-box p-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            Verify Your Email
          </h2>
          <p className="text-gray-300 mb-8">
            Please enter the 6-digit code sent to {verificationEmail}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {inputs.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  name={`code-${index}`}
                  maxLength={1}
                  value={verificationCode[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl rounded-lg bg-dark-200 border border-dark-300 text-white focus:outline-none focus:border-accent-100"
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Time remaining: <span className="text-accent-100">{formatTime(timeLeft)}</span>
              </p>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={timeLeft > 0 || loading}
                className="text-accent-100 hover:text-accent-200 transition-colors disabled:opacity-50"
              >
                Resend Code
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || verificationCode.some(v => !v)}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>

            <button
              type="button"
              onClick={handleBackToHome}
              className="w-full py-3 px-4 rounded-lg border border-accent-100 text-accent-100 font-semibold hover:bg-accent-100/10 transition-colors"
            >
              Back to Home
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationPage;