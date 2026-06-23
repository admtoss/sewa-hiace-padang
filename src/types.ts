export interface Vehicle {
  id: string;
  name: string;
  type: 'minibus' | 'suv' | 'sedan' | 'mpv';
  seats: number;
  luggage: number;
  transmission: 'Manual' | 'Otomatis' | 'Kededuanya';
  dailyPriceSelfDrive: number | null; // null if only available with driver
  dailyPriceWithDriver: number;
  image: string;
  features: string[];
  recommendedFor: string;
}

export type ServiceType = 'lepas_kunci' | 'dengan_supir' | 'all_in'; // all_in is car + driver + fuel/bbm

export interface TouristRoute {
  id: string;
  name: string;
  duration: string;
  destinations: string[];
  description: string;
  priceEstimate: number;
  image: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  vehicleId: string;
  serviceType: ServiceType;
  startDate: string;
  durationDays: number;
  pickupLocation: string;
  dropoffLocation: string;
  notes?: string;
  totalPrice: number;
  timestamp: number;
  status: 'Draft' | 'Sent';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  origin: string;
  comment: string;
  rating: number;
  avatar: string;
}
