import { useState, useEffect } from 'react';
import { MapPin, User, Car, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import img1 from '../assets/images/gallery_group_hiace_1781894654331.jpg';
import img2 from '../assets/images/gallery_lake_view_1781894671369.jpg';
import img3 from '../assets/images/gallery_mandeh_road_1781894684394.jpg';
import img4 from '../assets/images/gallery_volcanic_lake_1781894698062.jpg';
import img5 from '../assets/images/gallery_mountain_rain_1781894711865.jpg';
import img6 from '../assets/images/gallery_hiace_fleet_1781894724763.jpg';

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: 'alam' | 'budaya' | 'armada';
  categoryLabel: string;
  clientName: string;
  vehicleUsed: string;
  date: string;
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Keceriaan Rombongan',
    location: 'Padang / Bukittinggi, Sumatera Barat',
    category: 'armada',
    categoryLabel: 'Armada & Tamu',
    clientName: 'Grup Ibu-Ibu arisan Pesona (Pekanbaru)',
    vehicleUsed: 'Toyota Hiace Commuter',
    date: 'Juni 2026',
    image: 'https://i.ibb.co.com/Fb1t2m1t/1.webp',
    description: 'Keceriaan rombongan wisata saat berpose bersama armada Toyota Hiace Commuter yang bersih, dingin, dan sangat nyaman selama perjalanan menjelajahi Sumatera Barat.'
  },
  {
    id: '2',
    title: 'Puncak Panorama Danau',
    location: 'Alahan Panjang, Solok, Sumatera Barat',
    category: 'alam',
    categoryLabel: 'Wisata Alam',
    clientName: 'Rombongan Reuni Alumni Universitas',
    vehicleUsed: 'Toyota Hiace Commuter',
    date: 'Juni 2026',
    image: 'https://i.ibb.co.com/Pvx78LSv/2.webp',
    description: 'Menikmati panorama spektakuler jajaran perbukitan hijau dan danau kembar di Alahan Panjang yang berhawa dingin menyegarkan.'
  },
  {
    id: '3',
    title: 'Eksotika Puncak Mandeh',
    location: 'Pesisir Selatan, Sumatera Barat',
    category: 'alam',
    categoryLabel: 'Wisata Alam',
    clientName: 'Majelis Taklim Khairunnisa (Riau)',
    vehicleUsed: 'Toyota Hiace Commuter',
    date: 'Juni 2026',
    image: 'https://i.ibb.co.com/5Xv48tXK/3.webp',
    description: 'Berfoto bersama dengan busana bernuansa jingga di sepanjang jalur aspal mulus pesisir Mandeh dengan latar belakang pulau-pulau tropis yang menawan.'
  },
  {
    id: '4',
    title: 'Pesona Danau Singkarak',
    location: 'Solok / Tanah Datar, Sumatera Barat',
    category: 'alam',
    categoryLabel: 'Wisata Alam',
    clientName: 'Keluarga Besar Ibu Rahmawati (Medan)',
    vehicleUsed: 'Toyota Hiace Commuter',
    date: 'Juni 2026',
    image: 'https://i.ibb.co.com/pjyn1tHt/4.webp',
    description: 'Momen kehangatan keluarga berkumpul menikmati keindahan air danau Singkarak yang tenang di bawah rimbun pohon berlatar Gunung Singgalang.'
  },
  {
    id: '5',
    title: 'Petualangan Lereng Gunung',
    location: 'Gunung Talang, Solok, Sumatera Barat',
    category: 'alam',
    categoryLabel: 'Wisata Alam',
    clientName: 'Komunitas Pendaki & Pencinta Alam',
    vehicleUsed: 'Toyota Hiace 4x4',
    date: 'Juni 2026',
    image: 'https://i.ibb.co.com/SXd5dQVG/5.webp',
    description: 'Kesiapan armada tangguh melayani perjalanan para petualang menerobos jalur berkabut dan basah menuju basecamp pendakian pegunungan.'
  },
  {
    id: '6',
    title: 'Konvoi Armada di Alahan Panjang',
    location: 'Cottage Kayu Alahan Panjang, Sumatera Barat',
    category: 'armada',
    categoryLabel: 'Armada & Tamu',
    clientName: 'Grup Corporate Gathering Bank Mandiri',
    vehicleUsed: 'Toyota Hiace Commuter Fleet',
    date: 'Juni 2026',
    image: 'https://i.ibb.co.com/zH8s9s2q/6.webp',
    description: 'Barisan armada Hiace prima berjejer rapi di pelataran penginapan Alahan Panjang siap memberikan kenyamanan ekstra bagi rombongan korporat.'
  }
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const handlePrevSlide = () => {
    setDirection('prev');
    setActiveIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const handleNextSlide = () => {
    setDirection('next');
    setActiveIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentItem = GALLERY_ITEMS[activeIndex];

  const slideVariants = {
    initial: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? 40 : -40,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' }
    },
    exit: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' }
    })
  };

  return (
    <section id="history" className="py-16 bg-slate-50 border-t border-b border-slate-250">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Title and Header Description */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-orange-100 shadow-sm">
            <Camera className="w-3.5 h-3.5" />
            Dokumentasi Perjalanan
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Galeri Momen Indah Bersama Sewa Hiace Padang
          </h2>
          <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full" />
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Realita perjalanan bahagia para tamu dan rombongan saat melintasi pemandangan alam memukau serta cagar budaya luhur di Sumatera Barat.
          </p>
        </div>

        {/* Main Slider Panel wrapper */}
        <div className="relative max-w-3xl mx-auto">
          
          {/* Main Slider Frame */}
          <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-205 shadow-lg">
            
            {/* Image display container */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.img
                  key={currentItem.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  src={currentItem.image}
                  alt={currentItem.location}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
              </AnimatePresence>

              {/* Simple gradient overlay on bottom of the image path */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 to-transparent pointer-events-none" />

              {/* Desktop Nav Indicators */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 md:w-11 h-10 md:h-11 bg-white/95 hover:bg-white text-slate-800 hover:text-orange-600 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-md z-10 cursor-pointer"
                title="Sebelumnya"
              >
                <ChevronLeft className="w-5 md:w-5.5 h-5 md:h-5.5" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 md:w-11 h-10 md:h-11 bg-white/95 hover:bg-white text-slate-800 hover:text-orange-600 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-md z-10 cursor-pointer"
                title="Berikutnya"
              >
                <ChevronRight className="w-5 md:w-5.5 h-5 md:h-5.5" />
              </button>
            </div>

            {/* Informational Details placed strictly below the photo */}
            <div className="p-6 md:p-8 bg-white border-t border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left text-slate-700">
                
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-orange-50 shrink-0">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Lokasi Perjalanan</span>
                    <strong className="text-slate-800 text-[13px] font-extrabold block truncate" title={currentItem.location}>
                      {currentItem.location}
                    </strong>
                  </div>
                </div>

                {/* Guest Name */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-orange-50 shrink-0">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Tamu / Rombongan</span>
                    <strong className="text-slate-800 text-[13px] font-extrabold block truncate" title={currentItem.clientName}>
                      {currentItem.clientName}
                    </strong>
                  </div>
                </div>

                {/* Fleet / Vehicle Used */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-orange-50 shrink-0">
                    <Car className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Pilihan Armada</span>
                    <strong className="text-slate-800 text-[13px] font-extrabold block truncate" title={currentItem.vehicleUsed}>
                      {currentItem.vehicleUsed}
                    </strong>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Slider indicators: Other image thumbnails */}
          <div className="mt-8 flex flex-wrap justify-center gap-3.5 px-2">
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setDirection(idx > activeIndex ? 'next' : 'prev');
                  setActiveIndex(idx);
                }}
                className={`relative w-16 md:w-20 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-xs shrink-0 ${
                  activeIndex === idx 
                    ? 'border-orange-500 scale-108 opacity-100 ring-2 ring-orange-200' 
                    : 'border-slate-200 opacity-60 hover:opacity-90 hover:border-slate-350'
                }`}
                title={`Pilih dokumentasi ${item.title}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
