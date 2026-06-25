import { Vehicle, TouristRoute, FaqItem, Testimonial } from './types';
import hiaceCommuterImg from './assets/images/hiace_commuter_1781594999932.jpg';
import innovaRebornImg from './assets/images/regenerated_image_1781595935525.png';

export const VEHICLES: Vehicle[] = [
  {
    id: 'innova-reborn',
    name: 'Toyota Innova Reborn',
    type: 'mpv',
    seats: 7,
    luggage: 4,
    transmission: 'Kededuanya',
    dailyPriceSelfDrive: null,
    dailyPriceWithDriver: 500000,
    image: innovaRebornImg,
    features: ['Kabin Sangat Lapang', 'AC Dual Zone', 'Torsi Kuat untuk Tanjakan Bukittinggi', 'Lampu Baca LED', 'Sistem Keselamatan Lengkap'],
    recommendedFor: 'Keluarga Kecil, Perjalanan Antar Kota Sumbar, Survey Lapangan, Wisatawan Nusantara.',
  },
  {
    id: 'hiace-commuter',
    name: 'Toyota Hiace Commuter',
    type: 'minibus',
    seats: 15,
    luggage: 6,
    transmission: 'Manual',
    dailyPriceSelfDrive: null, // Only with driver for safety and size
    dailyPriceWithDriver: 1100000, // Includes driver, excludes BBM/Toll
    image: hiaceCommuterImg,
    features: ['Pendingin Udara (AC) Ekstra Dingin', 'Sistem Audio & Karaoke', 'Colokan Charger USB', 'Kursi Reclining', 'Suspensi Nyaman untuk Sumatra'],
    recommendedFor: 'Rombongan Keluarga, Wisatawan Domestik, Perjalanan Dinas, Wedding, Outing Kantor.',
  }
];

