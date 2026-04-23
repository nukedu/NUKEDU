import { useState } from 'react';
import { Heart, Wallet, Gift, X } from 'lucide-react';

interface LazisnuTrackerProps {
  onNotif?: (msg: string) => void;
  onNavigate?: (menu: string) => void;
}

const donations = [
  { type: 'Zakat Fitrah', amount: 'Rp 500.000', date: '10 Jan 2026', status: 'Tersalurkan' },
  { type: 'Infaq Masjid', amount: 'Rp 150.000', date: '12 Jan 2026', status: 'Tersalurkan' },
  { type: 'Shadaqah', amount: 'Rp 100.000', date: '14 Jan 2026', status: 'Proses' },
];

const monthlyTotal = 750000;
const yearlyTotal = 2400000;
const yearlyTarget = 5000000;
const progressPercent = (yearlyTotal / yearlyTarget) * 100;

export default function LazisnuTracker({ onNotif, onNavigate }: LazisnuTrackerProps) {
  const [showDonasi, setShowDonasi] = useState(false);
  const [donasiAmount, setDonasiAmount] = useState('');
  const [donasiType, setDonasiType] = useState('infaq');

  const handleDonasi = () => {
    if (donasiAmount) {
      onNotif?.(`Donasi ${donasiType} sebesar Rp ${Number(donasiAmount).toLocaleString('id-ID')} berhasil dikirim!`);
      setShowDonasi(false);
      setDonasiAmount('');
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-emerald-900 text-lg">LAZISNU Tracker</h3>
            <p className="text-sm text-emerald-500 mt-0.5">Riwayat donasi Anda</p>
          </div>
          <Heart className="w-5 h-5 text-rose-400" />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-3 text-white text-left hover:opacity-90 transition-opacity">
            <Wallet className="w-4 h-4 mb-1 opacity-80" />
            <p className="text-lg font-bold">Rp {(monthlyTotal / 1000).toFixed(0)}K</p>
            <p className="text-[10px] opacity-80">Total Bulan Ini</p>
          </button>
          <button className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl p-3 text-white text-left hover:opacity-90 transition-opacity">
            <Gift className="w-4 h-4 mb-1 opacity-80" />
            <p className="text-lg font-bold">Rp {(yearlyTotal / 1000000).toFixed(1)}Jt</p>
            <p className="text-[10px] opacity-80">Total Tahun Ini</p>
          </button>
        </div>

        {/* Progress */}
        <button className="w-full bg-emerald-50/60 rounded-xl p-3 mb-4 text-left hover:bg-emerald-50 transition-colors">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-emerald-600 font-medium">Target Tahunan</span>
            <span className="text-emerald-800 font-bold">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-emerald-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-emerald-400 mt-1.5">
            Rp {yearlyTotal.toLocaleString('id-ID')} / Rp {yearlyTarget.toLocaleString('id-ID')}
          </p>
        </button>

        {/* Recent Donations */}
        <div className="space-y-2">
          {donations.map((donation, i) => (
            <button key={i} className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-emerald-50/50 transition-colors text-left">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  donation.status === 'Tersalurkan' ? 'bg-emerald-100' : 'bg-amber-100'
                }`}>
                  <Heart className={`w-3.5 h-3.5 ${
                    donation.status === 'Tersalurkan' ? 'text-emerald-500' : 'text-amber-500'
                  }`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-emerald-800">{donation.type}</p>
                  <p className="text-[10px] text-emerald-400">{donation.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-emerald-700">{donation.amount}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  donation.status === 'Tersalurkan'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-amber-100 text-amber-600'
                }`}>
                  {donation.status}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setShowDonasi(true)}
            className="flex-1 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 active:scale-95"
          >
            <Heart className="w-3.5 h-3.5" />
            Donasi Sekarang
          </button>
          <button
            onClick={() => onNavigate?.('lazisnu')}
            className="py-2.5 px-3 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center active:scale-95"
          >
            Lihat Semua →
          </button>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonasi && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Donasi LAZISNU</h3>
                <button onClick={() => setShowDonasi(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm opacity-80 mt-1">Salurkan infaq Anda secara transparan</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Jenis Donasi</label>
                <select
                  value={donasiType}
                  onChange={(e) => setDonasiType(e.target.value)}
                  className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300"
                >
                  <option value="infaq">Infaq</option>
                  <option value="zakat">Zakat Fitrah</option>
                  <option value="zakat-mal">Zakat Mal</option>
                  <option value="shadaqah">Shadaqah</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Nominal (Rp)</label>
                <input
                  type="number"
                  value={donasiAmount}
                  onChange={(e) => setDonasiAmount(e.target.value)}
                  placeholder="Contoh: 100000"
                  className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300"
                />
              </div>
              <div className="flex gap-2">
                {[50000, 100000, 250000, 500000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setDonasiAmount(String(amt))}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                      donasiAmount === String(amt)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    {amt >= 1000000 ? `${amt / 1000000}Jt` : `${amt / 1000}K`}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowDonasi(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={handleDonasi}
                  className="flex-1 py-2.5 rounded-xl text-sm text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-90 transition-opacity font-medium"
                >
                  Kirim Donasi ❤️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
