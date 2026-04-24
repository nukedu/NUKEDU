import { useState } from 'react';
import {
  Heart,
  Wallet,
  Gift,
  Download,
  Check,
  Clock,
  BarChart3,
  Target,
  X,
} from 'lucide-react';

const initialDonations = [
  { id: 1, type: 'Zakat Fitrah', amount: 500000, date: '10 Jan 2026', status: 'Tersalurkan', recipient: 'Mustahik Kedu Utara', icon: '🕌' },
  { id: 2, type: 'Infaq Masjid Al-Ikhlas', amount: 150000, date: '12 Jan 2026', status: 'Tersalurkan', recipient: 'Pembangunan Masjid', icon: '🏗️' },
  { id: 3, type: 'Shadaqah Jariyah', amount: 100000, date: '14 Jan 2026', status: 'Proses', recipient: 'TPA/TPQ Kedu', icon: '📖' },
  { id: 4, type: 'Zakat Mal', amount: 750000, date: '5 Jan 2026', status: 'Tersalurkan', recipient: 'Fakir Miskin Kedu', icon: '💰' },
  { id: 5, type: 'Infaq Pembangunan', amount: 200000, date: '1 Jan 2026', status: 'Tersalurkan', recipient: 'Renovasi Musholla', icon: '🏗️' },
  { id: 6, type: 'Donasi Bencana', amount: 300000, date: '28 Des 2025', status: 'Tersalurkan', recipient: 'Korban Banjir Temanggung', icon: '🌊' },
];

const programs = [
  { id: 1, title: 'Infaq Masjid Al-Ikhlas', target: 50000000, collected: 35000000, donors: 245, daysLeft: 45 },
  { id: 2, title: 'Beasiswa Anak Yatim 2026', target: 20000000, collected: 12500000, donors: 180, daysLeft: 60 },
  { id: 3, title: 'Renovasi Musholla Ranting', target: 15000000, collected: 8750000, donors: 95, daysLeft: 30 },
  { id: 4, title: 'Bantuan Bencana Alam', target: 10000000, collected: 9200000, donors: 320, daysLeft: 7 },
];

