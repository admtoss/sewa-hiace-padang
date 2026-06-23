import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FleetSection from './components/FleetSection';
import BookingForm from './components/BookingForm';
import ToursSection from './components/ToursSection';
import FaqSection from './components/FaqSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import { Booking } from './types';
import { HelpCircle, Phone, ArrowUp, Sparkles, Star, Users, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [refreshHistory, setRefreshHistory] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to adjust nav headers and floating triggers
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['hero', 'fleet', 'booking', 'tours', 'faq', 'history'];
      const scrollPos = window.scrollY + 160;

      for (const sectionId of sections) {
        const checkEl = document.getElementById(sectionId);
        if (checkEl) {
          const top = checkEl.offsetTop;
          const height = checkEl.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Utility to scroll dynamically to selected anchor tags with offset
  const handleScrollToSegment = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 85;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  // Callback when user clicks "Pesan Unit Ini" mapping to the Booking Calculator
  const handleAutoSelectVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setSelectedRouteId('');
    handleScrollToSegment('booking');
  };

  // Helper when user selects a recommended tour itinerary, pre-populating inputs
  const handleTourSelect = (vehicleId: string, notes: string, routeId?: string) => {
    setSelectedVehicleId(vehicleId);
    if (routeId) {
      setSelectedRouteId(routeId);
    } else {
      setSelectedRouteId('');
    }
    
    // Smooth scroll first
    handleScrollToSegment('booking');
  };

  // Callback when a successful Booking saves in local storage, triggering history state update
  const handleNewBookingCreated = (newBooking: Booking) => {
    setRefreshHistory((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Top sticky navigation */}
      <Navbar onScrollTo={handleScrollToSegment} activeSection={activeSection} />

      {/* Main Sections */}
      <main>
        {/* Landing Welcome Block */}
        <Hero onScrollTo={handleScrollToSegment} />

        {/* Benefits Highlights Ribbon */}
        <section id="banner-highlights" className="py-8 bg-gradient-to-r from-blue-950 to-slate-900 text-white shadow-inner border-y border-blue-900/45">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center gap-1.5 p-2">
              <Star className="w-6 h-6 text-blue-400 fill-blue-400 animate-pulse-subtle" />
              <p className="font-extrabold text-base tracking-tight font-sans">Sopir Berpengalaman</p>
              <p className="text-[10px] text-blue-200/80">Khas berbukit Sitinjau Lauik / Kelok Kelok</p>
            </div>

            <div className="flex flex-col items-center gap-1.5 p-2 border-l border-blue-900/60 lg:border-l">
              <Users className="w-6 h-6 text-blue-400" />
              <p className="font-extrabold text-base tracking-tight font-sans">Pilihan Unit Lengkap</p>
              <p className="text-[10px] text-blue-200/80">Innova Reborn, Hiace Commuter & Premio</p>
            </div>

            <div className="flex flex-col items-center gap-1.5 p-2 border-l border-blue-900/60 lg:border-l">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              <p className="font-extrabold text-base tracking-tight font-sans">100% On-Time & Bersih</p>
              <p className="text-[10px] text-blue-200/80">Penjemputan bandara & hotel terpercaya</p>
            </div>

            <div className="flex flex-col items-center gap-1.5 p-2 border-l border-blue-900/60 lg:border-l">
              <Heart className="w-6 h-6 text-blue-400 fill-blue-400" />
              <p className="font-extrabold text-base tracking-tight font-sans">Pelayanan Budaya Ramah</p>
              <p className="text-[10px] text-blue-200/80">Ramah tamah, santun, & solutif</p>
            </div>

          </div>
        </section>

        {/* Vehicle Grid Catalog */}
        <FleetSection onSelectVehicle={handleAutoSelectVehicle} />

        {/* Booking Form with calculations */}
        <BookingForm 
          selectedVehicleId={selectedVehicleId} 
          selectedRouteId={selectedRouteId}
          onBookingSuccess={handleNewBookingCreated} 
        />

        {/* Scenic Recommended Itinerary Tour Tracks */}
        <ToursSection onSelectRoute={handleTourSelect} />

        {/* FAQ Toggles */}
        <FaqSection />

        {/* Travel Documentation Gallery Section */}
        <GallerySection />
      </main>

      {/* Website Footer & Contact mapping details */}
      <Footer onScrollTo={handleScrollToSegment} />

      {/* FLOATING ACTION UTILITIES */}
      
      {/* 1. Floating Quick-Contact WhatsApp overlay for client inquiries */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {showScrollTop && (
          <button
            id="scroll-to-top-button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-white text-emerald-900 border border-slate-200 rounded-full flex items-center justify-center shadow-lg transition-all hover:bg-slate-50 hover:-translate-y-0.5"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <a
          href="https://wa.me/6281374024347?text=Halo%20Sewa%20Hiace%20Padang%2C%20saya%20tertarik%20menyewa%20minibus%20Hiace%20untuk%20perjalanan%20saya%20ke%20Sumatera%20Barat."
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-widget"
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 relative group animate-pulse-subtle"
          title="Butuh Bantuan? WhatsApp Kami"
        >
          <Phone className="w-6 h-6" />
          {/* Notification bubble badge */}
          <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-emerald-950 font-black text-[9px] w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
             CS
          </span>
          {/* Tooltip on hover */}
          <span className="absolute right-16 bg-emerald-950 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Hubungi CS Sewa Hiace Padang (24 Jam)
          </span>
        </a>
      </div>

    </div>
  );
}
