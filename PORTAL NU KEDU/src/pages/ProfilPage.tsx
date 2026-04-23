import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit3,
  Camera,
  Award,
  Star,
  BookOpen,
  Heart,
  Users,
  Clock,
  CheckCircle,
  ChevronRight,
  X,
  Save,
} from 'lucide-react';

const achievements = [
  { icon: '🏆', title: 'Kontributor Emas', desc: '100+ kontribusi tercatat', unlocked: true },
  { icon: '🕌', title: 'Aktifis Pengajian', desc: 'Hadir 20+ pengajian rutin', unlocked: true },
  { icon: '💝', title: 'Dermaawan', desc: 'Donasi lebih dari Rp 1 Juta', unlocked: true },
  { icon: '📝', title: 'Penulis Produktif', desc: 'Terbitkan 10+ artikel', unlocked: false },
  { icon: '👥', title: 'Perekrut Handal', desc: 'Ajak 15+ anggota baru', unlocked: false },
  { icon: '🌟', title: 'Bintang Forum', desc: '50+ postingan di forum', unlocked: true },
];

const initialHistory = [
  { date: '14 Jan 2026', action: 'Menghadiri Pengajian Rutin Ahad Wage', type: 'kegiatan' },
  { date: '12 Jan 2026', action: 'Menulis Artikel "Hikmah Hari Santri"', type: 'artikel' },
  { date: '10 Jan 2026', action: 'Donasi Infaq Masjid Rp 150.000', type: 'donasi' },
  { date: '8 Jan 2026', action: 'Membalas diskusi di Forum Kajian Quran', type: 'forum' },
  { date: '5 Jan 2026', action: 'Verifikasi 3 anggota baru Ranting Kedu', type: 'admin' },
  { date: '3 Jan 2026', action: 'Menghadiri Rapat Koordinasi MWC NU', type: 'kegiatan' },
];

