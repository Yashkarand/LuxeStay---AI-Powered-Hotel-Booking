import React from 'react';
import { LayoutDashboard, Users, Calendar, Hotel, CheckCircle, Clock, XCircle } from 'lucide-react';
import { MOCK_BOOKINGS, MOCK_HOTELS } from '../services/mockData';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Hotels', value: MOCK_HOTELS.length, icon: <Hotel className="w-6 h-6 text-blue-600 dark:text-blue-400" />, bg: 'bg-blue-50 dark:bg-blue-900/30' },
    { label: 'Active Bookings', value: MOCK_BOOKINGS.length, icon: <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />, bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
    { label: 'Total Revenue', value: '₹1,70,000', icon: <LayoutDashboard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />, bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
    { label: 'New Users', value: '12', icon: <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />, bg: 'bg-amber-50 dark:bg-amber-900/30' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white">Recent Bookings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-700 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3">Booking ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Hotel</th>
                  <th className="px-6 py-3">Check In</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {MOCK_BOOKINGS.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{booking.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{booking.customerName}</td>
                    <td className="px-6 py-4">{booking.hotelName}</td>
                    <td className="px-6 py-4">{booking.checkIn}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">₹{booking.totalPrice.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                        booking.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                         {booking.status === 'Confirmed' && <CheckCircle className="w-3 h-3"/>}
                         {booking.status === 'Pending' && <Clock className="w-3 h-3"/>}
                         {booking.status === 'Cancelled' && <XCircle className="w-3 h-3"/>}
                         {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium text-xs">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;