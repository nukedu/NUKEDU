import { useState, useEffect } from 'react';
import {
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search,
  X,
  Eye,
  Bell,
  Award,
  Lock,
  Unlock,
  Download,
  Settings,
  Save,
  Zap,
} from 'lucide-react';

type TabType = 'dashboard' | 'jabatan' | 'expiring' | 'expired' | 'settings';

// ========================
// JABATAN DEFINITIONS
// ========================
const jabatanPeriods: Record<string, { duration: number; unit: string; renewable: boolean; maxTerms: number }> = {
  'super-admin': { duration: 5, unit: 'tahun', renewable: true, maxTerms: 2 },
  'admin-mwc': { duration: 4, unit: 'tahun', renewable: true, maxTerms: 3 },
  'ketua-ranting': { duration: 3, unit: 'tahun', renewable: true, maxTerms: 3 },
  'sekretaris': { duration: 3, unit: 'tahun', renewable: true, maxTerms: 3 },
  'bendahara': { duration: 3, unit: 'tahun', renewable: true, maxTerms: 3 },
  'kontributor': { duration: 1, unit: 'tahun', renewable: true, maxTerms: 99 },
  'anggota': { duration: 99, unit: 'tahun', renewable: true, maxTerms: 99 },
};

// ========================
// TENURE DATA
// ========================
const initialTenures = [
  {
    id: 1, name: 'KH. Abdul Mu\'ti', email: 'abdul.muti@mwcnu.or.id', avatar: 'AM',
    role: 'super-admin', roleName: 'Rais Syuriyah MWC',
    village: 'MWC NU Kedu',
    startDate: '2022-03-15', endDate: '2027-03-15',
    term: 1, maxTerms: 2,
    status: 'active',
    accessLevel: 1,
    lastActivity: '2 jam lalu',
    autoLocked: false,
  },
  {
    id: 2, name: 'Dr. H. Ahmad Fauzi, M.Ag', email: 'ahmad.fauzi@mwcnu.or.id', avatar: 'AF',
    role: 'super-admin', roleName: 'Ketua Tanfidziyah MWC',
    village: 'MWC NU Kedu',
    startDate: '2022-03-15', endDate: '2027-03-15',
    term: 1, maxTerms: 2,
    status: 'active',
    accessLevel: 1,
    lastActivity: '1 jam lalu',
    autoLocked: false,
  },
  {
    id: 3, name: 'H. Nur Hidayat, S.Pd.I', email: 'nur.hidayat@mwcnu.or.id', avatar: 'NH',
    role: 'admin-mwc', roleName: 'Wakil Ketua I (Dakwah)',
    village: 'MWC NU Kedu',
    startDate: '2022-03-15', endDate: '2026-03-15',
    term: 2, maxTerms: 3,
    status: 'expiring',
    accessLevel: 2,
    lastActivity: '30 menit lalu',
    autoLocked: false,
  },
  {
    id: 4, name: 'Ahmad Hidayat', email: 'ahmad.hidayat@email.com', avatar: 'AH',
    role: 'kontributor', roleName: 'Kontributor Aktif',
    village: 'Desa Kedu',
    startDate: '2024-03-15', endDate: '2026-03-15',
    term: 2, maxTerms: 99,
    status: 'expiring',
    accessLevel: 4,
    lastActivity: '5 menit lalu',
    autoLocked: false,
  },
  {
    id: 5, name: 'Muhammad Rizki', email: 'rizki@email.com', avatar: 'MR',
    role: 'ketua-ranting', roleName: 'Ketua Ranting Danurejo',
    village: 'Desa Danurejo',
    startDate: '2023-01-10', endDate: '2026-01-10',
    term: 1, maxTerms: 3,
    status: 'expiring-soon',
    accessLevel: 3,
    lastActivity: '1 hari lalu',
    autoLocked: false,
  },
  {
    id: 6, name: 'Fatimah Azzahra', email: 'fatimah@email.com', avatar: 'FA',
    role: 'sekretaris', roleName: 'Sekretaris MWC',
    village: 'MWC NU Kedu',
    startDate: '2022-03-15', endDate: '2025-03-15',
    term: 1, maxTerms: 3,
    status: 'expired',
    accessLevel: 3,
    lastActivity: '45 hari lalu',
    autoLocked: true,
  },
  {
    id: 7, name: 'H. Slamet Riyadi', email: 'slamet@email.com', avatar: 'SR',
    role: 'ketua-ranting', roleName: 'Ketua Ranting Mojotengah',
    village: 'Desa Mojotengah',
    startDate: '2023-06-01', endDate: '2026-06-01',
    term: 1, maxTerms: 3,
    status: 'active',
    accessLevel: 3,
    lastActivity: '5 jam lalu',
    autoLocked: false,
  },
  {
    id: 8, name: 'Siti Aminah', email: 'siti.aminah@email.com', avatar: 'SA',
    role: 'bendahara', roleName: 'Bendahara Ranting Candimulyo',
    village: 'Desa Candimulyo',
    startDate: '2023-08-01', endDate: '2026-08-01',
    term: 1, maxTerms: 3,
    status: 'active',
    accessLevel: 3,
    lastActivity: '2 jam lalu',
    autoLocked: false,
  },
  {
    id: 9, name: 'Budi Santoso', email: 'budi@email.com', avatar: 'BS',
    role: 'kontributor', roleName: 'Kontributor Aktif',
    village: 'Desa Salamsari',
    startDate: '2025-01-01', endDate: '2026-01-01',
    term: 1, maxTerms: 99,
    status: 'expired',
    accessLevel: 4,
    lastActivity: '10 hari lalu',
    autoLocked: true,
  },
  {
    id: 10, name: 'Rina Wati', email: 'rina@email.com', avatar: 'RW',
    role: 'anggota', roleName: 'Anggota Biasa',
    village: 'Desa Mergowati',
    startDate: '2024-06-01', endDate: '2124-06-01',
    term: 1, maxTerms: 99,
    status: 'active',
    accessLevel: 5,
    lastActivity: '3 hari lalu',
    autoLocked: false,
  },
  {
    id: 11, name: 'H. Budi Santoso', email: 'budi.santoso@email.com', avatar: 'BS',
    role: 'ketua-ranting', roleName: 'Ketua Ranting Salamsari',
    village: 'Desa Salamsari',
    startDate: '2020-01-15', endDate: '2023-01-15',
    term: 3, maxTerms: 3,
    status: 'max-terms',
    accessLevel: 3,
    lastActivity: '90 hari lalu',
    autoLocked: true,
  },
];

