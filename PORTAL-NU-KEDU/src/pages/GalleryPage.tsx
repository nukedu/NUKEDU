import { useState } from 'react';
import {
  Image,
  Video,
  Camera,
  Upload,
  Search,
  X,
  Heart,
  Download,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Play,
  Folder,
  Star,
  Users,
} from 'lucide-react';

type TabType = 'semua' | 'foto' | 'video' | 'album';

interface MediaItem {
  id: number;
  type: 'foto' | 'video';
  title: string;
  description: string;
  date: string;
  location: string;
  event: string;
  uploader: string;
  likes: number;
  liked: boolean;
  bookmarked: boolean;
  tags: string[];
  album: string;
  gradient: string;
  duration?: string;
}

const albums = [
  { id: 'all', name: 'Semua Album', count: 36, icon: Folder, gradient: 'from-emerald-500 to-teal-600' },
  { id: 'pengajian', name: 'Pengajian & Kajian', count: 12, icon: BookOpen, gradient: 'from-blue-500 to-indigo-600' },
  { id: 'rapat', name: 'Rapat & Koordinasi', count: 8, icon: Users, gradient: 'from-amber-500 to-orange-600' },
  { id: 'baksos', name: 'Bakti Sosial', count: 6, icon: Heart, gradient: 'from-rose-500 to-pink-600' },
  { id: 'pelantikan', name: 'Pelantikan & SK', count: 4, icon: Star, gradient: 'from-purple-500 to-violet-600' },
  { id: 'milad', name: 'Milad & Peringatan', count: 6, icon: Calendar, gradient: 'from-cyan-500 to-blue-600' },
];

import { BookOpen } from 'lucide-react';