export default function LazisnuPage() {
  const [tab, setTab] = useState<'riwayat' | 'program' | 'laporan'>('riwayat');
  const [showDonasi, setShowDonasi] = useState(false);
  const [donasiAmount, setDonasiAmount] = useState('');
  const [donasiType, setDonasiType] = useState('infaq');
  const [notif, setNotif] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const [donations, setDonations] = useState(initialDonations);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

  const handleDonasi = () => {
    if (donasiAmount) {
      const newDonation = {
        id: Date.now(),
        type: donasiType === 'infaq' ? 'Infaq' : donasiType === 'zakat' ? 'Zakat Fitrah' : donasiType === 'shadaqah' ? 'Shadaqah' : 'Zakat Mal',
        amount: Number(donasiAmount),
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Proses',
        recipient: 'LAZISNU Kedu',
        icon: '💝',
      };
      setDonations([newDonation, ...donations]);
      showToast(`Donasi Rp ${Number(donasiAmount).toLocaleString('id-ID')} berhasil dikirim!`);
      setShowDonasi(false);
      setDonasiAmount('');
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
          <h1 className="text-2xl font-bold text-emerald-900">LAZISNU Digital</h1>
          <p className="text-sm text-emerald-500 mt-1">UPZIS LAZISNU Kecamatan Kedu — Transparan & Amanah</p>
        </div>
        <button
          onClick={() => setShowDonasi(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm active:scale-95"
        >
          <Heart className="w-4 h-4" />
          Donasi Sekarang
        </button>
      </div>

      {/* Donation Modal */}
      {showDonasi && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Donasi LAZISNU</h3>
                <button onClick={() => setShowDonasi(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <p className="text-sm opacity-80 mt-1">Salurkan infaq Anda secara transparan</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Jenis Donasi</label>
                <select value={donasiType} onChange={(e) => setDonasiType(e.target.value)} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                  <option value="infaq">Infaq</option>
                  <option value="zakat">Zakat Fitrah</option>
                  <option value="zakat-mal">Zakat Mal</option>
                  <option value="shadaqah">Shadaqah</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Nominal (Rp)</label>
                <input type="number" value={donasiAmount} onChange={(e) => setDonasiAmount(e.target.value)} placeholder="Contoh: 100000" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div className="flex gap-2">
                {[50000, 100000, 250000, 500000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setDonasiAmount(String(amt))}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all active:scale-95 ${
                      donasiAmount === String(amt) ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    {amt >= 1000000 ? `${amt / 1000000}Jt` : `${amt / 1000}K`}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowDonasi(false)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">Batal</button>
                <button onClick={handleDonasi} className="flex-1 py-2.5 rounded-xl text-sm text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-90 transition-opacity font-medium active:scale-95">
                  Kirim Donasi ❤️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { icon: Wallet, label: 'Total Donasi Saya', value: `Rp ${(totalDonated / 1000000).toFixed(1)}Jt`, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
          { icon: Gift, label: 'Jenis Donasi', value: `${donations.length} Transaksi`, bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
          { icon: Check, label: 'Tersalurkan', value: `${donations.filter(d => d.status === 'Tersalurkan').length} Program`, bgColor: 'bg-green-50', iconColor: 'text-green-600' },
          { icon: Target, label: 'Target Bulanan', value: '75%', bgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <button key={i} className="bg-white rounded-2xl p-5 border border-emerald-100/60 shadow-sm text-left hover:shadow-md transition-all active:scale-[0.98]">
              <div className={`${stat.bgColor} p-2.5 rounded-xl w-fit mb-3`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900">{stat.value}</h3>
              <p className="text-sm text-emerald-500 mt-1">{stat.label}</p>
            </button>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl border border-emerald-100/60 p-1 gap-1">
        {[
          { id: 'riwayat' as const, label: 'Riwayat Donasi' },
          { id: 'program' as const, label: 'Program Aktif' },
          { id: 'laporan' as const, label: 'Laporan Penyaluran' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
              tab === t.id ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-500 hover:bg-emerald-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'riwayat' && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-emerald-50 flex items-center justify-between">
            <h3 className="font-bold text-emerald-900">Riwayat Donasi</h3>
            <button
              onClick={() => showToast('Laporan donasi berhasil diunduh!')}
              className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-800 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh Laporan
            </button>
          </div>
          <div className="divide-y divide-emerald-50">
            {donations.map((d) => (
              <button
                key={d.id}
                onClick={() => setShowDetail(showDetail === d.id ? null : d.id)}
                className="w-full flex items-center gap-4 p-4 hover:bg-emerald-50/30 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-lg shrink-0">{d.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-emerald-800">{d.type}</p>
                  <p className="text-xs text-emerald-400 mt-0.5">{d.recipient} • {d.date}</p>
                  {showDetail === d.id && (
                    <p className="text-xs text-emerald-600 mt-1 bg-emerald-50 rounded-lg px-2 py-1 inline-block">
                      Detail: Disalurkan ke {d.recipient} pada {d.date}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-700">Rp {d.amount.toLocaleString('id-ID')}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    d.status === 'Tersalurkan' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {d.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'program' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((prog, i) => {
            const percent = (prog.collected / prog.target) * 100;
            return (
              <div key={i} className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 hover:shadow-md transition-all">
                <h4 className="font-bold text-emerald-900 mb-3">{prog.title}</h4>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-emerald-500">Terkumpul</span>
                  <span className="font-bold text-emerald-700">{percent.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-2.5 mb-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full" style={{ width: `${percent}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-500 mb-4">
                  <span>Rp {prog.collected.toLocaleString('id-ID')}</span>
                  <span>Target: Rp {prog.target.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-emerald-400">
                    <span className="flex items-center gap-1"><Wallet className="w-3 h-3" />{prog.donors} donatur</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{prog.daysLeft} hari lagi</span>
                  </div>
                  <button
                    onClick={() => { setDonasiType('infaq'); setShowDonasi(true); }}
                    className="text-xs bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg font-medium hover:bg-rose-100 transition-colors active:scale-95"
                  >
                    Donasi
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'laporan' && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-emerald-900 text-lg">Laporan Penyaluran Bulan Ini</h3>
            <button
              onClick={() => showToast('Laporan penyaluran diunduh!')}
              className="flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-800 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              Unduh PDF
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Terkumpul', value: 'Rp 4.250.000', icon: BarChart3 },
              { label: 'Total Tersalurkan', value: 'Rp 3.850.000', icon: Check },
              { label: 'Sisa Saldo', value: 'Rp 400.000', icon: Wallet },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <button key={i} className="bg-emerald-50/60 rounded-xl p-4 text-center hover:bg-emerald-50 transition-colors active:scale-[0.98]">
                  <Icon className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-emerald-900">{item.value}</p>
                  <p className="text-xs text-emerald-500">{item.label}</p>
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-emerald-800 text-sm">Detail Penyaluran:</h4>
            {[
              { recipient: 'Mustahik Kedu Utara (15 KK)', amount: 'Rp 1.500.000', date: '8 Jan 2026' },
              { recipient: 'TPA/TPQ Se-Kecamatan Kedu', amount: 'Rp 750.000', date: '10 Jan 2026' },
              { recipient: 'Pembangunan Masjid Al-Ikhlas', amount: 'Rp 1.000.000', date: '12 Jan 2026' },
              { recipient: 'Bantuan Operasional Majelis Dzikir', amount: 'Rp 600.000', date: '14 Jan 2026' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => showToast(`Detail: ${item.recipient} — ${item.amount}`)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left active:scale-[0.99]"
              >
                <div>
                  <p className="text-sm font-medium text-emerald-800">{item.recipient}</p>
                  <p className="text-xs text-emerald-400">{item.date}</p>
                </div>
                <span className="text-sm font-bold text-emerald-700">{item.amount}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
