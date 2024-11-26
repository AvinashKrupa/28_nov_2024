import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path.startsWith('#')) {
      const element = document.getElementById(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollTo: path.substring(1) } });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-dark-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
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
            </div>
            <p className="text-gray-300">
              Securing your digital legacy with advanced technology and unwavering commitment to privacy.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/')}
                  className="text-gray-300 hover:text-[#5D3FD3] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#features')}
                  className="text-gray-300 hover:text-[#5D3FD3] transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('#about')}
                  className="text-gray-300 hover:text-[#5D3FD3] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className="text-gray-300 hover:text-[#5D3FD3] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#5D3FD3]" />
                <span className="text-gray-300">contact@sacredsecret.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#5D3FD3]" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#5D3FD3]" />
                <span className="text-gray-300">123 Security Ave, Digital City</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><button className="text-gray-300 hover:text-[#5D3FD3] transition-colors">Privacy Policy</button></li>
              <li><button className="text-gray-300 hover:text-[#5D3FD3] transition-colors">Terms of Service</button></li>
              <li><button className="text-gray-300 hover:text-[#5D3FD3] transition-colors">Cookie Policy</button></li>
              <li><button className="text-gray-300 hover:text-[#5D3FD3] transition-colors">Careers</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-300 pt-8">
          <p className="text-center text-gray-300">
            © {new Date().getFullYear()} SacredSecret. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;