const mediaItems: MediaItem[] = [
  { id: 1, type: 'foto', title: 'Pengajian Ahad Wage Januari 2026', description: 'Suasana pengajian rutin Ahad Wage di Masjid Al-Ikhlas Kedu dengan tema Ihya Ulumiddin Bab Taubat', date: '12 Jan 2026', location: 'Masjid Al-Ikhlas, Kedu', event: 'Pengajian Rutin', uploader: 'Ahmad Hidayat', likes: 45, liked: false, bookmarked: true, tags: ['pengajian', 'ahad wage', 'masjid'], album: 'pengajian', gradient: 'from-emerald-600 to-teal-700' },
  { id: 2, type: 'foto', title: 'Rapat Koordinasi MWC NU Kedu', description: 'Dokumentasi rapat koordinasi bulanan pengurus MWC NU Kecamatan Kedu', date: '10 Jan 2026', location: 'Kantor MWC NU Kedu', event: 'Rapat Bulanan', uploader: 'Fatimah Azzahra', likes: 32, liked: true, bookmarked: false, tags: ['rapat', 'koordinasi', 'pengurus'], album: 'rapat', gradient: 'from-blue-600 to-indigo-700' },
  { id: 3, type: 'foto', title: 'Bakti Sosial Pembagian Sembako', description: 'Kegiatan bakti sosial pembagian sembako untuk warga kurang mampu di Kecamatan Kedu', date: '8 Jan 2026', location: 'Gedung NU Kedu', event: 'Bakti Sosial', uploader: 'Siti Aminah', likes: 67, liked: false, bookmarked: false, tags: ['baksos', 'sembako', 'sosial'], album: 'baksos', gradient: 'from-rose-600 to-pink-700' },
  { id: 4, type: 'video', title: 'Tausiyah KH. Ahmad Mustofa Bisri', description: 'Rekaman tausiyah penuh hikmah dari KH. Ahmad Mustofa Bisri dalam acara Isra Mi\'raj', date: '5 Jan 2026', location: 'Masjid Jami\' Kedu', event: 'Isra Mi\'raj', uploader: 'Muhammad Rizki', likes: 89, liked: true, bookmarked: true, tags: ['tausiyah', 'isra miraj', 'kiai'], album: 'milad', gradient: 'from-amber-600 to-orange-700', duration: '45:32' },
  { id: 5, type: 'foto', title: 'Pelantikan Pengurus Ranting Candimulyo', description: 'Prosesi pelantikan pengurus NU Ranting Candimulyo periode 2023-2026', date: '3 Jan 2026', location: 'Balai Desa Candimulyo', event: 'Pelantikan', uploader: 'H. Nur Hidayat', likes: 54, liked: false, bookmarked: false, tags: ['pelantikan', 'ranting', 'candimulyo'], album: 'pelantikan', gradient: 'from-purple-600 to-violet-700' },
  { id: 6, type: 'foto', title: 'Pengajian Ibu-Ibu Muslimat NU', description: 'Kegiatan pengajian rutin ibu-ibu Muslimat NU Ranting Kedu', date: '1 Jan 2026', location: 'Musholla Nurul Iman', event: 'Muslimat Rutin', uploader: 'Fatimah Azzahra', likes: 28, liked: false, bookmarked: false, tags: ['muslimat', 'pengajian', 'ibu-ibu'], album: 'pengajian', gradient: 'from-pink-600 to-rose-700' },
  { id: 7, type: 'video', title: 'Sholawat & Hadrah Peringatan Maulid', description: 'Penampilan hadrah dan sholawat dalam peringatan Maulid Nabi Muhammad SAW', date: '28 Des 2025', location: 'Masjid Al-Ikhlas, Kedu', event: 'Maulid Nabi', uploader: 'Ahmad Hidayat', likes: 112, liked: true, bookmarked: true, tags: ['hadrah', 'sholawat', 'maulid'], album: 'milad', gradient: 'from-cyan-600 to-blue-700', duration: '28:15' },
  { id: 8, type: 'foto', title: 'Latihan Pencak Silat Pagar Nusa', description: 'Kegiatan latihan rutin Pencak Silat Pagar Nusa NU Ranting Kedu', date: '25 Des 2025', location: 'Lapangan Kedu', event: 'Latihan Pagar Nusa', uploader: 'Muhammad Rizki', likes: 36, liked: false, bookmarked: false, tags: ['pagar nusa', 'pencak silat', 'latihan'], album: 'pengajian', gradient: 'from-red-600 to-red-800' },
  { id: 9, type: 'foto', title: 'Santunan Anak Yatim LAZISNU', description: 'Penyaluran santunan untuk 50 anak yatim piatu di Kecamatan Kedu melalui LAZISNU', date: '20 Des 2025', location: 'Gedung NU Kedu', event: 'Santunan Yatim', uploader: 'Siti Aminah', likes: 93, liked: true, bookmarked: true, tags: ['santunan', 'yatim', 'lazisnu'], album: 'baksos', gradient: 'from-emerald-600 to-green-700' },
  { id: 10, type: 'video', title: 'Sambutan Ketua MWC NU Kedu', description: 'Sambutan Dr. H. Ahmad Fauzi pada acara milad NU ke-100', date: '15 Des 2025', location: 'Gedung NU Kedu', event: 'Milad NU', uploader: 'Fatimah Azzahra', likes: 78, liked: false, bookmarked: false, tags: ['sambutan', 'ketua', 'milad'], album: 'milad', gradient: 'from-slate-600 to-gray-800', duration: '12:45' },
  { id: 11, type: 'foto', title: 'Workshop Digitalisasi Administrasi', description: 'Pelatihan digitalisasi administrasi ranting untuk pengurus NU se-Kecamatan Kedu', date: '12 Des 2025', location: 'Aula MWC NU Kedu', event: 'Workshop Digital', uploader: 'Ahmad Hidayat', likes: 41, liked: false, bookmarked: false, tags: ['workshop', 'digital', 'pelatihan'], album: 'rapat', gradient: 'from-indigo-600 to-blue-700' },
  { id: 12, type: 'foto', title: 'Foto Bersama Pengurus MWC NU', description: 'Foto bersama seluruh pengurus MWC NU Kedu setelah rapat akhir tahun', date: '10 Des 2025', location: 'Kantor MWC NU Kedu', event: 'Rapat Akhir Tahun', uploader: 'H. Nur Hidayat', likes: 62, liked: true, bookmarked: true, tags: ['foto bersama', 'pengurus', 'akhir tahun'], album: 'rapat', gradient: 'from-teal-600 to-cyan-700' },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<TabType>('semua');
  const [activeAlbum, setActiveAlbum] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notif, setNotif] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [items, setItems] = useState(mediaItems);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 2500);
  };

  const filtered = items.filter(item => {
    const tabMatch = activeTab === 'semua' || item.type === activeTab;
    const albumMatch = activeAlbum === 'all' || item.album === activeAlbum;
    const searchMatch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.some(t => t.includes(searchQuery.toLowerCase()));
    return tabMatch && albumMatch && searchMatch;
  });

  const handleLike = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 } : item));
  };

  const handleBookmark = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, bookmarked: !item.bookmarked } : item));
    showToast('Bookmark diperbarui');
  };

  const lightboxItem = lightbox !== null ? items.find(i => i.id === lightbox) : null;
  const lightboxIndex = lightbox !== null ? filtered.findIndex(i => i.id === lightbox) : -1;

  const navigateLightbox = (dir: 'prev' | 'next') => {
    if (lightboxIndex < 0) return;
    const newIndex = dir === 'next' ? (lightboxIndex + 1) % filtered.length : (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightbox(filtered[newIndex].id);
  };

  return (
    <div className="space-y-6">
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">✅ {notif}</div>
      )}

      {/* Lightbox */}
      {lightboxItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[80] flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
            <X className="w-5 h-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Image/Video Placeholder */}
            <div className={`aspect-video rounded-2xl bg-gradient-to-br ${lightboxItem.gradient} flex items-center justify-center mb-4 shadow-2xl relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              {lightboxItem.type === 'video' ? (
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <span className="text-white/80 text-sm">{lightboxItem.duration}</span>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <Camera className="w-16 h-16 text-white/40" />
                  <p className="text-white/60 text-sm">{lightboxItem.title}</p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 text-white">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{lightboxItem.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{lightboxItem.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <button onClick={() => handleLike(lightboxItem.id)} className={`p-2 rounded-lg transition-colors ${lightboxItem.liked ? 'text-rose-400' : 'text-white/50 hover:text-white'}`}>
                    <Heart className={`w-5 h-5 ${lightboxItem.liked ? 'fill-rose-400' : ''}`} />
                  </button>
                  <button onClick={() => handleBookmark(lightboxItem.id)} className={`p-2 rounded-lg transition-colors ${lightboxItem.bookmarked ? 'text-amber-400' : 'text-white/50 hover:text-white'}`}>
                    <Bookmark className={`w-5 h-5 ${lightboxItem.bookmarked ? 'fill-amber-400' : ''}`} />
                  </button>
                  <button onClick={() => showToast('Link disalin!')} className="p-2 rounded-lg text-white/50 hover:text-white transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => showToast('Mengunduh...')} className="p-2 rounded-lg text-white/50 hover:text-white transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{lightboxItem.date}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{lightboxItem.location}</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{lightboxItem.likes} suka</span>
                <span className="flex items-center gap-1">📸 {lightboxItem.uploader}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {lightboxItem.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-violet-700 p-5 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Upload Foto & Video</h3>
                <button onClick={() => setShowUpload(false)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer bg-emerald-50/30" onClick={() => showToast('File picker dibuka')}>
                <Camera className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-emerald-700">Klik untuk pilih foto/video</p>
                <p className="text-xs text-emerald-400 mt-1">JPG, PNG, MP4, MOV (Max 50MB)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Album</label>
                  <select className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                    {albums.filter(a => a.id !== 'all').map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Kegiatan</label>
                  <input type="text" placeholder="Nama kegiatan" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
                </div>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Deskripsi</label>
                <textarea rows={2} placeholder="Deskripsi foto/video..." className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 resize-none" />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Lokasi</label>
                <input type="text" placeholder="Lokasi pengambilan" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowUpload(false)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">Batal</button>
                <button onClick={() => { setShowUpload(false); showToast('Foto/video berhasil diupload!'); }} className="flex-1 py-2.5 rounded-xl text-sm text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:opacity-90 transition-opacity font-medium active:scale-95">Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Gallery Foto & Video</h1>
          <p className="text-sm text-emerald-500 mt-1">Dokumentasi kegiatan MWC NU Kecamatan Kedu</p>
        </div>
        <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm active:scale-95">
          <Upload className="w-4 h-4" /> Upload Media
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Media', value: items.length.toString(), icon: Image, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Foto', value: items.filter(i => i.type === 'foto').length.toString(), icon: Camera, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Video', value: items.filter(i => i.type === 'video').length.toString(), icon: Video, bg: 'bg-purple-50', color: 'text-purple-600' },
          { label: 'Total Suka', value: items.reduce((s, i) => s + i.likes, 0).toLocaleString(), icon: Heart, bg: 'bg-rose-50', color: 'text-rose-600' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-emerald-100/60 shadow-sm">
              <div className={`${s.bg} p-2 rounded-xl w-fit mb-2`}><Icon className={`w-4 h-4 ${s.color}`} /></div>
              <p className="text-xl font-bold text-emerald-900">{s.value}</p>
              <p className="text-xs text-emerald-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Albums */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {albums.map((album) => {
          const Icon = album.icon;
          return (
            <button
              key={album.id}
              onClick={() => setActiveAlbum(album.id)}
              className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all active:scale-95 ${
                activeAlbum === album.id ? 'ring-2 ring-emerald-500 shadow-lg' : 'hover:shadow-md'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${album.gradient} opacity-90`} />
              <div className="relative z-10">
                <Icon className="w-6 h-6 text-white mb-2" />
                <p className="text-xs font-bold text-white leading-tight">{album.name}</p>
                <p className="text-[10px] text-white/70 mt-0.5">{album.count} media</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tabs + Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex bg-white rounded-xl border border-emerald-100/60 p-1 gap-1 flex-1">
          {[
            { id: 'semua' as TabType, label: 'Semua', icon: Image },
            { id: 'foto' as TabType, label: 'Foto', icon: Camera },
            { id: 'video' as TabType, label: 'Video', icon: Video },
          ].map((t) => {
            const TIcon = t.icon;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all active:scale-95 ${
                  activeTab === t.id ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-500 hover:bg-emerald-50'
                }`}>
                <TIcon className="w-3.5 h-3.5" />{t.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white rounded-xl border border-emerald-100/60 px-3 py-2 flex-1">
            <Search className="w-4 h-4 text-emerald-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari foto/video..." className="bg-transparent text-sm outline-none flex-1 text-emerald-800 placeholder:text-emerald-400" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="text-emerald-400"><X className="w-3.5 h-3.5" /></button>}
          </div>
        </div>
      </div>

      <p className="text-xs text-emerald-400">{filtered.length} media ditemukan</p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all"
            onClick={() => setLightbox(item.id)}
          >
            {/* Thumbnail */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                {item.type === 'video' ? (
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                    <span className="text-white/60 text-[10px]">{item.duration}</span>
                  </div>
                ) : (
                  <Camera className="w-10 h-10 text-white/30" />
                )}
              </div>
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Top actions */}
            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button onClick={(e) => { e.stopPropagation(); handleLike(item.id); }} className={`w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-colors ${item.liked ? 'text-rose-400' : 'text-white hover:text-rose-300'}`}>
                <Heart className={`w-3.5 h-3.5 ${item.liked ? 'fill-rose-400' : ''}`} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleBookmark(item.id); }} className={`w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-colors ${item.bookmarked ? 'text-amber-400' : 'text-white hover:text-amber-300'}`}>
                <Bookmark className={`w-3.5 h-3.5 ${item.bookmarked ? 'fill-amber-400' : ''}`} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); showToast('Mengunduh...'); }} className="w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:text-emerald-300 transition-colors">
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
              <p className="text-xs font-semibold text-white truncate">{item.title}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-white/60">{item.date}</span>
                <span className="flex items-center gap-1 text-[10px] text-white/60">
                  <Heart className="w-3 h-3" />{item.likes}
                </span>
              </div>
            </div>

            {/* Video badge */}
            {item.type === 'video' && (
              <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                <Video className="w-3 h-3" /> Video
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-12 text-center">
          <Image className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
          <p className="text-emerald-500 font-medium">Media tidak ditemukan</p>
          <p className="text-sm text-emerald-400 mt-1">Coba kata kunci atau album lain</p>
        </div>
      )}
    </div>
  );
}
