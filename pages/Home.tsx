import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, MapPin, Sparkles } from 'lucide-react';
import { useHotels } from '../context/HotelContext';
import HotelCard from '../components/HotelCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { hotels } = useHotels();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      city: location,
      guests: guests.toString(),
      checkIn,
      checkOut
    });
    navigate(`/search?${queryParams.toString()}`);
  };

  const featuredHotels = hotels.filter(h => h.rating >= 4.8 && !['Jaipur', 'Goa', 'Mumbai', 'Kerala', 'Udaipur', 'Manali', 'Andaman', 'Bali', 'Santorini'].includes(h.city)).slice(0, 4);
  
  // Specific query for Indian hotels
  const indianHotels = hotels.filter(h => ['Jaipur', 'Goa', 'Mumbai', 'Kerala', 'Udaipur', 'Manali', 'Andaman'].includes(h.city));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative h-[550px] bg-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-sm tracking-tight">
            Find Your Next <span className="text-indigo-400">Extraordinary</span> Stay
          </h1>
          <p className="text-lg text-slate-200 mb-10 max-w-2xl mx-auto">
            Discover luxury hotels, resorts, and villas curated for discerning travelers.
            Powered by AI to match your perfect vibe.
          </p>

          <form onSubmit={handleSearch} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 border border-slate-100 dark:border-slate-700">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 transition-colors text-slate-900 dark:text-white placeholder-slate-400"
                placeholder="Where to?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600" />
              </div>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="block w-full pl-10 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 text-slate-600 dark:text-white"
                placeholder="Check In"
              />
            </div>

            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600" />
              </div>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="block w-full pl-10 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 text-slate-600 dark:text-white"
                 placeholder="Check Out"
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600" />
              </div>
              <select 
                className="block w-full pl-10 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600 text-slate-600 dark:text-white appearance-none"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>

            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 col-span-1 md:col-span-4 lg:col-span-1 lg:col-start-auto">
              <Search className="w-5 h-5" />
              Search
            </button>
          </form>
          
          <div className="mt-8 flex justify-center gap-4 text-sm text-slate-300 font-medium">
             <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-amber-400"/> AI Recommendations</span>
             <span className="flex items-center gap-1">✓ Best Price Guarantee</span>
             <span className="flex items-center gap-1">✓ 24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Featured India Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase text-sm">Destinations of India</span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">Discover Incredible India</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">From royal palaces in Jaipur to the serene backwaters of Kerala.</p>
          </div>
          <button onClick={() => navigate('/search?city=India')} className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline">
            View all &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {indianHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>

      {/* Popular Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Popular Worldwide</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Highly rated spots by travelers like you.</p>
          </div>
          <button onClick={() => navigate('/search')} className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline">
            View all hotels &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-indigo-900 dark:bg-indigo-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-bold mb-4">Unlock Exclusive Deals</h2>
           <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">Sign up for our newsletter to receive up to 50% off on your first booking and secret offers.</p>
           <div className="flex justify-center gap-4 max-w-md mx-auto">
             <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white" />
             <button className="bg-indigo-500 hover:bg-indigo-400 px-6 py-3 rounded-lg font-bold transition-colors">Subscribe</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;