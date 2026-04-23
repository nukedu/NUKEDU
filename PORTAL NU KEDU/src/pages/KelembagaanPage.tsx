import { useState } from 'react';
import {
  Users,
  Shield,
  Crown,
  Star,
  Heart,
  Award,
  ChevronRight,
  Search,
  X,
  BookOpen,
  GraduationCap,
  Swords,
  Megaphone,
  Landmark,
  Scale,
  Building,
  Globe,
  PenTool,
  UserCheck,
  Briefcase,
  Phone,
  Mail,
} from 'lucide-react';

// ========================
// TYPES
// ========================
type TabType = 'struktur' | 'banom' | 'lembaga';

// ========================
// STRUKTUR MWC NU KEDU
// ========================
const strukturData = {
  rais: { name: 'KH. Abdul Mu\'ti', position: 'Rais Syuriyah', since: '2022' },
  ketua: { name: 'Dr. H. Ahmad Fauzi, M.Ag', position: 'Ketua Tanfidziyah', since: '2022' },
  sekretaris: { name: 'H. Muhammad Sholeh, S.Ag', position: 'Sekretaris', since: '2022' },
  bendahara: { name: 'Hj. Siti Nurhaliza, S.E', position: 'Bendahara', since: '2022' },
  wakil: [
    { name: 'H. Nur Hidayat, S.Pd.I', position: 'Wakil Ketua I (Bidang Dakwah)', since: '2022' },
    { name: 'H. Rizki Pratama, S.H', position: 'Wakil Ketua II (Bidang Organisasi)', since: '2022' },
    { name: 'Drs. H. Mahmud Yunus', position: 'Wakil Ketua III (Bidang Pendidikan)', since: '2022' },
    { name: 'Hj. Fatimah Azzahra, M.Pd', position: 'Wakil Ketua IV (Bidang Sosial Ekonomi)', since: '2022' },
  ],
  syuriyah: [
    { name: 'KH. Abdul Mu\'ti', position: 'Rais Syuriyah' },
    { name: 'KH. Muhajir Al-Faruq', position: 'Wakil Rais Syuriyah I' },
    { name: 'KH. Ahmad Dahlan', position: 'Wakil Rais Syuriyah II' },
    { name: 'KH. Nuruddin Ar-Rasyidi', position: 'Wakil Rais Syuriyah III' },
    { name: 'H. Ali Mustofa, S.Ag', position: 'Katib Syuriyah' },
  ],
  aam: [
    { name: 'H. Budi Santoso', position: 'Anggota Aam (Perwakilan Ranting Kedu)' },
    { name: 'H. Slamet Riyadi', position: 'Anggota Aam (Perwakilan Ranting Candimulyo)' },
    { name: 'Hj. Rohmah Wati', position: 'Anggota Aam (Perwakilan Ranting Salamsari)' },
    { name: 'H. Endro Susanto', position: 'Anggota Aam (Perwakilan Ranting Danurejo)' },
  ],
};

