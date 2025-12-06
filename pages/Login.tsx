import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mail, Lock, User, ArrowRight, CheckCircle, Phone, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, error: authError } = useAuth();
  const { addNotification } = useNotifications();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [localError, setLocalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setIsSubmitting(true);
    
    if (isRegistering) {
      // Register logic
      if (password.length < 6) {
        setLocalError('Password must be at least 6 characters long.');
        setIsSubmitting(false);
        return;
      }

      // Prepend +91 if not present for consistency
      const formattedPhone = phone.startsWith('+91') ? phone : `+91 ${phone}`;
      
      const success = await register(name, email, formattedPhone, password);
      
      if (success) {
        setRegisterSuccess(true);
        addNotification(
          'Welcome to LuxeStay!', 
          `Your account has been successfully created. We've sent a welcome email to ${email}.`,
          'success'
        );
        
        // Clear sensitive fields and redirect to login view
        setTimeout(() => {
          setIsRegistering(false);
          setRegisterSuccess(false);
          setPassword('');
          setLocalError('');
        }, 2000);
      } else {
        // Error is handled by AuthContext and exposed via authError, but we can set local if needed
      }
    } else {
      // Login logic
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <MapPin className="h-10 w-10 text-indigo-600 dark:text-indigo-500" />
            <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">LuxeStay</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
          {isRegistering ? 'Create your account' : 'Sign in to your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Or{' '}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setRegisterSuccess(false);
              setLocalError('');
              setPassword('');
            }}
            className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
          >
            {isRegistering ? 'sign in to existing account' : 'create a new account'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200 dark:border-slate-700">
          
          {registerSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Account Created!</h3>
              <p className="text-slate-500 dark:text-slate-400">Redirecting you to login...</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Error Display */}
              {(authError || localError) && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600 dark:text-red-300">{localError || authError}</p>
                </div>
              )}

              {isRegistering && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required={isRegistering}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full pl-10 sm:text-sm border-slate-300 dark:border-slate-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-2 border bg-white dark:bg-slate-700 dark:text-white text-slate-900"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Phone Number
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="absolute inset-y-0 left-10 pl-1 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 text-sm">
                         +91
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required={isRegistering}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        className="block w-full pl-20 sm:text-sm border-slate-300 dark:border-slate-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-2 border bg-white dark:bg-slate-700 dark:text-white text-slate-900"
                        placeholder="98765 43210"
                        maxLength={10}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-slate-300 dark:border-slate-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-2 border bg-white dark:bg-slate-700 dark:text-white text-slate-900"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isRegistering ? "new-password" : "current-password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 sm:text-sm border-slate-300 dark:border-slate-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-2 border bg-white dark:bg-slate-700 dark:text-white text-slate-900"
                    placeholder="••••••••"
                  />
                </div>
                {isRegistering && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Must be at least 6 characters</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')} <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-sm font-medium text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600"
                >
                  <span className="sr-only">Sign in with Google</span>
                  Google
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm bg-white dark:bg-slate-700 text-sm font-medium text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;