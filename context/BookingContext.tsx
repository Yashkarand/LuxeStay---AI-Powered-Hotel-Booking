import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking } from '../types';
import { useAuth } from './AuthContext';
import { storage } from '../services/storage';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'bookedOn'>) => void;
  cancelBooking: (id: string) => void;
  deleteBooking: (id: string) => void;
  getUserBookings: () => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from storage on mount
  useEffect(() => {
    setBookings(storage.getAllBookings());
  }, []);

  const addBooking = (newBookingData: Omit<Booking, 'id' | 'status' | 'bookedOn'>) => {
    const now = new Date();
    // Format full date and time for display
    const formattedDate = now.toLocaleString(); 

    const newBooking: Booking = {
      ...newBookingData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Confirmed',
      bookedOn: formattedDate 
    };

    // Save to database
    const updatedList = storage.addBooking(newBooking);
    setBookings(updatedList);
  };

  const cancelBooking = (id: string) => {
    // Update status to 'Cancelled' in database instead of deleting
    const updatedList = storage.updateBookingStatus(id, 'Cancelled');
    setBookings(updatedList);
  };

  const deleteBooking = (id: string) => {
    // Permanently remove from database
    const updatedList = storage.deleteBooking(id);
    setBookings(updatedList);
  };

  const getUserBookings = () => {
    if (!user) return [];
    // Return all bookings for this user, sorted by newest created first (which is default from storage)
    return bookings.filter(b => b.userId === user.email);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, deleteBooking, getUserBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};