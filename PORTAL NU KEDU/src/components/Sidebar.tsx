import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Heart,
  Settings,
  BookOpen,
  FileText,
  Bell,
  LogOut,
  X,
  ChevronRight,
  Landmark,
  Network,
  ChevronDown,
  UserPlus,
  ShieldCheck,
  Send,
  Clock,
  Archive,
  Image,
  HelpCircle,
  Scale,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

const mainMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profil', label: 'Profil Saya', icon: Users },
  { id: 'kegiatan', label: 'Kegiatan', icon: Calendar },
  { id: 'pengajian', label: 'Jadwal Pengajian', icon: BookOpen },
];

const orgMenu = [
  { id: 'kelembagaan', label: 'Kelembagaan & Banom', icon: Landmark },
  { id: 'ranting', label: 'Jaringan Ranting', icon: Network },
  { id: 'pendaftaran', label: 'Pendaftaran Anggota', icon: UserPlus },
  { id: 'arsip', label: 'Arsip & Dokumentasi', icon: Archive },
  { id: 'gallery', label: 'Gallery Foto & Video', icon: Image },
];

const digitalMenu = [
  { id: 'forum', label: 'Forum Diskusi', icon: MessageSquare },
  { id: 'chat', label: 'Chat Anggota', icon: Send, badge: 5 },
  { id: 'lazisnu', label: 'LAZISNU', icon: Heart },
  { id: 'artikel', label: 'Artikel & Tulisan', icon: FileText },
];

const systemMenu = [
  { id: 'hak-akses', label: 'Management Hak Akses', icon: ShieldCheck },
  { id: 'masa-hidmat', label: 'Masa Hidmat Jabatan', icon: Clock },
  { id: 'notifikasi', label: 'Notifikasi', icon: Bell, badge: 3 },
  { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  { id: 'bantuan', label: 'Pusat Bantuan', icon: HelpCircle },
  { id: 'legal', label: 'Kebijakan & Hukum', icon: Scale },
];

interface MenuGroupProps {
  title: string;
  items: typeof mainMenu & { badge?: number }[];
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  onClose: () => void;
  defaultOpen?: boolean;
}

function MenuGroup({ title, items, activeMenu, onMenuChange, onClose, defaultOpen = true }: MenuGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-1.5 mb-1"
      >
        <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-semibold">{title}</span>
        <ChevronDown className={`w-3 h-3 text-emerald-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-0.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            const hasBadge = 'badge' in item;
            return (
              <button
                key={item.id}
                onClick={() => { onMenuChange(item.id); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group
                  ${isActive
                    ? 'bg-white/15 text-white shadow-lg shadow-emerald-900/20'
                    : 'text-emerald-200 hover:bg-white/8 hover:text-white'
                  }`}
              >
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-emerald-300' : 'text-emerald-400 group-hover:text-emerald-300'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-emerald-300" />}
                {hasBadge && (
                  <span className="w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">{(item as any).badge}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ isOpen, onClose, activeMenu, onMenuChange }: SidebarProps) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white z-50 transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-emerald-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
              <img
                src="https://blogger.googleusercontent.com/img/a/AVvXsEikG35dotK_WNbgzE5vy4Q-9jWR1OlXf4p15XQDgN9lmx-0rY-trv76AA1L3WfZpLd-1djjLhzd_nqoznWh3WeTmegX144L5QoL3nGSHW5Wv8c8d_Z_tQCwxZqKBicaXYtORbEEOIDvai-OcVeZ8FX5jf7guBCUAMdp43oBztqG-gR0R4akiEiJnjSrsXAL"
                alt="MWC NU Kedu"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">MWC NU</h2>
              <p className="text-emerald-300 text-xs">Kec. Kedu, Temanggung</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-emerald-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="px-6 py-4 border-b border-emerald-700/50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            AH
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">Ahmad Hidayat</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-emerald-300 text-xs">Kontributor Aktif</span>
            </div>
          </div>
        </div>
        <div className="mt-3 bg-emerald-700/40 rounded-lg p-2.5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-emerald-200">Level Kontribusi</span>
            <span className="font-bold text-amber-300">Gold ⭐</span>
          </div>
          <div className="w-full bg-emerald-900/60 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-300 h-1.5 rounded-full" style={{ width: '78%' }} />
          </div>
          <p className="text-[10px] text-emerald-300 mt-1">780 / 1000 poin menuju Platinum</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-3 overflow-y-auto">
        <MenuGroup title="Menu Utama" items={mainMenu} activeMenu={activeMenu} onMenuChange={onMenuChange} onClose={onClose} />
        <MenuGroup title="Kelembagaan" items={orgMenu} activeMenu={activeMenu} onMenuChange={onMenuChange} onClose={onClose} />
        <MenuGroup title="Portal Digital" items={digitalMenu} activeMenu={activeMenu} onMenuChange={onMenuChange} onClose={onClose} />
        <MenuGroup title="Sistem" items={systemMenu} activeMenu={activeMenu} onMenuChange={onMenuChange} onClose={onClose} />
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-emerald-700/50">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-emerald-300 hover:bg-red-500/20 hover:text-red-300 transition-all">
          <LogOut className="w-[18px] h-[18px]" />
          <span>Keluar</span>
        </button>
        <p className="text-center text-[10px] text-emerald-600 mt-3">v2.1.0 — Portal Digital NU Kedu</p>
      </div>
    </aside>
  );
}