// ========================
// HELPER FUNCTIONS
// ========================
function daysUntil(dateStr: string): number {
  const now = new Date();
  const end = new Date(dateStr);
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getProgress(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = Date.now();
  const total = end - start;
  const elapsed = now - start;
  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

const statusConfig: Record<string, { bg: string; text: string; border: string; label: string; icon: any }> = {
  active: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Aktif', icon: CheckCircle },
  expiring: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Akan Berakhir', icon: AlertTriangle },
  'expiring-soon': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', label: 'Segera Berakhir', icon: Clock },
  expired: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Berakhir', icon: XCircle },
  'max-terms': { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', label: 'Masa Habis Maks', icon: Lock },
};

const roleColorMap: Record<string, string> = {
  'super-admin': 'bg-red-100 text-red-700',
  'admin-mwc': 'bg-amber-100 text-amber-700',
  'ketua-ranting': 'bg-emerald-100 text-emerald-700',
  'sekretaris': 'bg-blue-100 text-blue-700',
  'bendahara': 'bg-purple-100 text-purple-700',
  'kontributor': 'bg-teal-100 text-teal-700',
  'anggota': 'bg-gray-100 text-gray-700',
};

// ========================
// COMPONENT
// ========================
export default function MasaHidmatPage() {
  const [tab, setTab] = useState<TabType>('dashboard');
  const [tenures, setTenures] = useState(initialTenures);
  const [notif, setNotif] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [showRenewModal, setShowRenewModal] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<number | null>(null);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [warningDays, setWarningDays] = useState(90);
  const [autoNotifEnabled, setAutoNotifEnabled] = useState(true);
  const [renewYears, setRenewYears] = useState(3);
  const [processing, setProcessing] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  // Auto-process: lock expired accounts
  useEffect(() => {
    const checkExpiry = () => {
      setTenures(prev => prev.map(t => {
        const days = daysUntil(t.endDate);
        let status = t.status;
        let autoLocked = t.autoLocked;

        if (days <= 0 && t.status !== 'expired' && t.status !== 'max-terms') {
          status = 'expired';
          autoLocked = autoLockEnabled;
        } else if (days > 0 && days <= 30 && t.status !== 'max-terms') {
          status = 'expiring-soon';
        } else if (days > 30 && days <= warningDays && t.status !== 'max-terms') {
          status = 'expiring';
        } else if (days > warningDays && t.status !== 'max-terms') {
          status = 'active';
        }

        return { ...t, status, autoLocked };
      }));
    };
    checkExpiry();
    const interval = setInterval(checkExpiry, 60000);
    return () => clearInterval(interval);
  }, [autoLockEnabled, warningDays]);

  // Computed stats
  const activeCount = tenures.filter(t => t.status === 'active').length;
  const expiringCount = tenures.filter(t => t.status === 'expiring' || t.status === 'expiring-soon').length;
  const expiredCount = tenures.filter(t => t.status === 'expired' || t.status === 'max-terms').length;
  const lockedCount = tenures.filter(t => t.autoLocked).length;

  const filteredTenures = tenures.filter(t => {
    const matchSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.roleName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'semua' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Handlers
  const handleRenew = (id: number) => {
    setProcessing(id);
    setTimeout(() => {
      setTenures(prev => prev.map(t => {
        if (t.id === id) {
          const newStart = t.endDate;
          const newEndDate = new Date(newStart);
          newEndDate.setFullYear(newEndDate.getFullYear() + renewYears);
          return {
            ...t,
            startDate: newStart,
            endDate: newEndDate.toISOString().split('T')[0],
            term: t.term + 1,
            status: 'active' as const,
            autoLocked: false,
          };
        }
        return t;
      }));
      setProcessing(null);
      setShowRenewModal(null);
      showToast(`Perpanjangan berhasil! Jabatan diperpanjang ${renewYears} tahun.`);
    }, 1500);
  };

  const handleForceLock = (id: number) => {
    setTenures(prev => prev.map(t => t.id === id ? { ...t, autoLocked: true, status: 'expired' as const } : t));
    showToast('Akses berhasil dikunci secara manual');
  };

  const handleForceUnlock = (id: number) => {
    setTenures(prev => prev.map(t => t.id === id ? { ...t, autoLocked: false, status: 'active' as const } : t));
    showToast('Akses berhasil dibuka secara manual');
  };

  const handleEndTerm = (id: number) => {
    setTenures(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, endDate: new Date().toISOString().split('T')[0], status: 'expired' as const, autoLocked: true };
      }
      return t;
    }));
    showToast('Masa jabatan diakhiri — akses otomatis terkunci');
  };

  const handleSendReminder = (id: number) => {
    const t = tenures.find(t => t.id === id);
    showToast(`Pengingat perpanjangan dikirim ke ${t?.name}`);
  };

  const handleRunAutoCheck = () => {
    showToast('Auto-check selesai: ' + expiringCount + ' akan berakhir, ' + expiredCount + ' sudah berakhir');
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce z">✅ {notif}</div>
      )}

      {/* Renew Modal */}
      {showRenewModal !== null && (() => {
        const t = tenures.find(t => t.id === showRenewModal);
        if (!t) return null;
        return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Perpanjang Masa Hidmat</h3>
                  <button onClick={() => setShowRenewModal(null)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-emerald-800">{t.name}</p>
                    <p className="text-xs text-emerald-500">{t.roleName} • Periode ke-{t.term + 1}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Durasi Perpanjangan</label>
                  <select value={renewYears} onChange={(e) => setRenewYears(Number(e.target.value))} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                    {[1, 2, 3, 4, 5].map((y) => <option key={y} value={y}>{y} Tahun</option>)}
                  </select>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-xs text-amber-700">
                    ⚠️ Perpanjangan dari {formatDate(t.endDate)} hingga {(() => { const d = new Date(t.endDate); d.setFullYear(d.getFullYear() + renewYears); return formatDate(d.toISOString()); })()}
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowRenewModal(null)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">Batal</button>
                  <button
                    onClick={() => handleRenew(t.id)}
                    disabled={processing === t.id}
                    className="flex-1 py-2.5 rounded-xl text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {processing === t.id ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /> Memproses...</>
                    ) : (
                      <><RefreshCw className="w-4 h-4" /> Perpanjang</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Management Masa Hidmat</h1>
          <p className="text-sm text-emerald-500 mt-1">Sistem otomatis hak akses berdasarkan masa jabatan & pelayanan</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleRunAutoCheck} className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors active:scale-95">
            <Zap className="w-4 h-4" /> Auto-Check
          </button>
          <button onClick={() => { setTab('settings'); }} className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors active:scale-95">
            <Settings className="w-4 h-4" /> Pengaturan
          </button>
        </div>
      </div>

      {/* Alert Banner for Expiring */}
      {expiringCount > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-800 text-sm">⚠️ {expiringCount} jabatan akan berakhir dalam {warningDays} hari ke depan</p>
            <p className="text-xs text-amber-600 mt-1">Segera lakukan perpanjangan atau rotasi jabatan untuk menjaga kelancaran operasional.</p>
          </div>
          <button onClick={() => { setTab('expiring'); }} className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-medium hover:bg-amber-200 transition-colors shrink-0">
            Lihat Detail →
          </button>
        </div>
      )}

      {/* Alert Banner for Expired & Locked */}
      {lockedCount > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <Lock className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-800 text-sm">🔒 {lockedCount} akun terkunci otomatis (masa jabatan berakhir)</p>
            <p className="text-xs text-red-600 mt-1">Akses portal telah dinonaktifkan otomatis oleh sistem. Perpanjang masa jabatan untuk mengaktifkan kembali.</p>
          </div>
          <button onClick={() => { setTab('expired'); }} className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-lg font-medium hover:bg-red-200 transition-colors shrink-0">
            Lihat Detail →
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Jabatan', value: tenures.length.toString(), icon: Users, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Aktif', value: activeCount.toString(), icon: CheckCircle, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Akan Berakhir', value: expiringCount.toString(), icon: AlertTriangle, bg: 'bg-amber-50', color: 'text-amber-600' },
          { label: 'Berakhir', value: expiredCount.toString(), icon: XCircle, bg: 'bg-red-50', color: 'text-red-600' },
          { label: 'Auto-Locked', value: lockedCount.toString(), icon: Lock, bg: 'bg-gray-100', color: 'text-gray-600' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <button key={i} onClick={() => setTab(i === 0 ? 'jabatan' : i === 1 ? 'jabatan' : i === 2 ? 'expiring' : 'expired')} className="bg-white rounded-2xl p-4 border border-emerald-100/60 shadow-sm text-left hover:shadow-md transition-all active:scale-[0.98]">
              <div className={`${s.bg} p-2 rounded-xl w-fit mb-2`}><Icon className={`w-4 h-4 ${s.color}`} /></div>
              <p className="text-xl font-bold text-emerald-900">{s.value}</p>
              <p className="text-xs text-emerald-500">{s.label}</p>
            </button>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap bg-white rounded-xl border border-emerald-100/60 p-1 gap-1">
        {[
          { id: 'dashboard' as TabType, label: 'Overview', icon: Award },
          { id: 'jabatan' as TabType, label: 'Semua Jabatan', icon: Users },
          { id: 'expiring' as TabType, label: `Akan Berakhir (${expiringCount})`, icon: AlertTriangle },
          { id: 'expired' as TabType, label: `Berakhir (${expiredCount})`, icon: XCircle },
          { id: 'settings' as TabType, label: 'Pengaturan Auto', icon: Settings },
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

      {/* ========== DASHBOARD OVERVIEW ========== */}
      {tab === 'dashboard' && (
        <div className="space-y-6">
          {/* Timeline Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Upcoming Expirations */}
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5">
              <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" /> Jabatan Mendekati Berakhir
              </h3>
              <div className="space-y-3">
                {tenures.filter(t => t.status === 'expiring' || t.status === 'expiring-soon').sort((a, b) => daysUntil(a.endDate) - daysUntil(b.endDate)).slice(0, 5).map((t) => {
                  const days = daysUntil(t.endDate);
                  const progress = getProgress(t.startDate, t.endDate);
                  return (
                    <div key={t.id} className="p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-[10px] font-bold">{t.avatar}</div>
                          <div>
                            <p className="text-sm font-semibold text-emerald-800">{t.name}</p>
                            <p className="text-[10px] text-emerald-500">{t.roleName}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold ${days <= 30 ? 'text-orange-600' : 'text-amber-600'}`}>
                          {days} hari lagi
                        </span>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${days <= 30 ? 'bg-orange-500' : 'bg-amber-400'}`} style={{ width: `${progress}%` }} />
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-amber-500">Berakhir: {formatDate(t.endDate)}</span>
                        <button onClick={() => setShowRenewModal(t.id)} className="text-[10px] text-emerald-600 font-medium hover:text-emerald-800">Perpanjang →</button>
                      </div>
                    </div>
                  );
                })}
                {tenures.filter(t => t.status === 'expiring' || t.status === 'expiring-soon').length === 0 && (
                  <div className="text-center py-6 text-emerald-400 text-sm">✅ Semua jabatan dalam kondisi aman</div>
                )}
              </div>
            </div>

            {/* Recently Expired */}
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5">
              <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-500" /> Akun Terkunci Otomatis
              </h3>
              <div className="space-y-3">
                {tenures.filter(t => t.autoLocked).slice(0, 5).map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-red-50/50 border border-red-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-[10px] font-bold grayscale">{t.avatar}</div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">{t.name}</p>
                          <p className="text-[10px] text-gray-400">{t.roleName} • Berakhir {formatDate(t.endDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleSendReminder(t.id)} className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-500" title="Kirim Pengingat">
                          <Bell className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setShowRenewModal(t.id)} className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-500" title="Perpanjang">
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {tenures.filter(t => t.autoLocked).length === 0 && (
                  <div className="text-center py-6 text-emerald-400 text-sm">✅ Tidak ada akun terkunci</div>
                )}
              </div>
            </div>
          </div>

          {/* Per Role Summary */}
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5">
            <h3 className="font-bold text-emerald-900 mb-4">Ringkasan Masa Hidmat per Jabatan</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-emerald-100">
                    <th className="text-left px-3 py-2 text-xs font-semibold text-emerald-700">Jabatan</th>
                    <th className="text-center px-3 py-2 text-xs font-semibold text-emerald-700">Durasi</th>
                    <th className="text-center px-3 py-2 text-xs font-semibold text-emerald-700">Max Periode</th>
                    <th className="text-center px-3 py-2 text-xs font-semibold text-emerald-700">Aktif</th>
                    <th className="text-center px-3 py-2 text-xs font-semibold text-emerald-700">Akan Berakhir</th>
                    <th className="text-center px-3 py-2 text-xs font-semibold text-emerald-700">Berakhir</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(jabatanPeriods).map(([roleId, config]) => {
                    const roleTenures = tenures.filter(t => t.role === roleId);
                    return (
                      <tr key={roleId} className="border-b border-emerald-50 hover:bg-emerald-50/30">
                        <td className="px-3 py-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColorMap[roleId]}`}>
                            {roleId.replace(/-/g, ' ')}
                          </span>
                        </td>
                        <td className="text-center px-3 py-2 text-xs text-emerald-700">{config.duration} {config.unit}</td>
                        <td className="text-center px-3 py-2 text-xs text-emerald-700">{config.maxTerms === 99 ? '∞' : config.maxTerms} periode</td>
                        <td className="text-center px-3 py-2 text-xs font-bold text-emerald-600">{roleTenures.filter(t => t.status === 'active').length}</td>
                        <td className="text-center px-3 py-2 text-xs font-bold text-amber-600">{roleTenures.filter(t => t.status === 'expiring' || t.status === 'expiring-soon').length}</td>
                        <td className="text-center px-3 py-2 text-xs font-bold text-red-600">{roleTenures.filter(t => t.status === 'expired' || t.status === 'max-terms').length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========== ALL TENURES TABLE ========== */}
      {(tab === 'jabatan' || tab === 'expiring' || tab === 'expired') && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-emerald-100/60 px-4 py-2.5 flex-1">
              <Search className="w-4 h-4 text-emerald-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari nama atau jabatan..." className="bg-transparent text-sm outline-none flex-1 text-emerald-800 placeholder:text-emerald-400" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="text-emerald-400 hover:text-emerald-600"><X className="w-4 h-4" /></button>}
            </div>
            {tab === 'jabatan' && (
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-white rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                <option value="semua">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="expiring">Akan Berakhir</option>
                <option value="expired">Berakhir</option>
                <option value="max-terms">Max Periode</option>
              </select>
            )}
            <button onClick={() => showToast('Laporan masa hidmat diunduh!')} className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-2 rounded-xl text-xs font-medium hover:bg-emerald-100 transition-colors active:scale-95 shrink-0">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-emerald-50/80 border-b border-emerald-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Pengguna</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Jabatan</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Periode</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Masa Hidmat</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Sisa Hari</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Status</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Akses</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {(tab === 'jabatan' ? filteredTenures :
                    tab === 'expiring' ? tenures.filter(t => t.status === 'expiring' || t.status === 'expiring-soon') :
                    tenures.filter(t => t.status === 'expired' || t.status === 'max-terms')
                  ).sort((a, b) => daysUntil(a.endDate) - daysUntil(b.endDate)).map((t) => {
                    const days = daysUntil(t.endDate);
                    const progress = getProgress(t.startDate, t.endDate);
                    const sc = statusConfig[t.status];
                    const StatusIcon = sc.icon;
                    const periodConfig = jabatanPeriods[t.role];
                    return (
                      <tr key={t.id} className={`border-b border-emerald-50 hover:bg-emerald-50/30 transition-colors ${t.autoLocked ? 'opacity-70' : ''}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${t.autoLocked ? 'bg-gray-300 grayscale' : 'bg-gradient-to-br from-emerald-400 to-teal-500'}`}>{t.avatar}</div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-emerald-800 truncate">{t.name}</p>
                              <p className="text-[10px] text-emerald-400">{t.village}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${roleColorMap[t.role]}`}>{t.roleName}</span>
                        </td>
                        <td className="text-center px-4 py-3">
                          <span className="text-xs font-medium text-emerald-700">
                            {t.term}/{periodConfig.maxTerms === 99 ? '∞' : periodConfig.maxTerms}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="w-32">
                            <div className="flex items-center justify-between text-[10px] text-emerald-500 mb-1">
                              <span>{formatDate(t.startDate)}</span>
                              <span>{formatDate(t.endDate)}</span>
                            </div>
                            <div className="w-full bg-emerald-100 rounded-full h-1.5">
                              <div className={`h-1.5 rounded-full ${
                                progress >= 95 ? 'bg-red-500' : progress >= 80 ? 'bg-amber-400' : 'bg-emerald-400'
                              }`} style={{ width: `${Math.min(progress, 100)}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="text-center px-4 py-3">
                          <span className={`text-sm font-bold ${
                            days <= 0 ? 'text-red-600' : days <= 30 ? 'text-orange-600' : days <= 90 ? 'text-amber-600' : 'text-emerald-600'
                          }`}>
                            {days <= 0 ? 'Habis' : `${days} hari`}
                          </span>
                        </td>
                        <td className="text-center px-4 py-3">
                          <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${sc.bg} ${sc.text} border ${sc.border}`}>
                            <StatusIcon className="w-3 h-3" />{sc.label}
                          </span>
                        </td>
                        <td className="text-center px-4 py-3">
                          {t.autoLocked ? (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-600">
                              <Lock className="w-3 h-3" /> Terkunci
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-600">
                              <Unlock className="w-3 h-3" /> Aktif
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            {/* Renew button for expiring/expired */}
                            {(t.status === 'expiring' || t.status === 'expiring-soon' || t.status === 'expired') && periodConfig.maxTerms > t.term && (
                              <button onClick={() => setShowRenewModal(t.id)} className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-500 transition-colors" title="Perpanjang">
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {/* Send reminder */}
                            {(t.status === 'expiring' || t.status === 'expiring-soon' || t.status === 'expired') && (
                              <button onClick={() => handleSendReminder(t.id)} className="p-1.5 rounded-lg hover:bg-amber-100 text-amber-500 transition-colors" title="Kirim Pengingat">
                                <Bell className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {/* Lock/Unlock */}
                            {t.autoLocked ? (
                              <button onClick={() => handleForceUnlock(t.id)} className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-500 transition-colors" title="Buka Kunci">
                                <Unlock className="w-3.5 h-3.5" />
                              </button>
                            ) : t.status === 'active' ? (
                              <button onClick={() => handleForceLock(t.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-400 transition-colors" title="Kunci Manual">
                                <Lock className="w-3.5 h-3.5" />
                              </button>
                            ) : null}
                            {/* End term */}
                            {t.status === 'active' && (
                              <button onClick={() => handleEndTerm(t.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors" title="Akhiri Jabatan">
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {/* Detail */}
                            <button onClick={() => setShowDetailModal(showDetailModal === t.id ? null : t.id)} className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-400 transition-colors" title="Detail">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {((tab === 'jabatan' ? filteredTenures : tab === 'expiring' ? tenures.filter(t => t.status === 'expiring' || t.status === 'expiring-soon') : tenures.filter(t => t.status === 'expired' || t.status === 'max-terms')).length === 0) && (
              <div className="p-12 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
                <p className="text-emerald-500 font-medium">Tidak ada data ditemukan</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========== AUTO SETTINGS ========== */}
      {tab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-emerald-900 text-lg">Pengaturan Sistem Otomatis</h3>

            <div className="space-y-4">
              <button onClick={() => setAutoLockEnabled(!autoLockEnabled)} className="w-full flex items-center justify-between p-4 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Auto-Lock Saat Berakhir</p>
                    <p className="text-xs text-emerald-500 mt-0.5">Kunci akses otomatis saat masa jabatan habis</p>
                  </div>
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors relative ${autoLockEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${autoLockEnabled ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                </div>
              </button>

              <button onClick={() => setAutoNotifEnabled(!autoNotifEnabled)} className="w-full flex items-center justify-between p-4 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Auto-Notifikasi Perpanjangan</p>
                    <p className="text-xs text-emerald-500 mt-0.5">Kirim notifikasi otomatis sebelum masa jabatan berakhir</p>
                  </div>
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors relative ${autoNotifEnabled ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${autoNotifEnabled ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                </div>
              </button>

              <div className="p-4 rounded-xl bg-emerald-50/40">
                <label className="text-sm font-medium text-emerald-800 mb-2 block">Peringatan H-berapa hari?</label>
                <p className="text-xs text-emerald-500 mb-3">Sistem akan mengirim notifikasi peringatan sebelum masa jabatan berakhir</p>
                <div className="flex items-center gap-3">
                  {[30, 60, 90, 120].map((d) => (
                    <button
                      key={d}
                      onClick={() => setWarningDays(d)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all active:scale-95 ${
                        warningDays === d ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-emerald-600 hover:bg-emerald-100 border border-emerald-100'
                      }`}
                    >
                      H-{d}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => showToast('Pengaturan otomatis disimpan!')} className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors active:scale-95 shadow-sm">
                <Save className="w-4 h-4" /> Simpan Pengaturan
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-emerald-900 text-lg">Durasi Masa Hidmat per Jabatan</h3>
            <p className="text-sm text-emerald-500">Konfigurasi otomatis durasi & batas periode jabatan</p>
            <div className="space-y-3">
              {Object.entries(jabatanPeriods).map(([roleId, config]) => (
                <div key={roleId} className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColorMap[roleId]}`}>{roleId.replace(/-/g, ' ')}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-emerald-700">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {config.duration} {config.unit}</span>
                    <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Max: {config.maxTerms === 99 ? '∞' : config.maxTerms}x</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Log */}
            <h3 className="font-bold text-emerald-900 mt-6">Log Aktivitas Otomatis</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {[
                { time: '2 menit lalu', action: 'Auto-check: 2 jabatan akan berakhir dalam 90 hari', type: 'warning' },
                { time: '1 jam lalu', action: 'Notifikasi perpanjangan dikirim ke Ahmad Hidayat', type: 'info' },
                { time: '3 jam lalu', action: 'Akses Budi Santoso dikunci otomatis (masa jabatan berakhir)', type: 'danger' },
                { time: '1 hari lalu', action: 'Akses Fatimah Azzahra dikunci otomatis (masa jabatan berakhir)', type: 'danger' },
                { time: '2 hari lalu', action: 'Perpanjangan H. Nur Hidayat disetujui (+3 tahun)', type: 'success' },
                { time: '3 hari lalu', action: 'Auto-check: Semua jabatan dalam kondisi aman', type: 'success' },
              ].map((log, i) => (
                <div key={i} className={`flex items-start gap-2 p-2.5 rounded-lg text-xs ${
                  log.type === 'danger' ? 'bg-red-50 text-red-700' :
                  log.type === 'warning' ? 'bg-amber-50 text-amber-700' :
                  log.type === 'success' ? 'bg-emerald-50 text-emerald-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  <Clock className="w-3 h-3 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <p className="opacity-60 mt-0.5">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
