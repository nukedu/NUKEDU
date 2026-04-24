import { useState } from 'react';
import {
  UserPlus,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  X,
  FileText,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Eye,
  Download,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

type TabType = 'formulir' | 'riwayat' | 'verifikasi';

const pendingVerifications = [
  { id: 'REG-2026-089', name: 'Abdul Rahman', village: 'Desa Kedu', date: '15 Jan 2026', phone: '+62 812-1111-0001', status: 'pending', sponsor: 'Ahmad Hidayat' },
  { id: 'REG-2026-088', name: 'Siti Nurhaliza', village: 'Desa Candimulyo', date: '14 Jan 2026', phone: '+62 812-1111-0002', status: 'pending', sponsor: 'Ustadz Nur H.' },
  { id: 'REG-2026-087', name: 'Muhammad Farid', village: 'Desa Danurejo', date: '14 Jan 2026', phone: '+62 812-1111-0003', status: 'pending', sponsor: 'Siti Aminah' },
  { id: 'REG-2026-086', name: 'Fatimah Zahra', village: 'Desa Mergowati', date: '13 Jan 2026', phone: '+62 812-1111-0004', status: 'reviewing', sponsor: 'Muhammad Rizki' },
  { id: 'REG-2026-085', name: 'Hasan Basri', village: 'Desa Tegalsari', date: '12 Jan 2026', phone: '+62 812-1111-0005', status: 'reviewing', sponsor: 'H. Slamet' },
];

const registrationHistory = [
  { id: 'REG-2026-084', name: 'Ahmad Fadillah', village: 'Desa Kedu', date: '10 Jan 2026', status: 'approved', verifiedBy: 'H. Nur Hidayat' },
  { id: 'REG-2026-083', name: 'Rina Wati', village: 'Desa Salamsari', date: '9 Jan 2026', status: 'approved', verifiedBy: 'H. Budi Santoso' },
  { id: 'REG-2026-082', name: 'Zainal Arifin', village: 'Desa Mojotengah', date: '8 Jan 2026', status: 'rejected', verifiedBy: 'H. Slamet Riyadi' },
  { id: 'REG-2026-081', name: 'Nur Kholis', village: 'Desa Kutoanyar', date: '7 Jan 2026', status: 'approved', verifiedBy: 'H. Nur Kholis' },
  { id: 'REG-2026-080', name: 'Aminah Husna', village: 'Desa Kalisari', date: '6 Jan 2026', status: 'approved', verifiedBy: 'H. Ali Mustofa' },
  { id: 'REG-2026-079', name: 'Rohman Hakim', village: 'Desa Gondangwayang', date: '5 Jan 2026', status: 'approved', verifiedBy: 'H. Fathur Rohman' },
];

const villages = [
  'Desa Kedu', 'Desa Candimulyo', 'Desa Salamsari', 'Desa Danurejo',
  'Desa Mojotengah', 'Desa Karangtejo', 'Desa Mergowati', 'Desa Kutoanyar',
  'Desa Bandunggede', 'Desa Gondangwayang', 'Desa Kalisari', 'Desa Kundisari',
  'Desa Ngadimulyo', 'Desa Tegalsari',
];

const statusConfig: Record<string, { bg: string; text: string; label: string; icon: any }> = {
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Menunggu', icon: Clock },
  reviewing: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Ditinjau', icon: AlertCircle },
  approved: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Disetujui', icon: CheckCircle },
  rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Ditolak', icon: XCircle },
};

export default function PendaftaranPage() {
  const [tab, setTab] = useState<TabType>('formulir');
  const [notif, setNotif] = useState<string | null>(null);
  const [verifications, setVerifications] = useState(pendingVerifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetail, setShowDetail] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    nama: '', tempatLahir: '', tanggalLahir: '', gender: 'laki-laki',
    phone: '', email: '', alamat: '', village: 'Desa Kedu',
    pekerjaan: '', pendidikan: 'SMA', sponsor: '', catatan: '',
  });
  const [formStep, setFormStep] = useState(1);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const handleSubmitForm = () => {
    if (form.nama && form.phone && form.village) {
      showToast(`Pendaftaran ${form.nama} berhasil dikirim untuk verifikasi!`);
      setForm({ nama: '', tempatLahir: '', tanggalLahir: '', gender: 'laki-laki', phone: '', email: '', alamat: '', village: 'Desa Kedu', pekerjaan: '', pendidikan: 'SMA', sponsor: '', catatan: '' });
      setFormStep(1);
      setTab('riwayat');
    }
  };

  const handleVerify = (id: number, action: 'approved' | 'rejected') => {
    setVerifications(verifications.filter((_, i) => i !== id));
    showToast(action === 'approved' ? 'Anggota berhasil disetujui!' : 'Pendaftaran ditolak');
  };

  const filteredHistory = registrationHistory.filter(
    (r) => !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">✅ {notif}</div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Pendaftaran Anggota</h1>
          <p className="text-sm text-emerald-500 mt-1">Formulir pendaftaran & verifikasi anggota baru MWC NU Kedu</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Menunggu Verifikasi', value: verifications.length.toString(), icon: Clock, bg: 'bg-amber-50', color: 'text-amber-600' },
          { label: 'Disetujui Bulan Ini', value: '24', icon: CheckCircle, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Total Anggota', value: '500+', icon: Users, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Ditolak Bulan Ini', value: '2', icon: XCircle, bg: 'bg-red-50', color: 'text-red-600' },
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
          { id: 'formulir' as TabType, label: 'Formulir Pendaftaran', icon: UserPlus },
          { id: 'verifikasi' as TabType, label: `Verifikasi (${verifications.length})`, icon: Shield },
          { id: 'riwayat' as TabType, label: 'Riwayat Pendaftaran', icon: FileText },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                tab === t.id ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-500 hover:bg-emerald-50'
              }`}>
              <Icon className="w-4 h-4" /><span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========== FORMULIR ========== */}
      {tab === 'formulir' && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <button
                  onClick={() => setFormStep(step)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    formStep === step ? 'bg-emerald-600 text-white shadow-lg' :
                    formStep > step ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
                  }`}>
                  {formStep > step ? '✓' : step}
                </button>
                {step < 3 && <div className={`w-16 h-1 rounded-full ${formStep > step ? 'bg-emerald-400' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-emerald-700">
              {formStep === 1 ? 'Data Pribadi' : formStep === 2 ? 'Data Alamat & Organisasi' : 'Konfirmasi & Submit'}
            </p>
          </div>

          {/* Step 1 */}
          {formStep === 1 && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Nama Lengkap *</label>
                  <input type="text" value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})} placeholder="Nama sesuai KTP" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Jenis Kelamin</label>
                  <select value={form.gender} onChange={(e) => setForm({...form, gender: e.target.value})} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                    <option value="laki-laki">Laki-laki</option><option value="perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Tempat Lahir</label>
                  <input type="text" value={form.tempatLahir} onChange={(e) => setForm({...form, tempatLahir: e.target.value})} placeholder="Kota/Kabupaten" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Tanggal Lahir</label>
                  <input type="date" value={form.tanggalLahir} onChange={(e) => setForm({...form, tanggalLahir: e.target.value})} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">No. HP / WhatsApp *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="08xxxxxxxxxx" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Email (Opsional)</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="email@contoh.com" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button onClick={() => form.nama && form.phone ? setFormStep(2) : showToast('Isi nama dan no HP terlebih dahulu')} className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors active:scale-95">
                  Selanjutnya →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {formStep === 2 && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Ranting / Desa *</label>
                  <select value={form.village} onChange={(e) => setForm({...form, village: e.target.value})} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                    {villages.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Pekerjaan</label>
                  <input type="text" value={form.pekerjaan} onChange={(e) => setForm({...form, pekerjaan: e.target.value})} placeholder="Contoh: Guru, Petani, Wiraswasta" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Pendidikan Terakhir</label>
                  <select value={form.pendidikan} onChange={(e) => setForm({...form, pendidikan: e.target.value})} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                    {['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3'].map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Sponsor / Pengusul</label>
                  <input type="text" value={form.sponsor} onChange={(e) => setForm({...form, sponsor: e.target.value})} placeholder="Nama pengusul (opsional)" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
                </div>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Alamat Lengkap</label>
                <textarea value={form.alamat} onChange={(e) => setForm({...form, alamat: e.target.value})} rows={2} placeholder="Alamat domisili" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 resize-none" />
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={() => setFormStep(1)} className="text-emerald-600 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-50 transition-colors">← Kembali</button>
                <button onClick={() => setFormStep(3)} className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors active:scale-95">Selanjutnya →</button>
              </div>
            </div>
          )}

          {/* Step 3 - Konfirmasi */}
          {formStep === 3 && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="bg-emerald-50/60 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-emerald-800 mb-3">Konfirmasi Data Pendaftaran</h4>
                {[
                  { label: 'Nama', value: form.nama },
                  { label: 'Jenis Kelamin', value: form.gender },
                  { label: 'TTL', value: form.tempatLahir && form.tanggalLahir ? `${form.tempatLahir}, ${form.tanggalLahir}` : '-' },
                  { label: 'No. HP', value: form.phone },
                  { label: 'Email', value: form.email || '-' },
                  { label: 'Ranting', value: form.village },
                  { label: 'Pekerjaan', value: form.pekerjaan || '-' },
                  { label: 'Pendidikan', value: form.pendidikan },
                  { label: 'Sponsor', value: form.sponsor || '-' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-emerald-100 last:border-0">
                    <span className="text-xs text-emerald-500">{item.label}</span>
                    <span className="text-sm font-medium text-emerald-800">{item.value}</span>
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Catatan Tambahan</label>
                <textarea value={form.catatan} onChange={(e) => setForm({...form, catatan: e.target.value})} rows={2} placeholder="Catatan untuk verifikator (opsional)" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 resize-none" />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">Data akan diverifikasi oleh pengurus ranting sebelum disetujui. Proses verifikasi biasanya 1-3 hari kerja.</p>
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={() => setFormStep(2)} className="text-emerald-600 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-50 transition-colors">← Kembali</button>
                <button onClick={handleSubmitForm} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2 active:scale-95 shadow-lg">
                  <UserPlus className="w-4 h-4" /> Kirim Pendaftaran
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========== VERIFIKASI ========== */}
      {tab === 'verifikasi' && (
        <div className="space-y-4">
          {verifications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-12 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
              <p className="text-emerald-500 font-medium">Semua pendaftaran sudah diverifikasi ✓</p>
            </div>
          ) : (
            verifications.map((v, i) => (
              <div key={v.id} className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      {v.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-emerald-900">{v.name}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusConfig[v.status].bg} ${statusConfig[v.status].text}`}>
                          {statusConfig[v.status].label}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-500 mt-0.5">{v.village} • {v.phone}</p>
                      <p className="text-[10px] text-emerald-400 mt-0.5">ID: {v.id} • Sponsor: {v.sponsor} • {v.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => setShowDetail(showDetail === v.id ? null : v.id)} className="p-2 rounded-xl border border-emerald-200 text-emerald-500 hover:bg-emerald-50 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleVerify(i, 'rejected')} className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-2 rounded-xl text-xs font-medium hover:bg-red-100 transition-colors active:scale-95">
                      <XCircle className="w-3.5 h-3.5" /> Tolak
                    </button>
                    <button onClick={() => handleVerify(i, 'approved')} className="flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-medium hover:bg-emerald-700 transition-colors active:scale-95">
                      <CheckCircle className="w-3.5 h-3.5" /> Setujui
                    </button>
                  </div>
                </div>
                {showDetail === v.id && (
                  <div className="mt-4 pt-4 border-t border-emerald-50 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { icon: Phone, label: 'Telepon', value: v.phone },
                      { icon: MapPin, label: 'Desa/Ranting', value: v.village },
                      { icon: Calendar, label: 'Tanggal Daftar', value: v.date },
                      { icon: UserCheck, label: 'Sponsor', value: v.sponsor },
                    ].map((d, j) => {
                      const DIcon = d.icon;
                      return (
                        <div key={j} className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg">
                          <DIcon className="w-3.5 h-3.5 text-emerald-500" />
                          <div>
                            <p className="text-[10px] text-emerald-400">{d.label}</p>
                            <p className="text-xs font-medium text-emerald-800">{d.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* ========== RIWAYAT ========== */}
      {tab === 'riwayat' && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-emerald-50 flex items-center justify-between">
            <h3 className="font-bold text-emerald-900">Riwayat Pendaftaran</h3>
            <button onClick={() => showToast('Laporan pendaftaran diunduh!')} className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg font-medium hover:bg-emerald-100 transition-colors active:scale-95">
              <Download className="w-3.5 h-3.5" /> Unduh Laporan
            </button>
          </div>
          <div className="flex items-center gap-2 p-4 border-b border-emerald-50">
            <Search className="w-4 h-4 text-emerald-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari nama atau desa..." className="bg-transparent text-sm outline-none flex-1 text-emerald-800 placeholder:text-emerald-400" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="text-emerald-400 hover:text-emerald-600"><X className="w-4 h-4" /></button>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-50/80 border-b border-emerald-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Nama</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Desa</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Tanggal</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Verifikator</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((r, i) => {
                  const StatusIcon = statusConfig[r.status].icon;
                  return (
                    <tr key={i} className="border-b border-emerald-50 hover:bg-emerald-50/30 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-emerald-500">{r.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-emerald-800">{r.name}</td>
                      <td className="px-4 py-3 text-sm text-emerald-600">{r.village}</td>
                      <td className="px-4 py-3 text-sm text-emerald-500">{r.date}</td>
                      <td className="px-4 py-3 text-sm text-emerald-500">{r.verifiedBy}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${statusConfig[r.status].bg} ${statusConfig[r.status].text}`}>
                          <StatusIcon className="w-3 h-3" />{statusConfig[r.status].label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
