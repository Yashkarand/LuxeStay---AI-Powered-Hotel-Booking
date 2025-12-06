import React from 'react';
import { Star, MapPin, Wifi, Coffee, Waves } from 'lucide-react';
import { Hotel } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

interface HotelCardProps {
  hotel: Hotel;
  aiReason?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, aiReason }) => {
  const [searchParams] = useSearchParams();
  
  // Persist current search parameters when navigating to details
  const detailsLink = `/hotel/${hotel.id}?${searchParams.toString()}`;

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-3 h-3" />;
      case 'pool': return <Waves className="w-3 h-3" />;
      case 'breakfast': return <Coffee className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-800 dark:text-slate-100">
          {hotel.type}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1">{hotel.name}</h3>
            <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {hotel.city}
            </div>
          </div>
          <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded text-indigo-700 dark:text-indigo-300 font-bold text-sm">
            <Star className="w-3 h-3 mr-1 fill-indigo-700 dark:fill-indigo-400" />
            {hotel.rating}
          </div>
        </div>

        {aiReason && (
          <div className="mb-3 p-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 rounded text-xs text-emerald-800 dark:text-emerald-300 italic">
            "✨ {aiReason}"
          </div>
        )}

        <div className="flex gap-2 mb-4 flex-wrap">
          {hotel.amenities.slice(0, 3).map((am, i) => (
            <span key={i} className="flex items-center gap-1 text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
              {getAmenityIcon(am)}
              {am}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">+{hotel.amenities.length - 3}</span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{hotel.currency}{hotel.pricePerNight.toLocaleString()}</span>
            <span className="text-slate-500 dark:text-slate-400 text-sm"> / night</span>
          </div>
          <Link 
            to={detailsLink}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;