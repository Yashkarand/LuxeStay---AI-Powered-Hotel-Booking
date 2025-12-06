import React, { useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, MapPin, LogOut, Settings, Sun, Moon, Briefcase, Bell, Check, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotifMenu, setShowNotifMenu] = React.useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifMenu(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'About Us', path: '/about' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <MapPin className="h-8 w-8 text-indigo-600 dark:text-indigo-500" />
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">LuxeStay</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                )}
              </button>
              
              {showNotifMenu && (
                <div className="absolute right-0 z-20 mt-2 w-80 origin-top-right rounded-md bg-white dark:bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-100 dark:border-slate-700">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</span>
                    <div className="flex gap-2">
                       {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Mark all read</button>
                       )}
                       {notifications.length > 0 && (
                        <button onClick={clearAll} className="text-xs text-slate-500 hover:text-red-500"><Trash2 className="w-3 h-3"/></button>
                       )}
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <div 
                          key={notif.id} 
                          className={`px-4 py-3 border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer ${notif.read ? 'opacity-60' : 'bg-indigo-50/30 dark:bg-indigo-900/10'}`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`text-sm font-medium ${notif.read ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>{notif.title}</h4>
                            <span className="text-xs text-slate-400">{notif.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{notif.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        No notifications yet.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="relative ml-3" ref={userRef}>
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex max-w-xs items-center rounded-full bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700"
                      src={user.avatar}
                      alt={user.name}
                    />
                    <span className="ml-2 font-medium text-slate-700 dark:text-slate-200">{user.name}</span>
                  </button>
                </div>
                {showUserMenu && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-100 dark:border-slate-700">
                     <Link
                      to="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Briefcase className="w-4 h-4" />
                      My Bookings
                    </Link>
                     <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Settings className="w-4 h-4" />
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
             <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                )}
              </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile Notifications Panel */}
             {showNotifMenu && (
               <div className="border-t border-slate-100 dark:border-slate-700 pt-2">
                 <div className="px-3 py-2 text-xs font-semibold uppercase text-slate-500">Notifications</div>
                 {notifications.length > 0 ? notifications.slice(0, 3).map(n => (
                   <div key={n.id} className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-50 dark:border-slate-800">
                     {n.message}
                   </div>
                 )) : <div className="px-3 py-2 text-sm text-slate-500">No new notifications</div>}
               </div>
             )}

            <div className="pt-4 pb-2 border-t border-slate-100 dark:border-slate-800">
              {user ? (
                <>
                  <div className="flex items-center px-4 mb-3">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-slate-800 dark:text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-slate-500 dark:text-slate-400 mt-1">{user.email}</div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    My Bookings
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Your Profile
                  </Link>
                  <button
                     onClick={() => {
                       handleLogout();
                       setIsOpen(false);
                     }}
                     className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  <User className="w-5 h-5" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;