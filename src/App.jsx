import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import VerificationPage from './pages/VerificationPage';
import VerificationSuccessPage from './pages/VerificationSuccessPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';
import CredentialListPage from './pages/credentials/CredentialListPage';
import CredentialFormPage from './pages/credentials/CredentialFormPage';
import ManageCredentialsPage from './pages/ManageCredentialsPage';
import SmartNotificationsPage from './pages/SmartNotificationsPage';
import ChooseNomineePage from './pages/ChooseNomineePage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentErrorPage from './pages/PaymentErrorPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const hideNavbarPaths = ['/signin', '/signup', '/verify', '/verification-success'];

  return (
    <div className="min-h-screen bg-dark-100">
      <div className="relative">
        {/* Static Stars Background */}
        <div className="stars">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="star-static" />
          ))}
        </div>
        
        {/* Shooting Stars Background */}
        <div className="shooting-stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        
        <div className="fixed inset-0 bg-gradient-dark opacity-50 pointer-events-none" />
        <div className="relative z-10">
          {/* Conditionally render Navbar */}
          {!hideNavbarPaths.includes(window.location.pathname) && <Navbar />}
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/verify" element={<VerificationPage />} />
            <Route path="/verification-success" element={<VerificationSuccessPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Feature Explanation Pages */}
            <Route path="/manage-credentials" element={<ManageCredentialsPage />} />
            <Route path="/smart-notifications" element={<SmartNotificationsPage />} />
            <Route path="/choose-nominee" element={<ChooseNomineePage />} />
            
            {/* Payment Routes */}
            <Route path="/payment" element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/error" element={<PaymentErrorPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/credentials/:type" element={
              <ProtectedRoute>
                <CredentialListPage />
              </ProtectedRoute>
            } />
            <Route path="/credentials/:type/add" element={
              <ProtectedRoute>
                <CredentialFormPage />
              </ProtectedRoute>
            } />
            <Route path="/credentials/:type/edit/:id" element={
              <ProtectedRoute>
                <CredentialFormPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
