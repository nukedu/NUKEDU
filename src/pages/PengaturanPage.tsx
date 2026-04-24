import { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useUserSettings } from '../firebase/useUserSettings';
import {
  User, Bell, Shield, Palette, Save, ChevronRight,
} from 'lucide-react';

type TabType = 'profil' | 'notifikasi' | 'privasi' | 'tampilan';

export default function PengaturanPage() {
  const { profile, updateUserProfile } = useAuth();
  const { settings, updateSettings } = useUserSettings({
    notif: { email: true, push: true, sms: false, pengajian: true, rapat: true, forum: true, donasi: true, artikel: false, weeklyReport: true },
    privacy: { showProfile: true, showActivity: true, showDonation: false, showRanking: true },
    theme: 'light',
    language: 'id',
    fontSize: 'Normal'
  });

  const [activeTab, setActiveTab] = useState<TabType>('profil');
  const [notif, setNotif] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nama: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    ranting: profile?.village || 'Desa Kedu',
  });

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const handleUpdateProfile = async () => {
    await updateUserProfile({ name: formData.nama, phone: formData.phone, village: formData.ranting });
    showToast('Profil berhasil disimpan!');
  };

  return (
    <div className="space-y-6">
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">✅ {notif}</div>
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
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all active:scale-95 ${activeTab === item.id ? 'bg-emerald-50 text-emerald-800 font-medium' : 'text-emerald-600 hover:bg-emerald-50/50'}`}>
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-emerald-300" />
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Profil */}
          {activeTab === 'profil' && (
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-emerald-900 text-lg">Profil & Akun</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Nama Lengkap</label>
                  <input type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100" />
                </div>
                <div>
                  <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Email</label>
                  <input type="email" disabled value={formData.email} className="w-full bg-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none text-slate-500 border border-slate-100" />
                </div>
              </div>
              <button onClick={handleUpdateProfile} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 active:scale-95 flex items-center gap-2">
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>
          )}

          {/* Notifikasi */}
          {activeTab === 'notifikasi' && (
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-emerald-900 text-lg">Pengaturan Notifikasi</h3>
              <div className="space-y-3">
                {Object.entries(settings.notif).map(([key, enabled]) => (
                  <button key={key} onClick={() => updateSettings({ ...settings, notif: { ...settings.notif, [key]: !enabled } })} className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/40">
                    <span className="text-sm text-emerald-800 capitalize">{key}</span>
                    <div className={`w-10 h-5 rounded-full transition-colors relative ${enabled ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Privasi */}
          {activeTab === 'privasi' && (
            <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-emerald-900 text-lg">Privasi</h3>
              <div className="space-y-3">
                {Object.entries(settings.privacy).map(([key, enabled]) => (
                  <button key={key} onClick={() => updateSettings({ ...settings, privacy: { ...settings.privacy, [key]: !enabled } })} className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50/40">
                    <span className="text-sm text-emerald-800 capitalize">{key}</span>
                    <div className={`w-10 h-5 rounded-full transition-colors relative ${enabled ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
