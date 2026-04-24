import { useState } from 'react';
import {
  Search,
  Eye,
  Heart,
  MessageSquare,
  Clock,
  Edit3,
  Trash2,
  PenTool,
  X,
} from 'lucide-react';

type TabType = 'artikel-saya' | 'semua-artikel';

const initialMyArticles = [
  {
    id: 1,
    title: 'Hikmah Hari Santri Nasional untuk Generasi Muda NU',
    excerpt: 'Hari Santri Nasional yang diperingati setiap 22 Oktober memiliki makna mendalam bagi perjuangan umat Islam khususnya warga Nahdliyin...',
    date: '12 Jan 2026',
    status: 'published' as const,
    views: 342,
    likes: 56,
    comments: 12,
    category: 'Dakwah',
    liked: false,
  },
  {
    id: 2,
    title: 'Peran NU dalam Memperkuat Moderasi Beragama',
    excerpt: 'Nahdlatul Ulama sejak didirikan telah menjadi garda terdepan dalam menjaga moderasi beragama di Indonesia...',
    date: '5 Jan 2026',
    status: 'published' as const,
    views: 218,
    likes: 41,
    comments: 8,
    category: 'Opini',
    liked: false,
  },
  {
    id: 3,
    title: 'Program Digitalisasi Ranting NU Kedu: Laporan Kemajuan',
    excerpt: 'Bulan ini, program digitalisasi administrasi ranting telah memasuki fase kedua dengan capaian yang menggembirakan...',
    date: '28 Des 2025',
    status: 'draft' as const,
    views: 0,
    likes: 0,
    comments: 0,
    category: 'Laporan',
    liked: false,
  },
];

const initialAllArticles = [
  ...initialMyArticles,
  {
    id: 4,
    title: 'Tafsir Surat Al-Kahfi: Hikmah untuk Kehidupan Modern',
    excerpt: 'Surat Al-Kahfi mengandung empat kisah utama yang masing-masing memberikan pelajaran berharga...',
    date: '10 Jan 2026',
    status: 'published' as const,
    views: 456,
    likes: 89,
    comments: 23,
    category: 'Tafsir',
    liked: false,
  },
  {
    id: 5,
    title: 'Resepsi Maulid Nabi: Tradisi NU yang Mendunia',
    excerpt: 'Peringatan Maulid Nabi Muhammad SAW merupakan salah satu tradisi yang sangat kental dalam budaya NU...',
    date: '8 Jan 2026',
    status: 'published' as const,
    views: 321,
    likes: 67,
    comments: 15,
    category: 'Budaya',
    liked: false,
  },
];

const catColors: Record<string, string> = {
  Dakwah: 'bg-emerald-100 text-emerald-700',
  Opini: 'bg-blue-100 text-blue-700',
  Laporan: 'bg-amber-100 text-amber-700',
  Tafsir: 'bg-purple-100 text-purple-700',
  Budaya: 'bg-rose-100 text-rose-700',
};

