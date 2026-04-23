import { useState } from 'react';
import {
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Filter,
  Plus,
  Check,
  Star,
  Tag,
  X,
} from 'lucide-react';

type FilterType = 'semua' | 'pengajian' | 'rapat' | 'sosial' | 'pelatihan';

const initialEvents = [
  {
    id: 1,
    date: { day: '15', month: 'Jan', year: '2026' },
    title: 'Pengajian Rutin Ahad Wage',
    time: '20:00 - 22:00 WIB',
    location: 'Masjid Al-Ikhlas, Kedu',
    attendees: 85,
    category: 'pengajian',
    featured: true,
    description: 'Pengajian rutin bulanan dengan tema "Memperkuat Ukhuwah Nahdliyah di Era Digital"',
  },
  {
    id: 2,
    date: { day: '18', month: 'Jan', year: '2026' },
    title: 'Rapat Koordinasi MWC NU',
    time: '09:00 - 12:00 WIB',
    location: 'Kantor MWC NU Kedu',
    attendees: 24,
    category: 'rapat',
    featured: false,
    description: 'Rapat bulanan koordinasi seluruh ranting se-Kecamatan Kedu',
  },
  {
    id: 3,
    date: { day: '20', month: 'Jan', year: '2026' },
    title: 'Bakti Sosial & Santunan Yatim',
    time: '08:00 - 14:00 WIB',
    location: 'Gedung NU Kecamatan Kedu',
    attendees: 120,
    category: 'sosial',
    featured: true,
    description: 'Bakti sosial pembagian sembako dan santunan untuk anak yatim piatu',
  },
  {
    id: 4,
    date: { day: '25', month: 'Jan', year: '2026' },
    title: 'Pelatihan Digitalisasi Ranting',
    time: '13:00 - 16:00 WIB',
    location: 'Aula MWC NU Kedu',
    attendees: 40,
    category: 'pelatihan',
    featured: false,
    description: 'Workshop penggunaan portal digital untuk pengurus ranting',
  },
  {
    id: 5,
    date: { day: '28', month: 'Jan', year: '2026' },
    title: "Isra Mi'raj Bersama",
    time: '19:30 - 22:00 WIB',
    location: "Masjid Jami' Kedu",
    attendees: 200,
    category: 'pengajian',
    featured: true,
    description: "Peringatan Isra Mi'raj Nabi Muhammad SAW dengan penceramah KH. Ahmad Mustofa Bisri",
  },
  {
    id: 6,
    date: { day: '30', month: 'Jan', year: '2026' },
    title: 'Musyawarah Ranting Kedu',
    time: '08:00 - 12:00 WIB',
    location: 'Kantor NU Ranting Kedu',
    attendees: 35,
    category: 'rapat',
    featured: false,
    description: 'Musyawarah tahunan untuk evaluasi program kerja ranting',
  },
];

const categoryColors: Record<string, string> = {
  pengajian: 'bg-emerald-100 text-emerald-700',
  rapat: 'bg-blue-100 text-blue-700',
  sosial: 'bg-rose-100 text-rose-700',
  pelatihan: 'bg-amber-100 text-amber-700',
};

const categoryBorders: Record<string, string> = {
  pengajian: 'border-l-emerald-500',
  rapat: 'border-l-blue-500',
  sosial: 'border-l-rose-500',
  pelatihan: 'border-l-amber-500',
};

export default function KegiatanPage() {
  const [filter, setFilter] = useState<FilterType>('semua');
  const [registered, setRegistered] = useState<number[]>([2]);
  const [showForm, setShowForm] = useState(false);
  const [notif, setNotif] = useState<string | null>(null);

  const filtered = filter === 'semua' ? initialEvents : initialEvents.filter((e) => e.category === filter);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const handleRegister = (id: number, title: string) => {
    setRegistered([...registered, id]);
    showToast(`Berhasil mendaftar: ${title}`);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">
          ✅ {notif}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Jadwal Kegiatan</h1>
          <p className="text-sm text-emerald-500 mt-1">Pantau dan ikuti seluruh agenda MWC NU Kedu</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Ajukan Kegiatan
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Ajukan Kegiatan Baru</h3>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Nama Kegiatan</label>
                <input type="text" placeholder="Contoh: Pengajian Rutin" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Tanggal</label>
                  <input type="date" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Waktu</label>
                  <input type="time" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
                </div>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Lokasi</label>
                <input type="text" placeholder="Nama tempat kegiatan" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Kategori</label>
                <select className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                  <option>Pengajian</option>
                  <option>Rapat</option>
                  <option>Sosial</option>
                  <option>Pelatihan</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Deskripsi</label>
                <textarea rows={3} placeholder="Deskripsi kegiatan..." className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">Batal</button>
                <button onClick={() => { setShowForm(false); showToast('Kegiatan berhasil diajukan untuk review!'); }} className="flex-1 py-2.5 rounded-xl text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors font-medium">
                  Ajukan Kegiatan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 bg-white rounded-xl border border-emerald-100/60 p-3">
        <Filter className="w-4 h-4 text-emerald-400 mr-1" />
        {(['semua', 'pengajian', 'rapat', 'sosial', 'pelatihan'] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all active:scale-95 ${
              filter === f
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-emerald-400">{filtered.length} kegiatan</span>
      </div>

      {/* Events Grid */}
      <div className="space-y-4">
        {filtered.map((event) => (
          <div
            key={event.id}
            className={`bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 md:p-6 border-l-4 ${categoryBorders[event.category]} hover:shadow-md transition-all group`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Date Box */}
              <div className="flex md:flex-col items-center gap-3 md:gap-0 md:w-20 md:text-center shrink-0">
                <div className="text-3xl font-bold text-emerald-800 leading-none">{event.date.day}</div>
                <div className="text-xs uppercase text-emerald-500 font-semibold">{event.date.month} {event.date.year}</div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-2">
                  <h3 className="text-lg font-bold text-emerald-900 flex-1">
                    {event.featured && <Star className="w-4 h-4 text-amber-500 inline mr-1 mb-0.5" />}
                    {event.title}
                  </h3>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${categoryColors[event.category]}`}>
                    <Tag className="w-3 h-3 inline mr-0.5" />
                    {event.category}
                  </span>
                </div>

                <p className="text-sm text-emerald-600 mb-3">{event.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {event.attendees} peserta
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="flex md:flex-col items-center gap-2 md:justify-center shrink-0">
                {registered.includes(event.id) ? (
                  <button className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Terdaftar
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(event.id, event.title)}
                    className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95"
                  >
                    Daftar
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
