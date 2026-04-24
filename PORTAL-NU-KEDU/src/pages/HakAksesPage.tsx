import { useState } from 'react';
import {
  Users,
  Search,
  X,
  Edit3,
  Trash2,
  Plus,
  Check,
  ChevronRight,
  Lock,
  Unlock,
  Shield,
  CheckCircle,
  AlertCircle,
  Filter,
} from 'lucide-react';

type TabType = 'users' | 'roles' | 'permissions';

const roles = [
  { id: 'super-admin', name: 'Super Admin', desc: 'Akses penuh ke seluruh sistem', color: 'bg-red-100 text-red-700', users: 2, level: 1 },
  { id: 'admin-mwc', name: 'Admin MWC', desc: 'Pengelolaan seluruh ranting & banom', color: 'bg-amber-100 text-amber-700', users: 3, level: 2 },
  { id: 'ketua-ranting', name: 'Ketua Ranting', desc: 'Kelola anggota & kegiatan ranting', color: 'bg-emerald-100 text-emerald-700', users: 14, level: 3 },
  { id: 'sekretaris', name: 'Sekretaris', desc: 'Kelola administrasi & artikel', color: 'bg-blue-100 text-blue-700', users: 14, level: 3 },
  { id: 'bendahara', name: 'Bendahara', desc: 'Kelola keuangan & LAZISNU', color: 'bg-purple-100 text-purple-700', users: 14, level: 3 },
  { id: 'kontributor', name: 'Kontributor Aktif', desc: 'Kontribusi penuh, forum, donasi', color: 'bg-teal-100 text-teal-700', users: 125, level: 4 },
  { id: 'anggota', name: 'Anggota', desc: 'Akses dasar portal', color: 'bg-gray-100 text-gray-700', users: 342, level: 5 },
];

const users = [
  { id: 1, name: 'KH. Abdul Mu\'ti', email: 'abdul.muti@mwcnu.or.id', role: 'super-admin', village: 'MWC NU Kedu', status: 'active', lastLogin: '2 menit lalu', avatar: 'AM' },
  { id: 2, name: 'Dr. H. Ahmad Fauzi', email: 'ahmad.fauzi@mwcnu.or.id', role: 'super-admin', village: 'MWC NU Kedu', status: 'active', lastLogin: '1 jam lalu', avatar: 'AF' },
  { id: 3, name: 'H. Nur Hidayat', email: 'nur.hidayat@mwcnu.or.id', role: 'admin-mwc', village: 'MWC NU Kedu', status: 'active', lastLogin: '30 menit lalu', avatar: 'NH' },
  { id: 4, name: 'Ahmad Hidayat', email: 'ahmad.hidayat@email.com', role: 'kontributor', village: 'Desa Kedu', status: 'active', lastLogin: '5 menit lalu', avatar: 'AH' },
  { id: 5, name: 'Siti Aminah', email: 'siti.aminah@email.com', role: 'kontributor', village: 'Desa Candimulyo', status: 'active', lastLogin: '2 jam lalu', avatar: 'SA' },
  { id: 6, name: 'Muhammad Rizki', email: 'rizki@email.com', role: 'ketua-ranting', village: 'Desa Danurejo', status: 'active', lastLogin: '1 hari lalu', avatar: 'MR' },
  { id: 7, name: 'Fatimah Azzahra', email: 'fatimah@email.com', role: 'sekretaris', village: 'Desa Kedu', status: 'active', lastLogin: '3 jam lalu', avatar: 'FA' },
  { id: 8, name: 'H. Slamet Riyadi', email: 'slamet@email.com', role: 'ketua-ranting', village: 'Desa Mojotengah', status: 'active', lastLogin: '5 jam lalu', avatar: 'SR' },
  { id: 9, name: 'Budi Santoso', email: 'budi@email.com', role: 'anggota', village: 'Desa Salamsari', status: 'inactive', lastLogin: '7 hari lalu', avatar: 'BS' },
  { id: 10, name: 'Rina Wati', email: 'rina@email.com', role: 'anggota', village: 'Desa Mergowati', status: 'suspended', lastLogin: '30 hari lalu', avatar: 'RW' },
];