// ========================
// BANOM DATA
// ========================
const banomData = [
  {
    id: 'gp-ansor',
    name: 'GP Ansor',
    fullName: 'Gerakan Pemuda Ansor',
    desc: 'Organisasi pemuda di bawah naungan NU yang bergerak di bidang keagamaan, kemasyarakatan, dan kebangsaan.',
    icon: Shield,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    members: 450,
    ranting: 14,
    ketua: 'H. Agus Salim, S.Pd',
    phone: '+62 812-3456-0001',
    email: 'ansor.kedu@mwcnu.or.id',
    programs: ['Pelatihan Kader', 'Banser NU', 'Bakti Sosial', 'Forum Kajian'],
  },
  {
    id: 'banser',
    name: 'Banser',
    fullName: 'Barisan Ansor Serbaguna',
    desc: 'Satuan kader terdepan GP Ansor yang bertugas dalam pengamanan, penanganan bencana, dan kegiatan sosial.',
    icon: Swords,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    members: 280,
    ranting: 14,
    ketua: 'H. Wahyu Prasetyo',
    phone: '+62 812-3456-0002',
    email: 'banser.kedu@mwcnu.or.id',
    programs: ['Diklatsar', 'Pengamanan Event', 'SAR & Bencana', 'Pos Kamling'],
  },
  {
    id: 'ipnu',
    name: 'IPNU',
    fullName: 'Ikatan Pelajar Nahdlatul Ulama',
    desc: 'Organisasi pelajar putra NU yang bergerak di bidang pendidikan, keagamaan, dan pengembangan diri.',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    members: 320,
    ranting: 12,
    ketua: 'Ahmad Fadillah',
    phone: '+62 812-3456-0003',
    email: 'ipnu.kedu@mwcnu.or.id',
    programs: ['KOPRI', 'Pelatihan Kepemimpinan', 'Kajian Kitab', 'Olimpiade Agama'],
  },
  {
    id: 'ippnu',
    name: 'IPPNU',
    fullName: 'Ikatan Pelajar Putri Nahdlatul Ulama',
    desc: 'Organisasi pelajar putri NU yang fokus pada pemberdayaan perempuan dan pendidikan keagamaan.',
    icon: GraduationCap,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    members: 295,
    ranting: 12,
    ketua: 'Fatimah Azzahra',
    phone: '+62 812-3456-0004',
    email: 'ippnu.kedu@mwcnu.or.id',
    programs: ['Muslimah Cerdas', 'Kajian Fiqih Putri', 'Skill Training', 'Bakti Sosial'],
  },
  {
    id: 'pmii',
    name: 'PMII',
    fullName: 'Pergerakan Mahasiswa Islam Indonesia',
    desc: 'Organisasi mahasiswa yang berafiliasi dengan NU, bergerak di bidang intelektual, sosial, dan keagamaan.',
    icon: BookOpen,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    members: 180,
    ranting: 8,
    ketua: 'Muhammad Rizki, S.H',
    phone: '+62 812-3456-0005',
    email: 'pmii.kedu@mwcnu.or.id',
    programs: ['MAPABA', 'Diklat Kader', 'Seminar Nasional', 'Community Service'],
  },
  {
    id: 'muslimat',
    name: 'Muslimat NU',
    fullName: 'Muslimat Nahdlatul Ulama',
    desc: 'Organisasi wanita NU yang bergerak di bidang keagamaan, sosial, pendidikan, dan pemberdayaan perempuan.',
    icon: Heart,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    members: 850,
    ranting: 14,
    ketua: 'Hj. Maimunah, S.Ag',
    phone: '+62 812-3456-0006',
    email: 'muslimat.kedu@mwcnu.or.id',
    programs: ['Pengajian Rutin', 'TPA/TPQ', 'Posyandu', 'UMKM Binaan'],
  },
  {
    id: 'fatayat',
    name: 'Fatayat NU',
    fullName: 'Fatayat Nahdlatul Ulama',
    desc: 'Organisasi wanita muda NU yang fokus pada pemberdayaan perempuan muda dan pengembangan potensi.',
    icon: Star,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    members: 380,
    ranting: 14,
    ketua: 'Hj. Nur Aini, S.Pd',
    phone: '+62 812-3456-0007',
    email: 'fatayat.kedu@mwcnu.or.id',
    programs: ['Pelatihan Kewirausahaan', 'Kajian Keputrian', 'Bakti Sosial', 'Health Education'],
  },
  {
    id: 'pagar-nusa',
    name: 'Pagar Nusa',
    fullName: 'Pagar Nusa Nahdlatul Ulama',
    desc: 'Pencak Silat Nahdlatul Ulama - organisasi pencak silat resmi NU untuk pembentukan karakter dan bela diri.',
    icon: Shield,
    color: 'from-red-600 to-red-800',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    members: 220,
    ranting: 10,
    ketua: 'H. Eko Prasetyo',
    phone: '+62 812-3456-0008',
    email: 'pagarnusa.kedu@mwcnu.or.id',
    programs: ['Latihan Pencak Silat', 'Kejuaraan Daerah', 'Diklatsar', 'Seni Budaya Islam'],
  },
  {
    id: 'lesbumi',
    name: 'Lesbumi',
    fullName: 'Lembaga Seni Budaya Muslimin Indonesia',
    desc: 'Lembaga seni budaya NU yang melestarikan tradisi seni Islam Nusantara dan pengembangan kreativitas.',
    icon: PenTool,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    members: 95,
    ranting: 6,
    ketua: 'H. Slamet Budiman',
    phone: '+62 812-3456-0009',
    email: 'lesbumi.kedu@mwcnu.or.id',
    programs: ['Hadrah & Marawis', 'Kaligrafi', 'Nasyid', 'Teater Islami'],
  },
  {
    id: 'isnu',
    name: 'ISNU',
    fullName: 'Ikatan Sarjana Nahdlatul Ulama',
    desc: 'Organisasi sarjana dan intelektual NU yang berkontribusi dalam pengembangan pemikiran dan kebijakan.',
    icon: Briefcase,
    color: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    members: 65,
    ranting: 8,
    ketua: 'Dr. H. Ahmad Fauzi, M.Ag',
    phone: '+62 812-3456-0010',
    email: 'isnu.kedu@mwcnu.or.id',
    programs: ['Seminar Keilmuan', 'Advokasi Kebijakan', 'Riset NU', 'Publikasi Ilmiah'],
  },
];

