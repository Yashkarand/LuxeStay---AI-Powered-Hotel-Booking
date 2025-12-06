import { User, Booking } from '../types';
import { MOCK_BOOKINGS } from './mockData';

// Database Keys
const DB_PREFIX = 'luxeStay_db_';
const BOOKINGS_KEY = 'luxeStayBookings';
const SESSION_KEY = 'luxeStayUser';

export const storage = {
  // --- User Table Operations ---
  
  saveUser: (user: User) => {
    localStorage.setItem(`${DB_PREFIX}${user.email}`, JSON.stringify(user));
  },

  getUser: (email: string): User | null => {
    const data = localStorage.getItem(`${DB_PREFIX}${email}`);
    return data ? JSON.parse(data) : null;
  },

  updateUser: (user: User) => {
    localStorage.setItem(`${DB_PREFIX}${user.email}`, JSON.stringify(user));
    // Also update session if it matches
    const session = storage.getSession();
    if (session && session.email === user.email) {
      storage.setSession(user);
    }
  },

  // --- Session Management ---
  
  setSession: (user: User) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  getSession: (): User | null => {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  // --- Booking Table Operations ---

  getAllBookings: (): Booking[] => {
    const data = localStorage.getItem(BOOKINGS_KEY);
    if (data) {
      return JSON.parse(data);
    } else {
      // Initialize with mock data if empty
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(MOCK_BOOKINGS));
      return MOCK_BOOKINGS;
    }
  },

  saveBookings: (bookings: Booking[]) => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  },

  addBooking: (booking: Booking) => {
    const bookings = storage.getAllBookings();
    // Add to beginning of array
    const updatedBookings = [booking, ...bookings];
    storage.saveBookings(updatedBookings);
    return updatedBookings;
  },

  updateBookingStatus: (id: string, status: Booking['status']) => {
    const bookings = storage.getAllBookings();
    const updatedBookings = bookings.map(b => 
      b.id === id ? { ...b, status } : b
    );
    storage.saveBookings(updatedBookings);
    return updatedBookings;
  },

  deleteBooking: (id: string) => {
    const bookings = storage.getAllBookings();
    const updatedBookings = bookings.filter(b => b.id !== id);
    storage.saveBookings(updatedBookings);
    return updatedBookings;
  }
};