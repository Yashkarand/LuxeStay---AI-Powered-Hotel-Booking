import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Shield, Lock, Calendar, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { useBookings } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const bookingDetails = location.state?.bookingDetails;

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!bookingDetails || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Session Expired</h2>
          <button onClick={() => navigate('/')} className="text-indigo-600 font-medium hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  const currency = bookingDetails.currency || '₹';
  const cleaningFee = currency === '₹' ? 500 : 30;
  const subTotal = bookingDetails.totalPrice - cleaningFee;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (cardNumber.length < 16 || cvv.length < 3 || !expiry || !nameOnCard) {
      setError('Please enter valid payment details.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      addBooking({
        ...bookingDetails,
        userId: user.email,
        customerName: user.name,
      });

      addNotification(
        'Booking Confirmed!',
        `Your reservation at ${bookingDetails.hotelName} is confirmed. A receipt has been sent to ${user.email}.`,
        'success'
      );

      setIsProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Payment Details */}
          <div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Payment Method</h2>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                      className="block w-full pl-10 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name on Card</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>Pay {currency}{bookingDetails.totalPrice.toLocaleString()}</>
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">
                  <Shield className="w-3 h-3" />
                  Payments are secure and encrypted
                </div>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                  <img src={bookingDetails.image} alt={bookingDetails.hotelName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{bookingDetails.hotelName}</h3>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{bookingDetails.location}</div>
                  <div className="inline-block bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold px-2 py-1 rounded mt-2">
                    {bookingDetails.guests} Guests
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Check-In</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">{bookingDetails.checkIn}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Check-Out</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">{bookingDetails.checkOut}</span>
                </div>
                 <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>Guests</span>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">{bookingDetails.guests}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span>Subtotal</span>
                  <span>{currency}{subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span>Cleaning Fee</span>
                  <span>{currency}{cleaningFee}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-slate-900 dark:text-white pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span>Total Due</span>
                  <span>{currency}{bookingDetails.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  <strong>Free Cancellation</strong> until 24 hours before check-in. Book now to lock in this price.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;