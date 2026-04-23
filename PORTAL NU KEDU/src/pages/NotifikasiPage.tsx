import { useState } from 'react';
import {
  Check,
  CheckCheck,
  Filter,
  Heart,
  MessageSquare,
  Calendar,
  Users,
  FileText,
  AlertCircle,
  Settings,
  BellOff,
  Clock,
  Trash2,
} from 'lucide-react';

type FilterType = 'semua' | 'belum-dibaca' | 'kegiatan' | 'forum' | 'donasi';

const initialNotifications = [
  { id: 1, icon: Calendar, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', title: 'Pengajian Besok Malam', desc: 'Jadwal pengajian rutin Ahad Wage di Masjid Al-Ikhlas pukul 20:00 WIB', time: '2 jam lalu', read: false, category: 'kegiatan' },
  { id: 2, icon: Heart, iconColor: 'text-rose-600', iconBg: 'bg-rose-50', title: 'Donasi Terkonfirmasi', desc: 'Infaq Anda sebesar Rp 150.000 untuk Masjid Al-Ikhlas telah diterima LAZISNU', time: '5 jam lalu', read: false, category: 'donasi' },
  { id: 3, icon: MessageSquare, iconColor: 'text-blue-600', iconBg: 'bg-blue-50', title: "Balasan Forum: Isra Mi'raj", desc: "Ustadz Nur menjawab pertanyaan Anda di diskusi \"Hikmah Isra Mi'raj\"", time: '1 hari lalu', read: false, category: 'forum' },
  { id: 4, icon: Users, iconColor: 'text-purple-600', iconBg: 'bg-purple-50', title: 'Anggota Baru di Ranting Anda', desc: '3 anggota baru telah bergabung dengan NU Ranting Kedu dan menunggu verifikasi', time: '1 hari lalu', read: true, category: 'kegiatan' },
  { id: 5, icon: FileText, iconColor: 'text-amber-600', iconBg: 'bg-amber-50', title: 'Artikel Anda Dipublikasikan', desc: 'Artikel "Hikmah Hari Santri Nasional" telah disetujui dan dipublikasikan', time: '2 hari lalu', read: true, category: 'forum' },
  { id: 6, icon: AlertCircle, iconColor: 'text-red-600', iconBg: 'bg-red-50', title: 'Pengingat: Rapat Koordinasi', desc: 'Rapat koordinasi MWC NU akan dilaksanakan 18 Januari 2026 pukul 09:00 WIB', time: '2 hari lalu', read: true, category: 'kegiatan' },
  { id: 7, icon: Heart, iconColor: 'text-rose-600', iconBg: 'bg-rose-50', title: 'Donasi Program Beasiswa', desc: 'Program Beasiswa Anak Yatim telah mencapai 62% dari target. Terima kasih!', time: '3 hari lalu', read: true, category: 'donasi' },
  { id: 8, icon: MessageSquare, iconColor: 'text-blue-600', iconBg: 'bg-blue-50', title: 'Topik Baru: Digitalisasi Ranting', desc: 'Ahmad Hidayat memulai diskusi baru tentang panduan digitalisasi administrasi', time: '4 hari lalu', read: true, category: 'forum' },
];

export default function NotifikasiPage() {
  const [filter, setFilter] = useState<FilterType>('semua');
  const [notifs, setNotifs] = useState(initialNotifications);
  const [showSettings, setShowSettings] = useState(false);
  const [notifConfig, setNotifConfig] = useState({
    kegiatan: true, forum: true, donasi: true, artikel: true, push: true, email: true,
  });

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filtered = filter === 'semua'
    ? notifs
    : filter === 'belum-dibaca'
      ? notifs.filter((n) => !n.read)
      : notifs.filter((n) => n.category === filter);

  const markAsRead = (id: number) => {
    setNotifs(notifs.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const deleteNotif = (id: number) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Notifikasi</h1>
          <p className="text-sm text-emerald-500 mt-1">
            {unreadCount > 0
              ? `Anda memiliki ${unreadCount} notifikasi belum dibaca`
              : 'Semua notifikasi sudah dibaca ✓'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-2 rounded-xl text-xs font-medium hover:bg-emerald-100 transition-colors active:scale-95"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Tandai Semua Dibaca
            </button>
          )}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors active:scale-95 ${
              showSettings ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Pengaturan
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-emerald-900">Pengaturan Notifikasi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'kegiatan' as const, label: 'Notifikasi Kegiatan' },
              { key: 'forum' as const, label: 'Notifikasi Forum' },
              { key: 'donasi' as const, label: 'Notifikasi Donasi' },
              { key: 'artikel' as const, label: 'Notifikasi Artikel' },
              { key: 'push' as const, label: 'Push Notification' },
              { key: 'email' as const, label: 'Notifikasi Email' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setNotifConfig({ ...notifConfig, [item.key]: !notifConfig[item.key] })}
                className={`flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                  notifConfig[item.key] ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-sm text-emerald-800 font-medium">{item.label}</span>
                <div className={`w-10 h-5 rounded-full transition-colors relative ${
                  notifConfig[item.key] ? 'bg-emerald-500' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    notifConfig[item.key] ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 bg-white rounded-xl border border-emerald-100/60 p-3">
        <Filter className="w-4 h-4 text-emerald-400 mr-1" />
        {([
          { id: 'semua', label: 'Semua' },
          { id: 'belum-dibaca', label: `Belum Dibaca (${unreadCount})` },
          { id: 'kegiatan', label: 'Kegiatan' },
          { id: 'forum', label: 'Forum' },
          { id: 'donasi', label: 'Donasi' },
        ] as { id: FilterType; label: string }[]).map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${
              filter === f.id ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <BellOff className="w-12 h-12 text-emerald-200 mx-auto mb-3" />
            <p className="text-emerald-500 font-medium">Tidak ada notifikasi</p>
            <p className="text-sm text-emerald-400 mt-1">Notifikasi baru akan muncul di sini</p>
          </div>
        ) : (
          <div className="divide-y divide-emerald-50">
            {filtered.map((notif) => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  className={`flex items-start gap-4 p-4 hover:bg-emerald-50/30 transition-colors cursor-pointer ${
                    !notif.read ? 'bg-emerald-50/20' : ''
                  }`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className={`${notif.iconBg} p-2.5 rounded-xl shrink-0 mt-0.5 relative`}>
                    <Icon className={`w-4 h-4 ${notif.iconColor}`} />
                    {!notif.read && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${!notif.read ? 'font-bold text-emerald-900' : 'font-medium text-emerald-700'}`}>
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-emerald-400 shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-500 mt-0.5">{notif.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 mt-1">
                    {!notif.read && (
                      <button
                        onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}
                        className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-400 hover:text-emerald-600 transition-colors"
                        title="Tandai sudah dibaca"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id); }}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-emerald-400 hover:text-red-500 transition-colors"
                      title="Hapus notifikasi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