const permissions = [
  { category: 'Dashboard', items: ['Lihat Statistik', 'Lihat Aktivitas', 'Ekspor Laporan'] },
  { category: 'Anggota', items: ['Lihat Daftar Anggota', 'Tambah Anggota', 'Edit Anggota', 'Hapus Anggota', 'Verifikasi Pendaftaran'] },
  { category: 'Kegiatan', items: ['Lihat Kegiatan', 'Buat Kegiatan', 'Edit Kegiatan', 'Hapus Kegiatan', 'Kelola Peserta'] },
  { category: 'Forum', items: ['Lihat Forum', 'Buat Thread', 'Balas Thread', 'Moderasi Thread', 'Hapus Thread'] },
  { category: 'LAZISNU', items: ['Lihat Donasi', 'Kelola Donasi', 'Lihat Laporan', 'Verifikasi Donasi', 'Kelola Program'] },
  { category: 'Artikel', items: ['Lihat Artikel', 'Tulis Artikel', 'Edit Artikel', 'Publish Artikel', 'Hapus Artikel'] },
  { category: 'Kelembagaan', items: ['Lihat Struktur', 'Edit Struktur', 'Kelola Banom', 'Kelola Lembaga'] },
  { category: 'Sistem', items: ['Kelola Pengguna', 'Kelola Hak Akses', 'Pengaturan Sistem', 'Lihat Log Aktivitas'] },
];

const roleColorMap: Record<string, string> = {
  'super-admin': 'bg-red-100 text-red-700',
  'admin-mwc': 'bg-amber-100 text-amber-700',
  'ketua-ranting': 'bg-emerald-100 text-emerald-700',
  'sekretaris': 'bg-blue-100 text-blue-700',
  'bendahara': 'bg-purple-100 text-purple-700',
  'kontributor': 'bg-teal-100 text-teal-700',
  'anggota': 'bg-gray-100 text-gray-700',
};

const roleNameMap: Record<string, string> = {
  'super-admin': 'Super Admin',
  'admin-mwc': 'Admin MWC',
  'ketua-ranting': 'Ketua Ranting',
  'sekretaris': 'Sekretaris',
  'bendahara': 'Bendahara',
  'kontributor': 'Kontributor Aktif',
  'anggota': 'Anggota',
};

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Aktif' },
  inactive: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Nonaktif' },
  suspended: { bg: 'bg-red-100', text: 'text-red-700', label: 'Suspended' },
};

