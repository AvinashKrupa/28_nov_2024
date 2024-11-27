import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, ChevronDown } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isAtTop = currentScrollPos < 10;
      const shouldShow = isScrollingUp || isAtTop || isHovering;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVisible(shouldShow);
        setPrevScrollPos(currentScrollPos);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [prevScrollPos, isHovering]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 py-4 px-6 transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-sm bg-dark-100/50 rounded-xl px-6 py-3">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/logo-purple.svg" 
            alt="SacredSecret" 
            className="h-12 w-auto"
            style={{ filter: 'drop-shadow(0 0 10px rgba(93, 63, 211, 0.3))' }}
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#5D3FD3]">SacredSecret</span>
            <span className="text-sm text-[#5D3FD3]">Empowering You</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-white hover:text-[#5D3FD3] transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="text-white hover:text-[#5D3FD3] transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-white hover:text-[#5D3FD3] transition-colors"
          >
            About Us
          </button>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-white hover:text-[#5D3FD3] transition-colors">
              Dashboard
            </Link>
          )}
          <Link to="/contact" className="text-white hover:text-[#5D3FD3] transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/signin" className="px-4 py-2 rounded-full text-white hover:text-[#5D3FD3] transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="px-4 py-2 rounded-full bg-[#5D3FD3] text-white hover:opacity-90 transition-opacity">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative" onMouseLeave={() => setShowProfileMenu(false)}>
              <button
                onMouseEnter={() => setShowProfileMenu(true)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark-200/50 backdrop-blur-sm hover:bg-dark-300/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"} 
                    alt={user?.fullName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{user?.fullName}</p>
                  <p className="text-xs text-gray-400">{user?.accountId}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-200/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-300/50"
                      role="menuitem"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-300/50"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-300/50"
                      role="menuitem"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
