import { useState } from 'react';
import {
  MessageSquare,
  Eye,
  ChevronRight,
  Plus,
  Pin,
  Flame,
  Clock,
  Send,
  Heart,
  Reply,
  Search,
  X,
} from 'lucide-react';

const categories = [
  { id: 'semua', label: 'Semua', count: 156 },
  { id: 'aqidah', label: 'Aqidah & Fiqih', count: 42 },
  { id: 'dakwah', label: 'Dakwah', count: 28 },
  { id: 'sosial', label: 'Sosial Kemasyarakatan', count: 35 },
  { id: 'organisasi', label: 'Organisasi & Kelembagaan', count: 31 },
  { id: 'teknologi', label: 'Teknologi & Digital', count: 20 },
];

const initialThreads = [
  {
    id: 1,
    title: "Hikmah Isra Mi'raj untuk Generasi Milenial",
    author: { name: 'Ustadz Nur Hidayat', avatar: 'UN', color: 'from-emerald-400 to-teal-500' },
    category: 'dakwah',
    replies: 24,
    likes: 56,
    views: 340,
    pinned: true,
    hot: true,
    lastActivity: '30 menit lalu',
    preview: 'Marilah kita renungkan bersama makna perjalanan Rasulullah SAW pada malam Isra Mi\'raj...',
  },
  {
    id: 2,
    title: 'Program Beasiswa Anak Yatim NU Kedu 2026',
    author: { name: 'Siti Aminah', avatar: 'SA', color: 'from-blue-400 to-indigo-500' },
    category: 'sosial',
    replies: 18,
    likes: 42,
    views: 210,
    pinned: false,
    hot: false,
    lastActivity: '2 jam lalu',
    preview: 'Alhamdulillah, LAZISNU Kedu akan membuka pendaftaran beasiswa untuk anak yatim...',
  },
  {
    id: 3,
    title: 'Tentang Hukum Sholat Jama\' bagi Musafir',
    author: { name: 'Muhammad Rizki', avatar: 'MR', color: 'from-purple-400 to-pink-500' },
    category: 'aqidah',
    replies: 32,
    likes: 28,
    views: 180,
    pinned: false,
    hot: true,
    lastActivity: '3 jam lalu',
    preview: 'Ustadz, bolehkah saya tanya tentang hukum sholat jama\' bagi yang sedang bepergian?',
  },
  {
    id: 4,
    title: 'Jadwal Khotmil Quran Bulan Januari',
    author: { name: 'Fatimah Azzahra', avatar: 'FA', color: 'from-rose-400 to-red-500' },
    category: 'organisasi',
    replies: 12,
    likes: 31,
    views: 180,
    pinned: true,
    hot: false,
    lastActivity: '5 jam lalu',
    preview: 'Berikut jadwal khotmil Quran untuk seluruh ranting di Kecamatan Kedu bulan ini...',
  },
  {
    id: 5,
    title: 'Digitalisasi Administrasi Ranting: Panduan Lengkap',
    author: { name: 'Ahmad Hidayat', avatar: 'AH', color: 'from-amber-400 to-orange-500' },
    category: 'teknologi',
    replies: 15,
    likes: 38,
    views: 156,
    pinned: false,
    hot: false,
    lastActivity: '1 hari lalu',
    preview: 'Tutorial lengkap cara menggunakan portal digital untuk administrasi ranting...',
  },
];

const catColors: Record<string, string> = {
  aqidah: 'bg-purple-100 text-purple-700',
  dakwah: 'bg-emerald-100 text-emerald-700',
  sosial: 'bg-rose-100 text-rose-700',
  organisasi: 'bg-blue-100 text-blue-700',
  teknologi: 'bg-amber-100 text-amber-700',
};

