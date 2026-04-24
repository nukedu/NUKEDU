import { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  Video,
  FileText,
  Shield,
  Heart,
  Users,
  Calendar,
  Settings,
  Star,
  Send,
  ThumbsUp,
  ThumbsDown,
  Check,
  Info,
  Lightbulb,
  Zap,
  Globe,
} from 'lucide-react';

type TabType = 'faq' | 'panduan' | 'kontak' | 'video';

const faqCategories = [
  { id: 'umum', label: 'Umum', icon: HelpCircle, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'akun', label: 'Akun & Profil', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { id: 'kegiatan', label: 'Kegiatan & Acara', icon: Calendar, color: 'bg-amber-50 text-amber-600' },
  { id: 'keuangan', label: 'LAZISNU & Donasi', icon: Heart, color: 'bg-rose-50 text-rose-600' },
  { id: 'teknis', label: 'Teknis Portal', icon: Settings, color: 'bg-purple-50 text-purple-600' },
];

const faqs = [
  { category: 'umum', q: 'Apa itu Portal Digital MWC NU Kedu?', a: 'Portal Digital MWC NU Kedu adalah platform digital terintegrasi untuk seluruh warga Nahdliyin di Kecamatan Kedu. Portal ini menyediakan layanan keanggotaan, forum diskusi, LAZISNU digital, jadwal pengajian, dan dokumentasi kegiatan organisasi.' },
  { category: 'umum', q: 'Siapa yang bisa bergabung di portal ini?', a: 'Seluruh warga Nahdliyin yang berdomisili di Kecamatan Kedu dan sekitarnya dapat bergabung. Pendaftaran dapat dilakukan melalui menu "Pendaftaran Anggota" atau melalui pengurus ranting di desa masing-masing.' },
  { category: 'umum', q: 'Bagaimana cara menghubungi pengurus MWC NU Kedu?', a: 'Anda dapat menghubungi pengurus melalui fitur Chat Anggota di portal, mengunjungi Kantor MWC NU Kedu, atau menghubungi nomor telepon yang tersedia di halaman kontak.' },
  { category: 'akun', q: 'Bagaimana cara mendaftar sebagai anggota?', a: 'Klik menu "Pendaftaran Anggota" di sidebar, isi formulir 3 langkah (Data Pribadi → Alamat & Organisasi → Konfirmasi), lalu kirim. Pendaftaran akan diverifikasi oleh pengurus ranting dalam 1-3 hari kerja.' },
  { category: 'akun', q: 'Bagaimana cara mengubah profil saya?', a: 'Buka menu "Profil Saya", lalu klik tombol "Edit Profil" di bagian kanan atas. Anda dapat mengubah nama, email, telepon, alamat, dan foto profil.' },
  { category: 'akun', q: 'Lupa password, bagaimana cara reset?', a: 'Hubungi pengurus MWC NU Kedu melalui fitur Chat atau datang langsung ke kantor. Pengurus akan membantu mereset password akun Anda.' },
  { category: 'akun', q: 'Apa itu Level Kontribusi?', a: 'Level Kontribusi (Bronze → Silver → Gold → Platinum → Diamond) menunjukkan tingkat keaktifan Anda di portal. Poin didapatkan dari kegiatan, donasi, artikel, dan forum diskusi. Level lebih tinggi memberikan akses fitur tambahan.' },
  { category: 'kegiatan', q: 'Bagaimana cara mendaftar kegiatan?', a: 'Buka menu "Kegiatan", pilih kegiatan yang ingin diikuti, lalu klik tombol "Daftar". Anda akan mendapatkan konfirmasi dan pengingat sebelum acara dimulai.' },
  { category: 'kegiatan', q: 'Bisakah saya mengajukan kegiatan baru?', a: 'Ya! Klik tombol "Ajukan Kegiatan" di halaman Kegiatan. Isi formulir lengkap, lalu pengurus akan meninjau dan menyetujui kegiatan tersebut.' },
  { category: 'keuangan', q: 'Bagaimana cara berdonasi melalui LAZISNU?', a: 'Buka menu "LAZISNU", pilih program donasi, masukkan nominal, pilih jenis (Zakat/Infaq/Shadaqah), lalu klik "Kirim Donasi". Donasi akan tercatat transparan di sistem.' },
  { category: 'keuangan', q: 'Apakah donasi saya bisa dipantau penyalurannya?', a: 'Ya, semua donasi tercatat transparan. Buka tab "Laporan Penyaluran" di halaman LAZISNU untuk melihat detail penyaluran ke mustahik dan program terkait.' },
  { category: 'teknis', q: 'Portal tidak bisa dibuka, apa yang harus dilakukan?', a: 'Coba refresh halaman, hapus cache browser, atau gunakan browser lain. Jika masih bermasalah, hubungi admin portal melalui WhatsApp atau email yang tertera di halaman kontak.' },
  { category: 'teknis', q: 'Bagaimana cara mengaktifkan notifikasi?', a: 'Buka menu "Pengaturan" → tab "Notifikasi", lalu aktifkan kanal notifikasi yang diinginkan (Push, Email, SMS) dan pilih kategori notifikasi.' },
];

const guides = [
  { title: 'Panduan Pendaftaran Anggota Baru', desc: 'Langkah-langkah lengkap mendaftar sebagai anggota NU Kedu', icon: Users, time: '5 menit', level: 'Pemula' },
  { title: 'Cara Berdonasi di LAZISNU', desc: 'Tutorial zakat, infaq, dan shadaqah melalui portal', icon: Heart, time: '3 menit', level: 'Pemula' },
  { title: 'Menggunakan Forum Diskusi', desc: 'Cara membuat thread, membalas, dan berinteraksi di forum', icon: MessageSquare, time: '4 menit', level: 'Pemula' },
  { title: 'Mengupload Artikel & Tulisan', desc: 'Panduan menulis dan mempublikasikan artikel di portal', icon: FileText, time: '5 menit', level: 'Menengah' },
  { title: 'Mengelola Arsip Dokumentasi', desc: 'Cara upload, kategorisasi, dan berbagi dokumen', icon: BookOpen, time: '4 menit', level: 'Menengah' },
  { title: 'Management Hak Akses & Role', desc: 'Panduan untuk admin mengelola pengguna dan peran', icon: Shield, time: '7 menit', level: 'Admin' },
  { title: 'Sistem Masa Hidmat Jabatan', desc: 'Cara kerja auto-lock, perpanjangan, dan pengaturan masa jabatan', icon: Settings, time: '6 menit', level: 'Admin' },
  { title: 'Tips Kontribusi Aktif', desc: 'Cara naik level kontribusi dan mendapatkan badge', icon: Star, time: '3 menit', level: 'Pemula' },
];

const videoTutorials = [
  { title: 'Tour Portal MWC NU Kedu', duration: '5:32', views: 234, thumbnail: 'from-emerald-600 to-teal-700' },
  { title: 'Cara Daftar Anggota', duration: '3:15', views: 189, thumbnail: 'from-blue-600 to-indigo-700' },
  { title: 'Donasi LAZISNU Step-by-Step', duration: '4:28', views: 156, thumbnail: 'from-rose-600 to-pink-700' },
  { title: 'Menggunakan Forum Diskusi', duration: '6:10', views: 112, thumbnail: 'from-amber-600 to-orange-700' },
  { title: 'Upload Artikel di Portal', duration: '4:45', views: 87, thumbnail: 'from-purple-600 to-violet-700' },
  { title: 'Fitur Chat Anggota', duration: '3:50', views: 145, thumbnail: 'from-cyan-600 to-blue-700' },
];

const contacts = [
  { name: 'Kantor MWC NU Kedu', detail: 'Jl. Raya Kedu No. 1, Temanggung', icon: Globe, type: 'Alamat' },
  { name: 'WhatsApp Admin', detail: '+62 812-3456-7890', icon: Phone, type: 'Telepon' },
  { name: 'Email Resmi', detail: 'info@mwcnu-kedu.or.id', icon: Mail, type: 'Email' },
  { name: 'Jam Operasional', detail: 'Senin - Sabtu, 08:00 - 16:00 WIB', icon: Calendar, type: 'Jadwal' },
];

export default function BantuanPage() {
  const [tab, setTab] = useState<TabType>('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaqCat, setActiveFaqCat] = useState('semua');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ subject: '', message: '' });
  const [notif, setNotif] = useState<string | null>(null);
  const [helpful, setHelpful] = useState<number[]>([]);
  const [notHelpful, setNotHelpful] = useState<number[]>([]);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 2500);
  };

  const filteredFaqs = faqs.filter(f => {
    const catMatch = activeFaqCat === 'semua' || f.category === activeFaqCat;
    const searchMatch = !searchQuery || f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  const handleHelpful = (index: number, isHelpful: boolean) => {
    if (isHelpful) {
      setHelpful([...helpful, index]);
      setNotHelpful(notHelpful.filter(i => i !== index));
    } else {
      setNotHelpful([...notHelpful, index]);
      setHelpful(helpful.filter(i => i !== index));
    }
    showToast(isHelpful ? 'Terima kasih atas feedback Anda!' : 'Kami akan perbaiki jawaban ini');
  };

  const handleSendContact = () => {
    if (contactForm.subject && contactForm.message) {
      showToast('Pesan berhasil dikirim! Tim kami akan merespons dalam 1x24 jam.');
      setContactForm({ subject: '', message: '' });
    }
  };

  return (
    <div className="space-y-6">
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">✅ {notif}</div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
          <HelpCircle className="w-full h-full" />
        </div>
        <div className="relative z-10 max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Pusat Bantuan</h1>
          <p className="text-emerald-100 text-sm md:text-base mb-4">Temukan jawaban, panduan, dan dukungan untuk menggunakan Portal Digital NU Kedu</p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan atau panduan..."
              className="w-full bg-white/15 backdrop-blur-sm rounded-xl pl-12 pr-4 py-3 text-sm outline-none text-white placeholder:text-emerald-200 border border-white/20 focus:bg-white/20 focus:border-white/40 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'FAQ', value: faqs.length.toString(), icon: HelpCircle, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Panduan', value: guides.length.toString(), icon: BookOpen, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Video Tutorial', value: videoTutorials.length.toString(), icon: Video, bg: 'bg-purple-50', color: 'text-purple-600' },
          { label: 'Respon < 24 Jam', value: '98%', icon: Zap, bg: 'bg-amber-50', color: 'text-amber-600' },
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

      {/* Tabs */}
      <div className="flex bg-white rounded-xl border border-emerald-100/60 p-1 gap-1">
        {[
          { id: 'faq' as TabType, label: 'FAQ', icon: HelpCircle },
          { id: 'panduan' as TabType, label: 'Panduan', icon: BookOpen },
          { id: 'video' as TabType, label: 'Video Tutorial', icon: Video },
          { id: 'kontak' as TabType, label: 'Hubungi Kami', icon: MessageSquare },
        ].map((t) => {
          const TIcon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                tab === t.id ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-500 hover:bg-emerald-50'
              }`}>
              <TIcon className="w-4 h-4" /><span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========== FAQ ========== */}
      {tab === 'faq' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category Filter */}
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-4 space-y-1">
            <h3 className="font-bold text-emerald-900 text-sm mb-3 px-2">Kategori</h3>
            <button
              onClick={() => setActiveFaqCat('semua')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${activeFaqCat === 'semua' ? 'bg-emerald-50 text-emerald-800 font-medium' : 'text-emerald-600 hover:bg-emerald-50/50'}`}
            >
              <span>Semua FAQ</span>
              <span className="text-xs bg-emerald-100 text-emerald-500 px-2 py-0.5 rounded-full">{faqs.length}</span>
            </button>
            {faqCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFaqCat(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${activeFaqCat === cat.id ? 'bg-emerald-50 text-emerald-800 font-medium' : 'text-emerald-600 hover:bg-emerald-50/50'}`}
                >
                  <span className="flex items-center gap-2"><Icon className="w-4 h-4" />{cat.label}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-500 px-2 py-0.5 rounded-full">{faqs.filter(f => f.category === cat.id).length}</span>
                </button>
              );
            })}

            {/* Quick Contact */}
            <div className="mt-4 p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-800 mb-1">Belum menemukan jawaban?</p>
              <p className="text-[10px] text-emerald-500 mb-2">Hubungi tim kami langsung</p>
              <button onClick={() => setTab('kontak')} className="w-full bg-emerald-600 text-white py-2 rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors active:scale-95">
                Hubungi Kami
              </button>
            </div>
          </div>

          {/* FAQ List */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs text-emerald-400">{filteredFaqs.length} pertanyaan ditemukan</p>
            {filteredFaqs.map((faq, i) => {
              const catInfo = faqCategories.find(c => c.id === faq.category);
              const isExpanded = expandedFaq === i;
              return (
                <div key={i} className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : i)}
                    className="w-full flex items-center gap-3 p-4 text-left hover:bg-emerald-50/30 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg ${catInfo?.color || 'bg-emerald-50 text-emerald-600'} flex items-center justify-center shrink-0`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-emerald-900">{faq.q}</p>
                      <p className="text-[10px] text-emerald-400 mt-0.5">{catInfo?.label}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <div className="ml-11 p-4 bg-emerald-50/60 rounded-xl">
                        <p className="text-sm text-emerald-700 leading-relaxed">{faq.a}</p>
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-emerald-100">
                          <span className="text-xs text-emerald-400">Apakah jawaban ini membantu?</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleHelpful(i, true)}
                              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-colors ${
                                helpful.includes(i) ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-emerald-500 hover:bg-emerald-100'
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" /> Ya
                            </button>
                            <button
                              onClick={() => handleHelpful(i, false)}
                              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-colors ${
                                notHelpful.includes(i) ? 'bg-red-100 text-red-600 font-medium' : 'text-emerald-500 hover:bg-red-50'
                              }`}
                            >
                              <ThumbsDown className="w-3 h-3" /> Tidak
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========== PANDUAN ========== */}
      {tab === 'panduan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <button
                key={i}
                onClick={() => showToast(`Membuka panduan: ${guide.title}`)}
                className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-emerald-900 group-hover:text-emerald-700">{guide.title}</h4>
                      <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:text-emerald-500 transition-colors ml-auto shrink-0" />
                    </div>
                    <p className="text-xs text-emerald-500 mb-2">{guide.desc}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">📖 {guide.time} baca</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        guide.level === 'Pemula' ? 'bg-green-50 text-green-600' :
                        guide.level === 'Menengah' ? 'bg-amber-50 text-amber-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {guide.level}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ========== VIDEO TUTORIAL ========== */}
      {tab === 'video' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoTutorials.map((video, i) => (
            <button
              key={i}
              onClick={() => showToast(`Memutar: ${video.title}`)}
              className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
            >
              <div className={`aspect-video bg-gradient-to-br ${video.thumbnail} flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all relative z-10">
                  <Video className="w-6 h-6 text-white ml-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded z-10">{video.duration}</span>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-emerald-900 mb-1 group-hover:text-emerald-700">{video.title}</h4>
                <p className="text-xs text-emerald-400">{video.views} views</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ========== HUBUNGI KAMI ========== */}
      {tab === 'kontak' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-4">Informasi Kontak</h3>
              <div className="space-y-4">
                {contacts.map((contact, i) => {
                  const Icon = contact.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => showToast(`${contact.type}: ${contact.detail}`)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-400 uppercase">{contact.type}</p>
                        <p className="text-sm font-medium text-emerald-800">{contact.detail}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-amber-800">Tips Cepat</h4>
              </div>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />Gunakan FAQ terlebih dahulu untuk pertanyaan umum</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />Sertakan screenshot jika ada masalah teknis</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />Jam respon tercepat: Senin-Jumat 09:00-15:00</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
            <h3 className="font-bold text-emerald-900 text-lg mb-2">Kirim Pesan</h3>
            <p className="text-sm text-emerald-500 mb-5">Tim kami akan merespons dalam 1x24 jam kerja</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Subjek</label>
                <select
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300"
                >
                  <option value="">Pilih subjek...</option>
                  <option value="akun">Masalah Akun & Login</option>
                  <option value="teknis">Masalah Teknis Portal</option>
                  <option value="kegiatan">Pertanyaan Kegiatan</option>
                  <option value="donasi">Pertanyaan Donasi LAZISNU</option>
                  <option value="keanggotaan">Keanggotaan & Pendaftaran</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Pesan</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={6}
                  placeholder="Jelaskan pertanyaan atau masalah Anda secara detail..."
                  className="w-full bg-emerald-50 rounded-xl px-4 py-3 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 resize-none"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-600">Untuk masalah mendesak, hubungi WhatsApp Admin di +62 812-3456-7890</p>
              </div>
              <button
                onClick={handleSendContact}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors active:scale-95 shadow-sm"
              >
                <Send className="w-4 h-4" /> Kirim Pesan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
