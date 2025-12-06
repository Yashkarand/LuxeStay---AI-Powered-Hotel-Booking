import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 dark:border-slate-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-indigo-400" />
              <span className="font-bold text-xl text-white">LuxeStay</span>
            </div>
            <p className="text-sm">
              Discover the world's best hotels and get personalized recommendations powered by AI.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-indigo-400">Careers</Link></li>
              <li><Link to="/press" className="hover:text-indigo-400">Press</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/help" className="hover:text-indigo-400">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-400">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm">
          &copy; 2024 LuxeStay Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;