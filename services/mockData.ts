import { Hotel, Booking } from '../types';

export const MOCK_HOTELS: Hotel[] = [
  // --- INTERNATIONAL (USD) ---
  {
    id: '1',
    name: 'Grand Plaza Resort',
    location: 'Downtown, New York',
    city: 'New York',
    description: 'Experience luxury in the heart of Manhattan. Steps away from Central Park and Times Square.',
    pricePerNight: 450,
    currency: '$',
    rating: 4.8,
    type: 'Hotel',
    image: 'https://picsum.photos/seed/nyc1/800/600',
    images: ['https://picsum.photos/seed/nyc1-1/800/600', 'https://picsum.photos/seed/nyc1-2/800/600'],
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant'],
    reviews: [
      { id: 'r1', user: 'John D.', rating: 5, comment: 'Amazing stay! The view of Central Park was breathtaking.', date: '2023-10-15' },
      { id: 'r2', user: 'Sarah M.', rating: 4, comment: 'Great location, though the elevators were a bit slow during rush hour.', date: '2023-09-20' }
    ]
  },
  {
    id: '2',
    name: 'Seaside Paradise Villa',
    location: 'Malibu, California',
    city: 'Los Angeles',
    description: 'A stunning oceanfront villa with private beach access and breathtaking sunset views.',
    pricePerNight: 850,
    currency: '$',
    rating: 4.9,
    type: 'Villa',
    image: 'https://picsum.photos/seed/la1/800/600',
    images: ['https://picsum.photos/seed/la1-1/800/600', 'https://picsum.photos/seed/la1-2/800/600'],
    amenities: ['WiFi', 'Beach Access', 'Kitchen', 'Parking', 'Pool'],
    reviews: [
      { id: 'r4', user: 'Emily R.', rating: 5, comment: 'Worth every penny. The private beach is a dream.', date: '2023-08-10' }
    ]
  },
  {
    id: '3',
    name: 'Urban Loft Boutique',
    location: 'Shibuya, Tokyo',
    city: 'Tokyo',
    description: 'Modern, minimalist design in the vibrant district of Shibuya. Perfect for young travelers.',
    pricePerNight: 180,
    currency: '$',
    rating: 4.5,
    type: 'Hotel',
    image: 'https://picsum.photos/seed/tokyo1/800/600',
    images: ['https://picsum.photos/seed/tokyo1-1/800/600'],
    amenities: ['WiFi', 'Bar', 'Concierge'],
    reviews: [
      { id: 'r6', user: 'Kenji S.', rating: 4, comment: 'Very stylish and clean. Room was small but expected for Tokyo.', date: '2023-11-30' }
    ]
  },
  {
    id: '5',
    name: 'Eiffel View Apartments',
    location: '7th Arrondissement, Paris',
    city: 'Paris',
    description: 'Romantic apartment with a direct view of the Eiffel Tower.',
    pricePerNight: 320,
    currency: '$',
    rating: 4.6,
    type: 'Apartment',
    image: 'https://picsum.photos/seed/paris1/800/600',
    images: [],
    amenities: ['WiFi', 'Kitchen', 'Balcony'],
    reviews: [
      { id: 'r10', user: 'Chloe B.', rating: 5, comment: 'The view is exactly like the photos. Stunning.', date: '2023-09-15' }
    ]
  },
  {
    id: '16',
    name: 'Bali Cliffside Villa',
    location: 'Uluwatu, Bali',
    city: 'Bali',
    description: 'Perched on limestone cliffs with panoramic ocean views. Private infinity pool and butler service.',
    pricePerNight: 550,
    currency: '$',
    rating: 4.9,
    type: 'Villa',
    image: 'https://picsum.photos/seed/bali1/800/600',
    images: ['https://picsum.photos/seed/bali1-1/800/600'],
    amenities: ['WiFi', 'Infinity Pool', 'Spa', 'Private Chef'],
    reviews: [
      { id: 'r28', user: 'Daniel C.', rating: 5, comment: 'The sunset view from the pool is unreal.', date: '2023-09-10' }
    ]
  },
  {
    id: '17',
    name: 'Santorini Sunset Cave',
    location: 'Oia, Santorini',
    city: 'Santorini',
    description: 'Authentic cave house with a caldera view. Watch the world-famous sunset from your private terrace.',
    pricePerNight: 600,
    currency: '$',
    rating: 4.9,
    type: 'Apartment',
    image: 'https://picsum.photos/seed/santorini1/800/600',
    images: ['https://picsum.photos/seed/santorini1-1/800/600'],
    amenities: ['WiFi', 'Hot Tub', 'Breakfast', 'View'],
    reviews: [
      { id: 'r29', user: 'Maria G.', rating: 5, comment: 'Dream bucket list item checked off!', date: '2023-08-15' }
    ]
  },
  {
    id: '18',
    name: 'Swiss Alpine Lodge',
    location: 'Zermatt, Switzerland',
    city: 'Zermatt',
    description: 'Ski-in/ski-out lodge with views of the Matterhorn. Cozy fireplace and gourmet dining.',
    pricePerNight: 420,
    currency: '$',
    rating: 4.8,
    type: 'Resort',
    image: 'https://picsum.photos/seed/swiss1/800/600',
    images: ['https://picsum.photos/seed/swiss1-1/800/600'],
    amenities: ['WiFi', 'Ski Storage', 'Sauna', 'Restaurant'],
    reviews: []
  },
  {
    id: '19',
    name: 'Dubai Marina Penthouse',
    location: 'Dubai Marina, Dubai',
    city: 'Dubai',
    description: 'Luxury high-rise apartment with stunning views of the marina and skyline.',
    pricePerNight: 350,
    currency: '$',
    rating: 4.7,
    type: 'Apartment',
    image: 'https://picsum.photos/seed/dubai1/800/600',
    images: [],
    amenities: ['WiFi', 'Pool', 'Gym', 'Parking'],
    reviews: []
  },

  // --- INDIAN (INR < 3000) ---
  {
    id: '9',
    name: 'Pink City Heritage Home',
    location: 'Civil Lines, Jaipur',
    city: 'Jaipur',
    description: 'A charming heritage homestay with traditional Rajasthani decor. Experience authentic hospitality on a budget.',
    pricePerNight: 2200,
    currency: '₹',
    rating: 4.7,
    type: 'Homestay',
    image: 'https://picsum.photos/seed/jaipur1/800/600',
    images: ['https://picsum.photos/seed/jaipur1-1/800/600'],
    amenities: ['WiFi', 'Garden', 'Home Cooked Food'],
    reviews: [
      { id: 'r14', user: 'Amit P.', rating: 5, comment: 'Felt like home! The host made delicious parathas.', date: '2024-02-14' }
    ]
  },
  {
    id: '10',
    name: 'Goa Backpackers Hostel',
    location: 'Anjuna, Goa',
    city: 'Goa',
    description: 'Vibrant hostel steps away from the beach. Meet travelers from around the world.',
    pricePerNight: 800,
    currency: '₹',
    rating: 4.5,
    type: 'Hotel',
    image: 'https://picsum.photos/seed/goa1/800/600',
    images: ['https://picsum.photos/seed/goa1-1/800/600'],
    amenities: ['WiFi', 'Bar', 'Common Area', 'Lockers'],
    reviews: [
      { id: 'r16', user: 'Rahul V.', rating: 4, comment: 'Great vibes and good music at the bar.', date: '2023-12-31' }
    ]
  },
  {
    id: '11',
    name: 'Mumbai City Pods',
    location: 'Andheri, Mumbai',
    city: 'Mumbai',
    description: 'Efficient and modern capsule hotel for the busy traveler. Clean, safe, and affordable.',
    pricePerNight: 1500,
    currency: '₹',
    rating: 4.4,
    type: 'Hotel',
    image: 'https://picsum.photos/seed/mumbai1/800/600',
    images: ['https://picsum.photos/seed/mumbai1-1/800/600'],
    amenities: ['WiFi', 'AC', '24h Front Desk'],
    reviews: [
      { id: 'r18', user: 'Vikram R.', rating: 5, comment: 'Perfect for a quick business trip.', date: '2024-03-01' }
    ]
  },
  {
    id: '12',
    name: 'Kerala Village Cottage',
    location: 'Varkala, Kerala',
    city: 'Kerala',
    description: 'Eco-friendly bamboo cottages nestled in nature. Just a short walk to the cliff.',
    pricePerNight: 1800,
    currency: '₹',
    rating: 4.6,
    type: 'Resort',
    image: 'https://picsum.photos/seed/kerala1/800/600',
    images: ['https://picsum.photos/seed/kerala1-1/800/600'],
    amenities: ['WiFi', 'Yoga Deck', 'Garden'],
    reviews: [
      { id: 'r20', user: 'Deepak M.', rating: 5, comment: 'So peaceful and calming.', date: '2023-12-05' }
    ]
  },
  {
    id: '13',
    name: 'Udaipur Lakeview Guest House',
    location: 'Lal Ghat, Udaipur',
    city: 'Udaipur',
    description: 'Simple guest house offering a million-dollar view of Lake Pichola from the rooftop terrace.',
    pricePerNight: 1200,
    currency: '₹',
    rating: 4.3,
    type: 'Homestay',
    image: 'https://picsum.photos/seed/udaipur1/800/600',
    images: ['https://picsum.photos/seed/udaipur1-1/800/600'],
    amenities: ['WiFi', 'Rooftop Cafe', 'Lake View'],
    reviews: [
      { id: 'r22', user: 'Raj & Simran', rating: 5, comment: 'Best sunset view in the city for this price.', date: '2023-11-20' }
    ]
  },
  {
    id: '14',
    name: 'Manali Backpackers Nest',
    location: 'Old Manali, Manali',
    city: 'Manali',
    description: 'Cozy wooden rooms with mountain views. Popular with trekkers and backpackers.',
    pricePerNight: 950,
    currency: '₹',
    rating: 4.5,
    type: 'Homestay',
    image: 'https://picsum.photos/seed/manali1/800/600',
    images: ['https://picsum.photos/seed/manali1-1/800/600'],
    amenities: ['WiFi', 'Bonfire', 'Cafe'],
    reviews: [
      { id: 'r24', user: 'Arjun K.', rating: 4, comment: 'Great vibes and the view is stunning.', date: '2023-12-15' }
    ]
  },
  {
    id: '15',
    name: 'Andaman Eco Huts',
    location: 'Neil Island, Andaman',
    city: 'Andaman',
    description: 'Sustainable eco-huts near the beach. Experience island life close to nature.',
    pricePerNight: 2500,
    currency: '₹',
    rating: 4.6,
    type: 'Resort',
    image: 'https://picsum.photos/seed/andaman1/800/600',
    images: ['https://picsum.photos/seed/andaman1-1/800/600'],
    amenities: ['WiFi', 'Beach Access', 'Bicycle Rental'],
    reviews: [
      { id: 'r26', user: 'Neha G.', rating: 5, comment: 'Simple living but beautiful location.', date: '2024-01-10' }
    ]
  },
  {
    id: '20',
    name: 'Rishikesh Yoga Stay',
    location: 'Tapovan, Rishikesh',
    city: 'Rishikesh',
    description: 'Peaceful rooms overlooking the Ganges. Daily yoga classes included.',
    pricePerNight: 1500,
    currency: '₹',
    rating: 4.8,
    type: 'Homestay',
    image: 'https://picsum.photos/seed/rishikesh1/800/600',
    images: [],
    amenities: ['WiFi', 'Yoga Hall', 'Vegetarian Food'],
    reviews: []
  },
  {
    id: '21',
    name: 'Coorg Coffee Estate Stay',
    location: 'Madikeri, Coorg',
    city: 'Coorg',
    description: 'Stay inside a lush coffee plantation. Wake up to the smell of fresh coffee and birdsong.',
    pricePerNight: 2800,
    currency: '₹',
    rating: 4.9,
    type: 'Homestay',
    image: 'https://picsum.photos/seed/coorg1/800/600',
    images: [],
    amenities: ['WiFi', 'Plantation Walk', 'Breakfast'],
    reviews: []
  },
  {
    id: '22',
    name: 'Pondicherry French Villa',
    location: 'White Town, Pondicherry',
    city: 'Pondicherry',
    description: 'Colonial style room in the heart of the French Quarter. Close to the promenade.',
    pricePerNight: 2900,
    currency: '₹',
    rating: 4.7,
    type: 'Hotel',
    image: 'https://picsum.photos/seed/pondy1/800/600',
    images: [],
    amenities: ['WiFi', 'AC', 'Bicycle Rental'],
    reviews: []
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    hotelId: '1',
    hotelName: 'Grand Plaza Resort',
    userId: 'demo@example.com',
    customerName: 'Demo User',
    checkIn: '2023-12-01',
    checkOut: '2023-12-05',
    guests: 2,
    totalPrice: 1800,
    currency: '$',
    status: 'Confirmed',
    bookedOn: '2023-11-15'
  },
  {
    id: 'b2',
    hotelId: '9',
    hotelName: 'Pink City Heritage Home',
    userId: 'demo@example.com',
    customerName: 'Demo User',
    checkIn: '2024-06-10',
    checkOut: '2024-06-12',
    guests: 2,
    totalPrice: 4400,
    currency: '₹',
    status: 'Confirmed',
    bookedOn: '2024-05-20'
  }
];