// ========================
// LEMBAGA DATA
// ========================
const lembagaData = [
  {
    id: 'lazisnu',
    name: 'LAZISNU',
    fullName: 'Lembaga Amil Zakat Infaq dan Shadaqah Nahdlatul Ulama',
    desc: 'Lembaga pengelola zakat, infaq, dan shadaqah yang transparan dan amanah.',
    icon: Heart,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    ketua: 'H. Ahmad Hidayat, S.E',
    dana: 'Rp 485 Juta',
    penerima: 1250,
    programs: ['Zakat Fitrah', 'Zakat Mal', 'Infaq Pembangunan', 'Shadaqah Jariyah'],
  },
  {
    id: 'ldnu',
    name: 'LDNU',
    fullName: 'Lembaga Dakwah Nahdlatul Ulama',
    desc: 'Lembaga yang mengkoordinasikan kegiatan dakwah dan pengembangan syiar Islam Ahlussunnah Wal Jamaah.',
    icon: Megaphone,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    ketua: 'Ustadz Nur Hidayat, S.Pd.I',
    dana: 'Rp 120 Juta',
    penerima: 0,
    programs: ['Tabligh Akbar', 'Dakwah Digital', 'Pelatihan Da\'i', 'Safari Dakwah'],
  },
  {
    id: 'lpnu',
    name: 'LPNU',
    fullName: 'Lembaga Pendidikan Nahdlatul Ulama',
    desc: 'Lembaga yang mengelola dan mengembangkan jaringan pendidikan formal dan non-formal NU.',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    ketua: 'Drs. H. Mahmud Yunus, M.Pd',
    dana: 'Rp 250 Juta',
    penerima: 500,
    programs: ['TPA/TPQ', 'Madrasah Diniyah', 'Beasiswa Santri', 'Pelatihan Guru'],
  },
  {
    id: 'lbhnu',
    name: 'LBHNU',
    fullName: 'Lembaga Bantuan Hukum Nahdlatul Ulama',
    desc: 'Lembaga yang memberikan bantuan dan pendampingan hukum bagi warga Nahdliyin.',
    icon: Scale,
    color: 'from-slate-500 to-gray-700',
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-700',
    ketua: 'H. Rizki Pratama, S.H, M.H',
    dana: 'Rp 75 Juta',
    penerima: 85,
    programs: ['Konsultasi Hukum', 'Pendampingan Perkara', 'Sosialisasi Hukum', 'Mediasi'],
  },
  {
    id: 'lpmnu',
    name: 'LBMNU',
    fullName: 'Lembaga Bahtsul Masa\'il Nahdlatul Ulama',
    desc: 'Lembaga yang membahas dan menyelesaikan permasalahan hukum Islam (fiqih) kontemporer.',
    icon: BookOpen,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    ketua: 'KH. Ahmad Dahlan',
    dana: 'Rp 45 Juta',
    penerima: 0,
    programs: ['Bahtsul Masa\'il', 'Diskusi Fiqih', 'Fatwa Lokal', 'Kajian Ushul Fiqih'],
  },
  {
    id: 'rminu',
    name: 'RMINU',
    fullName: 'Rabithah Ma\'ahid Islamiyah Nahdlatul Ulama',
    desc: 'Lembaga yang membina dan mengkoordinasikan pesantren dan lembaga pendidikan Islam NU.',
    icon: Building,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700',
    ketua: 'KH. Muhajir Al-Faruq',
    dana: 'Rp 180 Juta',
    penerima: 15,
    programs: ['Pembinaan Pesantren', 'Standarisasi Kitab', 'Silaturahmi Kiai', 'Beasiswa Santri'],
  },
];

