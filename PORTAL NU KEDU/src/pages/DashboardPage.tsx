import { useState } from 'react';
import StatsCards from '../components/StatsCards';
import ActivityChart from '../components/ActivityChart';
import RecentActivities from '../components/RecentActivities';
import UpcomingEvents from '../components/UpcomingEvents';
import TopContributors from '../components/TopContributors';
import QuickActions from '../components/QuickActions';
import ForumHighlights from '../components/ForumHighlights';
import LazisnuTracker from '../components/LazisnuTracker';

interface DashboardPageProps {
  onNavigate: (menu: string) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [notif, setNotif] = useState<string | null>(null);

  const showNotif = (msg: string) => {
    setNotif(msg);
    setTimeout(() => setNotif(null), 3000);
  };

  return (
    <>
      {/* Toast Notification */}
      {notif && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-bounce">
          ✅ {notif}
        </div>
      )}

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path fill="currentColor" d="M100,10 L120,80 L190,80 L135,120 L155,190 L100,148 L45,190 L65,120 L10,80 L80,80 Z" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-emerald-200 text-sm">Assalamu'alaikum</span>
            <span className="text-lg">🌙</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Selamat Datang, Kontributor Aktif!
          </h1>
          <p className="text-emerald-100 text-sm md:text-base max-w-2xl">
            Portal Digital MWC NU Kecamatan Kedu — Kelola kontribusi Anda, pantau kegiatan, dan jadi bagian dari ekosistem Nahdliyin yang lebih baik.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="flex items-center gap-2 bg-white/15 hover:bg-white/25 rounded-full px-4 py-1.5 text-sm backdrop-blur-sm transition-colors">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              Status: Aktif
            </button>
            <button className="flex items-center gap-2 bg-white/15 hover:bg-white/25 rounded-full px-4 py-1.5 text-sm backdrop-blur-sm transition-colors">
              📅 {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <QuickActions onNavigate={onNavigate} />
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <UpcomingEvents onNotif={showNotif} />
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <TopContributors />
        <ForumHighlights onNavigate={onNavigate} />
        <LazisnuTracker onNotif={showNotif} onNavigate={onNavigate} />
      </div>
    </>
  );
}
