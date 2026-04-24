import { useState } from 'react';
import {
  PlusCircle,
  Heart,
  FileText,
  CalendarCheck,
  UserPlus,
  Share2,
  X,
} from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (menu: string) => void;
}

export default function QuickActions({ onNavigate }: QuickActionsProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [invitePhone, setInvitePhone] = useState('');
  const [notif, setNotif] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const actions = [
    {
      icon: PlusCircle,
      label: 'Tambah Kontribusi',
      desc: 'Catat aktivitas baru',
      bgColor: 'bg-emerald-50',
      action: () => {
        onNavigate('kegiatan');
        showToast('Membuka form tambah kontribusi...');
      },
    },
    {
      icon: Heart,
      label: 'Donasi LAZISNU',
      desc: 'Salurkan infaq Anda',
      bgColor: 'bg-rose-50',
      action: () => {
        onNavigate('lazisnu');
        showToast('Membuka halaman LAZISNU...');
      },
    },
    {
      icon: FileText,
      label: 'Tulis Artikel',
      desc: 'Bagikan ilmu & opini',
      bgColor: 'bg-blue-50',
      action: () => {
        onNavigate('artikel');
        showToast('Membuka editor artikel...');
      },
    },
    {
      icon: CalendarCheck,
      label: 'Daftar Kegiatan',
      desc: 'Ikuti acara mendatang',
      bgColor: 'bg-amber-50',
      action: () => {
        onNavigate('kegiatan');
        showToast('Membuka jadwal kegiatan...');
      },
    },
    {
      icon: UserPlus,
      label: 'Ajak Anggota',
      desc: 'Undang warga Nahdliyin',
      bgColor: 'bg-purple-50',
      action: () => {
        setShowInviteModal(true);
      },
    },
    {
      icon: Share2,
      label: 'Bagikan Portal',
      desc: 'Sebarkan ke media sosial',
      bgColor: 'bg-cyan-50',
      action: () => {
        const url = 'https://nukedu.blogspot.com';
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            showToast('Link portal disalin ke clipboard!');
          }).catch(() => {
            showToast('Link: ' + url);
          });
        } else {
          showToast('Link: ' + url);
        }
      },
    },
  ];

  const handleInvite = () => {
    if (inviteName.trim() && invitePhone.trim()) {
      showToast(`Undangan berhasil dikirim ke ${inviteName}!`);
      setShowInviteModal(false);
      setInviteName('');
      setInvitePhone('');
    }
  };

  return (
    <>
      {/* Toast */}
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">
          ✅ {notif}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 md:p-6 h-full">
        <div className="mb-5">
          <h3 className="font-bold text-emerald-900 text-lg">Aksi Cepat</h3>
          <p className="text-sm text-emerald-500 mt-0.5">Shortcut untuk aktivitas utama</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                onClick={action.action}
                className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-emerald-100/60 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-100/30 transition-all duration-200 group hover:-translate-y-0.5 active:scale-95"
              >
                <div className={`${action.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-emerald-800 leading-tight">{action.label}</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">{action.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Undang Anggota Baru</h3>
                <button onClick={() => setShowInviteModal(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm opacity-80 mt-1">Ajak warga Nahdliyin bergabung di portal digital</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Nama Lengkap</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Nama calon anggota"
                  className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300"
                />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">No. WhatsApp</label>
                <input
                  type="tel"
                  value={invitePhone}
                  onChange={(e) => setInvitePhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300"
                />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Ranting</label>
                <select className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                  <option>Desa Kedu</option>
                  <option>Desa Candimulyo</option>
                  <option>Desa Salamsari</option>
                  <option>Desa Danurejo</option>
                  <option>Desa Mojotengah</option>
                  <option>Desa Karangtejo</option>
                  <option>Desa Mergowati</option>
                  <option>Desa Kutoanyar</option>
                  <option>Desa Bandunggede</option>
                  <option>Desa Gondangwayang</option>
                  <option>Desa Kalisari</option>
                  <option>Desa Kundisari</option>
                  <option>Desa Ngadimulyo</option>
                  <option>Desa Tegalsari</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Pesan Undangan (Opsional)</label>
                <textarea
                  rows={2}
                  placeholder="Assalamu'alaikum, mari bergabung di Portal Digital NU Kedu..."
                  className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300 resize-none"
                />
              </div>

              <div className="bg-emerald-50/60 rounded-xl p-3">
                <p className="text-xs text-emerald-600">
                  💡 Undangan akan dikirim via WhatsApp dengan link pendaftaran portal NU Kedu
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowInviteModal(false)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">
                  Batal
                </button>
                <button
                  onClick={handleInvite}
                  className="flex-1 py-2.5 rounded-xl text-sm text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Kirim Undangan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