export const TOURIST_ROUTES: TouristRoute[] = [
  {
    id: 'route-pesona-minang',
    // Menggunakan kata kunci Padang-Bukittinggi karena volume pencariannya sangat tinggi
    idSeo: 'paket-wisata-padang-bukittinggi-3-hari-2-malam', 
    name: 'Paket Pesona Ranah Minang',
    duration: '3 Hari 2 Malam',
    destinations: ['Kawasan Wisata Mandeh', 'Lembah Anai', 'Bukittinggi (Jam Gadang)', 'Lembah Harau', 'Kelok 9', 'Kebun Teh', 'Danau Diatas & Dibawah', 'Danau Talang & Singkarak', 'Pagaruyung'],
    description: 'Rute paling populer mencakup keindahan laut Mandeh, sejuknya perkebunan teh dan deretan danau eksotis, hingga eksplorasi budaya di Pagaruyung serta pesona alam Bukittinggi dan Payakumbuh..',
    priceEstimate: 4800000,
    image: 'https://i.ibb.co.com/Y7WCG7Vw/3hari2malam.webp',
  },
  {
    id: 'route-bukittinggi-harau',
    // Menyertakan elemen Padang-Bukittinggi agar mencakup pencarian rute pendek yang populer
    idSeo: 'paket-wisata-padang-bukittinggi-2-hari-1-malam',
    name: 'Paket Pesona Bukittinggi & Harau',
    duration: '2 Hari 1 Malam',
    destinations: ['Lembah Anai', 'Ngarai Sianok', 'jam Gadang', 'Lawang Park', 'Lembah Harau', 'Kelok 9', 'Pagaruyung'],
    description: 'Nikmati kesejukan Lembah Anai, megahnya Ngarai Sianok, dan ikon wisata Jam Gadang, dilanjutkan dengan eksplorasi pesona Lembah Harau dan jembatan Kelok 9.',
    priceEstimate: 3200000,
    image: 'https://i.ibb.co.com/3yw3VvSp/2hari1malam.webp',
  },
  {
    id: 'route-danau-kembar-heritage',
    // Menggunakan istilah 'one day tour' yang sangat sering diketik turis domestik dan asing
    idSeo: 'one-day-tour-padang-1-hari',
    name: 'Tour Esensial Jelajah Minang',
    duration: '1 Hari (Full Day)',
    destinations: ['Istano Basa Pagaruyung', 'Danau Singkarak', 'Danau Diatas & Dibawah', 'Lembah Harau', 'Kelok 9', 'Ngarai Sianok', 'Lembah Anai'],
    description: 'Pilihan perjalanan singkat padat makna. Anda dapat memilih rute pesona danau kembar dan sejarah Pagaruyung, atau memilih rute menikmati megahnya tebing Lembah Harau dan Ngarai Sianok dalam satu hari penuh',
    priceEstimate: 1200000,
    image: 'https://i.ibb.co.com/RTbMNqzs/1harifull.webp',
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'Apakah harga sewa sudah termasuk bahan bakar (BBM) dan tol?',
    answer: 'Kami menyediakan dua opsi sistem sewa: \n1) Opsi unit + driver (belum termasuk bbm, tol, parkir, dan uang makan driver).\n2) Opsi All-In (sudah termasuk mobil, supir, bbm, parkir, dan tol). Anda dapat memilih opsi All-In langsung di halaman penghitungan biaya pemesanan online kami.',
  },
  {
    question: 'Apakah SEWA HIACE PADANG menyediakan sewa sistem Lepas Kunci (tanpa supir)?',
    answer: 'Tidak. Demi mengutamakan kenyamanan, keselamatan, dan kelancaran seluruh pelanggan kami saat berkendara di rute berliku di Sumatera Barat, semua penyewaan armada di SEWA HIACE PADANG diwajibkan menggunakan supir (driver) berpengalaman.',
  },
  {
    question: 'Mengapa menyewa mobil dengan supir di Sumatera Barat sangat direkomendasikan?',
    answer: 'Sumatera Barat terkenal dengan lanskap alamnya yang memesona tapi juga menantang. Jalur berbukit tajam, tikungan patah tiada henti, dan turunan curam seperti Sitinjau Lauik membutuhkan keahlian berkendara khusus dan pengenalan jalan yang baik. Supir profesional kami telah terlatih menghadapi rute ini agar perjalanan Anda tetap santai, aman, dan bisa fokus menikmati pemandangan indahnya.',
  },
  {
    question: 'Bagaimana proses pembayaran dan konfirmasi pemesanan?',
    answer: 'Sistem website kami meresumasi semua estimasi harga secara terbuka. Setelah mengisi detail booking, Anda cukup mengeklik tombol "Kirim Pemesanan WhatsApp". Sistem akan menyusun draf pesan rapi dan membukanya di aplikasi WhatsApp Anda. Admin kami akan langsung merespons untuk konfirmasi ketersediaan unit dan membagikan detail rekening pembayaran down payment (DP) sebesar 20-30% sebagai komitmen booking Anda.',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Andra Wijaya',
    role: 'Ketua Rombongan Keluarga',
    origin: 'Jakarta Selatan',
    comment: 'Sewa Hiace Premio untuk liburan keluarga 11 orang di Sumbar. Mobilnya mulus seperti baru, kabinnya sangat bersih wangi, AC dingin menggigit. Pak Roni supirnya ramah banget, jago nyetir di kelok sembilan dan selalu tahu spot foto tersembunyi yang bagus banget buat instagram. Sangat direkomendasikan!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'Siti Rahmawati',
    role: 'Koordinator Acara BUMN',
    origin: 'Pekanbaru, Riau',
    comment: 'Butuh 3 unit Hiace Commuter untuk antar-jemput delegasi VIP dari Bandara BIM ke Bukittinggi selama 4 hari. Layanan sangat on-time, supir ramah memakai pakaian rapi/batik, tata krama luar biasa. Proses administrasi/kwitansi pelunasan juga sangat lancar untuk laporan kantor.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  },
  {
    name: 'David G.',
    role: 'Travel Blogger',
    origin: 'Denpasar, Bali',
    comment: 'Sewa mobil Innova Reborn + supir dari SEWA HIACE PADANG untuk eksplorasi pantai pesisir selatan Mandeh dan Alahan Panjang. Mobil prima bertenaga, pelayanan supir sangat ramah, verifikasi berkas cepat hanya via Whatsapp. CS sangat solutif dan responsif.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  }
];

export const LOCATIONS: string[] = [
  'Bandara Internasional Minangkabau (BIM)',
  'Kota Padang (Pusat Kota / Hotel / Pelabuhan)',
  'Kota Bukittinggi (Jam Gadang / Hotel)',
  'Kota Payakumbuh / Lembah Harau',
  'Kota Solok / Danau Singkarak',
  'Kota Sawahlunto (Situs Warisan UNESCO)',
  'Kota Pariaman / Pesisir Utara',
  'Painan / Kawasan Wisata Mandeh'
];
