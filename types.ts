export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Amenity {
  icon: string;
  label: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  password?: string; // Hashed password
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  description: string;
  pricePerNight: number;
  currency: string; // '₹' or '$'
  rating: number;
  image: string;
  images: string[];
  amenities: string[];
  reviews: Review[];
  type: 'Resort' | 'Hotel' | 'Apartment' | 'Villa' | 'Homestay';
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  userId: string;
  customerName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  currency: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  bookedOn: string;
}

export interface SearchParams {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface AIRecommendation {
  hotelId: string;
  reason: string;
}