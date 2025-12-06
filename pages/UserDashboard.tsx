import React, { useState } from 'react';
import { Calendar, MapPin, Clock, XCircle, Home, History, Star, MessageSquare, Trash2, Ban, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { useBookings } from '../context/BookingContext';
import { useHotels } from '../context/HotelContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Link } from 'react-router-dom';
import ReviewModal from '../components/ReviewModal';
import { Booking } from '../types';

const UserDashboard: React.FC = () => {
  const { getUserBookings, cancelBooking, deleteBooking } = useBookings();
  const { addReview } = useHotels();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const bookings = getUserBookings();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  
  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);

  // Cancel Modal State
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const upcomingBookings = bookings.filter(b => b.checkIn >= today && b.status !== 'Cancelled').sort((a, b) => a.checkIn.localeCompare(b.checkIn));
  const pastBookings = bookings.filter(b => b.checkIn < today && b.status !== 'Cancelled').sort((a, b) => b.checkIn.localeCompare(a.checkIn));
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').sort((a, b) => b.bookedOn.localeCompare(a.bookedOn));

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : activeTab === 'past' ? pastBookings : cancelledBookings;

  const handleOpenReview = (booking: Booking) => {
    setReviewBookingId(booking.id);
    setShowReviewModal(true);
  };

  const initiateCancel = (booking: Booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (bookingToCancel) {
      cancelBooking(bookingToCancel.id);
      
      const currency = bookingToCancel.currency || '₹';
      addNotification(
        'Cancellation Successful',
        `Your booking at ${bookingToCancel.hotelName} has been cancelled. The full refund of ${currency}${bookingToCancel.totalPrice.toLocaleString()} has been initiated and will be transferred to your bank account within 3-5 business days.`,
        'success'
      );
      
      setShowCancelModal(false);
      setBookingToCancel(null);
    }
  };

  const handleDelete = (booking: Booking) => {
    if (window.confirm('Remove this booking from your history?')) {
      deleteBooking(booking.id);
    }
  };

  const submitReview = (rating: number, comment: string) => {
    if (!reviewBookingId || !user) return;
    
    // Find booking to get hotelId
    const booking = bookings.find(b => b.id === reviewBookingId);
    if (booking) {
      addReview(booking.hotelId, {
        id: Date.now().toString(),
        user: user.name,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      });
      addNotification('Review Submitted', 'Thank you for your feedback!', 'success');
    }
    setShowReviewModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto relative">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Bookings</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Manage your upcoming stays and view history.</p>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 px-6 font-medium text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'upcoming' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Upcoming Stays ({upcomingBookings.length})
            {activeTab === 'upcoming' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-4 px-6 font-medium text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'past' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Past Trips ({pastBookings.length})
            {activeTab === 'past' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400" />}
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`pb-4 px-6 font-medium text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'cancelled' 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Cancelled ({cancelledBookings.length})
            {activeTab === 'cancelled' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-400" />}
          </button>
        </div>

        {/* Content */}
        {displayBookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {displayBookings.map((booking) => (
              <div key={booking.id} className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border ${activeTab === 'cancelled' ? 'border-red-100 dark:border-red-900/30' : 'border-slate-200 dark:border-slate-700'} overflow-hidden flex flex-col md:flex-row animate-in fade-in duration-300`}>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                       <div className="flex flex-wrap gap-2 mb-2">
                         <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                           activeTab === 'cancelled' 
                             ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                             : activeTab === 'upcoming' 
                               ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                               : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                         }`}>
                          {activeTab === 'upcoming' && <Clock className="w-3 h-3 mr-1"/>}
                          {activeTab === 'past' && <History className="w-3 h-3 mr-1"/>}
                          {activeTab === 'cancelled' && <Ban className="w-3 h-3 mr-1"/>}
                          {booking.status}
                         </span>
                         {activeTab === 'cancelled' && (
                           <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                             <CheckCircle className="w-3 h-3 mr-1"/>
                             Refund Processed
                           </span>
                         )}
                       </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        <Link to={`/hotel/${booking.hotelId}`} className="hover:underline">{booking.hotelName}</Link>
                      </h3>
                      <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        Booking ID: {booking.id}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${activeTab === 'cancelled' ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>
                        {booking.currency || '₹'}{booking.totalPrice.toLocaleString()}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm">Total Price</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">Check In</div>
                      <div className="font-medium text-slate-900 dark:text-white">{booking.checkIn}</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">Check Out</div>
                      <div className="font-medium text-slate-900 dark:text-white">{booking.checkOut}</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">Guests</div>
                      <div className="font-medium text-slate-900 dark:text-white">{booking.guests} Guests</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">Booked On</div>
                      <div className="font-medium text-slate-900 dark:text-white">{booking.bookedOn}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 p-6 flex items-center justify-center md:w-48">
                  {activeTab === 'upcoming' && (
                    <button 
                      onClick={() => initiateCancel(booking)}
                      className="w-full flex items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors font-medium text-sm border border-red-200 dark:border-red-900/30 group"
                    >
                      <XCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Cancel
                    </button>
                  )}
                  {activeTab === 'past' && (
                    <button 
                      onClick={() => handleOpenReview(booking)}
                      className="w-full flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-4 py-2 rounded-lg transition-colors font-medium text-sm border border-indigo-200 dark:border-indigo-900/30 group"
                    >
                      <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Review
                    </button>
                  )}
                  {activeTab === 'cancelled' && (
                    <button 
                      onClick={() => handleDelete(booking)}
                      className="w-full flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50 px-4 py-2 rounded-lg transition-colors font-medium text-sm hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
             <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                {activeTab === 'upcoming' && <Home className="w-8 h-8 text-slate-400" />}
                {activeTab === 'past' && <History className="w-8 h-8 text-slate-400" />}
                {activeTab === 'cancelled' && <Ban className="w-8 h-8 text-slate-400" />}
             </div>
             <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No {activeTab} bookings</h3>
             <p className="text-slate-500 dark:text-slate-400 mb-6">
               {activeTab === 'upcoming' 
                 ? "You don't have any upcoming trips planned." 
                 : activeTab === 'cancelled'
                 ? "You have no cancelled bookings in your history."
                 : "You haven't completed any trips with us yet."}
             </p>
             {activeTab === 'upcoming' && (
               <Link to="/search" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                 Start Exploring
               </Link>
             )}
          </div>
        )}

        {/* Review Modal */}
        <ReviewModal 
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSubmit={submitReview}
          hotelName={bookings.find(b => b.id === reviewBookingId)?.hotelName}
        />

        {/* Cancel Confirmation Modal */}
        {showCancelModal && bookingToCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setShowCancelModal(false)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 text-red-600 dark:text-red-500">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Cancel Booking?</h3>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                Are you sure you want to cancel your stay at <span className="font-bold text-slate-900 dark:text-white">{bookingToCancel.hotelName}</span>?
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-100 dark:border-slate-600 mb-6">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">Refund Policy</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  A full refund of <span className="font-bold">{bookingToCancel.currency || '₹'}{bookingToCancel.totalPrice.toLocaleString()}</span> will be processed to your original payment method. Funds typically appear within 3-5 days.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Keep Booking
                </button>
                <button 
                  onClick={confirmCancel}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Yes, Cancel Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;