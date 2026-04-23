import { useState } from 'react';
import {
  BookOpen,
  Clock,
  MapPin,
  Users,
  Check,
  Calendar,
  Star,
  Play,
  Headphones,
  Video,
  Download,
  Bookmark,
} from 'lucide-react';

type ViewType = 'jadwal' | 'materi' | 'rekaman';

const schedule = [
  { day: 'Ahad Wage', title: 'Pengajian Kitab Ihya Ulumiddin', ustadz: 'KH. Ahmad Mustofa Bisri', time: '20:00 - 22:00', location: 'Masjid Al-Ikhlas, Kedu', attendees: 85, nextDate: '19 Jan 2026' },
  { day: 'Selasa Pon', title: 'Kajian Tafsir Al-Misbah', ustadz: 'Ustadz Nur Hidayat', time: '19:30 - 21:00', location: 'Musholla Nurul Iman', attendees: 45, nextDate: '21 Jan 2026' },
  { day: 'Kamis Kliwon', title: 'Dzikir & Doa Bersama', ustadz: 'Habib Sholeh Al-Jufri', time: '20:00 - 21:30', location: "Majelis Ta'lim Al-Hikmah", attendees: 120, nextDate: '23 Jan 2026' },
  { day: 'Jumat', title: 'Kajian Fiqih Wanita', ustadz: 'Nyai Hj. Maimunah', time: '09:00 - 11:00', location: 'Gedung NU Kecamatan Kedu', attendees: 60, nextDate: '17 Jan 2026' },
  { day: 'Sabtu Pahing', title: 'Ngaji Bareng Anak Muda', ustadz: 'Ustadz Reza Muhammad', time: '16:00 - 17:30', location: 'Aula MWC NU Kedu', attendees: 55, nextDate: '18 Jan 2026' },
];

const materials = [
  { title: 'Ringkasan Ihya Ulumiddin - Bab Taubat', type: 'PDF', size: '2.4 MB', downloads: 124, date: '10 Jan 2026' },
  { title: 'Tafsir Surat Al-Kahfi Ayat 1-10', type: 'PDF', size: '1.8 MB', downloads: 89, date: '8 Jan 2026' },
  { title: 'Fiqih Sholat Lengkap', type: 'PDF', size: '3.2 MB', downloads: 156, date: '5 Jan 2026' },
  { title: 'Adab Menuntut Ilmu', type: 'PDF', size: '1.1 MB', downloads: 201, date: '3 Jan 2026' },
  { title: 'Mauidzah Hasanah: Pentingnya Silaturahmi', type: 'PDF', size: '890 KB', downloads: 67, date: '1 Jan 2026' },
];

const recordings = [
  { title: 'Pengajian Ahad Wage - 12 Jan 2026', duration: '1:45:32', views: 234, type: 'video' as const },
  { title: 'Kajian Tafsir Al-Misbah - 10 Jan 2026', duration: '1:22:15', views: 189, type: 'audio' as const },
  { title: 'Dzikir Bersama - 9 Jan 2026', duration: '1:10:45', views: 156, type: 'video' as const },
  { title: 'Ngaji Bareng Anak Muda - 7 Jan 2026', duration: '1:30:00', views: 312, type: 'video' as const },
];

