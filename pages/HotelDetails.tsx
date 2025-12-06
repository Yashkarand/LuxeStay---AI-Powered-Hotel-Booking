import React, { useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Star, MapPin, Check, MessageSquare, Calendar, Users, AlertCircle, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHotels } from '../context/HotelContext';
import { useBookings } from '../context/BookingContext';
import ReviewModal from '../components/ReviewModal';

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { getHotel, addReview } = useHotels();
  const { getUserBookings } = useBookings();
  const hotel = getHotel(id || '');
  
  const [activeImage, setActiveImage] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Booking State - Initialize from URL params if available
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 1);
  const [error, setError] = useState('');

  if (!hotel) {
    return <div className="p-10 text-center dark:text-white">Hotel not found. <Link to="/" className="text-indigo-600">Go Home</Link></div>;
  }

  const allImages = [hotel.image, ...hotel.images];

  // Calculate nights and price
  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * hotel.pricePerNight : 0;
  };

  const totalStayPrice = calculateTotal();
  const nights = totalStayPrice / hotel.pricePerNight;
  
  // Adaptive cleaning fee based on currency
  const cleaningFee = hotel.currency === '₹' ? 500 : 30;
  
  const finalTotal = totalStayPrice > 0 ? totalStayPrice + cleaningFee : 0;

  const handleReserve = () => {
    setError('');
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates.');
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after check-in.');
      return;
    }

    // Navigate to checkout with booking details
    navigate('/checkout', {
      state: {
        bookingDetails: {
          hotelId: hotel.id,
          hotelName: hotel.name,
          location: hotel.city,
          image: hotel.image,
          checkIn,
          checkOut,
          guests,
          totalPrice: finalTotal,
          currency: hotel.currency
        }
      }
    });
  };

  const handleWriteReview = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const userBookings = getUserBookings();
    const hasBooked = userBookings.some(b => b.hotelId === hotel.id);
    
    if (hasBooked) {
      setShowReviewModal(true);
    } else {
      setError('You can only review hotels you have booked.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const submitReview = (rating: number, comment: string) => {
    if (!user) return;
    addReview(hotel.id, {
      id: Date.now().toString(),
      user: user.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    });
    setShowReviewModal(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pb-16 transition-colors duration-200">
      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
          <div className="h-full">
            <img 
              src={allImages[activeImage]} 
              alt={hotel.name} 
              className="w-full h-full object-cover rounded-2xl shadow-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {allImages.slice(1, 5).map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx + 1)}
                className="relative overflow-hidden rounded-xl h-full group"
              >
                <img src={img} alt="Gallery" className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                {activeImage === idx + 1 && (
                  <div className="absolute inset-0 border-4 border-indigo-600 rounded-xl pointer-events-none"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{hotel.name}</h1>
                  <div className="flex items-center text-slate-500 dark:text-slate-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold">
                    <Star className="w-4 h-4 mr-1 fill-white" />
                    {hotel.rating}
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">{hotel.reviews.length} reviews</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">About this place</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{hotel.description}</p>
              
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {hotel.amenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Check className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Guest Reviews</h3>
                </div>
                <button 
                  onClick={handleWriteReview}
                  className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
                >
                  <Edit className="w-4 h-4" /> Write a Review
                </button>
              </div>
              
              {hotel.reviews.length > 0 ? (
                <div className="space-y-6">
                  {hotel.reviews.map(review => (
                    <div key={review.id} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                             {review.user.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{review.user}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{review.date}</div>
                          </div>
                        </div>
                         <div className="flex items-center bg-white dark:bg-slate-700 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-600">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-500'}`} />
                           ))}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-slate-500 dark:text-slate-400">No reviews yet. Be the first to review after your stay!</p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="w-full lg:w-96">
            <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-6">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{hotel.currency}{hotel.pricePerNight.toLocaleString()}</span>
                  <span className="text-slate-500 dark:text-slate-400"> / night</span>
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  {hotel.rating}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="border border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-2 border-b border-slate-200 dark:border-slate-600">
                  <div className="p-3 border-r border-slate-200 dark:border-slate-600">
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 uppercase mb-1">Check-In</label>
                    <input 
                      type="date" 
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full text-sm text-slate-600 dark:text-slate-400 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 uppercase mb-1">Check-Out</label>
                    <input 
                      type="date" 
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full text-sm text-slate-600 dark:text-slate-400 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-300 uppercase mb-1">Guests</label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-sm text-slate-600 dark:text-slate-400 bg-transparent focus:outline-none appearance-none"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4+ Guests</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleReserve}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors mb-4"
              >
                Reserve
              </button>
              
              <div className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
                You won't be charged yet
              </div>

              {checkIn && checkOut && totalStayPrice > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span className="underline">{hotel.currency}{hotel.pricePerNight.toLocaleString()} x {nights} nights</span>
                    <span>{hotel.currency}{totalStayPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span className="underline">Cleaning fee</span>
                    <span>{hotel.currency}{cleaningFee}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-slate-900 dark:text-white pt-3 border-t border-slate-100 dark:border-slate-700">
                    <span>Total before taxes</span>
                    <span>{hotel.currency}{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <ReviewModal 
        isOpen={showReviewModal} 
        onClose={() => setShowReviewModal(false)}
        onSubmit={submitReview}
        hotelName={hotel.name}
      />
    </div>
  );
};

export default HotelDetails;