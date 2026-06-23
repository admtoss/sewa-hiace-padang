import { Car, MapPin, Mail, Phone, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import brandLogo from '../assets/images/regenerated_image_1781605997176.png';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Company profile column (Left) */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onScrollTo('hero')}>
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-800 bg-white shadow-sm shrink-0">
              <img 
                src={brandLogo} 
                alt="SEWA HIACE PADANG Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-white uppercase tracking-tight leading-none">SEWA HIACE</span>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest leading-none mt-1">PADANG</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Penyedia layanan rental transportasi minibus Toyota Hiace dan kendaraan penunjang pariwisata di Sumatera Barat. Kami mendedikasikan kenyamanan dan keamanan Anda melalui supir berpengalaman di jalur berbukit Sumbar dan unit kendaraan prima berkelas.
          </p>

          <div className="flex gap-2.5 pt-1.5">
            <a href="https://www.instagram.com/rentcar.afr/" target="_blank" rel="noreferrer" className="w-8.5 h-8.5 bg-slate-900 hover:bg-orange-500 hover:text-white rounded-xl flex items-center justify-center text-slate-300 transition-all shadow-sm">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/share/1CwLr21CX6/" target="_blank" rel="noreferrer" className="w-8.5 h-8.5 bg-slate-900 hover:bg-orange-500 hover:text-white rounded-xl flex items-center justify-center text-slate-300 transition-all shadow-sm">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com/@afrrentcar?si=PH78cIS-M-fq7C8p" target="_blank" rel="noreferrer" className="w-8.5 h-8.5 bg-slate-900 hover:bg-orange-500 hover:text-white rounded-xl flex items-center justify-center text-slate-300 transition-all shadow-sm">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Serviced Area Locations Column (Center 2) */}
        <div className="lg:col-span-3 text-left space-y-3.5">
          <p className="text-sm font-bold text-white tracking-wider uppercase border-l-2 border-orange-500 pl-2">Area Dukungan Layanan</p>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>• Penjemputan Bandara BIM</li>
            <li>• Kota Padang (Pusat Pemerintahan)</li>
            <li>• Kota Bukittinggi (Kawasan Wisata Jam Gadang)</li>
            <li>• Payakumbuh & Lembah Harau</li>
            <li>• Batusangkar & Istana Pagaruyung</li>
            <li>• Solok, Alahan Panjang, & Danau Singkarak</li>
            <li>• Painan & Kepulauan Bahari Mandeh</li>
          </ul>
        </div>

        {/* Contact Info Details Column (Right) */}
        <div className="lg:col-span-4 text-left space-y-4">
          <p className="text-sm font-bold text-white tracking-wider uppercase border-l-2 border-blue-600 pl-2 font-sans">Hubungi Kantor Kami</p>
          
          <div className="space-y-3.5 text-xs text-slate-400">
            <div className="flex gap-2.5 items-start">
              <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-normal">
                Jl. PGRI II No.17/19 Blok C, Kurao Pagang, Kec. Nanggalo, Kota Padang, Sumatera Barat 25176
              </p>
            </div>

            <div className="flex gap-2.5 items-center">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <p className="font-mono">+62 813-7402-4347</p>
            </div>

            <div className="flex gap-2.5 items-center">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <p>carrentafr@gmail.com</p>
            </div>

            <div className="flex gap-2.5 items-center">
              <Clock className="w-4 h-4 text-blue-500 shrink-0" />
              <p>Jam Operasional: 24 Jam (Setiap Hari)</p>
            </div>
          </div>
        </div>

      </div>

      {/* Baseline credits */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
        <p className="text-center sm:text-left">
          &copy; {currentYear} <strong className="text-white">SEWA HIACE PADANG</strong>. Hak Cipta Dilindungi. Layanan Sewa Terpercaya di Sumatera Barat.
        </p>
        <div className="flex gap-4 text-[11px] text-slate-450">
          <a href="#booking" className="hover:text-orange-500">Syarat & Ketentuan</a>
          <span>•</span>
          <a href="#faq" className="hover:text-orange-550">Kebijakan Privasi</a>
        </div>
      </div>
    </footer>
  );
}