export default function PengajianPage() {
  const [view, setView] = useState<ViewType>('jadwal');
  const [attended, setAttended] = useState<number[]>([]);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  const [notif, setNotif] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const handleAttend = (i: number) => {
    if (!attended.includes(i)) {
      setAttended([...attended, i]);
      showToast(`Kehadiran tercatat: ${schedule[i].title}`);
    }
  };

  const handleBookmark = (i: number) => {
    if (bookmarked.includes(i)) {
      setBookmarked(bookmarked.filter((b) => b !== i));
      showToast('Bookmark dihapus');
    } else {
      setBookmarked([...bookmarked, i]);
      showToast(`Bookmark ditambahkan: ${schedule[i].title}`);
    }
  };

  const handleDownload = (title: string) => {
    showToast(`Mengunduh: ${title}`);
  };

  const handlePlay = (i: number) => {
    if (playing === i) {
      setPlaying(null);
    } else {
      setPlaying(i);
      showToast(`Memutar: ${recordings[i].title}`);
    }
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
      <div>
        <h1 className="text-2xl font-bold text-emerald-900">Jadwal Pengajian</h1>
        <p className="text-sm text-emerald-500 mt-1">Kajian keagamaan rutin MWC NU Kecamatan Kedu</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pengajian Rutin', value: '5', icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Ustadz/Ustadzah', value: '5', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Total Jamaah', value: '365', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Kehadiran Saya', value: `${28 + attended.length}/30`, icon: Check, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <button key={i} className="bg-white rounded-2xl p-4 border border-emerald-100/60 shadow-sm text-left hover:shadow-md transition-all active:scale-[0.98]">
              <div className={`${stat.bg} p-2 rounded-xl w-fit mb-2`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-xl font-bold text-emerald-900">{stat.value}</p>
              <p className="text-xs text-emerald-500">{stat.label}</p>
            </button>
          );
        })}
      </div>

      {/* View Tabs */}
      <div className="flex bg-white rounded-xl border border-emerald-100/60 p-1 gap-1">
        {[
          { id: 'jadwal' as const, label: 'Jadwal Pengajian', icon: Calendar },
          { id: 'materi' as const, label: 'Materi & Bahan', icon: BookOpen },
          { id: 'rekaman' as const, label: 'Rekaman', icon: Video },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                view === t.id ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-500 hover:bg-emerald-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Schedule View */}
      {view === 'jadwal' && (
        <div className="space-y-4">
          {schedule.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 border-l-4 border-l-emerald-500 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 md:w-32 shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-800">{s.day}</p>
                    <p className="text-xs text-emerald-400">{s.nextDate}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-base font-bold text-emerald-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-emerald-600 mb-2">Pengajar: <span className="font-medium">{s.ustadz}</span></p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-500">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{s.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{s.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{s.attendees} jamaah</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {attended.includes(i) ? (
                    <button className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium">
                      <Check className="w-4 h-4" /> Hadir ✓
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAttend(i)}
                      className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors active:scale-95"
                    >
                      <Check className="w-4 h-4" /> Hadir
                    </button>
                  )}
                  <button
                    onClick={() => handleBookmark(i)}
                    className={`p-2 rounded-xl border transition-colors active:scale-95 ${
                      bookmarked.includes(i)
                        ? 'border-amber-300 bg-amber-50 text-amber-500'
                        : 'border-emerald-200 text-emerald-500 hover:bg-emerald-50'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked.includes(i) ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Materials View */}
      {view === 'materi' && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-emerald-50 flex items-center justify-between">
            <h3 className="font-bold text-emerald-900">Materi Pengajian</h3>
            <button
              onClick={() => showToast('Mengunduh semua materi...')}
              className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg font-medium hover:bg-emerald-100 transition-colors active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh Semua
            </button>
          </div>
          <div className="divide-y divide-emerald-50">
            {materials.map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-emerald-50/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-red-600">{m.type}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-emerald-800 truncate">{m.title}</p>
                  <p className="text-xs text-emerald-400 mt-0.5">{m.size} • {m.downloads} unduhan • {m.date}</p>
                </div>
                <button
                  onClick={() => handleDownload(m.title)}
                  className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-2 rounded-xl text-xs font-medium hover:bg-emerald-100 transition-colors shrink-0 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  Unduh
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recordings View */}
      {view === 'rekaman' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recordings.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group">
              <button
                onClick={() => handlePlay(i)}
                className="w-full h-32 bg-gradient-to-br from-emerald-800 to-teal-900 flex items-center justify-center relative"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  playing === i
                    ? 'bg-white/30 scale-110 animate-pulse'
                    : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30 group-hover:scale-110'
                }`}>
                  {r.type === 'video' ? (
                    <Play className="w-6 h-6 text-white ml-1" />
                  ) : (
                    <Headphones className="w-6 h-6 text-white" />
                  )}
                </div>
                <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded">
                  {r.duration}
                </span>
                {playing === i && (
                  <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                    ▶ Playing
                  </span>
                )}
              </button>
              <div className="p-4">
                <h4 className="text-sm font-bold text-emerald-900 mb-1">{r.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-emerald-400">
                    <span className="flex items-center gap-1">
                      {r.type === 'video' ? <Video className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                      {r.type === 'video' ? 'Video' : 'Audio'}
                    </span>
                    <span>{r.views} views</span>
                  </div>
                  <button
                    onClick={() => handleDownload(r.title)}
                    className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-400 hover:text-emerald-600 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
