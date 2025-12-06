import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Globe, Award, Heart, Shield, Clock } from 'lucide-react';

const PageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 transition-colors duration-200">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-700">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">{title}</h1>
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export const About: React.FC = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
    {/* Hero Section */}
    <div className="relative bg-indigo-900 py-24 sm:py-32">
       <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Team working" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-indigo-900/50 mix-blend-multiply"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">Redefining Modern Travel</h1>
        <p className="mt-6 text-lg leading-8 text-indigo-100 max-w-2xl mx-auto">
          We are LuxeStay. A team of explorers, engineers, and dreamers dedicated to making every journey unforgettable through technology and curated experiences.
        </p>
      </div>
    </div>

    {/* Stats Section */}
    <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">50+</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Global Destinations</div>
          </div>
          <div>
             <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">10k+</div>
             <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Happy Travelers</div>
          </div>
           <div>
             <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">24/7</div>
             <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Customer Support</div>
          </div>
           <div>
             <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">4.9</div>
             <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Average Rating</div>
          </div>
        </div>
      </div>
    </div>

    {/* Our Story */}
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Story</h2>
           <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300">
             <p>
               Founded in 2024, LuxeStay began with a simple idea: booking a luxury hotel should be as seamless and elegant as the stay itself. Frustrated by cluttered websites and hidden fees, we set out to build a platform that puts the traveler first.
             </p>
             <p>
               Today, we connect thousands of travelers with the world's most exquisite properties. From the royal palaces of Jaipur to the modern lofts of Tokyo, our hand-picked collection ensures quality over quantity.
             </p>
             <p>
               We leverage cutting-edge AI to personalize your experience, understanding that no two travelers are alike. Whether you seek adventure or tranquility, LuxeStay guides you home.
             </p>
           </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <img className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hotel Interior" />
           <img className="rounded-2xl shadow-lg w-full h-64 object-cover" src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Resort Pool" />
        </div>
      </div>
    </div>

    {/* Values / Why Choose Us */}
    <div className="bg-slate-100 dark:bg-slate-900/50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Choose LuxeStay</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400">Experience the difference of a travel partner that cares.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Curated Excellence</h3>
            <p className="text-slate-600 dark:text-slate-400">We personally verify every property to ensure it meets our strict standards of luxury and comfort.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Secure & Transparent</h3>
            <p className="text-slate-600 dark:text-slate-400">No hidden fees. State-of-the-art security keeps your data and payments safe at all times.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center hover:shadow-md transition-shadow">
             <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-400">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">AI Personalization</h3>
            <p className="text-slate-600 dark:text-slate-400">Our smart algorithms learn what you love, delivering recommendations that feel hand-picked just for you.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Careers: React.FC = () => (
  <PageLayout title="Careers">
    <p className="mb-8 text-xl text-slate-500 dark:text-slate-400">
      Build the future of travel with us. We're a remote-first company with a passion for exploration.
    </p>
    <div className="space-y-6">
      {[
        { title: "Senior Software Engineer", loc: "Remote • Engineering", desc: "Scale our React & Node.js infrastructure to handle millions of bookings." },
        { title: "Product Designer", loc: "New York, NY • Design", desc: "Shape the visual identity of LuxeStay and craft intuitive user journeys." },
        { title: "Global Operations Manager", loc: "London, UK • Ops", desc: "Oversee our partnerships with luxury hotel chains across Europe and Asia." }
      ].map((job, idx) => (
        <div key={idx} className="group border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-pointer bg-slate-50 dark:bg-slate-700/30 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{job.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium uppercase tracking-wide">{job.loc}</p>
              <p className="text-slate-600 dark:text-slate-300">{job.desc}</p>
            </div>
            <span className="text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">Apply &rarr;</span>
          </div>
        </div>
      ))}
    </div>
  </PageLayout>
);

