import { TOURIST_ROUTES } from '../data';
import { Compass, CalendarCheck, MapPin, Send } from 'lucide-react';

interface ToursSectionProps {
  onSelectRoute: (vehicleType: string, noteText: string, routeId?: string) => void;
}

export default function ToursSection({ onSelectRoute }: ToursSectionProps) {
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleRouteSelect = (route: typeof TOURIST_ROUTES[0]) => {
    const routeDests = route.destinations.join(' → ');
    const noteText = `Halo, saya ingin menanyakan Rental Hiace/Mobil untuk Paket Tour Wisata "${route.name}". Rute: ${routeDests}. Durasi: ${route.duration}. Mohon draf harganya dicocokkan.`;
    
    // Auto preset to Hiace if possible or standard MPV
    const defaultVehicle = 'hiace-commuter';
    onSelectRoute(defaultVehicle, noteText, route.id);
  };  return (
    <section id="tours" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-705 text-orange-450 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-orange-500" />
            Rute & Referensi Liburan Sumbar
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Paket Perjalanan & Destinasi Favorit
          </h2>
          <p className="text-slate-300 text-sm md:text-base">
            Ingin wisata tapi bingung menyusun itinerary? Lihat paket referensi rute paling dicari oleh wisatawan nusantara. Kami siap mendampingi perjalanan Anda dari jemputan Bandara BIM hingga pulang kembali.
          </p>
        </div>

        {/* Routes Grid Display */}
        <div id="tours-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOURIST_ROUTES.map((route) => (
            <div
              key={route.id}
              id={`tour-card-${route.id}`}
              className="bg-slate-800/50 border border-slate-700/50 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1 hover:border-orange-500/50 transition-all duration-350 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {route.duration}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                    {route.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-normal">
                    {route.description}
                  </p>

                  <div className="border-t border-slate-800 py-3 mb-4 space-y-1.5">
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      Destinasi Utama Rute:
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {route.destinations.map((dest, i) => (
                        <span
                          key={i}
                          className="bg-slate-900/60 border border-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                        >
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer and select */}
                <div className="pt-4 border-t border-slate-800 mt-auto flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Estimasi Tarif Hiace</span>
                    <span className="text-base font-black font-mono text-orange-400">
                      {formatRupiah(route.priceEstimate)}
                      <span className="text-[10px] text-slate-400 font-normal"> /Mobil</span>
                    </span>
                  </div>

                  <button
                    id={`route-select-btn-${route.id}`}
                    onClick={() => handleRouteSelect(route)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0 uppercase tracking-wider shadow-md shadow-emerald-500/10 active:scale-95"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    Pesan Paket
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Informative Map Card Banner */}
        <div className="mt-14 bg-slate-950 border border-slate-800 p-6 rounded-3xl text-left grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <h4 className="text-lg font-bold text-white uppercase tracking-wide">Butuh Custom Itinerary Sendiri?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Anda bebas mendesain rute kunjungan Anda, misalnya ziarah keluarga, kuliner ekstrim pesisir, perjalanan dinas multi-daerah (Solok, Sawahlunto, Dharmasraya). WhatsApp kami sekarang dan konsultasikan rute impian Anda bersama admin profesional kami secara Gratis!
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <a
              href="https://wa.me/6281374024347?text=Halo%2520Sewa%2520Hiace%2520Padang%252C%2520saya%2520butuh%2520custom%2520itinerary%2520untuk%2520perjalanan%2520keluarga."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center md:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-full text-xs transition-all tracking-wider uppercase shadow-lg shadow-emerald-500/20 active:scale-95 duration-200"
              id="custom-tour-cta"
            >
              <Send className="w-4 h-4 animate-pulse" />
              KONSULTASI RUTE GRATIS
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
