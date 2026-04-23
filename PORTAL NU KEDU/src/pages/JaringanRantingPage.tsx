import { useState } from 'react';
import {
  MapPin,
  Users,
  Phone,
  Clock,
  Calendar,
  ChevronRight,
  Search,
  X,
  Award,
  Heart,
  BookOpen,
  Globe,
  CheckCircle,
  UserCheck,
  Filter,
  Crown,
} from 'lucide-react';

type FilterType = 'semua' | 'aktif' | 'sangat-aktif' | 'cukup-aktif';

const rantingData = [
  {
    id: 'kedu',
    name: 'NU Ranting Kedu',
    village: 'Desa Kedu',
    status: 'Pusat Kecamatan',
    level: 'sangat-aktif',
    ketua: 'H. Ahmad Fauzi, S.Ag',
    sekretaris: 'Muhammad Sholeh, S.Pd',
    bendahara: 'Hj. Rohmah Wati',
    phone: '+62 812-3456-1001',
    anggota: 125,
    pengurus: 15,
    banom: 8,
    lembaga: 4,
    lastMeeting: '12 Jan 2026',
    nextMeeting: '19 Jan 2026',
    programs: ['Pengajian Ahad Wage', 'TPA Nurul Huda', 'Bakti Sosial Rutin', 'Pelatihan Digital'],
    color: 'from-emerald-600 to-teal-700',
    bgColor: 'bg-emerald-50',
    badge: '⭐ Ranting Induk',
  },
  {
    id: 'candimulyo',
    name: 'NU Ranting Candimulyo',
    village: 'Desa Candimulyo',
    status: 'Ranting',
    level: 'sangat-aktif',
    ketua: 'KH. Nur Hadi',
    sekretaris: 'Ahmad Rifai, S.Pd.I',
    bendahara: 'Siti Aminah',
    phone: '+62 812-3456-1002',
    anggota: 95,
    pengurus: 12,
    banom: 7,
    lembaga: 3,
    lastMeeting: '10 Jan 2026',
    nextMeeting: '17 Jan 2026',
    programs: ['Pengajian Rutin Selasa Pon', 'TPQ Al-Hikmah', 'Muslimat Pengajian', 'Banser Latihan'],
    color: 'from-blue-600 to-indigo-700',
    bgColor: 'bg-blue-50',
    badge: '🏆 Sangat Aktif',
  },
  {
    id: 'salamsari',
    name: 'NU Ranting Salamsari',
    village: 'Desa Salamsari',
    status: 'Ranting',
    level: 'aktif',
    ketua: 'H. Budi Santoso',
    sekretaris: 'Imam Sutrisno, S.Ag',
    bendahara: 'Hj. Fatimah',
    phone: '+62 812-3456-1003',
    anggota: 68,
    pengurus: 10,
    banom: 6,
    lembaga: 3,
    lastMeeting: '8 Jan 2026',
    nextMeeting: '15 Jan 2026',
    programs: ['Pengajian Kamis Kliwon', 'TPA Al-Barokah', 'Fatayat Pengajian', 'Posyandu NU'],
    color: 'from-amber-600 to-orange-700',
    bgColor: 'bg-amber-50',
    badge: '✅ Aktif',
  },
  {
    id: 'danurejo',
    name: 'NU Ranting Danurejo',
    village: 'Desa Danurejo',
    status: 'Ranting',
    level: 'sangat-aktif',
    ketua: 'H. Endro Susanto',
    sekretaris: 'Abdul Rozak, S.Pd',
    bendahara: 'Hj. Nur Aini',
    phone: '+62 812-3456-1004',
    anggota: 88,
    pengurus: 13,
    banom: 7,
    lembaga: 4,
    lastMeeting: '11 Jan 2026',
    nextMeeting: '18 Jan 2026',
    programs: ['Pengajian Jumat Legi', 'TPQ Nurul Iman', 'IPNU/IPPNU Aktif', 'Pagar Nusa Latihan'],
    color: 'from-purple-600 to-violet-700',
    bgColor: 'bg-purple-50',
    badge: '🏆 Sangat Aktif',
  },
  {
    id: 'mojotengah',
    name: 'NU Ranting Mojotengah',
    village: 'Desa Mojotengah',
    status: 'Ranting',
    level: 'aktif',
    ketua: 'H. Slamet Riyadi',
    sekretaris: 'Zainal Abidin, S.H',
    bendahara: 'Hj. Maimunah',
    phone: '+62 812-3456-1005',
    anggota: 72,
    pengurus: 11,
    banom: 6,
    lembaga: 3,
    lastMeeting: '9 Jan 2026',
    nextMeeting: '16 Jan 2026',
    programs: ['Pengajian Ahad Pahing', 'TPA Al-Ikhlas', 'Muslimat Rutin', 'Banser Siaga'],
    color: 'from-rose-600 to-red-700',
    bgColor: 'bg-rose-50',
    badge: '✅ Aktif',
  },
  {
    id: 'karangtejo',
    name: 'NU Ranting Karangtejo',
    village: 'Desa Karangtejo',
    status: 'Ranting',
    level: 'cukup-aktif',
    ketua: 'H. Khoirul Anam',
    sekretaris: 'M. Faqih, S.Pd.I',
    bendahara: 'Hj. Khotimah',
    phone: '+62 812-3456-1006',
    anggota: 52,
    pengurus: 8,
    banom: 5,
    lembaga: 2,
    lastMeeting: '6 Jan 2026',
    nextMeeting: '20 Jan 2026',
    programs: ['Pengajian Bulanan', 'TPA Nurul Ulum', 'Bakti Sosial', 'Dakwah Keliling'],
    color: 'from-teal-600 to-cyan-700',
    bgColor: 'bg-teal-50',
    badge: '📝 Cukup Aktif',
  },
  {
    id: 'mergowati',
    name: 'NU Ranting Mergowati',
    village: 'Desa Mergowati',
    status: 'Ranting',
    level: 'aktif',
    ketua: 'H. Wahyu Prasetyo',
    sekretaris: 'Ahmad Hidayat, S.Pd',
    bendahara: 'Siti Khadijah',
    phone: '+62 812-3456-1007',
    anggota: 64,
    pengurus: 10,
    banom: 6,
    lembaga: 3,
    lastMeeting: '7 Jan 2026',
    nextMeeting: '14 Jan 2026',
    programs: ['Pengajian Sabtu Pon', 'TPQ Al-Muttaqin', 'Fatayat Pengajian', 'IPNU KOPRI'],
    color: 'from-green-600 to-emerald-700',
    bgColor: 'bg-green-50',
    badge: '✅ Aktif',
  },
  {
    id: 'kutoanyar',
    name: 'NU Ranting Kutoanyar',
    village: 'Desa Kutoanyar',
    status: 'Ranting',
    level: 'aktif',
    ketua: 'H. Nur Kholis',
    sekretaris: 'Rofi\'uddin, S.Ag',
    bendahara: 'Hj. Umi Kalsum',
    phone: '+62 812-3456-1008',
    anggota: 58,
    pengurus: 9,
    banom: 5,
    lembaga: 2,
    lastMeeting: '5 Jan 2026',
    nextMeeting: '19 Jan 2026',
    programs: ['Pengajian Ahad Wage', 'TPA Baitul Hikmah', 'Muslimat Rutin', 'Banser Latihan'],
    color: 'from-indigo-600 to-blue-700',
    bgColor: 'bg-indigo-50',
    badge: '✅ Aktif',
  },
  {
    id: 'bandunggede',
    name: 'NU Ranting Bandunggede',
    village: 'Desa Bandunggede',
    status: 'Ranting',
    level: 'cukup-aktif',
    ketua: 'H. Mahmud Yunus',
    sekretaris: 'Saiful Anwar, S.Pd',
    bendahara: 'Hj. Nurjanah',
    phone: '+62 812-3456-1009',
    anggota: 45,
    pengurus: 7,
    banom: 4,
    lembaga: 2,
    lastMeeting: '4 Jan 2026',
    nextMeeting: '18 Jan 2026',
    programs: ['Pengajian Bulanan', 'TPA Nurul Huda', 'Bakti Sosial', 'Pengajian Ibu-ibu'],
    color: 'from-orange-600 to-amber-700',
    bgColor: 'bg-orange-50',
    badge: '📝 Cukup Aktif',
  },
  {
    id: 'gondangwayang',
    name: 'NU Ranting Gondangwayang',
    village: 'Desa Gondangwayang',
    status: 'Ranting',
    level: 'aktif',
    ketua: 'H. Fathur Rohman',
    sekretaris: 'Mukhtar, S.Pd.I',
    bendahara: 'Hj. Siti Rochmah',
    phone: '+62 812-3456-1010',
    anggota: 56,
    pengurus: 9,
    banom: 5,
    lembaga: 2,
    lastMeeting: '8 Jan 2026',
    nextMeeting: '22 Jan 2026',
    programs: ['Pengajian Kamis Wage', 'TPQ Al-Hidayah', 'Fatayat Rutin', 'Pagar Nusa'],
    color: 'from-cyan-600 to-teal-700',
    bgColor: 'bg-cyan-50',
    badge: '✅ Aktif',
  },
  {
    id: 'kalisari',
    name: 'NU Ranting Kalisari',
    village: 'Desa Kalisari',
    status: 'Ranting',
    level: 'aktif',
    ketua: 'H. Ali Mustofa',
    sekretaris: 'Hamzah, S.Ag',
    bendahara: 'Hj. Nurhayati',
    phone: '+62 812-3456-1011',
    anggota: 62,
    pengurus: 10,
    banom: 6,
    lembaga: 3,
    lastMeeting: '10 Jan 2026',
    nextMeeting: '17 Jan 2026',
    programs: ['Pengajian Selasa Kliwon', 'TPA Al-Ishlah', 'Muslimat Pengajian', 'LAZISNU Ranting'],
    color: 'from-lime-600 to-green-700',
    bgColor: 'bg-lime-50',
    badge: '✅ Aktif',
  },
  {
    id: 'kundisari',
    name: 'NU Ranting Kundisari',
    village: 'Desa Kundisari',
    status: 'Ranting',
    level: 'cukup-aktif',
    ketua: 'H. Mahfudz',
    sekretaris: 'Zaenal Arifin, S.Pd',
    bendahara: 'Hj. Rohani',
    phone: '+62 812-3456-1012',
    anggota: 48,
    pengurus: 8,
    banom: 4,
    lembaga: 2,
    lastMeeting: '3 Jan 2026',
    nextMeeting: '17 Jan 2026',
    programs: ['Pengajian Bulanan', 'TPA Nurul Jannah', 'Bakti Sosial', 'Dakwah Digital'],
    color: 'from-fuchsia-600 to-pink-700',
    bgColor: 'bg-fuchsia-50',
    badge: '📝 Cukup Aktif',
  },
  {
    id: 'ngadimulyo',
    name: 'NU Ranting Ngadimulyo',
    village: 'Desa Ngadimulyo',
    status: 'Ranting',
    level: 'aktif',
    ketua: 'H. Solikhin',
    sekretaris: 'Fathul Hadi, S.Pd.I',
    bendahara: 'Hj. Romlah',
    phone: '+62 812-3456-1013',
    anggota: 55,
    pengurus: 9,
    banom: 5,
    lembaga: 2,
    lastMeeting: '6 Jan 2026',
    nextMeeting: '20 Jan 2026',
    programs: ['Pengajian Jumat Pahing', 'TPQ Darul Ulum', 'Fatayat Pengajian', 'Banser Siaga'],
    color: 'from-sky-600 to-blue-700',
    bgColor: 'bg-sky-50',
    badge: '✅ Aktif',
  },
  {
    id: 'tegalsari',
    name: 'NU Ranting Tegalsari',
    village: 'Desa Tegalsari',
    status: 'Ranting',
    level: 'aktif',
    ketua: 'H. Choirul Anwar',
    sekretaris: 'M. Asyrofi, S.Ag',
    bendahara: 'Hj. Masruroh',
    phone: '+62 812-3456-1014',
    anggota: 60,
    pengurus: 10,
    banom: 6,
    lembaga: 3,
    lastMeeting: '9 Jan 2026',
    nextMeeting: '16 Jan 2026',
    programs: ['Pengajian Sabtu Wage', 'TPA Al-Falah', 'Muslimat Rutin', 'IPNU/IPPNU Aktif'],
    color: 'from-violet-600 to-purple-700',
    bgColor: 'bg-violet-50',
    badge: '✅ Aktif',
  },
];