const typeColors: Record<string, string> = {
  kegiatan: 'bg-emerald-100 text-emerald-700',
  artikel: 'bg-blue-100 text-blue-700',
  donasi: 'bg-rose-100 text-rose-700',
  forum: 'bg-amber-100 text-amber-700',
  admin: 'bg-purple-100 text-purple-700',
};

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'riwayat' | 'penghargaan'>('info');
  const [showEdit, setShowEdit] = useState(false);
  const [notif, setNotif] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    nama: 'Ahmad Hidayat',
    email: 'ahmad.hidayat@email.com',
    phone: '+62 812-3456-7890',
    alamat: 'Jl. Raya Kedu No. 45, Temanggung',
  });
  const [avatarModal, setAvatarModal] = useState(false);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">
          ✅ {notif}
        </div>
      )}

      {/* Avatar Modal */}
      {avatarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <h3 className="font-bold text-emerald-900 text-lg mb-4">Ubah Foto Profil</h3>
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
              AH
            </div>
            <p className="text-sm text-emerald-500 mb-4">Pilih foto baru untuk profil Anda</p>
            <div className="flex gap-3">
              <button onClick={() => setAvatarModal(false)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">Batal</button>
              <button onClick={() => { setAvatarModal(false); showToast('Foto profil berhasil diperbarui!'); }} className="flex-1 py-2.5 rounded-xl text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors font-medium">
                Upload Foto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Edit Profil</h3>
                <button onClick={() => setShowEdit(false)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Nama Lengkap</label>
                <input type="text" value={editData.nama} onChange={(e) => setEditData({ ...editData, nama: e.target.value })} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Email</label>
                <input type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">No. Telepon</label>
                <input type="tel" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Alamat</label>
                <textarea value={editData.alamat} onChange={(e) => setEditData({ ...editData, alamat: e.target.value })} rows={2} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowEdit(false)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">Batal</button>
                <button onClick={() => { setShowEdit(false); showToast('Profil berhasil diperbarui!'); }} className="flex-1 py-2.5 rounded-xl text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden">
        <div className="h-36 md:h-48 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 relative">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <pattern id="mosque" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 10 L50 40 L30 40 Z" fill="white" opacity="0.3" />
                <circle cx="40" cy="15" r="3" fill="white" opacity="0.3" />
              </pattern>
              <rect width="400" height="200" fill="url(#mosque)" />
            </svg>
          </div>
          <button
            onClick={() => showToast('Upload sampul baru berhasil!')}
            className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 hover:bg-white/30 transition-colors"
          >
            <Camera className="w-3.5 h-3.5" />
            Ubah Sampul
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-3xl shadow-xl border-4 border-white">
                AH
              </div>
              <button
                onClick={() => setAvatarModal(true)}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-emerald-600 transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 sm:pb-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h2 className="text-xl font-bold text-emerald-900">{editData.nama}</h2>
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full w-fit">
                  <Star className="w-3 h-3" /> Gold Contributor
                </span>
              </div>
              <p className="text-sm text-emerald-500 mt-1">Anggota Aktif — Ranting NU Kedu</p>
            </div>

            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors w-fit active:scale-95"
            >
              <Edit3 className="w-4 h-4" /> Edit Profil
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-emerald-50">
            {[
              { icon: Award, value: '780', label: 'Poin Kontribusi', color: 'text-amber-600' },
              { icon: Calendar, value: '34', label: 'Kegiatan Diikuti', color: 'text-emerald-600' },
              { icon: Heart, value: 'Rp 2.4Jt', label: 'Total Donasi', color: 'text-rose-600' },
              { icon: Users, value: '12', label: 'Anggota Diundang', color: 'text-blue-600' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <button key={i} className="text-center hover:scale-105 transition-transform">
                  <Icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                  <p className="text-lg font-bold text-emerald-900">{stat.value}</p>
                  <p className="text-xs text-emerald-500">{stat.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl border border-emerald-100/60 p-1 gap-1">
        {[
          { id: 'info' as const, label: 'Informasi Pribadi' },
          { id: 'riwayat' as const, label: 'Riwayat Aktivitas' },
          { id: 'penghargaan' as const, label: 'Penghargaan' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
              activeTab === tab.id ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-500 hover:bg-emerald-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-emerald-900 text-lg">Data Pribadi</h3>
              <button onClick={() => setShowEdit(true)} className="text-xs text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1">
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>
            <div className="space-y-4">
              {[
                { icon: User, label: 'Nama Lengkap', value: editData.nama },
                { icon: Mail, label: 'Email', value: editData.email },
                { icon: Phone, label: 'No. Telepon', value: editData.phone },
                { icon: MapPin, label: 'Alamat', value: editData.alamat },
                { icon: Calendar, label: 'Bergabung', value: '15 Maret 2024' },
                { icon: Shield, label: 'Ranting', value: 'NU Ranting Kedu' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <button key={i} onClick={() => showToast(`Detail: ${item.label}`)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-400 uppercase tracking-wide">{item.label}</p>
                      <p className="text-sm font-medium text-emerald-800">{item.value}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
            <h3 className="font-bold text-emerald-900 text-lg mb-4">Data Organisasi</h3>
            <div className="space-y-4">
              {[
                { icon: Shield, label: 'Organisasi Induk', value: 'MWC NU Kecamatan Kedu' },
                { icon: Users, label: 'Ranting', value: 'NU Ranting Kedu' },
                { icon: Star, label: 'Jabatan', value: 'Anggota Aktif / Kontributor' },
                { icon: BookOpen, label: 'Bidang', value: 'Dakwah & Media Digital' },
                { icon: CheckCircle, label: 'Status Keanggotaan', value: 'Aktif — Terverifikasi' },
                { icon: Clock, label: 'Masa Aktif', value: '2 Tahun (sejak 2024)' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <button key={i} onClick={() => showToast(`Detail: ${item.label}`)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-400 uppercase tracking-wide">{item.label}</p>
                      <p className="text-sm font-medium text-emerald-800">{item.value}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-amber-800">Level: Gold ⭐</span>
                <span className="text-xs font-bold text-amber-600">780 / 1000</span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-amber-400 to-yellow-400 h-2.5 rounded-full" style={{ width: '78%' }} />
              </div>
              <p className="text-xs text-amber-600 mt-2">220 poin lagi menuju Platinum! 🚀</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'riwayat' && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6">
          <h3 className="font-bold text-emerald-900 text-lg mb-5">Riwayat Aktivitas</h3>
          <div className="space-y-3">
            {initialHistory.map((item, i) => (
              <button key={i} onClick={() => showToast(`Detail: ${item.action}`)} className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-emerald-50/50 transition-colors text-left active:scale-[0.99]">
                <div className="w-10 text-center shrink-0">
                  <p className="text-xs font-bold text-emerald-800">{item.date.split(' ')[0]}</p>
                  <p className="text-[10px] text-emerald-400">{item.date.split(' ').slice(1).join(' ')}</p>
                </div>
                <div className="w-px h-8 bg-emerald-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-emerald-800 font-medium">{item.action}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${typeColors[item.type]}`}>{item.type}</span>
                <ChevronRight className="w-4 h-4 text-emerald-300 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'penghargaan' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach, i) => (
            <button
              key={i}
              onClick={() => showToast(ach.unlocked ? `🏆 ${ach.title}: ${ach.desc}` : `${ach.title} masih terkunci!`)}
              className={`bg-white rounded-2xl border shadow-sm p-5 transition-all hover:shadow-md text-left active:scale-[0.98] ${
                ach.unlocked ? 'border-emerald-100/60 hover:-translate-y-0.5' : 'border-gray-100 opacity-60 grayscale'
              }`}
            >
              <div className="text-4xl mb-3">{ach.icon}</div>
              <h4 className="font-bold text-emerald-900">{ach.title}</h4>
              <p className="text-sm text-emerald-500 mt-1">{ach.desc}</p>
              <div className="mt-3">
                {ach.unlocked ? (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">✅ Terbuka</span>
                ) : (
                  <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">🔒 Terkunci</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