export default function ArtikelPage() {
  const [tab, setTab] = useState<TabType>('artikel-saya');
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCat, setSelectedCat] = useState('Dakwah');
  const [notif, setNotif] = useState<string | null>(null);
  const [articles, setArticles] = useState(initialAllArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const myArticles = articles.filter((a) => a.id <= 3);

  const displayed = (tab === 'artikel-saya' ? myArticles : articles).filter((a) =>
    !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveDraft = () => {
    if (title.trim()) {
      showToast(`Draft "${title}" berhasil disimpan!`);
      setShowEditor(false);
      setTitle('');
      setContent('');
    }
  };

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      showToast(`Artikel "${title}" dikirim untuk review!`);
      setShowEditor(false);
      setTitle('');
      setContent('');
    }
  };

  const handleLike = (id: number) => {
    setArticles(articles.map((a) => a.id === id ? { ...a, liked: !a.liked, likes: a.liked ? a.likes - 1 : a.likes + 1 } : a));
  };

  const handleDelete = (id: number) => {
    setArticles(articles.filter((a) => a.id !== id));
    setDeleteConfirm(null);
    showToast('Artikel berhasil dihapus');
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">
          ✅ {notif}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 mx-auto mb-4 flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-bold text-emerald-900 text-lg mb-2">Hapus Artikel?</h3>
            <p className="text-sm text-emerald-500 mb-6">Artikel ini akan dihapus secara permanen.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl text-sm text-white bg-red-500 hover:bg-red-600 transition-colors font-medium">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Artikel & Tulisan</h1>
          <p className="text-sm text-emerald-500 mt-1">Bagikan ilmu, opini, dan informasi untuk warga Nahdliyin</p>
        </div>
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95"
        >
          <PenTool className="w-4 h-4" />
          {showEditor ? 'Tutup Editor' : 'Tulis Artikel'}
        </button>
      </div>

      {/* Editor */}
      {showEditor && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-emerald-900 text-lg">Tulis Artikel Baru</h3>
            <button onClick={() => setShowEditor(false)} className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-400 hover:text-emerald-600"><X className="w-5 h-5" /></button>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Judul artikel..."
            className="w-full bg-emerald-50 rounded-xl px-4 py-3 text-lg font-semibold outline-none text-emerald-800 placeholder:text-emerald-400 border border-emerald-100 focus:border-emerald-300 transition-colors"
          />
          <div className="flex flex-wrap gap-2">
            {['Dakwah', 'Opini', 'Tafsir', 'Budaya', 'Laporan'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all active:scale-95 border ${
                  selectedCat === cat
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Mulai menulis artikel Anda di sini..."
            rows={8}
            className="w-full bg-emerald-50 rounded-xl px-4 py-3 text-sm outline-none text-emerald-800 placeholder:text-emerald-400 border border-emerald-100 focus:border-emerald-300 transition-colors resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-emerald-400">{content.length} karakter</p>
            <div className="flex gap-2">
              <button onClick={() => setShowEditor(false)} className="px-4 py-2 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors">
                Batal
              </button>
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 rounded-xl text-sm bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-medium active:scale-95"
              >
                Simpan Draft
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-xl text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium shadow-sm active:scale-95"
              >
                Kirim untuk Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-white rounded-xl border border-emerald-100/60 p-1 gap-1">
        <button
          onClick={() => setTab('artikel-saya')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
            tab === 'artikel-saya' ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-500 hover:bg-emerald-50'
          }`}
        >
          Artikel Saya ({myArticles.length})
        </button>
        <button
          onClick={() => setTab('semua-artikel')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
            tab === 'semua-artikel' ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-500 hover:bg-emerald-50'
          }`}
        >
          Semua Artikel ({articles.length})
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white rounded-xl border border-emerald-100/60 px-4 py-3 gap-2">
        <Search className="w-4 h-4 text-emerald-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari artikel..."
          className="bg-transparent text-sm outline-none flex-1 text-emerald-800 placeholder:text-emerald-400"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-emerald-400 hover:text-emerald-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {displayed.length === 0 ? (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-12 text-center">
          <Search className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
          <p className="text-emerald-500 font-medium">Artikel tidak ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map((article) => (
            <div
              key={article.id}
              onClick={() => showToast(`Membaca: ${article.title}`)}
              className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${catColors[article.category]}`}>
                  {article.category}
                </span>
                {article.status === 'draft' ? (
                  <span className="text-[10px] bg-amber-100 text-amber-600 px-2.5 py-1 rounded-full font-medium">Draft</span>
                ) : (
                  <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-full font-medium">Published</span>
                )}
              </div>

              <h3 className="font-bold text-emerald-900 mb-2 group-hover:text-emerald-700 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-emerald-500 line-clamp-2 mb-3">{article.excerpt}</p>

              <div className="flex items-center justify-between pt-3 border-t border-emerald-50">
                <div className="flex items-center gap-3 text-xs text-emerald-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.date}</span>
                  <button onClick={(e) => { e.stopPropagation(); }} className="flex items-center gap-1 hover:text-emerald-600"><Eye className="w-3 h-3" />{article.views}</button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLike(article.id); }}
                    className={`flex items-center gap-1 transition-colors ${article.liked ? 'text-rose-500' : 'hover:text-rose-500'}`}
                  >
                    <Heart className={`w-3 h-3 ${article.liked ? 'fill-rose-500' : ''}`} />{article.likes}
                  </button>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{article.comments}</span>
                </div>
                {tab === 'artikel-saya' && (
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => { setTitle(article.title); setContent(''); setSelectedCat(article.category); setShowEditor(true); showToast('Mengedit artikel...'); }}
                      className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-400 hover:text-emerald-600 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(article.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-emerald-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
