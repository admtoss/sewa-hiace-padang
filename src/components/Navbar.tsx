import { useState, useEffect } from 'react';
import { Car, Menu, X, Phone, Compass, CalendarRange, HelpCircle, Camera } from 'lucide-react';
import brandLogo from '../assets/images/regenerated_image_1781605997176.png';

interface NavbarProps {
  onScrollTo: (id: string) => void;
  activeSection: string;
}

export default function Navbar({ onScrollTo, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Armada Kami', id: 'fleet', icon: Car },
    { label: 'Estimator & Pesan', id: 'booking', icon: CalendarRange },
    { label: 'Paket Tour Wisata', id: 'tours', icon: Compass },
    { label: 'Tanya Jawab', id: 'faq', icon: HelpCircle },
    { label: 'Galeri Perjalanan', id: 'history', icon: Camera },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="app-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-slate-200'
          : 'bg-slate-900/90 md:bg-slate-900/20 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden border border-slate-200 bg-white">
            <img 
              src={brandLogo} 
              alt="SEWA HIACE PADANG Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <div className="flex flex-col items-start text-left">
              <span className={`font-black text-sm md:text-base tracking-tighter transition-colors uppercase leading-none ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}>
                SEWA HIACE
              </span>
              <span className="text-[10px] md:text-xs font-black text-orange-500 tracking-widest uppercase leading-none mt-1">
                PADANG
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-105/10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-sm'
                    : isScrolled
                    ? 'text-slate-705 hover:text-orange-500 hover:bg-slate-50'
                    : 'text-slate-200 hover:text-white hover:bg-white/15'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/6281374024347?text=Halo%20Sewa%20Hiace%20Padang%2C%20saya%20tertarik%20menyewa%20minibus%20Hiace%20untuk%20perjalanan%20saya%20ke%20Sumatera%20Barat."
            target="_blank"
            rel="noopener noreferrer"
            id="navbar-wa-button"
            className="bg-emerald-500 text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-lg shadow-emerald-200/50 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all uppercase tracking-wider"
          >
            <Phone className="w-3.5 h-3.5" />
            Sewa via WA
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2.5 rounded-xl transition-all ${
            isScrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer menu */}
      {isOpen && (
        <div 
          id="mobile-menu-drawer"
          className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-5 md:hidden animate-fade-in flex flex-col gap-3 z-50 transition-all duration-300"
        >
          <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1 px-3">Menu Navigasi</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500 pl-3 font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-orange-500'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
          <div className="h-[1px] bg-slate-100 my-2" />
          <a
            href="https://wa.me/6281374024347?text=Halo%2520Sewa%2520Hiace%2520Padang%252C%2520saya%2520tertarik%2520menyewa%2520minibus%2520Hiace%2520untuk%2520perjalanan%2520di%2520Sumbar."
            target="_blank"
            rel="noopener noreferrer"
            id="mobile-navbar-wa-button"
            className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md shadow-emerald-200/50"
          >
            <Phone className="w-4.5 h-4.5" />
            Hubungi WhatsApp Admin
          </a>
        </div>
      )}
    </nav>
  );
}
