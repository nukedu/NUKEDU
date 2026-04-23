import { Menu, Search, Bell, MessageSquare, ChevronDown, User, Settings, HelpCircle, LogOut, ExternalLink, Shield } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
  onNavigate: (menu: string) => void;
}

export default function Header({ onMenuToggle, onNavigate }: HeaderProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const closeDropdowns = () => {
    setShowNotif(false);
    setShowProfile(false);
  };

  const handleNavigate = (menu: string) => {
    closeDropdowns();
    onNavigate(menu);
  };

  const notifItems = [
    { title: 'Pengajian Besok Malam', desc: 'Jadwal pengajian rutin di Masjid Al-Ikhlas Ranting Kedu', time: '2 jam lalu', color: 'bg-emerald-500', read: false, icon: '🕌' },
    { title: 'Donasi Terkonfirmasi', desc: 'Infaq Anda sebesar Rp 100.000 telah diterima LAZISNU', time: '5 jam lalu', color: 'bg-blue-500', read: false, icon: '💝' },
    { title: "Forum: Diskusi Isra Mi'raj", desc: 'Ustadz Nur menjawab pertanyaan Anda di forum', time: '1 hari lalu', color: 'bg-amber-500', read: true, icon: '💬' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-emerald-100/80">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-emerald-50 text-emerald-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className={`hidden md:flex items-center rounded-xl px-4 py-2.5 w-80 gap-2 border transition-all ${
            searchFocused ? 'bg-white border-emerald-300 shadow-sm' : 'bg-emerald-50/80 border-emerald-100'
          }`}>
            <Search className="w-4 h-4 text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kegiatan, anggota, atau topik..."
              className="bg-transparent text-sm outline-none flex-1 text-emerald-800 placeholder:text-emerald-400"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="text-[10px] bg-emerald-100 text-emerald-500 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Forum */}
          <button
            onClick={() => handleNavigate('forum')}
            className="relative p-2.5 rounded-xl hover:bg-emerald-50 text-emerald-600 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
          </button>

          {/* Chat */}
          <button
            onClick={() => handleNavigate('chat')}
            className="relative p-2.5 rounded-xl hover:bg-emerald-50 text-emerald-600 transition-colors hidden sm:flex"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-5 h-5 bg-emerald-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">5</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
              className={`relative p-2.5 rounded-xl transition-colors ${
                showNotif ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-emerald-50 text-emerald-600'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">3</span>
            </button>

            {/* Notification Dropdown */}
            {showNotif && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden z-50">
                <div className="p-4 border-b border-emerald-50 flex items-center justify-between">
                  <h3 className="font-semibold text-emerald-800">Notifikasi</h3>
                  <button
                    onClick={() => {}}
                    className="text-[10px] text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    Tandai semua dibaca
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifItems.map((notif, i) => (
                    <button
                      key={i}
                      onClick={() => handleNavigate('notifikasi')}
                      className="w-full flex gap-3 p-4 hover:bg-emerald-50/50 transition-colors text-left"
                    >
                      <div className={`w-2 h-2 ${notif.color} rounded-full mt-2 shrink-0 ${!notif.read ? 'animate-pulse' : ''}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${notif.read ? 'text-emerald-700' : 'font-medium text-emerald-800'}`}>{notif.title}</p>
                        <p className="text-xs text-emerald-500 mt-0.5">{notif.desc}</p>
                        <p className="text-[10px] text-emerald-400 mt-1">{notif.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-3 border-t border-emerald-50 text-center">
                  <button
                    onClick={() => handleNavigate('notifikasi')}
                    className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    Lihat Semua Notifikasi →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
              className={`flex items-center gap-2 pl-3 ml-1 border-l border-emerald-100 transition-colors ${
                showProfile ? 'bg-emerald-50 rounded-xl' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs shadow">
                AH
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-emerald-800 leading-tight">Ahmad H.</p>
                <p className="text-[10px] text-emerald-500">Ranting Kedu</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-emerald-400 hidden md:block transition-transform ${showProfile ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Menu Dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden z-50">
                {/* Profile Header */}
                <div className="p-4 border-b border-emerald-50">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow">
                      AH
                    </div>
                    <div>
                      <p className="font-semibold text-emerald-800 text-sm">Ahmad Hidayat</p>
                      <p className="text-xs text-emerald-500">ahmad.hidayat@email.com</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <span className="text-[10px] text-emerald-400">Kontributor Aktif • Gold ⭐</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  {[
                    { label: 'Profil Saya', icon: User, menu: 'profil', desc: 'Kelola profil & data diri' },
                    { label: 'Pengaturan Akun', icon: Settings, menu: 'pengaturan', desc: 'Preferensi & keamanan' },
                    { label: 'Management Hak Akses', icon: Shield, menu: 'hak-akses', desc: 'Kelola pengguna & role' },
                    { label: 'Pusat Bantuan', icon: HelpCircle, menu: 'bantuan', desc: 'FAQ & panduan penggunaan' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.menu}
                        onClick={() => handleNavigate(item.menu)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-emerald-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                          <Icon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-emerald-800">{item.label}</p>
                          <p className="text-[10px] text-emerald-400">{item.desc}</p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-emerald-300 -rotate-90" />
                      </button>
                    );
                  })}
                </div>

                {/* Visit Website */}
                <div className="border-t border-emerald-50 py-1">
                  <a
                    href="https://nukedu.blogspot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-emerald-50 transition-colors"
                    onClick={closeDropdowns}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-emerald-800">Kunjungi Website</p>
                      <p className="text-[10px] text-emerald-400">nukedu.blogspot.com</p>
                    </div>
                  </a>
                </div>

                {/* Logout */}
                <div className="border-t border-emerald-50 py-1">
                  <button
                    onClick={() => {
                      closeDropdowns();
                      // Show logout confirmation
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-red-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                      <LogOut className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-600">Keluar</p>
                      <p className="text-[10px] text-red-400">Logout dari portal</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotif || showProfile) && (
        <div className="fixed inset-0 z-20" onClick={closeDropdowns} />
      )}
    </header>
  );
}