export const Press: React.FC = () => (
  <PageLayout title="Press & Media">
    <p className="mb-6">For media inquiries, interviews, or brand assets, please contact <a href="mailto:press@luxestay.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">press@luxestay.com</a>.</p>
    
    <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Recent Highlights</h3>
    <div className="space-y-8">
      <div className="border-l-4 border-indigo-500 pl-6">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">May 20, 2024</p>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white">LuxeStay Expands to India</h4>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          We are thrilled to announce 50+ new luxury properties across Jaipur, Goa, Mumbai, and Kerala. "India is a market vibrant with culture and hospitality," says CEO Jane Doe.
        </p>
      </div>
      <div className="border-l-4 border-indigo-500 pl-6">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">March 15, 2024</p>
        <h4 className="text-xl font-bold text-slate-900 dark:text-white">Introducing AI Concierge</h4>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Our new Gemini-powered recommendation engine is changing how people discover hotels, offering hyper-personalized suggestions based on natural language queries.
        </p>
      </div>
    </div>
  </PageLayout>
);

const HelpArticle: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden mb-4 bg-slate-50 dark:bg-slate-700/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export const HelpCenter: React.FC = () => (
  <PageLayout title="Help Center">
    <p className="mb-8">Find answers to common questions about booking, payments, and account management.</p>
    
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4 uppercase tracking-wider">Bookings & Cancellations</h3>
      <HelpArticle 
        question="How do I cancel my reservation?" 
        answer="To cancel a reservation, go to your 'My Bookings' dashboard. Locate the upcoming trip you wish to cancel and click the 'Cancel' button. Please note that cancellations made within 48 hours of check-in may be subject to a fee." 
      />
      <HelpArticle 
        question="Can I modify my dates after booking?" 
        answer="Currently, you cannot modify dates directly. You must cancel the existing booking and create a new reservation for the desired dates. We are working on a direct modification feature." 
      />
      
      <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4 mt-8 uppercase tracking-wider">Payments</h3>
      <HelpArticle 
        question="When will I be charged?" 
        answer="LuxeStay generally charges your payment method at the time of booking confirmation. However, some hotels offer a 'Pay at Hotel' option, which will be clearly indicated during the checkout process." 
      />
       <HelpArticle 
        question="Is my payment information secure?" 
        answer="Absolutely. We use industry-standard encryption and partner with Stripe to process payments. We do not store your full credit card details on our servers." 
      />
    </div>
  </PageLayout>
);

export const Terms: React.FC = () => (
  <PageLayout title="Terms of Service">
    <div className="text-sm space-y-6">
      <p className="italic text-slate-500">Last Updated: May 2024</p>
      
      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Agreement to Terms</h3>
        <p>By accessing or using the LuxeStay platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. Use of Service</h3>
        <p>You must be at least 18 years old to use this service. You are responsible for maintaining the confidentiality of your account and password.</p>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Booking Conditions</h3>
        <p>When you make a booking, you agree to the hotel's specific terms regarding cancellations, check-in times, and house rules. LuxeStay acts as an intermediary and is not responsible for the hotel's onsite service.</p>
      </section>

       <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">4. User Content</h3>
        <p>Any reviews or photos you post must be your own work. We reserve the right to remove content that is offensive, irrelevant, or spam.</p>
      </section>
    </div>
  </PageLayout>
);

export const Privacy: React.FC = () => (
  <PageLayout title="Privacy Policy">
    <div className="text-sm space-y-6">
      <p className="italic text-slate-500">Last Updated: May 2024</p>
      
      <p>At LuxeStay, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>
      
      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Information We Collect</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Personal Data:</strong> Name, email address, phone number when you register.</li>
          <li><strong>Transaction Data:</strong> Booking details and partial payment information.</li>
          <li><strong>Usage Data:</strong> How you interact with our website, including search queries.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">How We Use Your Data</h3>
        <p>We use your data to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Process your bookings and send confirmations.</li>
          <li>Provide customer support.</li>
          <li>Improve our AI recommendation algorithms.</li>
          <li>Send marketing emails (which you can opt out of).</li>
        </ul>
      </section>

       <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Data Security</h3>
        <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.</p>
      </section>
    </div>
  </PageLayout>
);