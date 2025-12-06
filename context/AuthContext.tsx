import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { storage } from '../services/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedUser: Partial<User>) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to hash passwords using SHA-256
const hashPassword = async (password: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize demo user if not exists
  const initDemoUser = async () => {
    const demoEmail = 'demo@example.com';
    const existing = storage.getUser(demoEmail);
    if (!existing) {
      const hashedPassword = await hashPassword('password');
      const demoUser: User = {
        name: 'Demo User',
        email: demoEmail,
        phone: '+91 98765 43210',
        avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
        password: hashedPassword
      };
      storage.saveUser(demoUser);
    }
  };

  useEffect(() => {
    const init = async () => {
      await initDemoUser();
      const sessionUser = storage.getSession();
      if (sessionUser) {
        setUser(sessionUser);
      }
      setIsLoading(false);
    };
    init();
  }, []);

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      // Check if user already exists
      const existingUser = storage.getUser(email);
      if (existingUser) {
        setError('User with this email already exists.');
        return false;
      }

      const hashedPassword = await hashPassword(password);
      const newUser: User = {
        name,
        email,
        phone,
        avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=random',
        password: hashedPassword
      };
      
      storage.saveUser(newUser);
      return true;
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const userToLogin = storage.getUser(email);
      
      if (!userToLogin) {
        setError('Invalid email or password.');
        return false;
      }

      const hashedPassword = await hashPassword(password);
      
      // Check if passwords match
      if (userToLogin.password && userToLogin.password !== hashedPassword) {
        setError('Invalid email or password.');
        return false;
      }

      // If user exists but has no password (legacy data), update it? 
      // For now, we assume strict checking.
      if (!userToLogin.password) {
         // This block handles edge cases where a user might exist in local storage from a previous version without a password
         // We'll allow them to login if strictly intended, but better to fail secure.
         // For the purpose of this request ("details should match"), we fail if password is missing.
         setError('Account security update required. Please register again.');
         return false;
      }

      setUser(userToLogin);
      storage.setSession(userToLogin);
      return true;
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    storage.clearSession();
  };

  const updateProfile = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      storage.updateUser(newUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};