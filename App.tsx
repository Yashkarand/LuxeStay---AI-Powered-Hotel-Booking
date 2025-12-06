import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import HotelDetails from './pages/HotelDetails';
import Login from './pages/Login';
import Profile from './pages/Profile';
import UserDashboard from './pages/UserDashboard';
import Checkout from './pages/Checkout';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { BookingProvider } from './context/BookingContext';
import { HotelProvider } from './context/HotelContext';
import { NotificationProvider } from './context/NotificationContext';
import { About, Careers, Press, HelpCenter, Terms, Privacy } from './pages/ContentPages';
import CookieConsent from './components/CookieConsent';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <HotelProvider>
          <BookingProvider>
            <NotificationProvider>
              <Router>
                <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/hotel/:id" element={<HotelDetails />} />
                      <Route path="/dashboard" element={<UserDashboard />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/profile" element={<Profile />} />
                      
                      {/* Content Pages */}
                      <Route path="/about" element={<About />} />
                      <Route path="/careers" element={<Careers />} />
                      <Route path="/press" element={<Press />} />
                      <Route path="/help" element={<HelpCenter />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                    </Routes>
                  </main>
                  <Footer />
                  <CookieConsent />
                </div>
              </Router>
            </NotificationProvider>
          </BookingProvider>
        </HotelProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;