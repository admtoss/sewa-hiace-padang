import { VEHICLES } from '../data';
import { Vehicle } from '../types';
import { Users, Briefcase, Settings2, BadgeCheck, CheckCircle2 } from 'lucide-react';

interface FleetSectionProps {
  onSelectVehicle: (vehicleId: string) => void;
}

export default function FleetSection({ onSelectVehicle }: FleetSectionProps) {
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section id="fleet" className="py-20 bg-neutral-50 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            Katalog Armada
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Pilihan Kendaraan Prima & Terawat
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Mulai dari armada keluarga bertenaga hingga minibus Toyota Hiace eksekutif mewah. Seluruh armada selalu dibersihkan, diservis berkala, dan berasuransi demi keamanan perjalanan Anda.
          </p>
        </div>

        {/* Grid Fleet Output */}
        <div id="fleet-grid" className="flex flex-wrap justify-center gap-8">
          {VEHICLES.map((vehicle: Vehicle) => {
            const hasSelfDrive = vehicle.dailyPriceSelfDrive !== null;

            return (
              <div
                key={vehicle.id}
                id={`fleet-card-${vehicle.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-350 hover:-translate-y-1 block flex flex-col justify-between w-full max-w-sm md:max-w-[380px]"
              >
                {/* Vehicle Image with Tag overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm text-orange-400 text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {vehicle.type === 'minibus' ? 'Minibus Eksekutif' : vehicle.type.toUpperCase()}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 hover:text-orange-500 transition-colors mb-2">
                      {vehicle.name}
                    </h3>
                    
                    {/* Key Technical specifications */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-slate-600 mb-4 bg-slate-50 p-2 rounded-xl">
                      <div className="flex flex-col items-center justify-center text-center">
                        <Users className="w-4.5 h-4.5 text-orange-500 mb-1" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Kapasitas</span>
                        <p className="text-xs font-bold text-slate-800">{vehicle.seats} Kursi</p>
                      </div>

                      <div className="flex flex-col items-center justify-center text-center border-x border-slate-200">
                        <Briefcase className="w-4.5 h-4.5 text-orange-500 mb-1" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Bagasi</span>
                        <p className="text-xs font-bold text-slate-800">{vehicle.luggage} Koper</p>
                      </div>

                      <div className="flex flex-col items-center justify-center text-center">
                        <Settings2 className="w-4.5 h-4.5 text-orange-500 mb-1" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Transmisi</span>
                        <p className="text-xs font-bold text-slate-800">{vehicle.transmission}</p>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="mb-4 space-y-1.5">
                      <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1.5">Fasilitas Kenyamanan:</p>
                      {vehicle.features.map((feat, index) => (
                        <div key={index} className="flex items-start gap-1.5 text-slate-700 text-xs text-left">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Fills / Fits recommendation */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 mb-5 leading-relaxed text-left">
                      <strong className="text-slate-900 font-bold block mb-0.5 uppercase tracking-wide text-[10px]">Sangat Cocok Untuk:</strong>
                      {vehicle.recommendedFor}
                    </div>
                  </div>

                  {/* Pricing and Action call */}
                  <div>
                    <div className="border-t border-slate-100 pt-4 pb-4 text-left flex justify-between items-center bg-slate-50/50 p-3 rounded-2xl mb-4 border border-slate-100">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">Layanan Sewa</span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mt-0.5">
                          ✓ Dengan Supir
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">Tarif Per Hari</span>
                        <p className="text-lg font-black text-emerald-600 font-mono">
                          {formatRupiah(vehicle.dailyPriceWithDriver)}
                          <span className="text-[10px] font-normal text-slate-550">/hari</span>
                        </p>
                      </div>
                    </div>

                    <button
                      id={`book-btn-${vehicle.id}`}
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all duration-250 flex items-center justify-center gap-2"
                    >
                      <BadgeCheck className="w-4.5 h-4.5 text-white" />
                      Pilih & Estimasi Unit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