const levelColors: Record<string, { bg: string; text: string; label: string }> = {
  'sangat-aktif': { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Sangat Aktif' },
  'aktif': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Aktif' },
  'cukup-aktif': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Cukup Aktif' },
};

export default function JaringanRantingPage() {
  const [filter, setFilter] = useState<FilterType>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRanting, setSelectedRanting] = useState<string | null>(null);
  const [notif, setNotif] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const filtered = rantingData.filter((r) => {
    const filterMatch = filter === 'semua' || r.level === filter;
    const searchMatch = !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.village.toLowerCase().includes(searchQuery.toLowerCase());
    return filterMatch && searchMatch;
  });

  const totalAnggota = rantingData.reduce((s, r) => s + r.anggota, 0);
  const totalPengurus = rantingData.reduce((s, r) => s + r.pengurus, 0);
  const sangatAktif = rantingData.filter((r) => r.level === 'sangat-aktif').length;
  const aktif = rantingData.filter((r) => r.level === 'aktif').length;

  const selected = rantingData.find((r) => r.id === selectedRanting);

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
        <h1 className="text-2xl font-bold text-emerald-900">Jaringan Ranting NU</h1>
        <p className="text-sm text-emerald-500 mt-1">14 Ranting Nahdlatul Ulama se-Kecamatan Kedu, Kabupaten Temanggung</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Ranting', value: '14', icon: Globe, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Total Anggota', value: totalAnggota.toString(), icon: Users, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Total Pengurus', value: totalPengurus.toString(), icon: UserCheck, bg: 'bg-amber-50', color: 'text-amber-600' },
          { label: 'Sangat Aktif / Aktif', value: `${sangatAktif} / ${aktif}`, icon: Award, bg: 'bg-rose-50', color: 'text-rose-600' },
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

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-emerald-100/60 px-4 py-2.5 flex-1">
          <Search className="w-4 h-4 text-emerald-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari ranting atau desa..."
            className="bg-transparent text-sm outline-none flex-1 text-emerald-800 placeholder:text-emerald-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-emerald-400 hover:text-emerald-600"><X className="w-4 h-4" /></button>
          )}
        </div>
        <div className="flex items-center gap-2 bg-white rounded-xl border border-emerald-100/60 p-2">
          <Filter className="w-4 h-4 text-emerald-400 ml-2" />
          {(['semua', 'sangat-aktif', 'aktif', 'cukup-aktif'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 capitalize ${
                filter === f ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
              }`}
            >
              {f === 'semua' ? 'Semua' : f.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-white rounded-xl border border-emerald-100/60 p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-emerald-500 hover:bg-emerald-50'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-emerald-500 hover:bg-emerald-50'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="1" y="1" width="14" height="3" rx="1"/><rect x="1" y="6" width="14" height="3" rx="1"/><rect x="1" y="11" width="14" height="3" rx="1"/></svg>
          </button>
        </div>
      </div>

      {/* ======== DETAIL VIEW ======== */}
      {selected && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedRanting(null)}
            className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
          >
            ← Kembali ke Semua Ranting
          </button>

          {/* Header */}
          <div className={`bg-gradient-to-r ${selected.color} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="text-sm opacity-80">{selected.status}</span>
            </div>
            <h2 className="text-2xl font-bold">{selected.name}</h2>
            <p className="opacity-80 mt-1">{selected.village}, Kecamatan Kedu, Temanggung</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                <Users className="w-3.5 h-3.5" /> {selected.anggota} Anggota
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                <UserCheck className="w-3.5 h-3.5" /> {selected.pengurus} Pengurus
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-sm backdrop-blur-sm">
                <Award className="w-3.5 h-3.5" /> {selected.banom} Banom
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pengurus */}
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-4">Kepengurusan</h3>
              <div className="space-y-3">
                {[
                  { role: 'Ketua Ranting', name: selected.ketua, icon: Crown },
                  { role: 'Sekretaris', name: selected.sekretaris, icon: BookOpen },
                  { role: 'Bendahara', name: selected.bendahara, icon: Heart },
                ].map((p, i) => {
                  return (
                    <button key={i} onClick={() => showToast(`${p.role}: ${p.name}`)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-left">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                        {p.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-400 uppercase">{p.role}</p>
                        <p className="text-sm font-semibold text-emerald-800">{p.name}</p>
                      </div>
                    </button>
                  );
                })}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase">Kontak</p>
                    <p className="text-sm font-medium text-emerald-800">{selected.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info & Programs */}
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-4">Informasi</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-emerald-50/60 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-emerald-900">{selected.banom}</p>
                  <p className="text-xs text-emerald-500">Banom Aktif</p>
                </div>
                <div className="bg-emerald-50/60 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-emerald-900">{selected.lembaga}</p>
                  <p className="text-xs text-emerald-500">Lembaga</p>
                </div>
                <div className="bg-emerald-50/60 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-emerald-900">{selected.pengurus}</p>
                  <p className="text-xs text-emerald-500">Pengurus</p>
                </div>
                <div className="bg-emerald-50/60 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-emerald-900">{selected.anggota}</p>
                  <p className="text-xs text-emerald-500">Anggota</p>
                </div>
              </div>

              <h4 className="font-semibold text-emerald-800 mb-3">Program Unggulan</h4>
              <div className="space-y-2">
                {selected.programs.map((prog, i) => (
                  <button key={i} onClick={() => showToast(`Program: ${prog}`)} className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-left text-sm text-emerald-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    {prog}
                  </button>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 text-xs text-amber-700">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-medium">Rapat Terakhir:</span> {selected.lastMeeting}
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-700 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-medium">Rapat Berikutnya:</span> {selected.nextMeeting}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======== GRID VIEW ======== */}
      {!selected && viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRanting(r.id)}
              className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`bg-gradient-to-r ${r.color} p-2 rounded-xl`}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${levelColors[r.level].bg} ${levelColors[r.level].text}`}>
                  {r.badge}
                </span>
              </div>
              <h3 className="font-bold text-emerald-900 mb-0.5 group-hover:text-emerald-700">{r.name}</h3>
              <p className="text-xs text-emerald-500 mb-3">{r.village} — {r.status}</p>
              <div className="flex items-center gap-3 text-xs text-emerald-400 mb-3">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{r.anggota}</span>
                <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" />{r.pengurus}</span>
                <span className="flex items-center gap-1"><Award className="w-3 h-3" />{r.banom}</span>
              </div>
              <p className="text-xs text-emerald-500 mb-2">Ketua: <span className="font-medium text-emerald-700">{r.ketua}</span></p>
              <div className="flex items-center justify-between pt-3 border-t border-emerald-50">
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Rapat: {r.nextMeeting}
                </span>
                <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:text-emerald-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ======== LIST VIEW ======== */}
      {!selected && viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-50/80 border-b border-emerald-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Ranting</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Desa</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Ketua</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Anggota</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Banom</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-emerald-50 hover:bg-emerald-50/30 transition-colors cursor-pointer" onClick={() => setSelectedRanting(r.id)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${r.color} flex items-center justify-center`}>
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-emerald-800">{r.name.replace('NU Ranting ', '')}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-emerald-600">{r.village}</td>
                    <td className="px-4 py-3 text-sm text-emerald-600">{r.ketua}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-emerald-700">{r.anggota}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-emerald-700">{r.banom}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${levelColors[r.level].bg} ${levelColors[r.level].text}`}>
                        {levelColors[r.level].label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ChevronRight className="w-4 h-4 text-emerald-300" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && !selected && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-12 text-center">
          <MapPin className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
          <p className="text-emerald-500 font-medium">Ranting tidak ditemukan</p>
          <p className="text-sm text-emerald-400 mt-1">Coba kata kunci atau filter lain</p>
        </div>
      )}
    </div>
  );
}