export default function HakAksesPage() {
  const [tab, setTab] = useState<TabType>('users');
  const [notif, setNotif] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditRole, setShowEditRole] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState('semua');
  const [userList, setUserList] = useState(users);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'anggota', village: 'Desa Kedu' });

  const showToast = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  const filteredUsers = userList.filter((u) => {
    const matchSearch = !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = filterRole === 'semua' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user = {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        village: newUser.village,
        status: 'active' as const,
        lastLogin: 'Baru',
        avatar: newUser.name.split(' ').slice(0, 2).map(n => n[0]).join(''),
      };
      setUserList([user, ...userList]);
      setShowAddUser(false);
      setNewUser({ name: '', email: '', role: 'anggota', village: 'Desa Kedu' });
      showToast(`Pengguna ${newUser.name} berhasil ditambahkan!`);
    }
  };

  const handleToggleStatus = (id: number) => {
    setUserList(userList.map((u) => {
      if (u.id === id) {
        const newStatus = u.status === 'active' ? 'inactive' : 'active';
        showToast(`${u.name}: Status diubah ke ${newStatus === 'active' ? 'Aktif' : 'Nonaktif'}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id: number) => {
    const user = userList.find(u => u.id === id);
    setUserList(userList.filter(u => u.id !== id));
    showToast(`Pengguna ${user?.name} berhasil dihapus`);
  };

  const handleChangeRole = (id: number, newRole: string) => {
    setUserList(userList.map(u => u.id === id ? { ...u, role: newRole } : u));
    setShowEditRole(null);
    showToast(`Role berhasil diubah ke ${roleNameMap[newRole]}`);
  };

  return (
    <div className="space-y-6">
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">✅ {notif}</div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Management Hak Akses</h1>
          <p className="text-sm text-emerald-500 mt-1">Kelola pengguna, peran, dan hak akses portal NU Kedu</p>
        </div>
        <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm active:scale-95">
          <Plus className="w-4 h-4" /> Tambah Pengguna
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Pengguna', value: userList.length.toString(), icon: Users, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Aktif', value: userList.filter(u => u.status === 'active').length.toString(), icon: CheckCircle, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Role Tersedia', value: roles.length.toString(), icon: Shield, bg: 'bg-amber-50', color: 'text-amber-600' },
          { label: 'Nonaktif/Suspended', value: userList.filter(u => u.status !== 'active').length.toString(), icon: AlertCircle, bg: 'bg-red-50', color: 'text-red-600' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-emerald-100/60 shadow-sm">
              <div className={`${s.bg} p-2 rounded-xl w-fit mb-2`}><Icon className={`w-4 h-4 ${s.color}`} /></div>
              <p className="text-xl font-bold text-emerald-900">{s.value}</p>
              <p className="text-xs text-emerald-500">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl border border-emerald-100/60 p-1 gap-1">
        {[
          { id: 'users' as TabType, label: 'Pengguna', icon: Users },
          { id: 'roles' as TabType, label: 'Peran (Role)', icon: Shield },
          { id: 'permissions' as TabType, label: 'Hak Akses', icon: Lock },
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

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Tambah Pengguna Baru</h3>
                <button onClick={() => setShowAddUser(false)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Nama Lengkap *</label>
                <input type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} placeholder="Nama pengguna" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Email *</label>
                <input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} placeholder="email@contoh.com" className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300" />
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Peran (Role)</label>
                <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                  {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-emerald-500 font-medium mb-1.5 block">Ranting</label>
                <select value={newUser.village} onChange={(e) => setNewUser({...newUser, village: e.target.value})} className="w-full bg-emerald-50 rounded-xl px-4 py-2.5 text-sm outline-none text-emerald-800 border border-emerald-100 focus:border-emerald-300">
                  {['MWC NU Kedu', 'Desa Kedu', 'Desa Candimulyo', 'Desa Salamsari', 'Desa Danurejo', 'Desa Mojotengah', 'Desa Karangtejo', 'Desa Mergowati', 'Desa Kutoanyar', 'Desa Bandunggede', 'Desa Gondangwayang', 'Desa Kalisari', 'Desa Kundisari', 'Desa Ngadimulyo', 'Desa Tegalsari'].map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddUser(false)} className="flex-1 py-2.5 rounded-xl text-sm text-emerald-600 hover:bg-emerald-50 transition-colors font-medium">Batal</button>
                <button onClick={handleAddUser} className="flex-1 py-2.5 rounded-xl text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-colors font-medium active:scale-95">Tambah Pengguna</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== USERS TAB ========== */}
      {tab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-emerald-100/60 px-4 py-2.5 flex-1">
              <Search className="w-4 h-4 text-emerald-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari pengguna..." className="bg-transparent text-sm outline-none flex-1 text-emerald-800 placeholder:text-emerald-400" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="text-emerald-400 hover:text-emerald-600"><X className="w-4 h-4" /></button>}
            </div>
            <div className="flex items-center gap-2 bg-white rounded-xl border border-emerald-100/60 p-2">
              <Filter className="w-4 h-4 text-emerald-400 ml-2" />
              <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="bg-emerald-50 rounded-lg px-3 py-1.5 text-xs outline-none text-emerald-800 border border-emerald-100">
                <option value="semua">Semua Role</option>
                {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-emerald-50/80 border-b border-emerald-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Pengguna</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Ranting</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Login Terakhir</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-emerald-700 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-emerald-50 hover:bg-emerald-50/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">{user.avatar}</div>
                          <div>
                            <p className="text-sm font-semibold text-emerald-800">{user.name}</p>
                            <p className="text-[10px] text-emerald-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <button onClick={() => setShowEditRole(showEditRole === `${user.id}` ? null : `${user.id}`)}
                            className={`text-[10px] px-2.5 py-1 rounded-full font-medium cursor-pointer hover:opacity-80 transition-opacity ${roleColorMap[user.role]}`}>
                            {roleNameMap[user.role]}
                          </button>
                          {showEditRole === `${user.id}` && (
                            <div className="absolute left-0 top-8 z-20 bg-white rounded-xl shadow-xl border border-emerald-100 p-2 w-44 space-y-0.5">
                              {roles.map((r) => (
                                <button key={r.id} onClick={() => handleChangeRole(user.id, r.id)}
                                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${user.role === r.id ? 'bg-emerald-50 font-medium text-emerald-800' : 'text-emerald-600 hover:bg-emerald-50'}`}>
                                  {r.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-emerald-600">{user.village}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusConfig[user.status].bg} ${statusConfig[user.status].text}`}>
                          {statusConfig[user.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-emerald-400">{user.lastLogin}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => handleToggleStatus(user.id)} className={`p-1.5 rounded-lg transition-colors ${user.status === 'active' ? 'hover:bg-amber-50 text-amber-500' : 'hover:bg-emerald-50 text-emerald-500'}`} title={user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}>
                            {user.status === 'active' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                          </button>
                          <button onClick={() => showToast(`Mengedit: ${user.name}`)} className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-400 hover:text-emerald-600 transition-colors">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteUser(user.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-emerald-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========== ROLES TAB ========== */}
      {tab === 'roles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div key={role.id} className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${role.color}`}>Level {role.level}</span>
                </div>
                <button onClick={() => showToast(`Mengedit role: ${role.name}`)} className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-400 hover:text-emerald-600 transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <h3 className="font-bold text-emerald-900 text-lg">{role.name}</h3>
              <p className="text-sm text-emerald-500 mt-1 mb-3">{role.desc}</p>
              <div className="flex items-center justify-between pt-3 border-t border-emerald-50">
                <span className="text-xs text-emerald-400">{role.users} pengguna</span>
                <button onClick={() => { setTab('users'); setFilterRole(role.id); }} className="text-xs text-emerald-600 font-medium hover:text-emerald-800 flex items-center gap-1">
                  Lihat <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========== PERMISSIONS TAB ========== */}
      {tab === 'permissions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5">
            <h3 className="font-bold text-emerald-900 text-lg mb-2">Matriks Hak Akses per Role</h3>
            <p className="text-sm text-emerald-500 mb-5">Centang untuk memberikan akses pada role tertentu</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-emerald-100">
                    <th className="text-left px-3 py-2 text-xs font-semibold text-emerald-700 min-w-[200px]">Permission</th>
                    {roles.slice(0, 5).map((r) => (
                      <th key={r.id} className="text-center px-2 py-2 text-[10px] font-semibold text-emerald-700 min-w-[70px]">{r.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((cat) => (
                    <>
                      <tr key={cat.category} className="bg-emerald-50/60">
                        <td colSpan={6} className="px-3 py-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">{cat.category}</td>
                      </tr>
                      {cat.items.map((item, i) => (
                        <tr key={`${cat.category}-${i}`} className="border-b border-emerald-50 hover:bg-emerald-50/30">
                          <td className="px-3 py-2 text-xs text-emerald-700">{item}</td>
                          {roles.slice(0, 5).map((role) => (
                            <td key={role.id} className="text-center px-2 py-2">
                              <button onClick={() => showToast(`${role.name}: ${item} toggled`)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center mx-auto transition-all ${
                                  role.level <= 2 ? 'bg-emerald-500 border-emerald-500 text-white' :
                                  role.level === 3 && i < cat.items.length - 2 ? 'bg-emerald-500 border-emerald-500 text-white' :
                                  'border-gray-200 hover:border-emerald-300'
                                }`}>
                                {(role.level <= 2 || (role.level === 3 && i < cat.items.length - 2)) && <Check className="w-3 h-3" />}
                              </button>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
