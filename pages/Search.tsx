import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Search as SearchIcon, Sparkles, Loader2, X } from 'lucide-react';
import { useHotels } from '../context/HotelContext';
import HotelCard from '../components/HotelCard';
import { getHotelRecommendations } from '../services/geminiService';
import { AIRecommendation } from '../types';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCity = searchParams.get('city') || '';
  const { hotels } = useHotels();

  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [cityFilter, setCityFilter] = useState(initialCity);
  const [priceRange, setPriceRange] = useState(100000); // Max range in INR approx
  const [typeFilter, setTypeFilter] = useState('All');
  
  // AI State
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [showAiResults, setShowAiResults] = useState(false);

  // Apply filters effect
  useEffect(() => {
    let result = hotels;

    if (cityFilter) {
      if (cityFilter.toLowerCase() === 'india') {
        result = result.filter(h => ['Jaipur', 'Goa', 'Mumbai', 'Kerala', 'Udaipur', 'Manali', 'Andaman', 'Rishikesh', 'Coorg', 'Pondicherry'].includes(h.city));
      } else {
        result = result.filter(h => 
          h.city.toLowerCase().includes(cityFilter.toLowerCase()) || 
          h.location.toLowerCase().includes(cityFilter.toLowerCase()) ||
          h.name.toLowerCase().includes(cityFilter.toLowerCase())
        );
      }
    }

    if (typeFilter !== 'All') {
      result = result.filter(h => h.type === typeFilter);
    }

    // Currency normalization for filtering
    // Assume 1 USD = 83 INR for filter comparison purposes only
    const EXCHANGE_RATE = 83;

    result = result.filter(h => {
      const priceInINR = h.currency === '$' ? h.pricePerNight * EXCHANGE_RATE : h.pricePerNight;
      return priceInINR <= priceRange;
    });

    // If AI results are active, prioritize or filter by them
    if (showAiResults && aiRecommendations.length > 0) {
      const recIds = new Set(aiRecommendations.map(r => r.hotelId));
      result = result.filter(h => recIds.has(h.id));
    }

    setFilteredHotels(result);
  }, [cityFilter, priceRange, typeFilter, aiRecommendations, showAiResults, hotels]);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsAiLoading(true);
    setShowAiResults(false);
    
    const recs = await getHotelRecommendations(aiQuery, hotels);
    
    setAiRecommendations(recs);
    if (recs.length > 0) {
      setShowAiResults(true);
    }
    setIsAiLoading(false);
  };

  const clearAiResults = () => {
    setShowAiResults(false);
    setAiRecommendations([]);
    setAiQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-8 pb-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4 space-y-6">
            
            {/* AI Assistant Widget */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-800 dark:to-violet-900 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-lg">AI Concierge</h3>
              </div>
              <p className="text-indigo-100 text-sm mb-4">
                Tell us your dream vibe (e.g., "Peaceful yoga retreat in Rishikesh for under ₹2000") and let AI filter for you.
              </p>
              <form onSubmit={handleAiSearch}>
                <textarea
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 placeholder-indigo-200 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 mb-3"
                  placeholder="Describe your perfect stay..."
                  rows={3}
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                />
                <button 
                  disabled={isAiLoading}
                  className="w-full bg-white text-indigo-600 font-bold py-2 rounded-lg text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                >
                  {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Find with AI'}
                </button>
              </form>
            </div>

            {/* Traditional Filters */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                <Filter className="w-5 h-5 text-slate-400" />
                <h3 className="font-bold text-slate-800 dark:text-white">Filters</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location / Keyword</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder="City or Hotel Name"
                    />
                    <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Max Price (approx ₹)
                  </label>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-500">₹0</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">₹{priceRange.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="100000" 
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className="text-xs text-slate-400 mt-2">For USD properties, we approximate 1$ = ₹83</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Property Type</label>
                  <select 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full p-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="All">All Types</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Resort">Resort</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Homestay">Homestay</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {showAiResults ? 'AI Recommended Stays' : 'Available Properties'} 
                <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">({filteredHotels.length} found)</span>
              </h2>
              {showAiResults && (
                <button 
                  onClick={clearAiResults}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full"
                >
                  <X className="w-3 h-3" /> Clear AI Filter
                </button>
              )}
            </div>

            {filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHotels.map(hotel => {
                  const recommendation = aiRecommendations.find(r => r.hotelId === hotel.id);
                  return (
                    <HotelCard 
                      key={hotel.id} 
                      hotel={hotel} 
                      aiReason={showAiResults ? recommendation?.reason : undefined} 
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-12 text-center border border-slate-200 dark:border-slate-700">
                <div className="bg-slate-50 dark:bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No hotels found</h3>
                <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search criteria.</p>
                {showAiResults && (
                   <button onClick={clearAiResults} className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                     Show all hotels
                   </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchPage;