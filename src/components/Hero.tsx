import { ShieldCheck, Star, Sparkles, MapPin, CalendarRange } from 'lucide-react';
import commuterImage from '../assets/images/regenerated_image_1781600706209.jpg';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-slate-900 text-white flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Absolute Atmospheric Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-slate-900 to-slate-900" />
      
      {/* Subtle Grid overlay for texture */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Aesthetic glowing blobs */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full">
        
        {/* Left Column: Descriptive Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-1.5 self-center lg:self-start bg-slate-800 border border-slate-750 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-orange-400 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Rental Mobil #1 Terpercaya di Sumatera Barat</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            Jelajahi <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">Ranah Minang</span> Dengan Kenyamanan Maksimal
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Mitra resmi perjalanan Anda di Sumatera Barat. Menyediakan minibus <strong className="text-orange-400 font-bold">Toyota Hiace Commuter</strong> serta armada premium <strong className="text-orange-400 font-bold">Toyota Innova Reborn</strong> terlengkap. Siap melayani dengan supir berpengalaman untuk wisata keluarga, dinas kantor, dan antar-jemput bandara.
          </p>

          {/* Quick value tags */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl p-3">
              <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">100% Terawat</p>
                <p className="text-[10px] text-slate-400">Unit mulus & wangi</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl p-3">
              <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">Sopir Berpengalaman</p>
                <p className="text-[10px] text-slate-400">Asli Minang & ramah</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 col-span-2 md:col-span-1">
              <Star className="w-5 h-5 text-orange-500 shrink-0 fill-orange-500" />
              <div className="text-left">
                <p className="text-xs font-bold text-white">Sistem Mudah</p>
                <p className="text-[10px] text-slate-400">Pesan online cepat</p>
              </div>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              id="hero-book-button"
              onClick={() => onScrollTo('booking')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200"
            >
              <CalendarRange className="w-4 h-4" />
              Estimasi Biaya & Pesan Online
            </button>
            <button
              id="hero-fleet-button"
              onClick={() => onScrollTo('fleet')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold uppercase tracking-wider text-xs px-8 py-4 rounded-full active:scale-95 transition-all duration-200"
            >
              Katalog Armada
            </button>
          </div>
        </div>

        {/* Right Column: Visual illustration/Highlight Cards of West Sumatra Destinations and Premium Rent */}
        <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
          <div className="w-full max-w-md relative bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
            
            {/* Image Placeholder with custom labels */}
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-lg group">
              <img
                src={commuterImage}
                alt="Toyota Hiace Commuter"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div className="text-left">
                  <span className="bg-orange-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">Terlaris</span>
                  <p className="text-sm font-bold text-white">Toyota Hiace Commuter</p>
                </div>
                <p className="text-xs font-mono font-bold text-orange-400">Paling Nyaman</p>
              </div>
            </div>

            {/* Micro layout highlighting services in Padang-Bukittinggi */}
            <div className="mt-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-orange-500 px-1">Layanan Populer Kami:</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-700/40 hover:bg-slate-900/80 transition-all">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-white">Sewa Hiace + Supir</p>
                      <p className="text-[10px] text-slate-450">Kapasitas lega 11 - 15 Kursi penumpang</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">Mulai 1.1 Jt</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-700/40 hover:bg-slate-900/80 transition-all">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-white">Transfer Bandara BIM - Semua Area Sumbar</p>
                      <p className="text-[10px] text-slate-450">Antar jemput langsung bebas repot</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-orange-400 font-bold">All-In Hemat</span>
                </div>

                 <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-700/40 hover:bg-slate-900/80 transition-all">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-white">Sewa Innova Reborn + Supir</p>
                      <p className="text-[10px] text-slate-450">Nyaman, prima & selalu dengan supir</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-blue-400 font-bold">Mulai 500K</span>
                </div>
              </div>

              {/* Dynamic trust rating */}
              <div className="flex items-center justify-center gap-2 pt-1 border-t border-slate-800/50 text-[11px] text-slate-400">
                <span>Dipercayai oleh</span>
                <strong className="text-white font-bold">1,800+</strong> 
                <span>Keluarga, Perusahaan & Wisatawan</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
