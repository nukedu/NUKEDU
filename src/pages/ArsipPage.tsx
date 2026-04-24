import { useState } from 'react';
import {
  FileText,
  Download,
  Upload,
  Search,
  X,
  Eye,
  Tag,
  Archive,
  File,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  Printer,
  Share2,
  Trash2,
  Star,
  Lock,
  Grid,
  List,
  HardDrive,
} from 'lucide-react';

type TabType = 'semua' | 'surat' | 'notulen' | 'laporan' | 'sk' | 'proposal' | 'lainnya';
type ViewMode = 'grid' | 'list';

interface Document {
  id: number;
  name: string;
  category: TabType;
  type: string;
  size: string;
  date: string;
  uploader: string;
  downloads: number;
  starred: boolean;
  locked: boolean;
  tags: string[];
  description: string;
}

const categories = [
  { id: 'semua' as TabType, label: 'Semua Dokumen', icon: Archive, count: 48 },
  { id: 'surat' as TabType, label: 'Surat-Menyurat', icon: FileText, count: 15 },
  { id: 'notulen' as TabType, label: 'Notulen Rapat', icon: FileText, count: 12 },
  { id: 'laporan' as TabType, label: 'Laporan', icon: FileSpreadsheet, count: 8 },
  { id: 'sk' as TabType, label: 'SK & Keputusan', icon: File, count: 6 },
  { id: 'proposal' as TabType, label: 'Proposal', icon: FileText, count: 4 },
  { id: 'lainnya' as TabType, label: 'Lainnya', icon: File, count: 3 },
];

const initialDocs: Document[] = [
  { id: 1, name: 'SK Pengurus MWC NU Kedu Periode 2022-2027', category: 'sk', type: 'PDF', size: '2.4 MB', date: '15 Mar 2022', uploader: 'Dr. H. Ahmad Fauzi', downloads: 145, starred: true, locked: false, tags: ['SK', 'Pengurus', 'MWC'], description: 'Surat Keputusan Pengurus MWC NU Kedu periode 2022-2027' },
  { id: 2, name: 'Notulen Rapat Koordinasi Januari 2026', category: 'notulen', type: 'DOCX', size: '1.8 MB', date: '18 Jan 2026', uploader: 'H. Muhammad Sholeh', downloads: 32, starred: false, locked: false, tags: ['Rapat', 'Koordinasi', 'Januari'], description: 'Notulen rapat koordinasi bulanan pengurus MWC NU Kedu' },
  { id: 3, name: 'Laporan Keuangan LAZISNU Q4 2025', category: 'laporan', type: 'XLSX', size: '3.2 MB', date: '5 Jan 2026', uploader: 'Hj. Siti Nurhaliza', downloads: 67, starred: true, locked: true, tags: ['LAZISNU', 'Keuangan', 'Q4'], description: 'Laporan keuangan LAZISNU Kedu triwulan keempat 2025' },
  { id: 4, name: 'Surat Undangan Rapat Bulanan Februari', category: 'surat', type: 'PDF', size: '450 KB', date: '28 Jan 2026', uploader: 'H. Muhammad Sholeh', downloads: 28, starred: false, locked: false, tags: ['Undangan', 'Rapat', 'Februari'], description: 'Surat undangan rapat koordinasi bulanan Februari 2026' },
  { id: 5, name: 'Proposal Pembangunan Gedung NU Kedu', category: 'proposal', type: 'PDF', size: '5.1 MB', date: '10 Des 2025', uploader: 'Dr. H. Ahmad Fauzi', downloads: 89, starred: true, locked: false, tags: ['Proposal', 'Pembangunan', 'Gedung'], description: 'Proposal pengajuan pembangunan gedung MWC NU Kecamatan Kedu' },
  { id: 6, name: 'SK Pembentukan Ranting NU Se-Kecamatan', category: 'sk', type: 'PDF', size: '1.5 MB', date: '20 Mar 2022', uploader: 'KH. Abdul Mu\'ti', downloads: 210, starred: true, locked: false, tags: ['SK', 'Ranting', 'Pembentukan'], description: 'SK pembentukan 14 ranting NU se-Kecamatan Kedu' },
  { id: 7, name: 'Notulen Musyawarah Kerja Tahunan 2025', category: 'notulen', type: 'DOCX', size: '2.8 MB', date: '25 Des 2025', uploader: 'H. Muhammad Sholeh', downloads: 56, starred: false, locked: false, tags: ['Muker', 'Tahunan', '2025'], description: 'Notulen musyawarah kerja tahunan MWC NU Kedu 2025' },
  { id: 8, name: 'Laporan Kegiatan Dakwah Semester 2', category: 'laporan', type: 'PDF', size: '4.2 MB', date: '31 Des 2025', uploader: 'Ustadz Nur Hidayat', downloads: 43, starred: false, locked: false, tags: ['Dakwah', 'Semester', 'Laporan'], description: 'Laporan kegiatan dakwah MWC NU Kedu semester genap 2025' },
  { id: 9, name: 'Surat Edaran Pendaftaran Anggota Baru', category: 'surat', type: 'PDF', size: '380 KB', date: '2 Jan 2026', uploader: 'Dr. H. Ahmad Fauzi', downloads: 156, starred: false, locked: false, tags: ['Edaran', 'Pendaftaran', 'Anggota'], description: 'Surat edaran pendaftaran anggota baru MWC NU Kedu 2026' },
  { id: 10, name: 'AD/ART MWC NU Kedu', category: 'lainnya', type: 'PDF', size: '1.2 MB', date: '15 Mar 2022', uploader: 'KH. Abdul Mu\'ti', downloads: 189, starred: true, locked: false, tags: ['AD/ART', 'Organisasi', 'Anggaran Dasar'], description: 'Anggaran Dasar dan Anggaran Rumah Tangga MWC NU Kecamatan Kedu' },
  { id: 11, name: 'Data Anggota NU Ranting Kedu (Update Jan 2026)', category: 'laporan', type: 'XLSX', size: '890 KB', date: '15 Jan 2026', uploader: 'Ahmad Hidayat', downloads: 23, starred: false, locked: true, tags: ['Data', 'Anggota', 'Ranting Kedu'], description: 'Database anggota NU Ranting Kedu terupdate Januari 2026' },
  { id: 12, name: 'Surat Pengantar LAZISNU ke Kabupaten', category: 'surat', type: 'PDF', size: '520 KB', date: '12 Jan 2026', uploader: 'H. Muhammad Sholeh', downloads: 18, starred: false, locked: false, tags: ['LAZISNU', 'Surat Pengantar', 'Kabupaten'], description: 'Surat pengantar koordinasi LAZISNU Kedu ke LAZISNU Kabupaten Temanggung' },
];