// ========================
// MAIN COMPONENT
// ========================
export default function KelembagaanPage() {
  const [tab, setTab] = useState<TabType>('struktur');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [notif, setNotif] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const filteredBanom = banomData.filter(
    (b) => !searchQuery || b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLembaga = lembagaData.filter(
    (l) => !searchQuery || l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedBanom = banomData.find((b) => b.id === selectedOrg);
  const selectedLembaga = lembagaData.find((l) => l.id === selectedOrg);

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
        <h1 className="text-2xl font-bold text-emerald-900">Kelembagaan & Banom</h1>
        <p className="text-sm text-emerald-500 mt-1">Struktur organisasi, badan otonom, dan lembaga MWC NU Kecamatan Kedu</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Banom Aktif', value: banomData.length.toString(), icon: Award, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Lembaga', value: lembagaData.length.toString(), icon: Landmark, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Total Anggota', value: `${(banomData.reduce((s, b) => s + b.members, 0)).toLocaleString()}`, icon: Users, bg: 'bg-amber-50', color: 'text-amber-600' },
          { label: 'Ranting Terbina', value: '14', icon: Globe, bg: 'bg-rose-50', color: 'text-rose-600' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-emerald-100/60 shadow-sm">
              <div className={`${s.bg} p-2 rounded-xl w-fit mb-2`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-xl font-bold text-emerald-900">{s.value}</p>
              <p className="text-xs text-emerald-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl border border-emerald-100/60 p-1 gap-1">
        {[
          { id: 'struktur' as TabType, label: 'Struktur Organisasi', icon: Users },
          { id: 'banom' as TabType, label: `Banom (${banomData.length})`, icon: Award },
          { id: 'lembaga' as TabType, label: `Lembaga (${lembagaData.length})`, icon: Landmark },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setSelectedOrg(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                tab === t.id ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-500 hover:bg-emerald-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      {tab !== 'struktur' && (
        <div className="flex items-center bg-white rounded-xl border border-emerald-100/60 px-4 py-3 gap-2">
          <Search className="w-4 h-4 text-emerald-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Cari ${tab === 'banom' ? 'badan otonom' : 'lembaga'}...`}
            className="bg-transparent text-sm outline-none flex-1 text-emerald-800 placeholder:text-emerald-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-emerald-400 hover:text-emerald-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* ======== STRUKTUR ORGANISASI ======== */}
      {tab === 'struktur' && (
        <div className="space-y-6">
          {/* Leadership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rais Syuriyah */}
            <div className="bg-gradient-to-br from-emerald-700 to-teal-800 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-amber-300" />
                <span className="text-emerald-200 text-xs uppercase tracking-wide font-semibold">Rais Syuriyah MWC NU Kedu</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {strukturData.rais.name.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{strukturData.rais.name}</h3>
                  <p className="text-emerald-200 text-sm">{strukturData.rais.position}</p>
                  <p className="text-emerald-300 text-xs mt-1">Periode {strukturData.rais.since} - sekarang</p>
                </div>
              </div>
            </div>

            {/* Ketua Tanfidziyah */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-300" />
                <span className="text-blue-200 text-xs uppercase tracking-wide font-semibold">Ketua Tanfidziyah MWC NU Kedu</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {strukturData.ketua.name.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{strukturData.ketua.name}</h3>
                  <p className="text-blue-200 text-sm">{strukturData.ketua.position}</p>
                  <p className="text-blue-300 text-xs mt-1">Periode {strukturData.ketua.since} - sekarang</p>
                </div>
              </div>
            </div>
          </div>

          {/* Syuriyah Board */}
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
            <h3 className="font-bold text-emerald-900 text-lg mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Syuriyah MWC NU Kedu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {strukturData.syuriyah.map((person, i) => (
                <button
                  key={i}
                  onClick={() => showToast(`${person.name} — ${person.position}`)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-left active:scale-[0.98]"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                    {person.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-emerald-800 truncate">{person.name}</p>
                    <p className="text-xs text-emerald-500 truncate">{person.position}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tanfidziyah Board */}
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
            <h3 className="font-bold text-emerald-900 text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Tanfidziyah (Pengurus Harian)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Sekretaris & Bendahara */}
              {[strukturData.sekretaris, strukturData.bendahara].map((person, i) => (
                <button
                  key={i}
                  onClick={() => showToast(`${person.name} — ${person.position}`)}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all text-left border border-emerald-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-emerald-700 font-bold shadow-sm">
                    {person.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-emerald-800 truncate">{person.name}</p>
                    <p className="text-xs text-emerald-500">{person.position}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Wakil Ketua */}
            <h4 className="font-semibold text-emerald-800 mt-6 mb-3">Wakil Ketua</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {strukturData.wakil.map((person, i) => (
                <button
                  key={i}
                  onClick={() => showToast(`${person.name} — ${person.position}`)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-left active:scale-[0.98]"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                    {person.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-emerald-800 truncate">{person.name}</p>
                    <p className="text-xs text-emerald-500 truncate">{person.position}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Aam */}
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
            <h3 className="font-bold text-emerald-900 text-lg mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              Anggota Aam (Perwakilan Ranting)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {strukturData.aam.map((person, i) => (
                <button
                  key={i}
                  onClick={() => showToast(`${person.name} — ${person.position}`)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/50 hover:bg-amber-50 transition-colors text-left border border-amber-100 active:scale-[0.98]"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                    {person.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-emerald-800 truncate">{person.name}</p>
                    <p className="text-xs text-emerald-500 truncate">{person.position}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======== BANOM ======== */}
      {tab === 'banom' && !selectedOrg && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBanom.map((org) => {
            const Icon = org.icon;
            return (
              <button
                key={org.id}
                onClick={() => setSelectedOrg(org.id)}
                className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className={`${org.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${org.textColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-emerald-900">{org.name}</h3>
                      <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:text-emerald-500 transition-colors ml-auto" />
                    </div>
                    <p className="text-xs text-emerald-400 mb-2">{org.fullName}</p>
                    <p className="text-sm text-emerald-600 line-clamp-2 mb-3">{org.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-emerald-500">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{org.members} anggota</span>
                      <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{org.ranting} ranting</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Banom Detail */}
      {tab === 'banom' && selectedBanom && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedOrg(null)}
            className="text-sm text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1"
          >
            ← Kembali ke Daftar Banom
          </button>

          {/* Header Card */}
          <div className={`bg-gradient-to-r ${selectedBanom.color} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <selectedBanom.icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedBanom.fullName}</h2>
                <p className="opacity-80 text-sm mt-1">({selectedBanom.name}) — MWC NU Kecamatan Kedu</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
              <h3 className="font-bold text-emerald-900 mb-3">Informasi Organisasi</h3>
              <p className="text-sm text-emerald-600 mb-4">{selectedBanom.desc}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase">Ketua</p>
                    <p className="text-sm font-medium text-emerald-800">{selectedBanom.ketua}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase">Total Anggota</p>
                    <p className="text-sm font-medium text-emerald-800">{selectedBanom.members} anggota aktif</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase">Jangkauan</p>
                    <p className="text-sm font-medium text-emerald-800">{selectedBanom.ranting} ranting se-kecamatan</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase">Kontak</p>
                    <p className="text-sm font-medium text-emerald-800">{selectedBanom.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase">Email</p>
                    <p className="text-sm font-medium text-emerald-800">{selectedBanom.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
              <h3 className="font-bold text-emerald-900 mb-3">Program Unggulan</h3>
              <div className="space-y-3">
                {selectedBanom.programs.map((prog, i) => (
                  <button
                    key={i}
                    onClick={() => showToast(`Program: ${prog}`)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-left active:scale-[0.98]"
                  >
                    <div className={`w-8 h-8 rounded-lg ${selectedBanom.bgColor} flex items-center justify-center`}>
                      <Star className={`w-4 h-4 ${selectedBanom.textColor}`} />
                    </div>
                    <span className="text-sm font-medium text-emerald-800">{prog}</span>
                  </button>
                ))}
              </div>

              {/* Anggota per Ranting */}
              <h3 className="font-bold text-emerald-900 mt-6 mb-3">Distribusi per Ranting</h3>
              <div className="w-full bg-emerald-100 rounded-full h-3 mb-2">
                <div className={`bg-gradient-to-r ${selectedBanom.color} h-3 rounded-full`} style={{ width: `${(selectedBanom.ranting / 14) * 100}%` }} />
              </div>
              <p className="text-xs text-emerald-500">{selectedBanom.ranting} dari 14 ranting memiliki kepengurusan {selectedBanom.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* ======== LEMBAGA ======== */}
      {tab === 'lembaga' && !selectedOrg && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLembaga.map((org) => {
            const Icon = org.icon;
            return (
              <button
                key={org.id}
                onClick={() => setSelectedOrg(org.id)}
                className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className={`${org.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${org.textColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-emerald-900">{org.name}</h3>
                      <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:text-emerald-500 transition-colors ml-auto" />
                    </div>
                    <p className="text-xs text-emerald-400 mb-2">{org.fullName}</p>
                    <p className="text-sm text-emerald-600 line-clamp-2 mb-3">{org.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-emerald-500">
                      <span className="font-medium text-emerald-700">{org.dana}</span>
                      {org.penerima > 0 && <span>{org.penerima} penerima manfaat</span>}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Lembaga Detail */}
      {tab === 'lembaga' && selectedLembaga && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedOrg(null)}
            className="text-sm text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1"
          >
            ← Kembali ke Daftar Lembaga
          </button>

          <div className={`bg-gradient-to-r ${selectedLembaga.color} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <selectedLembaga.icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedLembaga.fullName}</h2>
                <p className="opacity-80 text-sm mt-1">({selectedLembaga.name}) — MWC NU Kecamatan Kedu</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
              <h3 className="font-bold text-emerald-900 mb-3">Informasi</h3>
              <p className="text-sm text-emerald-600 mb-4">{selectedLembaga.desc}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase">Ketua</p>
                    <p className="text-sm font-medium text-emerald-800">{selectedLembaga.ketua}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50">
                  <Heart className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase">Total Dana Kelola</p>
                    <p className="text-sm font-bold text-emerald-800">{selectedLembaga.dana}</p>
                  </div>
                </div>
                {selectedLembaga.penerima > 0 && (
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <div>
                      <p className="text-[10px] text-emerald-400 uppercase">Penerima Manfaat</p>
                      <p className="text-sm font-medium text-emerald-800">{selectedLembaga.penerima.toLocaleString()} orang</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
              <h3 className="font-bold text-emerald-900 mb-3">Program Utama</h3>
              <div className="space-y-3">
                {selectedLembaga.programs.map((prog, i) => (
                  <button
                    key={i}
                    onClick={() => showToast(`Program: ${prog}`)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-left active:scale-[0.98]"
                  >
                    <div className={`w-8 h-8 rounded-lg ${selectedLembaga.bgColor} flex items-center justify-center`}>
                      <Star className={`w-4 h-4 ${selectedLembaga.textColor}`} />
                    </div>
                    <span className="text-sm font-medium text-emerald-800">{prog}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
