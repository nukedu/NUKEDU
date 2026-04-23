import { Clock, CheckCircle, AlertCircle, FileText, Users, Heart } from 'lucide-react';

const activities = [
  {
    icon: Heart,
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-50',
    title: 'Donasi Infaq untuk Pembangunan Masjid',
    desc: 'Menyalurkan infaq sebesar Rp 150.000',
    time: '2 jam yang lalu',
    status: 'success',
  },
  {
    icon: FileText,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
    title: 'Artikel: "Makna Hari Santri Nasional"',
    desc: 'Artikel berhasil dipublikasikan di portal',
    time: '5 jam yang lalu',
    status: 'success',
  },
  {
    icon: Users,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50',
    title: 'Rapat Koordinasi Ranting Kedu',
    desc: 'Menghadiri rapat bulanan pengurus ranting',
    time: '1 hari yang lalu',
    status: 'success',
  },
  {
    icon: AlertCircle,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    title: 'Pengajian Rutin — Menunggu Konfirmasi',
    desc: 'Daftar hadir belum diupload ke sistem',
    time: '2 hari yang lalu',
    status: 'pending',
  },
  {
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50',
    title: 'Verifikasi Data Anggota Baru',
    desc: '5 anggota baru ranting Kedu Selatan telah diverifikasi',
    time: '3 hari yang lalu',
    status: 'success',
  },
];

export default function RecentActivities() {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100/60 shadow-sm p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-emerald-900 text-lg">Aktivitas Terbaru</h3>
          <p className="text-sm text-emerald-500 mt-0.5">Riwayat kontribusi terakhir Anda</p>
        </div>
        <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-1">
        {activities.map((activity, i) => {
          const Icon = activity.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50/50 transition-colors cursor-pointer group"
            >
              <div className={`${activity.iconBg} p-2 rounded-xl shrink-0 group-hover:scale-105 transition-transform`}>
                <Icon className={`w-4 h-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-emerald-800 truncate">{activity.title}</p>
                <p className="text-xs text-emerald-500 mt-0.5">{activity.desc}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 whitespace-nowrap">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