const fileTypeIcon = (type: string) => {
  switch (type) {
    case 'PDF': return { icon: FileText, color: 'text-red-500 bg-red-50' };
    case 'DOCX': return { icon: FileText, color: 'text-blue-500 bg-blue-50' };
    case 'XLSX': return { icon: FileSpreadsheet, color: 'text-emerald-500 bg-emerald-50' };
    case 'PPTX': return { icon: File, color: 'text-amber-500 bg-amber-50' };
    case 'MP4': return { icon: FileVideo, color: 'text-purple-500 bg-purple-50' };
    case 'MP3': return { icon: FileAudio, color: 'text-pink-500 bg-pink-50' };
    default: return { icon: File, color: 'text-slate-500 bg-slate-50' };
  }
};

export default function ArsipPage() {
  const [activeCategory, setActiveCategory] = useState<TabType>('semua');
  const [docs, setDocs] = useState(initialDocs);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'downloads'>('date');
  const [notif, setNotif] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 2500);
  };

  const allTags = [...new Set(docs.flatMap(d => d.tags))];

  const filteredDocs = docs
    .filter(d => {
      const catMatch = activeCategory === 'semua' || d.category === activeCategory;
      const searchMatch = !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const tagMatch = selectedTags.length === 0 || selectedTags.some(t => d.tags.includes(t));
      return catMatch && searchMatch && tagMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const handleToggleStar = (id: number) => {
    setDocs(docs.map(d => d.id === id ? { ...d, starred: !d.starred } : d));
    showToast('Bookmark diperbarui');
  };

  const handleDownload = (doc: Document) => {
    setDocs(docs.map(d => d.id === doc.id ? { ...d, downloads: d.downloads + 1 } : d));
    showToast(`Mengunduh: ${doc.name}`);
  };

  const handleDelete = (id: number) => {
    const doc = docs.find(d => d.id === id);
    setDocs(docs.filter(d => d.id !== id));
    showToast(`Dokumen "${doc?.name}" dihapus`);
  };

  const totalSize = docs.reduce((sum, d) => sum + parseFloat(d.size), 0).toFixed(1);

  return (
    <div className="space-y-6">
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">✅ {notif}</div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Upload Dokumen</h3>
                <button onClick={() => setShowUpload(false)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer bg-emerald-50/30" onClick={() => showToast('File picker dibuka')}>
                <Upload className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-emerald-700">Klik untuk pilih file atau drag & drop</p>
                <p className="text-xs text-emerald-400 mt-1">PDF, DOCX, XLSX, PPTX, JPG, PNG (Max 25MB)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Kategori</label>
                  <select className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                    {categories.filter(c => c.id !== 'semua').map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Akses</label>
                  <select className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                    <option>Publik</option><option>Terbatas (Pengurus)</option><option>Privat</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Deskripsi</label>
                <textarea rows={2} placeholder="Deskripsi dokumen..." className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 resize-none" />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Tags</label>
                <input type="text" placeholder="Pisahkan dengan koma (contoh: SK, Pengurus, 2026)" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowUpload(false)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">Batal</button>
                <button onClick={() => { setShowUpload(false); showToast('Dokumen berhasil diupload!'); }} className="flex-1 py-2.5 rounded-xl text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors font-medium active:scale-95">Upload</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Arsip & Dokumentasi</h1>
          <p className="text-sm text-emerald-500 mt-1">Pusat arsip dokumen resmi MWC NU Kecamatan Kedu</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => showToast('Mengunduh semua arsip...')} className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors active:scale-95">
            <Download className="w-4 h-4" /> Unduh Arsip
          </button>
          <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95">
            <Upload className="w-4 h-4" /> Upload Dokumen
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Dokumen', value: docs.length.toString(), icon: Archive, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Total Download', value: docs.reduce((s, d) => s + d.downloads, 0).toLocaleString(), icon: Download, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Penyimpanan', value: `${totalSize} MB`, icon: HardDrive, bg: 'bg-amber-50', color: 'text-amber-600' },
          { label: 'Dokumen Terbatas', value: docs.filter(d => d.locked).length.toString(), icon: Lock, bg: 'bg-red-50', color: 'text-red-600' },
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

      {/* Layout: Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-4 space-y-1">
            <h3 className="font-bold text-emerald-900 text-sm mb-3 px-2">Kategori Dokumen</h3>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all active:scale-95 ${
                    activeCategory === cat.id ? 'bg-emerald-50 text-emerald-800 font-medium' : 'text-emerald-600 hover:bg-emerald-50/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />{cat.label}
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-500 px-2 py-0.5 rounded-full">{cat.count}</span>
                </button>
              );
            })}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-4">
            <h3 className="font-bold text-emerald-900 text-sm mb-3 px-2">Tags Populer</h3>
            <div className="flex flex-wrap gap-1.5">
              {allTags.slice(0, 12).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag])}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-all active:scale-95 ${
                    selectedTags.includes(tag) ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                >
                  <Tag className="w-3 h-3 inline mr-0.5" />{tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button onClick={() => setSelectedTags([])} className="text-xs text-emerald-500 hover:text-emerald-700 mt-2 px-2">✕ Hapus filter</button>
            )}
          </div>

          {/* Starred */}
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-4">
            <h3 className="font-bold text-emerald-900 text-sm mb-3 px-2">⭐ Dokumen Favorit</h3>
            <div className="space-y-2">
              {docs.filter(d => d.starred).slice(0, 4).map((d) => (
                <button key={d.id} onClick={() => setShowDetail(d.id)} className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-50 transition-colors text-left">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  <span className="text-xs text-emerald-700 truncate">{d.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-emerald-100/60 px-4 py-2.5 flex-1">
              <Search className="w-4 h-4 text-emerald-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari dokumen, tag, atau uploader..." className="bg-transparent text-sm outline-none flex-1 text-emerald-800 placeholder:text-emerald-400" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="text-emerald-400 hover:text-emerald-600"><X className="w-4 h-4" /></button>}
            </div>
            <div className="flex items-center gap-2">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="bg-white rounded-xl px-3 py-2.5 text-xs outline-none text-emerald-800 border border-emerald-100">
                <option value="date">Terbaru</option>
                <option value="name">Nama A-Z</option>
                <option value="downloads">Terpopuler</option>
              </select>
              <div className="flex items-center gap-1 bg-white rounded-xl border border-emerald-100 p-1">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-emerald-500 hover:bg-emerald-50'}`}>
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-emerald-500 hover:bg-emerald-50'}`}>
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-xs text-emerald-400">{filteredDocs.length} dokumen ditemukan</p>

          {/* Document Detail Panel */}
          {showDetail !== null && (() => {
            const doc = docs.find(d => d.id === showDetail);
            if (!doc) return null;
            const ft = fileTypeIcon(doc.type);
            const FIcon = ft.icon;
            return (
              <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${ft.color} flex items-center justify-center`}>
                      <FIcon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-900 text-lg">{doc.name}</h3>
                      <p className="text-sm text-emerald-500 mt-1">{doc.description}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-emerald-400">
                        <span>{doc.type} • {doc.size}</span>
                        <span>📅 {doc.date}</span>
                        <span>👤 {doc.uploader}</span>
                        <span>⬇️ {doc.downloads} unduhan</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {doc.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setShowDetail(null)} className="p-1 rounded-lg hover:bg-emerald-50 text-emerald-400"><X className="w-5 h-5" /></button>
                </div>
                <div className="flex gap-2 pt-2 border-t border-emerald-50">
                  <button onClick={() => handleDownload(doc)} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors active:scale-95">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button onClick={() => showToast('Preview dibuka')} className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors active:scale-95">
                    <Eye className="w-4 h-4" /> Preview
                  </button>
                  <button onClick={() => showToast('Link disalin!')} className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors active:scale-95">
                    <Share2 className="w-4 h-4" /> Bagikan
                  </button>
                  <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors active:scale-95">
                    <Printer className="w-4 h-4" /> Print
                  </button>
                </div>
              </div>
            );
          })()}

          {/* LIST VIEW */}
          {viewMode === 'list' && (
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-emerald-50/80 border-b border-emerald-100">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Dokumen</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase hidden md:table-cell">Kategori</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Tipe</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase hidden sm:table-cell">Ukuran</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase hidden lg:table-cell">Tanggal</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase hidden sm:table-cell">⬇️</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.map((doc) => {
                      const ft = fileTypeIcon(doc.type);
                      const FIcon = ft.icon;
                      return (
                        <tr key={doc.id} className="border-b border-emerald-50 hover:bg-emerald-50/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl ${ft.color} flex items-center justify-center shrink-0`}>
                                <FIcon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <button onClick={() => setShowDetail(doc.id)} className="text-sm font-medium text-emerald-800 hover:text-emerald-600 truncate block max-w-xs text-left">
                                  {doc.starred && <Star className="w-3 h-3 inline text-amber-400 fill-amber-400 mr-1" />}
                                  {doc.locked && <Lock className="w-3 h-3 inline text-red-400 mr-1" />}
                                  {doc.name}
                                </button>
                                <p className="text-[10px] text-emerald-400 truncate">{doc.uploader}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">{doc.category}</span>
                          </td>
                          <td className="text-center px-4 py-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${ft.color}`}>{doc.type}</span>
                          </td>
                          <td className="text-center px-4 py-3 text-xs text-emerald-500 hidden sm:table-cell">{doc.size}</td>
                          <td className="px-4 py-3 text-xs text-emerald-400 hidden lg:table-cell">{doc.date}</td>
                          <td className="text-center px-4 py-3 text-xs text-emerald-400 hidden sm:table-cell">{doc.downloads}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => handleDownload(doc)} className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-500 transition-colors" title="Download">
                                <Download className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleToggleStar(doc.id)} className={`p-1.5 rounded-lg transition-colors ${doc.starred ? 'text-amber-400' : 'text-emerald-400 hover:text-amber-400'}`} title="Favorit">
                                <Star className={`w-3.5 h-3.5 ${doc.starred ? 'fill-amber-400' : ''}`} />
                              </button>
                              <button onClick={() => handleDelete(doc.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-emerald-400 hover:text-red-500 transition-colors" title="Hapus">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDocs.map((doc) => {
                const ft = fileTypeIcon(doc.type);
                const FIcon = ft.icon;
                return (
                  <div key={doc.id} className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-2xl ${ft.color} flex items-center justify-center`}>
                        <FIcon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-1">
                        {doc.locked && <Lock className="w-3.5 h-3.5 text-red-400" />}
                        <button onClick={() => handleToggleStar(doc.id)} className={`p-1 rounded-lg transition-colors ${doc.starred ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'}`}>
                          <Star className={`w-4 h-4 ${doc.starred ? 'fill-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => setShowDetail(doc.id)} className="text-left w-full">
                      <h4 className="text-sm font-bold text-emerald-900 line-clamp-2 group-hover:text-emerald-700 mb-2">{doc.name}</h4>
                    </button>
                    <p className="text-xs text-emerald-500 line-clamp-2 mb-3">{doc.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {doc.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-emerald-50">
                      <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                        <span>{doc.type} • {doc.size}</span>
                        <span>⬇️ {doc.downloads}</span>
                      </div>
                      <button onClick={() => handleDownload(doc)} className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-500 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredDocs.length === 0 && (
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-12 text-center">
              <Archive className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
              <p className="text-emerald-500 font-medium">Dokumen tidak ditemukan</p>
              <p className="text-sm text-emerald-400 mt-1">Coba kata kunci atau kategori lain</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
