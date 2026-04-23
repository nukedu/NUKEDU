import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Save,
  ChevronRight,
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageSquare,
} from 'lucide-react';

type TabType = 'profil' | 'notifikasi' | 'privasi' | 'tampilan';

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profil');
  const [showPassword, setShowPassword] = useState(false);
  const [notif, setNotif] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nama: 'Ahmad Hidayat',
    email: 'ahmad.hidayat@email.com',
    phone: '+62 812-3456-7890',
    ranting: 'NU Ranting Kedu',
    alamat: 'Jl. Raya Kedu No. 45, Kecamatan Kedu, Kabupaten Temanggung, Jawa Tengah',
  });

  const [notifSettings, setNotifSettings] = useState({
    email: true, push: true, sms: false,
    pengajian: true, rapat: true, forum: true, donasi: true, artikel: false, weeklyReport: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true, showActivity: true, showDonation: false, showRanking: true,
  });

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [language, setLanguage] = useState('id');
  const [fontSize, setFontSize] = useState('Normal');

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

      <div>
        <h1 className="text-2xl font-bold text-emerald-900">Pengaturan</h1>
        <p className="text-sm text-emerald-500 mt-1">Kelola preferensi akun dan portal Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Menu */}
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-4 space-y-1">
          {[
            { id: 'profil' as TabType, label: 'Profil & Akun', icon: User },
            { id: 'notifikasi' as TabType, label: 'Notifikasi', icon: Bell },
            { id: 'privasi' as TabType, label: 'Privasi & Keamanan', icon: Shield },
            { id: 'tampilan' as TabType, label: 'Tampilan', icon: Palette },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all active:scale-95 ${
                  activeTab === item.id ? 'bg-emerald-50 text-emerald-800 font-medium' : 'text-emerald-600 hover:bg-emerald-50/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-emerald-300" />
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Profil & Akun */}
          {activeTab === 'profil' && (
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-emerald-900 text-lg">Profil & Akun</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Nama Lengkap</label>
                  <input type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">No. Telepon</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Ranting</label>
                  <select value={formData.ranting} onChange={(e) => setFormData({ ...formData, ranting: e.target.value })} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 transition-colors">
                    <option>NU Ranting Kedu</option>
                    <option>NU Ranting Kedu Utara</option>
                    <option>NU Ranting Kedu Selatan</option>
                    <option>NU Ranting Ngadirejo</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Alamat</label>
                <textarea value={formData.alamat} onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} rows={3} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 transition-colors resize-none" />
              </div>
              <div className="pt-4 border-t border-emerald-50">
                <h4 className="font-semibold text-emerald-800 mb-3">Ubah Kata Sandi</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Kata Sandi Saat Ini</label>
                    <input type={showPassword ? 'text' : 'password'} defaultValue="••••••••" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 transition-colors pr-10" />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-emerald-400 hover:text-emerald-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div>
                    <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Kata Sandi Baru</label>
                    <input type="password" placeholder="Masukkan kata sandi baru" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 transition-colors" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => showToast('Profil berhasil disimpan!')} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95">
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* Notifikasi */}
          {activeTab === 'notifikasi' && (
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-emerald-900 text-lg">Pengaturan Notifikasi</h3>
              <div>
                <h4 className="font-semibold text-emerald-800 text-sm mb-3">Kanal Notifikasi</h4>
                <div className="space-y-3">
                  {[
                    { key: 'push' as const, label: 'Push Notification', desc: 'Notifikasi langsung di browser', icon: Smartphone },
                    { key: 'email' as const, label: 'Email', desc: 'Kirim notifikasi ke email', icon: Mail },
                    { key: 'sms' as const, label: 'SMS', desc: 'Notifikasi via pesan singkat', icon: MessageSquare },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button key={item.key} onClick={() => setNotifSettings({ ...notifSettings, [item.key]: !notifSettings[item.key] })} className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-emerald-500" />
                          <div>
                            <p className="text-sm font-medium text-emerald-800">{item.label}</p>
                            <p className="text-[10px] text-emerald-400">{item.desc}</p>
                          </div>
                        </div>
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${notifSettings[item.key] ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifSettings[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-800 text-sm mb-3">Kategori Notifikasi</h4>
                <div className="space-y-3">
                  {[
                    { key: 'pengajian' as const, label: 'Jadwal Pengajian', desc: 'Pengingat pengajian & kajian' },
                    { key: 'rapat' as const, label: 'Rapat & Koordinasi', desc: 'Jadwal rapat organisasi' },
                    { key: 'forum' as const, label: 'Forum Diskusi', desc: 'Balasan dan topik baru' },
                    { key: 'donasi' as const, label: 'LAZISNU & Donasi', desc: 'Status donasi & program' },
                    { key: 'artikel' as const, label: 'Artikel & Publikasi', desc: 'Artikel baru & komentar' },
                    { key: 'weeklyReport' as const, label: 'Laporan Mingguan', desc: 'Ringkasan aktivitas mingguan' },
                  ].map((item) => (
                    <button key={item.key} onClick={() => setNotifSettings({ ...notifSettings, [item.key]: !notifSettings[item.key] })} className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left">
                      <div>
                        <p className="text-sm font-medium text-emerald-800">{item.label}</p>
                        <p className="text-[10px] text-emerald-400">{item.desc}</p>
                      </div>
                      <div className={`w-10 h-5 rounded-full transition-colors relative ${notifSettings[item.key] ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifSettings[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => showToast('Pengaturan notifikasi disimpan!')} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95">
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </div>
          )}

          {/* Privasi */}
          {activeTab === 'privasi' && (
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-emerald-900 text-lg">Privasi & Keamanan</h3>
              <div>
                <h4 className="font-semibold text-emerald-800 text-sm mb-3">Visibilitas Profil</h4>
                <div className="space-y-3">
                  {[
                    { key: 'showProfile' as const, label: 'Tampilkan Profil Publik', desc: 'Anggota lain dapat melihat profil Anda' },
                    { key: 'showActivity' as const, label: 'Tampilkan Aktivitas', desc: 'Riwayat aktivitas terlihat di profil' },
                    { key: 'showDonation' as const, label: 'Tampilkan Riwayat Donasi', desc: 'Riwayat donasi Anda bersifat publik' },
                    { key: 'showRanking' as const, label: 'Tampilkan di Leaderboard', desc: 'Nama Anda muncul di papan peringkat' },
                  ].map((item) => (
                    <button key={item.key} onClick={() => setPrivacySettings({ ...privacySettings, [item.key]: !privacySettings[item.key] })} className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left">
                      <div>
                        <p className="text-sm font-medium text-emerald-800">{item.label}</p>
                        <p className="text-[10px] text-emerald-400">{item.desc}</p>
                      </div>
                      <div className={`w-10 h-5 rounded-full transition-colors relative ${privacySettings[item.key] ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${privacySettings[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-800 text-sm mb-3">Keamanan Akun</h4>
                <div className="space-y-3">
                  <button onClick={() => showToast('Fitur 2FA akan segera tersedia!')} className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="text-sm font-medium text-emerald-800">Autentikasi Dua Faktor</p>
                        <p className="text-[10px] text-emerald-400">Tingkatkan keamanan dengan 2FA</p>
                      </div>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-medium">Aktifkan</span>
                  </button>
                  <button onClick={() => showToast('2 sesi aktif ditemukan')} className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 hover:bg-emerald-50 transition-colors text-left">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="text-sm font-medium text-emerald-800">Sesi Aktif</p>
                        <p className="text-[10px] text-emerald-400">Kelola perangkat yang login</p>
                      </div>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-medium">Lihat (2)</span>
                  </button>
                </div>
              </div>
              <div className="pt-4 border-t border-red-100">
                <h4 className="font-semibold text-red-600 text-sm mb-2">Zona Berbahaya</h4>
                <p className="text-xs text-emerald-500 mb-3">Tindakan ini tidak dapat dibatalkan</p>
                <button onClick={() => showToast('Fitur ini dinonaktifkan untuk keamanan')} className="text-xs bg-red-50 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-100 transition-colors border border-red-200 active:scale-95">
                  Hapus Akun Saya
                </button>
              </div>
            </div>
          )}

          {/* Tampilan */}
          {activeTab === 'tampilan' && (
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-emerald-900 text-lg">Tampilan</h3>
              <div>
                <h4 className="font-semibold text-emerald-800 text-sm mb-3">Tema</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light' as const, label: 'Terang', icon: Sun, color: 'from-amber-100 to-yellow-50' },
                    { id: 'dark' as const, label: 'Gelap', icon: Moon, color: 'from-gray-800 to-gray-900' },
                    { id: 'system' as const, label: 'Sistem', icon: Smartphone, color: 'from-blue-100 to-indigo-50' },
                  ].map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id); showToast(`Tema diubah ke ${t.label}`); }}
                        className={`p-4 rounded-xl border-2 transition-all text-center active:scale-95 ${
                          theme === t.id ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-emerald-100 hover:border-emerald-200'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} mx-auto mb-2 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${t.id === 'dark' ? 'text-white' : 'text-emerald-600'}`} />
                        </div>
                        <p className="text-sm font-medium text-emerald-800">{t.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-800 text-sm mb-3">Bahasa</h4>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  <select value={language} onChange={(e) => { setLanguage(e.target.value); showToast('Bahasa berhasil diubah!'); }} className="bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 transition-colors">
                    <option value="id">Bahasa Indonesia</option>
                    <option value="jv">Bahasa Jawa</option>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-800 text-sm mb-3">Ukuran Teks</h4>
                <div className="flex items-center gap-3">
                  {['Kecil', 'Normal', 'Besar'].map((size) => (
                    <button
                      key={size}
                      onClick={() => { setFontSize(size); showToast(`Ukuran teks: ${size}`); }}
                      className={`px-4 py-2 rounded-xl text-sm transition-all active:scale-95 ${
                        fontSize === size ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => showToast('Pengaturan tampilan disimpan!')} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95">
                  <Save className="w-4 h-4" /> Simpan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
