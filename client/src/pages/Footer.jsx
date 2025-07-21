import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ExternalLink, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Zapform</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The simplest way to handle form submissions without managing servers.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Status
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>© 2025 Zapform. Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>by Nikhil Maurya</span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Terms
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
