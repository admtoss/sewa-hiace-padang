import React, { useState, useEffect } from 'react';
import { VEHICLES, LOCATIONS, TOURIST_ROUTES } from '../data';
import { Booking, ServiceType, Vehicle } from '../types';
import { Calendar, User, Phone, MapPin, Calculator, Info, CheckCircle, Smartphone } from 'lucide-react';

interface BookingFormProps {
  selectedVehicleId: string;
  selectedRouteId?: string;
  onBookingSuccess: (newBooking: Booking) => void;
}

export default function BookingForm({ selectedVehicleId, selectedRouteId, onBookingSuccess }: BookingFormProps) {
  // Fields state
  const [vehicleId, setVehicleId] = useState(selectedVehicleId || VEHICLES[0].id);
  const [serviceType, setServiceType] = useState<ServiceType>('dengan_supir');
  const [startDate, setStartDate] = useState('');
  const [durationDays, setDurationDays] = useState(1);
  const [pickupLocation, setPickupLocation] = useState(LOCATIONS[0]);
  const [dropoffLocation, setDropoffLocation] = useState(LOCATIONS[1]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [routeId, setRouteId] = useState('');

  // UI state
  const [validationError, setValidationError] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [latestSavedId, setLatestSavedId] = useState('');

  const selectedVehicle = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0];

  useEffect(() => {
    if (selectedVehicleId) {
      setVehicleId(selectedVehicleId);
      // If the selected vehicle has no self drive, change service type to dengan supir
      const veh = VEHICLES.find((v) => v.id === selectedVehicleId);
      if (veh && veh.dailyPriceSelfDrive === null && serviceType === 'lepas_kunci') {
        setServiceType('dengan_supir');
      }
    }
  }, [selectedVehicleId]);

  // Handle incoming selected tour package
  useEffect(() => {
    if (selectedRouteId) {
      setRouteId(selectedRouteId);
      const route = TOURIST_ROUTES.find((r) => r.id === selectedRouteId);
      if (route) {
        setVehicleId('hiace-commuter');
        setServiceType('all_in');
        
        let days = 1;
        if (route.duration.includes('3 Hari')) days = 3;
        else if (route.duration.includes('2 Hari')) days = 2;
        else if (route.duration.includes('1 Hari')) days = 1;
        setDurationDays(days);
        
        const routeDests = route.destinations.join(' → ');
        setNotes(`Halo, saya ingin menanyakan Rental Hiace/Mobil untuk Paket Tour Wisata "${route.name}". Rute: ${routeDests}. Durasi: ${route.duration}. Mohon draf harganya dicocokkan.`);
      }
    }
  }, [selectedRouteId]);

  // Handle auto-change of service structure based on vehicle availability
  const handleVehicleChange = (vId: string) => {
    setVehicleId(vId);
    if (vId !== 'hiace-commuter') {
      setRouteId('');
    }
    const veh = VEHICLES.find((v) => v.id === vId);
    if (veh && veh.dailyPriceSelfDrive === null && serviceType === 'lepas_kunci') {
      setServiceType('dengan_supir');
    }
  };

  const handleServiceChange = (sType: ServiceType) => {
    setServiceType(sType);
    if (sType !== 'all_in') {
      setRouteId('');
    }
  };

  const handleDurationChange = (days: number) => {
    setDurationDays(days);
    if (routeId) {
      const activeRoute = TOURIST_ROUTES.find((r) => r.id === routeId);
      if (activeRoute) {
        let defaultDays = 1;
        if (activeRoute.duration.includes('3 Hari')) defaultDays = 3;
        else if (activeRoute.duration.includes('2 Hari')) defaultDays = 2;
        else if (activeRoute.duration.includes('1 Hari')) defaultDays = 1;
        
        if (days !== defaultDays) {
          setRouteId('');
        }
      }
    }
  };

  const handleRouteChange = (selectedId: string) => {
    setRouteId(selectedId);
    if (selectedId) {
      const route = TOURIST_ROUTES.find((r) => r.id === selectedId);
      if (route) {
        setVehicleId('hiace-commuter');
        setServiceType('all_in');
        
        let days = 1;
        if (route.duration.includes('3 Hari')) days = 3;
        else if (route.duration.includes('2 Hari')) days = 2;
        else if (route.duration.includes('1 Hari')) days = 1;
        setDurationDays(days);
        
        const routeDests = route.destinations.join(' → ');
        setNotes(`Halo, saya ingin menanyakan Rental Hiace/Mobil untuk Paket Tour Wisata "${route.name}". Rute: ${routeDests}. Durasi: ${route.duration}. Mohon draf harganya dicocokkan.`);
      }
    }
  };

  // Pricing calculator logic
  const calculatePricing = () => {
    if (routeId) {
      const activeRoute = TOURIST_ROUTES.find((r) => r.id === routeId);
      if (activeRoute) {
        return {
          base: activeRoute.priceEstimate / durationDays,
          driver: 0,
          fuel: 0,
          total: activeRoute.priceEstimate,
          isPackage: true,
          packageName: activeRoute.name
        };
      }
    }

    if (!selectedVehicle) return { base: 0, driver: 0, fuel: 0, total: 0, isPackage: false, packageName: '' };

    let dailyRate = 0;
    let driverCostPerDay = 0;
    let fuelCostPerDay = 0;

    if (serviceType === 'lepas_kunci') {
      dailyRate = selectedVehicle.dailyPriceSelfDrive || 350000;
      driverCostPerDay = 0;
      fuelCostPerDay = 0;
    } else if (serviceType === 'dengan_supir') {
      dailyRate = selectedVehicle.dailyPriceSelfDrive || (selectedVehicle.dailyPriceWithDriver - 200000); // adjust base
      driverCostPerDay = selectedVehicle.dailyPriceWithDriver - dailyRate;
      fuelCostPerDay = 0;
    } else if (serviceType === 'all_in') {
      // Car + Driver + BBM/Tol flat
      dailyRate = selectedVehicle.dailyPriceSelfDrive || (selectedVehicle.dailyPriceWithDriver - 200000);
      driverCostPerDay = selectedVehicle.dailyPriceWithDriver - dailyRate;
      // fuel estimate per day: 250k for MPV, 300k for SUV, 400k for Hiace minibus
      if (selectedVehicle.type === 'minibus') {
        fuelCostPerDay = 400000;
      } else if (selectedVehicle.type === 'suv') {
        fuelCostPerDay = 350000;
      } else {
        fuelCostPerDay = 250000;
      }
    }

    const baseTotal = dailyRate * durationDays;
    const driverTotal = driverCostPerDay * durationDays;
    const fuelTotal = fuelCostPerDay * durationDays;
    const grandTotal = baseTotal + driverTotal + fuelTotal;

    return {
      base: dailyRate,
      driver: driverCostPerDay,
      fuel: fuelCostPerDay,
      total: grandTotal,
      isPackage: false,
      packageName: ''
    };
  };

  const pricing = calculatePricing();

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const todayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!customerName.trim()) {
      setValidationError('Silakan masukkan nama lengkap Anda.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 9) {
      setValidationError('Silakan masukkan nomor WhatsApp yang aktif untuk konfirmasi koordinasi.');
      return;
    }
    if (!startDate) {
      setValidationError('Silakan pilih tanggal penjemputan sewa.');
      return;
    }

    const bookingId = 'BKG-' + Math.floor(100000 + Math.random() * 900000);

    const newBooking: Booking = {
      id: bookingId,
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      vehicleId,
      serviceType,
      startDate,
      durationDays,
      pickupLocation,
      dropoffLocation,
      notes: notes || undefined,
      totalPrice: pricing.total,
      timestamp: Date.now(),
      status: 'Sent',
    };

    // Save Booking to Local Storage
    const existingBookingsStr = localStorage.getItem('afr_rent_car_bookings') || localStorage.getItem('minang_trans_bookings');
    const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
    existingBookings.unshift(newBooking);
    localStorage.setItem('afr_rent_car_bookings', JSON.stringify(existingBookings));

    // Callback to App
    onBookingSuccess(newBooking);

    // Build WhatsApp template message block
    const isMinibus = selectedVehicle.type === 'minibus';
    const serviceLabels = {
      lepas_kunci: 'Lepas Kunci (Sewa Unit Saja)',
      dengan_supir: 'Mobil + Jasa Supir (Belum BBM)',
      all_in: 'All-In (Mobil + Supir + BBM / Tol)',
    };

    const activeRoute = TOURIST_ROUTES.find((r) => r.id === routeId);
    let billingDetails = '';
    if (activeRoute) {
      billingDetails = `- Paket Wisata Terpilih: ${activeRoute.name}\n- Layanan Paket: All-In (Mobil + Driver + BBM + Tol)\n- Durasi Paket: ${activeRoute.duration}`;
    } else {
      billingDetails = `- Biaya Unit: ${formatRupiah(pricing.base * durationDays)}\n` +
        (pricing.driver > 0 ? `- Biaya Supir Profesional: ${formatRupiah(pricing.driver * durationDays)}\n` : '') +
        (pricing.fuel > 0 ? `- Surcharge BBM & Tol: ${formatRupiah(pricing.fuel * durationDays)}\n` : '');
    }

    const waMessage = `*RESERVASI RENTAL MOBIL SUMBAR*
ID Booking: ${bookingId}
-----------------------------------
*Nama:* ${customerName}
*WhatsApp:* ${customerPhone}
*E-mail:* ${customerEmail || '-'}
*Armada:* ${selectedVehicle.name} (${selectedVehicle.transmission})
*Format Sewa:* ${activeRoute ? `Paket Wisata (${activeRoute.name})` : serviceLabels[serviceType]}
*Mulai Sewa:* ${startDate}
*Durasi:* ${durationDays} Hari
*Lokasi Jemput:* ${pickupLocation}
*Lokasi Pengantaran:* ${dropoffLocation}
*Keterangan Tambahan:* ${notes || '-'}
-----------------------------------
*RINCIAN BIAYA ESTIMATOR:*
${billingDetails}
---
*ESTIMASI TOTAL TARIF:* *${formatRupiah(pricing.total)}*

Halo admin Sewa Hiace Padang, saya baru saja meresumi pemesanan sewa unit di atas dari Website. Tolong divalidasi ketersediaan armada puncaknya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(waMessage);
    const whatsappURL = `https://wa.me/6281374024347?text=${encodedMessage}`;

    // Prompt Success Screen
    setLatestSavedId(bookingId);
    setSuccessAnimation(true);

    // Open WhatsApp
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
    }, 1500);
  };

  const handleReset = () => {
    setSuccessAnimation(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setNotes('');
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14" id="booking-header">
          <div className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            Reservasi Cepat & Handal
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Pemesanan & Estimator Online
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Gunakan kalkulator biaya pintar kami di bawah ini untuk memilih tipe kendaraan, metode mengemudi, dan durasi. Harga transparan tanpa biaya tidak terduga.
          </p>
        </div>

        {successAnimation ? (
          /* Animated Success Card */
          <div 
            id="booking-success-card"
            className="max-w-xl mx-auto bg-emerald-50 border border-emerald-200 p-8 rounded-3xl text-center space-y-6 shadow-xl animate-fade-in"
          >
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg animate-bounce">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">Reservasi Terkirim Sukses!</h3>
            
            <p className="text-slate-700 text-sm leading-relaxed">
              Draf pemesanan <strong className="font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-sm">{latestSavedId}</strong> telah disimpan secara lokal di browser Anda dan kami sedang menghubungkan Anda secara otomatis ke aplikasi <strong className="text-emerald-600 font-bold">WhatsApp Resmi Sewa Hiace Padang</strong> untuk verifikasi ketersediaan armada.
            </p>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 max-w-sm mx-auto text-left text-xs text-slate-600 space-y-1">
              <p><strong>Nama:</strong> {customerName}</p>
              <p><strong>Nomor HP:</strong> {customerPhone}</p>
              <p><strong>Armada:</strong> {selectedVehicle.name}</p>
              <p><strong>Estimasi Harga:</strong> <span className="font-bold text-emerald-600">{formatRupiah(pricing.total)}</span></p>
            </div>

            <div className="pt-3 space-y-2">
              <p className="text-[11px] text-zinc-500">Mengarahkan ke WhatsApp... Jika tidak berpindah otomatis, klik tombol di bawah:</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <a
                  href={`https://wa.me/6281374024347?text=${encodeURIComponent(
                    `*RESERVASI RENTAL MOBIL SUMBAR*\nID Booking: ${latestSavedId}\nNama: ${customerName}\nArmada: ${selectedVehicle.name}\nTotal Tarif: ${formatRupiah(pricing.total)}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-6 py-3 rounded-full transition-all inline-flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider"
                >
                  <Smartphone className="w-4 h-4" />
                  Buka WhatsApp Sekarang
                </a>
                <button
                  onClick={handleReset}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-3 rounded-full transition-all uppercase tracking-wider"
                >
                  Buat Pesanan Baru
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Live Form and Calculator Container */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form Fields */}
            <form 
              onSubmit={handleBookingSubmit}
              id="booking-form-element"
              className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-3xl shadow-md space-y-6"
            >
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                Formulir Informasi Sewa
              </h3>

              {validationError && (
                <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-800 text-xs font-semibold p-4 rounded-xl leading-relaxed">
                  {validationError}
                </div>
              )}

              {/* Optional Tour Package selection option */}
              <div className="space-y-1.5 text-left bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                <label htmlFor="form-package" className="text-xs font-bold text-orange-850 block uppercase tracking-wider">Kategori / Paket Tour Wisata Sumbar</label>
                <div className="relative mt-1">
                  <select
                    id="form-package"
                    value={routeId}
                    onChange={(e) => handleRouteChange(e.target.value)}
                    className="w-full bg-white border border-slate-350 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-850 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer pr-10"
                  >
                    <option value="">-- Tanpa Paket (Sewa Armada Reguler / Harian) --</option>
                    {TOURIST_ROUTES.map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.name} ({route.duration} • {formatRupiah(route.priceEstimate)})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    ▼
                  </div>
                </div>
                {routeId && (
                  <p className="text-[10px] text-orange-700 font-medium block mt-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-orange-100">
                    💡 <strong>Sistem Terkunci:</strong> Anda memilih paket wisata. Jenis armada telah di-lock ke Toyota Hiace, format sewa di-lock ke <strong>All-In</strong>, dan durasi otomatis disinkronkan ke durasi paket ({TOURIST_ROUTES.find(r => r.id === routeId)?.duration}).
                  </p>
                )}
              </div>

              {/* Grid block 1: Vehicle & Service Select */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-vehicle" className="text-xs font-bold text-slate-700 block uppercase tracking-wider font-sans">Pilih Armada Mobil</label>
                  <div className="relative">
                    <select
                      id="form-vehicle"
                      value={vehicleId}
                      onChange={(e) => handleVehicleChange(e.target.value)}
                      className="w-full bg-white border border-slate-350 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer pr-10"
                    >
                      {VEHICLES.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name} {vehicle.type === 'minibus' ? '(Minibus)' : `(${vehicle.seats} Kursi)`}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-service" className="text-xs font-bold text-slate-700 block uppercase tracking-wider font-sans">Format Sewa</label>
                  <div className="relative">
                    <select
                      id="form-service"
                      value={serviceType}
                      onChange={(e) => handleServiceChange(e.target.value as ServiceType)}
                      className="w-full bg-white border border-slate-350 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer pr-10"
                    >
                      {selectedVehicle.dailyPriceSelfDrive !== null && (
                        <option value="lepas_kunci">Lepas Kunci (Sewa Unit Saja)</option>
                      )}
                      <option value="dengan_supir">Sewa Mobil + Driver</option>
                      <option value="all_in">All-In (Supir + BBM + Tol / Jalan Tol)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      ▼
                    </div>
                  </div>
                  {/* Minibus exception notice */}
                  {selectedVehicle.type === 'minibus' && (
                    <p className="text-[10px] text-orange-600 font-bold bg-orange-50 rounded-md px-2.5 py-1 inline-block mt-1">
                      ⚠️ Hiace Minibus wajib menggunakan supir untuk kenyamanan & keamanan.
                    </p>
                  )}
                </div>
              </div>

              {/* Grid block 2: Dates and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-start-date" className="text-xs font-bold text-slate-700 block uppercase tracking-wider flex items-center gap-1 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Mulai Penjemputan
                  </label>
                  <input
                    type="date"
                    id="form-start-date"
                    min={todayDate()}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white border border-slate-355 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-duration" className="text-xs font-bold text-slate-700 block uppercase tracking-wider font-sans">Durasi Penyewaan (Hari)</label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      id="duration-dec-btn"
                      onClick={() => handleDurationChange(Math.max(1, durationDays - 1))}
                      className="bg-slate-205 hover:bg-slate-300 text-slate-800 w-11 h-11 rounded-l-xl font-bold flex items-center justify-center text-lg focus:outline-none transition-all cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="form-duration"
                      min={1}
                      max={60}
                      value={durationDays}
                      onChange={(e) => handleDurationChange(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full h-11 bg-white border-y border-slate-355 text-center text-xs md:text-sm font-extrabold text-slate-800 focus:outline-none"
                    />
                    <button
                      type="button"
                      id="duration-inc-btn"
                      onClick={() => handleDurationChange(Math.min(60, durationDays + 1))}
                      className="bg-slate-205 hover:bg-slate-300 text-slate-800 w-11 h-11 rounded-r-xl font-bold flex items-center justify-center text-lg focus:outline-none transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid block 3: Pickup & Dropoff spots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200/60 pt-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-pickup" className="text-xs font-bold text-slate-700 block uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-550" />
                    Titik Penjemputan
                  </label>
                  <div className="relative">
                    <select
                      id="form-pickup"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full bg-white border border-slate-355 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer pr-10"
                    >
                      {LOCATIONS.map((loc, idx) => (
                        <option key={idx} value={loc}>
                          {loc}
                        </option>
                      ))}
                      <option value="Lokasi Lainnya (Tulis di Catatan)">Lainnya (Sebutkan di catatan)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-dropoff" className="text-xs font-bold text-slate-700 block uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    Titik Pengantaran
                  </label>
                  <div className="relative">
                    <select
                      id="form-dropoff"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="w-full bg-white border border-slate-355 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer pr-10"
                    >
                      {LOCATIONS.map((loc, idx) => (
                        <option key={idx} value={loc}>
                          {loc}
                        </option>
                      ))}
                      <option value="Lokasi Lainnya (Tulis di Catatan)">Lainnya (Sebutkan di catatan)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid block 4: Contact Customer info */}
              <div className="border-t border-slate-200/60 pt-4 space-y-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-cust-name" className="text-xs font-bold text-slate-700 block uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Nama Lengkap Anda
                  </label>
                  <input
                    type="text"
                    id="form-cust-name"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-slate-350 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="form-cust-phone" className="text-xs font-bold text-slate-700 block uppercase tracking-wider flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      Nomor HP / WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="form-cust-phone"
                      required
                      placeholder="Contoh: 081374024347"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white border border-slate-350 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="form-cust-email" className="text-xs font-bold text-slate-700 block uppercase tracking-wider">E-mail (Opsional)</label>
                    <input
                      type="email"
                      id="form-cust-email"
                      placeholder="budi@email.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-white border border-slate-350 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="form-notes" className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Catatan Tambahan / Detail Rute Perjalanan</label>
                  <textarea
                    id="form-notes"
                    rows={2}
                    placeholder="Contoh: Jemput di Bandara jam 10 pagi, rute tujuan ke Bukittinggi Hotel Novotel, bawa koper ukuran besar 5 buah."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Sticky Info on requirements */}
              <div className="bg-slate-100 rounded-xl p-4 border border-slate-200 flex gap-2.5 items-start text-xs text-slate-700 text-left">
                <Info className="w-4.5 h-4.5 text-orange-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Pemberitahuan:</strong> Pemesanan ini bersifat draf penawaran terbuka. Transaksi resmi dan pembayaran deposit dilakukan setelah tim admin memvalidasi kesiapan unit sewa via WhatsApp.
                </p>
              </div>
            </form>

            {/* Right Column: Pricing Rollup & Receipt Mock-up */}
            <div 
              id="booking-calc-summary-panel"
              className="lg:col-span-5 bg-slate-950 text-white p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden border border-slate-800"
            >
              {/* Receipt Visual Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="text-lg font-bold pb-3 border-b border-slate-800 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-500" />
                Kalkulasi Tarif Sewa
              </h3>

              {/* Selected Car Highlight */}
              <div className="flex gap-4 items-center bg-slate-900 border border-slate-800 p-3 rounded-2xl">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-16 h-12 object-cover rounded-xl shadow-inner shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Unit Terpilih</p>
                  <p className="text-sm font-bold text-white">{selectedVehicle.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{selectedVehicle.seats} Seat • {selectedVehicle.transmission}</p>
                </div>
              </div>

              {/* Invoice Breakdown math */}
              <div className="space-y-3.5 border-b border-dashed border-slate-800 pb-5 text-left">
                {pricing.isPackage ? (
                  <>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-orange-400 font-bold">Jenis Layanan:</span>
                      <span className="font-semibold text-white">Paket Wisata All-In</span>
                    </div>
                    <div className="flex justify-between items-start text-xs">
                      <span className="text-slate-400">Nama Paket Terkait:</span>
                      <span className="font-bold text-white text-right max-w-[180px]">{pricing.packageName}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Durasi Paket:</span>
                      <span className="font-bold text-white">{durationDays} Hari</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pl-2 border-l-2 border-orange-500">
                      <span className="text-slate-450 text-[11px]">Sewa All-In Termasuk Supir + BBM + Tol</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-450">Biaya Dasar Sewa:</span>
                      <span className="font-mono font-bold text-white">{formatRupiah(pricing.base)} x {durationDays} hari</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs pl-2 border-l-2 border-slate-800">
                      <span className="text-slate-500 text-[11px]">Subtotal Unit:</span>
                      <span className="font-mono text-orange-400">{formatRupiah(pricing.base * durationDays)}</span>
                    </div>

                    {pricing.driver > 0 && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-450">Jasa Supir Profesional:</span>
                        <span className="font-mono font-bold text-white">{formatRupiah(pricing.driver)} x {durationDays} hari</span>
                      </div>
                    )}

                    {pricing.fuel > 0 && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-450">Biaya Surcharge BBM & Tol:</span>
                        <span className="font-mono font-bold text-white">{formatRupiah(pricing.fuel)} x {durationDays} hari</span>
                      </div>
                    )}
                  </>
                )}

                {/* Additional services overview */}
                <div className="p-3 bg-slate-900/50 rounded-xl space-y-1.5 border border-slate-800">
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-wider">Fasilitas Termasuk:</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-slate-300">
                    <p>✓ Air Conditioner (AC)</p>
                    <p>✓ Pembersihan Unit</p>
                    <p>✓ Supir Berlisensi Resmi</p>
                    <p>✓ Charger Handphone</p>
                  </div>
                </div>
              </div>

              {/* Grand Total output */}
              <div className="flex justify-between items-end py-2 text-left">
                <div>
                  <span className="text-xs text-orange-500 uppercase font-bold tracking-wider block">Total Estimasi Tarif</span>
                  <span className="text-[10px] text-slate-450 font-medium">Berdasarkan durasi {durationDays} Hari sewa</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl md:text-3xl font-black font-mono text-white tracking-tight">
                    {formatRupiah(pricing.total)}
                  </span>
                </div>
              </div>

              {/* Call to action booking dispatch */}
              <button
                type="submit"
                id="form-submit-btn"
                form="booking-form-element"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-full text-xs md:text-sm shadow-lg shadow-emerald-520/20 active:scale-95 transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer duration-200"
              >
                <Smartphone className="w-5 h-5 shrink-0 animate-pulse" />
                Resumikan Pesanan di WhatsApp
              </button>

              <p className="text-[10.5px] text-slate-400 text-center leading-relaxed">
                Menyukai paket wisata khusus? Hubungi tim Call Center kami untuk penawaran tarif rombongan kustom.
              </p>

            </div>

          </div>
        )}
      </div>
    </section>
  );
}