export default function ForumPage() {
  const [activeCat, setActiveCat] = useState('semua');
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [newReply, setNewReply] = useState('');
  const [showNewThread, setShowNewThread] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const [notif, setNotif] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const filtered = initialThreads.filter((t) => {
    const catMatch = activeCat === 'semua' || t.category === activeCat;
    const searchMatch = !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const handleLike = (id: number) => {
    if (liked.includes(id)) {
      setLiked(liked.filter((l) => l !== id));
    } else {
      setLiked([...liked, id]);
      showToast('Anda menyukai diskusi ini');
    }
  };

  const handleSendReply = () => {
    if (newReply.trim()) {
      showToast('Balasan berhasil dikirim!');
      setNewReply('');
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Forum Diskusi</h1>
          <p className="text-sm text-emerald-500 mt-1">Ruang silaturahmi dan diskusi warga Nahdliyin Kedu</p>
        </div>
        <button
          onClick={() => setShowNewThread(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Buat Diskusi Baru
        </button>
      </div>

      {/* New Thread Modal */}
      {showNewThread && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Buat Diskusi Baru</h3>
                <button onClick={() => setShowNewThread(false)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Judul Diskusi</label>
                <input type="text" placeholder="Tulis judul diskusi Anda..." className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Kategori</label>
                <select className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                  <option>Aqidah & Fiqih</option>
                  <option>Dakwah</option>
                  <option>Sosial Kemasyarakatan</option>
                  <option>Organisasi & Kelembagaan</option>
                  <option>Teknologi & Digital</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Isi Diskusi</label>
                <textarea rows={6} placeholder="Tuliskan topik diskusi Anda di sini..." className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowNewThread(false)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">Batal</button>
                <button onClick={() => { setShowNewThread(false); showToast('Diskusi baru berhasil dibuat!'); }} className="flex-1 py-2.5 rounded-xl text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors font-medium">
                  Posting Diskusi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center bg-white rounded-xl border border-emerald-100/60 px-4 py-3 gap-2">
        <Search className="w-4 h-4 text-emerald-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari topik diskusi..."
          className="bg-transparent text-sm outline-none flex-1 text-emerald-800 placeholder:text-emerald-400"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-emerald-400 hover:text-emerald-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-4 space-y-1">
            <h3 className="font-bold text-emerald-900 text-sm mb-3 px-2">Kategori</h3>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all active:scale-95 ${
                  activeCat === cat.id
                    ? 'bg-emerald-50 text-emerald-800 font-medium'
                    : 'text-emerald-600 hover:bg-emerald-50/50'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-xs bg-emerald-100 text-emerald-500 px-2 py-0.5 rounded-full">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Online Now */}
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-4 mt-4">
            <h3 className="font-bold text-emerald-900 text-sm mb-3">Online Sekarang</h3>
            <div className="flex flex-wrap gap-2">
              {['UN', 'AH', 'SA', 'MR', 'FA', 'BN'].map((initials, i) => (
                <button key={i} className="relative hover:scale-110 transition-transform">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold">
                    {initials}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </button>
              ))}
              <button className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 text-[10px] font-bold hover:bg-emerald-200 transition-colors">
                +12
              </button>
            </div>
          </div>
        </div>

        {/* Threads */}
        <div className="lg:col-span-3 space-y-3">
          {selectedThread === null ? (
            <>
              {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-12 text-center">
                  <Search className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
                  <p className="text-emerald-500 font-medium">Diskusi tidak ditemukan</p>
                  <p className="text-sm text-emerald-400 mt-1">Coba kata kunci atau kategori lain</p>
                </div>
              ) : (
                filtered.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setSelectedThread(thread.id)}
                    className="w-full text-left bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 hover:shadow-md hover:border-emerald-200 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${thread.author.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {thread.author.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {thread.pinned && <Pin className="w-3.5 h-3.5 text-blue-500" />}
                          {thread.hot && <Flame className="w-3.5 h-3.5 text-red-500" />}
                          <h3 className="text-sm font-bold text-emerald-900 group-hover:text-emerald-700 truncate">
                            {thread.title}
                          </h3>
                        </div>
                        <p className="text-xs text-emerald-500 mb-2">{thread.preview}</p>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[10px] text-emerald-400">{thread.author.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${catColors[thread.category]}`}>
                            {thread.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                            <Clock className="w-3 h-3" />{thread.lastActivity}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                            <MessageSquare className="w-3 h-3" />{thread.replies}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                            <Heart className="w-3 h-3" />{thread.likes}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                            <Eye className="w-3 h-3" />{thread.views}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-emerald-300 group-hover:text-emerald-500 shrink-0 mt-1" />
                    </div>
                  </button>
                ))
              )}
            </>
          ) : (
            /* Thread Detail View */
            <div className="space-y-4">
              <button
                onClick={() => setSelectedThread(null)}
                className="text-sm text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1"
              >
                ← Kembali ke Forum
              </button>

              {(() => {
                const thread = initialThreads.find((t) => t.id === selectedThread);
                if (!thread) return null;
                return (
                  <>
                    <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${thread.author.color} flex items-center justify-center text-white text-sm font-bold`}>
                          {thread.author.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-emerald-800">{thread.author.name}</p>
                          <p className="text-xs text-emerald-400">{thread.lastActivity}</p>
                        </div>
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ml-auto ${catColors[thread.category]}`}>
                          {thread.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-emerald-900 mb-3">{thread.title}</h2>
                      <p className="text-sm text-emerald-700 leading-relaxed">
                        {thread.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-emerald-50">
                        <button
                          onClick={() => handleLike(thread.id)}
                          className={`flex items-center gap-1.5 text-sm transition-colors active:scale-95 ${
                            liked.includes(thread.id) ? 'text-rose-500 font-medium' : 'text-emerald-500 hover:text-emerald-700'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${liked.includes(thread.id) ? 'fill-rose-500' : ''}`} />
                          {thread.likes + (liked.includes(thread.id) ? 1 : 0)} Suka
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-emerald-500 hover:text-emerald-700 transition-colors">
                          <Reply className="w-4 h-4" />
                          Balas
                        </button>
                        <button
                          onClick={() => showToast('Link diskusi disalin!')}
                          className="flex items-center gap-1.5 text-sm text-emerald-500 hover:text-emerald-700 transition-colors ml-auto"
                        >
                          🔗 Bagikan
                        </button>
                      </div>
                    </div>

                    {/* Replies */}
                    <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5">
                      <h3 className="font-bold text-emerald-800 mb-4">{thread.replies} Balasan</h3>
                      <div className="space-y-4">
                        {[
                          { name: 'Ahmad Hidayat', avatar: 'AH', color: 'from-amber-400 to-orange-500', text: 'Subhanallah, sangat menginspirasi ustadz. Semoga kita semua bisa mengambil hikmah dari peristiwa Isra Mi\'raj.', time: '20 menit lalu' },
                          { name: 'Siti Aminah', avatar: 'SA', color: 'from-blue-400 to-indigo-500', text: 'Terima kasih sudah berbagi ilmu. Saya jadi lebih paham tentang hikmah di balik perjalanan Rasulullah.', time: '15 menit lalu' },
                          { name: 'Muhammad Rizki', avatar: 'MR', color: 'from-purple-400 to-pink-500', text: 'Ustadz, bolehkah saya bertanya lebih lanjut tentang perintah sholat 5 waktu dalam peristiwa ini?', time: '10 menit lalu' },
                        ].map((reply, i) => (
                          <div key={i} className="flex gap-3 p-3 rounded-xl bg-emerald-50/30">
                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${reply.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                              {reply.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-emerald-800">{reply.name}</span>
                                <span className="text-[10px] text-emerald-400">{reply.time}</span>
                              </div>
                              <p className="text-sm text-emerald-700">{reply.text}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <button
                                  onClick={() => showToast('Anda menyukai balasan ini')}
                                  className="text-xs text-emerald-500 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                                >
                                  <Heart className="w-3 h-3" /> Suka
                                </button>
                                <button className="text-xs text-emerald-500 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                                  <Reply className="w-3 h-3" /> Balas
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Reply Input */}
                      <div className="mt-4 pt-4 border-t border-emerald-50 flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          AH
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                            type="text"
                            placeholder="Tulis balasan Anda..."
                            className="flex-1 bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 placeholder:text-emerald-400 border border-emerald-100 focus:border-emerald-300 transition-colors"
                          />
                          <button
                            onClick={handleSendReply}
                            className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors active:scale-95"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
