import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Hotel, Review } from '../types';
import { MOCK_HOTELS } from '../services/mockData';

interface HotelContextType {
  hotels: Hotel[];
  getHotel: (id: string) => Hotel | undefined;
  addReview: (hotelId: string, review: Review) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hotels, setHotels] = useState<Hotel[]>(MOCK_HOTELS);

  const getHotel = (id: string) => {
    return hotels.find(h => h.id === id);
  };

  const addReview = (hotelId: string, review: Review) => {
    setHotels(prevHotels => prevHotels.map(hotel => {
      if (hotel.id === hotelId) {
        return {
          ...hotel,
          reviews: [review, ...hotel.reviews]
        };
      }
      return hotel;
    }));
  };

  return (
    <HotelContext.Provider value={{ hotels, getHotel, addReview }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotels must be used within a HotelProvider');
  }
  return context;
};